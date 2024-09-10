import React from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo } from './../elementos/Header';
import BtnRegresar from "../elementos/BtnRegresar";
import BarraTotalGastado from "./BarraTotalGastado";
import useObtenerGastosDelMes from "../hooks/useObtenerGastosDelMes";

const GastosPorCategoria = () => {
    const gastos = useObtenerGastosDelMes(); // Capturamos los datos del hook

    console.log(gastos); // Verificamos los gastos en la consola
    return (

        <>
            <Helmet>
                <title>Gastos Por Categoría</title>
            </Helmet>

            <Header>
                <BtnRegresar />
                <Titulo>Gastos Por Categoría</Titulo>
            </Header>
            <BarraTotalGastado />
        </>
    );
}

export default GastosPorCategoria;
