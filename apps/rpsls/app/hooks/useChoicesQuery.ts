import { useQuery } from '@tanstack/react-query';
import { gameService } from '../services/game-service';

export const useChoicesQuery = () => {
  return useQuery({ queryKey: ['choices'], queryFn: gameService.getChoices });
};
