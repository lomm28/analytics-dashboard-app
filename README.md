# Analytics Dashboard App

A modern, single-page React application for visualizing analytical data. This proof-of-concept (POC) application displays business metrics through interactive charts, diagrams, and tables.

## Features

- 📊 **Interactive Charts**: Line charts, bar charts, and pie charts for data visualization
- 📈 **Real-time Metrics**: Key performance indicators displayed in elegant cards
- 📋 **Sortable Tables**: User metrics organized in interactive tables with sorting capabilities
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations
- 📱 **Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **React 18.3.1** - Latest stable version of React
- **Vite 5.4.2** - Modern, fast build tool
- **Recharts 2.12.7** - Composable charting library built on React components

## Project Structure

```
analytics-dashboard-app/
├── data/                      # JSON data files
│   ├── sales-data.json        # Sales performance data
│   ├── user-metrics.json      # User metrics by region
│   └── product-performance.json
├── src/
│   ├── components/            # React components
│   │   ├── Dashboard.jsx      # Main dashboard container
│   │   ├── MetricsCard.jsx    # Metric display cards
│   │   ├── SalesChart.jsx     # Sales visualization chart
│   │   ├── ProductChart.jsx   # Product performance chart
│   │   └── UserMetricsTable.jsx # User metrics table
│   ├── App.jsx                # Root application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles
├── index.html                 # HTML entry point
├── vite.config.js             # Vite configuration
└── package.json               # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

### Running the Application

#### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

## Backend (FastAPI + PostgreSQL)

This repository includes a FastAPI backend that serves the datasets from a PostgreSQL database. The frontend fetches data from `/api/*` endpoints.

Local development (recommended)

1. Install Python dependencies for the backend:

```bash
uv venv # create virt environment
uv sync # add dependencies
```

2. Start a local PostgreSQL and set `DATABASE_URL` (example using Docker):

```bash
# Run postgres locally
docker run --name analytics-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=analytics -p 5432:5432 -d postgres:15

# Export a DATABASE_URL for the backend
export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/analytics
```

3. Seed the database (optional; seeds only if tables empty):

```bash
uv run dapp/seed.py
```

4. Start the backend (from project root):

```bash
npm run start:server
```

Notes for Kubernetes / Minikube

- Important: when building the backend Docker image for deployment, make sure the build context is the `server/` directory so `COPY . /app` in `server/Dockerfile` produces the expected layout. Two valid commands:

```bash
# build from inside the server directory (recommended)
cd server
docker build -t dashboard-fastapi-backend:latest .

# or from the repo root, pass the server directory as the context
docker build -t dashboard-fastapi-backend:latest -f server/Dockerfile server
```

- If you use Minikube, load the image into the cluster (no need to push):

```bash
minikube image load dashboard-fastapi-backend:latest
kubectl rollout restart deployment/dashboard-backend-app
kubectl rollout status deployment/dashboard-backend-app
kubectl logs -l app=dashboard-backend -c dashboard-backend-app --follow
```

- Alternatively, push to your registry and update the deployment image.

DB readiness and startup ordering

- The backend may attempt to connect to Postgres on startup. In Kubernetes that can race with the database pod becoming ready. Two recommended approaches to avoid crashloops:
	- add a small startup retry in the app (run DB migrations / Base.metadata.create_all inside a startup event with retries), and/or
	- add an initContainer in the backend Deployment that waits for `postgres:5432` to be reachable before starting the main container.

Proxy configuration

- During local frontend development Vite proxies `/api` to the backend service. When running in-cluster the proxy target used in `vite.config.js` was updated to `http://dashboard-backend-service:8000` to match the Kubernetes Service name.

#### Production Build

Build the application for production:

```bash
npm run build
```

The optimized build will be generated in the `dist/` directory.

#### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Data Structure

The application reads data from JSON files in the `data/` folder:

### sales-data.json
Contains monthly sales metrics including revenue, expenses, profit, and customer count.

### user-metrics.json
Contains regional user statistics including active users, new users, churn rate, and average session time.

### product-performance.json
Contains product-specific sales data and growth rates.

## Customization

### Adding New Data

To add or modify data:

1. Edit the JSON files in the `data/` folder
2. Maintain the existing data structure
3. The application will automatically load the updated data

### Styling

- Component-specific styles are in separate CSS files
- Global styles are in `src/index.css`
- Color scheme and theme can be customized in CSS files

## Best Practices Implemented

- ✅ Component-based architecture
- ✅ Separation of concerns (components, styles, data)
- ✅ React Hooks for state management
- ✅ Responsive design patterns
- ✅ Modern ES6+ JavaScript
- ✅ Clean, maintainable code structure
- ✅ Production-ready build configuration

## Running app in docker container

```bash
docker build -t analytics-dashboard . # build docker image
docker run -p 80:80 analytics-dashboard # start container on port 80
````

## License

ISC

## Author

Dmytro Danko <dmytro.danko@protonmail.com>

