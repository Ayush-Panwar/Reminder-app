# Deployment Checklist for Vercel

## Pre-Deployment Steps

- [x] Create a production build (`npm run build -- --configuration=production`)
- [x] Add vercel.json configuration file
- [x] Update package.json with vercel-build script
- [x] Add robots.txt file
- [x] Create proper .gitignore file

## Vercel Deployment Steps

1. **Connect to GitHub**
   - Push your code to a GitHub repository
   - Connect Vercel to your GitHub account

2. **Import Project**
   - From the Vercel dashboard, click "Import Project"
   - Select your GitHub repository

3. **Configure Project**
   - Project Name: `reminder-app` (or your preferred name)
   - Framework Preset: `Angular`
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist/simple-reminder-app`
   - Install Command: `npm install`

4. **Environment Variables**
   - No environment variables needed for this project

5. **Deploy**
   - Click "Deploy" to launch the application

## Post-Deployment

- Check that all features are working correctly
- Verify that time tracking functions as expected
- Ensure the time picker works properly
- Check that completed reminders are struck through correctly

## URL Structure

The following URL patterns will be handled correctly:

- `/` - Main application
- `/*` - Any route will redirect to the main application

## Custom Domain (Optional)

If you want to use a custom domain:

1. Go to your project settings in Vercel
2. Navigate to the "Domains" tab
3. Add your custom domain
4. Follow the verification instructions

## Troubleshooting

If you encounter any issues:

1. Check Vercel build logs for errors
2. Verify that all required dependencies are installed
3. Ensure vercel.json configuration is correct
4. Make sure the build command is generating files in the correct directory 