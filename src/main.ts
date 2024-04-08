import express from "express";
import { usuarioRouter } from "./routers/usuarioRouter";

const app = express();
const PORT = process.env.PORT || 4444;

// Definição das rotas
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/usuarios", usuarioRouter);

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta: ${PORT}.`);
});
