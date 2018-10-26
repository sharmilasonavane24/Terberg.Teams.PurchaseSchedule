import React from 'react';
import { MSTeamsIconWeight, MSTeamsIconType } from 'msteams-ui-icons-react';
import { connectTeamsComponent, Toggle } from 'msteams-ui-components-react';
import './FilterToggleTable.css';

class FilterToggleTableInner extends React.Component {
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
                    <td style={styles.header}>Purchase orders:</td>
                    <td>
                        <Toggle autoFocus checked={this.props.isPurchaseOrder} onToggle={()=>this.props.onClick("isPurchaseOrder")} />
                    </td>
                </tr>
                <tr>
                    <td style={styles.header}> Planned orders:</td>
                    <td>
                        <Toggle checked={this.props.isPlannedOrder} onToggle={() =>this.props.onClick("isPlannedOrder")} />
                    </td>
                </tr>
                <tr>
                    <td style={styles.header}>Forecast (Sales):</td>
                    <td>
                        <Toggle checked={this.props.isForecastSale} onToggle={() =>this.props.onClick("isForecastSale")} />
                    </td>
                </tr>
                <tr>
                    <td style={styles.header}>Forecast (Long Term):</td>
                    <td>
                        <Toggle checked={this.props.isForecastLongTerm} onToggle={() =>this.props.onClick("isForecastLongTerm")} />
                    </td>
                </tr>

            </table>
        );

    }
}

const FilterToggleTable = connectTeamsComponent(FilterToggleTableInner);

export default FilterToggleTable;