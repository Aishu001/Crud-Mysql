import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Product() {
  const [rows, setRows] = useState([]); // State to hold the product data
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch the product data from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getProducts');
        console.log(response.data); // Log the entire response
        setRows(response.data.data); // Use response.data.data to set rows
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    
    

    fetchProducts();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleDelete = (id) => {
    try {
      axios
        .delete(`http://localhost:3000/api/deleteProducts/${id}`)
        .then((response) => {
          setRows((previousRows) => {
            return previousRows.filter((row) => {
              return row._id !== id;
            });
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  


  return (

    <>
    
    <Link to='/addProdut'><Button variant="contained">Add Product</Button></Link>
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell>id</TableCell> */}
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Stock Quantity</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id} // Use row.id as the unique key
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">
                {row.id} 
              </TableCell> */}
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.stock_quantity}</TableCell>
              <TableCell align="center">
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Link to={`/editContact/${row.id}`}>     <IconButton aria-label="delete" size="large">
<EditNoteIcon/>
</IconButton> </Link>
              
          
<IconButton aria-label="delete" size="large"  className='iconn' onClick={() => {
                handleDelete(row.id)}}>
  <DeleteIcon />
</IconButton>
              </Stack>
    
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer></>
  );
}

export default Product;





