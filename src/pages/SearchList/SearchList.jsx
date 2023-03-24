import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { searchValue } from "../../services/Search";
import { Cards } from "./Cards";

import "./useStyles.css";

export const SearchList = () => {
  const [value, setvalue] = useState("");
  const [cards, setcards] = useState([]);
  const [loading, setloading] = useState(false);

  const handleGetParams = async () => {
    setloading(true);
    const value = window.location.search.split("?");
    value.shift();
    if (value) {
      setvalue(value.toString().replaceAll("%20", " "));
      const result = await searchValue(
        `+${value.toString().replaceAll("%20", "+")}`
      );
      if (result) setcards(result);
    }
    setloading(false);
  };

  useEffect(() => {
    handleGetParams();
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      <Header value={value} setvalue={setvalue} />
      <div className="box-search-body">
        <Typography
          className="title"
          style={{ fontSize: "25px", marginLeft: "2%", marginTop: "1%" }}
        >
          Resultados de la busqueda "{value}"
        </Typography>
        <Cards loading={loading} cards={cards} />
      </div>
    </div>
  );
};
