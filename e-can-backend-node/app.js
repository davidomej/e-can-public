const express = require('express');
const app = express();
const mysql = require('mysql');
const port = process.env.PORT || 3000;
const transporter = require('./emailConfig');
const cors = require('cors');

// BBDD config (MySQL)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'e-can',
  port: 3306,
});

app.use(cors());
app.use(express.json());

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

app.post('/sendEmail', (req, res) => {
  const dataForms = req.body;
  transporter.sendMail({
    from: 'ecan.gestion@outlook.com',
    to: 'ecan.gestion@outlook.com',
    subject: 'Nueva solicitud de contácto',
    text: `Hola Marcos, te avisamos de que ${dataForms.name} ${dataForms.last_name}, ha solicitado información sobre nuestros cursos. \n 
    Este es el mensaje que ha dejado: 
    \n ${dataForms.message} \n 
    Puedes ponerte en contácto en el correo: ${dataForms.email}`,
  }, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado con éxito:', info.response);
      res.status(200).send('Correo enviado con éxito');
    }
  });
});


app.get('/', (req, res) => {
  res.send('Hola, este es tu backend con Express.js');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

