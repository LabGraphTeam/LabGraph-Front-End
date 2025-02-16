# LabGraph Project

A web application for laboratory quality control management implementing Westgard rules for statistical quality control (QC) in clinical laboratories.

## Project Structure

```bash
├── public/          # Static files
├── src/
│   ├── features/    # Reusable features components
│   │   ├── analytics-table/
│   │   ├── authentication/
│   │   ├── charts/
│   │   ├── features/
│   │   ├── reports/
│   │   └── shared/
│   ├── pages/       # Routes
│   │   ├── api/
│   │   ├── auth/
│   │   ├── charts/
│   │   └── misc/
│   ├── services/    # External services
│   └── styles/      # Global styles
└── config files     # Configuration files
```

## Key Features

- **Quality Control**

  - Westgard multi-rules implementation
  - Real-time violation detection
  - Statistical process control (SPC)

- **Visualization**

  - Levey-Jennings charts
  - Interactive dashboards for Hematology, Coagulation, and Biochemistry
  - Dark/Light mode support

- **Analytics**
  - QC data analysis with filtering
  - Statistical metrics
  - Email alerts for violations

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm

### Quick Start

```bash
git clone https://github.com/LeonardoMeireles55/LabGraph-Front-End.git
cd LabGraph-Front-End
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Docker

Development: Execute `docker compose --profile dev up -d --remove-orphans`

Prod: Execute `docker compose --profile prod up -d`

### Production Build

```bash
npm run build
node ./.next/standalone/server.js

```

## Contributing

1. Fork the repository
2. Create feature/[...] or fix/[...] branch
3. Submit pull request

## License

Licensed under GNU General Public License v3.0 (GPL-3.0)

![image](https://github.com/user-attachments/assets/89193291-fe53-488e-b652-4094d319f281)
