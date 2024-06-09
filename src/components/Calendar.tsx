import { useState } from "react";
import DatePicker from "react-datepicker";

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date) => setSelectedDate(date)}
      inline // Hiển thị inline
      calendarClassName="rounded-lg shadow-lg border border-gray-200" // CSS cho toàn bộ calendar
      dayClassName={(date) =>
        `p-2 ${
          date.getMonth() !== selectedDate.getMonth()
            ? "text-gray-400" // Ngày khác tháng
            : date.getDate() === selectedDate.getDate()
            ? "bg-blue-500 text-white rounded-full" // Ngày được chọn
            : "hover:bg-gray-100" // Hiệu ứng hover
        }`
      }
      weekDayClassName={() => "font-semibold text-gray-600"} // CSS cho thứ trong tuần
      monthClassName={() => "p-2"} // CSS cho tháng
      renderYearContent={() => "p-2"} // CSS cho năm
      popperClassName="hidden" // Ẩn popper mặc định
    />
  );
}

export default Calendar;
