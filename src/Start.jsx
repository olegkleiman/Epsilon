// flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button
} from 'reactstrap';

type State = {
  groups: [],
  units: []
}


class Start extends React.Component<{}, State> {

  state = {
    groups: [],
    units: []
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
    this.props.history.push('/register');
  }

  render() {
    return(<React.Fragment>
             <ul>
              {
                this.state.units.map( (unit, index) => {
                  return <li key={index}>{unit.name}</li>
                })
              }
             </ul>
             <ul>
              {
                this.state.groups.map( (group, index) => {
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
