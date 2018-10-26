import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/BuyerGroup';
import { Dropdown, connectTeamsComponent } from 'msteams-ui-components-react';

class BuyerGroupDropDownInner extends React.Component {
    constructor(props) {
        super(props);
        this.props.requestBuyerGroups();
    }

    render() {
        return (
            <div>
                <span>{this.props.loading ? 'Loading Buyer groups...' : 'Buyer Group'}</span>
                <Dropdown
                    autoFocus
                    mainButtonText={this.props.buyerGroup.id ?
                        this.props.buyerGroup.name :
                        "Select a Buyer..."}
                    style={{ width: '100%' }}
                    items={
                        this.props.buyerGroups.map(buyerGroup => {
                            if (buyerGroup.id) {
                                return {
                                    text: buyerGroup.name ? buyerGroup.name : buyerGroup.id,
                                    key: buyerGroup.id,
                                    onClick: (e) => this.props.onClick(e, buyerGroup)
                                };
                            } else {
                                return {};
                            }
                        })
                    }
                    disabled={(this.props.isLoading || this.props.isError)}
                />
            </div>
        );
    }
}

const BuyerGroupDropDown = connectTeamsComponent(BuyerGroupDropDownInner);

export default connect(
    state => state.buyerGroups,
    dispatch => bindActionCreators(actionCreators, dispatch))(BuyerGroupDropDown);