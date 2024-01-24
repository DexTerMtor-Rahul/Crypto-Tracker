import {
  AppBar,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    fontSize: 24,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();

  return (
    <AppBar style={{ background: "white", color: "#14161a" }} position="static">
      <Toolbar>
        <Typography onClick={() => navigate("/")} className={classes.title}>
          Crypto Tracker
        </Typography>
        <Select
          variant="outlined"
          style={{
            width: 100,
            height: 40,
            marginRight: 15,
          }}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}>
          <MenuItem value={"USD"}>USD</MenuItem>
          <MenuItem value={"INR"}>INR</MenuItem>
        </Select>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
