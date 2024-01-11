import React, { useContext } from "react";
import Headers from "../host/common/Header";
import {
  SidemenuStyle,
  AddClientStyle,
  SidemenuTextStyle,
  SidemenuParentStyle,
  LogoFoot,
  PeraFoot,
  StyledModalHeader,
  ConfirmButtonModalAddChairs,
  SpacedFlex,
  ProfilePopUpButton,
  StyledInputModal,
  TeaxtAreaModalStyle,
  DangerPera,
  HoldPera,
  PopButtonGreen,
  ModlInp,
  ULStyle,
  ProfileMsgBox,
  SenderProfileMsgBox,
  DateProfileMsgBox,
  MsgProfileMsgBox,
} from "./styled/common.styled";
import { FlexHLeft, FlexH, FlexVBottom } from "./styled/global.styled";
import Modal from "react-modal";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import Seats from "./common/modal/Seats";
import Listing from "./common/modal/Listing";
import Chairs from "./common/modal/Chairs";
import PhoneNumber from "./common/input/PhoneNumber";
import Radio from "./common/input/Radio";
import { VscChromeClose } from "react-icons/vsc";
import { MdOutlineNotificationsActive, MdSettings } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaInfoCircle, FaLessThan } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { RiLogoutBoxLine } from "react-icons/ri";
import { GlobalContext } from "../../contextApi/Provider";
import { CgProfile } from "react-icons/cg";
import { SaveLocalStorage } from "../../helpers/localStorage";
import {
  addClient,
  addQueue,
  cancelClient,
  holdClient,
} from "../../helpers/apiCalls/apiPost";
import PopCust from "./common/PopCust";
import { setCookies } from "cookies-next";
import axios from "../../config/instance";
import { getCookie } from "cookies-next";
import { io } from "socket.io-client";

Modal.setAppElement("#__next");
Modal.defaultStyles.overlay.backgroundColor = "transparent";

