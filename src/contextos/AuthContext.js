import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// Crear el contexto
const AuthContext = React.createContext();

// Hook para acceder al contexto
const useAuth = () => useContext(AuthContext);

// Proveedor del contexto
const AuthProvider = ({ children }) => {
    const [usuario, cambiarUsuario] = useState();

    // creamos un state para saber cuando termina de cargar la comprobacion de onAuthstateChange
    const [cargando, cambiarCargando] = useState(true)
    // efecto para ejecutar la comprobacion
    useEffect(() => {
        // comprobamos si hay un usuario
        const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
            cambiarUsuario(usuario);
            cambiarCargando(false)
        });
        return cancelarSuscripcion;
    }, [])
    return (
        <AuthContext.Provider value={{ usuario: usuario }}>
            {!cargando && children}
        </AuthContext.Provider>
    );
}

// Exportar tanto el proveedor como el hook para ser utilizado en otros lugares
export { AuthProvider, useAuth, AuthContext };
