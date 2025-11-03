import { useNavigate, useLocation } from "react-router-dom";
import "../css/Navegacion.css";

export default function Navegacion() {
  const navigate = useNavigate();
  const location = useLocation();

  
  if (location.pathname === "/") return null;

  return (
    <div className="barra-navegacion-vertical">
      <button onClick={() => navigate("/usuarios")}>🧍‍♂️ Usuarios</button>
      <button onClick={() => navigate("/eventos")}>🎫 Eventos</button>
      <button onClick={() => navigate("/bebidas")}>🍸 Bebidas</button>
      <button onClick={() => navigate("/tarjetas")}>💳 Tarjetas</button>
      <button onClick={() => navigate("/ventas")}>💰 Cajero</button>
    </div>
  );
}
