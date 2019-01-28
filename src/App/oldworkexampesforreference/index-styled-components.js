import React, {Component} from 'react';
import './App.css';
import Welcome from "./WelcomeMessage";
import styled, {css} from "styled-components";

const MyButton = styled.button` //https://www.styled-components.com/
    color:green;
     ${props => props.primary && css`
        color: palevioletred;
     `}
`;

const TomatoButton = styled(MyButton)` //https://www.styled-components.com/docs/basics#extending-styles
  color: tomato;
  border-color: tomato;
`;


class App extends Component {
    render() {
        return (
            <div>
                <Welcome name="CryptoDash 2"/>
                <MyButton> Hello </MyButton>
                <MyButton primary> Hello </MyButton>
                <TomatoButton> Hello </TomatoButton>
            </div>
        );
    }
}

export default App;
