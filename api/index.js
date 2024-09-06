const express = require('express')
const mysql2 = require('mysql2');

const PORT = 3000;
const HOST = '0.0.0.0' //Uma forma do docker entender que ele só precisa repassar a porta 3000

const connection = mysql2.createConnection({
    host: 'database-mysql',
    //host: 'localhost',
    user: 'root',
    password: '123',
    database: 'fiap',
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });

const app = express()


app.get('/', (req, res) => {
    const query = 'SELECT * FROM products';

    connection.query(query, (err, results, fields) => {
      if (err) {
        console.error('Error executing SELECT query:', err);
        return;
      }
    
      //console.log('Query results:');
      res.send(results.map(item => ({ name: item.name, price: item.price })));
 
    });
})


app.listen(PORT, HOST)