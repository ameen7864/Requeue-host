import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../contextApi/Provider";
import { checkLogin } from "../../helpers/checkLogin";
import { io } from "socket.io-client";
import { getCookie } from "cookies-next";

const MainParentLayout = (props) => {
  let rest = getCookie("Rest");
  const socket = io("https://orderapi.requeue.com");

  function joinRoom(room) {
    socket.emit("join-room", { room });
  }

  useEffect(() => {
    joinRoom(rest);
  }, [rest]);

  socket.on("orderSocket", (data) => {
    // console.log(data);
    checkLogin(
      authToken,
      router,
      loading,
      insidequeue,
      outsidequeue,
      outsidehold,
      insidehold,
      outsidehistory,
      insidehistory,
      settings,
      countries,
      seatingarea,
      tablesdata,
      data.data
    );
  });
  const router = useRouter();
  const {
    authToken,
    loading,
    insidequeue,
    outsidequeue,
    outsidehold,
    insidehold,
    outsidehistory,
    insidehistory,
    settings,
    countries,
    seatingarea,
    tablesdata,
    api,
  } = useContext(GlobalContext);
  useEffect(() => {
    if (api[0] !== "") {
      checkLogin(
        authToken,
        router,
        loading,
        insidequeue,
        outsidequeue,
        outsidehold,
        insidehold,
        outsidehistory,
        insidehistory,
        settings,
        countries,
        seatingarea,
        tablesdata,
        api[0]
      );
      api[1]("");
    }
    // const interval = setInterval(() => {

    // }, 10000);
    // return () => clearInterval(interval);
  }, [api[0]]);

  return (
    <>
      {loading[0] === false ? (
        <>{props.fullpage}</>
      ) : (
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </>
  );
};

export default MainParentLayout;
