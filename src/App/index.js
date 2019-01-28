import React, {Component} from 'react';
import './App.css';
import AppLayout from './AppLayout';
import Appbar from './AppBar';
import {AppProvider} from './AppProvider';
import Settings from '../Settings'; //imports it from index.js
import Dashboard from '../Dashboard'
import Content from '../SharedPages/Content'

class App extends Component {
    render() {
        return (
            <AppLayout>
                <AppProvider>
                    <Appbar/>
                    <Content>
                        <Dashboard/>
                        <Settings/>
                    </Content>
                </AppProvider>
            </AppLayout>
        );
    }
}

export default App;
