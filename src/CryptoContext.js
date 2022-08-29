
import { createContext, useContext, useEffect,useState } from "react";

const Crypto=createContext();
// Here we are creating Context with CreateContext()
// Here the created context is an object with two properties
// Provider and Consumer , To pass the value down to every 
// component in our app we wrap provider component around it


const CryptoContext=({children})=>{
    const [currency,setCurrency]=useState("INR");
    const [symbol,setSymbol]=useState("₹")

    useEffect(()=>{
        if(currency==="INR")setSymbol("₹");
        else if(currency==="USD")setSymbol("$");
    },[currency]);

    return (
        // Here value is what we want to pass down to our entire 
        // component tree
        <Crypto.Provider value={{currency,setCurrency,symbol}}>
            {children}
        </Crypto.Provider>
    )
}
export default CryptoContext;

export const CryptoState=()=>{
    return useContext(Crypto);
}

// useContext is another way of consuming context

// Context API solving one of the major problem PROP DRILLING
// Some components would receive the props only to pass it 
// down to its children

//Using Context API in our application we avoid passing
// props through intermediate components who do not need the 
// props

// Basically Context API is designed to share global data that 
// can be used in any part of application without passing props 
// down the component tree