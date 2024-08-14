import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from './../elementos/ElementosDeFormulario';
import Boton from './../elementos/Boton';
import { ReactComponent as IconoPlus } from './../imagenes/plus.svg';
import SelectGastos from "./SelectGastos";
import DatePicker from "./DatePicker";
import { getUnixTime } from "date-fns";
import agregarGasto from "../firebase/agregarGasto";
import editarGasto from "../firebase/editarGasto";
import { useAuth } from "../contextos/AuthContext";
import Alerta from '../elementos/Alerta';
import useObtenerGasto from '../hooks/useObtenerGasto';

const FormularioGasto = () => {
    const { id } = useParams();
    console.log("FormularioGasto ID:", id); // Depuración
    const navigate = useNavigate();
    const { usuario } = useAuth();
    const [gasto, cargando, error] = useObtenerGasto(id);

    const [inputDescripcion, cambiarInputDescripcion] = useState('');
    const [inputCantidad, cambiarInputCantidad] = useState('');
    const [categoria, selectCategoria] = useState('hogar');
    const [fecha, cambiarFecha] = useState(new Date());
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    useEffect(() => {
        if (gasto) {
            cambiarInputDescripcion(gasto.descripcion);
            cambiarInputCantidad(gasto.cantidad.toString());
            selectCategoria(gasto.categoria);
            cambiarFecha(new Date(gasto.fecha * 1000));
        }
    }, [gasto]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "descripcion") {
            cambiarInputDescripcion(value);
        } else if (name === "cantidad") {
            if (/^\d*\.?\d*$/.test(value)) {
                cambiarInputCantidad(value);
            }
        } else {
            console.error("Error");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let cantidad = parseFloat(inputCantidad);
        if (isNaN(cantidad)) {
            cambiarEstadoAlerta(true);
            cambiarAlerta({ tipo: 'error', mensaje: 'El valor de la cantidad no es válido' });
            return;
        }
        cantidad = cantidad.toFixed(2);

        if (inputDescripcion.trim() !== '' && inputCantidad.trim() !== '') {
            const gastoData = {
                categoria: categoria,
                descripcion: inputDescripcion.trim(),
                cantidad: cantidad,
                fecha: getUnixTime(fecha),
                uidUsuario: usuario.uid
            };

            if (gasto && gasto.id) {
                // Editar gasto existente
                editarGasto(gasto.id, gastoData).then(() => {
                    cambiarEstadoAlerta(true);
                    cambiarAlerta({ tipo: 'exito', mensaje: 'Gasto editado correctamente' });
                    navigate('/lista'); // Redirige a la ruta deseada
                }).catch((error) => {
                    cambiarEstadoAlerta(true);
                    cambiarAlerta({ tipo: 'error', mensaje: 'Hubo un problema al editar el gasto' });
                });
            } else {
                // Agregar nuevo gasto
                agregarGasto(gastoData).then(() => {
                    cambiarEstadoAlerta(true);
                    cambiarAlerta({ tipo: 'exito', mensaje: 'Gasto agregado correctamente' });
                    cambiarInputDescripcion('');
                    cambiarInputCantidad('');
                    selectCategoria('hogar');
                    cambiarFecha(new Date());
                }).catch((error) => {
                    cambiarEstadoAlerta(true);
                    cambiarAlerta({ tipo: 'error', mensaje: 'Hubo un problema al agregar el gasto' });
                });
            }
        } else {
            cambiarEstadoAlerta(true);
            cambiarAlerta({ tipo: 'error', mensaje: 'Agrega todos los valores correctamente' });
        }
    };

    if (cargando) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectGastos
                    categoria={categoria}
                    cambiarCatagoria={selectCategoria}
                />
                <DatePicker
                    fecha={fecha}
                    cambiarFecha={cambiarFecha} />
            </ContenedorFiltros>
            <div>
                <Input
                    type="text"
                    name="descripcion"
                    id="descripcion"
                    placeholder="Descripción"
                    value={inputDescripcion}
                    onChange={handleChange}
                />
                <InputGrande
                    type="text"
                    name="cantidad"
                    id="cantidad"
                    placeholder="0.00 Eur"
                    value={inputCantidad}
                    onChange={handleChange}
                />
            </div>

            <ContenedorBoton>
                <Boton as="button" primario conIcono="true">
                    {gasto ? 'Editar Gasto' : 'Agregar Gasto'} <IconoPlus />
                </Boton>
            </ContenedorBoton>
            {estadoAlerta &&
                <Alerta
                    tipo={alerta.tipo}
                    mensaje={alerta.mensaje}
                    estadoAlerta={estadoAlerta}
                    cambiarEstadoAlerta={cambiarEstadoAlerta}
                />
            }
        </Formulario>
    );
};

export default FormularioGasto;
