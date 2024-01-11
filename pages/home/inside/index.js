import Layout from "../../../components/host/Layout";
import Ofline from "../../../components/host/common/Offline";
import { useState, useEffect, useContext } from "react";
import Message from "../../../components/host/common/Message";
import Modal from "../../../components/host/common/Modal";
import Inside from "../../../components/host/common/Inside";
import Outside from "../../../components/host/common/Outside";
import {
  Home2Parent,
  HomeSingle,
  QueueMain,
} from "../../../components/host/styled/common.styled";
import useLocalStorage from "../../../helpers/useLocalStorage";
import MainParentLayout from "../../../components/host/MainParentLayout";
import axios from "../../../config/instance";
import { GlobalContext } from "../../../contextApi/Provider";

const index = () => {
  const { authToken, SendMessage, selectedIns } = useContext(GlobalContext);
  const token2 = authToken[0];
  const [grd, setGrd] = useLocalStorage("gridView");
  const [msg, setMsg] = useState(false);
  const [lst, setLst] = useState(grd);
  const [icn, setIcn] = useState();
  const [listViewCls, setListViewCls] = useState();
  const [gridViewCls, setGridViewCls] = useState();
  const [allsettings, setAllsettings] = useState();
  // const [showModal, setShowModal] = useState(false);

  const [srlst, setSrlst] = useState();
  useEffect(() => {
    setIcn(msg === true ? "active" : "");
    // setLst(localStorage.getItem('gridView')? false : localStorage.getItem('gridView'));
    setListViewCls(lst === true ? "active" : "");
    setGridViewCls(lst === true ? "" : "active");
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

  return (
    <>
      <MainParentLayout
        fullpage={
          <QueueMain>
            <Layout
              pagename="Queue"
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
              fromInner="../"
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
                  <Home2Parent className={srlst}>
                    <HomeSingle className="w-100 wwfilter">
                      <Inside
                        TopTitle={
                          anywhe?.value || anywhe?.extraValue || "inside"
                        }
                        w100={true}
                      />
                    </HomeSingle>
                  </Home2Parent>
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
