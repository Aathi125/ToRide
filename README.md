# RideSwift — Ride Booking Application
> Full Stack Internship Assessment — NextGen Innovations

A clean, functional ride booking system built with **Spring Boot** (backend) and **React** (frontend).

---

## 📁 Project Structure

```
ride-booking/
├── backend/                    # Spring Boot REST API
│   ├── src/main/java/com/ridebooking/backend/
│   │   ├── model/
│   │   │   ├── Driver.java         # Driver entity
│   │   │   └── Booking.java        # Booking entity
│   │   ├── repository/
│   │   │   ├── DriverRepository.java
│   │   │   └── BookingRepository.java
│   │   ├── service/
│   │   │   ├── DriverService.java
│   │   │   └── BookingService.java
│   │   ├── controller/
│   │   │   ├── DriverController.java
│   │   │   └── BookingController.java
│   │   ├── dto/
│   │   │   ├── BookingRequest.java  # Request body DTO
│   │   │   └── ApiResponse.java    # Consistent response wrapper
│   │   └── RideBookingApplication.java
│   └── src/main/resources/
│       └── application.properties
│
└── frontend/                   # React Application
    └── src/
        ├── services/
        │   └── api.js              # Axios API calls
        ├── components/
        │   ├── DriverCard.js       # Driver display card
        │   └── BookingConfirmation.js  # Confirmation modal
        ├── pages/
        │   ├── DriversPage.js      # Driver management page
        │   └── BookingPage.js      # Booking creation & history
        ├── App.js                  # Root layout + routing
        └── index.js
```

---

## ⚙️ Backend Setup (Spring Boot)

### Prerequisites
- Java 17+
- Maven
- MySQL

### Database Setup
```sql
CREATE DATABASE ride_booking_db;
```

### Configure `application.properties`
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ride_booking_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
```

### Run
```bash
cd backend
mvn spring-boot:run
```

API runs at: `http://localhost:8080`

---

## 🖥️ Frontend Setup (React)

### Prerequisites
- Node.js 16+
- npm

### Install & Run
```bash
cd frontend
npm install
npm start
```

App runs at: `http://localhost:3000`

---

## 🔌 API Endpoints

### Drivers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/drivers` | Get all drivers |
| GET | `/api/drivers/available` | Get available drivers only |
| GET | `/api/drivers/{id}` | Get driver by ID |
| POST | `/api/drivers` | Add a new driver |
| PUT | `/api/drivers/{id}` | Update driver details |
| PATCH | `/api/drivers/{id}/status` | Update availability status |
| DELETE | `/api/drivers/{id}` | Delete a driver |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings` | Get all bookings |
| GET | `/api/bookings/{id}` | Get booking by ID |
| POST | `/api/bookings` | Create booking (auto-assigns driver) |
| PATCH | `/api/bookings/{id}/status` | Update booking status |
| GET | `/api/bookings/driver/{driverId}` | Bookings by driver |

---

## 📋 Sample API Requests

### Add a Driver
```json
POST /api/drivers
{
  "name": "Ashan Perera",
  "phone": "0771234567",
  "vehicleModel": "Toyota Prius",
  "vehiclePlate": "CAB-1234"
}
```

### Create a Booking
```json
POST /api/bookings
{
  "passengerName": "Kasun Silva",
  "passengerPhone": "0779876543",
  "pickupLocation": "Colombo Fort Station",
  "dropoffLocation": "Bandaranaike Airport"
}
```

### Update Driver Status
```json
PATCH /api/drivers/1/status
{
  "availabilityStatus": "AVAILABLE"
}
```

---

## 🧠 My Approach

1. **Data Model** — Two entities: `Driver` (name, phone, vehicle, status) and `Booking` (passenger details, locations, assigned driver). Booking creation automatically assigns an available driver and marks them `BUSY`.

2. **Service Layer** — Business logic is cleanly separated. `BookingService.createBooking()` runs in a `@Transactional` context to atomically create the booking and update driver status.

3. **Consistent API Responses** — A generic `ApiResponse<T>` wrapper gives every endpoint a uniform `{success, message, data}` shape, making frontend integration predictable.

4. **Frontend** — React with plain inline styles for simplicity (no extra CSS library needed). Two pages: Drivers management and Booking. A confirmation modal appears after a successful booking showing the assigned driver.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Spring Boot 3.2, Spring Data JPA, Spring Validation |
| Database | MySQL |
| Frontend | React 18, Axios |
| Build | Maven (backend), Create React App (frontend) |
