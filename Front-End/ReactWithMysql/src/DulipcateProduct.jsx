import { Pagination, Box, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, IconButton, Button } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function DulipcateProduct() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page
  const [totalPages, setTotalPages] = useState(0); // Total pages from the API

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/getProducts?limit=${itemsPerPage}&page=${currentPage}`);
        setRows(response.data.data);
        setTotalPages(response.data.totalPages); // Using totalPages from API
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, itemsPerPage]); // Fetch products whenever page or itemsPerPage changes

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/deleteProducts/${id}`)
      .then(() => {
        setRows((previousRows) => previousRows.filter((row) => row._id !== id));
      })
      .catch(error => console.log(error));
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1); // Reset to page 1 when items per page changes
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Set current page to the selected value
  };

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
              <TableRow key={row._id}>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.stock_quantity}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1}>
                    <Link to={`/editContact/${row._id}`}>
                      <IconButton aria-label="edit">
                        <EditNoteIcon />
                      </IconButton>
                    </Link>
                    <IconButton aria-label="delete" onClick={() => handleDelete(row._id)}>
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
      <Stack spacing={2} alignItems="center">
        <Pagination
          count={totalPages} // Use totalPages directly from the API
          page={currentPage} // Current active page
          onChange={handlePageChange} // Handle page changes
          color="primary"
          size="large"
          variant="outlined"
          shape="rounded"
          siblingCount={1}
          boundaryCount={2}
        />
      </Stack>
    </>
  );
}

export default DulipcateProduct;
