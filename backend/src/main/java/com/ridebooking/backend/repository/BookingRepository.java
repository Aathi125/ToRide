package com.ridebooking.backend.repository;

import com.ridebooking.backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    List<Booking> findByStatus(String status);

    List<Booking> findByDriverId(int driverId);

    List<Booking> findByPassengerPhone(String passengerPhone);
}
