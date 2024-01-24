import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "40%",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "black",
  },
}));
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const classes = useStyles();

  // fetching trending bitcoins form api

  // storing trending data into hooks
  const [trending, setTrending] = useState([]);

  //passing currency context for changing the value according to currency
  const { currency, symbol } = CryptoState();

  //function for geting data from api using axios
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency), {
        withCredentials: true,
      });
      setTrending(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(trending);
  //using this hooks the trending chart rendering ervey time of refresh
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  // funtion for creating small coin detail for carousel
  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginTop: 20, marginBottom: 10 }}
        />
        <span style={{ fontWeight: 400 }}>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}>
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>

        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  // here I create whole carousel
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
