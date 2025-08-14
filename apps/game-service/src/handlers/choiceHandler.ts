import { Request, Response } from 'express';
import { Choice } from '../types/Choice';
import { getRandomChoiceOption } from '../utils/random';

export const choiceHandler = async (
  req: Request,
  res: Response<{ id: number; name: Choice }>
) => {
  res.send(await getRandomChoiceOption());
};
