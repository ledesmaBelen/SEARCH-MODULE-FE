import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import GavelSidebar from "../../components/Modals/HomeGavel/SidebarCardsRight";
import { search } from "../../services/Search";
import { Cards } from "./Cards";
import "./useStyles.css";
import { SearchItemModal } from "../../components/Modals/SearchItem/SearchItemModal";
import MenuSearchFilters from "./MenuFilterTypes";
import { listToMenuSearchFilters } from "../../utils/Types";
import { ModalPDF } from "../../components/SearchList/Card/PDF/ModalPDF";

export const SearchList = () => {
  const [searchValue, setsearchValue] = useState("");
  const [cards, setcards] = useState([]);
  const [cardsSidebar, setcardsSidebar] = useState([]);
  const [loading, setloading] = useState(false);
  const [openModalGavel, setopenModalGavel] = useState(false);
  const [searchItem, setsearchItem] = useState(null);
  const [openModalSearchItem, setopenModalSearchItem] = useState(false);
  const [type, settype] = useState(
    listToMenuSearchFilters.find((button) => button.default).code
  );

  const handleGetParams = async () => {
    setloading(true);
    const value = window.location.search.split("?");
    value.shift();
    if (value) {
      let valueformat = value.toString().replaceAll("%20", " ");
      setsearchValue(valueformat.replaceAll("%22", ""));
      let params = `${valueformat.replaceAll("%22", '"')}`;
      if (sessionStorage.getItem("filters")) {
        const filters = JSON.parse(sessionStorage.getItem("filters"));
        const countcheckboxs = filters.checks.filter((check) => check.check);
        if (countcheckboxs.length > 0 && filters.checks.length > 0) {
          filters.checks.map((check) => {
            params += `&${check.value}=${check.check ? 1 : 0}`;
          });
        }
        if (filters.desde) params += `&desde=${filters.desde.split("T")[0]}`;
        if (filters.hasta) params += `&hasta=${filters.hasta.split("T")[0]}`;
      }

      const result = await search(params, type);
      if (result) setcards(result);
    }

    setloading(false);
  };

  useEffect(() => {
    handleGetParams();
    if (sessionStorage.getItem("cards")) {
      setcardsSidebar(JSON.parse(sessionStorage.getItem("cards")));
    }
  }, [type]);

  const handleSidebarToggle = () => {
    setopenModalGavel(!openModalGavel);
  };
  const [openModalPDF, setopenModalPDF] = useState(false);

  return (
    <div style={{ overflow: "hidden" }}>
      <Header
        searchValue={searchValue}
        openModalGavel={openModalGavel}
        onClose={handleSidebarToggle}
        cardsSidebar={cardsSidebar}
      />
      <div className="box-search-body">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "1%",
            marginLeft: "2%",
          }}
        >
          <Typography
            className="title"
            style={{
              fontSize: 25,
              paddingRight: 20,
            }}
          >
            Resultados de la busqueda "{searchValue}"{" "}
            {cards.length > 0 ? `(${cards.length} resultados)` : ""}
          </Typography>
          <MenuSearchFilters type={type} settype={settype} />
        </div>

        <Cards
          loading={loading}
          cards={cards}
          setcardsSidebar={setcardsSidebar}
        />
      </div>
      <GavelSidebar
        openModalGavel={openModalGavel}
        onClose={handleSidebarToggle}
        cardsSidebar={cardsSidebar}
        setcardsSidebar={setcardsSidebar}
        setsearchItem={setsearchItem}
        setopenModalSearchItem={setopenModalSearchItem}
      />
      <SearchItemModal
        item={searchItem}
        openModalSearchItem={openModalSearchItem}
        setopenModalSearchItem={setopenModalSearchItem}
      />
      <ModalPDF
        url={"/src/assets/pdf.pdf"}
        openModalPDF={openModalPDF}
        setopenModalPDF={setopenModalPDF}
      />
    </div>
  );
};
