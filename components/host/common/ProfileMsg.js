import { DateProfileMsgBox, MsgProfileMsgBox, ProfileMsgBox, SenderProfileMsgBox } from "../styled/common.styled"

function ProfileMsg() {
    return (
        <ProfileMsgBox>
            <SenderProfileMsgBox>
                From admin :
            </SenderProfileMsgBox>
            <DateProfileMsgBox>
            02 FEB 2020
            </DateProfileMsgBox>
            <MsgProfileMsgBox>Thanks for using our application, we just uploaded new
                Option in ( setting ) that well help you to manage your branch . </MsgProfileMsgBox>
        </ProfileMsgBox>
    )
}

export default ProfileMsg