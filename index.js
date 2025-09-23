import dotenv from'dotenv';
import express from 'express';
import {Pool} from 'pg';
import os from 'os';

dotenv.config({path: '.env'})

const app = express();
// Usa a porta definida no .env ou 3000 como padrão
const port = process.env.APP_PORT || 3000;

// Configura o pool de conexão usando as variáveis de ambiente
/* const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'), // Converte a porta para número
}); */

app.get('/', (req, res) => {
  console.log(`[${new Date().toISOString()}] Nova requisição recebida!`);
  res.json({
    message: "Olá, mundo! Esta é minha primeira app no Kubernetes!",
    version: "1.0.0",
    hostname: os.hostname() // Mostra o nome do Pod, que é útil para ver o balanceamento de carga
  });
});

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});