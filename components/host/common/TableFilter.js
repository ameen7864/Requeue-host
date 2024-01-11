import { FaSlidersH } from "react-icons/fa";
import {
  BgSelectable,
  NavBotStyle,
  TableFilterMain,
} from "../styled/common.styled";
import Input from "./input/Input";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../../contextApi/Provider";

function TableFilter({
  title,
  home,
  outSideSubArea,
  inSideSubArea,
  outsideindise,
  setOutsideindise,
  availibility,
  setAvailibility,
  familysingle,
  setFamilysingle,
  seatingarea,
  setSeatingarea,
  listingtoshow,
  setListingtoshow,
}) {
  const ttl = title;

  const [expand, setExpand] = useState(false);

  const handleToggle = () => {
    setExpand(!expand);
  };

  const lists = [
    { name: "ALL" },
    { name: "1-2" },
    { name: "2-4" },
    { name: "4-6" },
    { name: "6-8" },
    { name: "8-12+" },
  ];
  const _list = lists.map((l) => (
    <p
      className={l.name === listingtoshow ? "active" : ""}
      key={l.name}
      onClick={() => setListingtoshow(l.name)}>
      {l.name}
    </p>
  ));
  const avalibilities = [
    { name: "ALL" },
    { name: "Busy" },
    { name: "Available" },
  ];
  const _avail = avalibilities.map((l) => (
    <p
      className={l.name === availibility ? "active" : ""}
      key={l.name}
      onClick={() => setAvailibility(l.name)}>
      {l.name}
    </p>
  ));

  const inout = [{ name: "ALL" }, { name: "Outside" }, { name: "Inside" }];
  const _inout = inout.map((l) => (
    <p
      className={l.name === outsideindise ? "active" : ""}
      key={l.name}
      onClick={() => {
        setOutsideindise(l.name);
        setSeatingarea("ALL");
      }}>
      {l.name}
    </p>
  ));
  const fmlysngl = [{ name: "ALL" }, { name: "Family" }, { name: "Single" }];
  const _fmlysngl = fmlysngl.map((l) => (
    <p
      className={l.name === familysingle ? "active" : ""}
      key={l.name}
      onClick={() => setFamilysingle(l.name)}>
      {l.name}
    </p>
  ));
  const sarea = [
    { name: "ALL" },
    { name: "Balcony" },
    { name: "Up stairs" },
    { name: "Non smoking" },
    { name: "Ground floor" },
  ];
  const allTage = [];
  const inSide = [{ NameEn: "ALL" }, ...inSideSubArea].map((l) => {
    if (!allTage.includes(l.NameEn)) {
      allTage.push(l.NameEn);
    }
    return (
      <p
        className={l.NameEn === seatingarea ? "active" : ""}
        key={l.NameEn}
        onClick={() =>
          l.NameEn === seatingarea
            ? setSeatingarea("ALL")
            : setSeatingarea(l.NameEn)
        }>
        {l.NameEn}
      </p>
    );
  });
  const outSide = [{ NameEn: "ALL" }, ...outSideSubArea].map((l) => {
    if (!allTage.includes(l.NameEn)) {
      allTage.push(l.NameEn);
    }
    return (
      <p
        className={l.NameEn === seatingarea ? "active" : ""}
        key={l.NameEn}
        onClick={() =>
          l.NameEn === seatingarea
            ? setSeatingarea("ALL")
            : setSeatingarea(l.NameEn)
        }>
        {l.NameEn}
      </p>
    );
  });

  const tags = allTage.map((l) => (
    <p
      className={l === seatingarea ? "active" : ""}
      key={l}
      onClick={() =>
        l === seatingarea ? setSeatingarea("ALL") : setSeatingarea(l)
      }>
      {l}
    </p>
  ));

  const { searchtablenum, tablechairs } = useContext(GlobalContext);
  const handleGetTablebynumber = (e) => {
    searchtablenum[1](e);
  };

  return (
    <TableFilterMain className={expand ? "expand" : ""}>
      <NavBotStyle>
        <h1>
          <FaSlidersH onClick={() => handleToggle()} />
        </h1>
        <Input
          name="change"
          placeholder="Table number"
          onChange={(e) => {
            handleGetTablebynumber(e.target.value);
          }}
        />

        {_list}
      </NavBotStyle>
      {expand ? (
        <>
          <div className="insi">
            <BgSelectable className="iObqoY1">
              <NavBotStyle>{_avail}</NavBotStyle>
            </BgSelectable>
            <BgSelectable>
              <NavBotStyle>{_inout}</NavBotStyle>
            </BgSelectable>
          </div>
          <div className="insi">
            <BgSelectable>
              <NavBotStyle>{_fmlysngl}</NavBotStyle>
            </BgSelectable>
            <BgSelectable>
              <NavBotStyle className="fqvkuy4">
                {outsideindise === "Outside"
                  ? outSide
                  : outsideindise === "Inside"
                  ? inSide
                  : tags}
              </NavBotStyle>
            </BgSelectable>
          </div>
        </>
      ) : (
        ""
      )}
    </TableFilterMain>
  );
}

export default TableFilter;
