import React from 'react'
import { StyledModalContainer } from '../../styled/common.styled';

const Seats = ({children}) => { 

    return (
        <>
          <StyledModalContainer>
             {children}
          </StyledModalContainer> 
        </>
    )
}

export default Seats
