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

// Página de projetos com dados do banco
app.get('/projects', (req, res) => {
  const sql = 'SELECT * FROM projetos';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar projetos:', err.message);
      return res.status(500).send('Erro ao carregar os projetos');
    }

    const projetos = results.map(p => ({
      nome: p.nome,
      descricao: p.descricao,
      url: p.url,
      tecnologias: p.tecnologias?.split(',') || [],
    }));

    res.render('projects', { title: 'Projetos', projetos });
  });
});

// Página de certificados com dados do banco
app.get('/certificates', (req, res) => {
  const sql = 'SELECT * FROM certificados';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar certificados:', err.message);
      return res.status(500).send('Erro ao carregar os certificados');
    }

    const certificados = results.map(c => ({
      nome: c.nome,
      data: c.data,
      link: c.link,
    }));

    res.render('certificates', { title: 'Certificados', certificados });
  });
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


