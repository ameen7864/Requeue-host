
import { useState, useEffect } from 'react'; 

const Select = ({ options, handlesetSelecetedValue , selectedval }) => {
  // const [selectedOption, setSelectedOption] = useState(selectedval?selectedval:options[0].name);
  // const handleSelection = (e) => {
  //   setSelecetedValue(e.target.value);
  //   setSelectedOption(e.target.value);
  // }
  return (
    <>
      <div className="ggnsettingsSelect">
        <select
          value={selectedval} 
          onChange={e => handlesetSelecetedValue(e)}>
          {options.map(o => (
            <option key={o.name}  value={o.name}>{o.name}</option>
          ))}
        </select>
      </div>
    </>
  );
};

 
export default Select
