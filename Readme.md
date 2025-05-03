# EMOT - Earn Money from Trash

![EMOT Logo](frontend/public/assets/images/trash-recycling.jpg)

EMOT (Earn Money from Trash) is a waste management system designed for schools to manage waste collection, recycling, and environmental education. The platform enables students and schools to participate in sustainable waste management practices while earning rewards.

## Features

### User Dashboard (School Classes)
- QR-based transactions for waste collection
- Activity history tracking
- Balance and points management
- Educational modules on environmental sustainability

### Admin Dashboard
- Waste transaction input and management
- QR code generation for transactions
- User verification and management
- Transaction records and reporting
- Monitoring tools for waste collection

### Developer/Business Dashboard
- Real-time transaction monitoring
- Data verification and management
- Account management tools
- Education program management
- Quota and reward reporting

## Tech Stack

### Frontend
- **Framework**: React.js with TypeScript
- **UI Library**: Material-UI and Tailwind CSS
- **State Management**: React Context API
- **Form Handling**: Formik with Yup validation
- **Icons**: Lucide React
- **Build Tool**: Vite

### Backend
- **Framework**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful API design

## Project Structure

```
EMOT/
├── frontend/                  # Frontend React application
│   ├── public/                # Static files
│   │   └── assets/            # Images and other assets
│   └── src/                   # Source code
│       ├── components/        # Reusable UI components
│       ├── pages/             # Page components
│       ├── services/          # API services
│       └── types/             # TypeScript type definitions
│
└── backend/                   # Backend Express application
    ├── prisma/                # Prisma schema and migrations
    └── src/                   # Source code
        ├── middleware/        # Express middleware
        ├── routes/            # API routes
        └── types/             # TypeScript type definitions
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

### Installation

#### Clone the repository
```bash
git clone https://github.com/shxroi/EMOT.git
cd EMOT
```

#### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create a .env file with the following variables
# DATABASE_URL="postgresql://username:password@localhost:5432/emot"
# JWT_SECRET="your-secret-key"
cp .env.example .env

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start the backend server
npm run dev
```

#### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Key Pages

- **Landing Page**: Introduction to EMOT with key features
- **Login/Register**: User authentication
- **Dashboard**: Main user interface for tracking waste and points
- **Transactions**: Record of waste transactions
- **Education**: Environmental education modules
- **Admin Panel**: Administrative tools for waste management

## Non-functional Features

- **Security**: Data encryption and multi-stakeholder authentication
- **Scalability**: PostgreSQL database for handling growth
- **Performance**: Fast CRUD operations (< 2s response time)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Team

- [shxroi](https://github.com/shxroi) - Developer

---

Made with ❤️ for a greener future