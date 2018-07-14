// flow
import React from 'react';
import {
  Button
} from 'reactstrap';

class Register extends React.Component {

  constructor(props) {
    super(props);
  }

  register() {
    const groupSymbol = this.props.match.params.groupSymbol;
    console.log(groupSymbol);

    const pupil = {
      groupSymbol: groupSymbol,
      address: '<none>',
      name: 'Paul XV',
      phoneNumber: '333'
    }

    fetch('http://us-central1-theta-1524876066401.cloudfunctions.net/api/pupil?secret=Ep$ilon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pupil)
    })
    .then( response => {

      if( !response.ok ) {
        throw Error(response.statusText)
      }

      return resp.json();
    })
    .then( pupil => {
      console.log(pupil);
    })
    .catch( err => {
      console.error(err);
    })


  }

  render() {
    return (<React.Fragment>
      <div>
        Register
      </div>
      <Button onClick={::this.register}>Register</Button>
      </React.Fragment>
    )
  }

};

export default Register;
