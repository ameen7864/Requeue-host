import styled from "styled-components";

export const HeaderStyle = styled.header`
  width: 100%;
  height: 70px;
  background: var(--headerBg);
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.32);
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  z-index: 9;
  .PhoneInput {
    width: 100%;
    .PhoneInputInput {
      font-size: 25px;
    }
  }
`;
export const SidemenuParentStyle = styled.div`
  height: calc(100vh - 70px);
  width: 100%;
  max-width: 190px;
  justify-content: space-between;
  flex-direction: column;
  display: flex;
`;
export const SidemenuStyle = styled.div`
  width: 100%;
  height: 503px;
  border-radius: 17px;
  background: var(--boxBg);
  margin-top: 25px;
  padding: 20px;

  @media (max-width: 768px) {
    border-top-left-radius: 0px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 35px;
    border-bottom-left-radius: 0px;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.3),
      rgba(255, 255, 255, 0.2)
    );
    margin-top: 0px;
    width: 122px;
    height: 479px;
    backdrop-filter: blur(10px);
  }

  // -webkit-animation: fadein 0.5s;
  // -moz-animation: fadein 0.5s;
  // -ms-animation: fadein 0.5s;
  // -o-animation: fadein 0.5s;
  // animation: fadein 0.5s;
`;
export const AddClientStyle = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 19px;
  background: linear-gradient(#7537be 0%, #3b1c5f 100%);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  color: #fff;
  cursor: pointer;
  b {
    font-size: 84px;
    color: #fff;
    line-height: 1;
  }
  strong {
    font-size: 20px;
    font-weight: 400;
  }
`;
export const ProfileHead = styled.div`
  width: 100%;
  max-width: 190px;
  flex-direction: row;
  display: inline-flex;
  svg {
    // border: 2px solid;
    // border-radius: 50%;
    display: inline-block;
    // padding: 7px 1px 0px 1px;
    width: 35px !important;
    height: 35px !important;
  }
  span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    font-weight: 600;
    font-size: 15px;
  }
`;
export const SearchNumberStyle = styled.div`
  width: 100%;
  max-width: 300px;
  height: 41px;
  border-radius: 5px;
  padding: 10px;
  background: var(--boxBg);
  display: inline-flex;
  position: relative;
`;
export const HeadIconStyle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  padding: 10px;
  background: var(--boxBg);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    width: 22px !important;
    height: 22px !important;
  }
  &.active {
    background: var(--fg);
    color: var(--boxBg);
  }
`;
export const PageNameStyle = styled.h1`
  margin: 0px;
  width: 100%;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.75em;
  }
`;
export const SideContHoldStyle = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  width: 100%;
  max-width: 390px;
  padding-left: 10%;
`;

export const OfflineStyle = styled.div`
  width: 100%;
  // height: 102px;
  background: var(--boxBg);
  text-align: center;
  padding: 25px;
  h1 {
    font-weight: bold;
    font-size: 32px;
    color: #ef5e82;
    margin: 0px;
    text-align: center;
  }
  p {
    font-weight: bold;
    font-size: 18px;
    color: #7f8384;
    margin: 0px;
  }
`;
export const SidemenuTextStyle = styled.div`
  text-align: center;
  gap: 40px;
  flex-flow: wrap;
  flex-direction: column;
  justify-content: center;
  display: flex;
  margin: 0px;
  margin-top: 35px;
  h1 {
    margin: 0px;
    font-size: 27px;
    &::after {
      content: "";
      background: var(--fg);
      height: 2px;
      display: block;
      position: relative;
      width: auto;
      max-width: 85px;
      margin: 0px auto;
    }
  }
  a {
    color: var(--fg);
    text-decoration: none;
    font-size: 16px;
  }
`;
export const MessageStyle = styled.div`
  width: 100%;
  background: var(--boxBg);
  text-align: center;
  padding: 25px 40px;
  position: relative;
  h1 {
    font-weight: bold;
    font-size: 32px;
    color: #ef5e82;
    margin: 0px;
    text-align: center;
  }
`;
export const TeaxtAreaStyle = styled.textarea`
  width: 100%;
  background: var(--bg);
  height: 138px;
  border-radius: 7px;
  resize: none;
  padding: 15px;
  font-size: 18px;
  text-align: left;
  color: var(--fg);
  outline: none;
  border: none;

  &::placeholder {
    color: var(--fg);
  }
`;
export const PromptStyle = styled.p`
  font-weight: normal;
  font-size: 14px;
  color: #ef5e82;
  display: block;
`;
export const ULStyle = styled.ul`
  list-style: none;
  width: 35%;
  text-align: left;
  padding: 0px;
  li {
    padding: 10px 15px;
    font-size: 18px;
    cursor: pointer;
    &.active {
      background: var(--bg);
      border-radius: 7px;
    }
  }
