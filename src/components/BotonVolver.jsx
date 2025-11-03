import { useNavigate } from "react-router-dom";
import "../css/General.css"; // si querés manejar los estilos globales ahí

export default function BotonVolver({ ruta = "/" }) {
  const navigate = useNavigate();

  return (
    <button
      className="btn-volver"
      onClick={() => navigate(ruta)}
    >
      ← Volver
    </button>
  );
}
