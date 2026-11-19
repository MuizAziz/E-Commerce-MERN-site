# 🛒 ShopNest – MERN E-Commerce Website

ShopNest is a full-stack E-Commerce web application built using the MERN stack. It allows users to browse products, manage their shopping cart, place orders, and manage their accounts. It also includes an admin dashboard for managing products, users, and orders.

## 🚀 Features

### 👤 User Features
- User registration and login
- Authentication using JWT
- Browse and view products
- Add products to shopping cart
- Checkout and place orders
- View order history
- Manage user profile

### 🔐 Admin Features
- Admin dashboard with store statistics
- Add, edit, and delete products
- View registered users
- Manage customer orders
- Update order status

## 🛠️ Technologies Used

**Frontend**
- React.js
- Vite
- React Router DOM
- Redux Toolkit
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Nodemailer
- Multer
- Cloudinary

## 📁 Project Structure

```text
ShopNest/
│
├── backend/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   ├── index.js
│   └── seed.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── admin/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── redux/
│       └── styles/
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/MuizAziz/E-Commerce-MERN-site.git
```

### 2. Navigate to the project folder

```bash
cd E-Commerce-MERN-site
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 5. Configure environment variables

Create a `.env` file inside the backend folder and add the required environment variables.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Also configure the email, Cloudinary, and payment gateway credentials if required by the application. Check the backend configuration files for the exact variable names.

### 6. Run the application

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open the local URL displayed by Vite in your browser.

## 🌱 Sample Data

The backend includes a `seed.js` file to insert sample users, products, and orders into MongoDB.

Run the seed script using the command configured in your backend `package.json`.

**Note:** The seed script deletes existing users, products, and orders before inserting sample data. Use it only with a development database.

## 🔒 Security

- Environment variables are used for sensitive configuration.
- Passwords are hashed using bcryptjs.
- JWT is used for authentication.
- Protected routes restrict access based on user roles.

## 👨‍💻 Developer

**Muiz Aziz**

- GitHub: [MuizAziz](https://github.com/MuizAziz)
- LinkedIn: [Muiz Aziz](https://www.linkedin.com/in/muizaziz/)

---

⭐ If you find this project interesting, feel free to explore the repository!

