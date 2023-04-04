import React, { useState } from "react";
import { Box } from "@mui/system";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import "./useStyles.css";
import { checkboxs, radioButtons, selects } from "./buttonsData";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CloseIcon from "@mui/icons-material/Close";
import es from "date-fns/locale/es";

registerLocale("es", es);

export const HomeFiltersModal = ({
  openModalFilters,
  setopenModalFilters,
  content,
  setcontentBadgeFilters,
}) => {
  const [desde, setdesde] = useState(null);
  const [hasta, sethasta] = useState(null);
  const [valueRadioButtons, setvalueRadioButtons] = useState(
    radioButtons.find((button) => button.default).value
  );
  const [ischangeRadioButton, setischangeRadioButton] = useState(false);
  const [checks, setChecks] = useState(checkboxs);

  const handleChangeRadioButtons = (e) => {
    setvalueRadioButtons(e.target.value);
    // falta valor por default
    const button = radioButtons.find(
      (button) => button.value === e.target.value
    );
    if (!button.default && !ischangeRadioButton) {
      setischangeRadioButton(true);
      setcontentBadgeFilters(content + 1);
    } else if (button.default && ischangeRadioButton) {
      setcontentBadgeFilters(content - 1);
      setischangeRadioButton(false);
    }
  };

  const handlesetCheckboxs = (item, event) => {
    item.check = event.target.checked;
    setChecks(
      checks.map((checkbox) =>
        checkbox.value === item.value
          ? { ...checkbox, check: event.target.checked }
          : checkbox
      )
    );
    if (item.check) {
      setcontentBadgeFilters(content + 1);
    } else if (!item.check && content > 0) {
      setcontentBadgeFilters(content - 1);
    }
  };

  return (
    <Modal
      open={openModalFilters}
      onClose={() => setopenModalFilters(false)}
      disableAutoFocus
    >
      <Box
        sx={{
          width: 600,
          height: 400,
          borderRadius: 3,
          bgcolor: "#f5f7fb",
          border: "2px solid #3d688c",
          boxShadow: 24,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#727272",
          padding: "15px 20px 5px 20px",
        }}
      >
        <Grid container style={{ height: "85%" }}>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <CloseIcon
              style={{ cursor: "pointer" }}
              onClick={() => setopenModalFilters(false)}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography style={{ fontWeight: "bold" }}>
              Mostrar resultados que contengan :
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography style={{ fontWeight: "bold" }}>Buscar en:</Typography>
          </Grid>
          <Grid item xs={8}>
            <FormControl>
              <RadioGroup
                value={valueRadioButtons}
                onChange={handleChangeRadioButtons}
              >
                {radioButtons.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio size="small" />}
                    label={item.label}
                    style={{ height: 30 }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormGroup>
              {checks.map((item) => (
                <FormControlLabel
                  key={item.value}
                  control={
                    <Checkbox
                      size="small"
                      checked={item.check}
                      onChange={(event) => {
                        handlesetCheckboxs(item, event);
                      }}
                    />
                  }
                  label={
                    <Typography style={{ fontSize: 17 }}>
                      {item.label}
                    </Typography>
                  }
                  sx={{ height: 25 }}
                  value={item.value}
                />
              ))}
            </FormGroup>
          </Grid>
          <Grid item xs={10}>
            <div className="box-inputs">
              <Typography
                style={{ fontSize: 15, width: "40%", fontWeight: "bold" }}
              >
                Desde:
              </Typography>

              <DatePicker
                selected={desde}
                onChange={(fecha) => setdesde(fecha)}
                locale="es"
              />
              <Typography
                style={{ fontSize: 15, width: "40%", fontWeight: "bold" }}
              >
                Hasta:
              </Typography>
              <DatePicker
                selected={hasta}
                onChange={(fecha) => sethasta(fecha)}
                locale="es"
              />
            </div>
          </Grid>
          <Grid item xs={2}></Grid>
          {selects.map((item) => (
            <Grid item xs={12} key={item.value}>
              <Grid item xs={6}>
                <div className="box-inputs">
                  <Typography
                    style={{ fontSize: 15, width: "40%", fontWeight: "bold" }}
                  >
                    {item.label}:
                  </Typography>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={10}
                      style={{ height: 30 }}
                    >
                      <MenuItem value=""></MenuItem>
                      {item.values.map((value) => (
                        <MenuItem value={value.value} key={value.value}>
                          {value.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
          ))}
        </Grid>
        <div className="box-button">
          <button className="button">Aplicar filtros</button>
        </div>
      </Box>
    </Modal>
  );
};
