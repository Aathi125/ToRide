package com.ridebooking.backend.controller;

import com.ridebooking.backend.dto.ApiResponse;
import com.ridebooking.backend.model.Driver;
import com.ridebooking.backend.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.Map;

@RestController
@RequestMapping("/api/drivers")
@CrossOrigin(origins = "http://localhost:3000")
public class DriverController {

    @Autowired
    private DriverService driverService;

    // GET /api/drivers - Get all drivers
    @GetMapping
    public ResponseEntity<ApiResponse<List<Driver>>> getAllDrivers() {
        List<Driver> drivers = driverService.getAllDrivers();
        return ResponseEntity.ok(ApiResponse.success("Drivers retrieved successfully", drivers));
    }

    // GET /api/drivers/available - Get only available drivers
    @GetMapping("/available")
    public ResponseEntity<ApiResponse<List<Driver>>> getAvailableDrivers() {
        List<Driver> drivers = driverService.getAvailableDrivers();
        return ResponseEntity.ok(ApiResponse.success("Available drivers retrieved", drivers));
    }

    // GET /api/drivers/{id} - Get driver by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Driver>> getDriverById(@PathVariable int id) {
        return driverService.getDriverById(id)
                .map(driver -> ResponseEntity.ok(ApiResponse.success("Driver found", driver)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Driver not found with id: " + id)));
    }

    // POST /api/drivers - Add a new driver
    @PostMapping
    public ResponseEntity<ApiResponse<Driver>> addDriver(@RequestBody Driver driver) {
        try {
            Driver saved = driverService.addDriver(driver);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Driver added successfully", saved));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    // PATCH /api/drivers/{id}/status - Update driver availability
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Driver>> updateStatus(
            @PathVariable int id,
            @RequestBody Map<String, String> body) {
        try {
            String status = body.get("availabilityStatus");
            Driver updated = driverService.updateAvailabilityStatus(id, status);
            return ResponseEntity.ok(ApiResponse.success("Driver status updated", updated));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    // PUT /api/drivers/{id} - Update driver details
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Driver>> updateDriver(
            @PathVariable int id,
            @RequestBody Driver driver) {
        try {
            Driver updated = driverService.updateDriver(id, driver);
            return ResponseEntity.ok(ApiResponse.success("Driver updated successfully", updated));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    // DELETE /api/drivers/{id} - Delete a driver
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDriver(@PathVariable int id) {
        try {
            driverService.deleteDriver(id);
            return ResponseEntity.ok(ApiResponse.success("Driver deleted successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}
