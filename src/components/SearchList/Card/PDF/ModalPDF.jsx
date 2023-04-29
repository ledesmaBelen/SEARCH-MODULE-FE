import { Box, IconButton, Modal, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";

export function ModalPDF({
  url,
  openModalPDF,
  setopenModalPDF,
  setcardsSidebar,
  item,
}) {
  const [urlPdf, seturlPdf] = useState(url);
  const toggleModal = () => {
    setopenModalPDF(!openModalPDF);
  };

  const handleSetExp = (item) => {
    const cardsSelected = sessionStorage.getItem("cards")
      ? JSON.parse(sessionStorage.getItem("cards"))
      : [];
    const findCard = cardsSelected.find(
      (elemt) => elemt.cabezeraDerDato === item.cabezeraDerDato
    );

    if (!findCard) {
      cardsSelected.push(item);
      sessionStorage.setItem("cards", JSON.stringify(cardsSelected));
      setcardsSidebar(cardsSelected);
    }
  };
  const getPDF = async () => {
    console.log(url);
    fetch(`http://168.181.186.118:9093/pdf/enviarpdf?filepdf=${url}`, {
      method: "POST",
    })
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const blob = new Blob([buffer], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        console.log(url);
        seturlPdf(url);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getPDF();
  }, []);

  return (
    <Modal open={openModalPDF} onClose={toggleModal} disableAutoFocus>
      <Box
        sx={{
          width: "80%",
          height: "90vh",
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
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Tooltip title="Guardar">
            <IconButton onClick={() => handleSetExp(item)}>
              <BookmarkAddedOutlinedIcon />
            </IconButton>
          </Tooltip>

          <CloseIcon style={{ cursor: "pointer" }} onClick={toggleModal} />
        </div>
        <embed src={urlPdf} type="application/pdf" width="100%" height="90%" />
      </Box>
    </Modal>
  );
}
