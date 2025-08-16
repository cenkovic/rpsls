import { useMutation } from '@tanstack/react-query';
import { gameService } from '../services/game-service';

export const usePlayMutation = () => {
  return useMutation({
    mutationFn: gameService.play,
  })
};
