import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { startOfMonth, endOfMonth, getUnixTime } from 'date-fns';
import { useAuth } from '../contextos/AuthContext';
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";

const useObtenerGastosDelMes = () => {
    const [gastos, establecerGastos] = useState([]);
    const { usuario } = useAuth();  // Asegúrate de que `usuario` es el objeto autenticado

    useEffect(() => {
        if (usuario && usuario.uid) {  // Verifica que `usuario.uid` existe
            const inicioDelMes = getUnixTime(startOfMonth(new Date()));
            const finDelMes = getUnixTime(endOfMonth(new Date()));

            const consulta = query(
                collection(db, "gastos"),
                orderBy('fecha', 'desc'),
                where('fecha', '>=', inicioDelMes),
                where('fecha', '<=', finDelMes),
                where('uidUsuario', '==', usuario.uid)  // Usamos usuario.uid para filtrar por el usuario autenticado
            );

            const unsuscribe = onSnapshot(consulta, (snapshot) => {
                establecerGastos(snapshot.docs.map((documento) => {
                    return { ...documento.data(), id: documento.id };
                }));
            }, (error) => {
                console.log(error);
            });

            return unsuscribe;
        }
    }, [usuario]);

    return gastos;
};

export default useObtenerGastosDelMes;
