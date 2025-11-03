import React, { useEffect, useState } from "react";
import "../../css/Estadisticas.css";
import BotonVolver from "../../components/BotonVolver";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Estadisticas() {
  const [ventasPorEvento, setVentasPorEvento] = useState([]);
  const [productosTop, setProductosTop] = useState([]);
  const [usuariosTop, setUsuariosTop] = useState([]);
 

 
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [ventas, productos, usuarios,] = await Promise.all([
          fetch("http://localhost:3000/estadisticas/ventas-por-evento").then((r) => r.json()),
          fetch("http://localhost:3000/estadisticas/productos-mas-vendidos").then((r) => r.json()),
          fetch("http://localhost:3000/estadisticas/usuarios-top").then((r) => r.json()),
          
        ]);

        setVentasPorEvento(Array.isArray(ventas) ? ventas : []);
        setProductosTop(Array.isArray(productos) ? productos : []);
        setUsuariosTop(Array.isArray(usuarios) ? usuarios : []);
        
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      }
    };
    cargarDatos();
  }, []);

  const COLORS = ["#FFD700", "#B8860B", "#DAA520", "#8B8000"];

  return (
    <div className="estadisticas-container">
      <h1 className="titulo-egipcio">📊 Estadísticas de Polafest</h1>

      <div className="estadisticas-grid">
        
        <div className="estadistica-card">
          <h2>🍸 Ventas por Evento</h2>
          {ventasPorEvento.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ventasPorEvento}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="evento" stroke="#FFD700" />
                <YAxis stroke="#FFD700" />
                <Tooltip
                formatter={(value) => `$${Number(value).toFixed(2)}`}
                labelStyle={{ color: "#FFD700" }}
               contentStyle={{
               backgroundColor: "rgba(20,20,20,0.9)",
                border: "1px solid #FFD700",
                }}
                />

                <Bar dataKey="total_recaudado" fill="#FFD700" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>Sin datos disponibles</p>
          )}
        </div>

        
        <div className="estadistica-card">
          <h2>🏆 Productos más vendidos</h2>
          {productosTop.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={productosTop}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="producto" stroke="#FFD700" />
                <YAxis stroke="#FFD700" />
                <Tooltip
                formatter={(value) => `$${Number(value).toFixed(2)}`}
                labelStyle={{ color: "#FFD700" }}
                contentStyle={{
                backgroundColor: "rgba(20,20,20,0.9)",
                border: "1px solid #FFD700",
                 }}
                />

                <Bar dataKey="total_vendido" fill="#DAA520" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>Sin datos disponibles</p>
          )}
        </div>

        
        <div className="estadistica-card">
          <h2>👑 Usuarios que más gastaron</h2>
          {usuariosTop.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={usuariosTop}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="usuario" stroke="#FFD700" />
                <YAxis stroke="#FFD700" />
                <Tooltip
                formatter={(value) => `$${Number(value).toFixed(2)}`}
                labelStyle={{ color: "#FFD700" }}
                contentStyle={{
                backgroundColor: "rgba(20,20,20,0.9)",
                border: "1px solid #FFD700",
                }}
                />

                <Bar dataKey="gasto_total" fill="#B8860B" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>Sin datos disponibles</p>
          )}
        </div>

      
      </div>

      <BotonVolver ruta="/" />
    </div>
  );
}
