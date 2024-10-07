import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './For.css'

function AddProduct() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock_quantity: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        try {
            const response = await axios.post('http://localhost:3000/api/createProducts', formData);
            console.log(response.data);     
            navigate('/'); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit} className="Container">
                    <h1 className='h1'>Add Product</h1>

                    <div className="FormLabel">
                        <Form.Label className="FormLabel">Product Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter Product Name"
                            onChange={handleChange}
                            value={formData.name}
                            name="name"
                            className="FormControl"
                        />
                    </div>

                    <div className="FormLabel">
                        <Form.Label className="FormLabel">Description</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter Description"
                            onChange={handleChange}
                            value={formData.description}
                            name="description"
                            className="FormControl"
                        />
                    </div>

                    <div className="FormLabel">
                        <Form.Label className="FormLabel">Price</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Enter Price"
                            onChange={handleChange}
                            value={formData.price}
                            name="price"
                            className="FormControl"
                            step="0.01" // Allows for decimal values
                        />
                    </div>

                    <div className="FormLabel">
                        <Form.Label className="FormLabel">Stock Quantity</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Enter Stock Quantity"
                            onChange={handleChange}
                            value={formData.stock_quantity}
                            name="stock_quantity"
                            className="FormControl"
                        />
                    </div> 

                    <div className='buttons'>
                        <Button type="submit" className='signIn'>Submit</Button>
                    </div>    
                </Form>
            </Container>
        </>
    )
}

export default AddProduct;
