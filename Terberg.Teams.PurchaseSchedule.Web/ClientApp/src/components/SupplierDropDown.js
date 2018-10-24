import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Supplier';
import { Dropdown, connectTeamsComponent } from 'msteams-ui-components-react';

class SupplierDropDownInner extends React.Component {
    constructor(props) {
        super(props);
        this.props.requestSuppliers();
    }

    render() {
        return (
            <div>
                <span>{this.props.loading ? 'Loading Suppliers...' : 'Suppliers'}</span>
                <Dropdown
                    autoFocus
                    mainButtonText={this.props.supplier.id ?
                        this.props.supplier.name :
                        "Please select a Supplier..."}
                    style={{ width: '100%' }}
                    items={
                        this.props.suppliers.map(supplier => {
                            if (supplier.id) {
                                return {
                                    text: supplier.name ? supplier.name : supplier.id,
                                    key: supplier.id,
                                    onClick: (e) => this.props.onClick(e, supplier)
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

const SupplierDropDown = connectTeamsComponent(SupplierDropDownInner);

export default connect(
    state => state.suppliers,
    dispatch => bindActionCreators(actionCreators, dispatch))(SupplierDropDown);