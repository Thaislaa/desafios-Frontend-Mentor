require("dotenv").config();

const express = require("express");
const cors = require("cors");

const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar no mysql: ", err);
    } else {
        console.log("Conectado com sucesso!");

    }
})

const app = express();

app.use(cors());
app.use(express.json());

app.post("/contact", (req, res) => {
    const { firstName, lastName, email, message, type, consent } = req.body;

    const sql = `
    INSERT INTO contact (firstName, lastName, email, message, type, consent)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

    db.query(
        sql,
        [firstName, lastName, email, message, type, consent],
        (err, result) => {
            if (err) {
                console.error("Erro ao inserir:", err);
                return res.status(500).json({ error: "Erro ao salvar no banco" });
            }

            console.log("Dados salvos no banco ✅");
            return res.json({ message: "Salvo com sucesso!" });
        }
    );
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});