import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { Card } from "../../components/SearchList/Card/Card";
import "./useStyles.css";
import SearchIcon from "@mui/icons-material/Search";

export const Cards = ({ loading, cards, setcardsSidebar }) => {
  if (loading)
    return (
      <div className="box-loading">
        <CircularProgress />
      </div>
    );

  if (cards.length === 0)
    return (
      <div className="box-loading">
        <SearchIcon style={{ color: "#1b2f6a", fontSize: 40 }} />
        <Typography
          style={{ fontSize: "25px", color: "#1b2f6a", fontWeight: "bold" }}
        >
          No se encontraron resultados
        </Typography>
      </div>
    );
  return (
    <div className="box-cards">
      {cards.map((item, index) => (
        <Card key={index} item={item} setcardsSidebar={setcardsSidebar} />
      ))}
    </div>
  );
};
