import React, { createContext, useState } from "react";

export const GlobalContext = createContext();
export const Provider = ({ children }) => {
  const [authToken, setAuthToken] = useState("");
  const [user, setUser] = useState();
  const [Api, setApi] = useState("all");
  const [countries, setCountries] = useState([]);
  const [seatingarea, setSeatingarea] = useState([]);
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tablesdata, setTablesdata] = useState([]);
  const [searchnum, setsearchnum] = useState("");
  const [seachcustomerinside, setSeachcustomerinside] = useState("All");
  const [seachlocationinside, setSeachlocationinside] = useState("All");
  const [seachtimeinside, setSeachtimeinside] = useState("All");
  const [seachfamsinginside, setSeachfamsinginside] = useState("All");
  const [seachqueuepreorderinside, setSeachqueuepreorderinside] = useState("All");
  const [seachqueueinside, setSeachqueueinside] = useState("All");
  const [seachcustomeroutside, setSeachcustomeroutside] = useState("All");
  const [seachlocationoutside, setSeachlocationoutside] = useState("All");
  const [seachqueuepreorderoutside, setSeachqueuepreorderoutside] = useState("All");
  const [seachqueueoutside, setSeachqueueoutside] = useState("All");
  const [seachtimeoutside, setSeachtimeoutside] = useState("All");
  const [seachfamsingoutside, setSeachfamsingoutside] = useState("All");
  const [searchnumcode, setSearchnumcode] = useState(null);
  const [chairq, setChairq] = useState("ALL");
  const [tablechairs, setTableChairs] = useState("ALL");
  const [searchtablenum, setsearchtablenum] = useState("");
  const [SendMessage, setSendMessage] = useState("");
  const [selectedIns, setSelectedIns] = useState([]);
  const [outsidequeue, setOutsidequeue] = useState([]);
  const [insidequeue, setInsidequeue] = useState([]);
  const [outsidehold, setOutsidehold] = useState([]);
  const [insidehold, setInsidehold] = useState([]);
  const [outsidehistory, setOutsidehistory] = useState([]);
  const [insidehistory, setInsidehistory] = useState([]);
  const [guestfrommobile, setGuestfrommobile] = useState([]);
  const [messageTo, setMessageTo] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        user: [user, setUser],
        api: [Api, setApi],
        seachcustomerinside: [seachcustomerinside, setSeachcustomerinside],
        seachlocationinside: [seachlocationinside, setSeachlocationinside],
        seachtimeinside: [seachtimeinside, setSeachtimeinside],
        seachfamsinginside: [seachfamsinginside, setSeachfamsinginside],
        seachqueueinside: [seachqueueinside, setSeachqueueinside],
        seachqueuepreorderinside : [seachqueuepreorderinside, setSeachqueuepreorderinside],
        seachcustomeroutside: [seachcustomeroutside, setSeachcustomeroutside],
        seachlocationoutside: [seachlocationoutside, setSeachlocationoutside],
        seachtimeoutside: [seachtimeoutside, setSeachtimeoutside],
        seachfamsingoutside: [seachfamsingoutside, setSeachfamsingoutside],
        seachqueueoutside: [seachqueueoutside, setSeachqueueoutside],
        seachqueuepreorderoutside: [seachqueuepreorderoutside, setSeachqueuepreorderoutside],
        searchnum: [searchnum, setsearchnum],
        searchnumcode: [searchnumcode, setSearchnumcode],
        searchtablenum: [searchtablenum, setsearchtablenum],
        settings: [settings, setSettings],
        SendMessage: [SendMessage, setSendMessage],
        selectedIns: [selectedIns, setSelectedIns],
        chairq: [chairq, setChairq],
        tablechairs: [tablechairs, setTableChairs],
        tablesdata: [tablesdata, setTablesdata],
        guestfrommobile: [guestfrommobile, setGuestfrommobile],
        seatingarea: [seatingarea, setSeatingarea],
        countries: [countries, setCountries],
        insidehold: [insidehold, setInsidehold],
        outsidehold: [outsidehold, setOutsidehold],
        insidehistory: [insidehistory, setInsidehistory],
        outsidehistory: [outsidehistory, setOutsidehistory],
        outsidequeue: [outsidequeue, setOutsidequeue],
        insidequeue: [insidequeue, setInsidequeue],
        authToken: [authToken, setAuthToken],
        loading: [loading, setLoading],
        messageTo: [messageTo, setMessageTo],
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
