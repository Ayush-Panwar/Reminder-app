# Reminder App

A Reminder application built with Angular and RxJS, featuring:

- Add reminders with custom times
- Automatic time tracking with both normal and fast modes
- Auto strike-through of completed reminders
- Professional UI with elegant design

## Features

- **Time Control**: Click the red header clock to toggle between normal and fast time (1 min = 1 sec)
- **Elegant UI**: Clean, modern interface with card-based design
- **Time Picker**: Intuitive time selection through a dedicated time picker
- **Reactive**: Built with RxJS for reactive state management

## Deployment on Vercel

This project is configured for easy deployment on Vercel.

### Automatic Deployment (recommended)

1. Fork or push this repository to GitHub
2. Create a new project on [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect Angular and deploy with the correct settings
5. Your app will be live at a Vercel URL

### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Log in to Vercel
vercel login

# Deploy from the project directory
cd simple-reminder-app
vercel
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm start

# Build for production
npm run build
```

## Technologies Used

- Angular 19
- RxJS
- SCSS
- Material Timepicker
