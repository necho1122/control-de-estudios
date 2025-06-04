import React from 'react';

function AlumnoModal({
	open,
	onClose,
	onSubmit,
	loading,
	error,
	form,
	onChange,
	title,
}) {
	if (!open) return null;
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'>
			<div className='bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-lg relative'>
				<button
					className='absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white'
					onClick={onClose}
				>
					&times;
				</button>
				<h2 className='text-xl font-bold mb-4 text-gray-900 dark:text-white'>
					{title}
				</h2>
				<form
					onSubmit={onSubmit}
					className='space-y-3'
				>
					<div className='grid grid-cols-2 gap-3'>
						<input
							name='nombre'
							value={form.nombre}
							onChange={onChange}
							className='border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
							placeholder='Nombre'
							required
						/>
						<input
							name='edad'
							type='number'
							value={form.edad}
							onChange={onChange}
							className='border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
							placeholder='Edad'
							required
						/>
						<input
							name='fecha_nacimiento'
							type='date'
							value={form.fecha_nacimiento}
							onChange={onChange}
							className='border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
							placeholder='Fecha de nacimiento'
							required
						/>
						<input
							name='lugar_nacimiento'
							value={form.lugar_nacimiento}
							onChange={onChange}
							className='border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
							placeholder='Lugar de nacimiento'
							required
						/>
						<select
							name='sexo'
							value={form.sexo}
							onChange={onChange}
							className='border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700'
							required
						>
							<option value=''>Sexo</option>
							<option value='Femenino'>Femenino</option>
							<option value='Masculino'>Masculino</option>
						</select>
						<select
							name='grado'
							value={form.grado}
							onChange={onChange}
							className='border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700'
							required
						>
							<option value=''>Grado</option>
							<option value='Preescolar'>Preescolar</option>
							<option value='1ro'>1ro</option>
							<option value='2do'>2do</option>
							<option value='3ro'>3ro</option>
							<option value='4to'>4to</option>
							<option value='5to'>5to</option>
							<option value='6to'>6to</option>
						</select>
						<input
							name='seccion'
							value={form.seccion}
							onChange={onChange}
							className='border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
							placeholder='Sección'
							required
						/>
					</div>
					<div className='border-t pt-3 mt-2 border-gray-200 dark:border-gray-700'>
						<h3 className='font-semibold mb-2 text-sm text-gray-900 dark:text-white'>
							Representante
						</h3>
						<div className='grid grid-cols-2 gap-3'>
							<input
								name='representante.nombre'
								value={form.representante.nombre}
								onChange={onChange}
								className='border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
								placeholder='Nombre'
								required
							/>
							<input
								name='representante.parentesco'
								value={form.representante.parentesco}
								onChange={onChange}
								className='border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
								placeholder='Parentesco'
								required
							/>
							<input
								name='representante.telefono'
								value={form.representante.telefono}
								onChange={onChange}
								className='border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
								placeholder='Teléfono'
								required
							/>
							<input
								name='representante.cedula'
								value={form.representante.cedula}
								onChange={onChange}
								className='border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
								placeholder='Cédula'
								required
							/>
							<input
								name='representante.direccion'
								value={form.representante.direccion}
								onChange={onChange}
								className='border rounded p-2 col-span-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
								placeholder='Dirección'
								required
							/>
						</div>
					</div>
					{error && <div className='text-red-500'>{error}</div>}
					<button
						type='submit'
						disabled={loading}
						className='w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold'
					>
						{loading
							? title === 'Editar Alumno'
								? 'Actualizando...'
								: 'Agregando...'
							: title === 'Editar Alumno'
								? 'Actualizar'
								: 'Agregar'}
					</button>
				</form>
			</div>
		</div>
	);
}

export default AlumnoModal;
