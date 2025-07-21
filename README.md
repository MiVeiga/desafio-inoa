# B3 Quote App

**B3 Quote App** is a full-stack web application that allows users to view and analyze stock quotes from B3 (Brazilian Stock Exchange). It consists of a React frontend and a Node.js backend that work together to fetch, process, and display real-time stock data through interactive charts.

---

## About the Project

- **Development Time**: 1 day
- **Architecture**: Full-stack application with separate frontend and backend(BFF)
- **Frontend**: React application with TypeScript and Material-UI
- **Backend**: Node.js API with Express and TypeScript
- **Data Source**: External stock APIs for Brazilian market data

## Frontend

The frontend is a React application built with modern technologies:

### Features

✅ **Stock Quote Search** – Search for stocks by symbol and view historical data.  
✅ **Date Range Filtering** – Select custom date ranges for analysis.  
✅ **Interactive Charts** – Visualize stock performance with line charts.  
✅ **Error Handling** – Robust error handling with user-friendly messages.  
✅ **Loading States** – Smooth loading experiences with skeleton components.  
✅ **Mobile Responsive** – Works seamlessly on desktop and mobile devices.

### Tech Stack

- **React** + **TypeScript** → Ensures structure and strong typing.  
- **Material UI (MUI)** → Provides responsive and styled components.  
- **Recharts** → Creates interactive and responsive charts.  
- **Axios** → Handles HTTP requests to fetch API data.  
- **Vite** → Ensures a fast and efficient development environment.
- **Vitest** → Used for unit and integration testing.
- **React Testing Library** → Provides utilities for testing React components.

## Backend

The backend is a Node.js API that serves as a proxy and data processor:

### Features

✅ **API Proxy** – Routes requests to external stock APIs.  
✅ **Data Processing** – Transforms and formats stock data.  
✅ **Error Handling** – Centralized error handling and logging.  
✅ **Caching** – Implements caching for better performance.  
✅ **Type Safety** – Full TypeScript implementation.

### Tech Stack

- **Node.js** + **TypeScript** → Server-side runtime with type safety.
- **Express.js** → Web framework for building REST APIs.
- **Axios** → HTTP client for external API calls.
- **CORS** → Cross-origin resource sharing support.

---

## API Used

This application consumes data from **[Brapi API](https://brapi.dev/)**, a free Brazilian stock market API that provides real-time and historical stock data.

📌 **Official Website:** [Brapi](https://brapi.dev/)  
📌 **API Documentation:** [Brapi Docs](https://brapi.dev/docs)  
📌 **Endpoint Used:** `/api/quote/{symbols}` for stock quotes

### API Features

- Real-time stock quotes from B3
- Historical data with custom date ranges
- Support for multiple stock symbols
- Free tier with generous limits

## How to Run the Project

1 - Clone the repository

```js
git clone https://github.com/MiVeiga/desafio-inoa.git
cd desafio-inoa
```

2- Install frontend dependencies

```js
cd frontend
npm install
```

3- Install backend dependencies

```js
cd ../backend
npm install
```

4- Start the backend server

```js
npm run dev
```

5- Start the frontend development server (in a new terminal)

```js
cd ../frontend
npm run dev
```

## Testing

### Frontend Tests

```js
cd frontend
npm run test
npm run test:coverage
```

---

## Project Structure

```
b3-quote-app/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
└── backend/               # Node.js API
    ├── src/
    │   ├── routes/        # API routes
    │   ├── services/      # Business logic
    │   ├── types/         # TypeScript types
    │   └── utils/         # Utility functions
```

---

## Próximas Features / Evoluções

### Frontend

- [ ] Melhorar cobertura de teste unitários
- [ ] Adicionar husky com pre commit, lint e conventional commits
- [ ] Adicionar novas features: tela de home, montar tabelas em consulta de assets
- [ ] Adicionar mais filtros e interação no próprio gráfico
- [ ] Adicionar teste de integração

### Backend

- [ ] Adicionar teste unitários
