import React from "react";

import {
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import "./useStyle.css"

const GavelSidebar = ({ openModalGavel, onClose, cardsSidebar, setcardsSidebar }) => {

  const handleRemove = (item) => {
    // CONSULTAR SI EL NUMERO DE LEGAJO ES UNICO
    const expedientes = cardsSidebar.filter(
      (elem) => elem.cabezeraDerDato !== item.cabezeraDerDato
    );
    sessionStorage.setItem("cards", JSON.stringify(expedientes));
    setcardsSidebar(expedientes);
  };

  return (
    <div className={`sidebar ${openModalGavel ? "open" : ""}`}>
        <div className="box-cards-modal">
          {cardsSidebar.map((item, index) => (
            <div key={index} className="box-card-modal">
              <div className="box-card-modal-delete-icon">
                <Tooltip title={`Quitar ${item.cabezeraIzq}`}>
                  <IconButton onClick={() => handleRemove(item)}>
                    <RemoveCircleOutlineIcon
                      style={{ cursor: "pointer", fontSize: 16 }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="box-header-card-modal">
                <Typography style={{ fontSize: 10, fontWeight: "bold" }}>
                  {item.cabezeraDerTit} NRO: {item.cabezeraDerDato}
                </Typography>
                <Typography style={{ fontWeight: "bold", fontSize: 10 }}>
                  {item.fecha1}
                </Typography>
              </div>
              <Typography
                style={{
                  fontSize: 13,
                  paddingBottom: 5,
                  color: "#1b2f6a",
                  fontWeight: "bold",
                }}
              >
                {item.sectoTitulo}
              </Typography>

              <Divider />
            </div>
          ))}
        </div>
      
    </div>
  );
};

export default GavelSidebar;
