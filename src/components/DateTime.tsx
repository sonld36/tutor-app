import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const timeInDay = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

export interface DateTimeProps {
  date: Date;
  timeChecked: string[];
  onDateChange: (date: Date) => void;
  onTimeChange: (time: string[]) => void;
}

function DateTime({
  date,
  timeChecked,
  onDateChange,
  onTimeChange,
}: DateTimeProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);

  useEffect(() => {
    setStartDate(date ? new Date(date) : new Date());
  }, [date]);

  return (
    <>
      <div className="relative bg-white rounded-lg shadow">
        {/* <!-- Modal header --> */}
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 ">
            Schedule an appointment
          </h3>
        </div>
        {/* <!-- Modal body --> */}
        <div className="p-4 pt-0">
          <div
            inline-datepicker
            datepicker-autoselect-today
            className="mx-auto sm:mx-0 flex justify-center my-5 [&>div>div]:shadow-none [&>div>div]:bg-gray-50 [&_div>button]:bg-gray-50"
          >
            <DatePicker
              selected={startDate}
              onChange={(date) => onDateChange(date as Date)}
              inline
            />
          </div>
          <label className="text-sm font-medium text-gray-900  mb-2 block">
            Pick your time
          </label>
          <ul id="timetable" className="grid w-full grid-cols-3 gap-2 mb-5">
            {timeInDay.map((time, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  id={time}
                  value=""
                  className="hidden peer"
                  name="timetable"
                  checked={timeChecked.includes(time)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const newTimeChecked = checked
                      ? [...timeChecked, time]
                      : timeChecked.filter((t) => t !== time);
                    onTimeChange(newTimeChecked);
                  }}
                />
                <label
                  htmlFor={time}
                  className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center dark:hover:text-white bg-white  border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900"
                >
                  {time}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default DateTime;
