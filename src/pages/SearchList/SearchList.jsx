import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import GavelSidebar from "../../components/Modals/HomeGavel/SidebarCardsRight";
import { search } from "../../services/Search";
import { Cards } from "./Cards";
import "./useStyles.css";
import { SearchItemModal } from "../../components/Modals/SearchItem/SearchItemModal";
import MenuSearchFilters from "./MenuFilterTypes";
import { listToMenuSearchFilters } from "../../utils/Types";
import { useLocation } from "react-router-dom";

export const SearchList = () => {
  const location = useLocation();

  const [searchValue, setsearchValue] = useState("");
  const [cards, setcards] = useState([]);
  const [cardsSidebar, setcardsSidebar] = useState([]);
  const [loading, setloading] = useState(false);
  const [openModalGavel, setopenModalGavel] = useState(false);
  const [searchItem, setsearchItem] = useState(null);
  const [openModalSearchItem, setopenModalSearchItem] = useState(false);
  const [searchType, setsearchType] = useState(null);

  const handleGetParams = async () => {
    setloading(true);

    const params = new URLSearchParams(location.search);
    const value = params.get("value");

    if (value) {
      setsearchValue(value);
      let queryparams = "";
      if (sessionStorage.getItem("filters")) {
        const filters = JSON.parse(sessionStorage.getItem("filters"));
        if (filters.checks) {
          const countcheckboxs = filters.checks.filter((check) => check.check);
          if (countcheckboxs.length > 0 && filters.checks.length > 0) {
            filters.checks.map((check) => {
              queryparams += `&${check.value}=${check.check ? 1 : 0}`;
            });
          }
        }
        if (filters.desde)
          queryparams += `&desde=${filters.desde.split("T")[0]}`;
        if (filters.hasta)
          queryparams += `&hasta=${filters.hasta.split("T")[0]}`;
        if (filters.valueRadioButtonsType) {
          queryparams += `tipobusqueda=${filters.valueRadioButtonsType}`;
          setsearchType(filters.valueRadioButtonsType);
          console.log(queryparams);
        }
      } else {
        queryparams += `tipobusqueda=${
          listToMenuSearchFilters.find((button) => button.default).code
        }`;
        setsearchType(
          listToMenuSearchFilters.find((button) => button.default).code
        );
      }
      const result = await search(value, queryparams);
      if (result) setcards(result);
    }

    setloading(false);
  };

  useEffect(() => {
    handleGetParams();
    if (sessionStorage.getItem("cards")) {
      setcardsSidebar(JSON.parse(sessionStorage.getItem("cards")));
    }
  }, []);

  const handleSidebarToggle = () => {
    setopenModalGavel(!openModalGavel);
  };

  const handleChangeRadioButtonsTypeDocument = (e) => {
    setsearchType(e.target.value);
    if (sessionStorage.getItem("filters")) {
      const obj = JSON.parse(sessionStorage.getItem("filters"));
      obj.valueRadioButtonsType = e.target.value;
      sessionStorage.setItem("filters", JSON.stringify(obj));
    } else {
      sessionStorage.setItem(
        "filters",
        JSON.stringify({ valueRadioButtonsType: e.target.value })
      );
    }

    handleGetParams();
  };

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
            width: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "1%",
            marginLeft: "2%",
          }}
        >
          <FormControl
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            <RadioGroup
              value={searchType}
              onChange={handleChangeRadioButtonsTypeDocument}
            >
              <div style={{ display: "flex" }}>
                {listToMenuSearchFilters.map((item) => (
                  <FormControlLabel
                    key={item.code}
                    value={item.code}
                    control={
                      <Radio size="small" style={{ color: "#3c678b" }} />
                    }
                    label={
                      <Typography
                        style={{
                          fontWeight: "bold",
                          fontSize: "1rem",
                          color: "#4e4a47",
                        }}
                      >
                        {item.name}
                      </Typography>
                    }
                    style={{ height: 32 }}
                  />
                ))}
              </div>
            </RadioGroup>
          </FormControl>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
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
    </div>
  );
};
