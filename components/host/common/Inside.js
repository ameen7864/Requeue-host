import NavComp from "./NavComp";
import CustList from "./CustList";
import { useState, useContext } from "react";
import Filter from "./Filter";
import { Empty } from "../styled/common.styled";
import { GlobalContext } from "../../../contextApi/Provider";
import { useRouter } from "next/router";
import haversine from "haversine-distance";

const Inside = ({ TopTitle, w100, Pre, subAreas }) => {
  const router = useRouter();
  const {
    insidequeue,
    authToken,
    searchnum,
    SendMessage,
    selectedIns,
    searchnumcode,
    seachcustomerinside,
    seachlocationinside,
    seachtimeinside,
    seachqueuepreorderinside,
    seachfamsinginside,
    seachqueueinside,
  } = useContext(GlobalContext);
  const token = authToken[0];
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
    router.push("/home/inside");
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
  const ins = insidequeue[0]
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
      // console.log(i?.Channel);
      if (seachcustomerinside[0] !== "All") {
        if (seachcustomerinside[0] === "Online") {
          return i?.Channel == 1;
        }
        if (seachcustomerinside[0] === "Premium") {
          return i?.isPremium == true;
        }
        if (seachcustomerinside[0] === "Walk-in") {
          return i?.Channel == 0 || i?.Channel == 3;
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
        clickedelement={selectedIns[0]}
        mesgclick={() => selectuser(i?.client?.id)}
        key={index}
        id={i?.id}
        isCheckedIn={i?.isCheckedIn}
        createdDate={i?.createdDate}
        isCalled={i?.isCalled}
        callStatus={i?.callStatus}
        orderstatus={i?.orderstatus}
        notifyDate={i?.notifyDate}
        LilouCustomNotificationSentDate={i?.LilouCustomNotificationSentDate}
        flag={i?.client?.flag}
        restid={i?.restID}
        CustomerId={i?.client?.id}
        hasApp={i?.client?.hasApp}
        queueNumber={index + 1}
        photo={i?.client?.photo}
        name={i?.client?.name}
        phone={i?.client?.phone}
        QueueSubTag={i?.QueueSubTag?.NameEn}
        QueueSubTag2={i?.QueueSubTag}
        queuetags={i?.QueueTag?.NameEn}
        queuetags2={i?.QueueTag}
        note={i?.note}
        position={i?.position}
        hostnote={i?.ClientNote}
        gestNumber={i?.minmumGroupId}
        queueTime={i?.queueTime}
        longitude={i?.client?.longitude}
        latitude={i?.client?.latitude}
        handleseat={(e) => handleseat(i?.id)}
        handlecancel={(e) => handlecancel(i?.id)}
        handlehold={(e) => handlehold(i.id)}
        toggleSelection={() => toggleInsSelection(i?.id)}
      ></CustList>
    ));

  return (
    <>
      <div className="insidecss">
        <NavComp
          home={handleHome}
          count={insidequeue[0].length > 0 ? insidequeue[0].length : null}
          title={`${TopTitle} ${Pre}`}
          color={Pre === "Full" ? "yellow" : Pre === "Closed" ? "red" : ""}
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
        {insidequeue[0].length > 0 ? (
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
                subAreas={subAreas}
              />
            ) : (
              <div>{ins}</div>
            )}
          </>
        ) : (
          <Empty>Empty Queue!</Empty>
        )}
      </div>
    </>
  );
};

export default Inside;
