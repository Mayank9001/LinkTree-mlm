# Linktree Clone (MERN Stack)

A fully functional **Linktree clone** built using the **MERN (MongoDB, Express.js, React.js, Node.js)** stack. This application allows users to create and share customizable landing pages with multiple links, track click analytics, and personalize their profiles.

## Features

### 🔗 Link Management
- Add, edit, delete, and organize links.
- Track click counts for each link.
- Supports link types (App, Shop) with optional images.

### 🎨 Customization
- Personalize pages with themes, profile images, and custom styles.
- Real-time updates when links are added or modified.

### 📊 Analytics
- Monitor click counts for each link.
- View overall link performance insights.

### 🔒 User Authentication
- Secure sign-up and login using **JWT (JSON Web Tokens)**.

### 📱 Responsive Design
- Fully responsive UI for mobile and desktop devices.

## Tech Stack

- **Frontend:** React.js (with CSS Modules for styling)
- **Backend:** Node.js with Express.js (REST API)
- **Database:** MongoDB (for user profiles, links, and analytics)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Mayank9001/LinkTree-mlm.git
    cd linktree-clone
    ```

2. **Set up the backend:**

    ```bash
    cd backend
    npm install
    npm run dev
    ```

3. **Set up the frontend:**

    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4. **Environment Variables:**

Create a `.env` file in the backend directory and add the following:

    ```env
    PORT=3000
    JWT_SECRET=Your 32/64/128/256 bit JWT Secret Key
    MONGODB=Your MongoDB Cluster Connection String 
    CLOUD_NAME=Your Cloudinary Name
    CLOUDINARY_API_KEY=Your Cloudinary API Key
    CLOUDINARY_API_SECRET=Your Cloudinary API Secret Key 
    ```

## Usage

1. Register and log in to create your personalized link page.
2. Add and manage links, track analytics, and customize your page.
3. Share your unique link page with others.

## Future Enhancements

- Drag-and-drop link ordering.
- QR code generation for link sharing.
- Advanced click analytics (location, device tracking).
- Subscription model for premium features.
