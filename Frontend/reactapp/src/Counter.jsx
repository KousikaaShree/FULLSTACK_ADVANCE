import React from 'react'
import { useState } from 'react';

const Counter =()=>{
    const[Counter,setCounter]=useState(0);
return (
    <>
    <h2>Counter:{Counter}</h2>
    <button onClick={()=>setCounter(Counter+1000000000000)}>Increment</button>
    <button onClick={()=>setCounter(Counter-1)}>Decrement</button>
    </>
)
}
export default Counter;