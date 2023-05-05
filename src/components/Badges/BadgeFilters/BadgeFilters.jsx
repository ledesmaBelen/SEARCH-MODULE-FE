import React, { useEffect } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { Badge } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { radioButtons } from "../../Modals/HomeFilters/buttonsData";

const theme = createTheme({
  palette: {
    red: {
      main: "#D90404",
      contrastText: "#fff",
    },
  },
});

export const BadgeFilters = ({
  openModal,
  content,
  setcontentBadgeFilters,
}) => {
  useEffect(() => {
    if (sessionStorage.getItem("filters")) {
      const filters = JSON.parse(sessionStorage.getItem("filters"));
      let count = 0;
      if (filters.desde || filters.hasta) count += 1;

      const defaultvalue = radioButtons.find((button) => button.default);
      if (
        filters.valueRadioButtons &&
        filters.valueRadioButtons !== defaultvalue.value
      )
        count += 1;

      if (filters.checks) {
        const checkboxs = filters.checks.filter((check) => check.check);
        if (checkboxs && checkboxs.length > 0) count += checkboxs.length;
      }

      setcontentBadgeFilters(count);
    }
  }, []);

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
