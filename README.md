# Engin Source

## Authentication Setup

This project uses Convex Auth with GitHub and Google providers. You need to set up the following environment variables:

### Required Environment Variables

1. **GitHub OAuth** (for GitHub authentication):
   - `GITHUB_CLIENT_ID`: Your GitHub OAuth App Client ID
   - `GITHUB_CLIENT_SECRET`: Your GitHub OAuth App Client Secret

2. **Google OAuth** (for Google authentication):
   - `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret

3. **Convex Configuration**:
   - `CONVEX_SITE_URL`: Your Convex site URL (usually your deployment URL)

### Setting up OAuth Apps

#### GitHub OAuth App
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set the Authorization callback URL to: `https://your-convex-deployment.convex.cloud/auth/github/callback`
4. Copy the Client ID and Client Secret

#### Google OAuth App
1. Go to Google Cloud Console > APIs & Services > Credentials
2. Create a new OAuth 2.0 Client ID
3. Set the Authorized redirect URIs to: `https://your-convex-deployment.convex.cloud/auth/google/callback`
4. Copy the Client ID and Client Secret

### Environment File
Create a `.env` file in your project root with:
```
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CONVEX_SITE_URL=https://your-convex-deployment.convex.cloud
```

## Development

```bash
npm install
npm run dev
```

## Authentication Flow

1. Users can sign in with either GitHub or Google
2. Upon successful authentication, a user record is automatically created in the `users` table
3. Users can then complete onboarding to create their profile
4. The `createProfile` mutation will automatically create a user record if one doesn't exist 