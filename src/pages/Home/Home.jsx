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
import { ModalConfig } from "../../components/Modals/ModalConfig/ModalConfig";
import { SearchItemModal } from "../../components/Modals/SearchItem/SearchItemModal";
import { listToMenuSearchFilters } from "../../utils/Types";

export const Home = () => {
  const navigate = useNavigate();
  const [openModalFilters, setopenModalFilters] = useState(false);
  const [openModalGavel, setopenModalGavel] = useState(false);
  const [value, setvalue] = useState("");
  const [cardsSidebar, setcardsSidebar] = useState([]);
  const [contentBadgeFilters, setcontentBadgeFilters] = useState(0);
  const [openModalConfig, setopenModalConfig] = useState(false);
  const [searchItem, setsearchItem] = useState(null);
  const [openModalSearchItem, setopenModalSearchItem] = useState(false);

  const handleChangeValue = (event) => {
    setvalue(event.target.value);
  };

  const handleSearchValue = (event) => {
    if (event.key === "Enter") navigate(`/search?value=${value}`);
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
          <SettingsOutlinedIcon
            className="icon"
            style={{ fontSize: 30, cursor: "pointer" }}
            onClick={() => {
              setopenModalGavel(false);
              setopenModalConfig(true);
            }}
          />
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
          setcontentBadgeFilters={setcontentBadgeFilters}
        />
      </div>
      <HomeFiltersModal
        openModalFilters={openModalFilters}
        setopenModalFilters={setopenModalFilters}
        content={contentBadgeFilters}
        setcontentBadgeFilters={setcontentBadgeFilters}
      />
      <ModalConfig
        openModalConfig={openModalConfig}
        setopenModalConfig={setopenModalConfig}
      />
      <GavelSidebar
        openModalGavel={openModalGavel}
        onClose={handleSidebarToggle}
        cardsSidebar={cardsSidebar}
        setcardsSidebar={setcardsSidebar}
        setsearchItem={setsearchItem}
        setopenModalSearchItem={setopenModalSearchItem}
      />
      <SearchItemModal
        item={searchItem}
        openModalSearchItem={openModalSearchItem}
        setopenModalSearchItem={setopenModalSearchItem}
      />
    </div>
  );
};
