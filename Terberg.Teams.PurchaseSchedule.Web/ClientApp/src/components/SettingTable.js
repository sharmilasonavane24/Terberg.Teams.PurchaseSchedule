import React from 'react';
import { MSTeamsIconWeight, MSTeamsIconType } from 'msteams-ui-icons-react';
import { connectTeamsComponent, IconButton } from 'msteams-ui-components-react';
import './FilterBox.css';

class SettingTableInner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { context } = this.props;
        const { colors, style, font } = context;
        const { sizes, weights } = font;
        const styles = {
            header: { ...sizes.title1, ...weights.semibold }
            };
        return (
            <table>
                <tr>
                    <td style={styles.header}>Supplier Name:</td>
                    <td>
                        {this.props.selectedSupplier.name}
                    </td>
                </tr>
                <tr>
                    <td style={styles.header}>Buyer Group Name: </td>
                    <td>
                         {this.props.selectedBuyerGroup.name}
                    </td>
                </tr>
            </table>
        );

    }
}

const SettingTable = connectTeamsComponent(SettingTableInner);

export default SettingTable;