import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Bebidas.css";
import BotonVolver from "../../components/BotonVolver";

export default function BebidasList() {
  const navigate = useNavigate();
  const [bebidas, setBebidas] = useState([]);

  
  useEffect(() => {
    const fetchBebidas = async () => {
      try {
        const res = await fetch("http://localhost:3000/productos");
        if (!res.ok) throw new Error("Error al obtener productos");
        const data = await res.json();
        setBebidas(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchBebidas();
  }, []);


  const eliminarBebida = async (id_producto) => {
    const confirmar = window.confirm("¿Seguro que querés eliminar esta bebida?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:3000/productos/${id_producto}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBebidas(bebidas.filter((b) => b.id_producto !== id_producto));
      } else {
        console.error("Error al eliminar producto");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div className="bebidas-container">
      <h1 className="titulo-egipcio">Listado de Bebidas</h1>

      <button className="btn-crear" onClick={() => navigate("/bebidas/nueva")}>
        + Agregar bebida
      </button>

      <table className="tabla-egipcia">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {bebidas.length > 0 ? (
            bebidas.map((b) => (
              <tr key={b.id_producto}>
                <td>{b.id_producto}</td>
                <td>{b.nombre}</td>
                <td>{b.tipo}</td>
                <td>${b.precio.toLocaleString("es-AR")}</td>
                <td
                  style={{
                    color:
                      b.stock <= 5 ? "#ff5252" : b.stock < 15 ? "#ffd54f" : "#00e676",
                    fontWeight: "bold",
                  }}
                >
                  {b.stock}
                </td>
                <td className="acciones-egipcias">
                  <button
                    className="btn-egipcio editar"
                    onClick={() => navigate(`/bebidas/editar/${b.id_producto}`)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-egipcio eliminar"
                    onClick={() => eliminarBebida(b.id_producto)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                No hay bebidas cargadas
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <BotonVolver ruta="/" />
      </div>
    </div>
  );
}
