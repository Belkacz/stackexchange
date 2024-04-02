import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  RecoilRoot,
} from 'recoil';
import { createGlobalStyle } from 'styled-components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const GlobalStyle = createGlobalStyle`
html {
  background-image: linear-gradient(45deg, rgba(0, 150, 136, 0.5), rgba(144, 230, 144, 0.5), rgba(0, 255, 0, 0.5));
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 720px;]
}
`;


root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);

reportWebVitals();
