import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Made from "./pages/Made/Made";
import WhereToBuy from "./pages/WhereToBuy/WhereToBuy";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Catalog from "./pages/Catalog/Catalog";
import History from "./pages/History/History"
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/Notfound/Notfound";
import "boxicons";
import { useState } from "react";
import Loader from "./components/Loader/Loader";
import "boxicons/css/boxicons.min.css";
import "./App.css";
function App() {
  const [open, setOpen] = useState(false)
  return (
    <>
      {!open ? (
        <Loader click={setOpen} />
      ) : (
        <div className="body-container">
          <Header />
          <main>
            <Routes>
              <Route path="/" index element={<Home />} />
              <Route path="/made" index element={<Made />} />
              <Route path="/history" index element={<History />} />
              <Route path="/buy" index element={<WhereToBuy />} />
              <Route path="/about" index element={<About />} />
              <Route path="/catalog" index element={<Catalog />} />
              <Route path="/contact" index element={<Contact />} />
              <Route path="*" index element={<Navigate to="/" replace />} />
              {/* <Route path="*" index element={<NotFound />} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
