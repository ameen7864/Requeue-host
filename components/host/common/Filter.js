import { FilterContainer, FilterSubContainer } from "../styled/common.styled";
import { useState, useEffect } from "react";
import axios from "../../../config/instance";
import { GrClose } from "react-icons/gr";
import InlineList from "./InlineList";
import { GlobalContext } from "../../../contextApi/Provider";
import { useContext } from "react";

const Filter = ({ handleCloseFilter, filterHead, subAreas }) => {
  const {
    seachcustomerinside,
    seachlocationinside,
    seachtimeinside,
    seachfamsinginside,
    seachqueuepreorderinside,
    seachqueueinside,
    seachcustomeroutside,
    seachlocationoutside,
    seachtimeoutside,
    seachfamsingoutside,
    seachqueuepreorderoutside,
    seachqueueoutside,
  } = useContext(GlobalContext);
  const [nameEnList, setNameEnList] = useState([]);
  useEffect(() => {
    const apiUrl = `/restaurant/getareas?restId=${
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("Rest="))
        ?.split("=")[1]
    }`;
    axios
      .get(apiUrl)
      .then((response) => {
        const extractedNames = response.data?.ListOfData.map((item) => ({
          name: item.NameEn,
        }));
        const namesWithAll = [{ name: "All" }, ...extractedNames];
        setNameEnList(namesWithAll);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [customerinside, setCustomerinside] = useState({
    name:
      seachcustomerinside && seachcustomerinside[0]
        ? seachcustomerinside[0]
        : "All",
  });
  const [customeroutside, setCustomeroutside] = useState({
    name:
      seachcustomeroutside && seachcustomeroutside[0]
        ? seachcustomeroutside[0]
        : "All",
  });
  const customers = [
    { name: "All" },
    { name: "Online" },
    { name: "Premium" },
    { name: "Walk-in" },
  ];
  const handleSelectCustomer = (e) => {
    if (filterHead.includes("Inside")) {
      seachcustomerinside[1](e.name);
      setCustomerinside(e);
    } else {
      seachcustomeroutside[1](e.name);
      setCustomeroutside(e);
    }
  };

  const [customerlocationinside, setCustomerlocationinside] = useState({
    name:
      seachlocationinside && seachlocationinside[0]
        ? seachlocationinside[0]
        : "All",
  });
  const [customerlocationoutside, setCustomerlocationoutside] = useState({
    name:
      seachlocationoutside && seachlocationoutside[0]
        ? seachlocationoutside[0]
        : "All",
  });
  const customerslocations = [
    { name: "All" },
    { name: "Nearest" },
    { name: "Check-in" },
  ];
  const handleSelectCustomerlocations = (e) => {
    if (filterHead.includes("Inside")) {
      seachlocationinside[1](e.name);
      setCustomerlocationinside(e);
    } else {
      seachlocationoutside[1](e.name);
      setCustomerlocationoutside(e);
    }
  };

  const [customertimeinside, setCustomertimeinside] = useState({
    name: seachtimeinside && seachtimeinside[0] ? seachtimeinside[0] : "All",
  });
  const [customertimeoutside, setCustomertimeoutside] = useState({
    name: seachtimeoutside && seachtimeoutside[0] ? seachtimeoutside[0] : "All",
  });
  const customerstimes = [
    { name: "All" },
    { name: "New booking" },
    { name: "Longest time" },
  ];
  const handleSelectCustomertimes = (e) => {
    if (filterHead.includes("Inside")) {
      seachtimeinside[1](e.name);
      setCustomertimeinside(e);
    } else {
      seachtimeoutside[1](e.name);
      setCustomertimeoutside(e);
    }
  };

  const [customerpreorderinside, setCustomerpreorderinside] = useState({
    name:
      seachqueuepreorderinside && seachqueuepreorderinside[0]
        ? seachqueuepreorderinside[0]
        : "All",
  });
  const [customerpreorderoutside, setCustomerpreorderoutside] = useState({
    name:
      seachqueuepreorderoutside && seachqueuepreorderoutside[0]
        ? seachqueuepreorderoutside[0]
        : "All",
  });
  const customerspreorders = [
    { name: "All" },
    { name: "Pre-order" },
    { name: "No Pre-order" },
  ];
  const handleSelectCustomerpreorders = (e) => {
    if (filterHead.includes("Inside")) {
      seachqueuepreorderinside[1](e.name);
      setCustomerpreorderinside(e);
    } else {
      seachqueuepreorderoutside[1](e.name);
      setCustomerpreorderoutside(e);
    }
  };

  const [customerpartyinside, setCustomerpartyinside] = useState({
    name:
      seachfamsinginside && seachfamsinginside[0]
        ? seachfamsinginside[0]
        : "All",
  });
  const [customerpartyoutside, setCustomerpartyoutside] = useState({
    name:
      seachfamsingoutside && seachfamsingoutside[0]
        ? seachfamsingoutside[0]
        : "All",
  });
  const customerspartys = [
    { name: "All" },
    { name: "Family" },
    { name: "Single" },
  ];
  const handleSelectCustomerpartys = (e) => {
    if (filterHead.includes("Inside")) {
      seachfamsinginside[1](e.name);
      setCustomerpartyinside(e);
    } else {
      seachfamsingoutside[1](e.name);
      setCustomerpartyoutside(e);
    }
  };

  const [customerspecareainside, setCustomerspecareainside] = useState({
    NameEn:
      seachqueueinside && seachqueueinside[0] ? seachqueueinside[0] : "All",
  });

  const [customerspecareaoutside, setCustomerspecareaoutside] = useState({
    name:
      seachqueueoutside && seachqueueoutside[0] ? seachqueueoutside[0] : "All",
  });
  const handleSelectCustomerspecareas = (e) => {
    if (filterHead.includes("Inside")) {
      seachqueueinside[1](e.NameEn);
      setCustomerspecareainside(e);
    } else {
      seachqueueoutside[1](e.NameEn);
      setCustomerspecareaoutside(e);
    }
  };

  return (
    <>
      <FilterContainer>
        <div className="close" onClick={() => handleCloseFilter()}>
          <GrClose />
        </div>
        {filterHead ? <h2>{filterHead}</h2> : ""}
        <FilterSubContainer>
          <h2>Select Customer</h2>
          <InlineList
            listItem={customers}
            value={
              filterHead.includes("Inside")
                ? customerinside.name
                : customeroutside.name
            }
            handleSelect={handleSelectCustomer}
          />
        </FilterSubContainer>

        <FilterSubContainer>
          <h2>Select customer locations</h2>
          <InlineList
            listItem={customerslocations}
            value={
              filterHead.includes("Inside")
                ? customerlocationinside.name
                : customerlocationoutside.name
            }
            handleSelect={handleSelectCustomerlocations}
          />
        </FilterSubContainer>

        <FilterSubContainer>
          <h2>Select customer time</h2>
          <InlineList
            listItem={customerstimes}
            value={
              filterHead.includes("Inside")
                ? customertimeinside.name
                : customertimeoutside.name
            }
            handleSelect={handleSelectCustomertimes}
          />
        </FilterSubContainer>

        <FilterSubContainer>
          <h2>Select customer pre-order</h2>
          <InlineList
            listItem={customerspreorders}
            value={
              filterHead.includes("Inside")
                ? customerpreorderinside.name
                : customerpreorderoutside.name
            }
            handleSelect={handleSelectCustomerpreorders}
          />
        </FilterSubContainer>

        <FilterSubContainer>
          <h2>Select Party</h2>
          <InlineList
            listItem={customerspartys}
            value={
              filterHead.includes("Inside")
                ? customerpartyinside.name
                : customerpartyoutside.name
            }
            handleSelect={handleSelectCustomerpartys}
          />
        </FilterSubContainer>

        <FilterSubContainer>
          <h2>Select special Area</h2>
          <InlineList
            listItem={[{ NameEn: "All" }, ...subAreas]}
            value={
              filterHead.includes("Inside")
                ? customerspecareainside.NameEn
                : customerspecareaoutside.NameEn
            }
            handleSelect={handleSelectCustomerspecareas}
          />
        </FilterSubContainer>
      </FilterContainer>
    </>
  );
};

export default Filter;
