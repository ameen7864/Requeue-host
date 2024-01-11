import { useState } from "react";
import axios from "../../../config/instance";
import {
  ClosingStyle,
  InputSettings,
  OpeningStyle,
  SaveModl,
  StyledInputModal,
  UldaysStyle,
} from "../styled/common.styled";
import { FlexH } from "../styled/global.styled";

const Addopeningandclosing = ({ openedd }) => {
  const [item, setItem] = useState([]);
  const [schedule, setschedule] = useState("");
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("");
  const [Active, setActive] = useState(false);
  const daysList = [
    { name: "monday" },
    { name: "tuesday" },
    { name: "wednesday" },
    { name: "thursday" },
    { name: "friday" },
    { name: "saturday" },
    { name: "sunday" },
  ];

  
  const [selectedDays, setSelectedDays] = useState([]);

  const handleItemClick = (dayName) => {
    if (selectedDays.includes(dayName)) {
      setSelectedDays(selectedDays.filter((day) => day !== dayName));

    } else {
      setSelectedDays([...selectedDays, dayName]);
      setItem((prevItem) => ({
        ...prevItem,
        [dayName]: !prevItem[dayName],
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      restId: localStorage.getItem("bId"),
      name: schedule,
      openHour: open,
      closeHour: close,
      active: Active ? 1 : 0,
      Days: selectedDays,
    };
    axios
      .post("/restaurant/insertWorkingHourTime", data)
      .then((res) => {
        openedd(false);
        alert("added");
      })
      .catch((error) => {});
  };

  return (
    <div>
      {" "}
      <>
        <FlexH className="mt-5 mb-2 gap pl-5 pr-5 w-100 text-center relative">
          <div className="F-50">
            <label className={Active ? "O-off off switch" : "switch on O-on"}>
              <input
                type="checkbox"
                // defaultChecked={item?.active}
                onChange={(e) => setActive(e.target.checked)}
              />{" "}
              <div></div>{" "}
            </label>
          </div>

          <div className="w-100 p-2">
            <p className="mb-2">Shedule Name</p>
            <InputSettings
              className="w-100"
              onChange={(e) => setschedule(e.target.value)}
              placeholder="Give a Name to Your Shedule"
            />
          </div>
          <div className=" pl-3 pr-3 text-center">
            <OpeningStyle>
              <h2>Opening time</h2>

              <StyledInputModal
                name="Openingtime"
                type="time"
                placeholder="Opening Time"
                onChange={(e) => setOpen(e.target.value)}
              ></StyledInputModal>
            </OpeningStyle>
          </div>

          <div className=" pl-3 pr-3 text-center">
            <ClosingStyle>
              <h2>Closing time</h2>

              <StyledInputModal
                name="Closingtime"
                type="time"
                value={close}
                placeholder="Closing Time"
                onChange={(e) => setClose(e.target.value)}
              ></StyledInputModal>
            </ClosingStyle>
          </div>
        </FlexH>
        <div className="pl-5 pr-5 w-100 mb-4 fl">
          <UldaysStyle
            className="list-inline list-unstyled"
            style={{ textTransform: "capitalize" }}
          >
            {daysList?.map((day) => (
              <li
                className={item[day.name] ? "selected" : ""}
                onClick={() => handleItemClick(day.name)}
                key={day.name}
              >
                {day.name}
              </li>
            ))}
          </UldaysStyle>
        </div>
        <div className="w-100 text-center mb-2">
          <SaveModl onClick={handleSubmit}>Save</SaveModl>
        </div>
      </>
    </div>
  );
};

export default Addopeningandclosing;
