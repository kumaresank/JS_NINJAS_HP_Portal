import React from 'react';
import "./Booking.css"

function Booking() {
  return <>
    <div class="container">
      <h1>Book an Appointment</h1>
      <form>
        <div class="booking-grid">
          <div>
            <div class="form-group">
              <label for="doctor">Select Doctor</label>
              <select id="doctor">
                <option value="">Choose a doctor</option>
                <option value="dr-smith">Dr. Smith - General Practitioner</option>
                <option value="dr-johnson">Dr. Johnson - Cardiologist</option>
                <option value="dr-williams">Dr. Williams - Pediatrician</option>
              </select>
            </div>
            <div class="form-group">
              <label for="date">Select Date</label>
              <input type="date" id="date" />
            </div>
          </div>
          <div>
            <div class="form-group">
              <label>Available Time Slots</label>
              <div class="time-slots">
                <div class="time-slot">9:00 AM</div>
                <div class="time-slot">10:00 AM</div>
                <div class="time-slot">11:00 AM</div>
                <div class="time-slot">1:00 PM</div>
                <div class="time-slot">2:00 PM</div>
                <div class="time-slot">3:00 PM</div>
              </div>
            </div>
            <div class="form-group">
              <label for="reason">Reason for Visit</label>
              <textarea id="reason" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label for="notes">Additional Notes (Optional)</label>
              <textarea id="notes" rows="2"></textarea>
            </div>
            <button type="submit" class="btn">Confirm Booking</button>
          </div>
        </div>
      </form>
    </div>
  </>
}

export default Booking;
