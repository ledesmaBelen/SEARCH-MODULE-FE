import React, { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box, Divider, Typography } from "@mui/material";
import iconPDF from "../../../../assets/icon_pdf.png";
import { ModalPDF } from "../../../SearchList/Card/PDF/ModalPDF";
export const Card = ({
  item,
  cardsSidebar,
  setcardsSidebar,
  onClose,
  setsearchItem,
  setopenModalSearchItem,
}) => {
  const [openModalPDF, setopenModalPDF] = useState(false);

  const handleRemove = (item) => {
    const expedientes = cardsSidebar.filter(
      (elem) => elem.cabezeraDerDato !== item.cabezeraDerDato
    );
    sessionStorage.setItem("cards", JSON.stringify(expedientes));
    setcardsSidebar(expedientes);
  };

  const getDate = (date) => {
    const fecha = date.split(" ");
    return fecha.length > 0 ? fecha[0] : "";
  };

  const handleViewItem = () => {
    setsearchItem(item);
    onClose();
    item.cabezeraDerTit === "PDF"
      ? setopenModalPDF(true)
      : setopenModalSearchItem(true);
  };

  return (
    <>
      <div className="box-card-modal">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            color: "#595340",
            "&:hover": {
              color: "#1b2f6a",
            },
          }}
          onClick={() => handleRemove(item)}
        >
          <RemoveCircleOutlineIcon
            style={{
              cursor: "pointer",
              fontSize: 14,
              paddingRight: "3px",
            }}
          />
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            Quitar
          </Typography>
        </Box>
        <div className="box-header-card-modal" onClick={handleViewItem}>
          {item.cabezeraDerTit === "PDF" ? (
            <p style={{ fontSize: 11, color: "#595340" }}>
              Documento {item.cabezeraDerTit}
            </p>
          ) : (
            <>
              <p style={{ fontSize: 11, color: "#595340" }}>
                <span style={{ fontWeight: "bold" }}>
                  {item.cabezeraDerTit} NRO:
                </span>{" "}
                {item.cabezeraDerDato}
              </p>
              <p style={{ fontWeight: "bold", fontSize: 10, color: "#595340" }}>
                {getDate(item.fecha1)}
              </p>
            </>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            style={{
              fontSize: 14,
              paddingBottom: 5,
              color: "#1b2f6a",
              fontWeight: "bold",
              maxWidth: "calc(100% - 50px)",
            }}
            onClick={handleViewItem}
          >
            {item.sectoTitulo}
          </Typography>
          {item.cabezeraDerTit === "PDF" && (
            <img src={iconPDF} alt="PDF" height={50} width={52} />
          )}
        </div>

        <Divider />
      </div>
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
