// flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Row,
  Col,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

type State = {
  groups: [],
  availableGroups: [],
  units: [],
  selectedUnitId: String,
  selectedGroupId: String,
  unitsDropdownOpen: Boolean,
  selectedUnit: {
    name: String,
    id: String
  },
  groupsDropdownOpen: Boolean,
  selectedGroup: {
    symbol: String
  }
}


class Start extends React.Component<{}, State> {

  state = {
    groups: [],
    availableGroups: [],
    units: [],
    unitsDropdownOpen: false,
    selectedUnit: {
      name: '',
      id: ''
    },
    groupsDropdownOpen: false,
    selectedGroup: {
      symbol: ''
    }
  }

  async componentDidMount() {

    try {

      let dataUrl = 'http://us-central1-theta-1524876066401.cloudfunctions.net/api/groups';
      const groups = await ::this.getDataAsJson(dataUrl)
      this.setState({
        groups: groups
      })

      dataUrl = 'http://us-central1-theta-1524876066401.cloudfunctions.net/api/units'
      const units = await ::this.getDataAsJson(dataUrl)
      this.setState({
        units: units
      })

    } catch( err ) {
      console.error(err);
    }

  }

  async getDataAsJson(url: String) {

    const response = await fetch(url, {
      method: 'GET',
      mode: "cors"
    });

    if( !response.ok ) {
      throw Error(resp.statusText)
    }

    return response.json();
  }

  goToRegistration() {
    const groupSymbol = this.state.selectedGroup.symbol
    this.props.history.push('/register/' + groupSymbol);
  }

  toggleUnits() {
     this.setState(prevState => ({
       unitsDropdownOpen: !prevState.unitsDropdownOpen
     }));
  }

  toggleGroups() {
     this.setState(prevState => ({
       groupsDropdownOpen: !prevState.groupsDropdownOpen
     }));
  }

  onUnitSelected = (unit) => {

    const _groups = this.state.groups.filter( group => {
      return group.unitId === unit.id
    });

    this.setState({
      availableGroups: _groups,
      selectedUnit: unit,
      selectedGroup: {
        symbol: ''
      }
    })
  }

  onGroupSelected = (group) => {

    this.setState({
      selectedGroup: group
    });

  }

  render() {

    const unitsDropdownTitle = this.state.selectedUnit.name == '' ? 'Select Unit'
                                                          : this.state.selectedUnit.name;
    const groupsDropdownTitle = this.state.selectedGroup.symbol == '' ? 'Select Group'
                                                          : this.state.selectedGroup.symbol;

    return(<React.Fragment>
              <Row>
                <Col>
                  Select Unit
                </Col>
                <Col>
                  <Dropdown isOpen={this.state.unitsDropdownOpen} toggle={::this.toggleUnits}>
                    <DropdownToggle caret>
                      {unitsDropdownTitle}
                    </DropdownToggle>
                    <DropdownMenu>
                      {
                        this.state.units.map( (unit, index) => {
                          return <DropdownItem key={index}
                                                onClick={()=> ::this.onUnitSelected(unit)}>
                                        {unit.name}
                                 </DropdownItem>
                        })
                      }
                    </DropdownMenu>
                  </Dropdown>
                </Col>
              </Row>
              <Row>
                <Col>
                  Select group
                </Col>
                <Col>
                  <Dropdown isOpen={this.state.groupsDropdownOpen} toggle={::this.toggleGroups}>
                    <DropdownToggle caret>
                      {groupsDropdownTitle}
                    </DropdownToggle>
                    <DropdownMenu>
                      {
                        this.state.availableGroups.map( (group, index) => {
                          return <DropdownItem key={index}
                                               onClick={()=> ::this.onGroupSelected(group)}>
                                    {group.symbol}
                                 </DropdownItem>
                        })
                      }
                    </DropdownMenu>
                  </Dropdown>
                </Col>
              </Row>
            <Button
              onClick={::this.goToRegistration}>
              Go to registration
            </Button>
           </React.Fragment>
    )
  }

};

export default withRouter(Start);
