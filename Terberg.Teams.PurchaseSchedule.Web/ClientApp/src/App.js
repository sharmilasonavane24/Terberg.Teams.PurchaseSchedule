import React, { Component } from 'react';
import { Route } from 'react-router';
import { TeamsComponentContext } from 'msteams-ui-components-react';
import microsoftTeams from '@microsoft/teams-js';
import { setTheme, pageFontSize, inTeams, getQueryVariable } from './Utils';
import Home from './components/Home';
import TeamsLayout from './components/TeamsLayout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import TeamsConfigTab from './TeamsConfigTab';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: setTheme(getQueryVariable('theme')),
            fontSize: pageFontSize()
        };

        if (inTeams()) {
            microsoftTeams.initialize();
            microsoftTeams.registerOnThemeChangeHandler((themeStr) => {
                var themeStyle = setTheme(themeStr);
                this.setState({ theme: themeStyle });
            });
        }
    }

    render() {

        return (
            <TeamsComponentContext fontSize={this.state.fontSize} theme={this.state.theme} >
                <TeamsLayout>
                    <ErrorBoundary>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/home' component={Home} />
                        <Route exact path='/teamsconfig/:theme?' component={TeamsConfigTab} />
                    </ErrorBoundary>
                </TeamsLayout>
            </TeamsComponentContext>
        );
    }
}

export default App;
