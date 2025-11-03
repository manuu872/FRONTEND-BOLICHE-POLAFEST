import React from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <img src="fondobol.jpeg"alt="fondoLog"className="background-logo"/>
      <div className="logo-section">
        <img src="/logo.png" alt="PolaFest Logo" className="logo-home" />
        
      </div>

      
      <div className="cards-container">
        <Link to="/bebidas" className="card">
          <img src="/bebidas.png" alt="Bebidas" />
        </Link>

        <Link to="/usuarios" className="card">
          <img src="/usuarios.png" alt="Usuario" />
        </Link>

        <Link to="/eventos" className="card">
          <img src="/eventos.png" alt="Eventos" />
        </Link>
         <Link to="/tarjetas" className="card">
          <img src="/tarjetas.png" alt="Tarjetas" />
        </Link>
        <Link to="/ventas" className="card">
          <img src="/cajero.png" alt="Cajero" />
        </Link>
         <Link to="/estadisticas" className="card">
          <img src="/estadisticas.png" alt="Estadisticas" />
        </Link>

      </div>
    </div>
  );
}
