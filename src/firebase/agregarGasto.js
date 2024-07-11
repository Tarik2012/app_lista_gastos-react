import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const agregarGastos = async ({ categoria, descripcion, cantidad, fecha, uidUsuario }) => {
    try {
        const docRef = await addDoc(collection(db, 'gastos'), {
            categoria: categoria,
            descripcion: descripcion,
            cantidad: cantidad,
            fecha: fecha,
            uidUsuario: uidUsuario
        });
        console.log("Documento agregado con ID: ", docRef.id);
        return docRef;
    } catch (e) {
        console.error("Error al agregar el documento: ", e);
        throw e;
    }
};

export default agregarGastos;
