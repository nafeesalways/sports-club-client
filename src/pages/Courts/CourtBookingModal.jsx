import { use, useState } from "react";
import { Dialog } from "@headlessui/react"; // or use any modal lib
import { useMutation } from "@tanstack/react-query";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import UseAxiosSecure from "../../hook/UseAxiosSecure";

const CourtBookingModal = ({ court, onClose }) => {
    const {user} = use(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const totalPrice = selectedSlots.length * court.price;
  const defaultSlots = [
    "6:00 AM - 8:00 AM",
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM",
  ];

  const bookingMutation = useMutation({
    mutationFn: async () => {
      const booking = {
        courtId: court._id,
        courtName: court.name,
        userEmail: user?.email,
        slots: selectedSlots,
        date: selectedDate,
        price: totalPrice,
        status: "pending",
      };
      const res = await axiosSecure.post("/bookings", booking);
      return res.data;
    },
    onSuccess: () => {
      toast("Booking request sent!");
      onClose();
    },
    onError: () => {
      toast.error("Booking failed!");
    },
  });

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Panel className="bg-white p-6 rounded shadow max-w-md w-full">
          <Dialog.Title className="text-xl font-bold mb-4">
            Book Court
          </Dialog.Title>

          <div className="space-y-2">
            <p>
              <h2>Name:</h2> <span className="text-yellow-600">{court.name}</span>
            </p>

            <p>
              <strong>Price per session:</strong> ${court.price}
            </p>

            <div>
              <label>Select Slots:</label>
              <select
                multiple
                className="w-full border rounded mt-1"
                value={selectedSlots}
                onChange={(e) =>
                  setSelectedSlots(
                    Array.from(e.target.selectedOptions, (o) => o.value)
                  )
                }
              >
                {(Array.isArray(court?.slot) && court.slot.length > 0 ? court.slot : defaultSlots).map(
                  (slot, i) => (
                    <option key={i} value={slot}>
                      {slot}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label>Date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full border rounded p-2 mt-1"
              />
            </div>

            <p className="mt-2">
              <strong>Total Price:</strong> ${totalPrice}
            </p>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
              Cancel
            </button>
            <button
              onClick={() => bookingMutation.mutate()}
              className="px-4 py-2 bg-yellow-600 btn rounded "
              disabled={selectedSlots.length === 0}
            >
              Confirm Booking
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CourtBookingModal;
