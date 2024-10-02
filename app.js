const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 5041;

app.use(bodyParser.urlencoded({ extended: false }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cimatec',
    database: 'Banco_Do_Bradesco',
});

db.connect((err) => {
    if (err) {
        return console.error('Erro de conexão ao Banco de Dados:', err);
    }
    console.log('Conectado ao Banco de Dados do MySQL, meu nobre.');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public','form.html'));
});

app.post('/submit', (req, res) => {
    const { Nome, Email, Telefone } = req.body;

    if (!Nome || !Email || !Telefone) {
        return res.status(400).send('Todos os campos são obrigatórios!');
    }

    const query = 'INSERT INTO email (Nome, Email, Telefone) VALUES (?, ?, ?)';
    db.query(query, [Nome, Email, Telefone], (err, result) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            return res.status(500).send('Erro ao inserir os dados.');
        }
        res.send('Dados inseridos com sucesso!');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
