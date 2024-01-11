import React from "react";
import { StyledInputModal } from "../../styled/common.styled";

const Input = (props) => {
  return (
    <>
    {props.vlu?
      <StyledInputModal
        name={props.name}
        placeholder={props.placeholder}
        defaultValue={props.value}
        disabled={true}
        onChange={props.onChange}
      />
     : <StyledInputModal
        name={props.name}
        placeholder={props.placeholder}
        defaultValue={props.value}
        onChange={props.onChange}
      />
      }
    </>
  );
};

export default Input;
