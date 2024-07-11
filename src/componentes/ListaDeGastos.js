import React from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo } from './../elementos/Header';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from "./BarraTotalGastado";
import useObtenerGastos from './../hooks/useObtenerGastos';
import IconoCategoria from "../elementos/IconoCategoria";
import usdFormatter from "../funciones/convertirMoneda";
import { ReactComponent as IconoBorrar } from './../imagenes/borrar.svg';
import { ReactComponent as IconoEditar } from './../imagenes/editar.svg';
import { Link } from "react-router-dom";
import Boton from './../elementos/Boton';
import {
    Lista,
    ElementoLista,
    Categoria,
    Descripcion,
    Valor,
    Fecha,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
} from "../elementos/ListaElementos";
import { format, fromUnixTime } from 'date-fns';
import borrarGastos from "../firebase/borrarGasto";

const ListaDegastos = () => {
    const [gastos, cargarMasGastos, hayMasPorCargar, cargando] = useObtenerGastos();

    // Convertir y formatear las fechas
    const gastosConFechaFormateada = gastos.map(gasto => {
        return {
            ...gasto,
            fechaFormateada: format(fromUnixTime(gasto.fecha), 'dd/MM/yyyy')
        };
    });

    // Ordenar los gastos por fecha
    const gastosOrdenados = gastosConFechaFormateada.sort((a, b) => {
        const fechaA = fromUnixTime(a.fecha);
        const fechaB = fromUnixTime(b.fecha);
        return fechaB - fechaA; // Orden descendente (más reciente primero)
    });

    // Agrupar los gastos por fecha
    const gastosAgrupadosPorFecha = gastosOrdenados.reduce((acc, gasto) => {
        const fecha = gasto.fechaFormateada;
        if (!acc[fecha]) {
            acc[fecha] = [];
        }
        acc[fecha].push(gasto);
        return acc;
    }, {});

    return (
        <>
            <Helmet>
                <title>Lista de gastos</title>
            </Helmet>

            <Header>
                <BtnRegresar />
                <Titulo>Lista de gastos</Titulo>
            </Header>
            <Lista>
                {Object.keys(gastosAgrupadosPorFecha).map(fecha => (
                    <div key={fecha}>
                        <Fecha>{fecha}</Fecha>
                        {gastosAgrupadosPorFecha[fecha].map(gasto => (
                            <ElementoLista key={gasto.id}>
                                <Categoria>
                                    <IconoCategoria id={gasto.categoria} />
                                    {gasto.categoria}
                                </Categoria>
                                <Descripcion>
                                    {gasto.descripcion}
                                </Descripcion>
                                <Valor>
                                    {usdFormatter.format(gasto.cantidad)}
                                </Valor>
                                <ContenedorBotones>
                                    <BotonAccion as={Link} to={`/editar/${gasto.id}`}>
                                        <IconoEditar />
                                    </BotonAccion>
                                    <BotonAccion onClick={() => borrarGastos(gasto.id)}>
                                        <IconoBorrar />
                                    </BotonAccion>
                                </ContenedorBotones>
                            </ElementoLista>
                        ))}
                    </div>
                ))}

                {hayMasPorCargar && (
                    <ContenedorBotonCentral>
                        <BotonCargarMas onClick={cargarMasGastos} disabled={cargando}>
                            {cargando ? "Cargando..." : "Cargar más"}
                        </BotonCargarMas>
                    </ContenedorBotonCentral>
                )}

                {gastos.length === 0 &&
                    <ContenedorSubtitulo>
                        <Subtitulo>No hay más gastos por mostrar</Subtitulo>
                        <Boton as={Link} to={"/"}>Agregar gastos</Boton>
                    </ContenedorSubtitulo>
                }
            </Lista>
            <BarraTotalGastado />
        </>
    );
}

export default ListaDegastos;
