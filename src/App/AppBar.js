import React from 'react'
import styled, {css} from 'styled-components'
import {AppContext} from "./AppProvider";


const Logo = styled.div`
    font-size: 1.5em
`;
const Bar = styled.div`
    display:grid;
    margin-bottom: 40px
    grid-template-columns: 180px auto 100px 100px
`;
const ControlButtonsElem = styled.div`
    cursor:pointer;
    ${props => props.active && css`
        text-shadow: 0px 0px 60px #03ff03
     `}
     ${props => props.hidden && css`
        display: none;
     `}
`;

function toProperCase(lower) {
    return lower.charAt(0).toUpperCase() + lower.substr(1)
}

function ControlButton({name}) {
    return (
        <AppContext.Consumer>
            {({firstVisit, page, setPage}) => (
                <ControlButtonsElem active={page === name} onClick={() => setPage(name)}
                                    hidden={firstVisit && name === 'dashboard'}>
                    {toProperCase(name)}
                </ControlButtonsElem>)}
        </AppContext.Consumer>
    );
}

export default function () {
    return <Bar>
        <Logo>Cryo Dashboard</Logo>
        <div/>
        <ControlButton name="dashboard"/>
        <ControlButton name="settings"/>
    </Bar>
}