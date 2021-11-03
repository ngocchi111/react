import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useEffect, useState, setState } from "react";
import Popup from "reactjs-popup";
import Popover from '@mui/material/Popover';
import postAddClass from './postAddClass';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}


export default function Orders() {
  const[error, setError] = useState(null);
  const[isLoaded, setIsLoaded] = useState(false);
  const[items, setItems] = useState([]);
  const[item, setItem] = useState({
    name: null,
    size: null
  });
  

  function handleInputChange(e) {
    if (e.target.id === "name")
    setItem({
      name: e.target.value,
      size: item.size
    });
    else
    setItem({
      size: e.target.value,
      name: item.name
    });
  };

  function handleClick(e){
    e.preventDefault();
    fetch('https://apinc.herokuapp.com/classes', {
    method: "POST",
    body: JSON.stringify({
      name: item.name,
      size: item.size
     }),
     mode: "cors",
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        redirect: "follow", 
        referrer: "no-referrer",
  })
  .then((response) => response.json())
  .then((result) => {
  console.log(result)
})
    window.location.reload();
  };

    useEffect(() =>{
        fetch("https://apinc.herokuapp.com/classes")
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

function preventDefault(event) {
  event.preventDefault();
}
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            
            <TableCell>Name</TableCell>
            <TableCell>The number of student</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Popup modal trigger={<button>add class</button>}>
        {
        <form method='POST' onSubmit={handleClick}>
          <div><input placeholder="Class name" id="name" onChange={handleInputChange}/></div>
          <div><input placeholder="The number of student" id="size" onChange={handleInputChange}/></div>
          <div><button type ="submit">add class</button></div>
        </form>
        }
      </Popup>

    </React.Fragment>
    
  );
}
