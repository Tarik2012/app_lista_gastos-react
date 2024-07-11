import { db } from './firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

const editarGasto = async (id, { categoria, descripcion, cantidad, fecha }) => {
    try {
        const documentoRef = doc(db, 'gastos', id);
        await updateDoc(documentoRef, {
            categoria: categoria,
            descripcion: descripcion,
            cantidad: cantidad,
            fecha: fecha,
        });
        console.log("Documento actualizado con ID: ", id);
    } catch (e) {
        console.error("Error al actualizar el documento: ", e);
        throw e;
    }
};

export default editarGasto;
