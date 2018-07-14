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
    this.props.history.push('/register/23w');
  }

  toggle() {
     this.setState(prevState => ({
       unitsDropdownOpen: !prevState.unitsDropdownOpen
     }));
  }

  onUnitSelected = (unit) => {

    const _groups = this.state.groups.filter( group => {
      return group.unitId === unit.id
    });

    this.setState({
      availableGroups: _groups,
      selectedUnit: unit
    })
  }

  render() {

    const unitsDropdownTitle = this.state.selectedUnit.name == '' ? 'Select Unit'
                                                          : this.state.selectedUnit.name;

    return(<React.Fragment>
              <Row>
                <Col>
                  Select Unit
                </Col>
                <Col>
                  <Dropdown isOpen={this.state.unitsDropdownOpen} toggle={::this.toggle}>
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
             <ul>
              {
                this.state.availableGroups.map( (group, index) => {
                  return <li key={index}>{group.symbol}</li>
                })
              }
            </ul>
            <Button
              onClick={::this.goToRegistration}>
              Go to registration
            </Button>
           </React.Fragment>
    )
  }

};

export default withRouter(Start);
