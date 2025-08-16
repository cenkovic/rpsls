import { gameService } from '../../app/services/game-service';

jest.mock('../../app/constants', () => ({
  // Mock GAME_SERVICE_URL to control it during tests
  GAME_SERVICE_URL: 'http://localhost:3000',
}));

global.fetch = jest.fn();

describe('GameService', () => {
  const mockGameServiceUrl = 'http://localhost:3000';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch choices successfully', async () => {
    const mockChoices = [
      { id: 1, name: 'rock' },
      { id: 2, name: 'paper' },
    ];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockChoices,
    });

    const result = await gameService.getChoices();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${mockGameServiceUrl}/choices`, {
      headers: { 'Content-Type': 'application/json' },
    });
    expect(result).toEqual(mockChoices);
  });

  it('should throw an error if fetching choices fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(gameService.getChoices()).rejects.toThrow('HTTP error! status: 500');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should send play data and return results successfully', async () => {
    const playerChoiceId = 1;
    const playerName = 'Player1';
    const mockResponse = {
      player: playerChoiceId,
      computer: 2,
      results: 'win',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await gameService.play(playerChoiceId, playerName);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${mockGameServiceUrl}/play`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player: playerChoiceId, playerName }),
    });
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if play request fails', async () => {
    const playerChoiceId = 1;
    const playerName = 'Player1';

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    await expect(gameService.play(playerChoiceId, playerName)).rejects.toThrow('HTTP error! status: 400');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
