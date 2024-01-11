import { useContext } from "react";
import axios from "../../config/instance";
import { GlobalContext } from "../../contextApi/Provider";

export const userLogin = async (userData) => {
  const response = await axios.post("/account/login", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const addClient = async (token, custInfo) => {
  const response = await axios.post("/client/create", custInfo, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
      lang: "english",
    },
  });
  return response;
};

export const addQueue = async (token, QueueInfo) => {
  const response = await axios.post("/queue/add", QueueInfo, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
      lang: "english",
    },
  });
  if (response.data.success == false) {
    alert(response.data.Message);
    return response;
  }
  // console.log(response, "response");
  return response;
};

export const holdClient = async (qid, token) => {
  const response = await axios.post("/queue/hold", qid, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};

export const cancelClient = async (qid, reason, token) => {
  const response = await axios.post(
    "/queue/cancel",
    { ...qid, ...reason },
    {
      headers: {
        "Content-Type": "application/json",
        userToken: token,
      },
    }
  );
  return response;
};

export const seatClient = async (qid, token) => {
  const response = await axios.post("/queue/seat", qid, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};

export const handleReleaseTable = async (data, token) => {
  const response = await axios.post("/table/release", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};

// settings

export const handleUserHoldStatus = async (data, token) => {
  const response = await axios.post("/restaurant/update/holdStatus", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};
export const handlecancelReasonRequired = async (data, token) => {
  const response = await axios.post(
    "/restaurant/update/cancelReasonRequired",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        userToken: token,
      },
    }
  );
  return response;
};
export const handlemaxChairs = async (data, token) => {
  const response = await axios.post("/restaurant/update/maxChairs", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};
export const handlebranchStatus = async (data, token) => {
  const response = await axios.post("/restaurant/update/branchStatus", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};
export const handlebranchOpen = async (data, token) => {
  const response = await axios.post("/restaurant/update/branchOpen", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};

export const handleCustommessagePost = async (data, token) => {
  const response = await axios.post("/restaurant/update/customMessage", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};

export const handleAutonotificationmessagePost = async (data, token) => {
  const response = await axios.post("/restaurant/update/autoMessage", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};

export const handleBranchFullPost = async (data, token) => {
  const response = await axios.post("/restaurant/update/branchFull", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};

export const handleOutsideFullPost = async (data, token) => {
  const response = await axios.post("/restaurant/update/outsideFull", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};

export const handleInsideFullPost = async (data, token) => {
  const response = await axios.post("/restaurant/update/insideFull", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};

export const handleCloseoutsidePost = async (data, token) => {
  const response = await axios.post("/restaurant/update/outsideActive", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};

export const handleCloseinsidePost = async (data, token) => {
  const response = await axios.post("/restaurant/update/insideActive", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};

export const handleSpecialareaPost = async (data, token) => {
  const response = await axios.post(
    "/restaurant/update/enableQueueTags",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        userToken: token,
      },
    }
  );
  return response;
};

export const handleAutocancelPost = async (data, token) => {
  const response = await axios.post("/restaurant/update/autoCancel", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};

export const handleAutoholdPost = async (data, token) => {
  const response = await axios.post("/restaurant/update/autoHold", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};

export const handleOutsideNamePost = async (data, token) => {
  const response = await axios.post("/restaurant/update/outsideName", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};
export const handleInsideNamePost = async (data, token) => {
  const response = await axios.post("/restaurant/update/insideName", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};
export const handleInsideAutofullPost = async (data, token) => {
  const response = await axios.post("/restaurant/update/insideAutoFull", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};
export const handleOutsideAutofullPost = async (data, token) => {
  const response = await axios.post(
    "/restaurant/update/outsideAutoFull",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        userToken: token,
      },
    }
  );
  return response;
};
export const handleShowAnywhereAreasPost = async (data, token) => {
  const response = await axios.post("/restaurant/update/hideAnyArea", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};
export const handleShowInsidePost = async (data, token) => {
  const response = await axios.post("/restaurant/update/hideInside", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};
export const handleShowOutsidePost = async (data, token) => {
  const response = await axios.post("/restaurant/update/hideOutside", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};
export const handleGetClient = async (data, token) => {
  const response = await axios.post("/queue/GetByClient", data, {
    headers: {
      "Content-Type": "application/json",
      userToken: token,
    },
  });
  return response;
};
