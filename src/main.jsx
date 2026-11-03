import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'boxicons'
import { InfoProvider } from './context/infoContext.jsx';

AOS.init({
  duration: 1500
});

// Agentation feedback toolbar — dev only, stripped from production builds.
const Agentation = import.meta.env.DEV
  ? lazy(() => import('agentation').then((m) => ({ default: m.Agentation })))
  : null;


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <InfoProvider>
      <App />
      {Agentation && (
        <Suspense fallback={null}>
          <Agentation />
        </Suspense>
      )}
    </InfoProvider>
  </BrowserRouter>,
)
