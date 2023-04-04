import { Badge, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GavelIcon from "@mui/icons-material/Gavel";
import { Avatar } from "@mui/material";
import "./useStyles.css";
import { useNavigate } from "react-router-dom";
import { ModalConfig } from "../Modals/ModalConfig/ModalConfig";
import { BadgeFilters } from "../Badges/BadgeFilters/BadgeFilters";
import { BadgeGavel } from "../Badges/BadgeGavel/BadgeGavel";
import { HomeFiltersModal } from "../Modals/HomeFilters/HomeFiltersModal";

export const Header = ({
  searchValue,
  openModalGavel,
  onClose,
  cardsSidebar,
}) => {
  const navigate = useNavigate();
  const [valueInput, setvalueInput] = useState("");
  const [openModalConfig, setopenModalConfig] = useState(false);
  const [openModalFilters, setopenModalFilters] = useState(false);
  const [contentBadgeFilters, setcontentBadgeFilters] = useState(0);

  const handlechangeInputSearch = (event) => {
    setvalueInput(event.target.value);
  };

  const handleBadgeFilters = () => {
    setopenModalFilters(!openModalFilters);
  };

  const handleSearchValue = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?${valueInput}`);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (searchValue && searchValue !== "") setvalueInput(searchValue);
  }, [searchValue]);

  return (
    <div className={`box-header ${openModalGavel ? "open" : ""}`}>
      <Grid container className="grid-container">
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "2%",
          }}
        >
          <img
            src="https://mpajujuy.gob.ar/images/imgFootLogo.png"
            alt="Lamp"
            width="120"
            height="60"
          ></img>
        </Grid>
        <Grid
          item
          xs={8}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="grid-input">
            <SearchIcon
              className="search-icon"
              sx={{
                "&:hover": {
                  color: "#1b2f6a",
                },
              }}
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
              onKeyDown={handleSearchValue}
            />
            <BadgeFilters
              openModal={handleBadgeFilters}
              content={contentBadgeFilters}
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
          <BadgeGavel openmodal={onClose} content={cardsSidebar.length} />
          <Avatar className="avatar">AG</Avatar>
        </Grid>
      </Grid>
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
    </div>
  );
};
