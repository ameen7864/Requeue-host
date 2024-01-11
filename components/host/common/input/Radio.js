import { RadioWrapper, RadioLabel, RadioInput, Mark } from "../../styled/common.styled"; 
const Radio = ({ name,disabled, gn, children,checked,handleChange }) => (
  <RadioWrapper>
    <RadioLabel>
      {/* <RadioInput name={name} defaultChecked={checked} disabled={disabled} type="radio" /> */}
      <RadioInput
          type="radio"
          value={children}
          checked={gn}
          name={name}
          onChange={handleChange}
        />
      <Mark />
      {children}
    </RadioLabel>
  </RadioWrapper>
);

export default Radio;
