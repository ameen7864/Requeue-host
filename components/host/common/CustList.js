// import { useRef } from "react";
import {
  CustBoxStyle,
  ParentCustBoxStyle,
  ParentCustButtonsStyle,
  SeatButtonStyle,
  HoldButtonStyle,
  CancelButtonStyle,
  RqThumbStyle,
  SeqNumStyle,
  Edit,
  ChairsStyle,
  IamgeAvatarStyle,
  TextDetailSmallStyle,
  StatusInfoStyle,
  HeadInfoStyle,
  TileInfoStyle,
  ExpandDtl,
  ExpandCustHold,
  ParentExpandDtl,
  AnotherParentExpandDtl,
  AnotherExpandDtl,
  ParentForBoth,
  HoldPera,
  PopButtonGreen,
  SaveModl,
  ChairSeatButtonStyle,
  Chairsbutton,
} from "../styled/common.styled";
import haversine from "haversine-distance";
import { ImCross } from "react-icons/im";
import { useContext, useEffect, useState } from "react";
import { FlexHspace } from "../styled/global.styled";
import { IoMdTime, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiPhoneCall, FiEdit } from "react-icons/fi";
import { MdOutlineNotificationsActive, MdSpeakerNotes } from "react-icons/md";
import { FaRegPaperPlane } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { AiOutlinePauseCircle, AiOutlineCloseCircle } from "react-icons/ai";
import {
  BsCaretDownFill,
  BsCaretUpFill,
  BsFillPeopleFill,
} from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "react-modal";
import axios from "../../../config/instance";
import Axios from "axios";
import { GlobalContext } from "../../../contextApi/Provider";
import Seats from "./modal/Seats";
import Chairs from "./modal/Chairs";
import { getCookie } from "cookies-next";
import { cancelClient } from "../../../helpers/apiCalls/apiPost";
import { io } from "socket.io-client";
import moment from "moment";

