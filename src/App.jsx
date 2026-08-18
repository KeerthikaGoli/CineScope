import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";
import Search from "./pages/Search";
import Genres from "./pages/Genres";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/search" element={<Search />} />

        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/watchlist" element={<Watchlist />} />

        <Route path="/genre/:id" element={<Genres />} />

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>

      <Footer />

    </>
  );
}

export default App;
