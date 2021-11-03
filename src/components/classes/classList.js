import React, { useEffect, useState } from "react";

export default () => {

    const[error, setError] = useState(null);
    const[isLoaded, setIsLoaded] = useState(false);
    const[items, setItems] = useState([]);

    useEffect(() =>{
        fetch("http://localhost:3000/classes")
        .then( res => res.json())
        .then(
            (result)=>{
                setIsLoaded(true);
                setItems(result);
            },
            (error)=>{
                setIsLoaded(true);
                setError(error);
            }
        )
    },[])

    return <ul>
        {items.map(cls => <li>{cls.name}</li>)}
    </ul>
    
}