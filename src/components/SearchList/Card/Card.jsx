import { Divider, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import SearchIcon from "@mui/icons-material/Search";
import "./useStyles.css";
import { SearchItemModal } from "../../Modals/SearchItem/SearchItemModal";

export const Card = ({ item }) => {
  const [openModalSearchItem, setopenModalSearchItem] = useState(false)

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
    }
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
          onClick={()=> setopenModalSearchItem(true)}
        >
          {item.sectoTitulo}
        </Typography>
        <div className="box-medium-card">
          <Typography
            style={{ fontWeight: "bold", fontSize: 12, color: "#4E4A47" }}
          >
            {item.fecha1}
          </Typography>
          <Typography
            style={{ paddingLeft: 10, fontSize: 12, color: "#4E4A47" }}
          >
            {item.textoMedio}
          </Typography>
        </div>
        <div className="box-footer-card">
          <div className="box-footer-card-options">
            <Typography
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: "#4E4A47",
              }}
            >
              R.J:{item.abajoRJ}
            </Typography>
            <Typography
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: "#4E4A47",
              }}
            >
              Preventivo({item.abajoPreventivo > 0 ? item.abajoPreventivo : 0})
            </Typography>
            <Typography
              style={{ fontSize: 13, fontWeight: "bold", color: "#4E4A47" }}
            >
              Parte(
              {(parseInt(item.abajoPersonLegajo) || 0) +
                (parseInt(item.abajoPersonDenuncia) || 0)}
              )
            </Typography>
            <Typography
              style={{ fontSize: 13, fontWeight: "bold", color: "#4E4A47" }}
            >
              Secuestros({item.abajoSecuestros || 0})
            </Typography>
          </div>
          <div>
            <Tooltip title={`Ver ${item.cabezeraIzq}`}>
              <IconButton>
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
      <Divider style={{ width: "65%" }} />
      <SearchItemModal item={item} openModalSearchItem={openModalSearchItem} setopenModalSearchItem={setopenModalSearchItem} />
    </>
  );
};
