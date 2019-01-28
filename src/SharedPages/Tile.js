import styled from 'styled-components'
import {subtleBoxShadow, lightBlueBackground, greenBoxShadow, redBoxShadow} from "./Styles"; //this is a defined file
//take note of the structure as its very useful for defining themes & styling
//temporal literal therefore we can use javascript to determine the styling as seen below
export const Tile = styled.div` 
    ${subtleBoxShadow};
    ${lightBlueBackground};
    padding: 10px;
`;

export const SelectableTile = styled(Tile)`
    &:hover {
        cursor: pointer;
        ${greenBoxShadow}
    } 
`;

export const DeletableTile = styled(SelectableTile)`
    &:hover {
        cursor: pointer;
        ${redBoxShadow}
    } 
`;

export const DisableTile = styled(Tile)`
    pointer-events: none;
    opacity: 0.4;
`;

