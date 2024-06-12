import { useState } from "react";
import DatePicker from "react-datepicker";

function Calendar() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Schedule an appointment</h2>

      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        // excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
        selectsRange
        inline
      />
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-gray-700 text-center py-2 rounded">9:00 AM</div>
        <div className="bg-gray-700 text-center py-2 rounded">10:00 AM</div>
        <div className="bg-gray-700 text-center py-2 rounded">11:00 AM</div>
        <div className="bg-gray-700 text-center py-2 rounded">1:00 PM</div>
        <div className="bg-gray-700 text-center py-2 rounded">2:00 PM</div>
        <div className="bg-gray-700 text-center py-2 rounded">3:00 PM</div>
      </div>

      <div className="flex justify-end mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Save
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Discard
        </button>
      </div>
    </div>
  );
}

export default Calendar;
