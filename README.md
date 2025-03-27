# Ishanya - Special Education Management System

Ishanya is a comprehensive special education management system designed to streamline the administration, tracking, and delivery of special education programs. The system features both web and mobile interfaces, powered by AI capabilities for document processing and student assessment.

## Features

### For Administrators
- Dashboard with key metrics and analytics
- Program management (create, update, and monitor programs)
- Student and educator registration approval
- Bulk student import via Excel/CSV
- Performance tracking and reporting
- Resource allocation and management

### For Educators
- Student progress tracking
- Feedback and assessment management
- Communication with students and parents
- Program-specific tools and resources
- Performance metrics and analytics

### For Students
- Personalized learning dashboard
- Progress tracking and feedback viewing
- Communication with educators
- Access to learning resources
- Performance analytics

### AI-Powered Features
- Document processing (Aadhar cards, resumes, medical reports)
- Automated data extraction
- Student performance analysis
- Personalized learning insights

## Tech Stack

### Frontend
- **Web Application**
  - Next.js 15.1.0
  - React 19
  - TypeScript
  - Tailwind CSS
  - Shadcn UI components
  - React Hook Form
  - Zod validation
  - Recharts for data visualization

- **Mobile Application**
  - React Native with Expo
  - React Navigation
  - React Native Paper
  - Various Expo modules
  - AsyncStorage
  - Supabase client

### Backend
- Flask (Python web framework)
- Flask-SQLAlchemy (ORM)
- Flask-JWT-Extended (Authentication)
- Flask-Bcrypt (Password hashing)
- Flask-Login (Session management)
- Flask-CORS (Cross-origin support)

### AI and Document Processing
- Google Generative AI (Gemini)
- EasyOCR
- PDFMiner.six
- PDF2Image
- Pillow

### Database
- SQLite
- SQLAlchemy ORM

## Getting Started

### Prerequisites
- Python 3.12+
- Node.js 18+
- npm or yarn
- Expo CLI (for mobile development)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ishanya
```

2. Backend Setup:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Frontend Setup:
```bash
cd frontend
npm install
```

4. Mobile App Setup:
```bash
cd "mobile app"
npm install
```

### Environment Variables

Create a `.env` file in the backend directory with the following variables:
```
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret
DATABASE_URL=sqlite:///database.db
GENAI_API_KEY=your_google_ai_api_key
```

### Running the Application

1. Start the Backend:
```bash
cd backend
flask run
```

2. Start the Frontend:
```bash
cd frontend
npm run dev
```

3. Start the Mobile App:
```bash
cd "mobile app"
expo start
```

## API Documentation

The API endpoints are organized into the following categories:

- `/auth` - Authentication and user management
- `/educators` - Educator-specific operations
- `/students` - Student-specific operations
- `/admins` - Administrative operations

Detailed API documentation is available in the backend documentation.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact the development team or raise an issue in the repository. 