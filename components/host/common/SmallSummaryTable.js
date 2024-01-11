import React from "react";
import { NameInSUmmarySmall, SmallSummary } from "../styled/common.styled";

export default function SmallSummaryTable({
  cls,
  idx,
  totaltablescount,
  busycount,
  availablecount,
  personImg,
  personName,
  inside,
  outside,
  chairs,
  seatingarea,
  subseatingarea,
}) {
  return (
    <div className={cls == idx ? "vis" : "hidden"}>
      <SmallSummary>
        {personName ? (
          <>
            {personImg ? (
              <div className="text-center mt--50px">
                <img src={personImg} className="img-circle" />
              </div>
            ) : (
              ""
            )}
            <div className="text-center">
              {personName ? (
                <NameInSUmmarySmall>{personName} </NameInSUmmarySmall>
              ) : (
                ""
              )}
              <div className="flxzSn">
                {inside ? <p>Inside {inside}</p> : ""}
                {outside ? <p>Outside {outside}</p> : ""}
                {chairs ? <p>Chairs {chairs}</p> : ""}
                {seatingarea ? <p>{seatingarea}</p> : ""}
                {subseatingarea ? <p>{subseatingarea}</p> : ""}
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        {totaltablescount ? (
          <p className="" >
            Total Tables <span>{totaltablescount}</span>
          </p>
        ) : (
          ""
        )}
        {busycount ? (
          <p className="busy">
            Busy <span>{busycount}</span>
          </p>
        ) : (
          ""
        )}
        {availablecount ? (
          <p className="available">
            Available <span>{availablecount}</span>
          </p>
        ) : (
          ""
        )}
      </SmallSummary>
    </div>
  );
}
