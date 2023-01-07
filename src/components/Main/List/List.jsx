import React from "react";
import {
  List as MUIList,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Slide,
} from "@material-ui/core";
import { Delete, MoneyOff } from "@material-ui/icons";
import useStyles from "./styles";
import { useStateContext } from "../../../context/context";

const List = () => {
  const { deleteTransaction, transaction } = useStateContext();  
  const classes = useStyles();

  return (
    <MUIList dense={false} className={classes.list} id="Scrollbar-Design">
      {transaction.map((transactions) => (
        <Slide
          direction="down"
          in
          mountOnEnter
          unmountOnExit
          key={transactions.id}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar
                className={
                  transactions.type === "Income"
                    ? classes.avatarIncome
                    : classes.avatarExpense
                }
              >
                <MoneyOff />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={transactions.category}
              secondary={`$${transactions.amount} - ${transactions.date}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() =>
                  deleteTransaction(
                    transactions.id
                  )
                }
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
      ))}
    </MUIList>
  );
};

export default List;
