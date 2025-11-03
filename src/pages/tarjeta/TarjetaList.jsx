import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/TarjetaList.css";

export default function TarjetaList() {
  const [tarjetas, setTarjetas] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchTarjetas = async () => {
      try {
        const res = await fetch("http://localhost:3000/tarjetas");
        if (!res.ok) throw new Error("Error al obtener las tarjetas");

        const data = await res.json();
        setTarjetas(data);
      } catch (error) {
        console.error("Error al cargar tarjetas:", error);
        alert("❌ No se pudieron cargar las tarjetas");
      }
    };

    fetchTarjetas();
  }, []);

  return (
    <div className="tarjetas-container">
      <h1 className="titulo-egipcio">Listado de Tarjetas</h1>

      <table className="tabla-egipcia">
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Saldo</th>
            <th>Activa</th>
            <th>ID Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {tarjetas.length > 0 ? (
            tarjetas.map((t) => (
              <tr key={t.id_tarjeta}>
                <td>{t.id_tarjeta}</td>
                <td>{t.codigo}</td>
                <td>${parseFloat(t.saldo).toFixed(2)}</td>
                <td style={{ color: t.activa ? "#00e676" : "#ff5252" }}>
                  {t.activa ? "✅ Sí" : "❌ No"}
                </td>
                <td>{t.id_usuario}</td>
                <td>
                  <button className="btn-egipcio" onClick={() => navigate(`/tarjetas/ver/${t.id_tarjeta}`)}>
                    Ver Tarjeta
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                No hay tarjetas registradas
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button className="btn-volver" onClick={() => navigate("/")}>
        ← Volver
      </button>
    </div>
  );
}