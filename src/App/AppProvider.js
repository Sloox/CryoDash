//state manager of app, no rendering will occur here
import React from 'react';
import _ from 'lodash';
import moment from 'moment';

const cc = require('cryptocompare');

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;
const TIME_UNITS = 20;

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = { //inital state dont need to specifiy all the state here
            page: "dashboard",
            favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
            ...this.savedSettings(),
            timeInterval: 'months',
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            setFilteredCoins: this.setFilteredCoins,
            isInFavourites: this.isInFavourites,
            confirmFavourites: this.confirmFavourites,
            setCurrentFavorite: this.setCurrentFavorite,
            changeChartSelect: this.changeChartSelect
        }
    }

    removeCoin = key => {
        let favorites = [...this.state.favorites]; //makes a copy of the favorites i.e. spread operator
        this.setState({favorites: _.pull(favorites, key)}); //remove this value from the array and return a new array without this value
    };

    isInFavourites = key => _.includes(this.state.favorites, key);

    addCoin = key => {
        let favorites = [...this.state.favorites]; //makes a copy of the favorites i.e. spread operator
        if (favorites.length < MAX_FAVORITES) {
            favorites.push(key);
            this.setState({favorites});
        }
    };

    componentDidMount = () => {
        this.fetchCoins();
        this.fetchPrices();
        this.fetchHistorical();
    };

    fetchHistorical = async () => {
        if (this.state.firstVisit) return;
        let results = await this.historical();
        let historical = [{name: this.state.currentFavorite, data: results.map((val, index) => [moment().subtract({[this.state.timeInterval]: TIME_UNITS - index}).valueOf(), val.USD])
            }
        ];
        this.setState({historical});
    };

    changeChartSelect = (value) => {
        this.setState({timeInterval: value, historical: null}, this.fetchHistorical)
    };

    historical = () => {
        let promises = [];
        for (let units = TIME_UNITS; units > 0; --units) {
            promises.push(cc.priceHistorical(this.state.currentFavorite, ['USD'], moment().subtract({[this.state.timeInterval]: units}).toDate()))
        }
        return Promise.all(promises);
    };

    fetchCoins = async () => { //spawn a new thread to fetch coins
        let coinList = (await cc.coinList()).Data; //inside this thread block and wait for this command to finish & also dont want other crap just the data
        this.setState({coinList});
    };

    fetchPrices = async () => {
        if (this.state.firstVisit) return;
        let prices = await this.prices();
        this.setState({prices});
    };

    prices = async () => { //will return a promise array we must wait for the promises to resolve!!
        let returnData = [];
        for (let i = 0; i < this.state.favorites.length; ++i) {
            try {
                let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
                returnData.push(priceData);
            } catch (e) {
                console.warn('fetch error -', e);
            }
        }
        return returnData;
    };

    confirmFavourites = () => {
        let currentFavorite = this.state.favorites[0];

        this.setState({
            firstVisit: false,
            page: 'dashboard',
            currentFavorite,
            prices: null,
            historical: null
        }, () => {
            this.fetchPrices();
            this.fetchHistorical();
        });
        localStorage.setItem('cryptoDash', JSON.stringify({
            favorites: this.state.favorites,
            currentFavorite
        })); //store data
    };


    setCurrentFavorite = (sym) => {
        this.setState({
            currentFavorite: sym,
            historical: null
        }, this.fetchHistorical);
        localStorage.setItem('cryptoDash', JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoDash')),
            currentFavorite: sym
        }));
    };

    savedSettings() {
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if (!cryptoDashData) {
            return {page: 'settings', firstVisit: true}
        }
        let {favorites, currentFavorite} = cryptoDashData;
        return {favorites, currentFavorite};
    }

    setPage = page => this.setState({page}); //function

    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins});


    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}