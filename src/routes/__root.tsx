import { ConvexAuthProvider } from '@convex-dev/auth/react';
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { ConvexReactClient } from 'convex/react';

export const Route = createRootRoute({
  component: RootComponent,
})
function RootComponent() {
  const deploymentURL = import.meta.env.VITE_CONVEX_URL;
  const convex = new ConvexReactClient(deploymentURL);
  return (
    <ConvexAuthProvider client={convex}>

      <Outlet />
    </ConvexAuthProvider>
  )
} 