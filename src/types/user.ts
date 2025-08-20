export interface Usuario {
  id: string;
  nomeUsuario: string;
  email: string;
  nomeExibicao?: string;
  bio?: string;
  avatar?: string;
  seguidores: number;
  seguindo: number;
  dataCriacao: Date;
}

export interface UsuarioRegistro {
  nomeUsuario: string;
  email: string;
  senha: string;
}

export interface UsuarioLogin {
  email: string;
  senha: string;
}

export interface UsuarioUpdate {
  nomeExibicao?: string;
  bio?: string;
  avatar?: string;
}
