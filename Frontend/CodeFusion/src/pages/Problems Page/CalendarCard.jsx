import  { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default CSS for styling
import './Calendar.css'; // Custom styles (optional)

const CalendarCard = () => {
  const [date, setDate] = useState(new Date()); // Default date set to today

  const handleDateChange = (newDate) => {
    setDate(newDate);
    alert(`Selected Date: ${newDate.toDateString()}`);
  };

  return (
    <div className="calendar-container">
      
      <Calendar
        onChange={handleDateChange}
        value={date} // The selected date
        className="react-calendar" // Optional for custom styling
      />
      
    </div>
  );
};

export default CalendarCard;
