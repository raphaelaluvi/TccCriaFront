import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Infoplano from "./components/Infoplano/Infoplano";
import Footer from "./components/Footer/Footer";
// importar outros componentes depois: Programs, Why, Stats, Planos, Contato, Footer
function App() {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <Infoplano />
      </main>
      <Footer />
    </>
  );
}

export default App;