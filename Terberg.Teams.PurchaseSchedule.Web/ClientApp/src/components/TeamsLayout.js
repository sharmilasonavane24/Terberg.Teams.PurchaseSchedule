import React from 'react';
import { connectTeamsComponent, Surface } from 'msteams-ui-components-react';

class TeamsLayoutInner extends React.Component {
    render() {
        return (
            <Surface>
                {this.props.children}
            </Surface>
        );
    }
}

const TeamsLayout = connectTeamsComponent(TeamsLayoutInner);

export default TeamsLayout;