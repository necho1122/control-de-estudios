import React from 'react';

function AlumnosTable({ alumnos, onEdit, onDelete, fetching, onRowClick }) {
	return (
		<div className='overflow-x-auto'>
			<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
					<tr>
						<th className='p-4'>Nombre</th>
						<th className='p-4'>Edad</th>
						<th className='p-4'>Sexo</th>
						<th className='p-4'>Grado</th>
						<th className='p-4'>Sección</th>
						<th className='p-4'>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{fetching ? (
						<tr>
							<td
								colSpan={6}
								className='text-center py-8'
							>
								<span className='text-gray-500 dark:text-gray-300'>
									Cargando alumnos...
								</span>
							</td>
						</tr>
					) : alumnos.length === 0 ? (
						<tr>
							<td
								colSpan={6}
								className='text-center py-8'
							>
								<span className='text-gray-500 dark:text-gray-300'>
									No hay alumnos registrados.
								</span>
							</td>
						</tr>
					) : (
						alumnos.map((alumno) => (
							<tr
								key={alumno.id}
								className='border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
								onClick={(e) => {
									// Evita que el click en los botones dispare el modal de detalle
									if (
										e.target.tagName !== 'BUTTON' &&
										e.target.tagName !== 'svg' &&
										e.target.tagName !== 'path'
									) {
										onRowClick(alumno.id);
									}
								}}
							>
								<td className='p-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
									{alumno.nombre}
								</td>
								<td className='p-4'>{alumno.edad}</td>
								<td className='p-4'>{alumno.sexo}</td>
								<td className='p-4'>{alumno.grado}</td>
								<td className='p-4'>{alumno.seccion}</td>
								<td className='p-4'>
									<div className='flex space-x-2'>
										<button
											type='button'
											className='py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300'
											onClick={(e) => {
												e.stopPropagation();
												onEdit(alumno.id);
											}}
										>
											Editar
										</button>
										<button
											type='button'
											className='py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300'
											onClick={(e) => {
												e.stopPropagation();
												onDelete(alumno.id);
											}}
										>
											Eliminar
										</button>
									</div>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}

export default AlumnosTable;
