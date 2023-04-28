import * as React from "react";
import Menu from "@mui/material/Menu";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { listToMenuSearchFilters } from "../../utils/Types";

export default function MenuSearchFilters({ type, settype }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="filter-boxMenuFilter" onClick={handleClick}>
        <button className="filter-buttonResetFilter">
          <Typography
            className="filter-typographyButton"
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Filtros
          </Typography>
          <ArrowDropDownIcon sx={{ fontSize: "1rem", color: "#1b2f6a" }} />
        </button>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <FiltersList type={type} settype={settype} />
      </Menu>
    </>
  );
}

function FiltersList({ type, settype }) {
  const handleChangeRadioButtons = (e) => {
    settype(e.target.value);
  };

  return listToMenuSearchFilters && listToMenuSearchFilters.length > 0 ? (
    <div
      style={{
        width: 200,
        height: listToMenuSearchFilters.length * 33,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="filter-boxFormControl">
        <FormControl>
          <RadioGroup value={type} onChange={handleChangeRadioButtons}>
            {listToMenuSearchFilters.map((item) => (
              <FormControlLabel
                key={item.code}
                value={item.code}
                control={<Radio size="small" style={{ color: "#1b2f6a" }} />}
                label={
                  <Typography
                    style={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                      color: "#1b2f6a",
                    }}
                  >
                    {item.name}
                  </Typography>
                }
                style={{ height: 32 }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  ) : (
    <div className="filter-typographyBox">
      <Typography>No se encontraron tipos de organizaci&oacute;n</Typography>
    </div>
  );
}
