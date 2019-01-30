import React from 'react';
import styled from 'styled-components';
import {AppContext} from "../App/AppProvider";
import CoinTile from "./CoinTile";

//autofit & autofill minmax makes it responsive very useful
export const CoinGridStyled = styled.div`
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-gap: 15px;
    margin-top: 40px;
`;

const MAX_COINS_TO_SHOW_DEFAULT = 30;
const MAX_COINS_TO_SHOW_FILTERED = 100;

function getLowerSectionCoins(coinList, filteredCoins) {
    if (filteredCoins) {
        return Object.keys(filteredCoins).slice(0, MAX_COINS_TO_SHOW_FILTERED);
    } else return Object.keys(coinList).slice(0, MAX_COINS_TO_SHOW_DEFAULT);
}

function getCointsToDisplay(coinList, topSection, favorites, filteredCoins) { //show only first 100
    return topSection ? favorites : getLowerSectionCoins(coinList, filteredCoins);
}

export default function ({topSection}) {
    return (
        <AppContext.Consumer>
            {({coinList, favorites, filteredCoins}) => (
                <CoinGridStyled>
                    {getCointsToDisplay(coinList, topSection, favorites, filteredCoins).map(coinKey =>
                        <CoinTile key={coinKey} coinKey={coinKey} topSection={topSection}/>
                    )}
                </CoinGridStyled>
            )}
        </AppContext.Consumer>
    );
}