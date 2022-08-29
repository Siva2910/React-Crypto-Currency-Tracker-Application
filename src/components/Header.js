import { AppBar, Container, makeStyles, Toolbar, Typography,Select,MenuItem ,
ThemeProvider,createTheme} from "@material-ui/core"
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles((theme)=>({
    title:{
        flex:1,
        color:"gold",
        fontWeight:"bold",
        cursor:"pointer"
    }
}))

const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });


const Header = () =>{
    const history=useNavigate();
    const classes= useStyles();
    const {currency,setCurrency}=CryptoState();
    return(
        // React AppBar Component serves as the main
        // navigation of the component
        <ThemeProvider theme={darkTheme}>
            {/* App bar flex direction column */}
        <AppBar color="transparent" position="static">
            <Container>
                {/* tool bar flex direction default : row */}
                <Toolbar>
                    <Typography
                        onClick={()=>history('/')}
                        variant="h6"
                        className={classes.title}
                    >
                        Crypto Currency Tracker
                    </Typography>
                    <Select
                        variant="outlined"
                        value={currency}
                        style={{ width: 100, height: 40, marginLeft: 15 }}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"INR"}>INR</MenuItem>
                    </Select>
                </Toolbar>
            </Container>

        </AppBar>
        </ThemeProvider>
    )
}

export default Header;