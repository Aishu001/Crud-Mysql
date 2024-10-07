import axios from 'axios';
import React , {useEffect,useState } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import './For.css';
import Container from 'react-bootstrap/esm/Container';

function EditProduct({contactId}) {
  const {id} = useParams()
  const navigate = useNavigate()
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
    };

    useEffect(() => {
      axios.get(`http://localhost:3000/api/getProductsById/${id}`)
        .then((response) => {
          const { name, description,  price, stock_quantity  } = response.data; // Corrected variable name
          setFormData({ name, description,  price, stock_quantity  });
        })
        .catch((error) => {
          console.log(error);
        });
    }, [id]);
    

    const handleSubmit = async (event) => {
      event.preventDefault(); 
      try {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
  
        const response = await axios.put(`http://localhost:3000/api/updateProducts/${id}`,formData);
        console.log(response.data);
        alert("Data is updated") 
        navigate('/')
  
        setValidated(true); 
      } catch (error) {
        console.log(error);
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

export default EditProduct