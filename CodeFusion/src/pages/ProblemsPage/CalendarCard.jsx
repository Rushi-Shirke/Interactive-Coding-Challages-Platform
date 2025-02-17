import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styles
import "./Calendar.css"; // Custom styles

const CalendarCard = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    alert(`Selected Date: ${newDate.toDateString()}`);
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateChange}
        value={date}
        locale="en-US"
        formatMonthYear={(locale, date) =>
          date.toLocaleString(locale, { month: "short", year: "numeric" })
        }
      />
    </div>
  );
};

export default CalendarCard;
