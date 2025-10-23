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

