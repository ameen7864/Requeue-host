import React, { useContext, useEffect, useState } from "react";
import {
  MessageStyle,
  TeaxtAreaStyle,
  PromptStyle,
  ULStyle,
  SubmitStyle,
  msgCloseStyle,
  MsgCloseStyle,
} from "../styled/common.styled";
import { FlexHLeft, FlexH, FlexV } from "../styled/global.styled";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlobalContext } from "../../../contextApi/Provider";
import axios from "../../../config/instance";
const Message = ({ list, handleSelect, value, handleclose }) => {
  const { SendMessage, selectedIns, authToken } = useContext(GlobalContext);
  const token2 = authToken[0];
  // const [allsettings, setAllsettings] = useState();
  const [mesg, setMesg] = useState("");
  // console.log(mesg)

  const _list = list.map((l) => (
    <li
      className={l.name === value ? "active" : ""}
      key={l.name}
      onClick={() => handleSelect(l)}>
      {l.name}
    </li>
  ));

  useEffect(() => {
    const apiUrl = `/restaurant/getallresturantdata?restID=${
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("Rest="))
        ?.split("=")[1]
    }`;

    axios
      .get(apiUrl, {
        headers: {
          userToken: token2,
        },
      })
      .then((response) => {
        // setAllsettings(response.data);
        setMesg(response.data?.result1?.LilouCustomMessageEn);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [document.cookie, token2]);

  const handlesendmessage = () => {
    let name = SendMessage[0]?.name;
    let id = localStorage.getItem("bId");
    const data = {
      name: name,
      msggg: mesg,
      mesgarr: selectedIns[0],
    };
    axios.post(`/queue/message?restid=${id}`, data).catch((error) => {
      console.error("Error making post request:", error);
    });
    handleclose();
  };

  return (
    <MessageStyle className="fadein">
      <FlexHLeft className="gap-40">
        <ULStyle className="w-35">{_list}</ULStyle>
        <div className="w-100">
          <PromptStyle>Message will send to online customer only</PromptStyle>
          <TeaxtAreaStyle
            placeholder="Write a message "
            value={mesg}
            onChange={(e) => setMesg(e.target.value)}></TeaxtAreaStyle>
        </div>
        <FlexV className="w-35 text-left mt-3">
          <SubmitStyle onClick={handlesendmessage}>Send</SubmitStyle>
        </FlexV>

        <MsgCloseStyle onClick={() => handleclose(handleclose)}>
          <FontAwesomeIcon icon={faTimes} />
        </MsgCloseStyle>
      </FlexHLeft>
    </MessageStyle>
  );
};

export default Message;
