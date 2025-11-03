import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Eventos.css";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const res = await fetch("http://localhost:3000/eventos");
        if (!res.ok) throw new Error("Error al obtener eventos");
        const data = await res.json();
        setEventos(data);
      } catch (error) {
        console.error("Error al cargar eventos:", error);
       
        setEventos([
          {
            id_evento: 1,
            nombre: "Noche Anubis",
            fecha_inicio: "2025-11-05",
            fecha_fin: "2025-11-06",
            max_gente: 300,
            imagen: "/evento1.png",
          },
          {
            id_evento: 2,
            nombre: "Faraón Party",
            fecha_inicio: "2025-12-20",
            fecha_fin: "2025-12-21",
            max_gente: 450,
            imagen: "/evento2.png",
          },
          {
            id_evento: 3,
            nombre: "Oasis Electrónico",
            fecha_inicio: "2026-01-10",
            fecha_fin: "2026-01-11",
            max_gente: 500,
            imagen: "/evento3.png",
          },
        ]);
      }
    };

    fetchEventos();
  }, []);


  const eliminarEvento = async (id_evento) => {
    const confirmar = window.confirm("¿Seguro que querés eliminar este evento?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:3000/eventos/${id_evento}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setEventos(eventos.filter((e) => e.id_evento !== id_evento));
      } else {
        console.error("Error al eliminar evento");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div className="eventos-container">
      <h1 className="titulo-egipcio">Eventos de PolaFest</h1>

     
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          className="btn-egipcio"
          onClick={() => navigate("/eventos/nuevo")}
        >
          + Crear Evento
        </button>
      </div>

      <div className="carrusel">
        {eventos.map((e) => (
          <div key={e.id_evento} className="evento-card">
            <img src={e.imagen} alt={e.nombre} className="evento-imagen" />

            <div className="evento-info">
              <h2>{e.nombre}</h2>
              <p>
                <strong>Inicio:</strong>{" "}
                {new Date(e.fecha_inicio).toLocaleDateString()}
              </p>
              <p>
                <strong>Fin:</strong>{" "}
                {new Date(e.fecha_fin).toLocaleDateString()}
              </p>
              <p>
                <strong>Máx. Personas:</strong> {e.max_gente}
              </p>

              <div className="botones-evento">
                <button
                  className="btn-egipcio"
                  onClick={() => navigate(`/consumos/${e.id_evento}`)}
                >
                  🍸 Ver consumos
                </button>

                

                <button
                  className="btn-egipcio editar"
                  onClick={() => navigate(`/eventos/editar/${e.id_evento}`)}
                >
                  ✏️ Editar
                </button>

                <button
                  className="btn-egipcio eliminar"
                  onClick={() => eliminarEvento(e.id_evento)}
                >
                  ❌ Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-volver" onClick={() => navigate("/")}>
        ← Volver
      </button>
    </div>
  );
}
