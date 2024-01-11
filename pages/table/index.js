import axios from "../../config/instance";
import Link from "next/link";
import moment from "moment";
import "react-calendar/dist/Calendar.css";

import Calendar from "react-calendar";
import TableFilter from "../../components/host/common/TableFilter";
import {
  BodyTable,
  FlexTableHeaderCloseParent,
  HoldPera,
  PopButtonGreen,
  SideBarParentTable,
  TableHeaderParent,
  TablePage,
} from "../../components/host/styled/common.styled";
import { FlexHLeft } from "../../components/host/styled/global.styled";
import { VscChromeClose } from "react-icons/vsc";
import SmallSummaryTable from "../../components/host/common/SmallSummaryTable";
import LargeSummaryTable from "../../components/host/common/LargeSummaryTable";
import TablesGrid from "../../components/host/common/TablesGrid";
import { useContext, useEffect, useState } from "react";
import { GetLocalStorage } from "../../helpers/localStorage";
import MainParentLayout from "../../components/host/MainParentLayout";
import { tablesData } from "../../helpers/apiCalls/apiGet";
import { GlobalContext } from "../../contextApi/Provider";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { ImCross, ImClock } from "react-icons/im";
import { AiFillPrinter, AiOutlineCheckCircle } from "react-icons/ai";
import { handleReleaseTable, seatClient } from "../../helpers/apiCalls/apiPost";
import { Modal } from "antd";
import { io } from "socket.io-client";
import ReactModal from "react-modal";
import PopCust from "../../components/host/common/PopCust";
import LargeSummaryTablee from "../../components/host/common/LargeSummaryTablee";

