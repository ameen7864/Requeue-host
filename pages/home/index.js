import Layout from "../../components/host/Layout";
import Ofline from "../../components/host/common/Offline";
import { useState, useEffect, useContext } from "react";
import Message from "../../components/host/common/Message";
import Inside from "../../components/host/common/Inside";
import Outside from "../../components/host/common/Outside";
import {
  Home2Parent,
  HomeSingle,
  QueueMain,
} from "../../components/host/styled/common.styled";
import useLocalStorage from "../../helpers/useLocalStorage";
import MainParentLayout from "../../components/host/MainParentLayout";
import { GlobalContext } from "../../contextApi/Provider";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "../../config/instance";

const index = () => {
  const { authToken, SendMessage, selectedIns } = useContext(GlobalContext);
  const token2 = authToken[0];
  const router = useRouter();
  const [grd, setGrd] = useLocalStorage("gridView");
  const [msg, setMsg] = useState(false);
  const [lst, setLst] = useState(grd);
  const [icn, setIcn] = useState();
  const [listViewCls, setListViewCls] = useState();
  const [gridViewCls, setGridViewCls] = useState();
  const [srlst, setSrlst] = useState();
  const [allsettings, setAllsettings] = useState();
  const [restSetting, setRestSetting] = useState();

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
        setAllsettings(response.data.result2);
        setRestSetting(response.data.result1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
  const setOutsidefull1 = restSetting?.outsideFull;
  const setInsidefull1 = restSetting?.insideFull;
  const outSideClosed = restSetting?.outsideActive;
  const inSideClosed = restSetting?.insideActive;

  const branchoffline1 = restSetting?.status == 1;
  const setBranchclose1 = restSetting?.isOpen;

  useEffect(() => {
    setIcn(msg === true ? "activeee" : "");
    setListViewCls(lst === true ? "activeee" : "");
    setGridViewCls(lst === true ? "" : "activeee");
    setSrlst(lst === true ? "list" : "grid");
  });

  useEffect(() => {
    localStorage.setItem("gridView", lst);
  }, [lst, restSetting]);

  const handlecls = (e) => {
    setMsg(msg === true ? false : true);
    selectedIns[1]([]);
    SendMessage[1]("");
  };

  const handleSelectselections = (e) => {
    SendMessage[1](e);
    if (e.name === "Multiple Select") {
      return;
    } else {
      selectedIns[1]([]);
    }
  };

  const selections = [
    { name: "Select All" },
    { name: "Inside" },
    { name: "Outside" },
    { name: "Multiple Select" },
  ];
  const [selectedOption, setSelectedOption] = useState("Inside");

  return (
    <>
      <MainParentLayout
        fullpage={
          <QueueMain>
            <Layout
              pagename="Queue"
              msg={() => {
                setMsg(msg === true ? false : true);
              }}
              listView={() => {
                setLst(lst === true ? false : true);
                localStorage.setItem("gridView", lst === true ? false : true);
              }}
              listViewCls={listViewCls}
              gridViewCls={gridViewCls}
              clas={icn}
              body={
                <div className="body">
                  <Ofline
                    isOpen={setBranchclose1}
                    isOffline={branchoffline1}
                    styled="true"
                  ></Ofline>
                  {msg === true ? (
                    <Message
                      list={selections}
                      value={SendMessage[0].name}
                      handleSelect={handleSelectselections}
                      handleclose={handlecls}
                    />
                  ) : (
                    ""
                  )}
                  <div className="inoutbutton1">
                    <div className="inoutbutton">
                      <button
                        className={`inbutonn${
                          selectedOption === "Inside" ? "activeee" : ""
                        }`}
                        onClick={() => setSelectedOption("Inside")}
                      >
                        {anywhe?.value || anywhe?.extraValue || "inside"}
                      </button>
                      <button
                        className={`outbutonn${
                          selectedOption === "Outside" ? "activeee" : ""
                        }`}
                        onClick={() => setSelectedOption("Outside")}
                      >
                        {anywhe2?.value || anywhe2?.extraValue || "outside"}
                      </button>
                    </div>
                    <div className="inoutbutton2">
                      <Link href={`${router.pathname}?addguest=addguest`}>
                        <button className="addguest">+ Add Guest</button>
                      </Link>
                    </div>
                  </div>
                  <div className="responsivewala">
                    <Home2Parent className={`${srlst} eGMMwe`}>
                      {selectedOption === "Inside" && (
                        <HomeSingle className="w-100 relative hMpKGQ">
                          <Inside
                            subAreas={nameEnList}
                            Pre={setInsidefull1 ? "FULL" : ""}
                            TopTitle={
                              anywhe?.value || anywhe?.extraValue || "inside"
                            }
                          />
                        </HomeSingle>
                      )}
                      {selectedOption === "Outside" && (
                        <HomeSingle className="w-100 relative hMpKGQ">
                          <Outside
                            subAreas={nameEnList1}
                            Pre={setOutsidefull1 ? "FULL" : ""}
                            TopTitle={
                              anywhe2?.value || anywhe2?.extraValue || "inside"
                            }
                          />
                        </HomeSingle>
                      )}
                    </Home2Parent>
                  </div>
                  <div className="nonresponsivewala">
                    <Home2Parent className={`${srlst} eGMMwe`}>
                      <HomeSingle className="w-100 relative hMpKGQ">
                        <Inside
                          subAreas={nameEnList}
                          Pre={
                            setInsidefull1
                              ? "FULL"
                              : !inSideClosed
                              ? "Closed"
                              : ""
                          }
                          TopTitle={
                            anywhe?.value || anywhe?.extraValue || "inside"
                          }
                        />
                      </HomeSingle>
                      <HomeSingle className="w-100 relative hMpKGQ">
                        <Outside
                          subAreas={nameEnList1}
                          Pre={
                            setOutsidefull1
                              ? "FULL"
                              : !outSideClosed
                              ? "Closed"
                              : ""
                          }
                          TopTitle={
                            anywhe2?.value || anywhe2?.extraValue || "Outside"
                          }
                        />
                      </HomeSingle>
                    </Home2Parent>
                  </div>
                </div>
              }
            />
          </QueueMain>
        }
      />
    </>
  );
};

export default index;
