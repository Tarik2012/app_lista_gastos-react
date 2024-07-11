import { useState, useEffect } from "react";
import { db } from "./../firebase/firebaseConfig.js";
import { useAuth } from "./../contextos/AuthContext";
import { collection, onSnapshot, query, orderBy, where, limit, startAfter } from "firebase/firestore";

const useObtenerGastos = () => {
    const { usuario } = useAuth();
    const [gastos, cambiarGastos] = useState([]);
    const [ultimoGasto, cambiarUltimoGasto] = useState(null);
    const [hayMasPorCargar, cambiarHayMasPorCargar] = useState(false);
    const [cargando, setCargando] = useState(false);

    const cargarMasGastos = () => {
        if (!cargando && ultimoGasto) {
            setCargando(true);
            const consulta = query(
                collection(db, 'gastos'),
                where('uidUsuario', '==', usuario.uid),
                orderBy('fecha', 'desc'),
                startAfter(ultimoGasto),
                limit(10)
            );

            onSnapshot(consulta, (snapshot) => {
                if (snapshot.docs.length > 0) {
                    cambiarUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);
                    cambiarHayMasPorCargar(true);
                } else {
                    cambiarHayMasPorCargar(false);
                }

                cambiarGastos(prevGastos => [
                    ...prevGastos,
                    ...snapshot.docs.map((gasto) => ({ ...gasto.data(), id: gasto.id }))
                ]);

                setCargando(false);
            });
        }
    };

    useEffect(() => {
        const consultaInicial = query(
            collection(db, 'gastos'),
            where('uidUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10)
        );

        const unsuscribe = onSnapshot(consultaInicial, (snapshot) => {
            if (snapshot.docs.length > 0) {
                cambiarUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);
                cambiarHayMasPorCargar(true);
            } else {
                cambiarHayMasPorCargar(false);
            }

            cambiarGastos(snapshot.docs.map((gasto) => {
                return { ...gasto.data(), id: gasto.id };
            }));
        });

        return unsuscribe;
    }, [usuario]);

    return [gastos, cargarMasGastos, hayMasPorCargar, cargando];
};

export default useObtenerGastos;
