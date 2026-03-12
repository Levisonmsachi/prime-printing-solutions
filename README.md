# 🌟 Prime Print Solutions

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/Django-6.0-092E20?logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Prime Print Solutions** is a modern, high-performance web application designed for a premium printing and branding agency. It features a robust Django backend with a dynamic React frontend, providing a seamless user experience for showcasing services, portfolios, and handling client requests.

---

## 🚀 Features

- **✨ Dynamic Homepage**: High-impact hero section, featured services, and client testimonials.
- **📁 Portfolio Showcase**: Detailed gallery of completed projects categorized for easy navigation.
- **🛠️ Service Management**: Comprehensive listing of printing and branding services.
- **📜 Certification Tracking**: Display of industry certifications and standard compliance.
- **📨 Quote Request System**: Integrated form for clients to request custom quotes with file attachments.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop using Tailwind CSS 4.
- **🎨 Modern UI/UX**: Smooth animations powered by Framer Motion.
- **🛡️ Admin Dashboard**: Custom-styled Django admin interface (Jazzmin) for easy content management.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router DOM 7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Framework**: [Django 6.0](https://www.djangoproject.com/)
- **API**: [Django REST Framework](https://www.django-rest-framework.org/)
- **Admin UI**: [Jazzmin](https://github.com/f1n4m/django-jazzmin)
- **Database**: SQLite (Development)
- **Middleware**: Django CORS Headers

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.10+)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd prime_backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install django djangorestframework django-cors-headers django-jazzmin
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd prime_frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```text
prime-print-solutions/
├── prime_backend/          # Django Project
│   ├── core/               # Core logic and shared utilities
│   ├── homepage/           # App for landing page content
│   ├── servicespage/       # App for service listings
│   ├── portfoliopage/      # App for project showcase
│   ├── testimonials/       # App for client reviews
│   └── manage.py           # Django CLI
├── prime_frontend/         # React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page-level components
│   │   └── App.jsx         # Main application entry
│   ├── public/             # Static assets
│   └── tailwind.config.js  # Styling configuration
└── README.md               # You are here!
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">Made with ❤️ by the Prime Print Team</p>
