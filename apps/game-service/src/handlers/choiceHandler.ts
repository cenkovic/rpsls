import { Request, Response } from 'express';
import { ChoiceOption } from '../types/Choice';
import { getRandomChoiceOption } from '../utils/random';

export const choiceHandler = async (
  req: Request,
  res: Response<ChoiceOption>
) => {
  try {
  res.send(await getRandomChoiceOption());
  } catch (error) {
    res.status(400).send();
  }
};
