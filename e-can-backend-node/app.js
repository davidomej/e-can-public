const express = require('express');
const app = express();
const mysql = require('mysql');
const port = process.env.PORT || 3000;
const transporter = require('./emailConfig');
const cors = require('cors');
const sanitizeHtml = require('sanitize-html');

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
  const sanitizedMessage = sanitizeHtml(dataForms.message, {
    allowedTags: ['b', 'i'],
    allowedAttributes: {},
  });

  const htmlBody = `
    <p>Hola Marcos, te avisamos de que <strong>${dataForms.name} ${dataForms.last_name}</strong>, ha solicitado información sobre nuestros cursos.</p>
    <p>Este es el mensaje que ha dejado:</p>
    <br>
    <p style="border: 1px solid black; padding 20px;"><i>${sanitizedMessage}</i></p>
    <br>
    <p>Puedes ponerte en contácto en el correo: <strong><a href="mailto:${dataForms.email}">${dataForms.email}</a></strong></p>`;

  transporter.sendMail({
    from: 'ecan.gestion@outlook.com',
    to: 'ecan.gestion@outlook.com',
    subject: 'Nueva solicitud de contácto',
    html: htmlBody,
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

