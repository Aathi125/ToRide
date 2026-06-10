package com.ridebooking.backend.controller;

import com.ridebooking.backend.dto.ApiResponse;
import com.ridebooking.backend.dto.BookingRequest;
import com.ridebooking.backend.model.Booking;
import com.ridebooking.backend.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // GET /api/bookings - Get all bookings
    @GetMapping
    public ResponseEntity<ApiResponse<List<Booking>>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(ApiResponse.success("Bookings retrieved successfully", bookings));
    }

    // GET /api/bookings/{id} - Get booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Booking>> getBookingById(@PathVariable int id) {
        return bookingService.getBookingById(id)
                .map(booking -> ResponseEntity.ok(ApiResponse.success("Booking found", booking)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Booking not found with id: " + id)));
    }

    // POST /api/bookings - Create a new booking (auto-assigns driver)
    @PostMapping
    public ResponseEntity<ApiResponse<Booking>> createBooking(
            @Valid @RequestBody BookingRequest request) {
        try {
            Booking booking = bookingService.createBooking(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Ride booked successfully! Driver has been assigned.", booking));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    // PATCH /api/bookings/{id}/status - Update booking status
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Booking>> updateBookingStatus(
            @PathVariable int id,
            @RequestBody Map<String, String> body) {
        try {
            String status = body.get("status");
            Booking updated = bookingService.updateBookingStatus(id, status);
            return ResponseEntity.ok(ApiResponse.success("Booking status updated", updated));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    // GET /api/bookings/driver/{driverId} - Get bookings by driver
    @GetMapping("/driver/{driverId}")
    public ResponseEntity<ApiResponse<List<Booking>>> getBookingsByDriver(@PathVariable int driverId) {
        List<Booking> bookings = bookingService.getBookingsByDriver(driverId);
        return ResponseEntity.ok(ApiResponse.success("Driver bookings retrieved", bookings));
    }
}
