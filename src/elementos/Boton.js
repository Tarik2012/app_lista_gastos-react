import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Función para filtrar las props no deseadas
const filterProps = ({ primario, conIcono, iconoGrande, ...rest }) => rest;

// Componente funcional para manejar el filtro de props
const CustomComponent = React.forwardRef(({ as: Component = Link, ...props }, ref) => {
    return <Component ref={ref} {...filterProps(props)} />;
});

const Boton = styled(CustomComponent)`
  background: transparent;
  border: 2px solid ${(props) => (props.primario ? '#007bff' : '#6c757d')}; // Azul o gris
  color: ${(props) => (props.primario ? '#007bff' : '#6c757d')};
  width: ${(props) => (props.conIcono ? '15.62rem' : 'auto')};
  margin-left: 1.25rem;
  border-radius: 0.625rem;
  font-family: 'Work Sans', sans-serif;
  height: 3.75rem;
  padding: 1.25rem 1.87rem;
  font-size: 1.25rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  justify-content: center; // Ajustado para centrar contenido y mantenerlo en una línea
  align-items: center;
  outline: none;
  white-space: nowrap; // Asegura que el contenido no se envuelva
  overflow: hidden; // Evita desbordamiento del contenido
  text-overflow: ellipsis; // Añade puntos suspensivos si el texto es demasiado largo
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: ${(props) => (props.primario ? '#007bff' : '#6c757d')};
    color: #fff;
  }

  svg {
    height: ${(props) => (props.iconoGrande ? '100%' : '0.75rem')};
    fill: ${(props) => (props.primario ? '#007bff' : '#6c757d')};
    margin-right: 0.5rem; // Espacio entre icono y texto
  }
`;

export default Boton;
