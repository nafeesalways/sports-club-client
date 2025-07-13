import React, { useState } from "react";

import { toast } from "react-toastify";

const BookingModal = ({ court, setSelectedCourt }) => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const handleCheckboxChange = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleBooking = () => {
    if (!selectedDate || selectedSlots.length === 0) {
      toast.error("Please select date and at least one slot.");
      return;
    }

    const booking = {
      courtId: court.id,
      type: court.type,
      image: court.image,
      date: selectedDate,
      slots: selectedSlots,
      price: selectedSlots.length * court.price,
      status: "pending",
      requestedAt: new Date(),
    };

    // Send to server
    console.log("Booking request:", booking);
    toast.success("Booking request sent for approval.");
    setSelectedCourt(null);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-[95%] md:w-[600px] rounded p-6 shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={() => setSelectedCourt(null)}
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-yellow-500 mb-4">Book {court.type}</h2>

        <img src={court.image} className="h-40 w-full object-cover rounded mb-4" alt={court.type} />

        <div className="mb-2"><strong>Price per session:</strong> ${court.price}</div>

        <div className="mb-3">
          <label className="label">Choose Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Select Slots</label>
          <div className="grid grid-cols-2 gap-2">
            {court.slots.map((slot, i) => (
              <label key={i} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedSlots.includes(slot)}
                  onChange={() => handleCheckboxChange(slot)}
                />
                <span>{slot}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4 font-medium">
          Total Price: ${selectedSlots.length * court.price}
        </div>

        <button
          onClick={handleBooking}
          className="btn bg-yellow-400 mt-4 w-full"
        >
          Submit Booking Request
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
