import React from 'react';

function DetalleAlumnoModal({ open, onClose, alumno }) {
	if (!open || !alumno) return null;
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='relative bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-2xl border border-indigo-100 dark:border-gray-700 animate-fade-in'>
				<button
					className='absolute top-4 right-4 text-gray-400 hover:text-indigo-600 dark:hover:text-white text-2xl font-bold transition'
					onClick={onClose}
					aria-label='Cerrar'
				>
					&times;
				</button>
				<div className='flex items-center mb-6'>
					<div className='flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 rounded-full w-16 h-16 flex items-center justify-center shadow'>
						<svg
							className='w-10 h-10 text-indigo-600 dark:text-indigo-300'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.5'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.232 15.232a4 4 0 01-6.464 0M12 11a4 4 0 100-8 4 4 0 000 8zm0 0v1m0 4v1m-4-1a4 4 0 018 0'
							/>
						</svg>
					</div>
					<div className='ml-5'>
						<h2 className='text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 mb-1'>
							{alumno.nombre}
						</h2>
						<p className='text-sm text-gray-500 dark:text-gray-400'>
							Ficha completa del alumno
						</p>
					</div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2'>
							Datos personales
						</h3>
						<ul className='space-y-2'>
							<li>
								<span className='font-medium text-gray-600 dark:text-gray-300'>
									Edad:
								</span>{' '}
								<span className='text-gray-900 dark:text-white'>
									{alumno.edad}
								</span>
							</li>
							<li>
								<span className='font-medium text-gray-600 dark:text-gray-300'>
									Sexo:
								</span>{' '}
								<span className='text-gray-900 dark:text-white'>
									{alumno.sexo}
								</span>
							</li>
							<li>
								<span className='font-medium text-gray-600 dark:text-gray-300'>
									Fecha de nacimiento:
								</span>{' '}
								<span className='text-gray-900 dark:text-white'>
									{alumno.fecha_nacimiento}
								</span>
							</li>
							<li>
								<span className='font-medium text-gray-600 dark:text-gray-300'>
									Lugar de nacimiento:
								</span>{' '}
								<span className='text-gray-900 dark:text-white'>
									{alumno.lugar_nacimiento}
								</span>
							</li>
						</ul>
					</div>
					<div>
						<h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2'>
							Información académica
						</h3>
						<ul className='space-y-2'>
							<li>
								<span className='font-medium text-gray-600 dark:text-gray-300'>
									Grado:
								</span>{' '}
								<span className='text-gray-900 dark:text-white'>
									{alumno.grado}
								</span>
							</li>
							<li>
								<span className='font-medium text-gray-600 dark:text-gray-300'>
									Sección:
								</span>{' '}
								<span className='text-gray-900 dark:text-white'>
									{alumno.seccion}
								</span>
							</li>
						</ul>
					</div>
				</div>
				<div className='mt-8'>
					<h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2'>
						Datos del representante
					</h3>
					<div className='bg-indigo-50 dark:bg-gray-800 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4 border border-indigo-100 dark:border-gray-700'>
						<div>
							<p>
								<span className='font-medium text-gray-600 dark:text-gray-300'>
									Nombre:
								</span>{' '}
								<span className='text-gray-900 dark:text-white'>
									{alumno.representante?.nombre}
								</span>
							</p>
							<p>
								<span className='font-medium text-gray-600 dark:text-gray-300'>
									Parentesco:
								</span>{' '}
								<span className='text-gray-900 dark:text-white'>
									{alumno.representante?.parentesco}
								</span>
							</p>
							<p>
								<span className='font-medium text-gray-600 dark:text-gray-300'>
									Cédula:
								</span>{' '}
								<span className='text-gray-900 dark:text-white'>
									{alumno.representante?.cedula}
								</span>
							</p>
						</div>
						<div>
							<p>
								<span className='font-medium text-gray-600 dark:text-gray-300'>
									Teléfono:
								</span>{' '}
								<span className='text-gray-900 dark:text-white'>
									{alumno.representante?.telefono}
								</span>
							</p>
							<p>
								<span className='font-medium text-gray-600 dark:text-gray-300'>
									Dirección:
								</span>{' '}
								<span className='text-gray-900 dark:text-white'>
									{alumno.representante?.direccion}
								</span>
							</p>
						</div>
					</div>
				</div>
				<div className='mt-8 flex justify-end'>
					<button
						onClick={onClose}
						className='px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow transition'
					>
						Cerrar
					</button>
				</div>
			</div>
			<style jsx>{`
				@keyframes fade-in {
					from {
						opacity: 0;
						transform: translateY(40px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fade-in {
					animation: fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
				}
			`}</style>
		</div>
	);
}

export default DetalleAlumnoModal;
