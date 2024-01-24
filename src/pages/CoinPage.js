import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import { LinearProgress, Typography, makeStyles } from "@material-ui/core";
import CoinInfo from "../components/CoinInfo";
import ReactHtmlParser from "react-html-parser";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(false);

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const useStyles = makeStyles((theme) => ({
    container: {
      marginTop: 10,
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "40%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: 10,
      padding: 20,
      borderRadius: 10,
      background: "white",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      textAlign: "justify",
      fontFamily: "Montserrat",
      padding: "0 25px 15px 25px",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",

      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.container}>
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <div className={classes.sidebar}>
            {coin.image?.large ? (
              <img
                src={coin.image.large}
                alt={coin.name}
                height="200"
                style={{ marginBottom: 20 }}
              />
            ) : (
              <div style={{ height: "200px" }} />
            )}

            {coin.name ? (
              <Typography variant="h3" className={classes.heading}>
                {coin.name}
              </Typography>
            ) : (
              <div style={{ height: "50px" }} />
            )}

            {coin.description?.en ? (
              <Typography variant="subtitle1" className={classes.description}>
                {ReactHtmlParser(coin.description.en.split(". ")[0])}.
              </Typography>
            ) : (
              <div style={{ height: "50px" }} />
            )}

            <div className={classes.marketData}>
              <span style={{ display: "flex" }}>
                <Typography variant="h5" className={classes.heading}>
                  Rank:
                </Typography>
                &nbsp; &nbsp;
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "Montserrat",
                  }}>
                  {coin?.market_cap_rank}
                </Typography>
              </span>

              <span style={{ display: "flex" }}>
                <Typography variant="h5" className={classes.heading}>
                  Current Price:
                </Typography>
                &nbsp; &nbsp;
                {coin?.market_data?.current_price ? (
                  <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                    {symbol}{" "}
                    {numberWithCommas(
                      coin.market_data.current_price[currency.toLowerCase()]
                    )}
                  </Typography>
                ) : (
                  <div style={{ height: "50px" }} />
                )}
              </span>

              <span style={{ display: "flex" }}>
                <Typography variant="h5" className={classes.heading}>
                  Market Cap:{" "}
                </Typography>
                &nbsp; &nbsp;
                {coin?.market_data?.current_price ? (
                  <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                    {symbol}{" "}
                    {numberWithCommas(
                      coin.market_data.market_cap[currency.toLowerCase()]
                        .toString()
                        .slice(0, -6)
                    )}
                  </Typography>
                ) : (
                  <div style={{ height: "50px" }} />
                )}
              </span>
            </div>
          </div>
          <CoinInfo coin={coin} />
        </>
      )}
    </div>
  );
};

export default CoinPage;
