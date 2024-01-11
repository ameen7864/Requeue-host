import React from "react";
import {
  Fl2by2,
  LargeSummary,
  NameInSUmmarySmall,
  SaveModl,
  SideSecSmallButton,
  SmallSummary,
} from "../styled/common.styled";

export default function LargeSummaryTable({
  reseat,
  handleRelease,
  handleSeat,
  handlechangetable,
  handleordersDetails,
  handleshowtablehistory,
  available,
  tableno,
  personImg,
  personName,
  personNumber,
  position,
  inside,
  outside,
  subseatingarea,
  chairs,
  seatingarea,
}) {
  let positionText;

  if (position == 0) {
    positionText = "inside";
  } else if (position === 1) {
    positionText = "outside";
  } else if (position === 2) {
    positionText = "any";
  } else {
    positionText = "";
  }
  return (
    <LargeSummary>
      <SmallSummary>
        <h3 className="tabNo">{tableno}</h3>

        <div
          className="availableImg"
          style={{ display: "flex", flexDirection: "column" }}>
          {available ? <h1>Available</h1> : ""}
          {personImg ? (
            <>
              {typeof personImg === "string" &&
              personImg.includes(
                "https://new-requeue.s3.eu-west-2.amazonaws.com/"
              ) ? (
                <div className="text-center mt--60px">
                  <img
                    src={personImg}
                    style={{
                      width: "125px",
                      height: "125px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              ) : (
                <div className="text-center mt--60px">
                  <img
                    src="https://new-requeue.s3.eu-west-2.amazonaws.com/media/avatars/Avatars-02.png"
                    style={{
                      width: "125px",
                      height: "125px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              )}
            </>
          ) : null}
          {personName ? (
            <NameInSUmmarySmall>{personName} </NameInSUmmarySmall>
          ) : (
            ""
          )}
          {personNumber ? (
            <NameInSUmmarySmall>{personNumber} </NameInSUmmarySmall>
          ) : (
            ""
          )}

          {positionText ? (
            <NameInSUmmarySmall>{positionText} </NameInSUmmarySmall>
          ) : (
            ""
          )}
        </div>

        <>
          <div className="text-center" style={{ marginLeft: "20px" }}>
            <div className="flxzSn" style={{ marginLeft: "22px" }}>
              {inside ? <p>Inside </p> : ""}
              {outside ? <p>Outside </p> : ""}
              {available ? chairs ? <p>PAX {chairs}</p> : "" : ""}
              {seatingarea ? <p>{seatingarea}</p> : ""}
              {subseatingarea ? <p>{subseatingarea}</p> : ""}
            </div>
          </div>
        </>
        {tableno ? (
          <>
            {available ? (
              <>
                {reseat ? (
                  <div className="text-center">
                    <SaveModl onClick={handleSeat}>Re-Seat</SaveModl>
                  </div>
                ) : (
                  <div className="text-center">
                    <SaveModl onClick={handleSeat}>Seat</SaveModl>
                  </div>
                )}
              </>
            ) : (
              <>
                <Fl2by2>
                  <SideSecSmallButton
                    className="normal"
                    onClick={handleshowtablehistory}>
                    Table History{" "}
                  </SideSecSmallButton>
                  <SideSecSmallButton
                    className="normal"
                    onClick={handlechangetable}>
                    Change Table
                  </SideSecSmallButton>
                  <SideSecSmallButton
                    className="normal"
                    onClick={handleordersDetails}>
                    Order details{" "}
                  </SideSecSmallButton>
                  <SideSecSmallButton onClick={handleRelease}>
                    Release{" "}
                  </SideSecSmallButton>
                </Fl2by2>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </SmallSummary>
    </LargeSummary>
  );
}
