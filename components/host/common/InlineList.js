import React from "react";
import { ULStyle } from "../styled/common.styled";

const InlineList = ({ listItem, handleSelect, value }) => {
  const name = (i) => {
    return i.name ?? i.NameEn;
  };
  const _listing = listItem.map((l) => (
    <li
      className={name(l) === value ? "active" : ""}
      key={name(l)}
      onClick={() => handleSelect(l)}>
      {name(l)}
    </li>
  ));

  return <ULStyle className="w-100">{_listing}</ULStyle>;
};

export default InlineList;