`;
export const SubmitStyle = styled.button`
  width: 131px;
  height: 99px;
  border-radius: 10px;
  background: var(--bg);
  color: var(--fg);
  border: none;
`;
export const MsgCloseStyle = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  font-size: 30px;
  cursor: pointer;
`;

export const PeraFoot = styled.p`
  text-align: left;
  color: #fff;
  margin: 0px;
  line-height: 1;
  font-size: 12px;
`;
export const LogoFoot = styled.img`
  width: 75px;
  object-fit: contain;
`;
export const NavTopStyle = styled.div`
  background: var(--inTopBg);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  position: sticky;
  top: 0;
  z-index: 1;
  * {
    margin: 0px;
  }
  p {
    font-size: 22px;
    font-weight: 300;
  }
  h1 {
    font-size: 20px;
    font-weight: 600;
  }
  span {
    font-size: 22px;
    margin-right: 15px;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
export const NavBotStyle = styled.div`
  background: var(--inBotBgTrans);
  padding: 15px;
  border-radius: 0px 0px 16px 16px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  position: sticky;
  top: 56px;
  z-index: 1;
  backdrop-filter: blur(10px);
  --webkit-backdrop-filter: blur(10px);
  * {
    margin: 0px;
  }
  p {
    padding: 5px 15px;
    font-size: 20px;
    cursor: pointer;
    &.active {
      background: var(--bg);
      border-radius: 10px;
    }
  }
  span {
    font-size: 22px;
    margin-right: 15px;
    margin-top: 2.5px;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ParentCustButtonsStyle = styled.div`
  // width: auto;
  // /* height: calc(100% - 10px);  */
  // height: fit-content;
  // position: absolute;
  // right: 0px;
  // top: 5px;
  // bottom: 5px;
  // border-radius: 16px;
  // overflow: hidden;
  // z-index: -1;
  // max-height: 235px;
  // z-index: -1;
  display: none;
`;
export const SeatButtonStyle = styled.button`
  width: 232px;
  height: 78px;
  background: #04d1a8;
  color: #fff;
  border: none;
  font-size: 20px;
  float: right;
  clear: both;
`;
export const HoldButtonStyle = styled.button`
  width: 232px;
  height: 78px;
  background: #fba842;
  color: #fff;
  border: none;
  font-size: 20px;
  float: right;
  clear: both;
`;
export const CancelButtonStyle = styled.button`
  width: 232px;
  height: 78px;
  background: #ef5e82;
  color: #fff;
  border: none;
  font-size: 20px;
  float: right;
  clear: both;
`;
export const CustBoxStyle = styled.div`
  width: 100%;
  min-height: 246px;
  border-radius: 16px;
  background: var(--boxBg);
  border: var(--ListBorder);
  box-shadow: 0px 0px 20px rgb(0 0 0 / 20%);
  padding: 15px;
  transform: translate(0px);
  transition: 0.4s;
  z-index: 0;
`;

export const ParentCustBoxStyle = styled.div`
width: 100%;
height: auto; 
position:relative;
margin-top 15px; 
overflow-y: hidden;
z-index:0;
&::after{
    position:absolute;
    left:0;
    height:101%;
    width:0px;
    content:"";
    top:-1px; 
    bottom:-1px; 
    background:var(--CustGredient); 
    // transform: translate(-70px);
    transition:0.8s;  
}
// &.edit{
//     &::after{ 
//         width:70px;
//         // transform: translate(0px);
//         transition:0.2s;
//     }
//     ${`${CustBoxStyle}{
//             transform: translate(-186px);
//             transition:0.8s;
//         }`}
//     }
`;
export const RqThumbStyle = styled.div`
  width: 137px;
  height: 18px;
  border-radius: 0px 16px;
  background: #7125c4;
  text-align: center;
  font-size: 11px;
  position: absolute;
  right: -1px;
  top: -1px;
  line-height: 16px;
  color: #fff;
  z-index: 1;
`;
export const PriceThumbStyle = styled.div`
  width: 137px;
  height: 18px;
  border-radius: 0px 16px;
  background: #08d0ff;
  text-align: center;
  font-size: 15px;
  position: absolute;
  right: 110px;
  top: -1px;
  line-height: 17px;
  color: #fff;
  z-index: 0;
`;
export const SeqNumStyle = styled.div`
  font-size: 16px;
  position: absolute;
  left: 15px;
  top: 15px;
  color: var(--fg);
`;
export const Edit = styled.p`
  font-size: 14px;
  color: #3ab4f4;
  margin: 0px;
  cursor: pointer;
  text-transform: uppercase;
  margin-left: 15px;
`;
export const ChairsStyle = styled.div`
  text-transform: uppercase;
  padding: 15px 0;
  .cont {
    padding: 0px 25px;
    border-left: 2px solid var(--CustBorder);
    min-width: 110px;

    h2 {
      font-size: 63px;
      text-transform: uppercase;
      margin: 0px;
      text-align: center;
      margin-bottom: 15px;
    }
    // span {
    //   font-size: 14px;
    //   text-transform: uppercase;
    //   margin: 0px;
    //   margin-left: 15px;
    //   color: #a0a5a8;
    // }
  }
`;

export const Chairsbutton = styled.div`
  margin-top: 15px;
  padding: 0 25px;
  border-left: 2px solid var(--CustBorder);
  height: 110px;
  min-width: 110px;
`;

export const ChairSeatButtonStyle = styled.button`
  width: 86px;
  height: 107px;
  border-radius: 30px;
  text-transform: uppercase;
  font-weight: bold;
  background-image: linear-gradient(#4be0c2, #06836a);
  color: #fff;
  border: none;
  font-size: 20px;
  float: right;
  clear: both;
`;

export const IamgeAvatarStyle = styled.img`
  border-radius: 50%;
  height: 90px;
  width: 90px;
  object-fit: cover;
  overflow: hidden;
  margin-left: 30px;
  margin-right: 15px;
  border: 2px solid #fff;

  @media screen and (max-width: 426px) {
    height: 50px;
    width: 50px;
    margin-left: -5px;
    margin-right: -6px;
  }
`;
export const TextDetailSmallStyle = styled.div`
  // margin-left: 15px;
  h1 {
    margin: 0px;
    font-weight: normal;
    font-size: 20px;
    letter-spacing: 0.01em;
    text-align: left;
    text-transfor: uppercase;
  }
  a {
    font-weight: normal;
    font-size: 20px;
    letter-spacing: 0.01em;
    color: #1caaf4;
    text-decoration: none;
  }
`;
export const StatusInfoStyle = styled.div`
  border-top: 1px solid var(--CustBorder);
  border-bottom: 1px solid var(--CustBorder);
  padding: 0px 15px 50px;
`;
export const HeadInfoStyle = styled.h2`
  font-weight: normal;
  font-size: 17px;
  letter-spacing: 0.01em;
  text-align: left;
  color: var(--CustInfoHead);
`;
export const TileInfoStyle = styled.div`
  float: left;
  display: inline-flex;
  color: var(--fg);
  margin-right: 30px;
  gap: 10px;
  p {
    margin: 0px;
    color: var(--fg);
  }
  svg {
    width: 22px;
    height: 22px;
  }
  .check_color {
    color: #04d1a8;
  }
`;

export const ExpandCustHold = styled.div`
  // border-top:2px solid var(--CustBorder);
  padding: 0px 15px 65px 15px;
  clear: both;
  display: block;
`;
export const ParentForBoth = styled.div`
  display: flex;
  gap: 20px;
`;
export const ParentExpandDtl = styled.div`
  // width:100%;
  max-width: 75%;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 15px;
`;
export const ExpandDtl = styled.div`
  // margin-right: 30px;
  gap: 10px;
  display: inline-flex;
  min-width: 170px;
  span {
    display: inline-flex;
    background: var(--bg);
    width: 41px;
    height: 37px;
    justify-content: center;
    flex-direction: column;
    border-radius: 5px;

    svg {
      text-align: center;
      width: 29px;
      color: var(--fg);
      stroke: var(--fg);
      font-size: 10px;
      height: 29px;
      margin: 0 auto;
    }
    &.clrd {
      background: #ef5e82;
      svg {
        color: #fff;
        stroke: #fff;
      }
    }
  }
  p {
    display: inline-flex;
    justify-content: center;
    flex-direction: row;
    align-self: center;
    margin: 0;
    span {
      background: transparent;
      display: inline-block;
      width: auto;
      height: unset;
      justify-content: unset;
      border-radius: unset;
      margin-left: 5px;
      color: #ef5e82;
    }
  }
`;
export const AnotherParentExpandDtl = styled.div`
  width: 100%;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 15px;
`;
export const AnotherExpandDtl = styled.div`
  align-self: flex-start;
  display: inline-flex;
  width: 100%;
  column-gap: 20px;
  span {
    display: inline-flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 5px;

    svg {
      text-align: center;
      width: 29px;
      color: #7dcdf7;
      stroke: #7dcdf7;
      font-size: 10px;
      height: 29px;
      margin: 0 auto;
    }
  }
  p {
    display: inline-flex;
    justify-content: center;
    flex-direction: row;
    align-self: center;
    font-size: 15px;
    margin: 0;
    span {
      background: transparent;
      display: inline-block;
      width: auto;
      height: unset;
      justify-content: unset;
      border-radius: unset;
      margin-left: 5px;
      color: #ef5e82;
    }
  }
`;
export const FilterContainer = styled.div`
  width: 100%;
  background: var(--boxBg);
  height: calc(100vh - 70px);
  position: absolute;
  overflow-y: auto;
  z-index: 8;
  h2 {
    text-align: center;
    font-family: Lato;
    font-weight: normal;
    font-size: 19px;
    letter-spacing: 0.01em;
    color: var(--fg);
    text-transform: uppercase;
  }
  .close {
    fill: var(--fg);
    stroke: var(--fg);
    color: var(--fg);
    cursor: pointer;
    left: 20px;
    top: 15px;
    font-size: 23px;
    position: absolute;
    * {
      fill: var(--fg);
      stroke: var(--fg);
      color: var(--fg);
    }
  }

  ${`${ULStyle}{
           li{
            display: inline-block;
            padding: 5px 20px;
            &.active{
                background:#7537BE;
                padding: 5px 20px;
                color:#fff
            }
           }
        }`}
`;
export const FilterSubContainer = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid var(--CustBorder);

  &:first-child {
    border-top: unset;
    background: #000;
  }

  h2 {
    text-align: left;
    font-family: Lato;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.01em;
    text-align: left;
  }
`;
export const HomeSingle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding-bottom: 15px;
  &::-webkit-scrollbar {
    width: 0.01px;
  }

  &::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
  &.wwfilter {
    ${`${FilterContainer}{
            background: var(--inBotBg);
            // min-height: 250px;
            position: relative;
            margin-top: -14px;
            border-radius: 0px 0px 16px 16px;
            overflow-y: unset;
            .close{
                left: auto;
                right: 20px;
                top: -30px;
            }
            ${`${FilterSubContainer}{
                         border:none;
                         width:50%;
                         float:left
                    }`}   
        }`}
  }
`;

export const Empty = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 35px;
  letter-spacing: 0.01em;
  text-align: center;
  color: #575858;
  height: 100%;
  justify-content: center;
`;
// Home2Parent
export const Home2Parent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  height: calc(100vh - 70px);
  &.list {
    .dnoneLst {
      display: none;
    }
    ${`${StatusInfoStyle}{
        // display:none;
        }`}
    ${`${ExpandCustHold}{
        // display:none;
        }`}
    ${`${CustBoxStyle}{
            min-height:175px;
            }`}
    ${`${SeatButtonStyle}{
            width: 120px;
            height:100%;
            }`}
    ${`${HoldButtonStyle}{
            width: 120px;
            height:100%;
            }`}
    ${`${CancelButtonStyle}{
            width: 120px;
            height:100%;
            }`}
    ${`${ParentCustButtonsStyle}{
            // display: flex;
            // flex-direction: row-reverse;
            // max-height: 175px;
            }`}
    .edit {
      ${`${CustBoxStyle}{
              transform: translate(-330px);
              }`}
    }
  }
  &.grid {
    ${`${ParentForBoth}{
            flex-direction: column;
            // border-top: 1px solid var(--CustBorder);
            padding-top: 15px;
        }`}
    ${`${AnotherParentExpandDtl}{ 
            // border-top: 1px solid var(--CustBorder);
            padding-top: 15px;
            &:last-child(){
                // border-top: 1px solid var(--CustBorder);
                padding-top: 15px;
            }
        }`}
  }
`;
export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
  a {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;
export const StyledModalContainer = styled.div`
  width: 100%;
  // height: 100%;
  border-radius: 16px;
  background: var(--addCustmodalBg);
  opacity: 1;
  padding: 15px 40px;
  box-shadow: inset 0 0 20px 0px rgb(0 0 0 / 15%);

  h2 {
    font-weight: 900;
    font-size: 20px;
    letter-spacing: 0.01em;
    text-align: left;
    text-align: center;
  }
  ${`${ULStyle}{
            &:nth-child(2) {
                border-top: unset;
             }
            border-top: 1px solid var(--CustBorder);
            margin:0px;
            padding:15px 0;
            li{
                padding: 7px 15px;
                font-size: 16px;
            }
            .active{
                background:#7537BE;
                color:#fff;
            }
        }`}

  @media (max-width: 768px) {
    background-image: linear-gradient(180deg, #464545, #242627);
  }
`;
export const ChairsULStyleInline = styled.ul`
  list-style: none;
  padding: 0px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  li {
    flex: 1 1 20%;
    height: 50px;
    transition: 0.5s;
    div {
      height: 50px;
      width: 50px;
      display: flex;
      justify-content: center;
      text-align: center;
      flex-direction: column;
      border-radius: 50%;
      font-weight: 900;
      font-size: 15px;
      letter-spacing: 0.01em;
      transition: 0.5s;
      cursor: pointer;
    }
    &.active {
      transition: 0.5s;
      div {
        transition: 0.5s;
        height: 50px;
        width: 50px;
        background: #7537be;
        color: #fff;
        font-weight: 900;
        font-size: 25px;
        letter-spacing: 0.01em;
      }
    }
  }
`;
export const ConfirmButtonModalAddChairs = styled.button`
  width: 246px;
  height: 94px;
  border-radius: 14px;
  background: #7537be;
  box-shadow: 0px 10px 30px rgb(0 0 0 / 26%);
  align-self: center;
  margin-bottom: 50px;
  border: unset;
  font-weight: 400;
  font-size: 25px;
  letter-spacing: 0.01em;
  color: #fff;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 189px;
    height: 55px;
    border-radius: 7px;
    background-image: linear-gradient(180deg, #4be0c2, #00624e);
  }
`;
export const SpacedFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const StyledInputModal = styled.input`
  width: 100%;
  outline: none;
  border: 0px transparent;
  background: transparent;
  padding: 15px 0px;
  border-bottom: 1px solid var(--CustBorder);
  font-weight: 500;
  font-size: 17px;
  letter-spacing: 0.01em;
  color: var(--fg);
  margin-top: 30px;
  &::placeholder {
    color: var(--fg);
  }
`;
export const RadioWrapper = styled.div`
  display: inline-block;
`;
export const Mark = styled.span`
  display: inline-block;
  position: relative;
  border: 1px solid var(--fg);
  width: 20px;
  height: 20px;
  left: 0;
  border-radius: 50%;
  margin-right: 15px;
  vertical-align: middle;
  overflow: hidden;
  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: #7537be;
    opacity: 0;
    left: 50%;
    top: 50%;
    position: absolute;
    transition: all 110ms;
  }
`;
export const RadioInput = styled.input`
  position: absolute;
  visibility: hidden;
  display: none;
  &:checked + ${Mark} {
    &::after {
      width: 20px;
      height: 20px;
      opacity: 1;
      left: 0;
      top: 0;
    }
  }
`;
export const RadioLabel = styled.label`
  display: flex;
  cursor: pointer;
  padding: 5px 10px 5px 0;
  position: relative;
  margin-right: 30px;
  ${(props) =>
    props.disabled &&
    `
        cursor: not-allowed;
        opacity: 0.4;
    `}
`;
export const TeaxtAreaModalStyle = styled.textarea`
  width: 100%;
  height: 138px;
  border-radius: 7px;
  resize: none;
  padding: 15px;
  font-size: 18px;
  text-align: left;
  color: var(--fg);
  outline: none;
  border: none;
  margin-top: 30px;
  margin-bottom: 15px;
  &::placeholder {
    color: var(--fg);
  }
`;
export const SettingsBox = styled.div`
  width: 100%;
  min-height: 246px;
  border-radius: 16px;
  background: var(--boxBg);
  padding: 15px 25px;
  border: var(--ListBorder);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.22);
  position: relative;
  h3 {
    position: relative;
    span {
      font-size: 32px;
    }
  }
  p {
    margin: 0px;
    font-size: 19px;
    letter-spacing: 0.01em;
    text-align: left;
  }
`;
export const GridForTwo = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding: 15px 40px;
  grid-gap: 30px;
  padding-top: 30px;
`;
export const EditSetting = styled.button`
  width: 84px;
  height: 36px;
  border-radius: 7px;
  background: #7dcdf7;
  color: #fff;
  font-weight: normal;
  font-size: 20px;
  letter-spacing: 0.01em;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.22);
  border: none;
  outline: none;
  cursor: pointer;
`;
export const SaveSetting = styled.button`
  width: 106px;
  height: 61px;
  border-radius: 7px;
  background: #04d1a8;
  border: 1px solid #4b4b4b;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.22);
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: normal;
  font-size: 18px;
  letter-spacing: 0.01em;
  color: #f5f9fc;
  position: absolute;
  right: 15px;
`;
export const SaveModl = styled.button`
  width: 187px;
  height: 60px;
  border-radius: 15px;
  background: #04d1a8;
  border: 1px solid #4b4b4b;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.22);
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: normal;
  font-size: 18px;
  letter-spacing: 0.01em;
  color: #f5f9fc;
`;
export const InputSettings = styled.input`
  height: 54px;
  border-radius: 4px;
  background: var(--fg);
  color: var(--bg);
  outline: none !important;
  border: var(--ListBorder);
  padding: 5px 15px;
  font-weight: 300;
  font-size: 14px;
  letter-spacing: 0.01em;
  text-align: center;

  &::placeholder {
    color: var(--bg);
  }
`;
export const ModlTextarea = styled.textarea`
  width: 100%;
  height: 130px;
  border-radius: 20px;
  resize: none;
  padding: 15px 30px;
  font-size: 18px;
  text-align: left;
  color: var(--fg);
  outline: none;
  border: none;
  margin-top: 10px;
  margin-bottom: 10px;
  background: var(--bg);
  &::placeholder {
    color: var(--bg);
  }
`;
export const DangerPera = styled.p`
  font-weight: normal;
  font-size: 15px;
  letter-spacing: 0.01em;
  text-align: center;
  color: #ef5e82;
`;
export const OpeningStyle = styled.div`
  h2 {
    font-weight: 600;
    font-size: 17px;
    letter-spacing: 0.01em;
    color: #04d1a8;
  }
  ${`${StyledInputModal}{ 
        text-align: center;
        border: 1px solid var(--CustBorder);
        margin-top: 0px;
        border-radius: 15px;
        padding-right: 20px;
        width: auto;
        padding-left: 20px;
        padding-top: 10px;
    padding-bottom: 10px;
        }`}
`;
export const ClosingStyle = styled.div`
  h2 {
    font-weight: 600;
    font-size: 17px;
    letter-spacing: 0.01em;
    color: #ef5e82;
  }
  ${`${StyledInputModal}{ 
        text-align: center;
        border: 1px solid var(--CustBorder);
        margin-top: 0px;
        border-radius: 15px;
        padding-right: 20px;
        width: auto;
        padding-left: 20px;
        padding-top: 10px;
    padding-bottom: 10px;
        }`}
`;
export const UldaysStyle = styled.ul`
  text-align: center;
  float: left;
  display: block;
  li {
    display: inline-block;
    margin: 0px 10px;
    padding: 10px 15px;
    text-align: center;
    background: var(--fg);
    color: var(--bg);
    border-radius: 30px;
    text-align: center;
    min-width: 100px;
    cursor: pointer;
    transition: 0.5s;

    &.selected {
      background: #7537be;
      color: #fff;
      transition: 0.5s;
    }
    &[disabled] {
      background: #818181;
      color: var(--fg);
      cursor: not-allowed;
    }
  }
`;
export const ProfilePopUpButton = styled.button`
  background: var(--headerBg);
  color: var(--fg);
  width: 187px;
  height: 55px;
  border-radius: 5px;
  padding: 10px 25px;
  border: transparent;
  margin-bottom: 5px;
  span {
    font-weight: normal;
    font-size: 15px;
    letter-spacing: 0.01em;
  }
  i {
    font-size: 25px;
    letter-spacing: 0.01em;
    display: inline-block;
    svg {
      vertical-align: text-top;
    }
  }
`;
export const ProfileMsgBox = styled.div`
  width: 100%;
  // min-height: 145px;
  border-radius: 16px;
  background: var(--fg);
  color: var(--bg);
  padding: 20px 30px;
  opacity: 0.9;
`;
export const SenderProfileMsgBox = styled.span`
  color: var(--bg);
  float: left;
  width: 60%;
  font-weight: 900;
  font-size: 14px;
  letter-spacing: 0.01em;
`;
export const DateProfileMsgBox = styled.span`
  color: var(--bg);
  float: right;
  width: 40%;
  font-weight: 900;
  font-size: 14px;
  letter-spacing: 0.01em;
  text-align: right;
`;
export const MsgProfileMsgBox = styled.p`
  color: var(--bg);
  clear: both;
  display: block;
  width: 800px;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.01em;
  line-height: 22px;
  text-align: left;
  float: left;
  padding: 10px 20px;
`;
export const Hold = styled.div`
  .list {
    ${`${ParentCustButtonsStyle}{
            // height:calc(100% - 10px);
            }`}
    .edit {
      ${`${CustBoxStyle}{
              transform:translate(-210px);
              }`}
    }
  }
  ${`${HeaderStyle}{
           background:linear-gradient(#fba842 0%, #7e5421 100%);
        }`}
  ${`${HoldButtonStyle}{
          display:none;
        }`} 
     ${`${SeatButtonStyle}{
         min-height:100px;
        }`}  
 ${`${CancelButtonStyle}{
         min-height:100px;
        }`}
`;

export const History = styled.div`
  .list {
    ${`${ParentCustButtonsStyle}{
            // height:calc(100% - 10px);
            }`}
    .edit {
      ${`${CustBoxStyle}{
              transform: translate(-200px);
              }`}
    }
    ${`${HoldButtonStyle}{
            width: 230px;
        }`}
  }

  ${`${HeaderStyle}{
          background: linear-gradient(#08d0ff 0%, #046880 100%);
        }`}
  ${`${SeatButtonStyle}{
          display:none;
        }`}  
 ${`${CancelButtonStyle}{
          display:none;
        }`}  
     ${`${HoldButtonStyle}{
         min-height:150px;
           height: 100%;
        }`}
`;

export const QueueMain = styled.div`
  // ${`${ParentCustButtonsStyle}{
    //     height:calc(100% - 10px);
    //     }`}

  .list {
    ${`${ParentCustButtonsStyle}{
          height:calc(100% - 10px);
          }`}
    .edit {
      ${`${CustBoxStyle}{
            transform:translate(-210px);
            }`}
    }
  }
  ${`${HoldButtonStyle}{
        display:none;
      }`}
  ${`${SeatButtonStyle}{
       min-height:100px;
      }`}  
${`${CancelButtonStyle}{
       min-height:100px;
      }`}
`;

export const TablePage = styled.div`
  height: 100vh;
  background: var(--tablePageBg);
  overflow-y: auto;
`;
export const TableHeaderParent = styled.div`
  /* height: 105px; */
`;
export const TableFilterMain = styled.div`
  --webkit-scrollbar-width: 2px;
  overflow-y: hidden;
  overflow-x: scroll;
  height: 105px;
  flex-direction: row;
  text-align: center;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  border-radius: 0px 0px 17px 17px;
  background: var(--gredientTable);
  padding: 25px 20px;
  gap: 15px;
  flex-wrap: wrap;
  ${`${StyledInputModal}{
        max-width:150px;
        margin-top:0px;
        border-radius: 8px;
        background:var(--bg);
        border: 2px solid var(--tableSelectionfilterBg);
        padding: 15px;
        }`}
  ${`${NavBotStyle}{
        background: transparent;
        backdrop-filter:none;
        align-self: center;
        top: 0;
        padding: 0 15px;
        gap: 15px;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        p{
          padding: 15px 15px;
          font-size: 16px;
          cursor: pointer;
          background: var(--bg);
          border-radius: 10px;
          min-width: 80px;
          
            &.active{
              background:#7537BE;
              color:#fff;
            }
          }
        }`}
        
  h1 {
    margin: 0px;
    line-height: 0;
    cursor: pointer;
  }
  &.expand {
    height: auto;
    .insi {
      width: 100%;
      display: flex;
      gap: 15px;
    }
  }
`;
export const SideBarParentTable = styled.div`
  width: 325px;
`;
export const BgSelectable = styled.div`
  background: var(--tableSelectionfilterBg);
  padding: 15px 5px;
  border-radius: 15px;
  ${`${NavBotStyle}{
        p{
           font-size: 14px;
           min-width: 85px;
          }
        }`}
`;
export const BodyTable = styled.div`
  width: 100%;
`;
export const FlexTableHeaderCloseParent = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: row;
  text-align: center;
  align-items: center;
  height: 100%;
  .close {
    margin-right: 15px;
    float: left;
    text-align: left;
    margin-top: -15px;
    font-size: 30px;
    cursor: pointer;
  }
`;
export const SmallSummary = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 10px 15px 15px 15px;
  background: var(--gredientSideBg);
  p {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 0px;
    &.busy {
      color: #ef5e82;
    }
    &.available {
      color: #04d1a8;
    }
    span {
      width: 40px;
      color: var(--fg);
      text-align: center;
    }
  }
  .flxzSn {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0px 5px;
    width: 100%;
    p {
      width: 50%;
      font-weight: normal;
      font-size: 15px;
      letter-spacing: 0.01em;
      width: 50%;
      text-align: left;
      padding: 5px 0px;
      display: block;
    }
  }
`;
export const NameInSUmmarySmall = styled.h3`
  font-weight: 900;
  font-size: 17px;
  letter-spacing: 0.01em;
  margin: 10px 0px;
`;
export const LargeSummary = styled.div`
  height: calc(100vh - 255px);
  min-height: 383px;
  border-radius: 23px;
  ${`${SmallSummary}{
         height:100%;  
         display: flex;
         padding: 20px;
         gap: 20px;
         justify-content: space-between;
         padding-bottom:35px;
         .tabNo{
            font-weight: 900;
            font-size: 26px;
            letter-spacing: 0.01em; 
            margin:0px;
            width: auto;
            display: block;
         }
         .availableImg{
           height:170px;
           text-align: center;
           display: flex;
           justify-content: center;
           align-items: center; 
           h1{ 
              font-weight: normal;
              font-size: 32px;
              letter-spacing: 0.01em;
              text-align: left;
              // color: #4be0c2;
              color: #0da98a;
              text-shadow: 0px 0px 20px var(--bg);
           }
         }


        }`}
`;

export const TablesGridParent = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  padding: 20px;
`;

export const TableGridChild = styled.div`
  width: 180.25px;
  height: 164.49px;
  background: #ef5e82;
  /* filter: drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.14)); */
  filter: drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.2));
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.1s;
  color: #fff;
  &.available {
    background: #4be0c2;
  }
  &.selected {
    background: #7537be;
  }
  &:hover {
    filter: brightness(1.1);
    transition: 0.1s;
  }
`;

export const TableNoInChild = styled.h1`
  font-weight: 900;
  font-size: 60px;
  letter-spacing: 0.01em;
  margin: 0px;
`;
export const ChairsInChild = styled.p`
  font-weight: 900;
  font-size: 16px;
  letter-spacing: 0.01em;
  margin: 0px;
`;
export const Fl2by2 = styled.div`
  gap: 10px;
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
`;
export const SideSecSmallButton = styled.button`
  width: 47%;
  height: 36px;
  border-radius: 4px;
  border: none;
  background: #ef5e82;
  &.normal {
    background: var(--bg);
  }
`;
export const ClrPop = styled.div`
  clear: both;
  padding: 15px 0px;
  display: flex;
  gap: 15px;
  ${`
  ${ExpandDtl}{
    min-width: auto;
    // margin-right: 15px;
    span{
      background:transparent;
      width: 30px;
      svg{
        width:25px;
        stroke:#4be0c2;
        color: #4be0c2;
        margin:0px;
      }
    }
    p{
      color:#4be0c2;
      span{
        width:auto;
      } 
    }
    &.yellow{
      color:#FBA842;
      span{
        color:#FBA842;
      }
      svg{
        color:#FBA842;
        stroke:#FBA842;
      }
      p{
        color:#FBA842
      }
    }
    &.red{
      color:#EF5E82;
      span{
        color:#EF5E82;
      }
      svg{
        color:#EF5E82;
        stroke:#EF5E82;
      }
      p{
        color:#EF5E82
      }
    }
  }
`}
`;
export const ForPop = styled.div`
  ${`
    ${SeqNumStyle}{
       left:auto;
       right:0px;
       top:0px;
      };
    ${RqThumbStyle}{
        right: -20px;
        top: -36px;
        font-size: 15px;
        line-height: 21px;
        height: 25px;
      };
    ${PriceThumbStyle}{ 
        top: -36px;
        font-size: 15px;
        line-height: 21px;
        height: 25px;
        right: 105px;
      };
    ${HeadInfoStyle}{ 
        color:var(--fg);
      };
    ${StatusInfoStyle}{ 
        border-bottom: 1px solid var(--CustBorder);
        margin-bottom:20px;
      };
   `}
`;
export const CustDetailPopParent = styled.div`
  display: flex;
  gap: 15px;
`;

export const StarsDtl = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 5px;
  color: #ffc107;
`;

export const Delivered = styled.span`
  color: #04d1a8;
  font-weight: 900;
`;

export const SendTimeNotification = styled.p`
  font-weight: normal;
  font-size: 12px;
  color: #949494;
  margin-top: 5px;
  margin-bottom: 5px;
  span {
    margin-left: 5px;
  }
  &.right {
    text-align: right;
  }
`;

export const CstDtl = styled.div`
  width: 40%;
  padding: 0px 15px;
  h3 {
    font-size: 15px;
    font-weight: 900;
    text-align: center;
  }
  .cony {
    div {
      display: flex;
      justify-content: space-between;
    }
    p {
      font-size: 15px;
      font-weight: 500;
      margin: 5px 0px;
    }
    b {
      font-weight: 900;
      font-size: 15px;
      margin: 5px 0px;
    }
  }
`;

export const NotifPop = styled.div`
  border-bottom: 1px solid var(--CustBorder);
  padding: 5px 15px 10px 15px;
  p {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;
export const CstNotification = styled.div`
  width: 60%;
  border: 1px solid var(--CustBorder);
  border-radius: 15px;
  padding: 0px 25px;
  h3 {
    text-align: center;
    /* margin:0px; */
    font-weight: 900;
    font-size: 15px;
  }
`;

export const HoldPera = styled.p`
  font-weight: normal;
  font-size: 20px;
  text-align: center;
`;

export const ModlInp = styled.input`
  width: 100%;
  height: 80px;
  max-width: 300px;
  border-radius: 20px;
  resize: none;
  padding: 15px 30px;
  font-size: 18px;
  text-align: center;
  color: var(--fg);
  outline: none;
  border: none;
  margin-top: 10px;
  margin-bottom: 10px;
  background: var(--bg);
`;

export const PopButtonGreen = styled.button`
  width: 116px;
  height: 44px;
  border: 1px solid #4be0c2;
  background: transparent;
  font-weight: 900;
  font-size: 20px;
  color: #4be0c2;
  border-radius: 25px;
  transition: 0.5s;
  &:hover {
    transition: 0.5s;
    background: #4be0c2;
    color: var(--bg);
  }
`;
