import NavComp from "./NavComp";
import CustList from "./CustList";
import { useState, useContext } from "react";
import Filter from "./Filter";
import { Empty, HoldPera, PopButtonGreen } from "../styled/common.styled";
import { GlobalContext } from "../../../contextApi/Provider";
import { useRouter } from "next/router";
import { ImCross } from "react-icons/im";
import { cancelClient } from "../../../helpers/apiCalls/apiPost";
import Modal from "react-modal";
import PopCust from "./PopCust";
import axios from "../../../config/instance";
import haversine from "haversine-distance";

const InsideHold = ({ TopTitle, w100 }) => {
  const router = useRouter();
  const {
    insidehold,
    authToken,
    searchnum,
    searchnumcode,
    chairq,
    seachcustomerinside,
    seachlocationinside,
    seachtimeinside,
    seachqueuepreorderinside,
    seachfamsinginside,
    seachqueueinside,
    api,
  } = useContext(GlobalContext);
  const [val, setVal] = useState(false);
  const [vall, setVall] = useState(false);
  const [Current, setCurrent] = useState(false);
  const token = authToken[0];

  const [client, setClient] = useState({});
  const getclientdata = async (e) => {
    try {
      const response = await axios.get(`/queue/get-by-userid?id=${e}`, {
        headers: {
          userToken: token,
        },
      });
      setClient(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [filter, setFilter] = useState(false);

  const handleToggle = () => {
    setFilter(!filter);
  };
  const handleCloseFilter = () => {
    setFilter(!filter);
  };

  const handleHome = () => {
    router.push("./");
  };

  const handleInside = () => {
    router.push("/hold/inside");
  };

  const handleseat = (e) => {
    setVal(true);
    setCurrent(e);
    getclientdata(e);
    searchnum[1]("");
  };

  const handleseat2 = (e) => {
    router.push("./table?qid=" + e);
    searchnum[1]("");
  };

  const handleseat3 = async (e) => {
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
      setVal(false);
      searchnum[1]("");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlecancel = (e) => {
    setVall(true);
    setCurrent(e);
    getclientdata(e);
    searchnum[1]("");
  };

  const [selectedKey, setSelectedKey] = useState(null);
  const handlecancel2 = async (e) => {
    let qid = { qId: e };
    let reason = { reason: selectedKey };
    await cancelClient(qid, reason, token);
    await api[1]("holdmain");
    setVall(false);
    searchnum[1]("");
  };

  const chaircounts = [
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "4" },
    { name: "5" },
    { name: "6" },
    { name: "7" },
    { name: "8" },
    { name: "9" },
    { name: "10" },
    { name: "11" },
    { name: "12" },
    { name: "13" },
    { name: "14" },
    { name: "15" },
    { name: "ALL" },
  ];

  const chaircounts2 = [
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "4" },
    { name: "5" },
    { name: "6" },
    { name: "ALL" },
  ];

  const [chaircount, setChaircount] = useState("ALL");
  const fillchair = (e) => {
    chairq[1](e);
  };
  const handleChaircountClick = (selectedChaircount) => {
    setChaircount(selectedChaircount);
    fillchair(selectedChaircount);
  };

  const _list = chaircounts.map((l) => (
    <p
      className={l.name === chaircount ? "active slide" : "slide"}
      key={l.name}
      onClick={() => handleChaircountClick(l.name)}
    >
      {l.name}
    </p>
  ));

  const _list2 = chaircounts2.map((l) => (
    <p
      className={l.name === chaircount ? "active2 slide" : "slide"}
      key={l.name}
      onClick={() => setChaircount(l.name)}
    >
      {l.name}
    </p>
  ));

  let queueIndex = 1;
  const ins = insidehold[0]

    .filter((i) => {
      if (searchnumcode[0] !== null) {
        return (
          i?.client?.country == searchnumcode[0] ||
          localStorage.getItem("numid")
        );
      } else {
        return i;
      }
    })
    .filter((i) => {
      if (chairq[0] !== "ALL") {
        let dadadada = i?.maxGroupId || 1?.gestNumber;
        const isMatch = dadadada == chairq[0];
        return isMatch;
      } else {
        return i;
      }
    })
    .filter((i) => {
      if (searchnum[0] !== "") {
        return i.client?.phone?.includes(searchnum[0]);
      } else {
        return i;
      }
    })
    .filter((i) => {
      if (seachcustomerinside[0] !== "All") {
        if (seachcustomerinside[0] === "Online") {
          return i;
        }
        if (seachcustomerinside[0] === "Premium") {
          return i?.IsPaid == false;
        }
        if (seachcustomerinside[0] === "Walk-in") {
          return i?.Channel == (0, 3);
        }
      } else {
        return i;
      }
    })

    .filter((i) => {
      if (seachlocationinside[0] !== "All") {
        if (seachlocationinside[0] === "Nearest") {
          const localStorageCoords = {
            latitude: parseFloat(localStorage.getItem("latitude")),
            longitude: parseFloat(localStorage.getItem("longitude")),
          };
          const propsCoords = {
            latitude: parseFloat(i?.client?.latitude),
            longitude: parseFloat(i?.client?.longitude),
          };
          const distanceMeters = haversine(localStorageCoords, propsCoords);
          const distanceKilometers = (distanceMeters / 1000).toFixed(0);
          i.distanceKilometers = distanceKilometers || 0;
          return i;
        }
        if (seachlocationinside[0] === "Check-in") {
          return i?.isCheckedIn?.includes(1);
        }
      } else {
        return i;
      }
    })
    .sort(function (a, b) {
      if (seachlocationinside[0] === "Nearest") {
        if (a.distanceKilometers < b.distanceKilometers) return -1;
        if (a.distanceKilometers > b.distanceKilometers) return 1;
      }
      return 0;
    })
    .filter((i, index) => {
      if (seachtimeinside[0] !== "All") {
        if (seachtimeinside[0] === "New booking" && index < 2) {
          return i;
        }
        if (
          seachtimeinside[0] === "Longest time" &&
          insidequeue[0].length <= index + 2
        ) {
          return i;
        }
      } else {
        return i;
      }
    })

    .filter((i) => {
      if (seachqueuepreorderinside[0] !== "All") {
        if (seachqueuepreorderinside[0] === "Pre-order") {
          return i?.hasOrder == true;
        }
        if (seachqueuepreorderinside[0] === "No Pre-order") {
          return i?.hasOrder == false;
        }
      } else {
        return i;
      }
    })

    .filter((i) => {
      if (i?.QueueSubTag == false) {
        if (seachfamsinginside[0] !== "All") {
          if (seachfamsinginside[0] === "Family") {
            return i?.QueueSubTag?.NameEn?.includes("family");
          }
          if (seachfamsinginside[0] === "Single") {
            return i?.QueueSubTag?.NameEn?.includes("single");
          }
        } else {
          return i;
        }
      } else {
        return i;
      }
    })

    .filter((i) => {
      if (i?.QueueTag == false) {
        if (seachqueueinside[0] !== "All") {
          return i?.QueueTag?.NameEn?.includes(seachqueueinside[0]);
        } else {
          return i;
        }
      } else {
        return i;
      }
    })

    .map((i, index) => (
      <CustList
        autoCancelMin={i?.autoCancelMin}
        key={index}
        id={i.id}
        isCheckedIn={i?.isCheckedIn}
        createdDate={i?.createdDate}
        isCalled={i?.isCalled}
        callStatus={i?.callStatus}
        orderstatus={i?.orderstatus}
        notifyDate={i?.notifyDate}
        LilouCustomNotificationSentDate={i?.LilouCustomNotificationSentDate}
        flag={i.client?.flag}
        restid={i.restID}
        hasApp={i.client.hasApp}
        queueNumber={queueIndex++}
        photo={i.client.photo}
        name={i.client.name}
        phone={i.client.phone}
        QueueSubTag={i?.QueueSubTag?.NameEn}
        QueueSubTag2={i?.QueueSubTag}
        queuetags={i?.QueueTag?.NameEn}
        queuetags2={i?.QueueTag}
        note={i?.note}
        hostnote={i?.ClientNote}
        gestNumber={i.maxGroupId}
        queueTime={i.queueTime}
        longitude={i?.client?.longitude}
        latitude={i?.client?.latitude}
        handleseat={(e) => handleseat(i.id)}
        handleseat2={(e) => handleseat2(i.id)}
        handlecancel={(e) => handlecancel(i.id)}
      ></CustList>
    ));

  return (
    <>
      <NavComp
        home={handleHome}
        count={insidehold[0].length > 0 ? insidehold[0].length : null}
        title={TopTitle}
        handleToggle={handleToggle}
        pathinsideoutside={handleInside}
        chaircounts={_list}
      ></NavComp>
      <div className="responsivenavbarinside">
        <div className="slider-containerresinside">
          <div className="responsiveslider">
            {/* {chaircounts2.map((count) => (
              <div key={count?.name}>{count?.name}</div>
            ))} */}
            {_list2}
          </div>
        </div>
      </div>
      {insidehold[0].length > 0 ? (
        <>
          {w100 ? (
            <>
              {filter ? (
                <Filter handleCloseFilter={handleCloseFilter} filterHead="" />
              ) : (
                ""
              )}
              <div>{ins}</div>
            </>
          ) : filter ? (
            <Filter
              handleCloseFilter={handleCloseFilter}
              filterHead="Inside filter"
            />
          ) : (
            <div>{ins}</div>
          )}
        </>
      ) : (
        <Empty>Empty Queue !</Empty>
      )}
      <Modal
        isOpen={val}
        onRequestClose={() => setVal(false)}
        portalClassName="modl"
        className="modal pops"
      >
        <div className="w-100 relative mt-3">
          <ImCross
            onClick={() => setVal(false)}
            style={{ cursor: "pointer" }}
          />
          <PopCust
            dtl={false}
            chairs={client?.maxGroupId}
            createdat={client?.createdDate}
            minimumtime={client?.minmumTime}
            maximumtime={client?.maxTime}
            turn={client?.queueNumber}
            name={client.client?.name}
            phone={client.client?.phone}
            img={client.client?.photo}
            checkedin={client?.isCheckedIn}
            checkedindate={client?.checkedInDate}
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
            <HoldPera>Are you sure you want to Seat ?</HoldPera>
          </div>
          {localStorage.getItem("tableee") == "true" ? (
            <PopButtonGreen onClick={() => handleseat2(Current)}>
              Yes
            </PopButtonGreen>
          ) : (
            <PopButtonGreen onClick={() => handleseat3(Current)}>
              Yes
            </PopButtonGreen>
          )}
        </div>
      </Modal>
      <Modal
        isOpen={vall}
        onRequestClose={() => setVall(false)}
        portalClassName="modl"
        className="modal pops"
      >
        <div className="w-100 relative mt-3">
          <ImCross
            onClick={() => setVall(false)}
            style={{ cursor: "pointer" }}
          />
          <PopCust
            dtl={false}
            chairs={client?.maxGroupId}
            createdat={client?.createdDate}
            minimumtime={client?.minmumTime}
            maximumtime={client?.maxTime}
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
            <HoldPera>Are you sure you want to Cancel Table?</HoldPera>
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
          <PopButtonGreen onClick={() => handlecancel2(Current)}>
            Yes
          </PopButtonGreen>
        </div>
      </Modal>
    </>
  );
};

export default InsideHold;
