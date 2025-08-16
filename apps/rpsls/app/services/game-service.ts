import { Choice } from '../types/Choice';
import { GAME_SERVICE_URL } from '../constants';

class GameService {
  private gameServiceUrl: string;

  constructor() {
    this.gameServiceUrl = GAME_SERVICE_URL;
    if (!this.gameServiceUrl) {
      throw new Error('Missing game service url');
    }
  }

  private request = async (endpoint: string, options?: RequestInit) => {
    const { headers, ...restOptions } = options ?? {};
    const response = await fetch(`${this.gameServiceUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...restOptions,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };

  private get = async (endpoint: string) => this.request(endpoint);

  private post = async (endpoint: string, data: RequestInit['body']) =>
    this.request(endpoint, { method: 'POST', body: data });

  getChoices = (): Promise<Choice[]> => this.get('/choices');

  play = (
    playerChoiceId: number,
    playerName?: string
  ): Promise<{ player: number; computer: number; results: string }> =>
    this.post('/play', JSON.stringify({ player: playerChoiceId, playerName }));
}

export const gameService = new GameService();
