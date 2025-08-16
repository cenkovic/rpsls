import { choicesHandler } from './choicesHandler';
import { Request, Response } from 'express';
import { availableChoices } from '../utils/choices';

describe('choicesHandler', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should send the correct list of available choices', async () => {
    await choicesHandler(req as Request, res as Response);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(availableChoices);
  });
});
