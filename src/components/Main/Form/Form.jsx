import React, { useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import useStyles from "./styles";
import { useStateContext } from "../../../context/context";
import {
  incomeCategories,
  expenseCategories,
} from "../../../constants/categories";
import formatDate from "../../../utils/formatDate";
import { useSpeechContext } from "@speechly/react-client";
import SnackBar from "../../SnackBar/SnackBar";

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: formatDate(new Date()),
};
const Form = () => {
  const classes = useStyles();
  const { segment } = useSpeechContext();
  const [formData, setFormData] = useState(initialState);
  const { addTransaction,openDelete,setOpenDelete,setYellowBar,YellowBar } = useStateContext();
  const [open,setOpen] = useState(false);
  const transactions = () => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes("-"))
      return;

      setOpen(true);
    addTransaction({
      ...formData,
      amount: Number(formData.amount),
      id: uuidV4(),
    });    
    setFormData(initialState);
  };
  const selectCategory =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        setFormData({
          ...formData,
          type: "Expense",
        });
      } else if (segment.intent.intent === "add_income") {
        setFormData({
          ...formData,
          type: "Income",
        });
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return transactions();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        return setFormData(initialState);
      }
      segment.entities.forEach((e) => {
        const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase}`;
        switch (e.type) {
          case "amount":
            setFormData({
              ...formData,
              amount: Number(e.value),
            });
            break;
          case "category":
            if (incomeCategories.map((ic) => ic.type).includes(category)) {
              setFormData({
                ...formData,
                type: "Income",
                category: category,
              });
            } else if (
              expenseCategories.map((ic) => ic.type).includes(category)
            ) {
              setFormData({
                ...formData,
                type: "Expense",
                category: category,
              });
            }
            break;
          case "date":
            setFormData({
              ...formData,
              date: e.value,
            });
            break;

          default:
            break;
        }
      });
      if (
        segment.isFinal &&
        formData.amount &&
        formData.category &&
        formData.type &&
        formData.date
      ) {
        transactions();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segment]);

  return (
    <Grid container spacing={2}>
      <SnackBar open={open} setOpen={setOpen} severity='success' message='Transaction successfully created.'/>
      <SnackBar open={openDelete} setOpen={setOpenDelete} severity='error' message='Transaction deleted.'/>
      <SnackBar open={openDelete} setOpen={setOpenDelete} severity='error' message='Transaction deleted.'/>
      <SnackBar open={YellowBar} setOpen={setYellowBar} severity='info' message='Speech is being recorded.'/>
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {segment && <>{segment.words.map((w) => w.value).join(" ")}</>}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {selectCategory.map((category) => {
              return (
                <MenuItem key={category.type} value={category.type}>
                  {category.type}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          fullWidth
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="date"
          label="Date"
          fullWidth
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: formatDate(e.target.value) })
          }
        />
      </Grid>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        fullWidth
        onClick={transactions}
      >
        Create
      </Button>
    </Grid>
  );
};

export default Form;
