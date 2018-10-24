import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Buyer';
import { Dropdown, connectTeamsComponent } from 'msteams-ui-components-react';

class BuyerDropDownInner extends React.Component {
    constructor(props) {
        super(props);
        this.props.requestBuyers();
    }

    render() {
        return (
            <div>
                <span>{this.props.loading ? 'Loading Buyers...' : 'Buyers'}</span>
                <Dropdown
                    autoFocus
                    mainButtonText={this.props.buyer.id ?
                        this.props.buyer.name :
                        "Please select a Buyer..."}
                    style={{ width: '100%' }}
                    items={
                        this.props.buyers.map(buyer => {
                            if (buyer.id) {
                                return {
                                    text: buyer.name ? buyer.name : buyer.id,
                                    key: buyer.id,
                                    onClick: (e) => this.props.onClick(e, buyer)
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

const BuyerDropDown = connectTeamsComponent(BuyerDropDownInner);

export default connect(
    state => state.buyers,
    dispatch => bindActionCreators(actionCreators, dispatch))(BuyerDropDown);