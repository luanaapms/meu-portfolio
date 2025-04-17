const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
  });

app.listen(port, () => {
    console.log(`Servidor iniciado com sucesso!`);
});


