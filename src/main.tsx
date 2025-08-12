
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api';
import { router } from './routes/index.tsx';

// Style imports
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './styles/globals.scss'
import { GlobalToast } from './components/GlobalToast/index.tsx';

createRoot(document.getElementById('root')!).render(

    <PrimeReactProvider value={{ unstyled: false }}>
        <GlobalToast />
        <RouterProvider router={router} />
    </PrimeReactProvider>
 
)
