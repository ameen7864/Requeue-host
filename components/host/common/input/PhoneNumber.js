import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../../../contextApi/Provider";
import { SaveLocalStorage } from "../../../../helpers/localStorage";
import { userByMobile } from "../../../../helpers/apiCalls/apiGet";

const PhoneNumber = () => {
  const { countries, authToken, guestfrommobile } = useContext(GlobalContext);

  const [showCountries, setShowCountries] = useState(true);

  const [value, setValue] = useState();
  const [cntry, setCntry] = useState({
    id: 1,
    name: "Kuwait",
    nameAR: "الكويت",
    flag: "https://cdn.requeue.net/media/flags/kw.png",
    code: "+965",
  });
  const [countriesz, setCountriesz] = useState([
    {
      id: 1,
      name: "Kuwait",
      nameAR: "الكويت",
      flag: "https://cdn.requeue.net/media/flags/kw.png",
      code: "+965",
    },
  ]);
  useEffect(() => {
    if (countries[0]) {
      setCountriesz(countries[0]);
    }
  });
  
  const handleClearMobile = (e) => {
    const cid = cntry.id;
    const mobile = e;
    guestfrommobile[1]({ country: cid, phone: mobile });
  };

  const handleSelectCountry = (e) => {
    setCntry(e);
    setShowCountries(!showCountries);
  };
  const handleDisabled = () => {
    alert("Please Select Another country");
  };

  const handleGetUserByMobile = (e) => {
    const token = authToken[0];
    const cid = cntry.id;
    const mobile = e;
    if (mobile.length <= 7) {
      return handleClearMobile(e);
    } else {
      userByMobile(token, cid, mobile)
        .then((response) => {
          if (response.data.success) {
            guestfrommobile[1](response.data.data);
          } else {
            return handleClearMobile(e);
          }
        })
        .catch((error) => {
          console.log(error);
          return handleClearMobile(e);
        });
    }
  };

  const _countrieslist = countriesz.map((cl) => (
    <li
      key={cl.id}
      className={cl.restActive ? "" : "disabled"}
      onClick={
        cl.restActive ? (e) => handleSelectCountry(cl) : () => handleDisabled()
      }
    >
      <img className="w-66-imgPhone" src={cl.flag} />
      <div>
        <h3>{cl.name}</h3>
        <p>{cl.code}</p>
      </div>
    </li>
  ));
  return (
    <div className="fxlx-ggn" style={{ borderBottom: "1px solid black" }}>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            className="w-66-imgPhone"
            src={cntry.flag}
            onClick={() => setShowCountries(!showCountries)}
          />
          <p className="cntrycss">{cntry.code}</p>
        </div>
      </>

      <ul className={showCountries ? "expandPhone" : "expandPhone expShow"}>
        {_countrieslist}
      </ul>
      <input
        style={{ marginLeft: "-22px" }}
        placeholder="Enter phone number"
        type="number"
        onChange={(e) => {
          handleGetUserByMobile(e.target.value);
        }}
        className="PhoneInputInput"
      />
    </div>
  );
};

export default PhoneNumber;
