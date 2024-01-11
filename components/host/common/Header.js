import {
  HeaderStyle,
  ProfileHead,
  SearchNumberStyle,
  HeadIconStyle,
  PageNameStyle,
  SideContHoldStyle,
} from "../styled/common.styled";
import { FlexHLeft } from "../styled/global.styled";
import { FaRegUserCircle, FaPaperPlane } from "react-icons/fa";
import { RiLayoutGridFill } from "react-icons/ri";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SaveLocalStorage } from "../../../helpers/localStorage";
import SearchNumber from "./input/SearchNumber";
import { useEffect } from "react";

const Headers = (props) => {
  const [select, setSelect] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("gridView") === "false") {
      setSelect(false);
    } else {
      setSelect(true);
    }
  }, [select]);
  const [select2, setSelect2] = useState(false);
  const [select3, setSelect3] = useState(false);
  const [select4, setSelect4] = useState(false);
  const router = useRouter();
  const handleSetLastPage = () => {
    SaveLocalStorage("lastPage", router.asPath);
  };
  return (
    <>
      <HeaderStyle>
        <div className="container">
          <FlexHLeft className="gap">
            <Link href={`?profile=profile`}>
              <ProfileHead
                className="cDtkWn"
                onClick={handleSetLastPage}
                style={{ cursor: "pointer" }}
              >
                <FaRegUserCircle /> <span>Profile</span>
              </ProfileHead>
            </Link>
            <SearchNumberStyle className="dWnDIq">
              <SearchNumber />
            </SearchNumberStyle>

            <PageNameStyle>{props.pagename}</PageNameStyle>

            <SideContHoldStyle>
              <div className="ressidehead2">
                {select3 === false ? (
                  <HeadIconStyle
                    onClick={() => {
                      // props.msg();
                      setSelect3(true);
                    }}
                    className={props.clas}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21.557"
                      height="21.562"
                      viewBox="0 0 21.557 21.562"
                    >
                      <path
                        id="Icon_ionic-ios-search"
                        data-name="Icon ionic-ios-search"
                        d="M25.8,24.495l-6-6.052a8.544,8.544,0,1,0-1.3,1.314l5.956,6.012a.923.923,0,0,0,1.3.034A.929.929,0,0,0,25.8,24.495ZM13.095,19.83a6.747,6.747,0,1,1,4.772-1.976A6.705,6.705,0,0,1,13.095,19.83Z"
                        transform="translate(-4.5 -4.493)"
                        fill="#fff"
                      />
                    </svg>
                  </HeadIconStyle>
                ) : (
                  <HeadIconStyle
                    onClick={() => {
                      // props.msg();
                      setSelect3(false);
                    }}
                    className={props.clas}
                    style={{ color: "black", backgroundColor: "whitesmoke" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21.557"
                      height="21.562"
                      viewBox="0 0 21.557 21.562"
                    >
                      <path
                        id="Icon_ionic-ios-search"
                        data-name="Icon ionic-ios-search"
                        d="M25.8,24.495l-6-6.052a8.544,8.544,0,1,0-1.3,1.314l5.956,6.012a.923.923,0,0,0,1.3.034A.929.929,0,0,0,25.8,24.495ZM13.095,19.83a6.747,6.747,0,1,1,4.772-1.976A6.705,6.705,0,0,1,13.095,19.83Z"
                        transform="translate(-4.5 -4.493)"
                        fill="#000000"
                      />
                    </svg>
                  </HeadIconStyle>
                )}
              </div>

              <div className="ressidehead2">
                {select4 === false ? (
                  <HeadIconStyle
                    onClick={() => {
                      // props.msg();
                      setSelect4(true);
                    }}
                    className={props.clas}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                    >
                      <g id="filter" transform="translate(1)">
                        <line
                          id="Line_11"
                          data-name="Line 11"
                          x1="23"
                          transform="translate(0 3.269)"
                          fill="none"
                          stroke="#e7ecf1"
                          stroke-linecap="round"
                          stroke-width="2"
                        />
                        <line
                          id="Line_12"
                          data-name="Line 12"
                          x1="23"
                          transform="translate(0 12.269)"
                          fill="none"
                          stroke="#e7ecf1"
                          stroke-linecap="round"
                          stroke-width="2"
                        />
                        <line
                          id="Line_13"
                          data-name="Line 13"
                          x1="23"
                          transform="translate(0 21.269)"
                          fill="none"
                          stroke="#e7ecf1"
                          stroke-linecap="round"
                          stroke-width="2"
                        />
                        <circle
                          id="Ellipse_7"
                          data-name="Ellipse 7"
                          cx="3"
                          cy="3"
                          r="3"
                          transform="translate(15.5)"
                          fill="#f5f9fc"
                        />
                        <circle
                          id="Ellipse_8"
                          data-name="Ellipse 8"
                          cx="3"
                          cy="3"
                          r="3"
                          transform="translate(2.5 9)"
                          fill="#f5f9fc"
                        />
                        <circle
                          id="Ellipse_9"
                          data-name="Ellipse 9"
                          cx="3"
                          cy="3"
                          r="3"
                          transform="translate(7.5 18)"
                          fill="#f5f9fc"
                        />
                      </g>
                    </svg>
                  </HeadIconStyle>
                ) : (
                  <HeadIconStyle
                    onClick={() => {
                      // props.msg();
                      setSelect4(false);
                    }}
                    className={props.clas}
                    style={{ color: "black", backgroundColor: "whitesmoke" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                    >
                      <g id="filter" transform="translate(1)">
                        <line
                          id="Line_11"
                          data-name="Line 11"
                          x1="23"
                          transform="translate(0 3.269)"
                          fill="none"
                          stroke="#000000"
                          stroke-linecap="round"
                          stroke-width="2"
                        />
                        <line
                          id="Line_12"
                          data-name="Line 12"
                          x1="23"
                          transform="translate(0 12.269)"
                          fill="none"
                          stroke="#000000"
                          stroke-linecap="round"
                          stroke-width="2"
                        />
                        <line
                          id="Line_13"
                          data-name="Line 13"
                          x1="23"
                          transform="translate(0 21.269)"
                          fill="none"
                          stroke="#000000"
                          stroke-linecap="round"
                          stroke-width="2"
                        />
                        <circle
                          id="Ellipse_7"
                          data-name="Ellipse 7"
                          cx="3"
                          cy="3"
                          r="3"
                          transform="translate(15.5)"
                          fill="#000000"
                        />
                        <circle
                          id="Ellipse_8"
                          data-name="Ellipse 8"
                          cx="3"
                          cy="3"
                          r="3"
                          transform="translate(2.5 9)"
                          fill="#000000"
                        />
                        <circle
                          id="Ellipse_9"
                          data-name="Ellipse 9"
                          cx="3"
                          cy="3"
                          r="3"
                          transform="translate(7.5 18)"
                          fill="#000000"
                        />
                      </g>
                    </svg>
                  </HeadIconStyle>
                )}
              </div>

              {select2 === false ? (
                <HeadIconStyle
                  onClick={() => {
                    props.msg();
                    setSelect2(true);
                  }}
                  className={props.clas}
                >
                  <FaPaperPlane />
                </HeadIconStyle>
              ) : (
                <HeadIconStyle
                  onClick={() => {
                    props.msg();
                    setSelect2(false);
                  }}
                  className={props.clas}
                  style={{ color: "black", backgroundColor: "whitesmoke" }}
                >
                  <FaPaperPlane />
                </HeadIconStyle>
              )}

              <div className="ressidehead">
                {!select === true ? (
                  <HeadIconStyle
                    onClick={() => {
                      props.listView();
                      setSelect(true);
                    }}
                    className={props.listViewCls}
                  >
                    {/* <RiListCheck /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.209"
                      height="17.649"
                      viewBox="0 0 23.209 17.649"
                    >
                      <g
                        id="Group_576"
                        dataName="Group 576"
                        transform="translate(0.5 0.5)"
                      >
                        <line
                          id="Line_67"
                          dataName="Line 67"
                          x2="8.619"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeWidth="1"
                        />
                        <line
                          id="Line_68"
                          dataName="Line 68"
                          x2="8.619"
                          transform="translate(13.59)"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeWidth="1"
                        />
                        <line
                          id="Line_69"
                          dataName="Line 69"
                          x2="8.619"
                          transform="translate(13.59 8.147)"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeWidth="1"
                        />
                        <line
                          id="Line_71"
                          dataName="Line 71"
                          x2="8.619"
                          transform="translate(13.59 16.649)"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeWidth="1"
                        />
                        <line
                          id="Line_70"
                          dataName="Line 70"
                          x2="8.619"
                          transform="translate(0 8.147)"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeWidth="1"
                        />
                        <line
                          id="Line_72"
                          dataName="Line 72"
                          x2="8.619"
                          transform="translate(0 16.649)"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeWidth="1"
                        />
                      </g>
                    </svg>
                  </HeadIconStyle>
                ) : (
                  <HeadIconStyle
                    className={props.listViewCls}
                    style={{ backgroundColor: "whitesmoke", color: "black" }}
                  >
                    {/* <RiListCheck /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.209"
                      height="17.649"
                      viewBox="0 0 23.209 17.649"
                    >
                      <g
                        id="Group_576"
                        dataName="Group 576"
                        transform="translate(0.5 0.5)"
                      >
                        <line
                          id="Line_67"
                          dataName="Line 67"
                          x2="8.619"
                          fill="none"
                          stroke="#000000"
                          strokeLinecap="round"
                          strokeWidth="1"
                        />
                        <line
                          id="Line_68"
                          dataName="Line 68"
                          x2="8.619"
                          transform="translate(13.59)"
                          fill="none"
                          stroke="#000000"
                          strokeLinecap="round"
                          strokeWidth="1"
                        />
                        <line
                          id="Line_69"
                          dataName="Line 69"
                          x2="8.619"
                          transform="translate(13.59 8.147)"
                          fill="none"
                          stroke="#000000"
                          strokeLinecap="round"
                          strokeWidth="1"
                        />
                        <line
                          id="Line_71"
                          dataName="Line 71"
                          x2="8.619"
                          transform="translate(13.59 16.649)"
                          fill="none"
                          stroke="#000000"
                          strokeLinecap="round"
                          strokeWidth="1"
                        />
                        <line
                          id="Line_70"
                          dataName="Line 70"
                          x2="8.619"
                          transform="translate(0 8.147)"
                          fill="none"
                          stroke="#000000"
                          strokeLinecap="round"
                          strokeWidth="1"
                        />
                        <line
                          id="Line_72"
                          dataName="Line 72"
                          x2="8.619"
                          transform="translate(0 16.649)"
                          fill="none"
                          stroke="#000000"
                          strokeLinecap="round"
                          strokeWidth="1"
                        />
                      </g>
                    </svg>
                  </HeadIconStyle>
                )}
              </div>
              <div className="ressidehead">
                {select === true ? (
                  <HeadIconStyle
                    onClick={() => {
                      props.listView();
                      setSelect(false);
                    }}
                    className={props.gridViewCls}
                  >
                    <RiLayoutGridFill />
                  </HeadIconStyle>
                ) : (
                  <HeadIconStyle
                    className={props.gridViewCls}
                    style={{ backgroundColor: "whitesmoke", color: "black" }}
                  >
                    <RiLayoutGridFill />
                  </HeadIconStyle>
                )}
              </div>
            </SideContHoldStyle>
          </FlexHLeft>
        </div>
      </HeaderStyle>
    </>
  );
};

export default Headers;
