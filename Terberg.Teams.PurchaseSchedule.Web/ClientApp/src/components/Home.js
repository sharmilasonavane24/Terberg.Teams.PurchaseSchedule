import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Report';
import { inTeams, getQueryVariable } from '../Utils';
import FilterBox from './FilterBox';
import SettingTable from './SettingTable';
import FilterToggleTable from './FilterToggleTable';
import microsoftTeams from '@microsoft/teams-js';
import { connectTeamsComponent, PrimaryButton, PanelBody, Panel } from 'msteams-ui-components-react';
import './Home.css';


class HomeInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: false,
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
            selectedBuyerGroup: {
                name: getQueryVariable('buyergroupname'),
                id: getQueryVariable('buyergroupid')
            },
        };
        this.handleApplyClick = this.handleApplyClick.bind(this);
        this.handleIconClick = this.handleIconClick.bind(this);
        this.handleToggle = this.handleToggle.bind(this);

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
    handleIconClick() {

        this.setState({
            isHidden: !this.state.isHidden
        });
    }
    handleToggle( toggleName) {
        
        switch (toggleName) {
            case 'isPurchaseOrder':
                this.setState({
                    isPurchaseOrder: !this.state.isPurchaseOrder
                });
                break;
            case 'isPlannedOrder':
                this.setState({
                    isPlannedOrder: !this.state.isPlannedOrder
                });
                break;
            case 'isForecastSale':
                this.setState({
                    isForecastSale: !this.state.isForecastSale
                });
                break;
            case 'isForecastLongTerm':
                this.setState({
                    isForecastLongTerm: !this.state.isForecastLongTerm
                });
                break;
            default:
                break;
        }
    }
    handleApplyClick() {
        console.log(this.state.selectedCompany.companycode);
        console.log(this.state.selectedSupplier.id);
        console.log(this.state.selectedBuyerGroup.id);
        console.log(this.state.isPurchaseOrder);
        console.log(this.state.isPlannedOrder);
        console.log(this.state.isForecastSale);
        console.log(this.state.isForecastLongTerm);

        this.props.requestReports(
            this.state.selectedCompany.companycode,
            this.state.selectedSupplier.id,
            this.state.selectedBuyerGroup.id,
            this.state.isPurchaseOrder,
            this.state.isPlannedOrder,
            this.state.isForecastSale,
            this.state.isForecastLongTerm);
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
                        <FilterBox onClick={this.handleIconClick} isHidden={this.state.isHidden} />
                        <div className={this.state.isHidden ? 'hidden' : ''}>
                            <div className="row">
                                <div className="column">
                                    <SettingTable
                                        selectedSupplier={this.state.selectedSupplier}
                                        selectedBuyerGroup={this.state.selectedBuyerGroup}
                                    />
                                </div>
                                <div className="column">
                                    <FilterToggleTable
                                        isPurchaseOrder={this.state.isPurchaseOrder}
                                        isPlannedOrder={this.state.isPlannedOrder}
                                        isForecastSale={this.state.isForecastSale}
                                        isForecastLongTerm={this.state.isForecastLongTerm}
                                        onClick={this.handleToggle}
                                    />
                                </div>
                                <div className="column">
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
