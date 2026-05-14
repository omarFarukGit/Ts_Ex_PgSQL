# CRUD API with TypeScript, PostgreSQL & Express

A simple REST API project built using **TypeScript**, **Express.js**, and **PostgreSQL**.  
This project demonstrates complete CRUD (Create, Read, Update, Delete) operations.

---

# 🚀 Features

- Create Data
- Read All Data
- Read Single Data
- Update Data
- Delete Data
- PostgreSQL Database Integration
- TypeScript Support
- REST API Architecture
- Environment Variable Support

---

# 🛠️ Technologies Used

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- pg
- dotenv
- ts-node-dev

---

# 📁 Project Structure

```bash
src/
│
├── config/
│   └── dotenv.config.ts
│
├── server.ts
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-link>
```

## Move to Project Folder

```bash
cd project-name
```

## Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/testdb
```

---

# ▶️ Run Project

## Development Mode

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

## Start Production Server

```bash
npm start
```

---

# 📌 API Endpoints

## Create User

```http
POST /users
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

## Get All Users

```http
GET api/users
```

---

## Get Single User

```http
GET api/users/:id
```

---

## Update User

```http
PUT api/users/:id
```

### Request Body

```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

---

## Delete User

```http
DELETE api/users/:id
```

---

# 🗄️ PostgreSQL Table Query

```sql
      CREATE TABLE IF NOT EXISTS users2(
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(20) NOT NULL,
      age INT
      )
```

---

# 📦 Package Scripts

```json
"scripts": {
  "dev": "tsx watch ./src/index.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

---

# 🧪 Example Response

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "password:"12115",
    "age":21
  }
}
```

---

# 📚 Learning Goals

- REST API Development
- PostgreSQL Integration
- Express.js Basics
- TypeScript Practice
- CRUD Operations

---

# 👨‍💻 Author

Made with ❤️ using TypeScript, PostgreSQL & Express.js
