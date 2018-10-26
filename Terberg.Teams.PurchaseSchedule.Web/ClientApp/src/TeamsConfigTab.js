import React from 'react';
import { connectTeamsComponent, Panel, PanelBody, Input } from 'msteams-ui-components-react';
import BuyerGroupDropDown from './components/BuyerGroupDropDown';
import SupplierDropDown from './components/SupplierDropDown';
import CompanyDropDown from './components/CompanyDropDown';
import { inTeams, getQueryVariable, alertTypeEnum, errorData } from './Utils';
import { loadUserData } from './AdalConfig';
import microsoftTeams from '@microsoft/teams-js';

const uuidv4 = require('uuid/v4');

class TeamsConfigTabInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBuyerGroup: {
                name: '',
                id: ''
            },
            selectedSupplier: {
                name: '',
                id: ''
            },
            selectedWorkspace: {
                name: '',
                id: ''
            },
            selectedCompany: {
                name: '',
                companycode: ''
            },
            tabDetails: {
                name: '',
                id: '',
                isHidden: false
            },
            isAuthError: false,
            authError: errorData,
            isLoggedIn: false
        };
        this.handleBuyerGroupSelected = this.handleBuyerGroupSelected.bind(this);
        this.handleSupplierSelected = this.handleSupplierSelected.bind(this);
        this.handleWorkspaceSelected = this.handleWorkspaceSelected.bind(this);
        this.handleCompanySelected = this.handleCompanySelected.bind(this);
        this.onTabNameChanged = this.onTabNameChanged.bind(this);

        if (inTeams()) {
            microsoftTeams.getTabInstances((t, e) => {
                this.ActivateTabName(t);
            });

            microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
                let host = "https://" + window.location.host;
                microsoftTeams.settings.setSettings({
                    entityId: this.state.tabDetails.id,
                    tabName: this.state.tabDetails.name,
                    contentUrl: host + "/home/?theme={theme}&loginHint={loginHint}&entityId={entityId}"
                        + "&suppliername=" + this.state.selectedSupplier.name
                        + "&supplierid=" + this.state.selectedSupplier.id
                        + "&buyergroupname=" + this.state.selectedBuyerGroup.name
                        + "&buyergroupid=" + this.state.selectedBuyerGroup.id
                        + "&companyname=" + this.state.selectedCompany.name
                        + "&companycode=" + this.state.selectedCompany.companycode
                    ,
                    suggestedDisplayName: this.state.tabDetails.name,
                    supplier: this.state.selectedSupplier,
                    buyerGroup: this.state.selectedBuyerGroup
                });
                saveEvent.notifySuccess();
            });
        }

    }
    ActivateTabName(tabs) {
        var currentEntityId = getQueryVariable('entityId');
        var data = JSON.parse(JSON.stringify(tabs.teamTabs));
        for (var tab in data) {
            if (currentEntityId === data[tab].entityId) {
                if (currentEntityId !== '') {
                    this.setState({
                        tabDetails: {
                            isHidden: true,
                            name: data[tab].tabName,
                            id: data[tab].entityId
                        }
                    });
                }
            }
        }

         
    }
    componentDidMount() {
        //if (inTeams()) {
        //    let loginHint = getQueryVariable('loginHint');
        //    console.log(loginHint);
        //    loadUserData(loginHint, (error, idToken) => {
        //        if (idToken === null || idToken === 'undefined') {
        //            this.setSstate({
        //                isAuthError: true,
        //                authError: {
        //                    type: alertTypeEnum.error,
        //                    message: error
        //                },
        //                isLoggedIn: false
        //            });
        //        } else {
        //            this.setState({
        //                isAuthError: false,
        //                isLoggedIn: true
        //            });

        //        }
        //    });
        //}
    }
    componentDidUpdate() {
       
        if (inTeams()) {
            if (this.state.selectedBuyerGroup.id
                && this.state.selectedSupplier.id
                && this.state.selectedCompany.companycode
                && this.state.tabDetails.id) {
                microsoftTeams.settings.setValidityState(true);
                microsoftTeams.settings.setSettings({
                   
                    supplier: this.state.selectedSupplier,
                    buyer: this.state.selectedBuyer
                });

            } else {
                microsoftTeams.settings.setValidityState(false);
            }
        }
    }

    handleBuyerGroupSelected(e, buyerGroup) {
        if (buyerGroup !== this.state.selectedBuyerGroup) {
            this.setState(
                {
                    selectedBuyerGroup: {
                        name: buyerGroup.name ? buyerGroup.name : buyerGroup.id,
                        id: buyerGroup.id
                    }
                });
        }
    }
    handleSupplierSelected(e, supplier) {
        if (supplier !== this.state.selectedSupplier) {
            this.setState(
                {
                    selectedSupplier: {
                        name: supplier.name ? supplier.name : supplier.id,
                        id: supplier.id
                    }
                });
        }
    }
    onTabNameChanged(e) {
        if (e.target.value !== this.state.tabDetails.tabName) {
            this.setState(
                {
                    tabDetails: {
                        name: e.target.value,
                        id: uuidv4()
                    }
                });
        }
    }
    handleWorkspaceSelected(e, workspace) {
        if (workspace !== this.state.selectedWorkspace) {
            this.setState(
                {
                    selectedWorkspace: {
                        name: workspace.name ? workspace.name : workspace.id,
                        id: workspace.id
                    }
                });
        }
    }

    handleCompanySelected(e, company) {
        if (company !== this.state.selectedCompany) {
            this.setState(
                {
                    selectedCompany: {
                        name: company.name ? company.name : company.companycode,
                        companycode: company.companycode
                    }
                });
        }
    }

    render() {
       
        const { context } = this.props;
        const { rem, font } = context;
        const { sizes, weights } = font;
        const styles = {
            panel:
            {
                height: window.innerHeight,
                border: 0,
                padding: 0,
                margin: 0
            },
            input: {
                paddingTop: rem(0.5),
                width: '100%'
            }
        };
        return (
            <Panel style={styles.panel}>
                <PanelBody>
                    <span className={this.state.tabDetails.isHidden ? 'hidden' : ''}>
                        <span>Tab Name</span> <Input
                            autoFocus
                            style={styles.input}
                            placeholder="Tab name"
                            onChange={this.onTabNameChanged}
                            required
                            className={this.state.tabDetails.isHidden ? 'hidden' : ''}
                        />
                    </span>
                    <CompanyDropDown onClick={this.handleCompanySelected} company={this.state.selectedCompany} />
                    <BuyerGroupDropDown onClick={this.handleBuyerGroupSelected} buyerGroup={this.state.selectedBuyerGroup} />
                    <SupplierDropDown onClick={this.handleSupplierSelected} supplier={this.state.selectedSupplier} />

                </PanelBody>
            </Panel>
        );
    }
}

const TeamsConfigTab = connectTeamsComponent(TeamsConfigTabInner);

export default TeamsConfigTab;