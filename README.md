# FastFood

<p align="center">
  <img src="https://img.shields.io/badge/Status-Completed-brightgreen" alt="Status">
  <img src="https://img.shields.io/badge/Java-11-orange" alt="Java 11">
  <img src="https://img.shields.io/badge/Node.js-14+-green" alt="Node.js">
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="License">
</p>

This project implements a complete self-service fast food system, including:

1. Self-service terminal for customers (HTML, CSS, JS)
2. Node.js API for order processing
3. Java Swing application for staff to manage orders

## Project Structure

```
/
├── index.html          # Self-service terminal
├── css/
│   └── style.css       # Terminal styles
├── js/
│   ├── app.js          # Main terminal logic
│   └── data.js         # Product data
├── api/
│   ├── package.json    # Server dependencies
│   └── server.js       # Node.js server and API
└── java-app/           # Staff application
    ├── pom.xml         # Maven configuration
    └── src/            # Java source code
        └── main/java/com/fastfood/app/
            ├── Main.java                  # Application entry point
            ├── MainFrame.java             # Main application window
            ├── model/                     # Data models
            ├── service/                   # Services
            ├── ui/                        # UI components
            └── util/                      # Utilities
```

## How to Run

### 1. Self-Service Terminal (Frontend)

Access the terminal through a web server:
- URL: http://localhost/index.html

### 2. Node.js API (Backend)

```bash
cd api
npm install
npm start
```

The server will be available at: http://localhost:3000

### 3. Java Application (Management)

```bash
cd java-app
mvn clean package
java -jar target/java-app-1.0-SNAPSHOT-jar-with-dependencies.jar
```

## Features

### Self-Service Terminal
- Modern and intuitive interface
- Complete order customization
- Fluid animations
- Payment methods (Credit Card, MB WAY, Pay at Counter)

### Node.js API
- Order registration in MongoDB
- Real-time notifications via Socket.io
- RESTful endpoints for order management

### Java Swing Application
- Modern interface for staff
- Real-time order visualization
- Sound notifications for new orders
- Complete order lifecycle management

## System Requirements

- Node.js 14+
- MongoDB
- Java 11+
- Maven
- Web server (Apache, Nginx, etc.)

## Video

https://github.com/user-attachments/assets/9d69f913-814d-475a-a9d1-52d764eeee9d



## License

This project is licensed under the MIT License.

## Author

- Alexandre Duarte
