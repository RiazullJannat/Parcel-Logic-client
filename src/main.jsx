import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './routers/router';
import AuthProvider from './providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
const queryclient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryclient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer></ToastContainer>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
