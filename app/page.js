'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import MainInformation from '@/components/MainInformation';

export default function Home() {
	return (
		<ProtectedRoute>
			<div>
				<main>
					<MainInformation />
				</main>
				<footer></footer>
			</div>
		</ProtectedRoute>
	);
}
