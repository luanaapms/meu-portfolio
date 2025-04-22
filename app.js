const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
  });

app.get('/projects', (req, res) => {
    const projetos = [
          {
            nome: 'PontoLog',
            descricao: 'Dashboard web projetado para transformar dados brutos logísticos em uma interface visual intuitiva e completa.',
            url: 'https://github.com/CodeDontBlow/PontoLog',
            tecnologias: ['HTML', 'CSS', 'TypeScript', 'ReactJs', 'NodeJs', 'Python', 'Google Colab'],
            imagem: '/img/projetos/LogoPL.svg'
        },
        {
            nome: 'Scrum Tutor',
            descricao: 'Website interativo e educativo que capacite os usuários a dominarem a metodologia Scrum para o gerenciamento eficaz de projetos.',
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


app.listen(port, () => {
    console.log(`Servidor iniciado com sucesso!`);
});


