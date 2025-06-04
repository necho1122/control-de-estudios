'use client';

import React, { useState, useEffect } from 'react';
import {
	agregarAlumno,
	obtenerAlumnos,
	eliminarAlumno,
	actualizarAlumno,
	obtenerAlumnoPorId,
} from '@/lib/firebase';
import AlumnosTable from './AlumnosTable';
import AlumnoModal from './AlumnoModal';
import DetalleAlumnoModal from './DetalleAlumnoModal';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/features/auth/authSlice';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase';

function MainInformation() {
	const [showModal, setShowModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [detalleModal, setDetalleModal] = useState(false);
	const [form, setForm] = useState({
		nombre: '',
		edad: '',
		fecha_nacimiento: '',
		lugar_nacimiento: '',
		sexo: '',
		grado: '',
		seccion: '',
		representante: {
			nombre: '',
			parentesco: '',
			telefono: '',
			cedula: '',
			direccion: '',
		},
	});
	const [editForm, setEditForm] = useState(form);
	const [editId, setEditId] = useState(null);
	const [detalleAlumno, setDetalleAlumno] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [alumnos, setAlumnos] = useState([]);
	const [fetching, setFetching] = useState(true);
	const [search, setSearch] = useState('');
	const [filteredAlumnos, setFilteredAlumnos] = useState([]);
	const dispatch = useDispatch();
	const auth = getAuth(app);

	useEffect(() => {
		const fetchAlumnos = async () => {
			setFetching(true);
			try {
				const data = await obtenerAlumnos();
				setAlumnos(data);
			} catch (e) {
				setError('Error al cargar alumnos');
			}
			setFetching(false);
		};
		fetchAlumnos();
	}, []);

	useEffect(() => {
		// Orden personalizado de grados
		const gradoOrder = ['Preescolar', '1ro', '2do', '3ro', '4to', '5to', '6to'];

		const alumnosOrdenados = [...alumnos].sort((a, b) => {
			const gradoA = gradoOrder.indexOf((a.grado || '').trim());
			const gradoB = gradoOrder.indexOf((b.grado || '').trim());
			if (gradoA !== gradoB) return gradoA - gradoB;

			// Ordenar sección alfabéticamente (A, B, C, ...)
			const seccionA = (a.seccion || '').trim().toUpperCase();
			const seccionB = (b.seccion || '').trim().toUpperCase();
			if (seccionA < seccionB) return -1;
			if (seccionA > seccionB) return 1;
			return 0;
		});

		setFilteredAlumnos(
			alumnosOrdenados.filter((alumno) =>
				alumno.nombre?.toLowerCase().includes(search.toLowerCase())
			)
		);
	}, [search, alumnos]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name.startsWith('representante.')) {
			const repField = name.split('.')[1];
			setForm((prev) => ({
				...prev,
				representante: { ...prev.representante, [repField]: value },
			}));
		} else {
			setForm((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		try {
			// Formatear fecha a dd/mm/aaaa
			const [yyyy, mm, dd] = form.fecha_nacimiento.split('-');
			const fechaFormateada = `${dd}/${mm}/${yyyy}`;
			const alumno = {
				...form,
				edad: Number(form.edad),
				fecha_nacimiento: fechaFormateada,
			};
			await agregarAlumno(alumno);
			setShowModal(false);
			setForm({
				nombre: '',
				edad: '',
				fecha_nacimiento: '',
				lugar_nacimiento: '',
				sexo: '',
				grado: '',
				seccion: '',
				representante: {
					nombre: '',
					parentesco: '',
					telefono: '',
					cedula: '',
					direccion: '',
				},
			});
			// Recargar alumnos después de agregar
			const data = await obtenerAlumnos();
			setAlumnos(data);
		} catch (err) {
			setError('Error al agregar alumno');
		}
		setLoading(false);
	};

	const handleDelete = async (id) => {
		if (window.confirm('¿Seguro que deseas eliminar este alumno?')) {
			await eliminarAlumno(id);
			const data = await obtenerAlumnos();
			setAlumnos(data);
		}
	};

	const openEditModal = async (id) => {
		const alumno = await obtenerAlumnoPorId(id);
		if (alumno) {
			setEditForm({
				...alumno,
				edad: alumno.edad?.toString() || '',
				fecha_nacimiento: alumno.fecha_nacimiento
					? alumno.fecha_nacimiento.split('/').reverse().join('-')
					: '',
				representante: {
					...(alumno.representante || {
						nombre: '',
						parentesco: '',
						telefono: '',
						cedula: '',
						direccion: '',
					}),
				},
			});
			setEditId(id);
			setEditModal(true);
		}
	};

	const handleEditChange = (e) => {
		const { name, value } = e.target;
		if (name.startsWith('representante.')) {
			const repField = name.split('.')[1];
			setEditForm((prev) => ({
				...prev,
				representante: { ...prev.representante, [repField]: value },
			}));
		} else {
			setEditForm((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleEditSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		try {
			const [yyyy, mm, dd] = editForm.fecha_nacimiento.split('-');
			const fechaFormateada = `${dd}/${mm}/${yyyy}`;
			const alumno = {
				...editForm,
				edad: Number(editForm.edad),
				fecha_nacimiento: fechaFormateada,
			};
			await actualizarAlumno(editId, alumno);
			setEditModal(false);
			setEditId(null);
			const data = await obtenerAlumnos();
			setAlumnos(data);
		} catch (err) {
			setError('Error al actualizar alumno');
		}
		setLoading(false);
	};

	const handleLogout = async () => {
		await signOut(auth);
		dispatch(logout());
	};

	const handleRowClick = async (id) => {
		const alumno = await obtenerAlumnoPorId(id);
		if (alumno) {
			setDetalleAlumno(alumno);
			setDetalleModal(true);
		}
	};

	return (
		<section className='bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased'>
			<div className='mx-auto max-w-screen-2xl px-4 lg:px-12'>
				<div className='bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden'>
					<div className='flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4'>
						<div className='flex-1 flex items-center space-x-2'>
							<h5>
								<span className='text-gray-500'>Alumnos:</span>
								<span className='dark:text-white ml-2'>
									{filteredAlumnos.length}
								</span>
							</h5>
						</div>
						<input
							type='search'
							name='search'
							id='search'
							placeholder='Buscar alumno...'
							className='border border-gray-300 rounded-lg p-2'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<div className='flex-shrink-0 flex flex-col items-start md:flex-row md:items-center lg:justify-end space-y-3 md:space-y-0 md:space-x-3'>
							<button
								type='button'
								className='flex-shrink-0 inline-flex items-center justify-center py-2 px-3 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300'
								onClick={() => setShowModal(true)}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									className='mr-2 w-4 h-4'
								>
									<path
										fillRule='evenodd'
										d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
										clipRule='evenodd'
									/>
								</svg>
								Agregar alumno
							</button>
							<button
								onClick={handleLogout}
								type='button'
								className='flex-shrink-0 inline-flex items-center justify-center py-2 px-3 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300'
							>
								Cerrar sesión
							</button>
						</div>
					</div>
					<div className='overflow-x-auto'>
						<AlumnosTable
							alumnos={filteredAlumnos}
							onEdit={openEditModal}
							onDelete={handleDelete}
							fetching={fetching}
							onRowClick={handleRowClick}
						/>
					</div>
					{/* Paginación de ejemplo */}
					<nav
						className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4'
						aria-label='Table navigation'
					>
						<span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
							Mostrando
							<span className='font-semibold text-gray-900 dark:text-white ml-1'>
								1-{alumnos.length}
							</span>
							de
							<span className='font-semibold text-gray-900 dark:text-white ml-1'>
								{alumnos.length}
							</span>
						</span>
						<ul className='inline-flex items-stretch -space-x-px'>
							<li>
								<button className='flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
									<span className='sr-only'>Anterior</span>
									<svg
										className='w-5 h-5'
										aria-hidden='true'
										fill='currentColor'
										viewBox='0 0 20 20'
									>
										<path
											fillRule='evenodd'
											d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
											clipRule='evenodd'
										/>
									</svg>
								</button>
							</li>
							<li>
								<button className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
									1
								</button>
							</li>
							<li>
								<button className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
									2
								</button>
							</li>
							<li>
								<button className='flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
									<span className='sr-only'>Siguiente</span>
									<svg
										className='w-5 h-5'
										aria-hidden='true'
										fill='currentColor'
										viewBox='0 0 20 20'
									>
										<path
											fillRule='evenodd'
											d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
											clipRule='evenodd'
										/>
									</svg>
								</button>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<AlumnoModal
				open={showModal}
				onClose={() => setShowModal(false)}
				onSubmit={handleSubmit}
				loading={loading}
				error={error}
				form={form}
				onChange={handleChange}
				title='Agregar Alumno'
			/>
			<AlumnoModal
				open={editModal}
				onClose={() => setEditModal(false)}
				onSubmit={handleEditSubmit}
				loading={loading}
				error={error}
				form={editForm}
				onChange={handleEditChange}
				title='Editar Alumno'
			/>
			<DetalleAlumnoModal
				open={detalleModal}
				onClose={() => setDetalleModal(false)}
				alumno={detalleAlumno}
			/>
		</section>
	);
}

export default MainInformation;
