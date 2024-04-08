import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { create } from "domain";

const prisma = new PrismaClient();

const crypto = require("crypto");

// Gerar uma chave JWT segura com 256 bits
const jwtSecret = crypto.randomBytes(32).toString("hex");

export const cadastrarUsuario = async (req: Request, res: Response) => {
  try {
    const { cpf, nome, email, dataNascimento, senha, endereco, contato } =
      req.body;

    const usuario = await prisma.usuario.create({
      data: {
        cpf,
        nome,
        email,
        dataNascimento,
        senha: await bcrypt.hash(senha, 10),
        endereco: { create: endereco },
        contato: { create: contato },
      },
    });

    res.status(201).json({ usuario });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Erro ao cadastrar usuário", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Erro desconhecido ao cadastrar usuário" });
    }
  }
};

export const verificarLogin = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    const token = jwt.sign({ id: usuario.id }, jwtSecret, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Erro ao verificar login", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Erro desconhecido ao cadastrar usuário" });
    }
  }
};

export const recuperarSenha = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Lógica para recuperar senha

    res.status(200).json({ message: "Senha recuperada com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Erro ao recuperar senha", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Erro desconhecido ao cadastrar usuário" });
    }
  }
};
