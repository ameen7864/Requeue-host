import { OfflineStyle } from "../styled/common.styled";
import { Offline, Online } from "react-detect-offline";

const Ofline = (props) => {
  return (
    <>
      {props.isOffline ? (
        <OfflineStyle className="fadein">
          <h1>OFFLINE MODE WORKING </h1>
          <p>Please check your settng</p>
        </OfflineStyle>
      ) : props.isOpen === false ? (
        <OfflineStyle className="fadein">
          <h1>BRANCH IS CLOSED </h1>
          <p>Please check your settng</p>
        </OfflineStyle>
      ) : (
        <Offline>
          <OfflineStyle className="fadein">
            <h1>OFFLINE MODE WORKING </h1>
            <p>
              Please check your internet connection , Online customer not
              available !{" "}
            </p>
          </OfflineStyle>
        </Offline>
      )}
    </>
  );
};

export default Ofline;
