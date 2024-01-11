 import { Introtext } from '../styled/login/login.styled';

const LoginIntro = (props) => {
    return (
        <Introtext>{props.title}<br/><span>{props.text}</span></Introtext>
    )
}

export default LoginIntro