import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type MetaFunction,
  type LinksFunction,
} from 'react-router';
import './root.css';

import { AppNav } from './app-nav';

export const meta: MetaFunction = () => [
  { title: 'RPSLS App' },
];

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body>
      <div id='page-wrapper'>
          <AppNav />
          <div id={'main-content'}>{children}</div>
          <ScrollRestoration />
          <Scripts />
      </div>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
