// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	doc,
	deleteDoc,
	updateDoc,
	getDoc,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDRZS1ZEoqjz_Q097v6w8AMDUwtUk0mLlo',
	authDomain: 'control-de-estudios-c92e8.firebaseapp.com',
	projectId: 'control-de-estudios-c92e8',
	storageBucket: 'control-de-estudios-c92e8.firebasestorage.app',
	messagingSenderId: '1060115813428',
	appId: '1:1060115813428:web:8be02c76330bf893d1e661',
};

let app;
if (!getApps().length) {
	app = initializeApp(firebaseConfig);
} else {
	app = getApps()[0];
}

const db = getFirestore(app);
const auth = getAuth(app);

export async function agregarAlumno(alumno) {
	// El alumno debe tener la estructura igual a la de datosAlumnos
	const docRef = await addDoc(collection(db, 'alumnos'), alumno);
	return docRef.id;
}

export async function obtenerAlumnos() {
	const snapshot = await getDocs(collection(db, 'alumnos'));
	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function eliminarAlumno(id) {
	const ref = doc(db, 'alumnos', id);
	await deleteDoc(ref);
}

export async function actualizarAlumno(id, alumno) {
	const ref = doc(db, 'alumnos', id);
	await updateDoc(ref, alumno);
}

export async function obtenerAlumnoPorId(id) {
	const ref = doc(db, 'alumnos', id);
	const snapshot = await getDoc(ref);
	return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

// Listener para cambios de autenticación
export function listenAuthState(callback) {
	return onAuthStateChanged(auth, callback);
}

export { db, app, auth };
