import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import "./useStyles.css";
import { checkboxs, radioButtons, selects } from "./buttonsData";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CloseIcon from "@mui/icons-material/Close";
import es from "date-fns/locale/es";
import { listToMenuSearchFilters } from "../../../utils/Types";

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
  const [valueRadioButtonsType, setvalueRadioButtonsType] = useState(
    listToMenuSearchFilters.find((button) => button.default).code
  );
  const [checks, setChecks] = useState(checkboxs);

  const handleChangeRadioButtons = (e) => {
    setvalueRadioButtons(e.target.value);
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
  };

  const handleSaveFilters = () => {
    const obj = {
      desde,
      hasta,
      valueRadioButtons,
      checks,
      valueRadioButtonsType,
    };
    sessionStorage.setItem("filters", JSON.stringify(obj));
    setopenModalFilters(false);
    window.location.reload();
  };

  const handleChangeRadioButtonsTypeDocument = (e) => {
    setvalueRadioButtonsType(e.target.value);
  };

  useEffect(() => {
    if (sessionStorage.getItem("filters") && openModalFilters) {
      const filters = JSON.parse(sessionStorage.getItem("filters"));
      let count = 0;
      if (filters.desde) setdesde(new Date(filters.desde));
      if (filters.hasta) sethasta(new Date(filters.hasta));
      if (filters.valueRadioButtons)
        setvalueRadioButtons(filters.valueRadioButtons);
      if (filters.checks) {
        const checkboxs = filters.checks.filter((check) => check.check);
        if (checkboxs && checkboxs.length > 0) {
          setChecks(filters.checks);
          count += checkboxs.length;
        }
      }

      if (filters.desde || filters.hasta) count += 1;
      if (filters.valueRadioButtonsType)
        setvalueRadioButtonsType(filters.valueRadioButtonsType);

      setcontentBadgeFilters(count);
    }
  }, [openModalFilters]);

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
              Mostrar resultados que contengan:
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
                    control={
                      <Radio size="small" style={{ color: "#3c678b" }} />
                    }
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
                      style={{ color: "#3c678b" }}
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
          <Grid item xs={10} style={{ display: "flex", alignItems: "center" }}>
            <Typography
              style={{
                fontSize: 15,
                width: "20%",
                fontWeight: "bold",
              }}
            >
              Documento:
            </Typography>
            <FormControl
              style={{
                fontSize: 15,
                width: "80%",
                fontWeight: "bold",
              }}
            >
              <RadioGroup
                value={valueRadioButtonsType}
                onChange={handleChangeRadioButtonsTypeDocument}
              >
                <div style={{ display: "flex" }}>
                  {listToMenuSearchFilters.map((item) => (
                    <FormControlLabel
                      key={item.code}
                      value={item.code}
                      control={
                        <Radio size="small" style={{ color: "#3c678b" }} />
                      }
                      label={
                        <Typography
                          style={{
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          }}
                        >
                          {item.name}
                        </Typography>
                      }
                      style={{ height: 32 }}
                    />
                  ))}
                </div>
              </RadioGroup>
            </FormControl>
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
                onChange={(fecha) => {
                  console.log(fecha);
                  setdesde(fecha);
                }}
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
                  <input type="text"></input>
                </div>
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
          ))}
        </Grid>
        <div className="box-button">
          <button className="button" onClick={handleSaveFilters}>
            Aplicar filtros
          </button>
        </div>
      </Box>
    </Modal>
  );
};
