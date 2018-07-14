// flow
import React from 'react';
import {
  Row, Col,
  Button,
  Input
} from 'reactstrap';

type Group = {
  unitId: String,
  id: String,
  symbol: String,
  name: String,
  opened: String
}

type State = {
  group: Group
}

class Register extends React.Component<{}, State> {

  state = {
    group: {}
  }

  constructor(props) {
    super(props);
  }

  async componentDidMount() {

    const groupSymbol = this.props.match.params.groupSymbol;
    const url = `https://us-central1-theta-1524876066401.cloudfunctions.net/api/group?symbol=${groupSymbol}`
    const response = await fetch(url, {
      method: 'GET',
      mode: "cors"
    });

    if( !response.ok ) {
      throw Error(resp.statusText)
    }

    const _group = await response.json();
    this.setState({
      group: _group
    });
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

      return response.json();
    })
    .then( pupil => {
      console.log(pupil);
    })
    .catch( err => {
      console.error(err);
    })


  }

  render() {
    return (
      <div className="d-flex align-items-center flex-column justify-content-center h-100 text-white start-wrapper">
        <h1 className="display-4">רישום ל{this.state.group.name}</h1>
        <div className='box'>
          <div className="form-group">
            <Row>
              <Col className='col-4 text-right'>
                <div>שם פרטי</div>
                <div>
                  <Input />
                </div>
              </Col>
              <Col className='col-4 text-right'>
                <div>שם משפחה</div>
                <div>
                  <Input />
                </div>
              </Col>
              <Col className='col-4 text-right'>
                <div>ת.זהות</div>
                <div>
                  <Input />
                </div>
              </Col>
            </Row>
          </div>
          <div className="form-group">
            <div className='text-right'>כתובת</div>
            <div className="w-200">
              <Input />
            </div>
          </div>
          <div className="form-group">
            <Row>
              <Col className='col-6 text-right'>
                <div>תאריך לידה</div>
                <div className="w-200">
                  <Input />
                </div>
              </Col>
              <Col className='col-6 text-right'>
                <div>טלפון בבית</div>
                <div className="w-200">
                  <Input />
                </div>
              </Col>
            </Row>
          </div>
          <div className="form-group">
            <div className='text-right'>הערות</div>
            <div className="w-200">
              <Input />
            </div>
          </div>
          <div className="form-group">
            <Button className="w-200"
              onClick={::this.register}>Register</Button>
          </div>
        </div>

      </div>
    )
  }

};

export default Register;
