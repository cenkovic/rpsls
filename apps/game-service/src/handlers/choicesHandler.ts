import { Request, Response } from 'express';
import { ChoiceOption } from '../types/Choice';
import { availableChoices } from '../utils/choices';

export const choicesHandler = async (
  req: Request,
  res: Response<ChoiceOption[]>
) => {
  res.send(availableChoices);
};
