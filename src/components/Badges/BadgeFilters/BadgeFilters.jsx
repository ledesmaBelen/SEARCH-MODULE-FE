import React from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { Badge } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    red: {
      main: "#D90404",
      contrastText: "#fff",
    },
  },
});

export const BadgeFilters = ({ openModal, content }) => {
  if (!content || content <= 0) {
    return (
      <TuneIcon
        sx={{
          color: "#6e7073",
          "&:hover": {
            background: "#D9D9D9",
            borderRadius: 10,
            cursor: "pointer",
          },
        }}
        onClick={openModal}
      />
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <Badge
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        color="red"
        badgeContent={content}
      >
        <TuneIcon
          sx={{
            color: "#6e7073",
            "&:hover": {
              background: "#D9D9D9",
              borderRadius: 10,
              cursor: "pointer",
            },
          }}
          onClick={openModal}
        />
      </Badge>
    </ThemeProvider>
  );
};
