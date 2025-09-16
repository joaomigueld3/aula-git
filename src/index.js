import express from 'express';
import {Pool} from 'pg'
const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'db', // Este é o nome do serviço do Postgres no docker-compose
  database: 'minha_db',
  password: 'minha_senha_secreta',
  port: 5432,
});

/* app.get('/', (req,res) => {
    res.send("Rodando no Docker")
}) */

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`<h1>Conexão com o Banco de Dados bem-sucedida!</h1><p>Hora atual do banco: ${result.rows[0].now}</p>`);
  } catch (err) {
    console.error(err);
    res.status(500).send('<h1>Erro ao conectar ao banco de dados</h1>');
  }
});


app.listen(port, () => {
    console.log (`express listening at http://localhost:${port}`)
})