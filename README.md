# Parcel Logic

![Parcel Logic Application Screenshot]('/src/assets/parcelLogic.png')
<!-- <image src="./src/assets/parcelLogic.png" alt="Parcel Logic Application Screenshot"/> -->

**Delivering Your World, One Parcel at a Time.**

Parcel Logic is a web application that simplifies parcel deliveries by providing a seamless and efficient user experience. With real-time tracking, interactive dashboards, and secure payment integration, it’s the ultimate solution for modern parcel management.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
   - [Requirements](#requirements)
   - [Steps to Install](#steps-to-install)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [Environment Variables](#environment-variables)
8. [Contributors](#contributors)
9. [License](#license)

---

## Introduction

Parcel Logic is built to bridge the gap between delivery services and end-users by offering:

- Real-time parcel tracking
- Integration with secure payment gateways like Stripe
- Geolocation services for delivery tracking
- Notifications for status updates

Whether you are a business managing multiple shipments or an individual sending a parcel, Parcel Logic ensures a hassle-free experience.

---

## Features

- **Interactive Dashboard**: A user-friendly interface to manage parcels and view notifications.
- **Stripe Payment Integration**: Secure and easy payment processing.
- **Real-Time Tracking**: Monitor parcel status with live updates.
- **Map Integration**: Visualize delivery routes using Leaflet.
- **Custom Alerts**: Notifications for important updates using SweetAlert2.
- **Data Insights**: Graphical representations powered by ApexCharts.
- **Responsive Design**: Tailored for both desktop and mobile platforms.

---

## Technologies Used

### Frontend
- **React**: Core library for building the interface.
- **React Router DOM**: Enables smooth navigation.
- **TailwindCSS**: Ensures a responsive and modern design.
- **React Hook Form**: Simplifies form validation and state management.

### Backend & APIs
- **Firebase**: Authentication, database, and cloud storage.
- **Stripe**: Secure payment handling.
- **Leaflet**: Map visualization for parcel tracking.

### Libraries & Tools
- **Axios**: Manages HTTP requests.
- **ApexCharts**: Data visualization.
- **Lottie React**: Adds animations for enhanced user interaction.
- **SweetAlert2**: Modern alert and modal library.

---

## Installation

### Requirements

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher): [Download Node.js](https://nodejs.org/)
- **npm** or **yarn**: Comes with Node.js
- **Git**: [Download Git](https://git-scm.com/)
- A code editor like [VS Code](https://code.visualstudio.com/)

### Steps to Install

Follow these steps to install and run Parcel Logic locally:

1. **Clone the Repository**  
   Open your terminal and run:
   ```bash
   git clone https://github.com/yourusername/parcel-logic.git
   ```
   Navigate into the project directory:
   ```bash
   cd parcel-logic
   ```

2. **Install Dependencies**  
   Run the following command to install all required packages:
   ```bash
   npm install
   ```
   > _Alternatively, use `yarn install` if you prefer Yarn._

3. **Configure Environment Variables**  
   Create a `.env` file in the project root directory and add the necessary environment variables. See [Configuration](#configuration) for details.

4. **Start the Development Server**  
   Start the development server by running:
   ```bash
   npm run dev
   ```
   Once the server is running, open your browser and visit:
   ```
   http://localhost:3000
   ```

5. **Build for Production** (Optional)  
   If you need to build the application for production, use:
   ```bash
   npm run build
   ```

---

## Configuration

Before running the application, set up the `.env` file in the project root directory with your configuration:

```env
VITE_apiKey=your-firebase-api-key
VITE_authDomain=your-firebase-auth-domain
VITE_projectId=your-firebase-project-id
VITE_storageBucket=your-firebase-storage-bucket
VITE_messagingSenderId=your-firebase-messaging-sender-id
VITE_appId=your-firebase-app-id
VITE_image_bb_api=your-image-upload-api-key
VITE_STRIPE_PK=your-stripe-public-key
```

Replace the placeholders with your actual API keys and credentials.

---

## Usage

1. Open the home page to explore the dashboard and features.
2. Use the search bar to find parcels by their tracking ID.
3. Access the map to track parcel delivery routes in real time.
4. Make payments securely using Stripe.
5. Receive notifications about parcel status changes.

---

## Environment Variables

This application requires the following environment variables to function correctly:

- `VITE_apiKey`: Firebase API Key
- `VITE_authDomain`: Firebase Auth Domain
- `VITE_projectId`: Firebase Project ID
- `VITE_storageBucket`: Firebase Storage Bucket
- `VITE_messagingSenderId`: Firebase Messaging Sender ID
- `VITE_appId`: Firebase App ID
- `VITE_image_bb_api`: API key for the image hosting service
- `VITE_STRIPE_PK`: Stripe public key for payment processing

---

## Contributors

- **[Riazull Jannat](https://github.com/RiazullJannat)** - Developer and maintainer of the project.

---


---

## Screenshot

![Parcel Logic Screenshot](./parcelLogic.png)