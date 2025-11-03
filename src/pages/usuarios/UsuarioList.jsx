import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Usuarios.css";
import BotonVolver from "../../components/BotonVolver";

export default function UsuarioList() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [tarjetas, setTarjetas] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resUsuarios, resTarjetas] = await Promise.all([
          fetch("http://localhost:3000/usuarios"),
          fetch("http://localhost:3000/tarjetas"),
        ]);

        if (!resUsuarios.ok || !resTarjetas.ok)
          throw new Error("Error al obtener datos");

        const dataUsuarios = await resUsuarios.json();
        const dataTarjetas = await resTarjetas.json();

        setUsuarios(dataUsuarios);
        setTarjetas(dataTarjetas);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        alert("❌ No se pudieron cargar los usuarios o tarjetas");
      }
    };

    fetchData();
  }, []);

  
  const obtenerTarjetaUsuario = (id_usuario) =>
    tarjetas.find((t) => t.id_usuario === id_usuario);

  
  const crearTarjeta = async (id_usuario) => {
    const confirmar = window.confirm(
      "¿Querés crear una nueva tarjeta para este usuario?"
    );
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:3000/tarjetas/crear/${id_usuario}`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Error al crear tarjeta");

      const data = await res.json();
      alert(`✅ Tarjeta creada correctamente (${data.codigo})`);

      
      setTarjetas([...tarjetas, data]);
    } catch (error) {
      console.error("Error al crear tarjeta:", error);
      alert("❌ No se pudo crear la tarjeta");
    }
  };

  
  const eliminarUsuario = async (id_usuario) => {
    const confirmar = window.confirm("¿Seguro que querés eliminar este usuario?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:3000/usuarios/${id_usuario}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsuarios(usuarios.filter((u) => u.id_usuario !== id_usuario));
      } else {
        console.error("Error al eliminar usuario");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div className="usuarios-container">
      <h1 className="titulo-egipcio">Lista de Usuarios</h1>

      <button className="btn-crear" onClick={() => navigate("/usuarios/nuevo")}>
        + Crear nuevo usuario
      </button>

      <table className="tabla-egipcia">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((u) => {
              const tarjetaUsuario = obtenerTarjetaUsuario(u.id_usuario);

              return (
                <tr key={u.id_usuario}>
                  <td>{u.id_usuario}</td>
                  <td>{u.nombre}</td>
                  <td>{u.apellido}</td>
                  <td>{u.dni}</td>
                  <td>{u.email}</td>
                  <td>{u.rol}</td>
                  <td className="acciones-egipcias">
                    <button
                      className="btn-egipcio editar"
                      onClick={() => navigate(`/usuarios/editar/${u.id_usuario}`)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn-egipcio eliminar"
                      onClick={() => eliminarUsuario(u.id_usuario)}
                    >
                      Eliminar
                    </button>

                    
                    {tarjetaUsuario ? (
                      <button
                        className="btn-egipcio ver-tarjeta"
                        onClick={() =>
                          navigate(`/tarjetas/ver/${tarjetaUsuario.id_tarjeta}`)
                        }
                      >
                        Ver Tarjeta
                      </button>
                    ) : (
                      <button
                        className="btn-egipcio crear-tarjeta"
                        onClick={() => crearTarjeta(u.id_usuario)}
                      >
                        Crear Tarjeta
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                No hay usuarios cargados
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

