import { Divider, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import SearchIcon from "@mui/icons-material/Search";
import "./useStyles.css";
import { SearchItemModal } from "../../Modals/SearchItem/SearchItemModal";

export const Card = ({ item, setcardsSidebar }) => {
  const [openModalSearchItem, setopenModalSearchItem] = useState(false);

  const handleSetExp = (item) => {
    const cardsSelected = sessionStorage.getItem("cards")
      ? JSON.parse(sessionStorage.getItem("cards"))
      : [];
    const findCard = cardsSelected.find(
      (elemt) => elemt.cabezeraDerDato === item.cabezeraDerDato
    );

    if (!findCard) {
      cardsSelected.push(item);
      sessionStorage.setItem("cards", JSON.stringify(cardsSelected));
      setcardsSidebar(cardsSelected);
    }
  };
  const getDate = (date) => {
    const fecha = date.split(" ");
    return fecha.length > 0 ? fecha[0] : "";
  };
  return (
    <>
      <div className="box-card">
        <div className="box-header-card">
          <Typography
            style={{ fontSize: 14, fontWeight: "bold", color: "#4E4A47" }}
          >
            {item.cabezeraDerTit} NRO: {item.cabezeraDerDato}
          </Typography>
          <Typography
            style={{ fontSize: 14, fontWeight: "bold", color: "#4E4A47" }}
          >
            {item.cabezeraIzq}
          </Typography>
        </div>

        <Typography
          style={{
            fontSize: 20,
            textDecoration: "underline",
            fontWeight: "bold",
            color: "#1b2f6a",
          }}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => setopenModalSearchItem(true)}
        >
          {item.sectoTitulo}
        </Typography>
        <div className="box-medium-card">
          <Typography
            style={{ fontWeight: "bold", fontSize: 12, color: "#4E4A47" }}
          >
            {getDate(item.fecha1)}
          </Typography>
          <Typography
            style={{ paddingLeft: 10, fontSize: 12, color: "#4E4A47" }}
          >
            ...{item.textoMedio}...
          </Typography>
        </div>
        <div className="box-footer-card">
          <div className="box-footer-card-options">
            <p
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: "#4E4A47",
                width: "8%",
              }}
            >
              R.J: <span style={{ color: "#2FA83F" }}>{item.abajoRJ}</span>
            </p>
            <p
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: "#4E4A47",
                paddingLeft: "10px",
                width: "15%",
              }}
            >
              Preventivo (
              <span style={{ color: "#2FA83F" }}>
                {item.abajoPreventivo > 0 ? item.abajoPreventivo : 0}
              </span>
              )
            </p>
            <p
              style={{
                fontSize: 13,
                paddingLeft: "10px",
                fontWeight: "bold",
                color: "#4E4A47",
                width: "10%",
              }}
            >
              Parte(
              <span style={{ color: "#2FA83F" }}>
                {(parseInt(item.abajoPersonLegajo) || 0) +
                  (parseInt(item.abajoPersonDenuncia) || 0)}
              </span>
              )
            </p>
            <p
              style={{
                fontSize: 13,
                paddingLeft: "10px",
                fontWeight: "bold",
                color: "#4E4A47",
                width: "15%",
              }}
            >
              Secuestros (
              <span style={{ color: "#2FA83F" }}>
                {item.abajoSecuestros || 0}
              </span>
              )
            </p>
            <div
              style={{
                paddingLeft: "10px",
                width: "45%",
              }}
            >
              <Tooltip title={item.abajoTituloDelito}>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#D90404",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                >
                  Artículo: {item.abajoTituloDelito}
                </p>
              </Tooltip>
            </div>
          </div>
          <div>
            <Tooltip title={`Ver ${item.cabezeraIzq}`}>
              <IconButton onClick={() => setopenModalSearchItem(true)}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Guardar">
              <IconButton onClick={() => handleSetExp(item)}>
                <BookmarkAddedOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
      <Divider style={{ width: "70%" }} />
      <SearchItemModal
        item={item}
        openModalSearchItem={openModalSearchItem}
        setopenModalSearchItem={setopenModalSearchItem}
      />
    </>
  );
};
