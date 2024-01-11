import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../../../contextApi/Provider";
import { SaveLocalStorage } from "../../../../helpers/localStorage";
import { userByMobile } from "../../../../helpers/apiCalls/apiGet";

const SearchNumber = () => {
  const { countries, searchnum, searchnumcode } = useContext(GlobalContext);

  const [showCountries, setShowCountries] = useState(true);
  const [countriesz, setCountriesz] = useState([]);
  const [cntry, setCntry] = useState({
    id: null,
    name: "Kuwait",
    nameAR: "الكويت",
    flag: "",
    code: "+ NA",
  });

  const handlesearchnumcode = (e) => {
    searchnumcode[1](e);
  };

  useEffect(() => {
    const numid = localStorage.getItem("numid");
    const matchingCountry = countriesz.find((country) => country.id == numid);
    if (matchingCountry) {
      setCntry(matchingCountry);
    }
  }, [countriesz]);

  useEffect(() => {
    if (countries[0]) {
      setCountriesz(countries[0]);
    }
  });

  const handleSelectCountry = (e) => {
    setCntry(e);
    localStorage.setItem("numid", e.id);
    handlesearchnumcode(null || e?.id);
    setShowCountries(!showCountries);
  };
  const handleDisabled = () => {
    alert("Please Select Another country");
  };

  const handleGetUserByMobile = (e) => {
    searchnum[1](e);
    console.log("here 1");
  };

  const _countrieslistA = countriesz.map((cl) => (
    <li
      key={cl.id}
      className={cl.restActive ? "" : "disabled"}
      onClick={
        cl.restActive ? (e) => handleSelectCountry(cl) : () => handleDisabled()
      }>
      <img className="w-66-imgPhone" src={cl.flag} alt={`${cl.name} Flag`} />
      <div>
        <h3>{cl.name}</h3>
        <p>{cl.code}</p>
      </div>
    </li>
  ));

  const _countrieslist = [
    <li
      key="kuwait"
      className=""
      onClick={() =>
        handleSelectCountry({
          id: null,
          name: "Default",
          nameAR: "الكويت",
          flag: "",
          code: "+ NA",
        })
      }>
      <img className="w-66-imgPhone" src="" alt="Flag" />
      <div>
        <h3>Default</h3>
        <p>+ NA</p>
      </div>
    </li>,
    ..._countrieslistA,
  ];

  return (
    <div className="fxlx-ggn">
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer"
          }}
          onChange={() => handlesearchnumcode(e)}
          onClick={() => setShowCountries(!showCountries)}>
          {cntry.id === null ? (
            ""
          ) : (
            <img className="w-66-imgPhone" src={cntry?.flag} />
          )}

          {cntry.id === null ? (
            <p className="cntrycss2">{cntry?.code}</p>
          ) : (
            <p className="cntrycss">{cntry?.code}</p>
          )}
        </div>
      </>

      <ul className={showCountries ? "expandPhone" : "expandPhone expShow"}>
        {_countrieslist}
      </ul>
      <input
        style={{ marginLeft: "-22px" }}
        placeholder="Phone Number"
        type="number"
        value={searchnum[0]}
        onChange={(e) => {
          handleGetUserByMobile(e.target.value);
        }}
        className="PhoneInputInput"
      />
    </div>
  );
};

export default SearchNumber;
