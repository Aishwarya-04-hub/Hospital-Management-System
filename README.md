# Hospital Management System API

## Project Overview
The Hospital Management System is a backend application developed using NestJS and MongoDB. It provides REST APIs to manage patients, doctors, appointments and notifications.

## Technologies Used
- Node.js
- TypeScript
- NestJS
- MongoDB
- Mongoose
- KafkaJS
- Postman

## Main Modules
1. Patient Management
2. Doctor Management
3. Appointment Management
4. Notification Management

Additional modules should be listed here only after implementation and testing.

## Features
- Create and manage patient records.
- Register and manage doctors.
- Book and manage appointments.
- Validate patient and doctor references.
- Prevent duplicate doctor appointment slots.
- Validate API request data.
- Protect write operations using API-key authentication.
- Generate appointment notification events.

## Installation

```bash
npm install
```

Create a `.env` file using `.env.example` as a template and configure MongoDB.

## Run the Application

```bash
npm run start:dev
```

The API runs at:

http://localhost:3000

## Build

```bash
npm run build
```

## API Testing
Use the exported Postman collection to test the API endpoints.

## Database
MongoDB with Mongoose.

## Author
Aishwarya H T
