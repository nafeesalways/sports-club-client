import { use, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import UseAxiosSecure from "../../hook/UseAxiosSecure";
import { FaTimes, FaCalendarAlt, FaClock, FaDollarSign, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const CourtBookingModal = ({ court, onClose }) => {
  const { user } = use(AuthContext);
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

  const availableSlots = Array.isArray(court?.slot) && court.slot.length > 0 
    ? court.slot 
    : defaultSlots;

  const toggleSlot = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot)
        ? prev.filter((s) => s !== slot)
        : [...prev, slot]
    );
  };

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
      toast.success("Booking request sent successfully!");
      onClose();
    },
    onError: () => {
      toast.error("Booking failed! Please try again.");
    },
  });

  return (
    <AnimatePresence>
      <Dialog
        open={true}
        onClose={onClose}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Container */}
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Panel
            as={motion.div}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 max-w-2xl w-full overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 px-6 py-5 border-b border-yellow-400/20">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-2xl font-black text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <FaCheckCircle className="w-5 h-5 text-yellow-400" />
                  </div>
                  Book Court
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-400 hover:text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Court Info */}
              <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-2">{court.name}</h3>
                <div className="flex items-center gap-2 text-gray-300">
                  <FaDollarSign className="w-4 h-4 text-green-400" />
                  <span className="text-sm">
                    <span className="text-gray-400">Price per session:</span>{" "}
                    <span className="text-green-400 font-bold">${court.price}</span>
                  </span>
                </div>
              </div>

              {/* Date Picker */}
              <div>
                <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                  <FaCalendarAlt className="w-4 h-4 text-yellow-400" />
                  Select Date
                </label>
                <div className="relative">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    minDate={new Date()}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    calendarClassName="dark-calendar"
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                  <FaClock className="w-4 h-4 text-yellow-400" />
                  Select Time Slots
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableSlots.map((slot, i) => {
                    const isSelected = selectedSlots.includes(slot);
                    return (
                      <motion.button
                        key={i}
                        onClick={() => toggleSlot(slot)}
                        className={`p-4 rounded-lg border-2 font-semibold transition-all duration-200 ${
                          isSelected
                            ? "bg-yellow-400/20 border-yellow-400 text-yellow-400"
                            : "bg-gray-900 border-gray-700 text-gray-300 hover:border-gray-600"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{slot}</span>
                          {isSelected && (
                            <FaCheckCircle className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  {selectedSlots.length === 0
                    ? "Please select at least one time slot"
                    : `${selectedSlots.length} slot${selectedSlots.length > 1 ? "s" : ""} selected`}
                </p>
              </div>

              {/* Total Price */}
              {selectedSlots.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/30 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 font-semibold">Total Price</span>
                    <span className="text-2xl font-black text-green-400">
                      ${totalPrice}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">
                    {selectedSlots.length} slot{selectedSlots.length > 1 ? "s" : ""} × ${court.price} per slot
                  </p>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-900/50 px-6 py-4 border-t border-gray-700 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none btn bg-gray-700 hover:bg-gray-600 text-white border-none font-bold px-6 py-3 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => bookingMutation.mutate()}
                disabled={selectedSlots.length === 0 || bookingMutation.isPending}
                className="flex-1 btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {bookingMutation.isPending ? "Processing..." : "Confirm Booking"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Custom DatePicker Styles */}
      <style jsx global>{`
        .react-datepicker {
          background-color: #1f2937 !important;
          border: 1px solid #374151 !important;
          border-radius: 12px !important;
        }

        .react-datepicker__header {
          background-color: #111827 !important;
          border-bottom: 1px solid #374151 !important;
          border-radius: 12px 12px 0 0 !important;
        }

        .react-datepicker__current-month,
        .react-datepicker__day-name {
          color: #f3f4f6 !important;
        }

        .react-datepicker__day {
          color: #d1d5db !important;
        }

        .react-datepicker__day:hover {
          background-color: #374151 !important;
          border-radius: 8px !important;
        }

        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
          background-color: #facc15 !important;
          color: #111827 !important;
          border-radius: 8px !important;
        }

        .react-datepicker__day--disabled {
          color: #6b7280 !important;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default CourtBookingModal;
