import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Importa el idioma español
import styled from "styled-components";
import theme from "../theme";

const ContenedorInput = styled.div`
    position: relative;
 
    input {
        font-family: 'Work Sans', sans-serif;
        box-sizing: border-box;
        background: ${theme.grisClaro};
        border: none;
        cursor: pointer;
        border-radius: 0.625rem; /* 10px */
        height: 5rem; /* 80px */
        width: 100%;
        padding: 0 1.25rem; /* 20px */
        font-size: 1.5rem; /* 24px */
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
    }
 
    .rdp {
        position: absolute;
        z-index: 1; /* Asegura que el calendario se superpone sobre otros elementos */
        display: ${({ mostrarCalendario }) => (mostrarCalendario ? 'block' : 'none')}; /* Controla la visibilidad */
    }
 
    .rdp-months {
        display: flex;
        justify-content: center;
    }
 
    .rdp-month {
        background: #fff;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        padding: 10px; /* Reducir padding */
        border-radius: 10px;
        font-size: 0.875rem; /* Reducir tamaño de fuente */
    }
 
    .rdp-caption {
        font-size: 1rem; /* Reducir tamaño de fuente del título */
    }
 
    .rdp-day {
        width: 2rem; /* Reducir tamaño del día */
        height: 2rem; /* Reducir tamaño del día */
    }
 
    @media (max-width: 60rem) {
        /* 950px */
        & > * {
            width: 100%;
        }
    }
`;

const DatePicker = ({ fecha, cambiarFecha }) => {
    // Formatea la fecha utilizando date-fns
    const hoy = new Date();
    // Formatea la fecha, si no hay fecha seleccionada, usa la fecha de hoy
    const fechaFormateada = fecha ? format(fecha, 'dd/MM/yyyy', { locale: es }) : format(hoy, 'dd/MM/yyyy', { locale: es });

    // Estado para controlar la visibilidad del calendario
    const [mostrarCalendario, setMostrarCalendario] = useState(false);

    return (
        <ContenedorInput mostrarCalendario={mostrarCalendario}>
            <input
                type="text"
                readOnly
                value={fechaFormateada}
                onClick={() => setMostrarCalendario(!mostrarCalendario)}
            />
            {mostrarCalendario && (
                <DayPicker
                    mode="single"
                    selected={fecha}
                    onSelect={(selectedDate) => {
                        cambiarFecha(selectedDate);
                        setMostrarCalendario(false); // Esconder el calendario después de seleccionar una fecha
                    }}
                    locale={es} // Configura el idioma español
                />
            )}
        </ContenedorInput>
    );
}

export default DatePicker;
