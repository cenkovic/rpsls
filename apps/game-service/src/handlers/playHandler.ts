import { Request, Response } from 'express';
import { getRandomChoiceOption } from '../utils/random';
import { ChoiceId } from '../types/Choice';
import { resolveBattle } from '../utils/play';

export const playHandler = async (
  req: Request<{ player: ChoiceId }>,
  res: Response
) => {
  try {
    const playerChoiceId = req.body.player;
    const computerChoice = await getRandomChoiceOption();
    const results = resolveBattle(playerChoiceId, computerChoice.id);
    res.send({
      results: results,
      player: playerChoiceId,
      computer: computerChoice.id,
    });
  } catch (error) {
    res.status(400).send();
  }
};
