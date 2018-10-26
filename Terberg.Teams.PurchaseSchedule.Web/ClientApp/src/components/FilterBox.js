import React from 'react';
import { MSTeamsIconWeight, MSTeamsIconType } from 'msteams-ui-icons-react';
import { connectTeamsComponent, IconButton } from 'msteams-ui-components-react';
import './FilterBox.css';

class FilterBoxInner extends React.Component {
    constructor(props) {
        super(props);
    }
  
    render() {

        return (
            <div>
                <IconButton
                    iconWeight={MSTeamsIconWeight.Regular}
                    iconType={this.props.isHidden ? MSTeamsIconType.ChevronUp : MSTeamsIconType.ChevronDown}
                    onClick={this.props.onClick}
                />
                Purchase Schedule Filters
                <IconButton
                    iconWeight={MSTeamsIconWeight.Regular}
                    iconType={this.props.isHidden ? MSTeamsIconType.ChevronUp : MSTeamsIconType.ChevronDown}
                    className="icon-right" onClick={this.props.onClick}
                />
            </div>
        );

    }
}

const FilterBox = connectTeamsComponent(FilterBoxInner);

export default FilterBox;