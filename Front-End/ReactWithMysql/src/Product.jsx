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
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Product() {
  const [rows, setRows] = useState([]); // State to hold the product data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage, setItemsPerPage] = useState(10); // State for items per page
  const [totalItems, setTotalItems] = useState(0); // Total number of items

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/getProducts?limit=${itemsPerPage}&page=${currentPage}`);
        console.log(response.data); // Log the entire response
        setRows(response.data.data); // Use response.data.data to set rows
        setTotalItems(response.data.total); // Assume your API returns total items count
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, itemsPerPage]); // Re-fetch data when current page or items per page changes

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelete = (id) => {
    try {
      axios
        .delete(`http://localhost:3000/api/deleteProducts/${id}`)
        .then((response) => {
          setRows((previousRows) => previousRows.filter((row) => row._id !== id));
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value); // Update items per page
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages

  return (
    <>
      <Link to='/addProdut'><Button variant="contained">Add Product</Button></Link>
      <br />
      <br />
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Items Each Page</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
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
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.stock_quantity}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Link to={`/editContact/${row.id}`}>
                      <IconButton aria-label="edit" size="large">
                        <EditNoteIcon />
                      </IconButton>
                    </Link>
                    <IconButton aria-label="delete" size="large" className='iconn' onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)} // Handle page change
          color="primary"
        />
      </Stack>
    </>
  );
}

export default Product;