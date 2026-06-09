package com.ridebooking.backend.service;

import com.ridebooking.backend.model.Driver;
import com.ridebooking.backend.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public List<Driver> getAvailableDrivers() {
        return driverRepository.findByAvailabilityStatus("AVAILABLE");
    }

    public Optional<Driver> getDriverById(int id) {
        return driverRepository.findById(id);
    }

    public Driver addDriver(Driver driver) {
        if (driverRepository.existsByPhone(driver.getPhone())) {
            throw new RuntimeException("A driver with this phone number already exists.");
        }
        if (driverRepository.existsByVehiclePlate(driver.getVehiclePlate())) {
            throw new RuntimeException("A driver with this vehicle plate already exists.");
        }
        return driverRepository.save(driver);
    }

    public Driver updateAvailabilityStatus(int id, String status) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found with id: " + id));

        List<String> validStatuses = List.of("AVAILABLE", "BUSY", "OFFLINE");
        if (!validStatuses.contains(status)) {
            throw new RuntimeException("Invalid status. Must be one of: AVAILABLE, BUSY, OFFLINE");
        }

        driver.setAvailabilityStatus(status);
        return driverRepository.save(driver);
    }

    public Driver updateDriver(int id, Driver updatedDriver) {
        Driver existing = driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found with id: " + id));

        existing.setName(updatedDriver.getName());
        existing.setPhone(updatedDriver.getPhone());
        existing.setVehicleModel(updatedDriver.getVehicleModel());
        existing.setVehiclePlate(updatedDriver.getVehiclePlate());

        return driverRepository.save(existing);
    }

    public void deleteDriver(int id) {
        if (!driverRepository.existsById(id)) {
            throw new RuntimeException("Driver not found with id: " + id);
        }
        driverRepository.deleteById(id);
    }
}
