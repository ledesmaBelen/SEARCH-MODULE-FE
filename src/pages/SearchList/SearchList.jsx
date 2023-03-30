import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import GavelSidebar from "../../components/Modals/HomeGavel/SidebarCardsRight";
import { search } from "../../services/Search";
import { Cards } from "./Cards";

import "./useStyles.css";

export const SearchList = () => {
  const [searchValue, setsearchValue] = useState("");
  const [cards, setcards] = useState([]);
  const [cardsSidebar, setcardsSidebar] = useState([]);
  const [loading, setloading] = useState(false);
  const [openModalGavel, setopenModalGavel] = useState(false);

  const handleGetParams = async () => {
    setloading(true);
    const value = window.location.search.split("?");
    value.shift();
    if (value) {
      setsearchValue(value.toString());
      const result = await search(
        `${value.toString()}`
      );
      if (result) setcards(result);
      
    }
    setloading(false);
  };

  useEffect(() => {
    handleGetParams();
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("cards")) {
      console.log('entro')
      setcardsSidebar(JSON.parse(sessionStorage.getItem("cards")));
    }
  }, [])
  

  const handleSidebarToggle = () => {
    setopenModalGavel(!openModalGavel);
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Header
      searchValue={searchValue}
        openModalGavel={openModalGavel}
        onClose={handleSidebarToggle}
      />
      <div className="box-search-body">
        <Typography
          className="title"
          style={{ fontSize: "25px", marginLeft: "2%", marginTop: "1%" }}
        >
          Resultados de la busqueda "{searchValue}" {cards.length > 0 ? `({cards.length})` : null}
        </Typography>
        <Cards loading={loading} cards={cards} setcardsSidebar={setcardsSidebar}/>
      </div>
      <GavelSidebar
        openModalGavel={openModalGavel}
        onClose={handleSidebarToggle}
        cardsSidebar={cardsSidebar}
        setcardsSidebar={setcardsSidebar}
      />
    </div>
  );
};
