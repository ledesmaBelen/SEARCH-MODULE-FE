import {
  Divider,
  FormControl,
  FormControlLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { radioButtons } from "./buttonsData";
import "./classes.css";

export const ModalConfig = ({ openModalConfig, setopenModalConfig }) => {
  return (
    <Modal
      open={openModalConfig}
      onClose={() => setopenModalConfig(false)}
      disableAutoFocus
    >
      <Box
        sx={{
          width: 200,
          height: 300,
          borderRadius: 3,
          bgcolor: "#f5f7fb",
          border: "2px solid #3d688c",
          boxShadow: 24,
          position: "absolute",
          top: "30%",
          left: "90%",
          transform: "translate(-50%, -50%)",
          color: "#727272",
          padding: "15px 20px 5px 20px",
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        <div className="sidebar-content">
          <Typography>Densidad</Typography>
          <FormControl>
            <RadioGroup defaultValue="default">
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
          <Divider sx={{ background: "#3c678b" }} />
          <div className="box-visualmode">
            <Typography>Vista:</Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={"Fiscales"}
                style={{ height: 30 }}
              >
                <MenuItem value={"Fiscales"}>Fiscales</MenuItem>
                <MenuItem value={"Predetermminada"}>Predetermminada</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
