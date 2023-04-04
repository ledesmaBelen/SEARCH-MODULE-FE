import React from "react";
import { Divider, IconButton, Tooltip, Typography } from "@mui/material";
import "./useStyle.css";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import PrintIcon from "@mui/icons-material/Print";
import { Card } from "./Card/Card";

const GavelSidebar = ({
  openModalGavel,
  onClose,
  cardsSidebar,
  setcardsSidebar,
  setsearchItem,
  setopenModalSearchItem,
}) => {
  return (
    <div className={`sidebar ${openModalGavel ? "open" : ""}`}>
      <div className="box-cards-modal">
        <div className="box-cards-close-icon">
          <Typography style={{ fontSize: 18, fontWeight: "bold" }}>
            Resultados guardados
          </Typography>
          <CloseIcon style={{ cursor: "pointer" }} onClick={onClose} />
        </div>

        <Divider />
        <div className="box-medium-cards">
          {cardsSidebar.map((item, index) => (
            <Card
              item={item}
              cardsSidebar={cardsSidebar}
              setcardsSidebar={setcardsSidebar}
              onClose={onClose}
              setsearchItem={setsearchItem}
              setopenModalSearchItem={setopenModalSearchItem}
              key={index}
            />
          ))}
        </div>

        <div className="box-icons">
          <Tooltip title="Compartir">
            <IconButton>
              <ShareIcon
                sx={{
                  fontSize: 30,
                  color: "#595340",
                  "&:hover": {
                    color: "#1b2f6a",
                  },
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Imprimir">
            <IconButton>
              <PrintIcon
                sx={{
                  fontSize: 30,
                  color: "#595340",
                  "&:hover": {
                    color: "#1b2f6a",
                  },
                }}
              />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default GavelSidebar;
