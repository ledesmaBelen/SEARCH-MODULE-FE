import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GavelIcon from "@mui/icons-material/Gavel";
import { Avatar, Badge } from "@mui/material";
import { useState } from "react";
import { HomeFiltersModal } from "../../components/Modals/HomeFilters/HomeFiltersModal";
import { useNavigate } from "react-router-dom";
import "./useStyle.css";
import GavelSidebar from "../../components/Modals/HomeGavel/SidebarCardsRight";

export const Home = () => {
  const navigate = useNavigate();

  const [openModalFilters, setopenModalFilters] = useState(false);
  const [openModalGavel, setopenModalGavel] = useState(false);
  const [value, setvalue] = useState("");
  const [cardsSidebar, setcardsSidebar] = useState([]);

  const handleChangeValue = (event) => {
    setvalue(event.target.value);
  };

  const handleSearchValue = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?${value}`);
    }
  };

  const handleSidebarToggle = () => {
    setopenModalGavel(!openModalGavel);
  };
  useEffect(() => {
    if (sessionStorage.getItem("cards")) {
      console.log("entro");
      setcardsSidebar(JSON.parse(sessionStorage.getItem("cards")));
    }
  }, []);
  return (
    <div className={`background ${openModalGavel ? "open" : ""}`}>
      <div className="background-blue">
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
            onClick={handleSidebarToggle}
          />
          <Avatar className="avatar">AG</Avatar>
        </div>
      </div>
      <div className="background-white"></div>
      <div className={`box-input ${openModalGavel ? "open" : ""}`}>
        <SearchIcon className="searchIcon" onClick={handleSearchValue} />
        <input
          placeholder="Ingrese criterio de busqueda"
          className="input"
          value={value}
          onChange={handleChangeValue}
          onKeyDown={handleSearchValue}
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
        </Badge>
      </div>
      <HomeFiltersModal
        openModalFilters={openModalFilters}
        setopenModalFilters={setopenModalFilters}
      />

      <GavelSidebar
        openModalGavel={openModalGavel}
        onClose={handleSidebarToggle}
        cardsSidebar={cardsSidebar}
        setcardsSidebar={setcardsSidebar}
      />
    </div>
  );
};
