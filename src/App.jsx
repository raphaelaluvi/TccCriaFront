import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// páginas do site
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Planos from "./pages/Planos";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import EscolherCriancas from "./pages/EscolherCriancas";
import Crianca from "./pages/Crianca";
import Trilha from "./pages/Trilha";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/escolhercriancas" element={<EscolherCriancas />} />
        <Route path="/crianca" element={<Crianca />} />
        <Route path="/trilha" element={<Trilha />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
