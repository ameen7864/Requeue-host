import { getCookie } from "cookies-next";
import {
  queueList,
  holdList,
  historyList,
  settingsData,
  countriesList,
  seatingArea,
  tablesData,
} from "./apiCalls/apiGet";

export const checkLogin = (
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
  page = "all"
) => {
  let token = getCookie("token");
  if (token) {
    authToken[1](token);
    loading[1](false);

    if (["all", "queue", "hold", "tables", "mainqueue"].includes(page))
      queueList(token)
        .then((response) => {
          if (response.data.success) {
            insidequeue[1](response.data.data.inside);
            outsidequeue[1](response.data.data.outside);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    if (["all", "hold", "history", "tables", "queue", "holdmain"].includes(page))
      holdList(token)
        .then((response) => {
          if (response.data.success) {
            insidehold[1](response.data.data.inside);
            outsidehold[1](response.data.data.outside);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    if (["all", "history", "queue", "mainhistory"].includes(page))
      historyList(token)
        .then((response) => {
          if (response.data.success) {
            outsidehistory[1](response.data.data.outside);
            insidehistory[1](response.data.data.inside);
          }
        })
        .catch((error) => {
          console.log(error);
        });

    if (["all"].includes(page))
      settingsData(token)
        .then((response) => {
          if (response.data.success) {
            settings[1](response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });

    if (["all"].includes(page))
      countriesList(token)
        .then((response) => {
          if (response.data.success) {
            countries[1](response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });

    if (["all"].includes(page))
      seatingArea(token)
        .then((response) => {
          if (response.data.success) {
            seatingarea[1](response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });

    if (["all", "tables", "tablesmain"].includes(page))
      tablesData(token)
        .then((response) => {
          if (response.data.success) {
            tablesdata[1](response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    return true;
  } else {
    authToken[1]();
    router.push("login");
    loading[1](true);
    return false;
  }
};
