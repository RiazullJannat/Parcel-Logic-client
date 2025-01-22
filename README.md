# Delivery App

A full-stack delivery application with role-based functionalities for users, delivery personnel, and admins. It includes a beautiful UI, animations, and responsive design for seamless user interaction.

---

## Features

### Home Page
- **Navbar**: Displays logo, website name, Home, Notification icon, and Login/Logout/Profile Picture. 
  - Profile dropdown for logged-in users with `Username`, `Dashboard`, and `Logout`.
- **Banner Section**: Background image with heading text and a search bar.
- **Our Features Section**: Showcases 3 delivery features with icons, titles, and descriptions.
- **Statistics Section**: Displays app usage statistics using animated counters (`react-countup`).
- **Top Delivery Man Section**: Highlights top 3 delivery personnel based on parcels delivered and average ratings.

### Authentication
- **Login & Registration**: Email/password-based and social login.
- **User Types**: `User`, `DeliveryMen`, `Admin`.
  - Admin registration requires database modification.
  - Admins can update user roles from the dashboard.
- **Profile Management**: Users can update profiles, including uploading profile images.

### Role-Based Dashboards
#### User Dashboard
- **Book a Parcel**: Users can book parcels by filling out a validated form.
- **My Parcels**: Displays user bookings with filters by status, update, cancel, and review functionality.
- **My Profile**: Displays and allows updates to user profile information.

#### Admin Dashboard
- **Statistics**: Visualizes app data using bar and line charts (`React Apex Charts`).
- **All Parcels**: Manage parcel statuses and assign delivery personnel.
- **All Users**: View, paginate, and update user roles.
- **All Delivery Men**: Displays delivery personnel with performance data.

#### Delivery Men Dashboard
- **My Delivery List**: Lists parcels assigned to the logged-in delivery man with options to view location, cancel, or mark as delivered.
- **My Reviews**: Displays user reviews for the delivery man.

---

## Technologies Used

### Frontend
- React.js
- Tailwind CSS
- DaisyUI
- Shadcn
- React Hook Form (Optional)
- React Leaflet/MapBox (Optional)

### Backend
- Node.js
- Express.js
- MongoDB

### Other Libraries/Tools
- JWT for authentication
- React CountUp
- React Stripe Checkout
- React Confetti Explosion

---

## Key Functionalities

1. **Search System**: Admins can filter parcels using date ranges with MongoDB `$gte` and `$lte`.
2. **Payment System**: Stripe integration for secure parcel payments.
3. **Parcel Management**: Dynamic price calculation based on weight.
4. **Statistics & Charts**: Aggregated data visualization for admins.
5. **Role-Based Access**: Conditional rendering of dashboard menus and pages.
