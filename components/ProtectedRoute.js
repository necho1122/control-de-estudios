'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated) {
			router.replace('/login');
		}
	}, [isAuthenticated, router]);

	if (!isAuthenticated) return null;

	return children;
}
