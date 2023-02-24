import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { endDateState, startDateState } from "../../recoil/calendar";

const Calendar = ({ handleDate }: any) => {
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const [, setEndDateState] = useRecoilState(endDateState);
  const [, setStartDateState] = useRecoilState(startDateState);

  useEffect(() => {
    setStartDateState(
      startDate
        .toLocaleDateString()
        .slice(0, -1)
        .split(". ")
        .map((v: any) => v.padStart(2, "0"))
        .join("-")
    );
    setEndDateState(
      endDate
        .toLocaleDateString()
        .slice(0, -1)
        .split(". ")
        .map((v: any) => v.padStart(2, "0"))
        .join("-")
    );
  }, [startDate, endDate]);
  return (
    <CalendarSection>
      <CalendarBox>
        <DatePickerStyle
          dateFormat="yyyy년 MM월 dd일"
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </CalendarBox>
      <CalendarBox>
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
      <button onClick={handleDate}>확인</button>
    </CalendarSection>
  );
};

export default Calendar;

const CalendarSection = styled.div`
  display: flex;
  height: 50px;
  padding-left: 20px;
  button {
    margin-top: 1.6rem;
  }
`;

const CalendarBox = styled.div`
  display: flex;
  margin-right: 10px;
`;

const DatePickerStyle = styled(DatePicker)`
  margin-top: 1.5rem;
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid gray;
  text-align: center;
`;
