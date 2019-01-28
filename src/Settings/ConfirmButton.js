import React from 'react';
import styled, {css} from 'styled-components';
import {AppContext} from "../App/AppProvider"
import {fontSize1, greenBoxShadow, color3} from "../SharedPages/Styles";

const ConfirmButtonStyled = styled.div`
    margin: 20px;
    color: ${color3};
    ${fontSize1};
    padding: 5px;
    cursor: pointer;
    &:hover {
       ${greenBoxShadow} 
    }
    ${props => props.confirmDisabled && css`
           
    `}
`;

export const CenterDiv = styled.div`
    display: grid;
    justify-content: center;
`;


export default function () {
    return (
        <AppContext.Consumer>
            {({confirmFavourites, confirmDisabled}) =>
                <CenterDiv>
                    <ConfirmButtonStyled onClick={confirmFavourites} confirmDisabled={confirmDisabled}>
                        Confirm Favourites
                    </ConfirmButtonStyled>
                </CenterDiv>}
        </AppContext.Consumer>);
}