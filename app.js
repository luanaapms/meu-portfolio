require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Middleware para JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexão MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado ao MySQL!');
});

// Rotas
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/projects', (req, res) => {
  const projetos = [
    {
      nome: 'PontoLog',
      descricao: 'Dashboard Web projetado de dados logísticos sobre o desempenho dos Estados Brasileiros no comércio exterior em uma interface visual intuitiva.',
      url: 'https://github.com/CodeDontBlow/PontoLog',
      tecnologias: ['HTML', 'CSS', 'TypeScript', 'ReactJs', 'Python', 'Google Colab'],
      imagem: '/img/projetos/LogoPL.svg'
    },
    {
      nome: 'Scrum Tutor',
      descricao: 'Website interativo e educativo, com módulos e jogos, que capacite os usuários a dominarem a metodologia Scrum para o gerenciamento eficaz de projetos.',
      url: 'https://github.com/CodeDontBlow/Scrum-Tutor',
      tecnologias: ['HTML', 'CSS', 'Bootstrap', 'Python', 'Flask', 'JavaScript', 'MySQL', 'AWS'],
      imagem: '/img/projetos/LogoST.svg'
    },
    {
      nome: 'DocEye',
      descricao: 'Software de extração de informações desenvolvido para automatizar e otimizar processos seletivos, facilitando a análise de documentos como os currículos.',
      url: 'https://github.com/CodeDontBlow/DocEye',
      tecnologias: ['Java', 'JavaFX', 'Ollama', 'MySQL', 'Apache Maven', 'Tesseract OCR'],
      imagem: '/img/projetos/LogoDE.svg'
    },
    {
      nome: 'S.P.A',
      descricao: 'Aplicativo funcional para dispositivos móveis, visando a proteção pessoal fornecendo um meio de segurança e comunicação entre as pessoas.',
      url: 'https://github.com/luanaapms/tcc-app-mobile',
      tecnologias: ['JavaScript', 'ReactNative', 'MySQL', 'Maps API´s',],
      imagem: '/img/projetos/LogoSPA.svg'
    },
  ];

  res.render('projects', { title: 'Projetos', projetos });
});


app.get("/certificates", (req, res) => {
  const certificados = [
    {
      nome: 'Certificado de Transformação Digital',
      data: 'Agosto de 2024',
      link: '/img/certificados/Certificado Transformação Digital.pdf'
    },
    {
      nome: 'Certificado de Excel na Prática',
      data: 'Setembro de 2024',
      link: '/img/certificados/Certificado Excel.pdf'
    },
    {
      nome: 'Certificado de Programação Orientada a Objetos',
      data: 'Outubro de 2024',
      link: '/img/certificados/Certificado POO.pdf'
    },
    {
      nome: 'Certificado de Hardware e Software',
      data: 'Outubro de 2024',
      link: '/img/certificados/Certificado Hardware e Software.pdf'
    },
    {
      nome: 'Certificado de Microsoft Power BI',
      data: 'Outubro de 2024',
      link: '/img/certificados/Certificado Microsoft Power BI.pdf'
    },
    {
      nome: 'Certificado de Cibersegurança',
      data: 'Novembro de 2023',
      link: '/img/certificados/Certificado Cibersegurança.pdf'
    }
  ];

  res.render("certificates", { title: "Certificados", certificados });
});

// CRUD Projetos
// CREATE
app.post('/projetos', (req, res) => {
  const { nome, descricao, url, tecnologias } = req.body;
  const sql = 'INSERT INTO projetos (nome, descricao, url, tecnologias) VALUES (?, ?, ?, ?)';
  db.query(sql, [nome, descricao, url, tecnologias], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ id: result.insertId, nome, descricao, url, tecnologias });
  });
});

// READ todos
app.get('/projetos-db', (req, res) => {
  db.query('SELECT * FROM projetos', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// READ por ID
app.get('/projetos/:id', (req, res) => {
  db.query('SELECT * FROM projetos WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send({ mensagem: 'Projeto não encontrado' });
    res.send(result[0]);
  });
});

// UPDATE
app.put('/projetos/:id', (req, res) => {
  const { nome, descricao, url, tecnologias } = req.body;
  const sql = 'UPDATE projetos SET nome = ?, descricao = ?, url = ?, tecnologias = ? WHERE id = ?';
  db.query(sql, [nome, descricao, url, tecnologias, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ mensagem: 'Projeto atualizado com sucesso' });
  });
});

// DELETE
app.delete('/projetos/:id', (req, res) => {
  db.query('DELETE FROM projetos WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ mensagem: 'Projeto excluído com sucesso' });
  });
});

// CRUD Certificados
// CREATE 
app.post('/certificados', (req, res) => {
  const { nome, data, link } = req.body;
  const sql = 'INSERT INTO certificados (nome, data, link) VALUES (?, ?, ?)';
  db.query(sql, [nome, data, link], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ id: result.insertId, nome, data, link });
  });
});

// READ todos 
app.get('/certificados', (req, res) => {
  db.query('SELECT * FROM certificados', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// READ por ID 
app.get('/certificados/:id', (req, res) => {
  db.query('SELECT * FROM certificados WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send({ mensagem: 'Certificado não encontrado' });
    res.send(result[0]);
  });
});

// UPDATE 
app.put('/certificados/:id', (req, res) => {
  const { nome, data, link } = req.body;
  const sql = 'UPDATE certificados SET nome = ?, data = ?, link = ? WHERE id = ?';
  db.query(sql, [nome, data, link, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ mensagem: 'Certificado atualizado com sucesso' });
  });
});

// DELETE 
app.delete('/certificados/:id', (req, res) => {
  db.query('DELETE FROM certificados WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ mensagem: 'Certificado excluído com sucesso' });
  });
});

app.listen(port, () => {
  console.log(`Servidor iniciado com sucesso!`);
});


