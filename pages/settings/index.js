import { useRouter } from "next/router";
import { FlexHspace, FlexH } from "../../components/host/styled/global.styled";
import ThemeChanger from "../../components/host/common/ThemeChanger";
import { FaChevronLeft, FaRegPaperPlane } from "react-icons/fa";
import { MdSettings, MdOutlineNotificationsActive } from "react-icons/md";
import { GoPrimitiveDot } from "react-icons/go";
import { MdAddToPhotos } from "react-icons/md";
import {
  SettingsBox,
  GridForTwo,
  EditSetting,
  InputSettings,
  SaveSetting,
  StyledModalHeader,
  SpacedFlex,
  SaveModl,
  ModlTextarea,
  DangerPera,
} from "../../components/host/styled/common.styled";
import Switch from "../../components/host/common/input/Switch";
import { useState, useEffect, useContext } from "react";
import Select from "../../components/host/common/input/Select";
import Link from "next/link";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";
import { CgCloseO } from "react-icons/cg";
import { OpeningInputModal } from "../../components/host/common/input/OpeningInputModal";
import { ClosingInputModal } from "../../components/host/common/input/ClosingInputModal";
import DaysModal from "../../components/host/common/DaysModal";
import OpeningAndClosingDays from "../../components/host/common/OpeningAndClosingDays";
import { GetLocalStorage } from "../../helpers/localStorage";
import { GlobalContext } from "../../contextApi/Provider";
import { settingsData } from "../../helpers/apiCalls/apiGet";
import MainParentLayout from "../../components/host/MainParentLayout";
import { getCookie } from "cookies-next";
import {
  handleAutocancelPost,
  handleAutoholdPost,
  handleAutonotificationmessagePost,
  handleBranchFullPost,
  handlebranchOpen,
  handlebranchStatus,
  handlecancelReasonRequired,
  handleCloseinsidePost,
  handleCloseoutsidePost,
  handleCustommessagePost,
  handleInsideAutofullPost,
  handleInsideFullPost,
  handleInsideNamePost,
  handlemaxChairs,
  handleOutsideAutofullPost,
  handleOutsideFullPost,
  handleOutsideNamePost,
  handleShowAnywhereAreasPost,
  handleShowInsidePost,
  handleShowOutsidePost,
  handleSpecialareaPost,
  handleUserHoldStatus,
} from "../../helpers/apiCalls/apiPost";
import axios from "../../config/instance";
import Addopeningandclosing from "../../components/host/common/Addopeningandclosing";

Modal.setAppElement("#__next");
Modal.defaultStyles.overlay.backgroundColor = "rgb(36 38 39 / 85%)";

