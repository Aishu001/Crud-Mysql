import db from "../dataBase.js";

export const createProduct = (req, res) => {
    const { name, description, price, stock_quantity } = req.body;
    const sql = 'INSERT INTO products (name, description, price, stock_quantity) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, description, price, stock_quantity], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating product', error: err });
        }
        res.status(201).json({ message: 'Product created', productId: result.insertId });
    });
}

export const getProduct = (req, res) => {
    const { page = 1, limit = 10 } = req.query;  // Default page is 1 and limit is 10
    const offset = (page - 1) * limit;

    const sql = 'SELECT * FROM products LIMIT ? OFFSET ?';
    db.query(sql, [parseInt(limit), parseInt(offset)], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching products', error: err });
        }

        // Count total products for pagination metadata
        const countSql = 'SELECT COUNT(*) AS totalProducts FROM products';
        db.query(countSql, (err, countResult) => {
            if (err) {
                return res.status(500).json({ message: 'Error counting products', error: err });
            }

            const totalProducts = countResult[0].totalProducts;
            const totalPages = Math.ceil(totalProducts / limit);

            res.status(200).json({
                data: results,
                totalProducts: totalProducts,
                totalPages: totalPages,
                currentPage: parseInt(page),
            });
        });
    });
};


export const getProductByID = (req,res) => {
    const { id } = req.params; // Get the product ID from URL parameters

    // Query to get the product by ID
    const query = 'SELECT * FROM products WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(result[0]); // Send the product details
    });
}

export const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock_quantity } = req.body;
    const sql = 'UPDATE products SET name = ?, description = ?, price = ?, stock_quantity = ? WHERE id = ?';
    db.query(sql, [name, description, price, stock_quantity, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating product', error: err });
        }
        res.status(200).json({ message: 'Product updated' });
    });
}

export const deleteProducts = (req, res ) => {
    const { id } = req.params;
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting product', error: err });
        }
        res.status(200).json({ message: 'Product deleted' });
    });
}


// export const getProduct = (req,res) => {
//     const sql = 'SELECT * FROM products';
//     db.query(sql, (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error fetching products', error: err });
//         }
//         res.status(200).json(results);
//     });    
// }
