import { useAuthActions } from "@convex-dev/auth/react";

export function AuthStatus() {
  const { signIn } = useAuthActions();
  
  // Check if auth is properly configured
  const isConfigured = signIn && typeof signIn === 'function';
  
  if (!isConfigured) {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-md">
        <p className="text-yellow-800">
          ⚠️ Authentication not configured. Please set up your environment variables:
        </p>
        <ul className="mt-2 text-sm text-yellow-700">
          <li>• GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET (for GitHub auth)</li>
          <li>• GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET (for Google auth)</li>
        </ul>
      </div>
    );
  }
  
  return null;
} 