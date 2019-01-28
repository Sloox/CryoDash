import React from 'react';
import styled from 'styled-components';
import {backgroundColor2, fontSize2} from "../SharedPages/Styles";
import {AppContext} from "../App/AppProvider";
import _ from "lodash";
import fuzzy from "fuzzy";

const SearchGrid = styled.div`
   display: grid;
   grid-template-columns: 200px 1fr; 
`;
const SearchInput = styled.input`
    ${backgroundColor2}
    ${fontSize2}
    border: 1px solid;
    height: 25px;
    color: #1163c9;
    place-self: center left;
`;//place-self = align self & justify-self ,place-self is shorthand of those two


const handleFilter = _.debounce((inputVal, coinList, setFilterCoins) => {
    // get all coinsymbols
    let coinSymbol = Object.keys(coinList);
    //get all the coin names, map symbol to name
    let coinNames = coinSymbol.map(sym => coinList[sym].CoinName);
    //  combine and search
    let allStringsToSearch = coinSymbol.concat(coinNames);
    //fuzzy sarching
    let fuzzyResults = fuzzy
        .filter(inputVal, allStringsToSearch, {})//filter it according to what the user types
        .map(res => res.string);//only retrieve the string (fuzzy has different results like ranking and match percentage)
    //at this point we have both symbols & coinnames when we search we need to know the differences to map back to the original datastructure
    //we use pickBy --> iterate over a list and pick objects based off a truthy function call
    //here we extract the coinName and the syMKey and see if it is in the fuzzyResults
    let filteredCoins = _.pickBy(coinList, (result, symKey) => {
        let coinName = result.CoinName;
        return (_.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName));
    });
    setFilterCoins(filteredCoins);
}, 250);

function filterCoins(e, setFilteredCoins, coinList) {
    let inputVal = e.target.value; //get event from input text
    //debounce is to prevent the user from firing off too many events in the app too quickly
    if (!inputVal) {
        setFilteredCoins(null); //go back to first 100 coins
    }
    handleFilter(inputVal, coinList, setFilteredCoins)
}

export default function () {
    return (
        <AppContext.Consumer>
            {({setFilteredCoins, coinList}) =>
                <SearchGrid>
                    <h2>Search all coins</h2>
                    <SearchInput onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)}/>
                </SearchGrid>
            }
        </AppContext.Consumer>
    );
}