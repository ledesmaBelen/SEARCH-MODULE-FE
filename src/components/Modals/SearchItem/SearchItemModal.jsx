import { Box, Modal, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { handleGetItemDetails } from "../../../services/Search";
import { handleGetPartes } from "../../../services/Search";
import { handleGetMesExpeDetails } from "../../../services/Search";
import { handleGetMesExpePersons } from "../../../services/Search";
import { handleGetExpeconDenun } from "../../../services/Search";
import { handleGetSecuestros } from "../../../services/Search";
import { handleGetCriterios } from "../../../services/Search";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
  const [secuestro, setSecuestro] = useState([]);
  const [criterio, setCriterio] = useState();

  const getItem = async () => {
    const result = await handleGetItemDetails(item.idexpelong);
    console.log(result);
    if (result) setDetails(result.return[0]);

    const result2 = await handleGetMesExpeDetails(item.idexpelong);
    // console.log(result2);
    if (result2) setMesexpe(result2[0]);

    const result3 = await handleGetMesExpePersons(item.idexpelong);
    // console.log(result3);
    if (result3) setPartesexpe(result3);

    const result4 = await handleGetExpeconDenun(item.idexpelong);
    // console.log(result4);
    if (result4) setExpecondenun(result4[0]);

    const result1 = await handleGetPartes(item.idexpelong);
    // console.log(result1);
    if (result1) setPartes(result1.return[0]);

    const result5 = await handleGetSecuestros(item.idexpelong);
    // console.log(result5);
    if (result5) setSecuestro(result5);

    const result6 = await handleGetCriterios();
    console.log(result6);
    if (result6) setCriterio(result6);
  };

  const colorSearchValue = (text) => {
    if (criterio) {
      //const lstmarcar = ["alberto","nataly"];
      //const lstmarcar = ["alberto"];
      //  if (message) {
      // lstmarcar.map(elemento => {
      const arreglobus = criterio.split(" ");
      //const elemento = "alberto";
      console.log(arreglobus);

      //});
      //      for ( let i=0 ; i < 2 ; i++){
      //        console.log(i);
      const message = arreglobus[0].replaceAll('"', "");
      console.log(message);
      const index = text.toLowerCase().search(message.toLocaleLowerCase());
      console.log(index);
      const textfilter = text.slice(index);
      console.log(textfilter);
      const lengthSearch = message.length;
      console.log(lengthSearch, textfilter.slice(lengthSearch));
      return (
        <td>
          {text.slice(0, index)}

          <span style={{ background: "#757b7d", color: "#f2f2f2" }}>
            {text.slice(index, index + lengthSearch)}
          </span>

          {text.slice(index + lengthSearch)}
        </td>
      );
      // });

      //}
    }
    return text;
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
          height: 500,
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
        <img
          src="https://mpajujuy.gob.ar/images/imgFootLogo.png"
          alt="Lamp"
          width="232"
          height="132"
        ></img>
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
            color: "#00bfff",
          }}
        >
          Caratula: {mesexpe && <> {colorSearchValue(mesexpe.caratula)}</>}
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
                  <TableCell> {colorSearchValue(row.nombre)}</TableCell>
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
          {expecondenun && <>{colorSearchValue(expecondenun.relatos_hecho)}</>}
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Detalle Secuestro</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {secuestro.map((row) => (
                <TableRow key={row.secu}>
                  <TableCell> {row.secu}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};
