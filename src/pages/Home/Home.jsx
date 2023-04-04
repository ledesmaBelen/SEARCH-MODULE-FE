import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { HomeFiltersModal } from "../../components/Modals/HomeFilters/HomeFiltersModal";
import { useNavigate } from "react-router-dom";
import "./useStyle.css";
import GavelSidebar from "../../components/Modals/HomeGavel/SidebarCardsRight";
import { BadgeFilters } from "../../components/Badges/BadgeFilters/BadgeFilters";
import { BadgeGavel } from "../../components/Badges/BadgeGavel/BadgeGavel";

export const Home = () => {
  const navigate = useNavigate();
  const [openModalFilters, setopenModalFilters] = useState(false);
  const [openModalGavel, setopenModalGavel] = useState(false);
  const [value, setvalue] = useState("");
  const [cardsSidebar, setcardsSidebar] = useState([]);
  const [contentBadgeFilters, setcontentBadgeFilters] = useState(0);

  const handleChangeValue = (event) => {
    setvalue(event.target.value);
  };

  const handleSearchValue = (event) => {
    if (event.key === "Enter") navigate(`/search?${value}`);
  };

  const handleSidebarToggle = () => {
    setopenModalGavel(!openModalGavel);
  };

  const handleBadgeFilters = () => {
    setopenModalFilters(!openModalFilters);
  };

  useEffect(() => {
    if (sessionStorage.getItem("cards"))
      setcardsSidebar(JSON.parse(sessionStorage.getItem("cards")));
  }, []);

  return (
    <div className={`background ${openModalGavel ? "open" : ""}`}>
      <div className="background-blue">
        <div className="box-options">
          <InfoOutlinedIcon className="icon" style={{ fontSize: 30 }} />
          <SettingsOutlinedIcon className="icon" style={{ fontSize: 30 }} />
          <BadgeGavel
            openmodal={handleSidebarToggle}
            content={cardsSidebar.length}
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
        <BadgeFilters
          openModal={handleBadgeFilters}
          content={contentBadgeFilters}
        />
      </div>
      <HomeFiltersModal
        openModalFilters={openModalFilters}
        setopenModalFilters={setopenModalFilters}
        content={contentBadgeFilters}
        setcontentBadgeFilters={setcontentBadgeFilters}
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
