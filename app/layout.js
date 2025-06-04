'use client';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ReduxProvider from './ReduxProvider';
import ProtectedRoute from '@/components/ProtectedRoute';
import { usePathname } from 'next/navigation';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export default function RootLayout({ children }) {
	const pathname = usePathname();
	const isLoginPage = pathname === '/login';

	return (
		<html
			lang='en'
			className={`${geistSans.variable} ${geistMono.variable}`}
		>
			<body>
				<ReduxProvider>
					{isLoginPage ? children : <ProtectedRoute>{children}</ProtectedRoute>}
				</ReduxProvider>
			</body>
		</html>
	);
}
