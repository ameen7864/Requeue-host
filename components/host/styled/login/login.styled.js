import styled from 'styled-components'
 
export const Bg = styled.div`
width: 100%;
min-height:100vh;
height: 100%;
background: radial-gradient(#7725cc 0%, #392178 57.14%, #31206d 100%);
display: flex;
justify-content: center;
flex-direction: column;  
`
export const LoginVFlex = styled.div`
max-width: 565px;
margin: 0 auto;
width: 100%;
height: 100%;
text-align:center;
display:flex;
justify-content:center;
flex-direction: column;
`
export const Introtext = styled.h2`
width: auto;
display: block;
clear: both;
overflow: hidden;
line-height: 0.9;
color:#fff;
font-size:25px;
font-weight:300;
letter-spacing:5px;
 span{
    color: #fff;
    font-size: 60px;
    font-weight: 900;
    line-height: unset;
    text-transform: uppercase;
 }
`
export const LabelIcon = styled.span`
font-size: 25px;
position: relative;
top: 3px;
color: #fff;
margin-right: 10px;
width: 30px;
display: inline-block;
`

export const LoginInput = styled.input`
width: 272px;
min-height: 36px;
border-radius: 7px; 
padding:0 13px;
color:#fff;
box-shadow: 0px 3px 6px rgb(0 0 0 / 5%);
margin: 20px auto; 
font-size:15px; 
background: rgba(255, 255, 255, 0.23);
border: 1px solid #7537BE;  
outline:none !important;
::placeholder {
    color: #fff; 
  }
::focus-visible{
 
}  
`

export const LoginButton = styled.button`
width: 189px;  
padding: 18.5px 81px 18.5px 72px;
border-radius: 5px;
background-image: linear-gradient(to bottom, #4be0c2, #00624e);

margin: 35px auto;
cursor:pointer; 
color: #fff;  
font-size:15px;
border:unset;
  ::focus-visible{
    
  }  
`
export const FootPera = styled.p`
text-align: left;
color: #fff;
margin:0px;
line-height: 1;
font-size:12px;
`
 