function index() {
  const { authToken, loading, tablesdata, api } = useContext(GlobalContext);

  const [inside, setInside] = useState([]);
  const [seated, setSeated] = useState(null);
  const [val, setVal] = useState(false);
  const router = useRouter();
  const qqid = router.query.qid;
  const ins = inside?.map((i, index) => (
    <SmallSummaryTable
      id={i.id}
      idx={i.id}
      cls={qqid}
      key={index}
      personImg={i.client?.photo ? i.client?.photo : "../img/Profile.png"}
      personName={i.client_name}
      inside={i.gestNumber}
      chairs={i.gestNumber}
      seatingarea={i.tag?.name}
      subseatingarea={i.tag?.subName}
    />
  ));

  function updateQueueEmit() {
    const socket = io("https://orderapi.requeue.com");
    let rest = getCookie("Rest");
    socket.emit("orderSocketApi", {
      restid: rest,
      type: "host",
    });
  }

  const [lastpage, setLastpage] = useState("home");

  const [tableslist, setTableslist] = useState([]);
  const [tablestats, setTablestats] = useState([]);
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

  useEffect(() => {
    setLastpage(
      GetLocalStorage("lastPage") ? GetLocalStorage("lastPage") : "home"
    );

    loading[1](true);
    const token = getCookie("token");
    if (token) {
      authToken[1](token);
      tablesData(token)
        .then((response) => {
          if (response.data.success) {
            tablesdata[1](response.data.data);
            setTableslist(response.data.data);
            setTablestats(response.data.data);

            loading[1](false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      authToken[1]();
      router.push("login");
      loading[1](true);
    }
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

  let restid = getCookie("Rest");
  let token = getCookie("token");
  const [sidedetails, setSidedetails] = useState([]);
  // console.log(sidedetails?.queue?.recordset[0]?.qId)
  // console.log(sidedetails, "yeah sidedetails ha" )
  const [history, setHistory] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/table/get-tbale-history?tableId=${sidedetails.id}&startDate=${formattedDate}&endDate=${currentdate}&restId=${restid}&`,
        {
          headers: {
            userToken: token,
          },
        }
      );
      setHistory(response?.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [value, onChange] = useState(new Date());
  const date = new Date(value);

  const formattedDate = date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const currentdate = new Date().toLocaleDateString("en-CA");

  const [Order, setOrder] = useState([]);
  const [total, setTotal] = useState("");

  const fetchData2 = async () => {
    try {
      const response = await axios.get(`/table/order?queid=${qqqiidd}`, {
        headers: {
          userToken: token,
        },
      });
      setOrder(response?.data?.data[0]?.item);
      setTotal(response?.data?.data[0]?.subtotal);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (sidedetails?.id) {
      fetchData2();
      setOpen4(true);
    } else {
      null;
    }
  }, [sidedetails]);

  const [selectedtable, setSelectedtable] = useState(0);

  const qqqiidd = sidedetails?.queue?.recordset[0].qId;

  const [changeid, setChangeid] = useState(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const showModal2 = () => {
    setOpen2(true);
  };
  const showModal3 = () => {
    setOpen3(true);
  };

  // const handleSeatCustomerr = (e, qqqiidd) => {
  //   let token = getCookie("token");
  //   let qtid = { qId: qqqiidd, tableIds: e };
  //   seatClient(qtid, token);
  // };

  const changetable = async (e) => {
    let token = getCookie("token");
    try {
      await axios.patch(
        `/table/change?qMapId=${e}&tableId=${changeid}`,
        {},
        {
          headers: {
            userToken: token,
          },
        }
      );
      setSeated(null);
      setSidedetails([]);
      api[1]("tablesmain");
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      let id = sidedetails.queue.recordset[0].id;
      changetable(id);
    }, 1000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleTableSelect = async (e, at) => {
    setSelectedtable(e);
    const selection = tablesdata[0]?.tables.find((element) => element.id == e);
    setSidedetails(selection);
    console.log(sidedetails);
    if (!selection.isAvailable === false) {
      setSeated(null);
    }
    if (!selection.isAvailable) {
      let token = getCookie("token");
      const response = await axios.get(`/table/data?tableId=${selection.id}`, {
        headers: {
          "Content-Type": "application/json",
          userToken: token,
          lang: "english",
        },
      });
      setSeated(response.data.data[0]);
    }
  };

  const handleSeatCustomer = async (e) => {
    let token = getCookie("token");
    let qtid = { qId: qqid, tableIds: e };
    await seatClient(qtid, token);
    api[1]("tables");
    updateQueueEmit();
    router.push("/home");
  };

  const handleReleasecustomer = (e, el) => {
    setVal(true);
    getclientdata(el);
  };
  const handleReleasecustomerbtn = (val) => {
    // console.log(val)
    let userId = localStorage.getItem("userID");
    let token = getCookie("token");
    let data = { id: val, checkoutUser: userId };
    handleReleaseTable(data, token)
      .then((response) => {
        if (response.data.success) {
          setSeated(null);
          setSidedetails([]);
          api[1]("tablesmain");
          // router.reload(window.location.pathname);
          // window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setVal(false);
  };
  const [outsideindise, setOutsideindise] = useState("ALL");
  const [availibility, setAvailibility] = useState("ALL");
  const [familysingle, setFamilysingle] = useState("ALL");
  const [seatingarea, setSeatingarea] = useState("ALL");
  const [listingtoshow, setListingtoshow] = useState("ALL");

  const handlePrint = () => {
    const printContents = document.getElementById("print-section");
    if (printContents) {
      const printWindow = window.open("", "_blank");
      const printDocument =
        document.implementation.createHTMLDocument("Print Document");
      printDocument.body.innerHTML = printContents.innerHTML;
      printWindow.document.write(printDocument.documentElement.outerHTML);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <>
      <MainParentLayout
        fullpage={
          <TablePage>
            <div className="container">
              <FlexHLeft className="gap">
                <SideBarParentTable className="jzqTwt">
                  <TableHeaderParent>
                    <FlexTableHeaderCloseParent>
                      <Link href={lastpage}>
                        <div className="close">
                          <VscChromeClose />
                        </div>
                      </Link>
                      {qqid ? (
                        <h1 className="opacity-0">.</h1>
                      ) : (
                        <h1> Table Floor</h1>
                      )}
                    </FlexTableHeaderCloseParent>
                  </TableHeaderParent>
                  <div className="pl-3 pr-3">
                    {qqid ? (
                      ins
                    ) : (
                      <SmallSummaryTable
                        totaltablescount={tablestats?.totalTables}
                        busycount={tablestats?.totalUnavailableTables}
                        availablecount={tablestats?.totalAvailableTables}
                      />
                    )}
                  </div>
                  {sidedetails?.queue ? (
                    <LargeSummaryTable
                      available={sidedetails.isAvailable}
                      tableno={sidedetails.name}
                      personImg={
                        seated?.avatar
                          ? seated.avatar
                          : require("../../public/img/Profile.png")
                      }
                      personName={
                        sidedetails.isAvailable ? "" : seated?.client_name
                      }
                      personNumber={
                        sidedetails.isAvailable ? "" : seated?.client_phone
                      }
                      position={seated?.position || ""}
                      chairs={sidedetails.chaires}
                      seatingarea={
                        sidedetails.tags?.length <= 1
                          ? ""
                          : sidedetails.tags?.name
                      }
                      subseatingarea={
                        sidedetails.tags?.length <= 1
                          ? ""
                          : sidedetails.tags?.name
                      }
                      handleSeat={(e) => handleSeatCustomer(sidedetails.id)}
                      handleRelease={(e) => {
                        handleReleasecustomer(
                          sidedetails.id,
                          sidedetails?.queue?.recordset[0]?.qId
                        );
                      }}
                      handlechangetable={(e) => {
                        showModal();
                      }}
                      handleshowtablehistory={(e) => {
                        showModal2();
                      }}
                      handleordersDetails={(e) => {
                        showModal3();
                      }}
                      reseat={
                        sidedetails.queue
                          ? qqid === sidedetails.queue.qId
                            ? true
                            : false
                          : ""
                      }
                    />
                  ) : (
                    <LargeSummaryTable
                      available={sidedetails.isAvailable}
                      tableno={sidedetails.name}
                      inside={
                        sidedetails.position === 0 ? sidedetails.chares : ""
                      }
                      outside={
                        sidedetails.position === 1 ? sidedetails.chares : ""
                      }
                      chairs={sidedetails.chares}
                      seatingarea={
                        sidedetails.tags?.length <= 1
                          ? ""
                          : sidedetails.tags?.name
                      }
                      subseatingarea={
                        sidedetails.tags?.length <= 1 ? "" : sidedetails.tagName
                      }
                      handleSeat={(e) => handleSeatCustomer(sidedetails.id)}
                    />
                  )}
                </SideBarParentTable>

                <BodyTable>
                  <TableHeaderParent>
                    <TableFilter
                      outSideSubArea={nameEnList1}
                      inSideSubArea={nameEnList}
                      outsideindise={outsideindise}
                      setOutsideindise={setOutsideindise}
                      availibility={availibility}
                      setAvailibility={setAvailibility}
                      familysingle={familysingle}
                      setFamilysingle={setFamilysingle}
                      seatingarea={seatingarea}
                      setSeatingarea={setSeatingarea}
                      listingtoshow={listingtoshow}
                      setListingtoshow={setListingtoshow}></TableFilter>
                  </TableHeaderParent>
                  <TablesGrid
                    data={{
                      outsideindise: [outsideindise, setOutsideindise],
                      availibility: [availibility, setAvailibility],
                      familysingle: [familysingle, setFamilysingle],
                      seatingarea: [seatingarea, setSeatingarea],
                      listingtoshow: [listingtoshow, setListingtoshow],
                    }}
                    tablelist={tablesdata}
                    selectedtable={selectedtable}
                    handleTableSelect={handleTableSelect}
                  />
                </BodyTable>
              </FlexHLeft>
            </div>
          </TablePage>
        }
      />

      <Modal
        title="Change Table"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <select
          style={{
            width: "100%",
            border: "1px solid black",
            backgroundColor: "white",
            color: "black",
            borderRadius: "5px",
            padding: "8px",
            fontSize: "16px",
          }}
          value={changeid}
          onChange={(e) => setChangeid(e.target.value)}>
          <option value="">Select table</option>
          {tablestats?.tables
            ?.filter((item) => item.isAvailable)
            ?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </Modal>

      <ReactModal
        isOpen={val}
        portalClassName="modl"
        onRequestClose={() => setVal(false)}
        className="modal pops">
        <div className="w-100 relative mt-3">
          <ImCross
            onClick={() => setVal(false)}
            style={{ cursor: "pointer" }}
          />
          <PopCust
            dtl={false}
            chairs={client?.maxGroupId}
            turn={client?.SeatedTurn}
            name={client?.client?.name}
            phone={client?.client?.phone}
            img={client?.client?.photo}
            hashapp={client?.client?.hasApp}
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
            <HoldPera>Are you sure you want to Release table ?</HoldPera>
          </div>
          <PopButtonGreen
            onClick={() => handleReleasecustomerbtn(sidedetails.id)}>
            Yes
          </PopButtonGreen>
        </div>
      </ReactModal>

      <ReactModal
        isOpen={open2}
        portalClassName="modl"
        onRequestClose={() => setOpen2(false)}
        className="modal"
        style={{ width: "1075px !important", overflow: "auto" }}>
        <div className="w-100 relative mt-3">
          <ImCross
            onClick={() => setOpen2(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "-36px",
          }}>
          <ImClock style={{ marginRight: "10px" }} />
          <h3>Table history</h3>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <div>
              <h2>{sidedetails?.name}</h2>
              <p>
                {sidedetails?.position === 0
                  ? "Inside"
                  : sidedetails?.position === 1
                  ? "Outside"
                  : "Any"}
              </p>
              <p>Terrase-Balcony</p>
            </div>
            <div className="calenderrr">
              <Calendar onChange={onChange} value={value} />
            </div>
            <div
              className="w-100 text-center mb-2"
              style={{ position: "relative", top: "40px" }}>
              <PopButtonGreen onClick={() => fetchData()}>
                Search
              </PopButtonGreen>
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>CUSTOMER DETAILS</p>
              <p>TIME SEAT</p>
              <p>TIME RELEASE</p>
            </div>
            <div
              style={{
                height: "500px",
                overflow: "auto",
                marginBottom: "20px",
              }}>
              {history?.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    borderRadius: "30px",
                    height: "75px",
                    marginBottom: "10px",
                  }}>
                  <div
                    style={{
                      marginLeft: "10px",
                    }}>
                    <p style={{ color: "black" }}>{item?.client_name}</p>
                    <p
                      style={{
                        color: "skyblue",
                        position: "relative",
                        top: "-10px",
                      }}>
                      {item?.client_phone}
                    </p>
                  </div>
                  <p
                    style={{
                      color: "black",
                      position: "relative",
                      left: "20px",
                    }}>
                    {item?.setDate
                      ? new Date(item?.setDate).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })
                      : "--"}
                  </p>
                  <p style={{ color: "black", marginRight: "10px" }}>
                    {item?.leftDate
                      ? new Date(item?.leftDate).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })
                      : "--"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ReactModal>

      <ReactModal
        isOpen={open3}
        portalClassName="modl"
        onRequestClose={() => setOpen3(false)}
        className="modal"
        style={{ width: "1075px !important" }}>
        <div className="w-100 relative mt-3">
          <ImCross
            onClick={() => setOpen3(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "-36px",
          }}>
          <h3>Order Details</h3>
          <div
            style={{
              position: "absolute",
              display: "flex",
              right: "20px",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handlePrint}>
            <AiFillPrinter style={{ marginLeft: "10px" }} />
            <p style={{ position: "relative", top: "-10px" }}>Print Order</p>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "40%" }}>
            <LargeSummaryTablee
              available={sidedetails.isAvailable}
              tableno={sidedetails.name}
              personImg={
                seated?.avatar
                  ? seated.avatar
                  : require("../../public/img/Profile.png")
              }
              personName={sidedetails.isAvailable ? "" : seated?.client_name}
              personNumber={sidedetails.isAvailable ? "" : seated?.client_phone}
              position={seated?.position || ""}
              chairs={sidedetails.chaires}
              seatingarea={
                sidedetails.tags?.length <= 1 ? "" : sidedetails.tags?.name
              }
              subseatingarea={
                sidedetails.tags?.length <= 1 ? "" : sidedetails.tags?.name
              }
            />
          </div>
          <div
            id="print-section"
            style={{
              width: "50%",
              marginLeft: "10%",
              backgroundColor: "aliceblue",
              borderRadius: "10px",
              overflow: "auto",
            }}>
            <div style={{ display: "flex" }}>
              <p
                style={{
                  color: "black",
                  width: "100%",
                  maxHeight: "500px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "25px",
                }}>
                Pre-Order
              </p>
            </div>
            <div style={{ overflowY: "scroll", height: "300px" }}>
              {Order?.map((item, index) => (
                <div
                  key={index}
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ position: "relative", left: "25px" }}>
                    <p style={{ color: "black" }}>
                      {item?.nameEn}
                      <span style={{ marginLeft: "10px", fontSize: "20px" }}>
                        {item?.qty}
                      </span>
                    </p>
                    <p
                      style={{
                        color: "black",
                        position: "relative",
                        top: "-10px",
                      }}>
                      {item?.note ? item?.note : "--"}
                    </p>
                  </div>
                  <div style={{ position: "relative", right: "25px" }}>
                    <p style={{ color: "black" }}>{item?.price} KD</p>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                position: "absolute",
                bottom: "6%",
                right: "35px",
              }}>
              <p style={{ color: "black" }}>TOTAL PRICE</p>
              <p
                style={{
                  color: "black",
                  position: "relative",
                  left: "-10px",
                  top: "-35px",
                  fontSize: "25px",
                }}>
                {total ? Number(total).toFixed(2) : "N/A"} KD
              </p>
              <p
                style={{
                  color: "#4BE0C2",
                  position: "relative",
                  top: "-71px",
                  right: "12px",
                }}>
                Payed <AiOutlineCheckCircle />{" "}
              </p>
            </div>
          </div>
        </div>
        <div
          className="w-100 text-center mb-2"
          style={{ position: "relative", top: "40px" }}>
          <PopButtonGreen
            style={{ marginBottom: "30px" }}
            onClick={() => setOpen3(false)}>
            Yes
          </PopButtonGreen>
        </div>
      </ReactModal>

      <ReactModal
        isOpen={open4}
        portalClassName="modl mobile"
        onRequestClose={() => setOpen4(false)}
        className="modal"
        style={{ width: "1075px !important" }}>
        {sidedetails?.queue ? (
          <LargeSummaryTable
            available={sidedetails.isAvailable}
            tableno={sidedetails.name}
            personImg={
              seated?.avatar
                ? seated.avatar
                : require("../../public/img/Profile.png")
            }
            personName={sidedetails.isAvailable ? "" : seated?.client_name}
            personNumber={sidedetails.isAvailable ? "" : seated?.client_phone}
            position={seated?.position || ""}
            chairs={sidedetails.chaires}
            seatingarea={
              sidedetails.tags?.length <= 1 ? "" : sidedetails.tags?.name
            }
            subseatingarea={
              sidedetails.tags?.length <= 1 ? "" : sidedetails.tags?.name
            }
            handleSeat={(e) => handleSeatCustomer(sidedetails.id)}
            handleRelease={(e) => {
              handleReleasecustomer(
                sidedetails.id,
                sidedetails?.queue?.recordset[0]?.qId
              );
            }}
            handlechangetable={(e) => {
              showModal();
            }}
            handleshowtablehistory={(e) => {
              showModal2();
            }}
            handleordersDetails={(e) => {
              showModal3();
            }}
            reseat={
              sidedetails.queue
                ? qqid === sidedetails.queue.qId
                  ? true
                  : false
                : ""
            }
          />
        ) : (
          <LargeSummaryTable
            available={sidedetails.isAvailable}
            tableno={sidedetails.name}
            inside={sidedetails.position === 0 ? sidedetails.chaires : ""}
            outside={sidedetails.position === 1 ? sidedetails.chaires : ""}
            chairs={sidedetails.chaires}
            seatingarea={
              sidedetails.tags?.length <= 1 ? "" : sidedetails.tags?.name
            }
            subseatingarea={
              sidedetails.tags?.length <= 1 ? "" : sidedetails.tags?.name
            }
            handleSeat={(e) => handleSeatCustomer(sidedetails.id)}
          />
        )}
        <div
          className="w-100 text-center mb-2"
          style={{ position: "relative", top: "40px" }}>
          <PopButtonGreen
            style={{ marginBottom: "30px" }}
            onClick={() => setOpen4(false)}>
            Yes
          </PopButtonGreen>
        </div>
      </ReactModal>
    </>
  );
}

export default index;
