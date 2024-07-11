import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader } from './../elementos/Header';
import Boton from './../elementos/Boton';
import { Formulario, Input, ContenedorBoton } from '../elementos/ElementosDeFormulario';
import { ReactComponent as SvgLogin } from "../imagenes/registro.svg";
import styled, { keyframes } from "styled-components";
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase/firebaseConfig";
import MensajeError from './../elementos/MensajeError'


const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 6.25rem;
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



const RegistrarUsuario = () => {
    const [correo, establecerCorreo] = useState('');
    const [password, establecerPassword] = useState('');
    const [password2, establecerPassword2] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            const timeout = setTimeout(() => {
                setError(null);
            }, 3000); // Desaparece después de 5 segundos
            return () => clearTimeout(timeout);
        }
    }, [error]);

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'email':
                establecerCorreo(e.target.value);
                break;
            case 'password':
                establecerPassword(e.target.value);
                break;
            case 'password2':
                establecerPassword2(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validar que el correo electrónico no esté vacío
        if (!correo) {
            setError("El correo electrónico es requerido");
            return;
        }
        // Validar formato de correo electrónico usando expresión regular
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexCorreo.test(correo)) {
            setError("El correo electrónico no es válido");
            return;
        }
        // Validar que las contraseñas coincidan
        if (password !== password2) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            // Crear un nuevo usuario en Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
            console.log("Usuario creado:", userCredential.user);
            // Limpiar los campos y errores después de crear el usuario exitosamente
            establecerCorreo('');
            establecerPassword('');
            establecerPassword2('');
            setError(null);
            navigate('/'); // Redireccionar a la página principal después de crear el usuario

        } catch (error) {
            console.error("Error al crear usuario:", error.message);
            if (error.code === 'auth/email-already-in-use') {
                setError("Este correo electrónico ya está en uso. Por favor, utiliza otro correo electrónico.");
            } else if (error.code === 'auth/weak-password') {
                setError("La contraseña es demasiado débil. Inténtalo con una contraseña más segura.");
            } else if (error.code === 'auth/invalid-email') {
                setError("El correo electrónico proporcionado no es válido. Por favor, revisa el formato.");
            } else {
                setError("Ocurrió un error al crear el usuario. Por favor, inténtalo de nuevo más tarde.");
            }
        }
    }

    return (
        <>
            <Helmet>
                <title>Crear cuenta</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Crear Cuenta</Titulo>
                    <div>
                        <Boton to="/iniciar-sesion">Iniciar Sesión</Boton>
                    </div>
                </ContenedorHeader>
            </Header>
            <Formulario onSubmit={handleSubmit}>
                <Svg />
                <Input
                    type="email"
                    name="email"
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
                <Input
                    type="password"
                    name="password2"
                    placeholder="Repetir Contraseña"
                    value={password2}
                    onChange={handleChange}
                />
                <ContenedorBoton>
                    <Boton as="button" primario type="submit">Crear Cuenta</Boton>
                </ContenedorBoton>
            </Formulario>
            {error && <MensajeError>{error}</MensajeError>} {/* Aplica estilos mejorados y animación al mensaje de error */}

        </>
    );
}

export default RegistrarUsuario;
