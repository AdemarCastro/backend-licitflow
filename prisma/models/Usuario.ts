import { Prisma } from '@prisma/client';

export const UsuarioModel: Prisma.UsuarioCreateInput = {
  cpf: '02535088855',
  nome: 'Ademar Alves Castro Filho',
  email: 'ademar.castro.fh@gmail.com',
  dataNascimento: '23/06/1998',
  senha: '123456Ac*',
  endereco: {
    create: {
      Estado: 'AM',
      Cidade: 'Manaus',
      Bairro: 'Nova Cidade',
      Rua: 'Av. Jorge Teixeira',
      Numero: '1566',
    },
  },
  contato: {
    create: {
      telefoneComercial: 929999999,
      celular: 9999999999,
    },
  },
};
