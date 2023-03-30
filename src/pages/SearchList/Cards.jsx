import { CircularProgress } from "@mui/material";
import React from "react";
import { Card } from "../../components/SearchList/Card/Card";
import "./useStyles.css";

export const Cards = ({ loading, cards, setcardsSidebar }) => {
  if (loading)
    return (
      <div className="box-loading">
        <CircularProgress />
      </div>
    );

  return (
    <div className="box-cards">
      {cards.map((item, index) => (
        <Card key={index} item={item} setcardsSidebar={setcardsSidebar}/>
      ))}
    </div>
  );
};
