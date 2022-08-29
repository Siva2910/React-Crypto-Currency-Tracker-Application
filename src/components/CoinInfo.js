import { CircularProgress, createTheme, makeStyles, ThemeProvider, } from '@material-ui/core';
import axios from 'axios';
import  { useEffect,useState } from 'react'
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { Chart as ChartJS, registerables } from 'chart.js';
import {Select,Typography} from '@material-ui/core';
import {MenuItem} from '@material-ui/core';
ChartJS.register(...registerables);


const CoinInfo = ({coin} ) =>{
    const [historicalData,setHistoricalData]=useState();
    const [days,setDays]=useState(1);

    const {currency,symbol}=CryptoState();

    const fetchHistoricalData = async()=>{
        const {data}= await axios.get(HistoricalChart(coin.id,days,currency))
        // axios is a third party library where the output 
        // console.log(data.prices)
        console.log(data.prices)
        // axios directly return a json object of the result
        setHistoricalData(data.prices)

        // fetch
        // when we want to send the data we need to stringify
        // when we are receiving it we need to convert to json object
        // it will not handle network errors
    }
    
    useEffect(()=>{
        fetchHistoricalData()
    },[currency,days])

    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"dark",
        }
    })
    const useStyles=makeStyles((theme)=>({
        container:{
            width:"75%",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            marginTop:25,
            padding:40,
            [theme.breakpoints.down("md")]:{
                width:"100%",
                marginTop:0,
                padding:20,
                paddingTop:0
            }
        }
    }));
    const classes=useStyles();
    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {
                    !historicalData ? (
                        <CircularProgress 
                            style={{color:"gold"}}
                            size={250}
                            thickness={1}
                        />
                    ):
                    (
                        <>
                            <Line
                            
                            data={{
                                labels:historicalData.map(coin=>{
                                    let date=new Date(coin[0]);
                                    let time=
                                    date.getHours()>12 ?`${date.getHours()-12}:${date.getMinutes()} PM`
                                    : `${date.getHours()}:${date.getMinutes()} AM`
                                return days===1?time:date.toLocaleDateString();
                                }),
                                datasets:[
                                {
                                    data:historicalData.map((coin)=>coin[1]),
                                    label: `Price ( Past ${days} Days ) in ${currency}`,
                                    borderColor:"#EEBC1D"
                                }  
                                ]
                            }}
                            // To have radius of point as 1
                            options={{
                                elements:{
                                    point:{
                                        radius:1
                                    }
                                }
                            }}
                            />
                            <Typography
                        variant="h6"
                    >
                        Please Select the number of days you want track the coin
                    </Typography>
                            <Select
                        variant="outlined"
                        
                        style={{ width: 500, height: 40, marginTop: 15,borderColor:"#EEBC1D" }}
                        onChange={(e) => setDays(e.target.value)}
                    >
                        <MenuItem value={1}>24 hours</MenuItem>
                        <MenuItem value={30}>30 days</MenuItem>
                        <MenuItem value={90}>3 Months</MenuItem>
                        <MenuItem value={365}>1 Year</MenuItem>
                    </Select>                        
                        </>
                    )
                }
            </div>
        </ThemeProvider>
    )
}
export default CoinInfo