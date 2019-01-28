import React from "react";
import {AppContext} from "../App/AppProvider";

export default function Welcome() {
    return (
        <AppContext.Consumer>
            {({firstVisit}) =>
                firstVisit ? <h1>Welcome To CryptoDash, select your favourite coins to begin</h1>
                    : null
            }
        </AppContext.Consumer>);
}