import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { handleGetItemDetails } from "../../../services/Search";

export const SearchItemModal = ({
  item,
  openModalSearchItem,
  setopenModalSearchItem,
}) => {
  const [details, setDetails] = useState(null);
  const getItem = async () => {
    const result = await handleGetItemDetails(item.cabezeraDerDato);
    console.log(result);
    if (result) setDetails(result.return[0]);
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
          height: 600,
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
        {details && <h1>ID:{details.idprev_digital}</h1>}
      </Box>
    </Modal>
  );
};
