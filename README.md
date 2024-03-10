# 📖 Record Management System

The Record Management System is a web application that allows users to manage records across different databases. Users can log in, view records, add new records, search for records, and switch between databases.

## 🚀 Features

- **User Authentication**: Users can log in with their credentials.
- **Dashboard**: Displays records from different databases in a tabular format.
- **Sorting**: Users can sort records based on name, email, or phone number in ascending or descending order.
- **Searching**: Users can search for records based on name, email, or phone number.
- **Database Navigation**: Users can switch between databases using tabs.
- **Add Record Form**: Users can add new records to the selected database.
- **Validation**: The add record form includes validations for name, email, and phone number fields.
- **Error Handling**: Error messages are displayed if there's an issue adding a record.
- **Notifications**: Success and error notifications are displayed when records are successfully added or when there's an error.
- **Responsive Design**: The application is designed to work seamlessly across different screen sizes.

## 🛠️ Technologies Used

### Frontend:
- React.js
- Axios for HTTP requests
- Tailwind CSS for styling

### Backend:
- Node.js with Express.js
- MongoDB for the database
- Mongoose for MongoDB object modeling
- JWT for authentication

## 📦 Setup Instructions

1. **Clone the repository**:
    git clone https://github.com/ParmodKumar28/Record-Manager

2. **Install dependencies**:
    - Navigate to the frontend directory and run:
        npm install

    - Navigate to the backend directory and run:
        npm install

3. **Set up environment variables**:
    - Create a .env file in the backend directory and add the following variables:
        ```makefile
        PORT=<port-number>
        MONGODB_URI=<mongodb-uri>
        JWT_SECRET=<jwt-secret>
        
4. **Start the servers**:
    - Navigate to the frontend directory and run:
        npm start
    - Navigate to the backend directory and run:
        npm start
    - Navigate to the backend directory and run concurrenty both frontend and backend server's:
        cd backend
        npm run dev

5. **Access the application**:
    - Open your web browser and go to http://localhost:3000 to access the application.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature`)
6. Create a new Pull Request

