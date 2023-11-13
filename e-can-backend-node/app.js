const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const transporter = require('./emailConfig');
const cors = require('cors');
const sanitizeHtml = require('sanitize-html');
const firebase_admin = require('./firebase-admin-init');
const bucket = firebase_admin.storage().bucket();


app.use(cors());
app.use(express.json());

// GET COURSES ENDPOINT
const db = firebase_admin.firestore();

function getAllCourses() {
  return db.collection('courses').get()
    .then((snapshot) => {
      const courses = [];
      snapshot.forEach((doc) => {
        console.log(doc.data);
        courses.push(doc.data());
      });
      return courses;
    })
    .catch((error) => {
      console.log('Error al obtener los cursos:', error);
    });
}

app.get('/api/all-courses', (req, res) => {
  getAllCourses()
    .then((courses) => {
      res.status(200).json(courses);
    })
    .catch((error) => {
      res.status(500).json({error: 'Error al obtener los cursos'});
    });
});

app.get('/api/images', (req, res) => {
  getImages()
    .then((images) => {
      res.status(200).json(images);
    })
    .catch((error) => {
      res.status(500).json({error: 'Error al obtener las imágenes'});
    });
});

// SEND EMAIL ENDPOINT
app.post('/sendEmail', (req, res) => {
  const dataForms = req.body;
  const sanitizedMessage = sanitizeHtml(dataForms.message, {
    allowedTags: ['b', 'i'],
    allowedAttributes: {},
  });

  const response = {
    message: 'Correo enviado con éxito',
    info: {},
  };

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
      res.status(500).json({error: 'Error al enviar el correo'});
    } else {
      console.log('Correo enviado con éxito:', info.response);
      res.status(200).json(response);
    }
  });
});


app.get('/', (req, res) => {
  res.send('Hola, este es tu backend con Express.js');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

