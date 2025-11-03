import { Routes, Route } from "react-router-dom";
import LoginRegister from "./LoginRegister";
import Login from "./Login";
import Register from "./Register";
import Home from "./pages/Home";
import UsuarioList from "./pages/usuarios/UsuarioList";
import UsuarioForm from "./pages/usuarios/UsuarioForm";
import Eventos from "./pages/eventos/Eventos";
import EventoDetalle from "./pages/eventos/EventoDetalle";
import MovimientoTarjeta from "./pages/tarjeta/MovimientoTarjeta";
import ConsumoEvento from "./pages/eventos/ConsumoEvento";
import BebidasList from "./pages/bebidas/BebidasList";
import BebidasForm from "./pages/bebidas/BebidasForm";
import EntradasList from "./pages/entradas/EntradasList";
import EventoForm from "./pages/eventos/EventoForm";
import VentaForm from "./pages/ventas/VentaForm";
import Navegacion from "./components/Navegacion";
import Tarjeta from "./pages/tarjeta/Tarjeta";
import TarjetaList from "./pages/tarjeta/TarjetaList";
import Estadisticas from "./pages/estadisticas/Estadisticas";


function App() {
  return (
    <>
    <Routes>
      {/*}
      <Route path="/" element={<LoginRegister />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      */}
      <Route path="/" element={<Home />} />
      <Route path="/usuarios" element={<UsuarioList />} />
      <Route path="/usuarios/nuevo" element={<UsuarioForm />} />
      <Route path="/usuarios/editar/:id" element={<UsuarioForm />} />
      
      <Route path="/eventos" element={<Eventos />} />

      <Route path="/evento/:id" element={<EventoDetalle />} />
      
      <Route path="/movimientos/:idTarjeta" element={<MovimientoTarjeta />} />
      <Route path="/consumos/:id" element={<ConsumoEvento />} />
      <Route path="/bebidas" element={<BebidasList />} />
      <Route path="/bebidas/nueva" element={<BebidasForm />} />
      <Route path="/bebidas/editar/:id" element={<BebidasForm />} />
      <Route path="/entradas/:id_evento" element={<EntradasList />} />

      <Route path="/eventos/nuevo" element={<EventoForm />} />
      <Route path="/eventos/editar/:id" element={<EventoForm />} />
      <Route path="/ventas" element={<VentaForm />} />

      <Route path="/tarjetas" element={<TarjetaList />} />
      <Route path="/tarjetas/ver/:id" element={<Tarjeta />} />
      <Route path="/estadisticas" element={<Estadisticas />} />

    </Routes>
    <Navegacion/>
    </>
  );
}

export default App;
