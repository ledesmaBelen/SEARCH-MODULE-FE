import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Divider,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import "./useStyles.css";

export const HomeGavelModal = ({ openModalGavel, setopenModalGavel }) => {
  const [cards, setcards] = useState([]);

  useEffect(() => {
    if (openModalGavel && sessionStorage.getItem("cards")) {
      console.log(sessionStorage.getItem("cards"));
      setcards(JSON.parse(sessionStorage.getItem("cards")));
    }
  }, [openModalGavel]);

  const handleRemove = (item) => {
    // CONSULTAR SI EL NUMERO DE LEGAJO ES UNICO
    const expedientes = cards.filter(
      (elem) => elem.cabezeraDerDato !== item.cabezeraDerDato
    );
    sessionStorage.setItem("cards", JSON.stringify(expedientes));
    setcards(expedientes);
  };

  return (
    <Modal
      open={openModalGavel}
      onClose={() => setopenModalGavel(false)}
      disableAutoFocus
    >
      <Box
        sx={{
          width: 200,
          height: 600,
          borderRadius: 3,
          bgcolor: "#f5f7fb",
          border: "2px solid #3d688c",
          boxShadow: 24,
          position: "absolute",
          top: "50%",
          left: "90%",
          transform: "translate(-50%, -50%)",
          color: "#727272",
          padding: "15px 20px 5px 20px",
          fontSize: 16,
          fontWeight: "bold",
        }}
      >

        <div className="box-cards-modal">
          {cards.map((item, index) => (
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
      </Box>
    </Modal>
  );
};
