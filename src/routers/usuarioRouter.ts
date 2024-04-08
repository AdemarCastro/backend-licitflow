import { Router } from "express";
import {
  cadastrarUsuario,
  verificarLogin,
  recuperarSenha,
} from "../controllers/usuarioController";

export const usuarioRouter: Router = Router();

// Controlador Produto
usuarioRouter.post("/cadastrar", cadastrarUsuario);
usuarioRouter.post("/login", verificarLogin);
usuarioRouter.post("/recuperar-senha", recuperarSenha);
