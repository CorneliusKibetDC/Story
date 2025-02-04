

import { createAuthProvider } from 'react-token-auth';

export const { useAuth, authFetch, login, logout } = createAuthProvider({
    accessTokenKey: 'access_token',
    onUpdateToken: (token) =>
        fetch('https://backend-1-ogsa.onrender.com/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: token.refresh_token }),
        }).then((r) => r.json()),
});