const Layout = (props) => {
  const router = useRouter();

  const {
    seatingarea,
    guestfrommobile,
    authToken,
    loading,
    api,
    searchnum,
    searchnumcode,
  } = useContext(GlobalContext);

  const token = authToken[0];
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hostnote, setHostnote] = useState("");
  let id = router.query.hostnote;
  const [hostnoteid, setHostnoteid] = useState();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleModal2 = () => {
    setModalVisible2(!modalVisible);
  };

  useEffect(() => {
    setHostnoteid(id);
  }, [id]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  function updateQueueEmit() {
    const socket = io("https://orderapi.requeue.com");
    let rest = getCookie("Rest");
    socket.emit("orderSocketApi", {
      restid: rest,
      type: "host",
    });
  }

  const [seatingareaIN, setSeatingareaIN] = useState({
    tags: [{ subTags: [] }],
  });
  const [seatingareaOUT, setSeatingareaOUT] = useState({
    tags: [{ subTags: [] }],
  });

  const [customer, setCustomer] = useState({
    id: 0,
    name: "",
    phone: "",
    country: 0,
    gender: "Male",
    note: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (seatingarea[0].inside && seatingarea[0].outside) {
      setSeatingareaIN(seatingarea[0].inside);
      setSeatingareaOUT(seatingarea[0].outside);
    }
    if (guestfrommobile[0].id) {
      setCustomer({
        ...customer,
        id: guestfrommobile[0].id,
        country: guestfrommobile[0].country,
        phone: guestfrommobile[0].phone,
        name: guestfrommobile[0].name,
        gender: guestfrommobile[0].gender,
      });
    } else {
      setCustomer({
        ...customer,
        country: guestfrommobile[0].country,
        phone: guestfrommobile[0].phone,
        name: "",
        gender: "",
        note: "",
      });
      setMessage("");
    }
  }, [guestfrommobile[0]]);

  const fetchData = async () => {
    // try {
    //   const response = await axios.get(
    //     `/queue/chairs?restID=${
    //       document.cookie
    //         .split("; ")
    //         .find((row) => row.startsWith("Rest="))
    //         ?.split("=")[1]
    //     }`,
    //     {
    //       headers: {
    //         userToken: token,
    //       },
    //     }
    //   );
    setchairsListinside(createarray(15));
    setchairsListoutside(createarray(15));
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };

  const [notification, setNotification] = useState(null);
  const fetchmessage = async () => {
    try {
      const response = await axios.get(
        `/table/ClientsTaskList?restID=${
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("Rest="))
            ?.split("=")[1]
        }`,
        {
          headers: {
            userToken: token,
          },
        }
      );
      setNotification(response?.data?.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchmessage();
  }, []);

  const createarray = (val) => {
    let data = [];
    for (let i = 0; i < val; i++) {
      data.push({ name: `${i + 1}` });
    }
    return data;
  };
  const [allsettings, setAllsettings] = useState();
  const [resturantdata, setResturantdata] = useState([]);
  // console.log(resturantdata.tablesOptions)
  const [seatingone, setSeatingone] = useState({ name: "INSIDE", position: 0 });
  const [seatingtwo, setSeatingtwo] = useState({
    name: "SINGLE",
    key: 0,
    subTags: [],
  });
  const [seatingthree, setSeatingthree] = useState("");

  useEffect(() => {
    const apiUrl = `/restaurant/getallsettings?restID=${
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("Rest="))
        ?.split("=")[1]
    }`;
    axios
      .get(apiUrl, {
        headers: {
          userToken: token,
        },
      })
      .then((response) => {
        setAllsettings(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const apiUrl = `/restaurant/getallresturantdata?restID=${
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("Rest="))
        ?.split("=")[1]
    }`;
    axios
      .get(apiUrl, {
        headers: {
          userToken: token,
        },
      })
      .then((response) => {
        setResturantdata(response.data.result1);
        localStorage.setItem("tableee", response?.data?.result1?.tablesOptions);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const anywhe = allsettings?.find((item) => {
    if (item.title == "Inside_Name") {
      return item;
    }
  });
  const anywhe2 = allsettings?.find((item) => {
    if (item.title == "Outside_Name") {
      return item;
    }
  });

  const anywhe3 = allsettings?.find((item) => {
    if (item.title == "Hide_AnyArea") {
      return item;
    }
  });

  let insideee = anywhe?.value || anywhe?.extraValue;
  let outsideee = anywhe2?.value || anywhe2?.extraValue;
  let anyarea = anywhe3?.value;
  let anyarea2 = resturantdata?.EnableQueueTags;

  const [selection, setSelection] = useState("null");
  useEffect(() => {
    setSelection({ name: insideee });
  }, [insideee]);

  const [selection2, setSelection2] = useState("");
  // console.log(selection2)
  const [selection22, setSelection22] = useState("");
  // console.log(selection22)

  // console.log(selection2)

  const seatingonelistone = [
    { name: insideee },
    { name: "ANY" },
    { name: outsideee },
  ];

  const seatingtwolisttwo = [
    { name: "SINGLE" },
    { name: "FAMILY" },
    { name: "BOTH" },
  ];

  const [nameEnList, setNameEnList] = useState([]);
  const [nameEnList1, setNameEnList1] = useState([]);
  useEffect(() => {
    const apiUrl = `/queue/getqueuetag?rest_id=${
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("Rest="))
        ?.split("=")[1]
    }`;
    axios
      .get(apiUrl)
      .then((response) => {
        // const extractedNames = response.data?.ListOfData.map((item) => ({
        //   name: item.NameEn,
        //   id: item.id,
        // }));
        setNameEnList(response.data.data.RestQueueTagResultInside);
        setNameEnList1(response.data.data.RestQueueTagResultOutside);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [chairs, setChairs] = useState({ name: "1" });
  const [chairsListinside, setchairsListinside] = useState([]);
  const [chairsListoutside, setchairsListoutside] = useState([]);

  const handleSelectChairs = (e) => {
    setChairs(e);
  };

  const handleSelectseatingone = (e) => {
    if (e.name == insideee) {
      setSeatingone({ name: "INSIDE", position: 0 });
      setSelection(e);
    } else if (e.name == outsideee) {
      setSeatingone({ name: "OUTSIDE", position: 1 });
      setSelection(e);
    } else {
      setSeatingone({ name: "ANY", position: 2 });
      setSelection(e);
    }
  };
  const handleSelectseatingtwo = (e) => {
    setSeatingtwo(e);
  };
  const handleSelectseatingthree = (e) => {
    setSeatingthree(e.TagID);
    setSelection2(e.NameEn);
    setSelection22(e.TagID);
  };

  const Homepage = props.fromInner ? props.fromInner + "home" : "home";
  const Holdpage = props.fromInner ? props.fromInner + "hold" : "hold";
  const Historypage = props.fromInner ? props.fromInner + "history" : "history";
  const Tablepage = props.fromInner ? props.fromInner + "table" : "table";
  const isProfile = router.asPath.includes("profile");
  const isHomepage = router.asPath.includes("home");
  const isHoldpage = router.asPath.includes("hold");
  const isHistorypage = router.asPath.includes("history");
  const isTablepage = router.asPath.includes("table");

  const handleSetLastPage = () => {
    SaveLocalStorage("lastPage", router.asPath);
  };
  const handleAddClient = () => {
    let token = authToken[0];
    const custInfo = {
      country: customer.country,
      phone: customer.phone,
      name: customer.name,
      gender: customer.gender,
    };
    const QueueInfo = {
      chairs: chairs.name,
      note: customer.note,
      clientId: customer.id,
      tablePosition: seatingone.position,
      tagId: seatingthree || 0,
      subTagId: seatingtwo?.key,
      client: {
        id: customer.id,
        country: customer.country,
        phone: customer.phone,
        name: customer.name,
        gender: customer.gender,
      },
    };

    if (guestfrommobile[0].id) {
      addQueue(token, QueueInfo)
        .then((response) => {
          api[1]("queue");
          if (response.data.Success) {
            setCustomer({
              ...customer,
              id: 0,
              country: 1,
              phone: "",
              name: "",
              gender: "",
              note: "",
            });
            loading[1](true);
            router.push("/home");
          }
        })
        .catch((error) => {
          setMessage(error.response.data.message);
        });
    } else {
      addClient(token, custInfo)
        .then((response) => {
          if (response.data.success) {
            const data = response.data.data;
            setCustomer({
              ...customer,
              id: data.id,
              country: data.country,
              phone: data.phone,
              name: data.name,
              gender: data.gender,
            });

            addQueue(token, {
              chairs: QueueInfo.chairs,
              note: QueueInfo.note,
              clientId: data.id,
              tablePosition: QueueInfo.tablePosition,
              tagId: QueueInfo.tagId,
              subTagId: QueueInfo.subTagId,
              client: {
                id: data.id,
                country: data.country,
                phone: data.phone,
                name: data.name,
                gender: data.gender,
              },
            })
              .then((response) => {
                api[1]("queue");
                if (response.data.Success) {
                  setCustomer({
                    ...customer,
                    id: 0,
                    country: 1,
                    phone: "",
                    name: "",
                    gender: "",
                    note: "",
                  });
                  loading[1](true);
                  router.push("/");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleseat3 = async (e) => {
    let token = authToken[0];
    try {
      await axios.post(
        `/queue/notable`,
        {
          qId: e,
          userID: localStorage.getItem("userID"),
        },
        {
          headers: {
            userToken: token,
          },
        }
      );
      await api[1]("queue");
      await router.push("");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onCustomerDataChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleLogout = (e) => {
    setCookies("Rest", "");
    setCookies("token", "");
    localStorage.removeItem("bId");
    localStorage.removeItem("usertitle");
    localStorage.removeItem("username");
    localStorage.removeItem("expire");
    localStorage.removeItem("area");
    localStorage.removeItem("resturant");
    localStorage.removeItem("longitude");
    localStorage.removeItem("latitude");
    router.push("/");
  };

  const handleTables = (e) => {
    router.push("/table?qid=" + e);
  };

  const handleTables2 = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/queue/edit-host-queue",
        {
          hostNote: hostnote,
          id: hostnoteid,
        },
        {
          headers: {
            userToken: token,
          },
        }
      );
      api[1]("queue");
      router.push("");
      setHostnoteid("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleHolds = async (e) => {
    let qid = { qId: e };
    await holdClient(qid, token);
    router.push("");
    await new Promise((resolve) => {
      api[1]("queue");
      resolve();
    });
  };

  const [selectedKey, setSelectedKey] = useState(null);
  const handleCancels = async (e) => {
    let qid = { qId: e };
    let reason = { reason: selectedKey };
    await cancelClient(qid, reason, token);
    api[1]("queue");
    updateQueueEmit();
    router.push("");
  };

  const [client, setClient] = useState({});
  // console.log(client)
  const [visiteddata, setVisiteddata] = useState({});
  const getclientdata = async (e) => {
    try {
      const response = await axios.get(`/queue/get-by-userid?id=${e}`, {
        headers: {
          userToken: token,
        },
      });
      setClient(response.data.data[0]);
      setVisiteddata(response.data.querry1[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const _listing = seatingonelistone.map((l, key) => (
    <li
      className={l.name === selection.name ? "active" : ""}
      key={key}
      onClick={() => handleSelectseatingone(l)}
    >
      {l.name}
    </li>
  ));

  // console.log(nameEnList, "ffdyhdgg");
  const _listing2 = nameEnList.map((l, TagID) => (
    <li
      className={l.TagID == selection22 ? "active" : ""}
      id={l.TagID}
      onClick={() => handleSelectseatingthree(l)}
    >
      {l.NameEn}
    </li>
  ));
  const _listing3 = nameEnList1.map((l, TagID) => (
    <li
      className={l.TagID == selection22 ? "active" : ""}
      id={l.TagID}
      onClick={() => handleSelectseatingthree(l)}
    >
      {l.NameEn}
    </li>
  ));

  return (
    <>
      <div>
        <GiHamburgerMenu className="hamburger" onClick={toggleMenu} />
        <div>
          <Headers
            pagename={props.pagename}
            clas={props.clas}
            msg={props.msg}
            listView={props.listView}
            listViewCls={props.listViewCls}
            gridViewCls={props.gridViewCls}
          />
          <div className="container">
            <FlexHLeft className="gap">
              <SidemenuParentStyle
                className={`sidemenu ${isMenuOpen ? "open" : ""}`}
              >
                <SidemenuStyle>
                  <Link href={`${router.pathname}?addguest=addguest`}>
                    <AddClientStyle className="fELDif">
                      <b>+</b>
                      <strong> Add Guest </strong>
                    </AddClientStyle>
                  </Link>

                  <SidemenuTextStyle className="fdeglb">
                    <ImCross className="crosshide" onClick={toggleMenu} />
                    <Link href={`?profile=profile`}>
                      {isProfile ? (
                        ""
                      ) : (
                        <CgProfile
                          className="cgprofilee"
                          style={{ fontSize: "35px" }}
                        />
                      )}
                    </Link>
                    <Link href={Homepage}>
                      {isHomepage ? (
                        <h1
                          onClick={() => {
                            searchnum[1]("");
                            searchnumcode[1](null);
                            api[1]("mainqueue");
                          }}
                        >
                          Queue
                        </h1>
                      ) : (
                        <a
                          href="#"
                          onClick={() => {
                            searchnum[1]("");
                            searchnumcode[1](null);
                            api[1]("mainqueue");
                          }}
                        >
                          Queue
                        </a>
                      )}
                    </Link>

                    <Link href={Holdpage}>
                      {isHoldpage ? (
                        <h1
                          onClick={() => {
                            searchnum[1]("");
                            searchnumcode[1](null);
                            api[1]("holdmain");
                          }}
                        >
                          Hold
                        </h1>
                      ) : (
                        <a
                          href="#"
                          onClick={() => {
                            searchnum[1]("");
                            searchnumcode[1](null);
                            api[1]("holdmain");
                          }}
                        >
                          Hold
                        </a>
                      )}
                    </Link>

                    <Link href={Historypage}>
                      {isHistorypage ? (
                        <h1
                          onClick={() => {
                            searchnum[1]("");
                            searchnumcode[1](null);
                            api[1]("mainhistory");
                          }}
                        >
                          History
                        </h1>
                      ) : (
                        <a
                          href="#"
                          onClick={() => {
                            searchnum[1]("");
                            searchnumcode[1](null);
                            api[1]("mainhistory");
                          }}
                        >
                          History
                        </a>
                      )}
                    </Link>
                    {localStorage.getItem("tableee") == "true" ? (
                      <Link href={Tablepage}>
                        {isTablepage ? (
                          <h1
                            onClick={() => {
                              handleSetLastPage();
                              searchnum[1]("");
                              searchnumcode[1](null);
                              api[1]("tablesmain");
                            }}
                          >
                            Tables
                          </h1>
                        ) : (
                          <a
                            href="#"
                            onClick={() => {
                              handleSetLastPage();
                              searchnum[1]("");
                              searchnumcode[1](null);
                              api[1]("tablesmain");
                            }}
                          >
                            Tables
                          </a>
                        )}
                      </Link>
                    ) : (
                      ""
                    )}
                  </SidemenuTextStyle>
                </SidemenuStyle>
                <FlexH className="mt-4 mb-3 mainpage">
                  <LogoFoot src="../../img/logo.png" className="fYpryE" />

                  <FlexVBottom className="mb-2 clDWSi">
                    <PeraFoot>
                      Powered By <br />
                      Requeue Company
                      <br />
                      www.requeue.net
                    </PeraFoot>
                  </FlexVBottom>
                </FlexH>
              </SidemenuParentStyle>

              {props.body}
            </FlexHLeft>
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!router.query.addguest}
        onRequestClose={() => router.push("")}
        portalClassName="modalss"
        className="modal"
      >
        <StyledModalHeader>
          <a onClick={() => router.push("")} className="addCrossrespopnsive">
            <VscChromeClose />
          </a>
          <a onClick={() => router.push("")} className="addCrossrespopnsive2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13.503"
              height="23.619"
              viewBox="0 0 13.503 23.619"
            >
              <path
                id="Icon_ionic-ios-arrow-back"
                data-name="Icon ionic-ios-arrow-back"
                d="M15.321,18l8.937-8.93a1.688,1.688,0,0,0-2.391-2.384L11.742,16.8a1.685,1.685,0,0,0-.049,2.327L21.86,29.32a1.688,1.688,0,0,0,2.391-2.384Z"
                transform="translate(-11.251 -6.194)"
                fill="#f5f9fc"
              />
            </svg>
          </a>
          <p className="pinaddres">Get In Line</p>
        </StyledModalHeader>

        <FlexH className="mt-4 mb-3 gap resadd addguesttt">
          <div className="w-100">
            <Seats>
              <h2>SEATING AREA</h2>
              <ULStyle className="w-100" style={{ textTransform: "uppercase" }}>
                {_listing}
              </ULStyle>
              {anyarea == 1 ? (
                <Listing
                  listItem={seatingtwolisttwo}
                  value={seatingtwo}
                  handleSelect={handleSelectseatingtwo}
                />
              ) : (
                ""
              )}

              {anyarea2 == 1 ? (
                <ULStyle
                  className="w-100"
                  style={{ textTransform: "uppercase" }}
                >
                  {seatingone.name == "INSIDE"
                    ? _listing2
                    : seatingone.name == "OUTSIDE"
                    ? _listing3
                    : null}
                </ULStyle>
              ) : (
                ""
              )}
            </Seats>
          </div>

          <SpacedFlex className="w-100">
            <Seats>
              {seatingone === "INSIDE" ? (
                <Chairs
                  chairsItem={chairsListinside}
                  value={chairs.name}
                  handleSelect={handleSelectChairs}
                />
              ) : seatingone === "OUTSIDE" ? (
                <Chairs
                  chairsItem={chairsListoutside}
                  value={chairs.name}
                  handleSelect={handleSelectChairs}
                />
              ) : (
                <Chairs
                  chairsItem={chairsListoutside}
                  value={chairs.name}
                  handleSelect={handleSelectChairs}
                />
              )}
            </Seats>
            <ConfirmButtonModalAddChairs
              className="evhFVD"
              onClick={() => {
                handleAddClient();
                router.push("");
              }}
            >
              CONFIRM
            </ConfirmButtonModalAddChairs>
          </SpacedFlex>

          <div className="w-100">
            <Seats>
              <h2>CUSTOMER DETAILS</h2>
              {message ? <DangerPera>{message}</DangerPera> : ""}
              <PhoneNumber />
              {guestfrommobile[0].id ? (
                <StyledInputModal
                  name="name"
                  disabled={true}
                  value={customer.name}
                />
              ) : (
                <StyledInputModal
                  name="name"
                  placeholder="GUEST NAME"
                  value={customer.name}
                  onChange={onCustomerDataChange}
                />
              )}
              {guestfrommobile[0].id ? (
                <div className="mt-4 mb-3">
                  <Radio
                    name="gender"
                    gn={customer.gender === "Male"}
                    disabled={true}
                    handleChange={onCustomerDataChange}
                  >
                    Male
                  </Radio>
                  <Radio
                    name="gender"
                    gn={customer.gender === "Female"}
                    disabled={true}
                    handleChange={onCustomerDataChange}
                  >
                    Female
                  </Radio>
                </div>
              ) : (
                <div className="mt-4 mb-3">
                  <Radio
                    name="gender"
                    gn={customer.gender === "Male"}
                    handleChange={onCustomerDataChange}
                  >
                    Male
                  </Radio>
                  <Radio
                    name="gender"
                    gn={customer.gender === "Female"}
                    handleChange={onCustomerDataChange}
                  >
                    Female
                  </Radio>
                </div>
              )}

              <TeaxtAreaModalStyle
                className=""
                id="textareaModal"
                name="note"
                placeholder="ADD NOTE (OPTIONAL)"
                value={customer.note}
                onChange={onCustomerDataChange}
              />
            </Seats>
          </div>
          <ConfirmButtonModalAddChairs
            className="evhFVD2"
            onClick={() => {
              handleAddClient();
              router.push("");
            }}
          >
            CONFIRM
          </ConfirmButtonModalAddChairs>
        </FlexH>
      </Modal>

      <Modal
        isOpen={!!router.query.profile}
        onRequestClose={() => router.push("")}
        portalClassName="ProfileModalParent"
        className="modal"
      >
        <StyledModalHeader>
          <a onClick={() => router.push("")} className="addCrossrespopnsive">
            <VscChromeClose />
          </a>
          <a onClick={() => router.push("")} className="addCrossrespopnsive2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13.503"
              height="23.619"
              viewBox="0 0 13.503 23.619"
            >
              <path
                id="Icon_ionic-ios-arrow-back"
                data-name="Icon ionic-ios-arrow-back"
                d="M15.321,18l8.937-8.93a1.688,1.688,0,0,0-2.391-2.384L11.742,16.8a1.685,1.685,0,0,0-.049,2.327L21.86,29.32a1.688,1.688,0,0,0,2.391-2.384Z"
                transform="translate(-11.251 -6.194)"
                fill="#f5f9fc"
              />
            </svg>
          </a>
          <p className="pinaddres2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14.652"
                height="14.656"
                viewBox="0 0 14.652 14.656"
              >
                <path
                  id="Icon_ionic-ios-settings"
                  data-name="Icon ionic-ios-settings"
                  d="M17.942,11.826a1.885,1.885,0,0,1,1.21-1.759,7.473,7.473,0,0,0-.9-2.179,1.911,1.911,0,0,1-.767.164A1.881,1.881,0,0,1,15.76,5.4a7.451,7.451,0,0,0-2.175-.9,1.884,1.884,0,0,1-3.518,0,7.473,7.473,0,0,0-2.179.9A1.881,1.881,0,0,1,6.167,8.052,1.849,1.849,0,0,1,5.4,7.888a7.639,7.639,0,0,0-.9,2.183,1.885,1.885,0,0,1,0,3.518,7.473,7.473,0,0,0,.9,2.179,1.882,1.882,0,0,1,2.484,2.484,7.517,7.517,0,0,0,2.179.9,1.88,1.88,0,0,1,3.51,0,7.473,7.473,0,0,0,2.179-.9,1.884,1.884,0,0,1,2.484-2.484,7.517,7.517,0,0,0,.9-2.179A1.894,1.894,0,0,1,17.942,11.826ZM11.86,14.875a3.052,3.052,0,1,1,3.052-3.052A3.052,3.052,0,0,1,11.86,14.875Z"
                  transform="translate(-4.5 -4.5)"
                  fill="#fff"
                />
              </svg>
            </span>
            Setting
          </p>
        </StyledModalHeader>

        <FlexH className="mt-4 mb-3 gap minH-600">
          <div className={`w-400px setcss ${modalVisible2 ? "setcssres" : ""}`}>
            <ul className="list-unstyled fxlx">
              <li className="list-unstyled-item">
                <img src="/img/Profile.png" className="img-circle" />
              </li>
              <li className="list-unstyled-item mb-2">
                <p>Restaurant : {localStorage.getItem("resturant")}</p>
                <p>Area : {localStorage.getItem("area")}</p>
                <p>Branch ID : {localStorage.getItem("bId")}</p>
                <p>User : {localStorage.getItem("username")}</p>
                <p>
                  Expired in :{" "}
                  <span className="text-danger">
                    {new Date(
                      localStorage.getItem("expire")
                    ).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </li>
              <li className="list-unstyled-item">
                <Link
                  href={
                    props.fromInner ? props.fromInner + "settings" : "settings"
                  }
                >
                  <ProfilePopUpButton>
                    {" "}
                    <i className="v_middle">
                      <MdSettings />
                    </i>{" "}
                    <span className="v_middle">Setting</span>
                  </ProfilePopUpButton>
                </Link>
              </li>
              <li className="list-unstyled-item">
                <Link href="#">
                  <ProfilePopUpButton>
                    {" "}
                    <i className="v_middle">
                      <FaInfoCircle />
                    </i>{" "}
                    <span className="v_middle">Manual </span>
                  </ProfilePopUpButton>
                </Link>
              </li>
              <li className="list-unstyled-item inbutton">
                <Link href="#">
                  <ProfilePopUpButton>
                    {" "}
                    <i className="v_middle">
                      <MdOutlineNotificationsActive />
                    </i>{" "}
                    <span
                      className="v_middle"
                      onClick={() => {
                        toggleModal();
                        toggleModal2();
                      }}
                    >
                      Inbox{" "}
                    </span>
                  </ProfilePopUpButton>
                </Link>
              </li>
              <li className="list-unstyled-item logoutbut">
                <ProfilePopUpButton onClick={handleLogout}>
                  {" "}
                  <i className="v_middle">
                    <RiLogoutBoxLine />
                  </i>{" "}
                  <span className="v_middle">Logout</span>
                </ProfilePopUpButton>
              </li>
            </ul>
          </div>
          <div
            className={`flexParentModal pl-2 pr-5 ${
              modalVisible ? "flexParentModalres" : ""
            }`}
          >
            <h2 className="text-center">
              <span
                className="lessthen"
                onClick={() => {
                  toggleModal();
                  toggleModal2();
                }}
              >
                <FaLessThan />
              </span>
              <span className="v_middle">INBOX</span>
              <MdOutlineNotificationsActive className="v_middle fsize30 mr-2" />
            </h2>
            <div className="profileModalMessage">
              {notification?.map((message, index) => (
                <ProfileMsgBox key={index}>
                  <SenderProfileMsgBox>From admin:</SenderProfileMsgBox>
                  <DateProfileMsgBox>
                    {new Date(message?.createdDate)
                      .toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      .toUpperCase()}
                  </DateProfileMsgBox>
                  <MsgProfileMsgBox>{message?.json}</MsgProfileMsgBox>
                </ProfileMsgBox>
              ))}
            </div>
          </div>
        </FlexH>
      </Modal>

      <Modal
        isOpen={!!router.query.deatils}
        onAfterOpen={(e) => getclientdata(router.query.deatils)}
        onRequestClose={() => router.push("")}
        portalClassName="modl"
        className="modal pops"
      >
        <div className="w-100 relative mt-3">
          <ImCross
            onClick={() => router.push("")}
            style={{ cursor: "pointer" }}
          />
          <PopCust
            dtl={true}
            createdat={client?.createdDate}
            minimumtime={client?.minmumTime}
            maximumtime={client?.maxTime}
            chairs={client?.maxGroupId}
            turn={client?.queueNumber}
            name={client.client?.name}
            phone={client.client?.phone}
            checkedin={client?.isCheckedIn}
            checkedindate={client?.checkedInDate}
            img={client.client?.photo}
            hashapp={client.client?.hasApp}
            submitDate={client?.submitDate}
            orderstatus={client?.orderstatus}
            message={client?.LilouCustomNotificationSentDate}
            message2={client?.LilouCustomNotificationSent}
            isCalled={client?.isCalled}
            callStatus={client?.callStatus}
            visited={visiteddata?.visited}
            walkin={visiteddata?.Walk_in}
            byrequeue={visiteddata?.Walk_in}
            seated={visiteddata?.Seated}
            cancelled={visiteddata?.Cancelled}
            preOrder={visiteddata?.Pre_order}
            totalchairs={visiteddata?.TOTAL_CHAIR}
          />
        </div>
      </Modal>

      <Modal
        isOpen={!!router.query.hostnote}
        onRequestClose={() => router.push("")}
        portalClassName="modl"
        className="modal pops"
      >
        <div className="w-100 relative mt-3">
          <ImCross
            onClick={() => router.push("")}
            style={{ cursor: "pointer" }}
          />
          <TeaxtAreaModalStyle
            className=""
            id="textareaModal"
            name="note"
            placeholder="ADD NOTE (OPTIONAL)"
            onChange={(e) => setHostnote(e.target.value)}
          />

          <div className="w-100 text-center mb-2">
            <PopButtonGreen onClick={(e) => handleTables2(e)}>
              Yes
            </PopButtonGreen>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={!!router.query.seat}
        onAfterOpen={(e) => getclientdata(router.query.seat)}
        onRequestClose={() => router.push("")}
        portalClassName="modl"
        className="modal pops"
      >
        <div className="w-100 relative mt-3">
          <ImCross
            onClick={() => router.push("")}
            style={{ cursor: "pointer" }}
          />
          <PopCust
            dtl={false}
            createdat={client?.createdDate}
            minimumtime={client?.minmumTime}
            maximumtime={client?.maxTime}
            chairs={client?.maxGroupId}
            checkedin={client?.isCheckedIn}
            checkedindate={client?.checkedInDate}
            turn={client?.queueNumber}
            name={client.client?.name}
            phone={client.client?.phone}
            img={client.client?.photo}
            hashapp={client.client?.hasApp}
            submitDate={client?.submitDate}
            orderstatus={client?.orderstatus}
            message={client?.LilouCustomNotificationSentDate}
            message2={client?.LilouCustomNotificationSent}
            isCalled={client?.isCalled}
            callStatus={client?.callStatus}
          />
        </div>

        <div className="w-100 text-center mb-2">
          <div className="p-3 mb-2">
            <HoldPera>
              Are you sure you want to move the guest to seat list ?
            </HoldPera>
          </div>
          {localStorage.getItem("tableee") == "true" ? (
            <PopButtonGreen onClick={(e) => handleTables(router.query.seat)}>
              Yes
            </PopButtonGreen>
          ) : (
            <PopButtonGreen onClick={() => handleseat3(router.query.seat)}>
              Yes
            </PopButtonGreen>
          )}
        </div>
      </Modal>
      <Modal
        isOpen={!!router.query.hold}
        onAfterOpen={(e) => getclientdata(router.query.hold)}
        onRequestClose={() => router.push("")}
        portalClassName="modl"
        className="modal pops"
      >
        <div className="w-100 relative mt-3">
          <ImCross
            onClick={() => router.push("")}
            style={{ cursor: "pointer" }}
          />
          <PopCust
            dtl={false}
            createdat={client?.createdDate}
            minimumtime={client?.minmumTime}
            maximumtime={client?.maxTime}
            chairs={client?.maxGroupId}
            turn={client?.queueNumber}
            name={client.client?.name}
            checkedin={client?.isCheckedIn}
            checkedindate={client?.checkedInDate}
            phone={client.client?.phone}
            img={client.client?.photo}
            hashapp={client.client?.hasApp}
            submitDate={client?.submitDate}
            orderstatus={client?.orderstatus}
            message={client?.LilouCustomNotificationSentDate}
            message2={client?.LilouCustomNotificationSent}
            isCalled={client?.isCalled}
            callStatus={client?.callStatus}
          />
        </div>

        <div className="w-100 text-center mb-2">
          <div className="p-3 mb-2">
            <HoldPera>
              Are you sure you want to move the guest to HOLD list ?
            </HoldPera>
          </div>

          <PopButtonGreen onClick={(e) => handleHolds(router.query.hold)}>
            Yes
          </PopButtonGreen>
        </div>
      </Modal>

      <Modal
        isOpen={!!router.query.cancel}
        onAfterOpen={(e) => getclientdata(router.query.cancel)}
        onRequestClose={() => router.push("")}
        portalClassName="modl"
        className="modal pops"
      >
        <div className="w-100 relative mt-3">
          <ImCross
            onClick={() => router.push("")}
            style={{ cursor: "pointer" }}
          />
          <PopCust
            dtl={false}
            createdat={client?.createdDate}
            minimumtime={client?.minmumTime}
            maximumtime={client?.maxTime}
            chairs={client?.maxGroupId}
            turn={client?.queueNumber}
            name={client.client?.name}
            phone={client.client?.phone}
            checkedin={client?.isCheckedIn}
            checkedindate={client?.checkedInDate}
            img={client.client?.photo}
            hashapp={client.client?.hasApp}
            submitDate={client?.submitDate}
            orderstatus={client?.orderstatus}
            message={client?.LilouCustomNotificationSentDate}
            message2={client?.LilouCustomNotificationSent}
            isCalled={client?.isCalled}
            callStatus={client?.callStatus}
          />
        </div>

        <div className="w-100 text-center mb-2 centercancell">
          <div className="p-3 mb-2">
            <HoldPera>Are you sure you want to Cancel Guest ?</HoldPera>
          </div>
          <div className="cancelbuttons">
            <p
              key="2"
              onClick={() => setSelectedKey("2")}
              style={
                selectedKey === "2"
                  ? { backgroundColor: "white", color: "black" }
                  : { backgroundColor: "black", color: "white" }
              }
            >
              Customer Not answered
            </p>
            <p
              key="1"
              onClick={() => setSelectedKey("1")}
              style={
                selectedKey === "1"
                  ? { backgroundColor: "white", color: "black" }
                  : { backgroundColor: "black", color: "white" }
              }
            >
              Customer No Show
            </p>
            <p
              key="3"
              onClick={() => setSelectedKey("3")}
              style={
                selectedKey === "3"
                  ? { backgroundColor: "white", color: "black" }
                  : { backgroundColor: "black", color: "white" }
              }
            >
              Customer Cancelled
            </p>
            <p
              key="7"
              onClick={() => setSelectedKey("7")}
              style={
                selectedKey === "7"
                  ? { backgroundColor: "white", color: "black" }
                  : { backgroundColor: "black", color: "white" }
              }
            >
              Weather
            </p>
            <p
              key="8"
              onClick={() => setSelectedKey("8")}
              style={
                selectedKey === "8"
                  ? { backgroundColor: "white", color: "black" }
                  : { backgroundColor: "black", color: "white" }
              }
            >
              Other
            </p>
          </div>
          <PopButtonGreen onClick={(e) => handleCancels(router.query.cancel)}>
            Yes
          </PopButtonGreen>
        </div>
      </Modal>

      <Modal
        isOpen={!!router.query.namechange}
        onRequestClose={() => router.push("")}
        portalClassName="modl"
        className="modal pops"
      >
        <div className="w-100 relative mt-3">
          <PopCust dtl={false} />
        </div>

        <div className="w-100 text-center mb-2">
          <div className="p-3 mb-2">
            <ModlInp placeholder="Write new name" />
            <HoldPera>
              Are you sure you want to change the guests name ?
            </HoldPera>
          </div>
          <PopButtonGreen>Yes</PopButtonGreen>
        </div>
      </Modal>
    </>
  );
};

export default Layout;
