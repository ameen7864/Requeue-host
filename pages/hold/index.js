import Layout from "../../components/host/Layout";
import Ofline from "../../components/host/common/Offline";
import { useState, useEffect, useContext } from "react";
import Message from "../../components/host/common/Message";
// import Modal from '../../components/host/common/Modal';
import InsideHold from "../../components/host/common/InsideHold";
import OutsideHold from "../../components/host/common/OutsideHold";
import {
  Hold,
  Home2Parent,
  HomeSingle,
} from "../../components/host/styled/common.styled";
import useLocalStorage from "../../helpers/useLocalStorage";
import MainParentLayout from "../../components/host/MainParentLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "../../config/instance";
import { GlobalContext } from "../../contextApi/Provider";

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
  const [allsettings, setAllsettings] = useState();

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
          userToken: token2,
        },
      })
      .then((response) => {
        setAllsettings(response.data);
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

  const [srlst, setSrlst] = useState();
  useEffect(() => {
    setIcn(msg === true ? "activeee" : "");
    setListViewCls(lst === true ? "activeee" : "");
    setGridViewCls(lst === true ? "" : "activeee");
    setSrlst(lst === true ? "list" : "grid");
  });
  useEffect(() => {
    localStorage.setItem("gridView", lst);
  }, [lst]);
  const handlecls = (e) => {
    setMsg(msg === true ? false : true);
    selectedIns[1]([]);
    SendMessage[1]("");
  };

  const [selection, setSelection] = useState({ name: "Select All" });
  const handleSelectselections = (e) => {
    setSelection(e);
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
    <MainParentLayout
      fullpage={
        <Hold>
          <Layout
            pagename="Hold"
            msg={() => {
              setMsg(msg === true ? false : true);
              console.log(msg);
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
                <Ofline styled="true"></Ofline>
                {msg === true ? (
                  <Message
                    list={selections}
                    value={selection.name}
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
                      onClick={() => setSelectedOption("Inside")}>
                      {anywhe?.value || anywhe?.extraValue || "inside"}
                    </button>
                    <button
                      className={`outbutonn${
                        selectedOption === "Outside" ? "activeee" : ""
                      }`}
                      onClick={() => setSelectedOption("Outside")}>
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
                  <Home2Parent className={`${srlst} ceYuKV`}>
                    {selectedOption === "Inside" && (
                      <HomeSingle className="w-100 relative hMpKGQ">
                        <InsideHold
                          TopTitle={
                            anywhe?.value || anywhe?.extraValue || "inside"
                          }
                        />
                      </HomeSingle>
                    )}
                    {selectedOption === "Outside" && (
                      <HomeSingle className="w-100 relative hMpKGQ">
                        <OutsideHold
                          TopTitle={
                            anywhe2?.value || anywhe2?.extraValue || "inside"
                          }
                        />
                      </HomeSingle>
                    )}
                  </Home2Parent>
                </div>
                <div className="nonresponsivewala">
                  <Home2Parent className={`${srlst} ceYuKV`}>
                    <HomeSingle className="w-100 relative hMpKGQ">
                      <InsideHold
                        TopTitle={
                          anywhe?.value || anywhe?.extraValue || "inside"
                        }
                      />
                    </HomeSingle>
                    <HomeSingle className="w-100 relative hMpKGQ">
                      <OutsideHold
                        TopTitle={
                          anywhe2?.value || anywhe2?.extraValue || "inside"
                        }
                      />
                    </HomeSingle>
                  </Home2Parent>
                </div>
              </div>
            }
          />
        </Hold>
      }
    />
  );
};

export default index;
