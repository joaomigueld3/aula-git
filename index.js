import dotenv from'dotenv';
import express from 'express';
import {Pool} from 'pg'

dotenv.config({path: '.env'})

const app = express();
// Usa a porta definida no .env ou 3000 como padrão
const port = process.env.APP_PORT || 3000;

// Configura o pool de conexão usando as variáveis de ambiente
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'), // Converte a porta para número
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`<h1>Conexão com o Banco de Dados bem-sucedida2!</h1><p>Hora atual do banco: ${result.rows[0].now}</p>`);
  } catch (err) {
    console.error('Erro de conexão:', err.stack);
    res.status(500).send('<h1>Erro ao conectar ao banco de dados</h1>');
  }
});

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});