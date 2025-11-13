export interface SpotifyPlaylist {
  spotifyPlaylistId: string;
  nome: string;
  url: string;
  imagemUrl: string;
  dono: string;
  totalMusicas: number;
}

export interface VincularPlaylistRequest {
  doramaId: string;
  spotifyPlaylistId: string;
  nome: string;
  url: string;
  imagemUrl: string;
  dono: string;
  totalMusicas: number;
}

export interface PlaylistDorama {
  id: string;
  doramaId: string;
  spotifyPlaylistId: string;
  nome: string;
  url: string;
  imagemUrl: string;
  dono: string;
  totalMusicas: number;
  dataCriacao: string;
}