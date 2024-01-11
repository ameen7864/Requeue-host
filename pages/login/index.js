import {
  Bg,
  LoginButton,
  LoginVFlex,
  FootPera,
} from "../../components/host/styled/login/login.styled";
import { FlexH, FlexV } from "../../components/host/styled/global.styled";
import LoginIntro from "../../components/host/login/login";
import Input from "../../components/host/login/input";
import {
  faIdBadge,
  faUser,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { userLogin } from "../../helpers/apiCalls/apiPost";
import { SaveLocalStorage } from "../../helpers/localStorage";
import { GlobalContext } from "../../contextApi/Provider";
import { getCookie, setCookies } from "cookies-next";
import ErrorBox from "./Errorbox/Errorbox";

const login = () => {
  const { setAuthToken, authToken } = useContext(GlobalContext);
  const [errorMsg, setErrorMsg] = useState(null);

  const router = useRouter();
  const [user, setUser] = useState({
    branchId: "",
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "branchId") {
      setUser({ ...user, [e.target.name]: parseInt(e.target.value) });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let accessToken = "response.data.data.token;";
    let restid = 23;
    setCookies("Rest", restid);
    setCookies("token", accessToken);
    alert("donde");
    router.push("home");
    // userLogin(user)
    //   .then((response) => {
    //     // console.log(response);
    //     if (response.data.Success) {
    //       if (response.data.data.is_active) {
    //         if (response.data.data.user_group == 3) {
    //           let accessToken = response.data.data.token;
    //           let restid = response.data.data.branch_id;
    //           localStorage.setItem("bId", response.data.data?.branch_id);
    //           localStorage.setItem("usertitle", response.data.data?.user_title);
    //           localStorage.setItem("username", response.data.data?.username);
    //           localStorage.setItem("userID", response.data.data?.user_id);
    //           localStorage.setItem(
    //             "expire",
    //             response.data.data.additionalData[0]?.expiredDate
    //           );
    //           localStorage.setItem(
    //             "area",
    //             response.data.data.additionalData[0]?.address
    //           );
    //           localStorage.setItem(
    //             "resturant",
    //             response.data.data.additionalData[0]?.name_en
    //           );
    //           localStorage.setItem(
    //             "longitude",
    //             response.data.data.additionalData[0]?.longitude
    //           );
    //           localStorage.setItem(
    //             "latitude",
    //             response.data.data.additionalData[0]?.latitude
    //           );
    //           setCookies("Rest", restid);
    //           setCookies("token", accessToken);
    //           authToken[1](accessToken);
    //           router.push("home");
    //           // setTimeout(() => {
    //           //   window.location.reload();
    //           // }, 1000);
    //         }
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     setErrorMsg(error?.response?.data?.message);
    //   });
  };
  return (
    <Bg>
      <LoginVFlex>
        <form onSubmit={handleSubmit}>
          <LoginIntro title="Welcome to" text="Host" />
          <Input
            title="Branch ID"
            name="branchId"
            value={user.branchId}
            onChange={handleChange}
            type="text"
            img={<FontAwesomeIcon icon={faIdBadge} />}
          />
          <Input
            title="User"
            name="userName"
            value={user.userName}
            onChange={handleChange}
            type="text"
            img={<FontAwesomeIcon icon={faUser} />}
          />
          <Input
            title="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
            // onKeyPress={handleKeyPress}
            type="password"
            img={<FontAwesomeIcon icon={faUnlockAlt} />}
          />
          <LoginButton type="submit">Login</LoginButton>
        </form>
        <FlexH className="mt-4 mb-3 loginpage">
          <img src="../img/logo.png" />
          <FlexV>
            <FootPera className="footlogres1">
              POWERED BY REQUEUE <br />
              COMPANY 2016 - 2020 <br />
              WWW.REQUEUE.NET
            </FootPera>
            <FootPera className="footlogres2">
              POWERED BY REQUEUE COMPANY 2016 - 2020 <br />
              <span>WWW.REQUEUE.NET</span>
            </FootPera>
          </FlexV>
        </FlexH>
      </LoginVFlex>
      {errorMsg && <ErrorBox message={errorMsg} />}
    </Bg>
  );
};
export default login;
