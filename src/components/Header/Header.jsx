import { Grid } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GavelIcon from "@mui/icons-material/Gavel";
import { Avatar } from "@mui/material";
import { HomeGavelModal } from "../Modals/HomeGavel/HomeGavelModal";
import "./useStyles.css";
import { useNavigate } from "react-router-dom";

export const Header = ({ value, setvalue }) => {
  const navigate = useNavigate();
  const [openModalGavel, setopenModalGavel] = useState(false);
  const handleChangeValue = (event) => {
    setopenModalGavel(event.target.value);
  };
  const handlechangeInputSearch = (event) => {
    setvalue(event.target.value);
  };
  return (
    <div className="box-header">
      <Grid container className="grid-container">
        <Grid item xs={2}>
          LOGO
        </Grid>
        <Grid item xs={8}>
          <div className="grid-input">
            <SearchIcon
              className="search-icon"
              onClick={() => navigate(`/search?${value}`)}
            />
            <input
              placeholder="Ingrese criterio de busqueda"
              className="input"
              value={value}
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
            style={{ fontSize: "30px" }}
          />
          <GavelIcon
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
            className="icons"
            style={{ fontSize: "30px" }}
            onClick={() => setopenModalGavel(true)}
          />
          <Avatar className="avatar">AG</Avatar>
        </Grid>
      </Grid>
      <HomeGavelModal
        openModalGavel={openModalGavel}
        setopenModalGavel={setopenModalGavel}
      />
    </div>
  );
};
