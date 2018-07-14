// flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Card,
  CardBody,
  Container,
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

      let dataUrl = 'https://us-central1-theta-1524876066401.cloudfunctions.net/api/groups';
      const groups = await ::this.getDataAsJson(dataUrl)
      this.setState({
        groups: groups
      })

      dataUrl = 'https://us-central1-theta-1524876066401.cloudfunctions.net/api/units'
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

     return (
              <div className="d-flex align-items-center flex-column justify-content-center h-100 text-white start-wrapper">
                <h1 className="display-4">רישום לקייטנות קיץ</h1>
                  <div className='box'>
                    <div className="form-group">
                        <div>Select Unit</div>
                        <Dropdown className="w-200" isOpen={this.state.unitsDropdownOpen} toggle={::this.toggleUnits}>
                          <DropdownToggle caret>
                            {unitsDropdownTitle}
                          </DropdownToggle>
                          <DropdownMenu right>
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
                    </div>
                    <div className="form-group">
                      <div>Select Group</div>
                      <Dropdown className="w-200" isOpen={this.state.groupsDropdownOpen} toggle={::this.toggleGroups}>
                        <DropdownToggle caret>
                          {groupsDropdownTitle}
                        </DropdownToggle>
                        <DropdownMenu right>
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
                    </div>
                    <div className="form-group">
                      <Button className="w-200"
                        onClick={::this.goToRegistration}>
                        Go to registration
                      </Button>
                    </div>
                </div>
              </div>
            )

  }

};

export default withRouter(Start);
