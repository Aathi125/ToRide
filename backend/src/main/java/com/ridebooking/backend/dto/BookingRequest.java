package com.ridebooking.backend.dto;

import jakarta.validation.constraints.NotBlank;


public class BookingRequest {

    @NotBlank(message = "Passenger name is required")
    private String passengerName;

    @NotBlank(message = "Passenger phone is required")
    private String passengerPhone;

    @NotBlank(message = "Pickup location is required")
    private String pickupLocation;

    @NotBlank(message = "Dropoff location is required")
    private String dropoffLocation;

    public BookingRequest() {}

    public String getPassengerName() { return passengerName; }
    public void setPassengerName(String passengerName) { this.passengerName = passengerName; }

    public String getPassengerPhone() { return passengerPhone; }
    public void setPassengerPhone(String passengerPhone) { this.passengerPhone = passengerPhone; }

    public String getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(String pickupLocation) { this.pickupLocation = pickupLocation; }

    public String getDropoffLocation() { return dropoffLocation; }
    public void setDropoffLocation(String dropoffLocation) { this.dropoffLocation = dropoffLocation; }
}
