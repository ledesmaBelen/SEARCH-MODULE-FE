import { Divider, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import SearchIcon from "@mui/icons-material/Search";
import "./useStyles.css";
import { SearchItemModal } from "../../Modals/SearchItem/SearchItemModal";
import { ModalPDF } from "./PDF/ModalPDF";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import logopdf from "../../../assets/icon_pdf.png";
import bigIconPDF from "../../../assets/icon_pdf_big.png";

export const Card = ({ item, setcardsSidebar }) => {
  const [openModalSearchItem, setopenModalSearchItem] = useState(false);
  const [openModalPDF, setopenModalPDF] = useState(false);

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

  const openItem = () => {
    item.cabezeraDerTit === "PDF"
      ? setopenModalPDF(true)
      : setopenModalSearchItem(true);
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              style={{ fontSize: 14, fontWeight: "bold", color: "#4E4A47" }}
            >
              {item.cabezeraIzq}
            </Typography>
            {item.cabezeraDerTit === "PDF" && (
              <img
                src={bigIconPDF}
                alt="PDF"
                height={40}
                width={52}
                onClick={() => openItem()}
              />
            )}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            style={{
              fontSize: 20,
              textDecoration: "underline",
              fontWeight: "bold",
              color: "#1b2f6a",
              maxWidth: "90%",
            }}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => openItem()}
          >
            {item.sectoTitulo}
          </Typography>
        </div>

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
                maxWidth: "15%",
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
                fontWeight: "bold",
                color: "#4E4A47",
                maxWidth: "10%",
                paddingLeft: 10,
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
                fontWeight: "bold",
                color: "#4E4A47",
                maxWidth: "15%",
                paddingLeft: 10,
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
                maxWidth: "60%",
                paddingLeft: 10,
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
          <div style={{ paddingRight: 8 }}>
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
      {item.cabezeraDerTit === "PDF" && (
        <ModalPDF
          url={item.sectoTitulo}
          openModalPDF={openModalPDF}
          setopenModalPDF={setopenModalPDF}
          setcardsSidebar={setcardsSidebar}
          item={item}
        />
      )}
    </>
  );
};
