package com.ridebooking.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "drivers")
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "phone", nullable = false, unique = true)
    private String phone;

    @Column(name = "vehicle_model", nullable = false)
    private String vehicleModel;

    @Column(name = "vehicle_plate", nullable = false, unique = true)
    private String vehiclePlate;

    @Column(name = "availability_status", nullable = false)
    private String availabilityStatus; // AVAILABLE, BUSY, OFFLINE

    @Column(name = "rating")
    private Double rating;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Driver() {}

    public Driver(String name, String phone, String vehicleModel, String vehiclePlate) {
        this.name = name;
        this.phone = phone;
        this.vehicleModel = vehicleModel;
        this.vehiclePlate = vehiclePlate;
        this.availabilityStatus = "AVAILABLE";
        this.rating = 5.0;
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        if (this.availabilityStatus == null) {
            this.availabilityStatus = "AVAILABLE";
        }
        if (this.rating == null) {
            this.rating = 5.0;
        }
    }

    // Getters & Setters
    public int getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getVehicleModel() { return vehicleModel; }
    public void setVehicleModel(String vehicleModel) { this.vehicleModel = vehicleModel; }

    public String getVehiclePlate() { return vehiclePlate; }
    public void setVehiclePlate(String vehiclePlate) { this.vehiclePlate = vehiclePlate; }

    public String getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(String availabilityStatus) { this.availabilityStatus = availabilityStatus; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
