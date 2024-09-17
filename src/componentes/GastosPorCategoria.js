import React from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo } from './../elementos/Header';
import BtnRegresar from "../elementos/BtnRegresar";
import BarraTotalGastado from "./BarraTotalGastado";
import useObtenerGastosDelMesPorCategoria from "../hooks/useObtenerGastosDelMesPorCategoria";
import styled from "styled-components";

// Estilos con styled-components
const ContenedorGastos = styled.div`
  margin: 20px auto;
  padding: 20px;
  max-width: 600px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  // Hacemos que el contenedor sea 100% del ancho en pantallas pequeñas
  @media (max-width: 768px) {
    padding: 15px;
    max-width: 90%;
  }
`;

const ListaCategorias = styled.ul`
  list-style: none;
  padding: 0;
`;

const ItemCategoria = styled.li`
  background-color: #fff;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  // Aseguramos que los elementos de la lista se adapten en pantallas pequeñas
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CategoriaNombre = styled.span`
  font-weight: bold;
  color: #333;

  // Aseguramos que el texto sea más grande en pantallas pequeñas
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CategoriaTotal = styled.span`
  font-size: 1.2rem;
  color: #4caf50;

  // Aseguramos que el total sea más grande en pantallas pequeñas
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-top: 5px;
  }
`;

const GastosPorCategoria = () => {
  // Llamamos al hook que nos devuelve los gastos agrupados por categoría
  const gastosPorCategoria = useObtenerGastosDelMesPorCategoria();

  return (
    <>
      <Helmet>
        <title>Gastos Por Categoría</title>
      </Helmet>

      <Header>
        <BtnRegresar />
        <Titulo>Gastos Por Categoría</Titulo>
      </Header>

      <ContenedorGastos>
        {gastosPorCategoria && Object.keys(gastosPorCategoria).length > 0 ? (
          <ListaCategorias>
            {Object.entries(gastosPorCategoria).map(([categoria, total]) => (
              <ItemCategoria key={categoria}>
                <CategoriaNombre>{categoria}</CategoriaNombre>
                <CategoriaTotal>{total.toFixed(2)} €</CategoriaTotal>
              </ItemCategoria>
            ))}
          </ListaCategorias>
        ) : (
          <p>No hay gastos registrados este mes.</p>
        )}
      </ContenedorGastos>

      <BarraTotalGastado />
    </>
  );
}

export default GastosPorCategoria;