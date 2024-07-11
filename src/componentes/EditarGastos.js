import React from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo } from './../elementos/Header';
import BtnRegresar from "../elementos/BtnRegresar";
import BarraTotalGastado from "./BarraTotalGastado";
import FormularioGasto from "./FormularioGasto";
import { useParams } from "react-router-dom";
import useObtenerGasto from "../hooks/useObtenerGasto";

const EditarGastos = () => {
    const { id } = useParams();
    const [gasto] = useObtenerGasto(id);

    if (!gasto) {
        return <p>Cargando...</p>; // Mostrar un mensaje de carga o spinner mientras se obtiene el gasto
    }

    return (
        <>
            <Helmet>
                <title>Editar Gasto</title>
            </Helmet>

            <Header>
                <BtnRegresar ruta="/lista" />
                <Titulo>Editar Gasto</Titulo>
            </Header>
            <FormularioGasto gasto={gasto} />
            <BarraTotalGastado />
        </>
    );
}

export default EditarGastos;
