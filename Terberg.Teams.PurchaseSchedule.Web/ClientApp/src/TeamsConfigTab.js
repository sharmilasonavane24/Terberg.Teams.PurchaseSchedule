import React from 'react';
import { connectTeamsComponent, Panel, PanelBody, Input } from 'msteams-ui-components-react';
import BuyerDropDown from './components/BuyerDropDown';
import SupplierDropDown from './components/SupplierDropDown';
import WorkspaceDropDown from './components/WorkspaceDropDown';
import { inTeams, getQueryVariable } from './Utils';
import microsoftTeams from '@microsoft/teams-js';

const uuidv4 = require('uuid/v4');

class TeamsConfigTabInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBuyer: {
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
            tabDetails: {
                name: '',
                id: '',
                isHidden: false
            }
        };
        this.handleBuyerSelected = this.handleBuyerSelected.bind(this);
        this.handleSupplierSelected = this.handleSupplierSelected.bind(this);
        this.handleWorkspaceSelected = this.handleWorkspaceSelected.bind(this);
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
                        + "&supplierid" + this.state.selectedSupplier.id
                        + "&buyername=" + this.state.selectedBuyer.name
                        + "&buyerid" + this.state.selectedBuyer.id
                    ,
                    suggestedDisplayName: this.state.tabDetails.name,
                    supplier: this.state.selectedSupplier,
                    buyer:this.state.selectedBuyer
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
   
    componentDidUpdate() {
       
        if (inTeams()) {
            if (this.state.selectedBuyer.id
                && this.state.selectedSupplier.id
                && this.state.selectedWorkspace.id
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

    handleBuyerSelected(e, buyer) {
        if (buyer !== this.state.selectedBuyer) {
            this.setState(
                {
                    selectedBuyer: {
                        name: buyer.name ? buyer.name : buyer.id,
                        id: buyer.id
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
                    <WorkspaceDropDown onClick={this.handleWorkspaceSelected} workspace={this.state.selectedWorkspace} />
                    <BuyerDropDown onClick={this.handleBuyerSelected} buyer={this.state.selectedBuyer} />
                    <SupplierDropDown onClick={this.handleSupplierSelected} supplier={this.state.selectedSupplier} />

                </PanelBody>
            </Panel>
        );
    }
}

const TeamsConfigTab = connectTeamsComponent(TeamsConfigTabInner);

export default TeamsConfigTab;