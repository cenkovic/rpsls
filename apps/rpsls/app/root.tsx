import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type MetaFunction,
  type LinksFunction,
} from 'react-router';
import { styled,  createGlobalStyle } from 'styled-components';

import { AppNav } from './app-nav';

export const meta: MetaFunction = () => [
  { title: 'Responsive RPSLS App' },
];

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap' },
];

// Global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #6a1b9a, #9c27b0);
    color: #fff;
    scroll-behavior: smooth;
  }

  #root {
    height: 100%;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1; /* Main content grows to fill the available height */
  padding: 1rem;
  width: 100%;
  max-width: 1200px; /* Preferred max width for wide screens */
  margin: 1rem auto; /* Centers the content horizontally */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  border-radius: 8px; /* Rounded corners for better aesthetic */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Subtle shadow effect */
  
  @media (max-width: 768px) { /* Adjusts padding for smaller screens */
    padding: 0.5rem;
  }
`;

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
        <GlobalStyle />
        <PageWrapper>
          <AppNav />
          <MainContent>{children}</MainContent>
          <ScrollRestoration />
          <Scripts />
        </PageWrapper>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
