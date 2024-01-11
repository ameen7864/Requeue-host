import NavComp from "./NavComp";
import CustList from "./CustList";
import { useState, useEffect, useContext } from "react";
import Filter from "./Filter";
import { Empty } from "../styled/common.styled";
import { GlobalContext } from "../../../contextApi/Provider";
import { useRouter } from "next/router";
import haversine from "haversine-distance";

const Outside = ({ TopTitle, w100, Pre, subAreas }) => {
  const router = useRouter();

  const {
    outsidequeue,
    searchnum,
    SendMessage,
    selectedIns,
    searchnumcode,
    seachcustomeroutside,
    seachlocationoutside,
    seachtimeoutside,
    seachfamsingoutside,
    seachqueuepreorderoutside,
    seachqueueoutside,
  } = useContext(GlobalContext);
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
    router.push("/home/outside");
  };

  const handleseat = (e) => {
    router.push("?seat=" + e);
    searchnum[1]("");
  };

  const handlehold = (e) => {
    router.push("?hold=" + e);
    searchnum[1]("");
  };
  const handlecancel = (e) => {
    router.push("?cancel=" + e);
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

  const selectuser = (id) => {
    if (SendMessage[0]?.name == "Multiple Select") {
      if (selectedIns[0].includes(id)) {
        let a = selectedIns[0];
        const index = a.indexOf(id);
        if (index > -1) {
          a.splice(index, 1);
        }
        selectedIns[1](a);
      } else {
        selectedIns[1]([...selectedIns[0], id]);
      }
    }
  };

  let queueIndex = 1;
  const out = outsidequeue[0]
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
        clickedelement={selectedIns[0]}
        mesgclick={() => selectuser(i.client?.id)}
        key={index}
        id={i.id}
        isCheckedIn={i?.isCheckedIn}
        createdDate={i?.createdDate}
        isCalled={i?.isCalled}
        callStatus={i?.callStatus}
        orderstatus={i?.orderstatus}
        notifyDate={i?.notifyDate}
        LilouCustomNotificationSentDate={i?.LilouCustomNotificationSentDate}
        flag={i?.client?.flag}
        CustomerId={i.client?.id}
        restid={i.restID}
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
        gestNumber={i.maxGroupId}
        queueTime={i.queueTime}
        longitude={i?.client?.longitude}
        latitude={i?.client?.latitude}
        position={i.position}
        handleseat={(e) => handleseat(i.id)}
        handlehold={(e) => handlehold(i.id)}
        handlecancel={(e) => handlecancel(i.id)}
      ></CustList>
    ));

  return (
    <>
      <NavComp
        home={handleHome}
        count={outsidequeue[0].length > 0 ? outsidequeue[0].length : null}
        title={`${TopTitle} ${Pre}`}
        color={Pre === "FULL" ? "yellow" : Pre === "Closed" ? "red" : ""}
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
      {outsidequeue[0].length > 0 ? (
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
              subAreas={subAreas}
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
    </>
  );
};

export default Outside;
