import { createRootRoute, Outlet } from '@tanstack/react-router'
import { AuthProvider } from '@/features/authentication/context/AuthContext'
export const Route = createRootRoute({
  component: () => 
  <AuthProvider>
    <Outlet />
  </AuthProvider>,
})