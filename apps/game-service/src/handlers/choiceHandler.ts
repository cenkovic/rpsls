import { Request, Response } from 'express';
import { ChoiceOption } from '../types/Choice';
import { getRandomChoiceOption } from '../utils/random';

export const choiceHandler = async (
  req: Request,
  res: Response<ChoiceOption>
) => {
  res.send(await getRandomChoiceOption());
};
