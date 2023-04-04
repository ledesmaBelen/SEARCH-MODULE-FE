import {
  Box,
  Modal,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { handleGetItemDetails } from "../../../services/Search";
import { handleGetPartes } from "../../../services/Search";
import { handleGetMesExpeDetails } from "../../../services/Search";
import { handleGetMesExpePersons } from "../../../services/Search";
import { handleGetExpeconDenun } from "../../../services/Search";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import PrintIcon from "@mui/icons-material/Print";

export const SearchItemModal = ({
  item,
  openModalSearchItem,
  setopenModalSearchItem,
}) => {
  const [details, setDetails] = useState(null);
  const [partes, setPartes] = useState(null);
  const [mesexpe, setMesexpe] = useState(null);
  const [partesexpe, setPartesexpe] = useState([]);
  const [expecondenun, setExpecondenun] = useState(null);

  const getItem = async () => {
    const result = await handleGetItemDetails(item.cabezeraDerDato);
    console.log(result);
    if (result) setDetails(result.return[0]);

    const result2 = await handleGetMesExpeDetails(item.cabezeraDerDato);
    console.log(result2);
    if (result2) setMesexpe(result2[0]);

    const result3 = await handleGetMesExpePersons(item.cabezeraDerDato);
    console.log(result3);
    if (result3) setPartesexpe(result3);

    const result4 = await handleGetExpeconDenun(item.cabezeraDerDato);
    console.log(result4);
    if (result4) setExpecondenun(result4[0]);

    const result1 = await handleGetPartes(item.cabezeraDerDato);
    console.log(result1);
    if (result1) setPartes(result1.return[0]);
  };

  useEffect(() => {
    if (openModalSearchItem) getItem();
  }, [openModalSearchItem]);

  return (
    <Modal
      open={openModalSearchItem}
      onClose={() => setopenModalSearchItem(false)}
      disableAutoFocus
    >
      <Box
        sx={{
          width: "70%",
          height: 550,
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
          fontSize: 16,
          fontWeight: "bold",
          overflow: "auto",
          fontFamily: "Courier New",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <CloseIcon
            sx={{ cursor: "pointer" }}
            onClick={() => setopenModalSearchItem(false)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            src="https://mpajujuy.gob.ar/images/imgFootLogo.png"
            alt="Lamp"
            width="232"
            height="132"
          ></img>
          <div>
            <Tooltip title="Compartir">
              <IconButton>
                <ShareIcon style={{ fontSize: 40, paddingRight: 10 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Imprimir">
              <IconButton>
                <PrintIcon style={{ fontSize: 40 }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        {mesexpe && <h3> fav ID:{mesexpe.idmes_expedientes}</h3>}
        <Typography>Modelo de Certificación de Causa</Typography>
        <Typography
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#000A47",
          }}
        >
          {mesexpe && <>{mesexpe.nro_exp}</>}
        </Typography>
        <Typography
          style={{
            fontSize: 11,
            fontWeight: "bold",
            color: "#f00A47",
          }}
        >
          Caratula: {mesexpe && <>{mesexpe.caratula}</>}
        </Typography>
        {partes && <h4>{partes.barrio}</h4>}
        <Button>Save</Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Tipo</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Apellido</TableCell>
                <TableCell align="right">DNI</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partesexpe.map((row) => (
                <TableRow key={row.idper}>
                  <TableCell> {row.tipo}</TableCell>
                  <TableCell> {row.nombre}</TableCell>
                  <TableCell> {row.apellido}</TableCell>
                  <TableCell> {row.dni}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          style={{
            fontSize: 11,
            fontWeight: "bold",
            color: "#f00A47",
          }}
        >
          {expecondenun && <>{expecondenun.idprev_digital}</>}-
          {expecondenun && <>{expecondenun.idmes_expedientes}</>}
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Apellido</TableCell>
                <TableCell align="right">DNI</TableCell>
                <TableCell align="right">Celular</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow></TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          style={{
            fontSize: 11,
            fontWeight: "bold",
            color: "#f00A47",
          }}
        >
          {expecondenun && <>{expecondenun.idprev_digital}</>}-
          {expecondenun && <>{expecondenun.relatos_hecho}</>}
        </Typography>
      </Box>
    </Modal>
  );
};
