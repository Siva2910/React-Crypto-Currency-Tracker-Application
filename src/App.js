import { makeStyles } from '@material-ui/styles'
import  React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import CoinPage from './Pages/CoinPage';
import Homepage from './Pages/Homepage';

const useStyles=makeStyles(()=>({
  App:{
    backgroundColor:"#14161a",
    color:"white",
    minHeight:"100vh"
  }
}));


const App =()=>{
 
  const classes=useStyles();

  return(
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/coins/:id" element={<CoinPage />}  />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;