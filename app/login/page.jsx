'use client';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store/features/auth/authSlice';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
	getAuth,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from 'firebase/auth';
import { app } from '@/lib/firebase'; // <-- exporta app desde lib/firebase.js

export default function LoginExample() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [redirecting, setRedirecting] = useState(false);
	const [resetModal, setResetModal] = useState(false);
	const [resetEmail, setResetEmail] = useState('');
	const [resetSent, setResetSent] = useState(false);
	const [resetError, setResetError] = useState('');

	const dispatch = useDispatch();
	const authState = useSelector((state) => state.auth);
	const router = useRouter();
	const auth = getAuth(app); // <-- usa app, no db

	const handleLogin = async () => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			dispatch(
				login({
					id: user.uid,
					name: user.displayName || user.email,
					email: user.email,
					role: 'user', // Puedes obtener el rol de Firestore si lo necesitas
					token: await user.getIdToken(),
				})
			);
			setError('');
			setRedirecting(true);
		} catch (err) {
			setError('Usuario o contraseña incorrectos.');
		}
	};

	const handlePasswordReset = async (e) => {
		e.preventDefault();
		setResetError('');
		setResetSent(false);
		if (!resetEmail) {
			setResetError('Por favor ingresa tu correo.');
			return;
		}
		try {
			await sendPasswordResetEmail(auth, resetEmail);
			setResetSent(true);
		} catch (err) {
			setResetError(
				'Si tu correo está registrado, recibirás un email de recuperación.'
			);
		}
	};

	useEffect(() => {
		// Redirige inmediatamente si ya está autenticado
		if (authState.isAuthenticated) {
			router.replace('/');
		}
	}, [authState.isAuthenticated, router]);

	useEffect(() => {
		if (redirecting && authState.isAuthenticated) {
			const timer = setTimeout(() => {
				router.push('/');
			}, 2500);
			return () => clearTimeout(timer);
		}
	}, [redirecting, authState.isAuthenticated, router]);

	if (redirecting && !authState.isAuthenticated) {
		return (
			<div style={{ textAlign: 'center' }}>
				<p>Procesando inicio de sesión...</p>
			</div>
		);
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
			<div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8'>
				<h2 className='text-3xl font-bold text-center text-indigo-700 mb-8'>
					Iniciar sesión
				</h2>
				<Image
					src='/logo-colegio.webp'
					alt='Login'
					width={150}
					height={150}
					className='mb-6 dflex mx-auto rounded-full shadow-lg'
				/>
				{authState.isAuthenticated ? (
					<div className='text-center'>
						<p className='text-lg text-gray-700 mb-4'>
							Bienvenido,{' '}
							<span className='font-semibold'>{authState.user.name}</span>.
							Serás redirigido al dashboard...
						</p>
					</div>
				) : (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleLogin();
						}}
						className='flex flex-col gap-6'
					>
						<div>
							<label
								className='block text-gray-600 mb-2'
								htmlFor='email'
							>
								Correo electrónico
							</label>
							<input
								id='email'
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder='Correo electrónico'
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white text-gray-900 placeholder-gray-400'
								autoComplete='email'
								required
							/>
						</div>
						<div>
							<label
								className='block text-gray-600 mb-2'
								htmlFor='password'
							>
								Contraseña
							</label>
							<input
								id='password'
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder='Contraseña'
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white text-gray-900 placeholder-gray-400'
								autoComplete='current-password'
								required
							/>
						</div>
						{error && (
							<p className='text-red-500 text-sm text-center -mt-4'>{error}</p>
						)}
						<button
							type='submit'
							className='w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-lg shadow transition'
						>
							Iniciar sesión
						</button>
						<button
							type='button'
							className='w-full py-2 mt-2 bg-transparent border border-indigo-400 text-indigo-700 hover:bg-indigo-50 rounded-lg font-medium transition'
							onClick={() => {
								setResetModal(true);
								setResetEmail('');
								setResetSent(false);
								setResetError('');
							}}
						>
							¿Olvidaste tu contraseña?
						</button>
					</form>
				)}
				{redirecting && !authState.isAuthenticated && (
					<div className='mt-6 text-center'>
						<p className='text-indigo-500'>Procesando inicio de sesión...</p>
					</div>
				)}
				{/* Modal de recuperación de contraseña */}
				{resetModal && (
					<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'>
						<div className='bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative'>
							<button
								className='absolute top-2 right-2 text-gray-400 hover:text-indigo-600 text-2xl font-bold'
								onClick={() => setResetModal(false)}
								aria-label='Cerrar'
							>
								&times;
							</button>
							<h3 className='text-xl font-bold mb-4 text-indigo-700'>
								Recuperar contraseña
							</h3>
							<form
								onSubmit={handlePasswordReset}
								className='flex flex-col gap-4'
							>
								<input
									type='email'
									placeholder='Correo electrónico'
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-gray-900 placeholder-gray-400'
									value={resetEmail}
									onChange={(e) => setResetEmail(e.target.value)}
									required
								/>
								{resetError && (
									<p className='text-red-500 text-sm text-center'>
										{resetError}
									</p>
								)}
								{resetSent && (
									<p className='text-green-600 text-sm text-center'>
										Si tu correo está registrado, recibirás un email de
										recuperación.
									</p>
								)}
								<button
									type='submit'
									className='w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow transition'
								>
									Enviar enlace de recuperación
								</button>
							</form>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
