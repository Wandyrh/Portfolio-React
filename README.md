# Portfolio React Demo

A demonstration project for the portfolio of Wandy Rodríguez. This React application showcases best practices in modular architecture, clean code, and integration with a RESTful API backend built in .NET 8 using Clean Architecture and SOLID principles.

- **Frontend Repository:** [Portfolio-React](https://github.com/Wandyrh/Portfolio-React)
- **Backend API Repository:** [Clean-Architecture-Dot-Net](https://github.com/Wandyrh/Clean-Architecture-Dot-Net)

---

## Technologies Used

- React 19 (with Hooks and Functional Components)
- TypeScript
- React Router (routing and navigation)
- React Hook Form (form management and validation)
- Tailwind CSS (UI and layout)
- i18next (internationalization)
- JWT (authentication)
- Custom CSS (for additional styles)
- Icons: SVG inline icons

---

## Project Architecture

- **Feature-based structure:** Each domain (users, products, product-categories, auth) is organized in its own folder under `src/`.
- **Services:** For API communication and business logic.
- **DTOs:** TypeScript interfaces for type safety and API integration.
- **Dialogs & Forms:** For CRUD operations using React components and modal dialogs.
- **Routing:** Configured in `src/App.tsx` using React Router.
- **Environment configuration:** API URL and other settings in `.env`.

---

## Main Libraries

- react-router-dom
- react-hook-form
- tailwindcss
- i18next
- (SVG) inline icons

---

## API Endpoints Used

The app communicates with a backend API. Main endpoints:

- **Authentication:** `POST /api/auth/login`
- **Users:** `GET /api/users`, `POST /api/users`, `PUT /api/users/{id}`, `DELETE /api/users/{id}`
- **Product Categories:** `GET /api/product-categories`, `POST /api/product-categories`, `PUT /api/product-categories/{id}`, `DELETE /api/product-categories/{id}`
- **Products:** `GET /api/products`, `POST /api/products`, `PUT /api/products/{id}`, `DELETE /api/products/{id}`

For full API details, see the backend repository: [Clean Architecture .NET API](https://github.com/Wandyrh/Clean-Architecture-Dot-Net)

---

## Environment Configuration

Set your API base URL and other environment variables in the `.env` file:

```env
VITE_API_URL=https://your-api-url.com
```

---

## Setup & Installation

Clone the repository:

```bash
git clone https://github.com/Wandyrh/Portfolio-React.git
cd Portfolio-React
```

Install dependencies:

```bash
npm install
```

Configure environment:

- Edit `.env` and set `VITE_API_URL` to your backend API.

Run the app:

```bash
npm run dev
```

Access the app:

- Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Features

- **Authentication:** Login with backend validation (JWT).
- **User Management:** CRUD for users.
- **Product Categories:** CRUD for product categories.
- **Products:** CRUD for products, with category selection.
- **Responsive UI:** Tailwind-based, mobile-friendly.
- **Dialogs:** Modal dialogs for create/edit forms.
- **Pagination:** Server-side pagination for lists.
- **Validation:** All forms with required field validation.

---

## Internationalization (i18n)

- Full support for English and Spanish throughout the application.
- Language selector available in the header, with instant language switching.
- All menus, views, forms, dialogs, alerts, and confirmation messages are translated.
- The selected language is saved in localStorage and automatically restored on page reload.
- Translation files are managed in `src/i18n.ts`.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Author

Wandy Rodríguez  
[https://github.com/Wandyrh](https://github.com/Wandyrh)

---

## License

This project is licensed under the MIT License.
