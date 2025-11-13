import { ApiService } from './api';
import { SpotifyPlaylist, VincularPlaylistRequest, PlaylistDorama } from '../types/playlist';

export class PlaylistService extends ApiService {
  // GET /api/spotify/playlists?nomeDorama={nome}
  async buscarPlaylistsSpotify(nomeDorama: string): Promise<SpotifyPlaylist[]> {
    const params = new URLSearchParams({
      nomeDorama: nomeDorama,
    });
    
    return this.makeRequest(`/spotify/playlists?${params.toString()}`);
  }

  // GET /api/playlists/doramas/{doramaId}
  async getPlaylistsDoDorama(doramaId: string): Promise<PlaylistDorama[]> {
    return this.makeRequest(`/playlists/doramas/${doramaId}`);
  }

  // POST /api/playlists
  async vincularPlaylist(data: VincularPlaylistRequest): Promise<void> {
    return this.makeRequest('/playlists', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // DELETE /api/playlists/{id} (se você tiver esse endpoint)
  async desvincularPlaylist(playlistId: string): Promise<void> {
    return this.makeRequest(`/playlists/${playlistId}`, {
      method: 'DELETE',
    });
  }
}

export const playlistService = new PlaylistService();