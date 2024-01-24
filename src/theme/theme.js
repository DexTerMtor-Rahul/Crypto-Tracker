import { createTheme } from "@material-ui/core";
const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "red",
        },
      },
    },
  },
});

export default createTheme(theme);