const index = () => {
  const [changes, setchanges] = useState(true);
  const loadings = (val) => {
    setchanges(val);
  };
  const { authToken, loading, settings } = useContext(GlobalContext);
  const token2 = authToken[0];
  const [resturantdata, setResturantdata] = useState([]);
  // console.log(resturantdata);
  const cancelauto = resturantdata?.result2?.find((item) => {
    if (item.title == "AutoCancel") {
      return item;
    }
  });
  // console.log(cancelauto?.extraValue)
  const anywhe = resturantdata?.result2?.find((item) => {
    if (item.title == "Hide_AnyArea") {
      return item;
    }
  });

  const anywhe2 = resturantdata?.result2?.find((item) => {
    if (item.title == "Inside_Name") {
      return item;
    }
  });

  const anywhe3 = resturantdata?.result2?.find((item) => {
    if (item.title == "Outside_Name") {
      return item;
    }
  });

  const holdauto = resturantdata?.result2?.find((item) => {
    if (item.title == "AutoHold") {
      return item;
    }
  });

  const outfullauto = resturantdata?.result2?.find((item) => {
    if (item.title == "AutoFull_OutSide") {
      return item;
    }
  });

  // console.log(outfullauto?.extraValue)
  const hideOutside1 = resturantdata?.result2?.find((item) => {
    if (item.title == "Hide_Outside") {
      return item;
    }
  });

  const infullauto = resturantdata?.result2?.find((item) => {
    if (item.title == "AutoFull_InSide") {
      return item;
    }
  });

  const hideInside1 = resturantdata?.result2?.find((item) => {
    if (item.title == "Hide_Inside") {
      return item;
    }
  });

  const autocancel1 = cancelauto?.value == 1;
  const anywherearea1 = anywhe?.value == true;
  const autohold1 = holdauto?.value == 1;
  const setAutofulloutside1 = outfullauto?.value == 1;
  const setShowoutside1 = hideOutside1?.value == true;
  const setAutofullinside1 = infullauto?.value == 1;
  const setShowinside1 = hideInside1?.value == true;
  const branchoffline1 = resturantdata?.result1?.status == 1;
  const setBranchclose1 = resturantdata?.result1?.isOpen == true;
  const setSpecialarea1 = resturantdata?.result1?.EnableQueueTags == true;
  const setBranchfull1 = resturantdata?.result1?.isFull == true;
  const setOutsidefull1 = resturantdata?.result1?.outsideFull == true;
  const setInsidefull1 = resturantdata?.result1?.insideFull == true;
  const setCloseoutside1 = resturantdata?.result1?.outsideActive == true;
  const setCloseinside1 = resturantdata?.result1?.insideActive == true;
  const maxoutsidechair = resturantdata?.result1?.maxOutside;
  const maxinsidechair = resturantdata?.result1?.maxInside;
  const lilumesageen = resturantdata?.result1?.LilouCustomMessageEn;
  const lilumesagear = resturantdata?.result1?.LilouCustomMessageAr;
  const automesageen = resturantdata?.result1?.LilouNotificationMessageEn;
  const automesagear = resturantdata?.result1?.LilouNotificationMessageAr;
  const automesaget = resturantdata?.result1?.LilouNotificationNumber;
  // console.log(resturantdata);

  const router = useRouter();

  const [autohold, setAutohold] = useState(autohold1);
  const [autocancel, setAutocancel] = useState(autocancel1);
  const handelAutocancel = (e) => {
    if (!autohold) {
      setAutocancel(!autocancel);
      let data = {
        autoCancel: !autocancel,
        autoCancelMinutes: parseInt(selectedcancelTime),
      };
      let token = authToken[0] ? authToken[0] : getCookie("token");
      handleAutocancelPost(data, token)
        .then((response) => {
          if (response.data.success) {
            console.log("done");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Not able to use autocancel and autohold together");
    }
  };

  const handelAutohold = (e) => {
    if (!autocancel) {
      setAutohold(!autohold);
      let data = {
        autoHold: !autohold,
        autoHoldMinutes: parseInt(selectedholdTime),
      };
      let token = authToken[0] ? authToken[0] : getCookie("token");
      handleAutoholdPost(data, token)
        .then((response) => {
          if (response.data.success) {
            console.log("done");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Not able to use autocancel and autohold together");
    }
  };

  const [branchoffline, setBranchoffline] = useState(branchoffline1);
  const handelBranchoffline = (e) => {
    setBranchoffline(!branchoffline);
    let data = { status: !branchoffline ? "Offline" : "Online" };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handlebranchStatus(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [branchclose, setBranchclose] = useState(setBranchclose1);
  const handelBranchclose = (e) => {
    setBranchclose(!branchclose);
    let data = { isOpen: !branchclose };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handlebranchOpen(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [specialarea, setSpecialarea] = useState(setSpecialarea1);
  const handelSpecialarea = (e) => {
    setSpecialarea(!specialarea);

    let data = { enableQueueTags: !specialarea };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleSpecialareaPost(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [anywherearea, setAnywherearea] = useState(anywherearea1);
  const handelAnywherearea = (e) => {
    setAnywherearea(!anywherearea);
    let data = { HideAnyArea: !anywherearea };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleShowAnywhereAreasPost(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [branchfull, setBranchfull] = useState(setBranchfull1);
  const handelBranchfull = (e) => {
    setBranchfull(!branchfull);
    let data = { isFull: !branchfull };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleBranchFullPost(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [outsidefull, setOutsidefull] = useState(setOutsidefull1);
  const handelOutsidefull = (e) => {
    setOutsidefull(!outsidefull);
    let data = { outsideFull: !outsidefull };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleOutsideFullPost(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [insidefull, setInsidefull] = useState(setInsidefull1);
  const handelInsidefull = (e) => {
    setInsidefull(!insidefull);
    let data = { insideFull: !insidefull };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleInsideFullPost(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [closeoutside, setCloseoutside] = useState(setCloseoutside1);
  const handelCloseoutside = (e) => {
    setCloseoutside(!closeoutside);

    let data = { outsideActive: !closeoutside };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleCloseoutsidePost(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [autofulloutside, setAutofulloutside] = useState(setAutofulloutside1);
  // console.log(autofulloutside)
  const handelAutofulloutside = (e) => {
    setAutofulloutside(!autofulloutside);

    let data = {
      AutoFull: !autofulloutside,
      AutoFullValue: parseInt(selecetedautofulloutsideselect),
    };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleOutsideAutofullPost(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [showoutside, setShowoutside] = useState(setShowoutside1);
  const handelShowoutside = (e) => {
    setShowoutside(!showoutside);

    let data = { HideOutside: !showoutside };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleShowOutsidePost(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [closeinside, setCloseinside] = useState(setCloseinside1);
  const handelCloseinside = (e) => {
    setCloseinside(!closeinside);

    let data = { insideActive: !closeinside };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleCloseinsidePost(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [autofullinside, setAutofullinside] = useState(setAutofullinside1);
  const handelAutofullinside = (e) => {
    setAutofullinside(!autofullinside);

    let data = {
      AutoFull: !autofullinside,
      AutoFullValue: parseInt(selecetedautofullinsideselect),
    };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleInsideAutofullPost(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [showinside, setShowinside] = useState(setShowinside1);
  const handelShowinside = (e) => {
    setShowinside(!showinside);
    let data = { HideInside: !showinside };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleShowInsidePost(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setAutocancel(autocancel1);
    setBranchoffline(branchoffline1);
    setBranchclose(setBranchclose1);
    setSpecialarea(setSpecialarea1);
    setAnywherearea(anywherearea1);
    setAutohold(autohold1);
    setBranchfull(setBranchfull1);
    setOutsidefull(setOutsidefull1);
    setInsidefull(setInsidefull1);
    setCloseoutside(setCloseoutside1);
    setAutofulloutside(setAutofulloutside1);
    setShowoutside(setShowoutside1);
    setCloseinside(setCloseinside1);
    setAutofullinside(setAutofullinside1);
    setShowinside(setShowinside1);
  }, [
    autocancel1,
    branchoffline1,
    setBranchclose1,
    setSpecialarea1,
    anywherearea1,
    autohold1,
    setBranchfull1,
    setOutsidefull1,
    setInsidefull1,
    setCloseoutside1,
    setAutofulloutside1,
    setShowoutside1,
    setCloseinside1,
    setAutofullinside1,
    setShowinside1,
  ]);

  const [outsideNameEn, setOutsideNameEn] = useState("");
  const [outsideNameAr, setOutsideNameAr] = useState("");
  const [indiseNameEn, setIndiseNameEn] = useState("");
  const [indiseNameAr, setIndiseNameAr] = useState("");

  const handleoutsideNameEn = (e) => {
    setOutsideNameEn(e.target.value);
  };
  const handleoutsideNameAr = (e) => {
    setOutsideNameAr(e.target.value);
  };
  const handleindiseNameEn = (e) => {
    setIndiseNameEn(e.target.value);
  };
  const handleindiseNameAr = (e) => {
    setIndiseNameAr(e.target.value);
  };

  const [lastpage, setLastpage] = useState();

  useEffect(() => {
    setLastpage(
      GetLocalStorage("lastPage") ? GetLocalStorage("lastPage") : "/host/home"
    );
    setIndiseNameEn(anywhe2?.value);
    setIndiseNameAr(anywhe2?.extraValue);
    setOutsideNameEn(anywhe3?.value);
    setOutsideNameAr(anywhe3?.extraValue);
  }, [anywhe2, anywhe3]);

  let rows = [],
    i = 0,
    len = 100;
  while (i <= len) {
    rows.push(i);
    i++;
  }
  const _rows = rows.map(function (i) {
    return { name: i };
  });

  //   console.log(_rows);
  const cancelTime = _rows;
  const [selectedcancelTime, setSelecetedcancelTime] = useState(0);
  useEffect(() => {
    setSelecetedcancelTime(cancelauto?.extraValue);
  }, [cancelauto?.extraValue]);
  const handleselectedcancelTime = (e) => {
    setSelecetedcancelTime(e.target.value);
    let data = {
      autoCancel: autocancel,
      autoCancelMinutes: parseInt(e.target.value),
    };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleAutocancelPost(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const holdTime = _rows;
  const [selectedholdTime, setSelecetedholdTime] = useState("");
  useEffect(() => {
    setSelecetedholdTime(holdauto?.extraValue);
  }, [holdauto?.extraValue]);
  const handleselectedholdTime = (e) => {
    setSelecetedholdTime(e.target.value);
    let data = {
      autoHold: autohold,
      autoHoldMinutes: parseInt(e.target.value),
    };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleAutoholdPost(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const autofulloutsideselect = _rows;
  const [selecetedautofulloutsideselect, setSelecetedautofulloutsideselect] =
    useState(0);

  useEffect(() => {
    setSelecetedautofulloutsideselect(outfullauto?.extraValue);
  }, [outfullauto?.extraValue]);

  const handleselecetedautofulloutsideselect = (e) => {
    setSelecetedautofulloutsideselect(e.target.value);
    let data = {
      AutoFull: autofulloutside,
      AutoFullValue: parseInt(e.target.value),
    };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleOutsideAutofullPost(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const maxchairsoutsideselect = _rows;
  const [selecetedmaxchairsoutsideselect, setSelecetedmaxchairsoutsideselect] =
    useState("");

  useEffect(() => {
    setSelecetedmaxchairsoutsideselect(maxoutsidechair);
  }, [maxoutsidechair]);
  const handleselecetedmaxchairsoutsideselect = (e) => {
    setSelecetedmaxchairsoutsideselect(e.target.value);
    let data = { chairs: e.target.value, tablePosition: "outside" };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handlemaxChairs(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const autofullinsideselect = _rows;
  const [selecetedautofullinsideselect, setSelecetedautofullinsideselect] =
    useState(0);

  useEffect(() => {
    setSelecetedautofullinsideselect(infullauto?.extraValue);
  }, [infullauto?.extraValue]);
  const handleselecetedautofullinsideselect = (e) => {
    setSelecetedautofullinsideselect(e.target.value);
    let data = {
      AutoFull: autofullinside,
      AutoFullValue: parseInt(e.target.value),
    };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleInsideAutofullPost(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const maxchairsinsideselect = _rows;
  const [selecetedmaxchairsinsideselect, setSelecetedmaxchairsinsideselect] =
    useState();

  useEffect(() => {
    setSelecetedmaxchairsinsideselect(maxinsidechair);
  }, [maxinsidechair]);
  const handleselecetedmaxchairsinsideselect = (e) => {
    setSelecetedmaxchairsinsideselect(e.target.value);
    let data = { chairs: e.target.value, tablePosition: "inside" };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handlemaxChairs(data, token)
      .then((response) => {
        if (response.data.success) {
          console.log("done");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const turnnotification = _rows;
  const [selectedturnnotification, setSelecetedturnnotification] = useState("");
  const handleselectedturnnotification = (e) => {
    setSelecetedturnnotification(e.target.value);
  };

  const [autonotificationmessage, setAutonotificationmessage] = useState({
    NotificationMessageEn: "",
    NotificationMessageAr: "",
  });

  useEffect(() => {
    setSelecetedturnnotification(automesaget);
    setAutonotificationmessage({
      NotificationMessageEn: automesageen,
      NotificationMessageAr: automesagear,
    });
  }, [automesaget, automesageen, automesagear]);

  const handleAutonotificationmessage = (e) => {
    const { name, value } = e.target;
    setAutonotificationmessage({ ...autonotificationmessage, [name]: value });
    // console.log(autonotificationmessage);
  };

  const handleSubmitAutonotificationmessage = (e) => {
    let data = {
      LilouNotificationMessageEn: autonotificationmessage.NotificationMessageEn,
      lilouNotificationMessageAr: autonotificationmessage.NotificationMessageAr,
      LilouNotificationNumber: selectedturnnotification,
    };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleAutonotificationmessagePost(data, token)
      .then((response) => {
        if (response.data.success) {
          alert("Data Updated");
          router.push("settings");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [custommessage, setCustommessage] = useState({
    CustomMessageEn: "",
    CustomMessageAr: "",
  });

  useEffect(() => {
    setCustommessage({
      CustomMessageEn: lilumesageen,
      CustomMessageAr: lilumesagear,
    });
  }, [lilumesageen, lilumesagear]);

  const handleCustommessage = (e) => {
    const { name, value } = e.target;
    setCustommessage({ ...custommessage, [name]: value });
  };

  const handleSubmitCustommessage = (e) => {
    let data = {
      LilouCustomMessageEn: custommessage.CustomMessageEn,
      LilouCustomMessageAr: custommessage.CustomMessageAr,
    };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleCustommessagePost(data, token)
      .then((response) => {
        if (response.data.success) {
          alert("Data Updated");
          router.push("settings");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          userToken: token2,
        },
      })
      .then((response) => {
        setResturantdata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleOutsideNameToggle = () => {
    let data = { OutsideNameEn: outsideNameEn, OutsideNameAr: outsideNameAr };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleOutsideNamePost(data, token)
      .then((response) => {
        if (response.data.success) {
          // alert("Data Updated");
          router.reload("settings");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInsideNameToggle = () => {
    let data = { InsideNameEn: indiseNameEn, InsideNameAr: indiseNameAr };
    let token = authToken[0] ? authToken[0] : getCookie("token");
    handleInsideNamePost(data, token)
      .then((response) => {
        if (response.data.success) {
          // alert("Data Updated");
          router.reload("settings");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [open, setopen] = useState(false);
  const handleAddNewTime = () => {
    setopen(true);
  };

  return (
    <MainParentLayout
      fullpage={
        <>
          <div className="container pb-4">
            <FlexHspace className="mt-5 settings">
              <Link href={lastpage + "?profile=profile"}>
                <div className="bck" style={{ cursor: "pointer" }}>
                  <FaChevronLeft className="v_middle" />{" "}
                  <span className="v_middle backcss">Go Back</span>
                </div>
              </Link>
              <h3 className="m-0">
                <MdSettings className="v_middle" />{" "}
                <span className="v_middle">Setting</span>{" "}
              </h3>
              <ThemeChanger></ThemeChanger>
            </FlexHspace>
            <GridForTwo className="fgMyFx">
              <SettingsBox>
                <h3>
                  <GoPrimitiveDot className="v_middle" />{" "}
                  <span className="v_middle">Cancel</span>
                </h3>
                <div className="pl-4 pr-4">
                  <ul className="listUnstyled pl-0">
                    <li className="F-50 mt-4">
                      <div>
                        <p>Auto cancel</p>
                      </div>
                      <div className="F-50">
                        <div>
                          {/* {!autohold ? ( */}
                          <Switch
                            check={autocancel ? 1 : 0}
                            onChange={handelAutocancel}
                            disabled={!autohold}
                          />
                          {/* // ) : (
                          //   ""
                          // )} */}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignContent: "center",
                            alignItems: "center",
                          }}>
                          {/* {!autohold ? (
                            autocancel ? ( */}
                          <Select
                            options={cancelTime}
                            selectedval={selectedcancelTime}
                            handlesetSelecetedValue={handleselectedcancelTime}
                          />
                          {/* <p style={{ marginLeft: 10 }}> Min</p> */}
                          {/* ) : (
                              ""
                            )
                          ) : (
                            ""
                          )} */}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </SettingsBox>
              <SettingsBox>
                <h3>
                  <GoPrimitiveDot className="v_middle" />{" "}
                  <span className="v_middle">Current status </span>
                </h3>
                <div className="pl-4 pr-4">
                  <ul className="listUnstyled pl-0">
                    <li className="F-50 mt-4">
                      <div className="w-100">
                        <p>Branche Offline</p>
                      </div>
                      <div className="F-50">
                        <div>
                          <Switch
                            check={branchoffline ? 1 : 0}
                            onChange={handelBranchoffline}
                          />
                        </div>
                      </div>
                    </li>
                    <li className="F-50  mt-4">
                      <div className="w-100">
                        <p>Branche close</p>
                      </div>
                      <div className="F-50">
                        <div>
                          <Switch
                            check={branchclose ? false : true}
                            onChange={handelBranchclose}
                          />
                        </div>
                      </div>
                    </li>
                    <li className="F-50  mt-4">
                      <div className="w-100">
                        <p>Opening and closing system</p>
                      </div>
                      <div className="F-50">
                        <div>
                          <Link
                            href={`${router.pathname}?openingAndClosing=openingAndClosing`}
                            as={`${router.pathname}/openingAndClosing`}>
                            <EditSetting className="kBnxep">Edit</EditSetting>
                          </Link>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </SettingsBox>
              <SettingsBox>
                <h3>
                  <GoPrimitiveDot className="v_middle" />{" "}
                  <span className="v_middle">Notifications </span>
                </h3>

                <div className="pl-4 pr-4">
                  <ul className="listUnstyled pl-0">
                    <li className="F-50 mt-4">
                      <div className="w-100">
                        <p>
                          Message Customized{" "}
                          <FaRegPaperPlane className="v_middle fsize30 ml-2" />
                        </p>
                      </div>
                      <div className="F-50">
                        <div>
                          <Link
                            href={`${router.pathname}?editCustomizedMessage=editCustomizedMessage`}
                            as={`${router.pathname}/editCustomizedMessage`}>
                            <EditSetting className="kBnxep">Edit</EditSetting>
                          </Link>
                        </div>
                      </div>
                    </li>
                    <li className="F-50  mt-4">
                      <div className="w-100">
                        <p>
                          Auto Notification{" "}
                          <MdOutlineNotificationsActive className="v_middle fsize30 ml-2" />
                        </p>
                      </div>
                      <div className="F-50">
                        <div>
                          <Link
                            href={`${router.pathname}?editAutoNotification=editAutoNotification`}
                            as={`${router.pathname}/editAutoNotification`}>
                            <EditSetting className="kBnxep">Edit</EditSetting>
                          </Link>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </SettingsBox>
              <SettingsBox>
                <h3>
                  <GoPrimitiveDot className="v_middle" />{" "}
                  <span className="v_middle">Area </span>
                </h3>
                <div className="pl-4 pr-4">
                  <ul className="listUnstyled pl-0">
                    <li className="F-50  mt-4">
                      <div className="w-100">
                        <p>Special areas</p>
                      </div>
                      <div className="F-50">
                        <div>
                          <Switch
                            check={specialarea ? true : false}
                            onChange={handelSpecialarea}
                          />
                        </div>
                      </div>
                    </li>
                    <li className="F-50  mt-4">
                      <div className="w-100">
                        <p>Show anywhere area</p>
                      </div>
                      <div className="F-50">
                        <div>
                          <Switch
                            check={anywherearea ? true : false}
                            onChange={handelAnywherearea}
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </SettingsBox>
              <SettingsBox>
                <h3>
                  <GoPrimitiveDot className="v_middle" />{" "}
                  <span className="v_middle">Hold</span>
                </h3>
                <div className="pl-4 pr-4">
                  <ul className="listUnstyled pl-0">
                    <li className="F-50 mt-4">
                      <div>
                        <p>Auto hold</p>
                      </div>
                      <div className="F-50">
                        <div>
                          {/* {!autocancel ? ( */}
                          <Switch
                            check={autohold ? true : false}
                            onChange={handelAutohold}
                            disabled={autocancel}
                          />

                          {/* ) : (
                            ""
                          )} */}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                          }}>
                          {/* {!autocancel ? (
                            autohold ? ( */}
                          <Select
                            options={holdTime}
                            selectedval={selectedholdTime}
                            handlesetSelecetedValue={handleselectedholdTime}
                          />
                          {/* <p style={{ marginLeft: 10 }}> Min</p> */}

                          {/* ) : (
                              ""
                            )
                          ) : (
                            ""
                          )} */}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </SettingsBox>
              <SettingsBox>
                <h3>
                  <GoPrimitiveDot className="v_middle" />{" "}
                  <span className="v_middle">Full</span>
                </h3>
                <div className="pl-4 pr-4">
                  <ul className="listUnstyled pl-0">
                    <li className="F-50 mt-4">
                      <div className="w-100">
                        <p>Branche Full</p>
                      </div>
                      <div className="F-50">
                        <div>
                          <Switch
                            check={branchfull ? true : false}
                            onChange={handelBranchfull}
                          />
                        </div>
                      </div>
                    </li>
                    <li className="F-50  mt-4">
                      <div className="w-100">
                        <p>Outside Full</p>
                      </div>
                      <div className="F-50">
                        <div>
                          <Switch
                            check={outsidefull ? true : false}
                            onChange={handelOutsidefull}
                          />
                        </div>
                      </div>
                    </li>
                    <li className="F-50  mt-4">
                      <div className="w-100">
                        <p>Inside Full</p>
                      </div>
                      <div className="F-50">
                        <div>
                          <Switch
                            check={insidefull ? true : false}
                            onChange={handelInsidefull}
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </SettingsBox>

              <SettingsBox>
                <h3>
                  <GoPrimitiveDot className="v_middle" />{" "}
                  <span className="v_middle">Outside area</span>{" "}
                  <SaveSetting onClick={handleOutsideNameToggle}>
                    Save
                  </SaveSetting>{" "}
                </h3>

                <div className="pl-4 pr-4">
                  <ul className="listUnstyled pl-0">
                    <li className="F-50 mt-4 langcss">
                      <div className="w-100 p-2">
                        <p className="mb-2">English</p>
                        <InputSettings
                          className="w-100"
                          value={outsideNameEn}
                          onChange={handleoutsideNameEn}
                          placeholder="Change outside name  "
                        />
                      </div>
                      <div className="w-100  p-2">
                        <p className="mb-2">Arabic</p>
                        <InputSettings
                          className="w-100 arabic"
                          value={outsideNameAr}
                          onChange={handleoutsideNameAr}
                          placeholder="Change outside name  "
                        />
                      </div>
                    </li>
                    <li className="F-50  mt-4">
                      <div className="pl-5 F-50 w-100">
                        <div className="pl-3 pr-3 pt-2   w-75">
                          <ul className="listUnstyled listUnstyled2 pl-0">
                            <li className="F-50  mt-4">
                              <div className="w-75">
                                <p>Close outside</p>
                              </div>
                              <div className="w-25">
                                <div>
                                  <Switch
                                    check={closeoutside ? false : true}
                                    onChange={handelCloseoutside}
                                  />
                                </div>
                              </div>
                            </li>
                            <li className="F-50  mt-4">
                              <div className="w-75">
                                <p>Auto full</p>
                              </div>
                              <div className="w-25">
                                <div>
                                  <Switch
                                    check={autofulloutside ? true : false}
                                    onChange={handelAutofulloutside}
                                  />
                                </div>
                              </div>
                            </li>
                            <li className="F-50  mt-4">
                              <div className="w-75">
                                <p>Show outside area</p>
                              </div>
                              <div className="w-25">
                                <div>
                                  <Switch
                                    check={showoutside ? true : false}
                                    onChange={handelShowoutside}
                                  />
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="pl-3 pr-3 pt-2 flex-v-center  w-25">
                          <ul className="listUnstyled pl-0">
                            <li className="F-50  mt-4">
                              <div
                                className="outsidecss"
                                style={{ marginTop: "-80px" }}>
                                <Select
                                  options={autofulloutsideselect}
                                  selectedval={selecetedautofulloutsideselect}
                                  handlesetSelecetedValue={
                                    handleselecetedautofulloutsideselect
                                  }
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>

                    <li className="F-50 mt-4 maxchaircss">
                      <div className="pl-5 F-50 w-100">
                        <div className="pl-3 pr-3   pb-2 w-75">
                          <p>Maximum chairs</p>
                        </div>
                        <div className="pl-3 pr-3  pb-2 w-25">
                          <div>
                            <Select
                              options={maxchairsoutsideselect}
                              selectedval={selecetedmaxchairsoutsideselect}
                              handlesetSelecetedValue={
                                handleselecetedmaxchairsoutsideselect
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </SettingsBox>

              <SettingsBox>
                <h3>
                  <GoPrimitiveDot className="v_middle" />{" "}
                  <span className="v_middle">inside area</span>{" "}
                  <SaveSetting onClick={handleInsideNameToggle}>
                    Save
                  </SaveSetting>{" "}
                </h3>

                <div className="pl-4 pr-4">
                  <ul className="listUnstyled pl-0">
                    <li className="F-50 mt-4 langcss">
                      <div className="w-100 p-2">
                        <p className="mb-2">English</p>
                        <InputSettings
                          className="w-100"
                          value={indiseNameEn}
                          onChange={handleindiseNameEn}
                          placeholder="Change inside name  "
                        />
                      </div>
                      <div className="w-100  p-2">
                        <p className="mb-2">Arabic</p>
                        <InputSettings
                          className="w-100 arabic"
                          value={indiseNameAr}
                          onChange={handleindiseNameAr}
                          placeholder="Change inside name  "
                        />
                      </div>
                    </li>
                    <li className="F-50  mt-4">
                      <div className="pl-5 F-50 w-100">
                        <div className="pl-3 pr-3 pt-2   w-75">
                          <ul className="listUnstyled listUnstyled2 pl-0">
                            <li className="F-50  mt-4">
                              <div className="w-75">
                                <p>Close inside</p>
                              </div>
                              <div className="w-25">
                                <div>
                                  <Switch
                                    check={closeinside ? false : true}
                                    onChange={handelCloseinside}
                                  />
                                </div>
                              </div>
                            </li>
                            <li className="F-50  mt-4">
                              <div className="w-75">
                                <p>Auto full</p>
                              </div>
                              <div className="w-25">
                                <div>
                                  <Switch
                                    check={autofullinside ? 1 : 0}
                                    onChange={handelAutofullinside}
                                  />
                                </div>
                              </div>
                            </li>
                            <li className="F-50  mt-4">
                              <div className="w-75">
                                <p>Show inside area</p>
                              </div>
                              <div className="w-25">
                                <div>
                                  <Switch
                                    check={showinside ? true : false}
                                    onChange={handelShowinside}
                                  />
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="pl-3 pr-3 pt-2 flex-v-center  w-25">
                          <ul className="listUnstyled pl-0">
                            <li className="F-50  mt-4">
                              <div className="outsidecss2">
                                <Select
                                  options={autofullinsideselect}
                                  selectedval={selecetedautofullinsideselect}
                                  handlesetSelecetedValue={
                                    handleselecetedautofullinsideselect
                                  }
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>

                    <li className="F-50 mt-4 maxchaircss">
                      <div className="pl-5 F-50 w-100">
                        <div className="pl-3 pr-3   pb-2 w-75">
                          <p>Maximum chairs</p>
                        </div>
                        <div className="pl-3 pr-3  pb-2 w-25">
                          <div>
                            <Select
                              options={maxchairsinsideselect}
                              selectedval={selecetedmaxchairsinsideselect}
                              handlesetSelecetedValue={
                                handleselecetedmaxchairsinsideselect
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </SettingsBox>
            </GridForTwo>
          </div>

          {/* Customized Message */}

          <Modal
            isOpen={!!router.query.editCustomizedMessage}
            onRequestClose={() => router.push("")}
            portalClassName="modl"
            className="modal">
            <div className="w-100">
              <h2 className="text-center">
                {" "}
                <CgCloseO
                  className="absolute-left pointer"
                  onClick={() => router.push("")}
                />{" "}
                <FaRegPaperPlane className="v_middle fsize30 mr-2" />{" "}
                <span className="v_middle"> Message Customized </span>{" "}
              </h2>
            </div>
            <FlexH className="mt-5 mb-5 gap pl-5 pr-5">
              <div className="w-100">
                <p className="text-center m-0">English</p>
                <ModlTextarea
                  className=""
                  id="textareaModal"
                  name="CustomMessageEn"
                  value={custommessage.CustomMessageEn}
                  onChange={handleCustommessage}
                  placeholder="ADD NOTE ( OPTIONAL )"
                />
              </div>
              <div className="w-100 ">
                <p className="text-center m-0">Arabic</p>
                <ModlTextarea
                  className="arabic text-right"
                  id="textareaModal"
                  name="CustomMessageAr"
                  value={custommessage.CustomMessageAr}
                  onChange={handleCustommessage}
                  placeholder="ADD NOTE ( OPTIONAL )"
                />
              </div>
            </FlexH>
            <div className="w-100 text-center mb-2">
              <SaveModl onClick={handleSubmitCustommessage}>Save</SaveModl>
            </div>
          </Modal>
          {/* Customized Message */}

          {/* Auto Notification */}
          <Modal
            isOpen={!!router.query.editAutoNotification}
            onRequestClose={() => router.push("")}
            portalClassName="modl"
            className="modal">
            <div className="w-100 relative">
              <h2 className="text-center">
                {" "}
                <CgCloseO
                  className="absolute-left pointer"
                  onClick={() => router.push("")}
                />{" "}
                <MdOutlineNotificationsActive className="v_middle fsize30 mr-2" />{" "}
                <span className="v_middle"> Auto Notification </span>{" "}
              </h2>
              <div className="absolute-right top-sp">
                <DangerPera className="">
                  Automatically send to turn #
                </DangerPera>
                <div className="flex-center">
                  <Select
                    options={turnnotification}
                    selectedval={selectedturnnotification}
                    handlesetSelecetedValue={handleselectedturnnotification}
                  />
                </div>
              </div>
            </div>
            <FlexH className="mt-5 mb-5 gap pl-5 pr-5">
              <div className="w-100">
                <p className="text-center m-0">English</p>
                <ModlTextarea
                  className=""
                  id="textareaModal"
                  name="NotificationMessageEn"
                  defaultValue={autonotificationmessage.NotificationMessageEn}
                  placeholder="ADD NOTE ( OPTIONAL )"
                  onChange={handleAutonotificationmessage}
                />
              </div>
              <div className="w-100 ">
                <p className="text-center m-0">Arabic</p>
                <ModlTextarea
                  className="arabic text-right"
                  id="textareaModal"
                  name="NotificationMessageAr"
                  defaultValue={autonotificationmessage.NotificationMessageAr}
                  placeholder="ADD NOTE ( OPTIONAL )"
                  onChange={handleAutonotificationmessage}
                />
              </div>
            </FlexH>
            <div className="w-100 text-center mb-2">
              <SaveModl onClick={handleSubmitAutonotificationmessage}>
                Save
              </SaveModl>
            </div>
          </Modal>

          {/* Auto Notification */}

          {/* Opening and CLosing */}

          <Modal
            isOpen={!!router.query.openingAndClosing}
            onRequestClose={() => router.push("")}
            portalClassName="modl"
            className="modal mddll">
            <div className="w-100 relative">
              <h2 className="text-center">
                {open ? (
                  <div
                    className="bck"
                    onClick={() => setopen(!open)}
                    style={{ cursor: "pointer" }}>
                    <FaChevronLeft className="v_middle" />{" "}
                    <span className="v_middle backcss">Go Back</span>
                  </div>
                ) : (
                  <CgCloseO
                    className="absolute-left pointer"
                    onClick={() => router.push("")}
                  />
                )}
                <span className="v_middle"> Opening and closing system </span>
              </h2>
            </div>
            {open ? null : (
              <div
                className="absolute_right"
                onClick={handleAddNewTime}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "10%",
                }}>
                <span>Add new schedule</span>
                <i style={{ margin: "0 0 0 17px" }}>
                  <MdAddToPhotos />
                </i>
              </div>
            )}

            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {open ? (
                <Addopeningandclosing openedd={setopen} />
              ) : (
                <OpeningAndClosingDays />
              )}
            </div>
          </Modal>

          {/* Opening and CLosing */}
        </>
      }
    />
  );
};

export default index;
