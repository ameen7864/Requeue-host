import React from "react";
import {
  CustBoxStyle,
  ParentCustBoxStyle,
  ParentCustButtonsStyle,
  SeatButtonStyle,
  HoldButtonStyle,
  CancelButtonStyle,
  RqThumbStyle,
  SeqNumStyle,
  Edit,
  ChairsStyle,
  IamgeAvatarStyle,
  TextDetailSmallStyle,
  StatusInfoStyle,
  HeadInfoStyle,
  SvgStyle,
  TileInfoStyle,
  PriceThumbStyle,
  ExpandDtl,
  ExpandCustHold,
  ParentExpandDtl,
  AnotherParentExpandDtl,
  AnotherExpandDtl,
  ParentForBoth,
  ForPop,
  ClrPop,
  CustDetailPopParent,
  CstDtl,
  CstNotification,
  StarsDtl,
  SendTimeNotification,
  Delivered,
  NotifPop,
} from "../styled/common.styled";
import { useEffect, useState } from "react";
import { FlexH, FlexHspace } from "../styled/global.styled";
import { IoMdTime, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiPhoneCall, FiEdit } from "react-icons/fi";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaRegPaperPlane } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { BsChatRightText, BsStarFill } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";

const PopCust = (props) => {
  const router = useRouter();

  return (
    <ForPop>
      {props?.hasApp ? <RqThumbStyle>REQUEUE</RqThumbStyle> : ""}
      {/* <PriceThumbStyle>30 KWD</PriceThumbStyle> */}

      <SeqNumStyle>#{props?.turn}</SeqNumStyle>

      <FlexHspace>
        <FlexHspace className="justify-center">
          {/* <Link href={`${router.pathname}?deatils=${props.id}`} > */}
          {/* <IamgeAvatarStyle src="../img/avatar.png" /> */}
          {props.img ? (
            props.img.includes(
              "https://new-requeue.s3.eu-west-2.amazonaws.com/"
            ) ? (
              <IamgeAvatarStyle src={props.img} />
            ) : props.img == "null" ? (
              <IamgeAvatarStyle
                src={
                  "https://new-requeue.s3.eu-west-2.amazonaws.com/media/avatars/Avatars-02.png"
                }
              />
            ) : (
              <IamgeAvatarStyle
                src={`https://new-requeue.s3.eu-west-2.amazonaws.com/media/avatars/${props.img}`}
              />
            )
          ) : (
            <IamgeAvatarStyle src="../img/avatar.png" />
          )}
          {/* </Link> */}

          <TextDetailSmallStyle>
            <h1>{props?.name}</h1>

            <a href={`tel://${props?.phone} ${props?.phone}`}>
              {props?.clientInfo?.countrtObj?.code} {props?.phone}
            </a>
          </TextDetailSmallStyle>
        </FlexHspace>
        <ChairsStyle>
          <div className="cont">
            <h2>{props.chairs}</h2>
            <span>Pax</span>
            {/* <Edit onClick={(e)=>handleEdit(e)}>Edit</Edit> */}
          </div>
        </ChairsStyle>
      </FlexHspace>
      <StatusInfoStyle>
        <HeadInfoStyle>Guest Status info</HeadInfoStyle>
        <div>
          <TileInfoStyle>
            <IoMdTime />
            <p>
              {new Date(props.createdat).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
              ,{" "}
              {new Date(props.createdat)
                .toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
                .toLowerCase()}
            </p>
          </TileInfoStyle>
          {/* {props.hasApp? */}
          <>
            <TileInfoStyle>
              <GoLocation />
              <p>{props.minimumtime}</p>
            </TileInfoStyle>
            <TileInfoStyle>
              <IoMdCheckmarkCircleOutline className="check_color" />
              <p>Checked in / {props.maximumtime}</p>
            </TileInfoStyle>
          </>
        </div>

        <ClrPop>
          {props.checkedin === null ? (
            <ExpandDtl>
              <span>
                <MdOutlineNotificationsActive />
              </span>
              <p>00:00</p>
            </ExpandDtl>
          ) : (
            <ExpandDtl>
              <span>
                <MdOutlineNotificationsActive />
              </span>
              <p>
                {new Date(props.checkedindate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
                ,{" "}
                {new Date(props.checkedindate)
                  .toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .toLowerCase()}
              </p>
            </ExpandDtl>
          )}

          {props.message === null ? (
            <ExpandDtl>
              <span>
                <FaRegPaperPlane />
              </span>
              <p>00:00 </p>
            </ExpandDtl>
          ) : (
            <ExpandDtl>
              <span>
                <FaRegPaperPlane />
              </span>
              <p>
                {new Date(props?.message).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
                ,{" "}
                {new Date(props?.message)
                  .toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .toLowerCase()}
              </p>
            </ExpandDtl>
          )}

          {props.callStatus === null ? (
            <ExpandDtl>
              <span>
                <FiPhoneCall />
              </span>
              <p style={{ color: "white" }}>Auto Cancel</p>
            </ExpandDtl>
          ) : (
            <ExpandDtl className="red">
              <span>
                <FiPhoneCall />
              </span>
              <p>Auto Cancel</p>
            </ExpandDtl>
          )}

          {props.callStatus === null ? (
            <ExpandDtl>
              <span>
                <FiPhoneCall />
              </span>
              <p style={{ color: "white" }}>Not answered</p>
            </ExpandDtl>
          ) : (
            <ExpandDtl className="yellow">
              <span>
                <FiPhoneCall />
              </span>
              <p>Not answered</p>
            </ExpandDtl>
          )}
        </ClrPop>
      </StatusInfoStyle>
      {props.dtl ? (
        <CustDetailPopParent>
          <CstDtl>
            <StarsDtl>
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
            </StarsDtl>
            <h3>CUSTOMER DETAILS</h3>
            <div className="cony">
              <div>
                <p>VISITED</p>
                <b>{props?.visited}</b>
              </div>
              <div>
                <p>PRE-ORDER </p>
                <b>{props?.preOrder}</b>
              </div>
              <div>
                <p>CANCELED </p>
                <b>{props?.cancelled}</b>
              </div>
              <div>
                <p>SEATED </p>
                <b>{props?.seated}</b>
              </div>
              <div>
                <p>BY REQUEUE </p>
                <b>{props?.byrequeue}</b>
              </div>
              <div>
                <p>WALK-IN</p>
                <b>{props?.walkin}</b>
              </div>
              <div>
                <p>TOYAL CHAIRS</p>
                <b>{props?.totalchairs}</b>
              </div>
            </div>
          </CstDtl>
          <CstNotification>
            <h3>NOTIFICATIONS HISTORY</h3>
            {props.message === null ? (
              ""
            ) : (
              <NotifPop>
                <SendTimeNotification>
                  {props?.message} <span>Send</span>
                </SendTimeNotification>
                <p>{props?.message2}</p>
                <SendTimeNotification className="right">
                  {props?.message} <Delivered>Delivered </Delivered>
                </SendTimeNotification>
              </NotifPop>
            )}
          </CstNotification>
        </CustDetailPopParent>
      ) : (
        ""
      )}
    </ForPop>
  );
};

export default PopCust;
