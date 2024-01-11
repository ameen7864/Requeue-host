import { FaBars, FaSlidersH } from "react-icons/fa";
import { NavTopStyle, NavBotStyle } from "../styled/common.styled";
import Link from "next/link";
import { useState, useEffect } from "react";

const NavComp = ({
  chaircounts,
  title,
  handleToggle,
  home,
  pathinsideoutside,
  count,
  color,
}) => {
  // const ttl = pathinsideoutside.toString();

  // console.log(chaircounts);
  // const bb = chaircounts?chaircount:[{"name": "1"},{"name": "2"}];

  // const _list = "d";

  return (
    <>
      <NavTopStyle>
        <span>
          {/* <Link href="/home"> */}
          <FaBars onClick={home} />
          {/* </Link> */}
        </span>
        {/* <Link href={pathinsideoutside}> */}
        <p
          onClick={pathinsideoutside}
          className="pointer"
          style={{ color: color }}>
          {title}
        </p>
        {/* </Link> */}
        <h1>{count ? count : "00"}</h1>
      </NavTopStyle>

      <NavBotStyle className="numberwala">
        <span>
          <FaSlidersH onClick={handleToggle} />
        </span>

        <div className="slider-container">
          <div className="slider">{chaircounts}</div>
        </div>
      </NavBotStyle>
    </>
  );
};

export default NavComp;
