import { playHandler } from './playHandler';
import { getRandomChoiceOption } from '../utils/random';
import { resolveBattle } from '../utils/play';
import { Request, Response } from 'express';
import { ChoiceId } from '../types/Choice';

// Mock dependencies
jest.mock('../utils/random', () => ({
  getRandomChoiceOption: jest.fn(),
}));

jest.mock('../utils/play', () => ({
  resolveBattle: jest.fn(),
}));

describe('playHandler', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      body: {
        player: 1, // Example valid player choice (rock)
      },
    };

    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should return the battle results when valid input is provided', async () => {
    (getRandomChoiceOption as jest.Mock).mockResolvedValueOnce({ id: 2, name: 'paper' }); // Mock computer choice as paper
    (resolveBattle as jest.Mock).mockReturnValueOnce('win'); // Mock battle result as win

    await playHandler(req as unknown as Request<{ player: ChoiceId }>, res as Response);

    expect(getRandomChoiceOption).toHaveBeenCalledTimes(1); // Ensure random choice is called
    expect(resolveBattle).toHaveBeenCalledWith(1, 2); // Ensure resolveBattle is called with correct arguments
    expect(res.send).toHaveBeenCalledWith({
      results: 'win',
      player: 1,
      computer: 2,
    }); // Ensure the response is correct
  });

  it('should handle errors from getRandomChoiceOption gracefully and return 400 status', async () => {
    (getRandomChoiceOption as jest.Mock).mockRejectedValueOnce(new Error('Random service unavailable'));

    await playHandler(req as unknown as Request<{ player: ChoiceId }>, res as Response);

    expect(getRandomChoiceOption).toHaveBeenCalledTimes(1); // Ensure the random service was called
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalled();
  });

  it('should handle errors from resolveBattle gracefully and return 400 status', async () => {
    (getRandomChoiceOption as jest.Mock).mockResolvedValueOnce({ id: 2, name: 'paper' }); // Mock computer choice
    (resolveBattle as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Invalid resolution');
    });

    await playHandler(req as unknown as Request<{ player: ChoiceId }>, res as Response);

    expect(getRandomChoiceOption).toHaveBeenCalledTimes(1); // Ensure random choice was called
    expect(resolveBattle).toHaveBeenCalledTimes(1); // Ensure resolveBattle was called
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalled();
  });
});
