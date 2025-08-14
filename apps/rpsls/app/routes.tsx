import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./routes/game.tsx'),
  route('scoreboard', './routes/scoreboard.tsx'),
] satisfies RouteConfig;
