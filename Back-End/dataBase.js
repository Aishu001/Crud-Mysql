import mysql from 'mysql2';

 const db = mysql.createConnection({
    host: 'localhost',     
    user: 'root',   
    password: 'Aishu@1000C',  
    database: 'testOne_DB'    
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

export default db;
