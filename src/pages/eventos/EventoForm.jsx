import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/EventoForm.css";

export default function EventoForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [evento, setEvento] = useState({
    nombre: "",
    fecha_inicio: "",
    fecha_fin: "",
    max_gente: "",
  });

  const modoEdicion = Boolean(id);

  
  useEffect(() => {
    if (modoEdicion) {
      const fetchEvento = async () => {
        try {
          const res = await fetch(`http://localhost:3000/eventos/${id}`);
          if (!res.ok) throw new Error("Error al obtener evento");
          const data = await res.json();
          setEvento(data);
        } catch (error) {
          console.error("Error al cargar evento:", error);
        }
      };
      fetchEvento();
    }
  }, [id, modoEdicion]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento({ ...evento, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = modoEdicion
        ? `http://localhost:3000/eventos/${id}`
        : "http://localhost:3000/eventos";
      const method = modoEdicion ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(evento),
      });

      if (res.ok) {
        alert(`Evento ${modoEdicion ? "actualizado" : "creado"} con éxito`);
        navigate("/eventos");
      } else {
        alert("Error al guardar evento");
      }
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <div className="evento-form-container">
      <h1 className="evento-form-titulo">
        {modoEdicion ? "Editar Evento" : "Crear Evento"}
      </h1>

      <form className="evento-form" onSubmit={handleSubmit}>
        <label>Nombre del evento:</label>
        <input
          type="text"
          name="nombre"
          value={evento.nombre}
          onChange={handleChange}
          required
        />

        <label>Fecha de inicio:</label>
        <input
          type="date"
          name="fecha_inicio"
          value={evento.fecha_inicio}
          onChange={handleChange}
          required
        />

        <label>Fecha de fin:</label>
        <input
          type="date"
          name="fecha_fin"
          value={evento.fecha_fin}
          onChange={handleChange}
          required
        />

        <label>Máximo de personas:</label>
        <input
          type="number"
          name="max_gente"
          value={evento.max_gente}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-egipcio">
          {modoEdicion ? "Guardar Cambios" : "Crear Evento"}
        </button>
      </form>

      <button className="btn-volver" onClick={() => navigate("/eventos")}>
        ← Volver
      </button>
    </div>
  );
}
