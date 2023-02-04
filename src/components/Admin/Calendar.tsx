import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const Calendar = () => {
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());

  return (
    <CalendarSection>
      <CalendarBox>
        <h4>시작일 : </h4>
        <DatePickerStyle
          dateFormat="yyyy년 MM월 dd일"
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
        />
      </CalendarBox>
      <CalendarBox>
        <h4>종료일 : </h4>
        <DatePickerStyle
          dateFormat="yyyy년 MM월 dd일"
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </CalendarBox>
    </CalendarSection>
  );
};

export default Calendar;

const CalendarSection = styled.div`
  display: flex;
  height: 100px;
  padding-left: 20px;
`;

const CalendarBox = styled.div`
  display: flex;
  h4 {
    width: 100px;
  }
`;

const DatePickerStyle = styled(DatePicker)`
  margin-top: 1.5rem;
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid gray;
  text-align: center;
`;
