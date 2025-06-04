'use client';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useEffect } from 'react';
import { listenAuthState } from '@/lib/firebase';
import { login, logout } from '@/store/features/auth/authSlice';

export default function ReduxProvider({ children }) {
	useEffect(() => {
		const unsubscribe = listenAuthState(async (user) => {
			if (user) {
				store.dispatch(
					login({
						id: user.uid,
						name: user.displayName || user.email,
						email: user.email,
						role: 'user',
						token: await user.getIdToken(),
					})
				);
			} else {
				store.dispatch(logout());
			}
		});
		return () => unsubscribe();
	}, []);

	return <Provider store={store}>{children}</Provider>;
}
