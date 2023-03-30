import { Badge, Grid } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GavelIcon from "@mui/icons-material/Gavel";
import { Avatar } from "@mui/material";
import "./useStyles.css";
import { useNavigate } from "react-router-dom";
import { ModalConfig } from "../Modals/ModalConfig/ModalConfig";

export const Header = ({ searchValue, openModalGavel, onClose }) => {
  const navigate = useNavigate();
  const [valueInput, setvalueInput] = useState("");
  const [openModalConfig, setopenModalConfig] = useState(false);

  const handlechangeInputSearch = (event) => {
    setvalueInput(event.target.value);
  };

  return (
    <div className={`box-header ${openModalGavel ? "open" : ""}`}>
      <Grid container className="grid-container">
        <Grid item xs={2}>
          LOGO
        </Grid>
        <Grid item xs={8}>
          <div className="grid-input">
            <SearchIcon
              className="search-icon"
              onClick={() => {
                navigate(`/search?${valueInput}`);
                window.location.reload();
              }}
            />
            <input
              placeholder="Ingrese criterio de busqueda"
              className="input"
              value={valueInput}
              onChange={handlechangeInputSearch}
            />
            <TuneIcon
              sx={{
                color: "#6e7073",
                "&:hover": {
                  background: "#D9D9D9",
                  borderRadius: 10,
                  cursor: "pointer",
                },
              }}
            />
          </div>
        </Grid>
        <Grid item xs={2} className="grid-options">
          <InfoOutlinedIcon className="icons" style={{ fontSize: "30px" }} />
          <SettingsOutlinedIcon
            className="icons"
            style={{ fontSize: "30px", cursor: "pointer" }}
            onClick={() => setopenModalConfig(true)}
          />
          <Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            color="secondary"
            overlap="circular"
            badgeContent=" "
          >
            <GavelIcon
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              className="icons"
              style={{ fontSize: "30px" }}
              onClick={onClose}
            />
          </Badge>

          <Avatar className="avatar">AG</Avatar>
        </Grid>
      </Grid>
      <ModalConfig
        openModalConfig={openModalConfig}
        setopenModalConfig={setopenModalConfig}
      />
    </div>
  );
};
