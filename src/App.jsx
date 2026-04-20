import { lazy, Suspense, useState } from "react";
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

const routes = [
  { path: "/", element: <Home /> },
  { path: "/made", element: <Made /> },
  { path: "/history", element: <History /> },
  { path: "/buy", element: <WhereToBuy /> },
  { path: "/about", element: <About /> },
  { path: "/catalog", element: <Catalog /> },
  { path: "/contact", element: <Contact /> },
];

const App = () => {
  const [entered, setEntered] = useState(false);

  if (!entered) return <Loader onDismiss={() => setEntered(true)} />;

  return (
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
  );
};

export default App;