const CustList = (props) => {
  const router = useRouter();
  const { authToken, api, SendMessage } = useContext(GlobalContext);
  const [edit, setEdit] = useState(false);
  const [expand, setExpand] = useState(false);
  const [val, setVal] = useState(false);
  const [val2, setVal2] = useState(false);
  const [tableData, setTableData] = useState(15);
  const [chairs, setChairs] = useState({});
  const token = authToken[0];
  const [timer, setTimer] = useState("120000");
  const timers = new Map();
  const [interval, setit] = useState();

  const handleSubmitNormalmessage = async (id) => {
    let restid = getCookie("Rest");
    try {
      await axios.post(`/queue/normal-message?rest=${restid}&id=${id}`, {
        headers: {
          userToken: token,
        },
      });
      api[1]("queue");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitCustommessage = async (id) => {
    let restid = getCookie("Rest");
    try {
      await axios.post(`/queue/default-message?rest=${restid}&id=${id}`, {
        headers: {
          userToken: token,
        },
      });
      api[1]("queue");
    } catch (error) {
      console.log(error);
    }
  };

  const activeQuids = [];
  const handlesendNotification = async (id, status) => {
    if (activeQuids.includes(id)) {
      return;
    }
    try {
      await axios.post(
        "/queue/auto-cancel",
        { id: id, calledStatus: status },
        {
          headers: {
            userToken: token,
          },
        }
      );
      await new Promise((resolve) => {
        api[1]("queue");
        resolve();
      });
      activeQuids.push(id);

      interval = setit(
        setInterval(() => {
          setTimer((prevTimer) =>
            prevTimer > 0 ? prevTimer - 100 : handleCancels(id)
          );
        }, 1000)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancels = async (id) => {
    let qid = { qId: id };
    let reason = { reason: 9 };
    await cancelClient(qid, reason, token);
    api[1]("queue");
    const index = activeQuids.indexOf(id);
    if (index > -1) {
      activeQuids.splice(index, 1);
    }
  };

  const stopTimer2 = async (id) => {
    await new Promise((resolve) => {
      clearInterval(interval);
      resolve();
    });

    await new Promise((resolve) => {
      const index = activeQuids.indexOf(id);
      if (index > -1) {
        activeQuids.splice(index, 1);
      }
      resolve();
    });
  };

  const handlesendNotification2 = async (id) => {
    if (activeQuids.includes(id)) {
      return;
    }
    try {
      await axios.post(
        "/queue/auto-cancel-off",
        { id: id },
        {
          headers: {
            userToken: token,
          },
        }
      );
      await new Promise((resolve) => {
        api[1]("queue");
        resolve();
      });
      activeQuids.push(id);

      interval = setit(
        setInterval(() => {
          setTimer((prevTimer) =>
            prevTimer > 0 ? prevTimer - 1 : handleCancels(id)
          );
        }, 1000)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const Ready = async (id) => {
    try {
      await axios.post(`/queue/queue-reday?id=${id}`, {
        headers: {
          userToken: token,
        },
      });
      api[1]("queue");
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(edit === true ? false : true);
  };
  const handleExpand = () => {
    setExpand(expand === true ? false : true);
  };

  // const fetchData = async () => {
  //   // try {
  //   //   const response = await axios.get(`/queue/chairs?restID=${props.restid}`, {
  //   //     headers: {
  //   //       userToken: token,
  //   //     },
  //   //   });
  //     setTableData(15);
  //   // } catch (error) {
  //   //   console.error("Error fetching data:", error);
  //   // }
  // };

  function splitNumberFromObject(obj) {
    if (typeof obj.name === "string") {
      const number = parseInt(obj.name);
      if (!isNaN(number)) {
        return number;
      }
    }
    return null;
  }
  const number = splitNumberFromObject(chairs);
  const updateChairs = async () => {
    try {
      await axios.post(
        "/queue/editChairs",
        {
          qId: props.id,
          chairs: number,
        },
        {
          headers: {
            userToken: token,
          },
        }
      );
      setVal(false);
      api[1]("queue");
    } catch (error) {
      console.log(error);
    }
  };

  const generateValues = () => {
    const result = [];
    for (let i = 1; i <= tableData; i++) {
      result.push({ name: i.toString() });
    }
    return result;
  };

  const chairsList = generateValues();

  const handleSelectChairs = (e) => {
    setChairs(e);
  };

  var inputDate = new Date(props?.checkoutdate);
  var formattedDate =
    inputDate?.getUTCMonth() +
    1 +
    "/" +
    inputDate?.getUTCDate() +
    "/" +
    inputDate?.getFullYear();
  var hours = inputDate?.getUTCHours();
  var minutes = inputDate?.getUTCMinutes();
  var seconds = inputDate?.getUTCSeconds();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  var formattedTime =
    hours +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds +
    " " +
    ampm;

  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    const localStorageCoords = {
      latitude: parseFloat(localStorage.getItem("latitude")),
      longitude: parseFloat(localStorage.getItem("longitude")),
    };
    const propsCoords = {
      latitude: parseFloat(props.latitude),
      longitude: parseFloat(props.longitude),
    };
    const distanceMeters = haversine(localStorageCoords, propsCoords);
    const averageSpeedMetersPerSecond = 50;
    const travelTimeSeconds = distanceMeters / averageSpeedMetersPerSecond;
    const travelTimeMinutes = travelTimeSeconds / 60;
    const distanceKilometers = (distanceMeters / 1000).toFixed(0);
    const travelTimeMinutesRounded = travelTimeMinutes.toFixed(2);
    setDistance(distanceKilometers);
    setTime(travelTimeMinutesRounded);
  }, []);

  const [timeDifference, setTimeDifference] = useState(
    calculateTimeDifference(props.createdDate)
  );

  function calculateTimeDifference(createdDate) {
    // const now = moment();
    // const _createdDate = new Date(createdDate).toISOString(); // Use moment.utc to interpret the date as UTC
    const _createdDate = moment(new Date(createdDate).toISOString()); // Use moment.utc to interpret the date as UTC
    let now = moment.utc(new Date().toLocaleString());
    const diff = moment.duration(now.diff(_createdDate));
    const totalMinutes = diff.asMinutes();
    const minutes = String(Math.abs(Math.floor(totalMinutes))).padStart(2, "0"); // Use Math.abs to get the absolute value
    const seconds = String(Math.abs(Math.floor(diff.seconds()))).padStart(
      2,
      "0"
    ); // Use Math.abs

    if (totalMinutes > 300) {
      if (
        ![2, 5, 4].includes(props.status) &&
        !props.historystatus &&
        !props.fromHistory
      ) {
        // console.log("im canceling");
        handleCancels(props.id);
      }
      return props.createdDate
        ? new Date(props.createdDate).toLocaleString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : "";
    }

    return `${Math.floor(totalMinutes)}:${seconds}`;
  }

  function formatMilliseconds(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedTime =
      String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

    return formattedTime;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDifference(calculateTimeDifference(props.createdDate));
    }, 1000);
    if (props.autoCancelMin) {
      setTimer(props.autoCancelMin);
    }
    if (
      props.callStatus !== 0 &&
      ![2, 5, 4].includes(props.status) &&
      !props.historystatus &&
      !props.fromHistory
    ) {
      const interval = setit(
        setInterval(() => {
          setTimer((prevTimer) =>
            prevTimer > 0 ? prevTimer - 1000 : handleCancels(props.id)
          );
        }, 1000)
      );
      return () => clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [props.createdDate, props.autoCancelMin]);

  return (
    <>
      <ParentCustBoxStyle className={edit === true ? "edit" : ""}>
        <CustBoxStyle
          style={
            props.clickedelement?.includes(props.CustomerId) ||
            (SendMessage[0]?.name == "Inside" && props.position === 0) ||
            (SendMessage[0]?.name == "Outside" && props.position === 1) ||
            SendMessage[0]?.name == "Select All"
              ? {
                  borderColor: "#ef5e82",
                  borderWidth: "3px",
                  borderStyle: "solid",
                }
              : {}
          }>
          {props.hasApp ? <RqThumbStyle>REQUEUE</RqThumbStyle> : ""}
          {props.position === 2 ? (
            <SeqNumStyle style={{ color: "#FBA842" }}>
              #any {props.queueNumber}
            </SeqNumStyle>
          ) : (
            <SeqNumStyle># {props.queueNumber}</SeqNumStyle>
          )}
          <FlexHspace onClick={props.mesgclick}>
            <FlexHspace className="justify-center">
              <Link
                href={`${router.pathname}?deatils=${props.id}&client_id=${props.CustomerId}`}>
                {props.photo ? (
                  props.photo.includes(
                    "https://new-requeue.s3.eu-west-2.amazonaws.com/"
                  ) ? (
                    <IamgeAvatarStyle src={props.photo} />
                  ) : props.photo == "null" ? (
                    <IamgeAvatarStyle
                      src={
                        "https://new-requeue.s3.eu-west-2.amazonaws.com/media/avatars/Avatars-02.png"
                      }
                    />
                  ) : (
                    <IamgeAvatarStyle
                      src={`https://new-requeue.s3.eu-west-2.amazonaws.com/media/avatars/${props.photo}`}
                    />
                  )
                ) : (
                  <IamgeAvatarStyle src="../img/avatar.png" />
                )}
              </Link>

              <TextDetailSmallStyle>
                <div className="nameflagcontain">
                  <h1>{props.name}</h1>
                  <img
                    style={{ marginLeft: "10px" }}
                    src={
                      props.flag === "null"
                        ? "https://cdn.requeue.net/media/flags/kw.png"
                        : `https://cdn.requeue.net/media/flags/${props.flag}`
                    }
                    alt="flag"
                  />
                </div>
                <a href={`tel://${props?.phone}`} className="numphone">
                  {props?.phone}
                </a>
              </TextDetailSmallStyle>
            </FlexHspace>
            <ChairsStyle>
              <div className="cont">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <div
                    style={{
                      marginRight: "4px",
                      marginTop: "8px",
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="35"
                      viewBox="0 0 18.559 14.907">
                      <g
                        id="Icon_ionic-ios-people"
                        data-name="Icon ionic-ios-people"
                        transform="translate(-2.215 -7.748)">
                        <path
                          id="Path_300"
                          data-name="Path 300"
                          d="M20.074,19.217c-.572-.2-1.507-.215-1.921-.373a2.714,2.714,0,0,1-.889-.414,5.493,5.493,0,0,1-.148-1.456,2.352,2.352,0,0,0,.506-.715,7.949,7.949,0,0,0,.245-1.4s.337.143.47-.531c.112-.582.327-.889.271-1.318s-.3-.327-.3-.327a3.825,3.825,0,0,0,.3-1.911,3.057,3.057,0,0,0-3.3-3.019A3.068,3.068,0,0,0,12,10.768a3.882,3.882,0,0,0,.291,1.911s-.24-.1-.3.327.153.736.271,1.318c.133.679.47.531.47.531a8.025,8.025,0,0,0,.245,1.4,2.352,2.352,0,0,0,.506.715,5.493,5.493,0,0,1-.148,1.456,2.612,2.612,0,0,1-.889.409c-.409.158-1.344.179-1.921.383a3.605,3.605,0,0,0-2.34,3.433H22.408A3.6,3.6,0,0,0,20.074,19.217Z"
                          transform="translate(-1.634)"
                          fill="#f0f5f8"
                        />
                        <path
                          id="Path_301"
                          data-name="Path 301"
                          d="M7.758,17.675A3.468,3.468,0,0,0,9.464,17.2c-.792-1.2-.363-2.6-.526-3.908a2.155,2.155,0,0,0-2.386-2.084h-.02a2.162,2.162,0,0,0-2.365,2.084c-.163,1.3.291,2.861-.521,3.908a3.209,3.209,0,0,0,1.711.424h0a2.587,2.587,0,0,1-.051.858,1.29,1.29,0,0,1-.613.281,11.853,11.853,0,0,0-1.323.368,2.151,2.151,0,0,0-1.155,1.9h4.1a3.67,3.67,0,0,1,1.635-1.522,3.43,3.43,0,0,1,1.262-.266s.194-.307-.444-.424a4.355,4.355,0,0,1-.981-.342C7.691,18.365,7.758,17.675,7.758,17.675Z"
                          transform="translate(0 -0.946)"
                          fill="#f0f5f8"
                        />
                      </g>
                    </svg>

                    {/* <BsFillPeopleFill></BsFillPeopleFill> */}
                  </div>
                  <h2>{props.gestNumber || props.maxGroupId}</h2>
                </div>
                <Edit
                  onClick={() => {
                    // fetchData();
                    setVal(true);
                    setChairs({
                      name: `${props.gestNumber || props.maxGroupId}`,
                    });
                  }}>
                  <b>Edit</b>
                </Edit>
              </div>
            </ChairsStyle>
            {router.pathname.includes("/history") ? (
              ""
            ) : (
              <Chairsbutton>
                <ChairSeatButtonStyle onClick={props.handleseat}>
                  Seat
                </ChairSeatButtonStyle>
              </Chairsbutton>
            )}
          </FlexHspace>
          <StatusInfoStyle >
            <HeadInfoStyle className={expand ? "" : "dnoneLst"}></HeadInfoStyle>
            <div className={expand ? "" : "dnoneLst"}>
              <TileInfoStyle>
                <IoMdTime />
                <p>{timeDifference}</p>
              </TileInfoStyle>
              {props.hasApp && !isNaN(distance) && !isNaN(time) ? (
                <>
                  <TileInfoStyle>
                    <GoLocation />
                    <p>{distance} km now</p>
                  </TileInfoStyle>

                  <TileInfoStyle>
                    <IoMdCheckmarkCircleOutline
                      className={props.isCheckedIn ? "check_color" : ""}
                    />
                    <p>Checked in {props.queueTime}</p>
                  </TileInfoStyle>
                </>
              ) : (
                ""
              )}
              <AnotherParentExpandDtl>
                <AnotherExpandDtl
                  style={{
                    justifyContent: "space-between",
                    marginBottom: "20px",
                    marginTop: "20px",
                  }}>
                  {props.hostnote == "" || props.hostnote == null ? (
                    ""
                  ) : (
                    <div style={{ display: "flex", width: "240px" }}>
                      <span style={{ marginRight: "10px" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="31.5"
                          height="31.5"
                          viewBox="0 0 31.5 31.5">
                          <path
                            id="Icon_awesome-sticky-note"
                            data-name="Icon awesome-sticky-note"
                            d="M21.938,22.5H31.5V3.938A1.683,1.683,0,0,0,29.813,2.25H1.688A1.683,1.683,0,0,0,0,3.938V32.063A1.683,1.683,0,0,0,1.688,33.75H20.25V24.188A1.692,1.692,0,0,1,21.938,22.5Zm9.07,3.867-6.891,6.891a1.686,1.686,0,0,1-1.2.492H22.5v-9h9v.429A1.682,1.682,0,0,1,31.008,26.367Z"
                            transform="translate(0 -2.25)"
                            fill="#91D7FC"
                          />
                        </svg>
                      </span>
                      <p>{props.hostnote ? props.hostnote : ""}</p>
                    </div>
                  )}

                  {props.note == "" || props.note == null ? (
                    ""
                  ) : (
                    <div style={{ display: "flex", width: "240px" }}>
                      <Link href={`${router.pathname}?hostnote=${props.id}`}>
                        <span
                          style={{ marginRight: "10px", cursor: "pointer" }}>
                          <FiEdit />
                        </span>
                      </Link>
                      <p>{props.note ? props.note : ""}</p>
                    </div>
                  )}
                </AnotherExpandDtl>
              </AnotherParentExpandDtl>
              <AnotherParentExpandDtl>
                <AnotherExpandDtl>
                  {props.queuetags2 || props.QueueSubTag2 ? (
                    <span>
                      <MdSpeakerNotes />
                    </span>
                  ) : (
                    ""
                  )}

                  {/* QueueSubTag */}
                  {props.queuetags2 === false ? (
                    ""
                  ) : (
                    <p style={{ marginLeft: "20px" }}>
                      {props.queuetags ? props.queuetags : ""}
                    </p>
                  )}

                  {props.QueueSubTag2 === false ? (
                    ""
                  ) : (
                    <p style={{ marginLeft: "20px" }}>
                      {props.QueueSubTag ? props.QueueSubTag : ""}
                    </p>
                  )}

                  {router.pathname.includes("/history") &&
                    (props.historystatus == 4 || props.historystatus == 5 ? (
                      <p
                        style={{
                          color: "#ef5e82",
                          position: "absolute",
                          right: "30px",
                        }}>
                        CANCELED{"  "}
                        {props?.checkoutUserdata}
                        {props?.checkoutdate ? formattedTime : null}
                      </p>
                    ) : (
                      <p
                        style={{
                          color: "#2CBA7E",
                          position: "absolute",
                          right: "30px",
                        }}>
                        SEATED{"  "}
                        {props?.checkoutUserdata}
                        {props?.checkoutdate ? formattedTime : null}
                      </p>
                    ))}
                </AnotherExpandDtl>
              </AnotherParentExpandDtl>
            </div>
            <div
              style={{
                width: "100%",
                backgroundColor: "#3C3C3C",
                position: "absolute",
                left: "0",
                bottom: "0",
                borderBottomLeftRadius: "15px",
                borderBottomRightRadius: "15px",
              }}>
              <>
                {expand === true ? (
                  <p
                    onClick={handleExpand}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "20px",
                      color: "black",
                    }}>
                    <BsCaretUpFill />
                  </p>
                ) : (
                  <p
                    onClick={handleExpand}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "20px",
                      color: "black",
                    }}>
                    <BsCaretDownFill />
                  </p>
                )}
              </>
            </div>  
          </StatusInfoStyle>
          {expand === true ? (
            <ExpandCustHold>
              <div>
                <ParentForBoth>
                  <ParentExpandDtl>
                    {props.hasApp ? (
                      <>
                        <ExpandDtl>
                          {props.callStatus !== 1 ? (
                            <span
                              onClick={() => {
                                handlesendNotification(props.id, 1);
                              }}
                              style={{ cursor: "pointer" }}>
                              <FiPhoneCall />
                            </span>
                          ) : (
                            <span
                              style={{
                                backgroundColor: "#04d1a8",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                handlesendNotification(props.id, 0);
                              }}
                              // onClick={stopTimer2}
                            >
                              <FiPhoneCall />
                            </span>
                          )}
                          {props.callStatus !== 1 ? (
                            <p
                              onClick={() => {
                                handlesendNotification(props.id, 1);
                              }}
                              style={{ cursor: "pointer" }}>
                              Answer
                            </p>
                          ) : (
                            <p
                              onClick={() => {
                                handlesendNotification(props.id, 0);
                              }}
                              // onClick={stopTimer2}
                              style={{ cursor: "pointer" }}>
                              Answer
                            </p>
                          )}
                        </ExpandDtl>
                        <ExpandDtl>
                          {props.callStatus !== 2 ? (
                            <span
                              onClick={() =>
                                handlesendNotification(props.id, 2)
                              }
                              style={{ cursor: "pointer" }}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="29"
                                height="29"
                                viewBox="0 0 29 29">
                                <g
                                  id="Group_747"
                                  data-name="Group 747"
                                  transform="translate(5 1)">
                                  <path
                                    id="Icon_feather-phone-call"
                                    data-name="Icon feather-phone-call"
                                    d="M17.183,13.2v2.272c0,.41.3.48,0,.757a2.973,2.973,0,0,1-1.515.757,13.588,13.588,0,0,1-6.059-2.272A15.36,15.36,0,0,1,5.065,10.17,13.479,13.479,0,0,1,2.793,4.111,2.991,2.991,0,0,1,3.55,2.6c.275-.3.349,0,.757,0H6.58c.73-.007,1.413.034,1.515.757a12.1,12.1,0,0,0,.757,2.272c.2.532-.358,1.111-.757,1.515L7.337,7.9a12.6,12.6,0,0,0,4.544,4.544l.757-.757c.4-.4.983-.2,1.515,0,.66.246,1.574-.092,2.272,0C17.157,11.788,17.2,12.461,17.183,13.2Z"
                                    transform="translate(-0.576 3.796)"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                  />
                                  <g
                                    id="Ellipse_42"
                                    data-name="Ellipse 42"
                                    transform="translate(-5 -1)"
                                    fill="none"
                                    strokeWidth="2">
                                    <circle
                                      cx="14.5"
                                      cy="14.5"
                                      r="14.5"
                                      stroke="none"
                                    />
                                    <circle
                                      cx="14.5"
                                      cy="14.5"
                                      r="13.5"
                                      fill="none"
                                    />
                                  </g>
                                  <line
                                    id="Line_97"
                                    data-name="Line 97"
                                    x1="18.499"
                                    y2="19.448"
                                    transform="translate(0.23 3.798)"
                                    fill="none"
                                    strokeLinecap="square"
                                    strokeWidth="2"
                                  />
                                </g>
                              </svg>
                            </span>
                          ) : (
                            <span
                              className="clrd"
                              onClick={() => {
                                handlesendNotification(props.id, 0);
                              }}
                              // onClick={stopTimer2}
                              style={{ cursor: "pointer" }}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="29"
                                height="29"
                                viewBox="0 0 29 29">
                                <g
                                  id="Group_747"
                                  data-name="Group 747"
                                  transform="translate(5 1)">
                                  <path
                                    id="Icon_feather-phone-call"
                                    data-name="Icon feather-phone-call"
                                    d="M17.183,13.2v2.272c0,.41.3.48,0,.757a2.973,2.973,0,0,1-1.515.757,13.588,13.588,0,0,1-6.059-2.272A15.36,15.36,0,0,1,5.065,10.17,13.479,13.479,0,0,1,2.793,4.111,2.991,2.991,0,0,1,3.55,2.6c.275-.3.349,0,.757,0H6.58c.73-.007,1.413.034,1.515.757a12.1,12.1,0,0,0,.757,2.272c.2.532-.358,1.111-.757,1.515L7.337,7.9a12.6,12.6,0,0,0,4.544,4.544l.757-.757c.4-.4.983-.2,1.515,0,.66.246,1.574-.092,2.272,0C17.157,11.788,17.2,12.461,17.183,13.2Z"
                                    transform="translate(-0.576 3.796)"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                  />
                                  <g
                                    id="Ellipse_42"
                                    data-name="Ellipse 42"
                                    transform="translate(-5 -1)"
                                    fill="none"
                                    strokeWidth="2">
                                    <circle
                                      cx="14.5"
                                      cy="14.5"
                                      r="14.5"
                                      stroke="none"
                                    />
                                    <circle
                                      cx="14.5"
                                      cy="14.5"
                                      r="13.5"
                                      fill="none"
                                    />
                                  </g>
                                  <line
                                    id="Line_97"
                                    data-name="Line 97"
                                    x1="18.499"
                                    y2="19.448"
                                    transform="translate(0.23 3.798)"
                                    fill="none"
                                    strokeLinecap="square"
                                    strokeWidth="2"
                                  />
                                </g>
                              </svg>
                            </span>
                          )}
                          {props.callStatus !== 2 ? (
                            <p
                              onClick={() => {
                                handlesendNotification(props.id, 2);
                              }}
                              style={{ cursor: "pointer" }}>
                              Not answered{" "}
                              <span>
                                {/* {formatMilliseconds(props.autoCancelMin)} */}
                                {timer !== null
                                  ? timer > 0
                                  : formatMilliseconds(timer)
                                  ? formatMilliseconds(0)
                                  : "02:00"}
                              </span>
                            </p>
                          ) : (
                            <p
                              onClick={() => {
                                handlesendNotification(props.id, 0);
                              }}
                              // onClick={stopTimer2}
                              style={{ cursor: "pointer" }}>
                              Not answered{" "}
                              <span>
                                {/* {formatMilliseconds(props.autoCancelMin)} */}
                                {timer !== null
                                  ? formatMilliseconds(timer)
                                  : "02:00"}
                              </span>
                            </p>
                          )}
                        </ExpandDtl>

                        <ExpandDtl>
                          {props.LilouCustomNotificationSentDate === null ? (
                            <span
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setVal2(true);
                              }}>
                              <FaRegPaperPlane />
                            </span>
                          ) : (
                            <span
                              style={{
                                backgroundColor: "#1caaf4",
                                cursor: "pointer",
                              }}>
                              <FaRegPaperPlane />
                            </span>
                          )}
                          <p
                            onClick={() => {
                              setVal2(true);
                            }}
                            style={{ cursor: "pointer" }}>
                            Message{" "}
                          </p>
                        </ExpandDtl>
                        <ExpandDtl>
                          <>
                            {props.isCalled == 1 ? (
                              <span
                                style={{
                                  backgroundColor: "#7125c4",
                                  cursor: "pointer",
                                }}>
                                <MdOutlineNotificationsActive />
                              </span>
                            ) : (
                              <span
                                onClick={() => Ready(props.id)}
                                style={{
                                  cursor: "pointer",
                                }}>
                                <MdOutlineNotificationsActive />
                              </span>
                            )}{" "}
                            <p
                              onClick={() => Ready(props.id)}
                              style={{ cursor: "pointer" }}>
                              Ready
                            </p>
                          </>
                        </ExpandDtl>
                      </>
                    ) : (
                      ""
                    )}

                    {/* {props.hostnote == "" || props.hostnote == null ? (
                      <ExpandDtl>
                        <div>
                          <span style={{ marginRight: "10px" }}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="31.5"
                              height="31.5"
                              viewBox="0 0 31.5 31.5">
                              <path
                                id="Icon_awesome-sticky-note"
                                data-name="Icon awesome-sticky-note"
                                d="M21.938,22.5H31.5V3.938A1.683,1.683,0,0,0,29.813,2.25H1.688A1.683,1.683,0,0,0,0,3.938V32.063A1.683,1.683,0,0,0,1.688,33.75H20.25V24.188A1.692,1.692,0,0,1,21.938,22.5Zm9.07,3.867-6.891,6.891a1.686,1.686,0,0,1-1.2.492H22.5v-9h9v.429A1.682,1.682,0,0,1,31.008,26.367Z"
                                transform="translate(0 -2.25)"
                                fill="#91D7FC"
                              />
                            </svg>
                          </span>
                          <p>{props.note ? props.note : "--"}</p>
                        </div>
                      </ExpandDtl>
                    ) : (
                      ""
                    )} */}

                    {props.note == "" || props.note == null ? (
                      <ExpandDtl>
                        <div>
                          <Link
                            href={`${router.pathname}?hostnote=${props.id}`}>
                            <div
                              style={{
                                cursor: "pointer",

                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                              }}>
                              <span
                                style={{
                                  marginRight: "10px",
                                  cursor: "pointer",
                                }}>
                                <FiEdit />
                              </span>
                              <p
                                style={{
                                  padding: 0,
                                  margin: 0,
                                  cursor: "pointer",
                                }}>
                                Edit Note
                              </p>
                            </div>
                          </Link>
                        </div>
                      </ExpandDtl>
                    ) : (
                      ""
                    )}

                    {props.queuetags2 === false ||
                    props.QueueSubTag2 === false ? (
                      <ExpandDtl>
                        <span>
                          <MdSpeakerNotes />
                        </span>
                      </ExpandDtl>
                    ) : (
                      ""
                    )}

                    {router.pathname.includes("/hold") ? (
                      ""
                    ) : (
                      <ExpandDtl
                        style={{ cursor: "pointer" }}
                        onClick={props.handlehold}>
                        <span style={{ backgroundColor: "#FBA842" }}>
                          <AiOutlinePauseCircle />
                        </span>
                        <p>Hold Turn</p>
                      </ExpandDtl>
                    )}
                    {router.pathname.includes("/history") ? (
                      ""
                    ) : (
                      <ExpandDtl
                        style={{ cursor: "pointer" }}
                        onClick={props.handlecancel}>
                        <span style={{ backgroundColor: "#D12000" }}>
                          <AiOutlineCloseCircle />
                        </span>
                        <p>Cancel Turn</p>
                      </ExpandDtl>
                    )}
                  </ParentExpandDtl>
                </ParentForBoth>
              </div>
            </ExpandCustHold>
          ) : (
            ""
          )}
        </CustBoxStyle>
        <ParentCustButtonsStyle onClick={(e) => handleEdit(e)}>
          {edit ? (
            <>
              <SeatButtonStyle onClick={props.handleseat}>Seat</SeatButtonStyle>
              <HoldButtonStyle onClick={props.handlehold}>Hold</HoldButtonStyle>
              <CancelButtonStyle onClick={props.handlecancel}>
                Cancel
              </CancelButtonStyle>
            </>
          ) : (
            <>
              <SeatButtonStyle>Seat</SeatButtonStyle>
              <HoldButtonStyle>Hold</HoldButtonStyle>
              <CancelButtonStyle>Cancel</CancelButtonStyle>
            </>
          )}
        </ParentCustButtonsStyle>
      </ParentCustBoxStyle>
      <Modal
        isOpen={val}
        onRequestClose={() => setVal(false)}
        portalClassName="modl"
        className="modal pops">
        <div>
          <div className="w-100 relative mt-3">
            <ImCross
              onClick={() => setVal(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <Seats>
            <h2>PAX</h2>
            <Chairs
              chairsItem={chairsList}
              value={chairs.name}
              handleSelect={handleSelectChairs}
            />
          </Seats>
        </div>

        <div className="w-100 text-center mb-2">
          <div className="p-3 mb-2">
            <HoldPera>Are you sure you want to Change PAX Count ?</HoldPera>
          </div>
          <PopButtonGreen onClick={updateChairs}>Yes</PopButtonGreen>
        </div>
      </Modal>

      <Modal
        isOpen={val2}
        onRequestClose={() => setVal2(false)}
        portalClassName="modl"
        className="modal pops">
        <div className="w-100">
          <h2 className="text-center">
            <ImCross
              className="absolute-left pointer"
              onClick={() => setVal2(false)}
            />
          </h2>
        </div>
        <div className="w-100 text-center mb-2">
          <SaveModl
            onClick={() => {
              handleSubmitCustommessage(props.id);
              setVal2(false);
            }}>
            Send Custom Message
          </SaveModl>
        </div>
        <div className="w-100 text-center mb-2">
          <SaveModl
            onClick={() => {
              handleSubmitNormalmessage(props.id);
              setVal2(false);
            }}>
            Send Message
          </SaveModl>
        </div>
      </Modal>
    </>
  );
};

export default CustList;
