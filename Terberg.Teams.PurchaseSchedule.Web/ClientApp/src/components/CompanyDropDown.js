import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Company';
import { Dropdown, connectTeamsComponent } from 'msteams-ui-components-react';

class CompanyDropDownInner extends React.Component {
    constructor(props) {
        super(props);
        this.props.requestCompanies();
    }

    render() {
        return (
            <div>
                <span>{this.props.loading ? 'Loading Companies...' : 'Companies'}</span>
                <Dropdown
                    autoFocus
                    mainButtonText={this.props.company.companycode ?
                        this.props.company.name :
                        "Please select a Company..."}
                    style={{ width: '100%' }}
                    items={
                        this.props.companies.map(company => {
                            if (company.companycode) {
                                return {
                                    text: company.name ? company.name : company.companycode,
                                    key: company.companycode,
                                    onClick: (e) => this.props.onClick(e, company)
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

const CompanyDropDown = connectTeamsComponent(CompanyDropDownInner);

export default connect(
    state => state.companies,
    dispatch => bindActionCreators(actionCreators, dispatch))(CompanyDropDown);