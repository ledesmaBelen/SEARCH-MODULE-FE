import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GavelIcon from "@mui/icons-material/Gavel";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { HomeFiltersModal } from "../../components/Modals/HomeFilters/HomeFiltersModal";
import { HomeGavelModal } from "../../components/Modals/HomeGavel/HomeGavelModal";
import { useNavigate } from "react-router-dom";
import "./useStyle.css";

export const Home = () => {
  const navigate = useNavigate();

  const [openModalFilters, setopenModalFilters] = useState(false);
  const [openModalGavel, setopenModalGavel] = useState(false);
  const [value, setvalue] = useState("");

  const handleChangeValue = (event) => {
    setvalue(event.target.value);
  };

  const handleSearchValue = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?${value}`);
    }
  };

  return (
    <>
      <div className="background">
        <div className="box-options">
          <InfoOutlinedIcon className="icon" style={{ fontSize: 30 }} />
          <SettingsOutlinedIcon className="icon" style={{ fontSize: 30 }} />
          <GavelIcon
            className="icon"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
            style={{ fontSize: 30 }}
            onClick={() => setopenModalGavel(true)}
          />
          <Avatar className="avatar">AG</Avatar>
        </div>
      </div>
      <div className="background-white"></div>
      <div className="box-input">
        <SearchIcon className="searchIcon" onClick={handleSearchValue} />
        <input
          placeholder="Ingrese criterio de busqueda"
          className="input"
          value={value}
          onChange={handleChangeValue}
          onKeyDown={handleSearchValue}
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
          onClick={() => setopenModalFilters(true)}
        />
      </div>
      <HomeFiltersModal
        openModalFilters={openModalFilters}
        setopenModalFilters={setopenModalFilters}
      />
      <HomeGavelModal
        openModalGavel={openModalGavel}
        setopenModalGavel={setopenModalGavel}
      />
    </>
  );
};
