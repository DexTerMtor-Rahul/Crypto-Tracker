import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import {
  Container,
  InputAdornment,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@material-ui/lab";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const useStyles = makeStyles((theme) => ({
  serachBar: {
    display: "flex",
    marginTop: 24,
    justifyContent: "space-around",
    background: "white",
    borderRadius: 10,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      maxWidth: "100%",
      alignItems: "center",
    },
  },
  tableContent: {
    marginTop: 24,
    padding: 20,
    textAlign: "center",
    background: "white",
    borderRadius: 10,
  },
  thead: {
    backgroundColor: "#d3eaf2",
    "& th:first-child": {
      borderRadius: "10px 0 0 10px",
    },
    "& th:last-child": {
      borderRadius: "0 10px 10px 0",
    },
  },
  row: {
    backgroundColor: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#edf6f9",
      borderRadius: 10,
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "black",
    },
  },
}));

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  const fetchCoinsList = async () => {
    try {
      setLoading(true);
      const { data } = await axios.request(CoinList(currency), {
        withCredentials: true,
      });
      setCoins(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("API server side error!....");
    }
  };

  useEffect(() => {
    fetchCoinsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  // searching component function
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <Container className={classes.serachBar}>
        <Typography
          variant="h4"
          style={{
            margin: 18,
            fontFamily: "Montserrat",
          }}>
          Crypto Price By Market Cap{" "}
        </Typography>
        <TextField
          placeholder="Search For a Crypto Curreny..."
          variant="outlined"
          style={{
            margin: 10,
            width: "50%",
            backgroundColor: "#d3eaf2",
            height: "50%",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Container>
      <Container className={classes.tableContent}>
        <TableContainer>
          {loading ? (
            <LinearProgress />
          ) : (
            <Table aria-label="simple table">
              <TableHead className={classes.thead}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "left" : "right"}>
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}>
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}>
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}>
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}>
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          count={Number((handleSearch()?.length / 10).toFixed(0))}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </>
  );
};

export default CoinsTable;
