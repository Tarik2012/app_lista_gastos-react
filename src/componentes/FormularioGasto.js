import React, { useState, useEffect } from "react";
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from './../elementos/ElementosDeFormulario';
import Boton from './../elementos/Boton';
import { ReactComponent as IconoPlus } from './../imagenes/plus.svg';
import SelectGastos from "./SelectGastos";
import DatePicker from "./DatePicker";
import { getUnixTime } from "date-fns";
import agregarGastos from "../firebase/agregarGasto";
import editarGasto from "../firebase/editarGasto"; // Importar editarGasto
import { useAuth } from "../contextos/AuthContext";
import Alerta from '../elementos/Alerta';
import { useNavigate } from 'react-router-dom';

const FormularioGasto = ({ gasto }) => {
    const [inputDescripcion, cambiarInputDescripcion] = useState('');
    const [inputCantidad, cambiarInputCantidad] = useState('');
    const [categoria, selectCategoria] = useState('hogar');
    const [fecha, cambiarFecha] = useState(new Date());
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});
    const { usuario } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (gasto && gasto.uidUsuario === usuario.uid) {
            cambiarInputDescripcion(gasto.descripcion);
            cambiarInputCantidad(gasto.cantidad.toString());
            selectCategoria(gasto.categoria);
            cambiarFecha(new Date(gasto.fecha * 1000)); // Asegúrate de convertir correctamente la fecha desde el timestamp
        } else {
            navigate('/lista');
        }
    }, [gasto, usuario, navigate]);

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
                agregarGastos(gastoData).then(() => {
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
                <Boton as="button" primario conIcono>
                    {gasto ? 'Editar Gasto' : 'Agregar Gasto'} <IconoPlus /> {/* Cambia el texto del botón */}
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
