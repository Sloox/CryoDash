import React from 'react';
import styled from 'styled-components';
import {Tile} from "../SharedPages/Tile";
import {AppContext} from "../App/AppProvider";
import CoinImage from '../SharedPages/CoinImage';

const SpotlightName = styled.h2`
    text-align: center;
`;

export default function () {
    return (
        <AppContext.Consumer>
            {({currentFavorite, coinList}) =>
                <Tile>
                    <SpotlightName>{coinList[currentFavorite].CoinName}</SpotlightName>
                    <CoinImage spotlight coin={coinList[currentFavorite]}/>
                </Tile>
            }
        </AppContext.Consumer>
    );
}

