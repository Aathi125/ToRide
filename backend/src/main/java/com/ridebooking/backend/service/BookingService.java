package com.ridebooking.backend.service;

import com.ridebooking.backend.dto.BookingRequest;
import com.ridebooking.backend.model.Booking;
import com.ridebooking.backend.model.Driver;
import com.ridebooking.backend.repository.BookingRepository;
import com.ridebooking.backend.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private DriverRepository driverRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(int id) {
        return bookingRepository.findById(id);
    }

    public List<Booking> getBookingsByStatus(String status) {
        return bookingRepository.findByStatus(status);
    }

    @Transactional
    public Booking createBooking(BookingRequest request) {
        // Find an available driver automatically
        List<Driver> availableDrivers = driverRepository.findByAvailabilityStatus("AVAILABLE");

        if (availableDrivers.isEmpty()) {
            throw new RuntimeException("No available drivers at the moment. Please try again later.");
        }

        // Assign the first available driver
        Driver assignedDriver = availableDrivers.get(0);

        // Create the booking
        Booking booking = new Booking(
                request.getPassengerName(),
                request.getPassengerPhone(),
                request.getPickupLocation(),
                request.getDropoffLocation()
        );
        booking.setDriver(assignedDriver);
        booking.setStatus("CONFIRMED");

        // Mark driver as BUSY
        assignedDriver.setAvailabilityStatus("BUSY");
        driverRepository.save(assignedDriver);

        return bookingRepository.save(booking);
    }

    @Transactional
    public Booking updateBookingStatus(int id, String status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));

        List<String> validStatuses = List.of("PENDING", "CONFIRMED", "COMPLETED", "CANCELLED");
        if (!validStatuses.contains(status)) {
            throw new RuntimeException("Invalid status.");
        }

        String previousStatus = booking.getStatus();
        booking.setStatus(status);

        // Free up driver when ride is completed or cancelled
        if ((status.equals("COMPLETED") || status.equals("CANCELLED"))
                && booking.getDriver() != null) {
            Driver driver = booking.getDriver();
            driver.setAvailabilityStatus("AVAILABLE");
            driverRepository.save(driver);
        }

        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByDriver(int driverId) {
        return bookingRepository.findByDriverId(driverId);
    }
}
