import { Routes, Route } from "react-router-dom";
import RequireAuth from "./routes/RequireAuth";
import PublicLayout from "./layouts/PublicLayout";
import RedirectIfAuthed from "./routes/RedirectIfAuthed";

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
import PerfilCrianca from "./pages/PerfilCrianca";
import PerfilResp from "./pages/PerfilResp";
import Progresso from "./pages/Progresso";
import Atividades from "./pages/Atividades";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route element={<RedirectIfAuthed to="/escolhercriancas" /> }>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
          </Route>
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/escolhercriancas" element={<EscolherCriancas />} />
          <Route path="/crianca/:id" element={<Crianca />} />
          <Route path="/trilha/:id/:historia" element={<Trilha />} />
          <Route path="/perfilcrianca/:id" element={<PerfilCrianca />} />
          <Route path="/perfilresponsavel" element={<PerfilResp />} />
          <Route path="/progresso/:id" element={<Progresso />} />
          <Route path="/atividades" element={<Atividades />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
