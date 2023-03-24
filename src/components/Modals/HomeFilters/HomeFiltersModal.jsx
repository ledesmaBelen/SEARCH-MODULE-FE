import React from "react";
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

export const HomeFiltersModal = ({ openModalFilters, setopenModalFilters }) => {
  return (
    <Modal
      open={openModalFilters}
      onClose={() => setopenModalFilters(false)}
      disableAutoFocus
    >
      <Box
        sx={{
          width: 600,
          height: 350,
          borderRadius: 3,
          bgcolor: "#f5f7fb",
          border: "2px solid #3d688c",
          boxShadow: 24,
          position: "absolute",
          top: "65%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#727272",
          padding: "15px 20px 5px 20px",
        }}
      >
        <Grid container>
          <Grid item xs={8}>
            <Typography>Mostrar resultados que contengan :</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Buscar en:</Typography>
          </Grid>
          <Grid item xs={8}>
            <FormControl>
              <RadioGroup defaultValue="all">
                {radioButtons.map((item) => (
                  <FormControlLabel
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
              {checkboxs.map((item) => (
                <FormControlLabel
                key={item.value}
                  control={<Checkbox defaultChecked size="small" />}
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
          {selects.map((item) => (
            <>
              <Grid item xs={6} key={item.value}>
                <div className="box-inputs">
                  <Typography style={{ fontSize: 15, width: "40%" }}>
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
                        <MenuItem value={value.value}>{value.value}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={6}></Grid>
            </>
          ))}
        </Grid>
        <div className="box-button">
          <button className="button">Aplicar filtros</button>
        </div>
      </Box>
    </Modal>
  );
};
