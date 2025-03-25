# LabGraph Front-End Project

A comprehensive web application for laboratory quality control management implementing Westgard rules for statistical quality control (QC) in clinical laboratories.

## Project Structure

```bash
├── public/          # Static files
├── src/
│   ├── features/    # Feature-based component organization
│   │   ├── about/                  # About page components & constants
│   │   ├── analytics-charts/       # Chart-related components and utilities
│   │   ├── analytics-upload-files/ # File upload and processing
│   │   ├── authentication/         # Auth components and contexts
│   │   ├── dynamic-pages/          # Dynamically generated page components
│   │   └── shared/                 # Reusable components, hooks, and utilities
│   ├── pages/       # Next.js pages and API routes
│   │   └── api/     # Backend API endpoints
│   ├── services/    # External services and API wrappers
│   ├── styles/      # Global styles and theme configuration
│   └── types/       # TypeScript type definitions
└── config files     # Configuration files
```

## Key Features

- **Quality Control**

  - Implementation of Westgard multi-rules for laboratory QC
  - Statistical process control (SPC) for monitoring lab test performance
  - Real-time quality violation detection

- **Data Visualization**

  - Interactive Levey-Jennings charts for tracking QC performance
  - Specialized dashboards for Hematology, Biochemistry, and Coagulation
  - Responsive dark/light theme support

- **File Processing**

  - CSV data import and validation
  - Automated data processing and standardization
  - Test result trend analysis

- **User Experience**
  - Modern, responsive interface
  - Role-based access control
  - Comprehensive documentation and FAQ

## Technologies

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Charting**: Custom visualization components(recharts.js)
- **State Management**: React Context API, SWR for data fetching
- **Styling**: Tailwind with custom theming

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Access to backend API (separate repository)

### Installation

```bash
# Clone the repository
git clone https://github.com/LabGraphTeam/LabGraph-Front-End.git
cd LabGraph-Front-End

# Install dependencies
npm ci

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Environment Variables

```
NEXT_PUBLIC_API_BASE_URL=https://api.example.com

NEXT_PUBLIC_API_BASE_URL_REPORTS=date-range?

NEXT_PUBLIC_API_BASE_URL_RESULTS_GROUPED=grouped-by-level?name=

NEXT_PUBLIC_APP_VERSION=0.9.5

```

## Deployment

### Production Build

```bash
npm run build
npm run start
```

### Docker

```bash
# Development
docker compose --profile dev up -d --remove-orphans

# Production
docker compose --profile prod up -d
```

## Team

- Leonardo Meireles - Full Stack Developer
- Mathew Vieira - Full Stack Developer & Designer

## License

Licensed under GNU General Public License v3.0 (GPL-3.0)
