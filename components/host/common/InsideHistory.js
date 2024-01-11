import NavComp from "./NavComp";
import CustList from "./CustList";
import { useState, useEffect, useContext } from "react";
import Filter from "./Filter";
import { Empty, HoldPera, PopButtonGreen } from "../styled/common.styled";
import { GlobalContext } from "../../../contextApi/Provider";
import { useRouter } from "next/router";
import { holdClient } from "../../../helpers/apiCalls/apiPost";
import Modal from "react-modal";
import PopCust from "./PopCust";
import { ImCross } from "react-icons/im";
import axios from "../../../config/instance";
import haversine from "haversine-distance";

const InsideHistory = ({ TopTitle, w100 }) => {
  const router = useRouter();
  const {
    insidehistory,
    authToken,
    searchnum,
    searchnumcode,
    seachcustomerinside,
    seachlocationinside,
    seachtimeinside,
    seachqueuepreorderinside,
    seachfamsinginside,
    seachqueueinside,
    api,
  } = useContext(GlobalContext);
  const token = authToken[0];
  const [val, setVal] = useState(false);
  const [Current, setCurrent] = useState(false);
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
    router.push("/history/inside");
  };

  const handlehold = (e) => {
    setVal(true);
    setCurrent(e);
    getclientdata(e);
    searchnum[1]("");
  };

  const handlehold2 = (e) => {
    let qid = { qId: e };
    holdClient(qid, token);
    api[1]("history");
    setVal(false);
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
  const _list = chaircounts.map((l) => (
    <p
      className={l.name === chaircount ? "active slide" : "slide"}
      key={l.name}
      onClick={() => setChaircount(l.name)}
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
  const ins = insidehistory[0]
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
      if (chaircount !== "ALL") {
        let dadadada = i?.maxGroupId || 1?.gestNumber;
        const isMatch = dadadada == chaircount;
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
        // history only
        historystatus={i?.status}
        checkoutdate={i?.checkoutDate}
        checkoutUserdata={
          i?.checkoutUserdata?.length > 0
            ? i?.checkoutUserdata[0].user_title
            : ""
        }
        fromHistory={true}
        isCalled={i?.isCalled}
        callStatus={i?.callStatus}
        orderstatus={i?.orderstatus}
        notifyDate={i?.notifyDate}
        LilouCustomNotificationSentDate={i?.LilouCustomNotificationSentDate}
        flag={i.client?.flag}
        restid={i.rest_id}
        hasApp={i.client?.hasApp}
        queueNumber={queueIndex++}
        photo={i.client?.photo}
        name={i.client?.name}
        phone={i.client?.phone}
        QueueSubTag={i?.QueueSubTag?.NameEn}
        QueueSubTag2={i?.QueueSubTag}
        queuetags={i?.QueueTag?.NameEn}
        queuetags2={i?.QueueTag}
        note={i?.note}
        hostnote={i?.ClientNote}
        gestNumber={i.minmumGroup}
        queueTime={i.queueTime}
        longitude={i?.client?.longitude}
        latitude={i?.client?.latitude}
        handleseat={(e) => handleseat(i.id)}
        handlehold={(e) => handlehold(i.id)}
        handlecancel={(e) => handlecancel(i.id)}
      ></CustList>
    ));

  return (
    <>
      <NavComp
        home={handleHome}
        count={insidehistory[0].length > 0 ? insidehistory[0].length : null}
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
      {insidehistory[0].length > 0 ? (
        <>
          {w100 ? (
            <>
              {filter ? (
                <Filter handleCloseFilter={handleCloseFilter} filterHead="" />
              ) : (
                ""
              )}
              <div>
                {/* <CustList queueNumber={inside.queueNumber} photo={inside.photo} name={inside.name} phone={inside.phone} gestNumber={inside.gestNumber} queueTime={inside.queueTime} distanceTime={inside.distanceTime} ></CustList> */}
                {ins}
              </div>
            </>
          ) : filter ? (
            <Filter
              handleCloseFilter={handleCloseFilter}
              filterHead="Inside filter"
            />
          ) : (
            <div>
              {/* <CustList queueNumber={inside.queueNumber} photo={inside.photo} name={inside.name} phone={inside.phone} gestNumber={inside.gestNumber} queueTime={inside.queueTime} distanceTime={inside.distanceTime} ></CustList> */}
              {ins}
            </div>
          )}
        </>
      ) : (
        <Empty>Empty Queue !</Empty>
      )}
      {/* Customer Hold*/}

      <Modal
        isOpen={val}
        onRequestClose={() => setVal(false)}
        portalClassName="modl"
        className="modal pops"
      >
        <div className="w-100 relative mt-3">
          {/* <h2 className="text-center"> <CgCloseO className="absolute-left pointer" onClick={() => router.push('')} /> <span className="v_middle"> Customer Details system </span> </h2> */}
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
            name={client?.client?.name}
            phone={client?.client?.phone}
            img={client?.client?.photo}
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
            <HoldPera>
              Are you sure you want to move the guest to HOLD list ?
            </HoldPera>
          </div>
          <PopButtonGreen onClick={() => handlehold2(Current)}>
            Yes
          </PopButtonGreen>
        </div>
      </Modal>

      {/* Customer Hold */}
    </>
  );
};

export default InsideHistory;
