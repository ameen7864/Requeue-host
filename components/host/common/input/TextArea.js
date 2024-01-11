import { TeaxtAreaModalStyle } from '../../styled/common.styled';

const TextArea = (props) => {
    return (
        <>
            <TeaxtAreaModalStyle id={props.id} name={props.name} placeholder={props.placeholder}>
            </TeaxtAreaModalStyle>
        </>
    )
}

export default TextArea
