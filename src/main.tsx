import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {MotionConfig} from 'motion/react';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
);

// Fade out the loading skeleton once the first page has painted.
requestAnimationFrame(() => requestAnimationFrame(() => {
  const sk = document.getElementById('boot-skel');
  if (!sk) return;
  sk.style.opacity = '0';
  setTimeout(() => sk.remove(), 400);
}));
