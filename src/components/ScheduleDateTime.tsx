import React, { useState } from "react";
import PropTypes from "prop-types";
import Calendar from "./Calendar";

function ScheduleDateTime(
  props: PropTypes.InferProps<typeof ScheduleDateTime.propTypes>
) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Schedule an appointment
          </h2>

          {/* Calendar */}
          <div className="mb-4">
            {/* Thêm component calendar của bạn ở đây */}
            <Calendar />
          </div>

          {/* Time selection */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              "10:00 AM",
              "10:30 AM",
              "11:00 AM",
              "11:30 AM",
              "12:00 PM",
              "12:30 PM",
              "01:00 PM",
              "01:30 PM",
              "02:00 PM",
              "02:30 PM",
              "03:00 PM",
              "03:30 PM",
            ].map((time) => (
              <button
                key={time}
                className={`px-4 py-2 rounded ${
                  selectedTime === time
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTimeChange(time)}
              >
                {time}
              </button>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end">
            <button className="px-4 py-2 mr-2 rounded bg-gray-200">
              Discard
            </button>
            <button className="px-4 py-2 rounded bg-blue-500 text-white">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

ScheduleDateTime.propTypes = {};

export default ScheduleDateTime;
