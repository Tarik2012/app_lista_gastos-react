import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [usuario, cambiarUsuario] = useState(null);
    const [cargando, cambiarCargando] = useState(true);

    useEffect(() => {
        const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
            console.log("Usuario autenticado:", usuario);
            cambiarUsuario(usuario);
            cambiarCargando(false);
        });

        return () => cancelarSuscripcion();
    }, []);

    return (
        <AuthContext.Provider value={{ usuario, cargando }}>
            {!cargando ? children : <p>Cargando...</p>}
        </AuthContext.Provider>
    );
}

export { AuthProvider, useAuth };
