import React from "react";
import GavelIcon from "@mui/icons-material/Gavel";
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

export const BadgeGavel = ({ openmodal, content }) => {
  if (!content || content <= 0) {
    return (
      <GavelIcon
        className="icon"
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        style={{ fontSize: 30 }}
        onClick={openmodal}
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
        <GavelIcon
          className="icon"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          style={{ fontSize: 30 }}
          onClick={openmodal}
        />
      </Badge>
    </ThemeProvider>
  );
};
