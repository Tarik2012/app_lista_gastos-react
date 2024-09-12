// Importando React y varios hooks necesarios
import React, { useState, useEffect, useContext } from "react";
// Importando un hook personalizado para obtener los gastos del mes
import useObtenerGastosDelMes from '../hooks/useObtenerGastosDelMes'

// Creando un contexto para manejar el total gastado
const TotalGastadoContext = React.createContext();

// Hook personalizado para acceder al contexto fácilmente desde otros componentes
const useTotalDelMes = () => useContext(TotalGastadoContext)

// Componente proveedor que envuelve los hijos y provee el contexto del total gastado
const TotalGastadoProvider = ({ children }) => {
    // Estado para almacenar el total gastado
    const [total, cambiarTotal] = useState(0);
    // Utilizando el hook personalizado para obtener los gastos del mes actual
    const gastos = useObtenerGastosDelMes()

    // Efecto para calcular el total gastado cuando los gastos cambian
    useEffect(() => {
        let acumulado = 0; // Variable para acumular el total
        gastos.forEach((gasto) => {
            console.log(gastos) // Imprimiendo los gastos para depuración
            acumulado += Number(gasto.cantidad); // Sumando la cantidad de cada gasto al acumulado
        })
        return cambiarTotal(acumulado) // Actualizando el estado del total con el acumulado
    }, [gastos]) // Dependencia del efecto, para que se ejecute cada vez que 'gastos' cambie

    // Proveedor del contexto que pasa el total gastado a los componentes hijos
    return (
        <TotalGastadoContext.Provider value={{ total: total }}>
            {children}
        </TotalGastadoContext.Provider>
    );
}

// Exportando el proveedor y el hook para su uso en otros componentes
export { TotalGastadoProvider, useTotalDelMes };
