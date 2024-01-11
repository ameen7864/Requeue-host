import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
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
import moment from "moment";

export default function OpeningAndClosingDays() {
  // Set the time zone to Kuwait

  const daysList = [
    { name: "Monday" },
    { name: "Tuesday" },
    { name: "Wednesday" },
    { name: "Thursday" },
    { name: "Friday" },
    { name: "Saturday" },
    { name: "Sunday" },
  ];

  const [shedulesss, setShedulesss] = useState([]);

  const fetchdata = () => {
    axios
      .get(
        `/restaurant/getWorkingHourTime/?restId=${localStorage.getItem("bId")}`
      )
      .then((response) => {
        setShedulesss(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/restaurant/deleteWorkingHourTime?id=${id}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("AccessToken")),
        },
      });

      fetchdata();
      alert("Working Hours Deleted successfully");
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  const onInputChange = (val, name, index) => {
    if (name == "openHour" || name == "closeHour")
      val = "1970-01-01T" + val + ":00.000Z";

    let va = shedulesss;
    va[index][name] = val;
    setShedulesss([...va]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .patch(`/restaurant/updateWorkingHourTime`, { data: shedulesss })

      .then((res) => {
        fetchdata();
        alert("done");
      });
  };

  function convertToKuwaitTimeZone(dateTimeString) {
    const kuwaitTimeZone = "Asia/Kuwait";
    const date = new Date(dateTimeString);
    const kuwaitTime = new Intl.DateTimeFormat("en-US", {
      timeZone: kuwaitTimeZone,
      timeStyle: "short",
    }).format(date);

    return kuwaitTime;
  }

  return (
    <>
      {shedulesss?.map((item, index) => {
        return (
          <>
            <FlexH className="mt-5 mb-2 gap pl-5 pr-5 w-100 text-center relative">
              <div
                className="absolute_right"
                style={{
                  top: "10%",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "25px",
                }}
              >
                <i
                  onClick={() => {
                    if (window.confirm("Are you sure to delete this record?")) {
                      handleDelete(item.id);
                    }
                  }}
                >
                  <MdDelete style={{ color: "#ef5e82" }} />
                </i>
              </div>
              <div className="F-50">
                <label
                  className={
                    item?.active ? "O-off off switch" : "switch on O-on"
                  }
                >
                  <input
                    type="checkbox"
                    defaultChecked={item?.active}
                    name="active"
                    onChange={(e) =>
                      onInputChange(e.target.checked, e.target.name, index)
                    }
                  />{" "}
                  <div></div>{" "}
                </label>
              </div>

              <div className="w-100 p-2">
                <p className="mb-2">Shedule Name</p>
                <InputSettings
                  className="w-100"
                  name="name"
                  value={item?.name}
                  onChange={(e) =>
                    onInputChange(e.target.value, e.target.name, index)
                  }
                  placeholder="Give a Name to Your Shedule"
                />
              </div>

              <div className="pl-3 pr-3 text-center">
                <OpeningStyle>
                  <h2>Opening time</h2>

                  <StyledInputModal
                    name="openHour"
                    type="time"
                    onChange={(e) =>
                      onInputChange(e.target.value, e.target.name, index)
                    }
                    value={item?.openHour.split("T")[1].split('.')[0]}
                    // value={new Date(item?.openHour).toLocaleTimeString()}
                    placeholder="Opening Time"
                  ></StyledInputModal>
                </OpeningStyle>
              </div>
              {console.log(item?.openHour?.split("T")[1]?.split('.')[0])}

              <div className=" pl-3 pr-3 text-center">
                <ClosingStyle>
                  <h2>Closing time</h2>

                  <StyledInputModal
                    name="closeHour"
                    type="time"
                    onChange={(e) =>
                      onInputChange(e.target.value, e.target.name, index)
                    }
                    value={item?.closeHour.split("T")[1].split('.')[0]}
                    placeholder="Closing Time"
                  ></StyledInputModal>
                </ClosingStyle>
              </div>
            </FlexH>
            <div className="pl-5 pr-5 w-100 mb-4 fl">
              <UldaysStyle className="list-inline list-unstyled">
                {daysList?.map((l) => (
                  <li
                    className={item[l.name.toLowerCase()] ? "selected" : ""}
                    key={l.name}
                    onClick={(e) =>
                      onInputChange(
                        !item[l.name.toLowerCase()],
                        l.name.toLowerCase(),
                        index
                      )
                    }
                  >
                    {l.name}
                  </li>
                ))}
              </UldaysStyle>
            </div>
          </>
        );
      })}
      <div className="w-100 text-center mb-2" onClick={handleUpdate}>
        <SaveModl>Save</SaveModl>
      </div>
    </>
  );
}
