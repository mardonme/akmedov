import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import PageFallback from "./components/PageFallback/PageFallback";
import "boxicons";
import "boxicons/css/boxicons.min.css";
import "./App.css";

const Home = lazy(() => import("./pages/Home/Home"));
const Made = lazy(() => import("./pages/Made/Made"));
const History = lazy(() => import("./pages/History/History"));
const WhereToBuy = lazy(() => import("./pages/WhereToBuy/WhereToBuy"));
const About = lazy(() => import("./pages/About/About"));
const Catalog = lazy(() => import("./pages/Catalog/Catalog"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Delivery = lazy(() => import("./pages/Delivery/Delivery"));
const routes = [
  { path: "/", element: <Home /> },
  { path: "/made", element: <Made /> },
  { path: "/history", element: <History /> },
  { path: "/buy", element: <WhereToBuy /> },
  { path: "/about", element: <About /> },
  { path: "/catalog/icecream", element: <Catalog category="icecream" /> },
  { path: "/catalog/syroki", element: <Catalog category="syroki" /> },
  { path: "/catalog", element: <Navigate to="/catalog/icecream" replace /> },
  { path: "/contact", element: <Contact /> },
  { path: "/dostavka", element: <Delivery /> }
];

// Splash timing: the logo shows for SPLASH_MS, then fades out over FADE_MS
// (keep in sync with the transition in Loader.scss) while the site mounts
// underneath it.
const SPLASH_MS = 1200;
const FADE_MS = 500;

const App = () => {
  // "splash" → "leaving" (site mounted, loader fading) → "done"
  const [stage, setStage] = useState("splash");

  useEffect(() => {
    const reveal = setTimeout(() => setStage("leaving"), SPLASH_MS);
    const done = setTimeout(() => setStage("done"), SPLASH_MS + FADE_MS);
    return () => {
      clearTimeout(reveal);
      clearTimeout(done);
    };
  }, []);

  return (
    <>
      {stage !== "splash" && (
        <div className="body-container">
          <Header />
          <main>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                {routes.map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      )}
      {stage !== "done" && <Loader leaving={stage === "leaving"} />}
    </>
  );
};

export default App;
