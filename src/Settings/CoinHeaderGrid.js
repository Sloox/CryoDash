import React from 'react';
import styled from "styled-components";
import {DeletableTile} from "../SharedPages/Tile";

export const CoinHeaderGridStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

export const CoinSymbol = styled.div`
    justify-self:right;
`;

const DeleteIcon = styled.div`
    justify-self: right;
    display: none;
    ${DeletableTile}:hover & {
        display: block;
        margin-top: -8px;
        margin-right: -2px;
        color: red;
    }
`;

export default function ({name, symbol, topSection}) {
    return <CoinHeaderGridStyled>
        <div> {name}</div>
        {topSection ? (<DeleteIcon> x </DeleteIcon>) : (<CoinSymbol>{symbol}</CoinSymbol>)}
    </CoinHeaderGridStyled>
}