// React imports
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';


const LayoutAnonymous = lazy(() => import('../layouts/AnonymousLayout'));

const VigenereCypherPage = lazy(() => import('../pages/VigenereCipher'));
const TranspositionCipher = lazy(() => import('../pages/TranspositionCipher'));
const UnicKeyCipherPage = lazy(() => import('../pages/UnicKeyCypher'))

export const router = createBrowserRouter([
	{
		path: '/',
		element: <LayoutAnonymous />,
        children: [
            {
                index: true, element: <VigenereCypherPage />
            },
            {
                path: "unic-key", element: <UnicKeyCipherPage />
            },
            {
                path: "transposition", element: <TranspositionCipher />
            }
        ]
	},

]);