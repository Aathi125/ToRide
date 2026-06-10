package com.ridebooking.backend.repository;

import com.ridebooking.backend.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Integer> {

    List<Driver> findByAvailabilityStatus(String availabilityStatus);

    boolean existsByPhone(String phone);

    boolean existsByVehiclePlate(String vehiclePlate);
}
