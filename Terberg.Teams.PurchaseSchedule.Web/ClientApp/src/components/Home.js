import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Report';
import { inTeams, getQueryVariable } from '../Utils';
import microsoftTeams from '@microsoft/teams-js';
import { Toggle, IconButton, connectTeamsComponent, PrimaryButton, PanelBody, Panel } from 'msteams-ui-components-react';
import { MSTeamsIconWeight, MSTeamsIconType } from 'msteams-ui-icons-react';
import './Home.css';


class HomeInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isPurchaseOrder: true,
            isPlannedOrder: true,
            isForecastSale: true,
            isForecastLongTerm: true,
            innerHeight: window.innerHeight,
            selectedCompany: {
                name: getQueryVariable('companyname'),
                companycode: getQueryVariable('companycode')
            },
            selectedSupplier: {
                name: getQueryVariable('suppliername'),
                id: getQueryVariable('supplierid')
            },
            selectedBuyer: {
                name: getQueryVariable('buyername'),
                id: getQueryVariable('buyerid')
            },
        };
        this.handleApplyClick = this.handleApplyClick.bind(this);
        this.handleShowClick = this.handleShowClick.bind(this);
        this.handlePurchaseOrderToggle = this.handlePurchaseOrderToggle.bind(this);
        this.handlePlannedOrderToggle = this.handlePlannedOrderToggle.bind(this);
        this.handleForecastSaleToggle = this.handleForecastSaleToggle.bind(this);
        this.handleForecastLongTermToggle = this.handleForecastLongTermToggle.bind(this);

        if (inTeams()) {
            microsoftTeams.initialize();
            microsoftTeams.settings.getSettings(settings => {
                alert(" Settings  " + settings)
            });
        }
    }


    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        this.setState({ innerHeight: window.innerHeight });
    }
    handleShowClick() {
        this.setState({
            show: !this.state.show
        });
    }
    handleApplyClick() {
        console.log(this.state.selectedCompany.companycode);
        console.log(this.state.selectedSupplier.id);
        console.log(this.state.selectedBuyer.id);
        console.log(this.state.isPurchaseOrder);
        console.log(this.state.isPlannedOrder);
        console.log(this.state.isForecastSale);
        console.log(this.state.isForecastLongTerm);
        this.props.requestReports(
            this.state.selectedCompany.companycode,
            this.state.selectedSupplier.id,
            this.state.selectedBuyer.id,
            this.state.isPurchaseOrder,
            this.state.isPlannedOrder,
            this.state.isForecastSale,
            this.state.isForecastLongTerm);
    }
    handlePurchaseOrderToggle() {
        this.setState({
            isPurchaseOrder: !this.state.isPurchaseOrder
        });
    }
    handlePlannedOrderToggle() {
        this.setState({
            isPlannedOrder: !this.state.isPlannedOrder
        });
    }
    handleForecastSaleToggle() {
        this.setState({
            isForecastSale: !this.state.isForecastSale
        });
    }
    handleForecastLongTermToggle() {
        this.setState({
            isForecastLongTerm: !this.state.isForecastLongTerm
        });
    }
    render() {
        const { context } = this.props;
        const { colors, style, font } = context;
        const { sizes, weights } = font;

        const styles = {
            header: { ...sizes.title1, ...weights.semibold },
            label: { ...sizes.caption, ...weights.semibold },
            ylabel: { ...sizes.xsmall, ...weights.semibold },
            panel: { height: this.state.innerHeight }
        };
        return (
            <Panel className="rootPanel" style={styles.panel}>

                <PanelBody>
                    <div className="top-container">
                        <div>
                            <IconButton
                                iconWeight={MSTeamsIconWeight.Regular}
                                onClick={this.handleShowClick}
                                iconType={this.state.show ? MSTeamsIconType.ChevronUp : MSTeamsIconType.ChevronDown}
                            />
                            <IconButton
                                iconWeight={MSTeamsIconWeight.Regular}
                                onClick={this.handleShowClick}
                                iconType={this.state.show ? MSTeamsIconType.ChevronUp : MSTeamsIconType.ChevronDown}
                                className="icon-show" />
                        </div>

                        <div className={this.state.show ? 'hidden' : ''}>
                            <div className="row">
                                <div className="column">
                                    <table>
                                        <tr>
                                            <td style={styles.header}>Supplier Name:</td>
                                            <td>
                                                {this.state.selectedSupplier.name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={styles.header}>Buyer Name: </td>
                                            <td>
                                                {this.state.selectedBuyer.name}
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="column">
                                    <table>
                                        <tr>
                                            <td style={styles.header}>Purchase orders:   </td>
                                            <td>
                                                <Toggle autoFocus label='Purchase orders' checked={this.state.isPurchaseOrder} onToggle={this.handlePurchaseOrderToggle} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={styles.header}> Planned orders:</td>
                                            <td>
                                                <Toggle label='Purchase orders' checked={this.state.isPlannedOrder} onToggle={this.handlePlannedOrderToggle} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={styles.header}>Forecast (Sales):</td>
                                            <td>
                                                <Toggle label='Purchase orders' checked={this.state.isForecastSale} onToggle={this.handleForecastSaleToggle} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={styles.header}>Forecast (Long Term):</td>
                                            <td>
                                                <Toggle label='Purchase orders' checked={this.state.isForecastLongTerm} onToggle={this.handleForecastLongTermToggle} />
                                            </td>
                                        </tr>

                                    </table>
                                </div>
                                <div className="column">
                                    <PrimaryButton>Send</PrimaryButton>
                                    <br /> <br />
                                    <PrimaryButton onClick={this.handleApplyClick}>Apply</PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}
const Home = connectTeamsComponent(HomeInner);

export default connect(
    state => state.reports,
    dispatch => bindActionCreators(actionCreators, dispatch))(Home);
