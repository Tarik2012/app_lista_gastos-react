import { useEffect, useState } from "react";
import { db } from './../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

const useObtenerGasto = (id) => {
    const navigate = useNavigate();
    const [gasto, establecerGasto] = useState(null); // Usa `null` o un objeto vacío como estado inicial

    useEffect(() => {
        const obtenerGasto = async () => {
            try {
                const documento = await getDoc(doc(db, 'gastos', id));
                if (documento.exists()) {
                    establecerGasto({ id: documento.id, ...documento.data() }); // Asegúrate de incluir el ID
                } else {
                    navigate('/lista');
                }
            } catch (error) {
                console.error("Error al obtener el gasto:", error);
                navigate('/lista'); // Redirige en caso de error también
            }
        };
        obtenerGasto();
    }, [navigate, id]);

    return [gasto];
};

export default useObtenerGasto;
