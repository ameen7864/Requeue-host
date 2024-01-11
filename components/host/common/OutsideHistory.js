import NavComp from "./NavComp";
import CustList from "./CustList";
import { useState, useContext } from "react";
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

const OutsideHistory = ({ TopTitle, w100 }) => {
  const router = useRouter();

  const {
    outsidehistory,
    authToken,
    searchnum,
    searchnumcode,
    seachcustomeroutside,
    seachlocationoutside,
    seachtimeoutside,
    seachfamsingoutside,
    seachqueuepreorderoutside,
    seachqueueoutside,
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

  const handleOutside = () => {
    router.push("/history/outside");
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
  const out = outsidehistory[0]
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
      if (seachcustomeroutside[0] !== "All") {
        if (seachcustomeroutside[0] === "Online") {
          return i;
        }
        if (seachcustomeroutside[0] === "Premium") {
          return i?.IsPaid == false;
        }
        if (seachcustomeroutside[0] === "Walk-in") {
          return i?.Channel == (0, 3);
        }
      } else {
        return i;
      }
    })

    .filter((i) => {
      if (seachlocationoutside[0] !== "All") {
        if (seachlocationoutside[0] === "Nearest") {
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
        if (seachlocationoutside[0] === "Check-in") {
          return i?.isCheckedIn?.includes(1);
        }
      } else {
        return i;
      }
    })
    .sort(function (a, b) {
      if (seachlocationoutside[0] === "Nearest") {
        if (a.distanceKilometers < b.distanceKilometers) return -1;
        if (a.distanceKilometers > b.distanceKilometers) return 1;
      }
      return 0;
    })
    .filter((i) => {
      if (seachtimeoutside[0] !== "All") {
        if (seachtimeoutside[0] === "New booking" && index < 2) {
          return i;
        }
        if (
          seachtimeoutside[0] === "Longest time" &&
          insidequeue[0].length <= index + 2
        ) {
          return i;
        }
      } else {
        return i;
      }
    })

    .filter((i) => {
      if (seachqueuepreorderoutside[0] !== "All") {
        if (seachqueuepreorderoutside[0] === "Pre-order") {
          return i?.hasOrder == true;
        }
        if (seachqueuepreorderoutside[0] === "No Pre-order") {
          return i?.hasOrder == false;
        }
      } else {
        return i;
      }
    })

    .filter((i) => {
      if (i?.QueueSubTag == false) {
        if (seachfamsingoutside[0] !== "All") {
          if (seachfamsingoutside[0] === "Family") {
            return i?.QueueSubTag?.NameEn?.includes("family");
          }
          if (seachfamsingoutside[0] === "Single") {
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
        if (seachqueueoutside[0] !== "All") {
          return i?.QueueTag?.NameEn?.includes(seachqueueoutside[0]);
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
        count={outsidehistory[0].length > 0 ? outsidehistory[0].length : null}
        title={TopTitle}
        handleToggle={handleToggle}
        pathinsideoutside={handleOutside}
        chaircounts={_list}
      ></NavComp>
      <div className="responsivenavbaroutside">
        <div className="slider-containerresoutside">
          <div className="responsiveslider">
            {/* {chaircounts2.map((count) => (
              <div key={count?.name}>{count?.name}</div>
            ))} */}
            {_list2}
          </div>
        </div>
      </div>
      {outsidehistory[0].length > 0 ? (
        <>
          {w100 ? (
            <>
              {filter ? (
                <Filter handleCloseFilter={handleCloseFilter} filterHead="" />
              ) : (
                ""
              )}
              <div>{out}</div>
            </>
          ) : filter ? (
            <Filter
              handleCloseFilter={handleCloseFilter}
              filterHead="Outside filter"
            />
          ) : (
            <div>{out}</div>
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
          <PopButtonGreen onClick={() => handlehold2(Current)}>
            Yes
          </PopButtonGreen>
        </div>
      </Modal>
    </>
  );
};

export default OutsideHistory;
