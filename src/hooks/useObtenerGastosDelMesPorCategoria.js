import useObtenerGastosDelMes from "./useObtenerGastosDelMes";
import React, { useState, useEffect } from "react";

const useObtenerGastosDelMesPorCategoria = () => {
    const gastos = useObtenerGastosDelMes();

    // Agrupamos los gastos por categoría y sumamos las cantidades
    const gastosPorCategoria = gastos.reduce((acumulador, gasto) => {
        const { categoria, cantidad } = gasto;

        // Asegurarnos de que la categoría exista y la cantidad no sea nula
        if (categoria && cantidad) {
            // Si la categoría no existe en el acumulador, la inicializamos a 0
            if (!acumulador[categoria]) {
                acumulador[categoria] = 0;
            }

            // Sumamos la cantidad de la categoría correspondiente
            acumulador[categoria] += parseFloat(cantidad);
        }

        return acumulador;
    }, {});

    return gastosPorCategoria; // Devolvemos los gastos agrupados por categoría
}

export default useObtenerGastosDelMesPorCategoria;
