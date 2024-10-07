import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom"
import Product from './Product'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import DulipcateProduct from './DulipcateProduct'

function App() {


  return (
    <>
    <Router>
     <Routes>
     {/* <Route path="/" element={<Product/>} /> */}
     <Route path="/" element={<DulipcateProduct/>} />
     <Route path="/addProdut" element={<AddProduct/>} />
     <Route path="/editContact/:id" element={<EditProduct/>} />

     </Routes>
     </Router>

    </>
  )
}

export default App
