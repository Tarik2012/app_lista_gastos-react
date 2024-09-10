import styled from 'styled-components';

const Contenedor = styled.div`
    background: #fff;
    width: 50%;
    max-width: 70rem; /* 1110px */
    height: 80vh;
    max-height: 50rem;  /* 800px */
    overflow-y: auto;
    box-shadow: 0px 0.75rem 1.5rem rgba(0,0,0,.1); /* Sombra más suave */
    border-radius: 0.625rem; /* 10px */
    margin: auto;
    padding: 1.5rem; /* Espacio interno para que el contenido no quede pegado a los bordes */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 100;
    transition: box-shadow 0.3s ease, transform 0.3s ease; /* Transiciones suaves */

    &:hover {
        box-shadow: 0px 1.5rem 3rem rgba(0, 0, 0, 0.1); /* Efecto hover con sombra más grande */
        transform: translateY(-0.25rem); /* Ligeramente eleva el contenedor */
    }

    @media(max-width: 60rem){ /* 950px */
        height: 95vh;
        max-height: none;
        width: 90%; /* Aumenta el ancho en pantallas más pequeñas */
    }
`;

export default Contenedor;
