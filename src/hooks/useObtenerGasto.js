import { useEffect, useState } from 'react';
import { db } from './../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const useObtenerGasto = (id) => {
    const navigate = useNavigate();
    const [gasto, setGasto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerGasto = async () => {
            console.log("useObtenerGasto ID:", id); // Depuración

            if (!id || typeof id !== 'string') {
                console.error("ID no proporcionado o no es válido.");
                setError("ID no proporcionado o no es válido.");
                setCargando(false);
                navigate('/lista');
                return;
            }

            try {
                const docRef = doc(db, 'gastos', id);
                const documento = await getDoc(docRef);

                if (documento.exists()) {
                    setGasto({ id: documento.id, ...documento.data() });
                } else {
                    console.warn(`El documento con id ${id} no existe.`);
                    setError(`El documento con id ${id} no existe.`);
                    navigate('/lista');
                }
            } catch (error) {
                console.error("Error al obtener el gasto:", error);
                setError("Error al obtener el gasto.");
                navigate('/lista');
            } finally {
                setCargando(false);
            }
        };

        obtenerGasto();
    }, [navigate, id]);

    return [gasto, cargando, error];
}

export default useObtenerGasto;
