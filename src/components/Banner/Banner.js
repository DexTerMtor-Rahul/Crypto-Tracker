import { Container, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  bannerContent: {
    marginTop: 24,
    height: 350,
    display: "flex",
    flexDirection: "column",
    paddingTop: 40,
    justifyContent: "space-between",
    background: "white",
    borderRadius: 10,
  },
  tagLine: {
    display: "flex",
    height: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const Banner = () => {
  const classes = useStyles();
  return (
    <div>
      <Container className={classes.bannerContent}>
        <div className={classes.tagLine}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}>
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgray",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}>
            Get all the informtion regarding your Crpto coins.
          </Typography>
          <Carousel />
        </div>
      </Container>
    </div>
  );
};

export default Banner;
