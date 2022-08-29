import { makeStyles } from "@material-ui/styles"
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Background from './banner2.jpg';

// function from material ui that allows to create css using javascript object , and in turn it returns hook where we can use in functional components
// and apply to different components
const useStyles = makeStyles((theme)=>({
    banner:{
        backgroundImage:`url(${Background})`,
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    },
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    },
}))

const Banner = () =>{
    const classes=useStyles();
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>

                    <Typography
                        variant="h2"
                        style={{
                            fontWeight:"bold",
                            marginBottom:15,
                        }}
                    >
                        Crypto Currency
                    </Typography>

                    <Typography
                        variant="subtitle2"
                        style={{
                            color:"darkgrey",
                            textTransform:"captialize",
                        }}
                    >
                        Get all the Info regarding your any Crypto Currency
                    </Typography>

                </div>
            </Container>
        </div>
    )
}
export default Banner;