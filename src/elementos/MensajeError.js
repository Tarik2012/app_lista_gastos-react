
import styled, { keyframes } from "styled-components";

const slideInFromTop = keyframes`
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
`;

// Define los estilos mejorados y animación para el mensaje de error
const MensajeError = styled.p`
    color: #d9534f; /* Rojo */
    font-size: 1.5rem; /* Tamaño de fuente más grande */
    margin-top: 1rem; /* Margen superior más grande */
    position: fixed; /* Fija el mensaje */
    top: 10%; /* Lo coloca en el centro vertical */
    left: 50%; /* Lo coloca en el centro horizontal */
    transform: translate(-50%, -50%); /* Lo centra completamente */
    background-color: rgba(255, 255, 255, 0.8); /* Fondo semitransparente */
    padding: 1rem 2rem; /* Espacio alrededor del texto */
    border-radius: 8px; /* Bordes redondeados */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra suave */
    z-index: 999; /* Coloca el mensaje por encima de otros elementos */
`;


export default MensajeError