const express = require('express');
const app = express();
const mysql = require('mysql');
const port = process.env.PORT || 3000;

// BBDD config (MySQL)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'e-can',
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
  }
});

app.get('/getUsers', (req,res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error('Error al obtener los usuarios:', err);
    } else {
      res.send(result);
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hola, este es tu backend con Express.js');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
