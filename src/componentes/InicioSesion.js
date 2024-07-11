import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader } from './../elementos/Header';
import Boton from './../elementos/Boton';
import { Formulario, Input, ContenedorBoton } from '../elementos/ElementosDeFormulario';
import { ReactComponent as SvgLogin } from "../imagenes/login.svg";
import styled, { keyframes } from "styled-components";
import { initializeApp } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase/firebaseConfig";
import MensajeError from './../elementos/MensajeError';


const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 10.25rem;
    margin-bottom: 1.25rem;
`;

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
};

initializeApp(firebaseConfig);

const InicioSesion = () => {
    const [correo, establecerCorreo] = useState('');
    const [password, establecerPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            const timeout = setTimeout(() => {
                setError(null);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [error]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "correo") {
            establecerCorreo(value);
        } else if (name === "password") {
            establecerPassword(value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!correo || !password) {
            setError("Todos los campos son requeridos");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, correo, password);
            console.log("Inicio de sesión exitoso");
            navigate('/'); // Redireccionar a la página principal después de iniciar sesión
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setError("Correo electrónico o contraseña incorrectos");
            } else if (error.code === 'auth/invalid-email') {
                setError("El correo electrónico proporcionado no es válido. Por favor, revisa el formato.");
            } else {
                setError("Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
            }
        }

    }

    return (
        <>
            <Helmet>
                <title>Iniciar Sesión</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar Sesión</Titulo>
                    <div>
                        <Boton to="/crear-cuenta">Registrarse</Boton>
                    </div>
                </ContenedorHeader>
            </Header>
            <Formulario onSubmit={handleSubmit}>
                <Svg />
                <Input
                    type="email"
                    name="correo"
                    placeholder="Correo Electrónico"
                    value={correo}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={handleChange}
                />
                <ContenedorBoton>
                    <Boton as="button" primario type="submit">Iniciar Sesión</Boton>
                </ContenedorBoton>
            </Formulario>
            {error && <MensajeError>{error}</MensajeError>}
        </>
    );
}

export default InicioSesion;