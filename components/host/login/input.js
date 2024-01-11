import { LoginInput, LabelIcon } from "../styled/login/login.styled";

const Input = (props) => {
  return (
    <div>
      <LabelIcon>{props.img}</LabelIcon>
      <LoginInput
        type={props.type}
        required
        name={props.name}
        defaultValue={props.value}
        placeholder={props.title}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Input;
