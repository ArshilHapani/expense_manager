import React from "react";

const InfoCard = () => {
  const isIncome = Math.round(Math.random());
  return (
    <div style={{ textAlign: "center", padding: "0 10%" }}>
      Try Saying: <br />
      Add {isIncome ? "Income" : "Expense"} for {isIncome ? "₹12000" : "₹4000"}{" "}
      in Category {isIncome ? "Salary" : "Car"} for{" "}
      {isIncome ? "Thursday" : "Sunday"}
    </div>
  );
};

export default InfoCard;
