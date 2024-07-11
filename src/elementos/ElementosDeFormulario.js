import styled from 'styled-components';
import theme from '../theme';

const ContenedorFiltros = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.2rem; /* Reducido de 1.5rem */
 
    @media(max-width: 60rem){ /* 950px */
        flex-direction: column;
 
        & > * {
            width: 100%;
            margin-bottom: 0.4rem; /* Reducido de 0.5rem */
        }
    }
`;

const Formulario = styled.form`
    padding: 0 1.5rem; /* Reducido de 2rem */
 
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    input {
        width: 100%;
        text-align: center;
        padding: 1.5rem 0; /* Reducido de 2rem */
        font-family: 'Work Sans', sans-serif;
        &::placeholder {
            color: rgba(0,0,0,.2);
        }
    }
 
    @media(max-width: 60rem){ /* 950px */
        justify-content: start;
    }
`;

const Input = styled.input`
    font-size: 1.8rem; /* Reducido de 2rem */
    text-transform: uppercase;
    border: none;
    border-bottom: 2px solid ${theme.grisClaro};
    outline: none;
 
    @media(max-width: 60rem){ /* 950px */
        font-size: 1.6rem; /* Reducido de 1.8rem */
    }
`;

const InputGrande = styled(Input)`
    font-size: 3rem; /* Reducido de 3.5rem */
    font-weight: bold;
`;

const ContenedorBoton = styled.div`
    display: flex;
    justify-content: center;
    margin: 1.5rem 0;  /* Reducido de 2rem */
`;

export { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton };
