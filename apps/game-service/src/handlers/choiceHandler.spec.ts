import { choiceHandler } from './choiceHandler';
import { Request, Response } from 'express';
import { getRandomChoiceOption } from '../utils/random';
import { ChoiceOption } from '../types/Choice';

// Mock `getRandomChoiceOption`
jest.mock('../utils/random', () => ({
  getRandomChoiceOption: jest.fn(),
}));

describe('choiceHandler', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  afterEach(jest.clearAllMocks)

  beforeEach(() => {
    req = {};
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should return a valid random choice option', async () => {
    const mockChoice: ChoiceOption = { id: 1, name: 'rock' };
    (getRandomChoiceOption as jest.Mock).mockResolvedValueOnce(mockChoice);

    await choiceHandler(req as Request, res as Response);

    expect(getRandomChoiceOption).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(mockChoice);
  });

  it('should handle errors gracefully and return 400 status', async () => {
    (getRandomChoiceOption as jest.Mock).mockRejectedValueOnce(new Error('Random service unavailable'));

    await choiceHandler(req as Request, res as Response);

    expect(getRandomChoiceOption).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledTimes(1);
  });
});
