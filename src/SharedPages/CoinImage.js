import React from 'react';
import styled, {css} from 'styled-components';

const CoinImage = styled.img`
    height: 50px;
    ${props => props.spotlight && css`
        height: 200px;  
        margin: auto;
        display: block;
    `}
`;

export default function ({coin, spotlight}) { //remember that this defaults to the name of the file... the props are coin & style
    return <CoinImage
        spotlight={spotlight}
        alt={coin.CoinSymbol}
        src={`http://cryptocompare.com/${coin.ImageUrl}`}
    />;
};