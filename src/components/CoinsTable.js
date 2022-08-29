import { useEffect ,useState} from "react";
import { useNavigate} from "react-router-dom";
import { CoinList } from "../config/api";
import axios from 'axios'
import { CryptoState } from "../CryptoContext";
import {TableContainer,
        LinearProgress,
        TextField,
        Typography,
        Table,
        ThemeProvider,
        createTheme,
        TableHead,
        TableRow,
        TableCell,
        TableBody,
        Container
} from "@material-ui/core"


export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const  CoinsTable=()=>{

    const [coins,setCoins]=useState([])
    const [loading,setLoading]=useState(false)
    const [search,setSearch]=useState("");
    const {currency,symbol}=CryptoState();
    const history=useNavigate();

    const fetchCoins = async()=>{
        setLoading(true);
        const {data}=await axios.get(CoinList(currency));
        console.log(data)
        setCoins(data)
        setLoading(false);
    }

    useEffect(()=>{
        fetchCoins()
    },[currency]);

    const handleSearch = () =>{
        return coins.filter((coin)=>
        coin.name.toLowerCase().includes(search.toLowerCase())||
        coin.symbol.toLowerCase().includes(search.toLowerCase()))
    }

    const  rowStyles={
        cursor:"pointer"
    }

    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
      });

return(
    <ThemeProvider theme={darkTheme}>
    <Container style={{ textAlign: "center" }}>
        <Typography
            variant="h4"
            style={{ margin: 18}}
        >
            Cryptocurrency Prices
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer >
            {loading?(<LinearProgress style={{ backgroundColor: "gold" }} />):(
                <Table>
                    <TableHead style={{backgroundColor:"#EEBC1D"}}>
                        <TableRow>
                            {["Coin", "Price","Market Cap"].map((head) => (
                                <TableCell
                                style={{
                                    color: "black",
                                    fontWeight: "700",
                                    fontFamily: "Montserrat",
                                }}
                                key={head}
                                align={head === "Coin" ? "" : "right"}
                                >
                                {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {handleSearch().map(row=>{
                            return(
                                <TableRow
                                    key={row.name}
                                    style={rowStyles}
                                    onClick={()=>{
                                        history(`/coins/${row.id}`)
                                    }}
                                >

                                <TableCell
                                    component="th"
                                    scope="row"
                                    style={{
                                        display:'flex',
                                        gap:15
                                }}>
                                    <img 
                                    src={row.image}
                                    alt={row.name}
                                    height="50"
                                    style={{marginBottom:10}}
                                    />
                                    <div style={{display:'flex',flexDirection:'column'}}>
                                    <span
                                        style={{
                                            textTransform: "uppercase",
                                            fontSize: 22,
                                            color:"white"
                                        }}
                                    >{row.symbol}</span>
                                    <span style={{ color: "white", }}>
                                        {row.name}
                                    </span>
                                    </div>

                                </TableCell>
                                <TableCell align="right" style={{color:"white"}}>
                                    {symbol}{" "}
                                    {numberWithCommas(row.current_price.toFixed(2))}
                                
                                </TableCell>
                                <TableCell align="right" style={{color:"white"}}>
                                    {symbol}{" "}
                                    {numberWithCommas(row.market_cap.toString().slice(0,-6))}
                                </TableCell>

                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    </Container>
    </ThemeProvider>
)
 }

export default CoinsTable;