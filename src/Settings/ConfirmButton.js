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
           pointer-events : none;
           opacity: 0.4;
    `}
`;

export const CenterDiv = styled.div`
    display: grid;
    justify-content: center;
`;


export default function () {
    return (
        <AppContext.Consumer>
            {({confirmFavourites, favorites}) =>
                <CenterDiv>
                    <ConfirmButtonStyled onClick={confirmFavourites} confirmDisabled={!favorites || favorites.length === 0}>
                        Confirm Favourites
                    </ConfirmButtonStyled>
                </CenterDiv>}
        </AppContext.Consumer>);
}