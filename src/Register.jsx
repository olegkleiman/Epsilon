// flow
import React from 'react';
import {
  Row, Col,
  Button,
  Input,
  Form
} from 'reactstrap';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import _ from 'moment/locale/he';
import classNames from 'classnames';

type Group = {
  unitId: String,
  id: String,
  symbol: String,
  name: String,
  opened: String
}

type State = {
  group: Group,
  bDay: Date,
  activePageNumber: Number
}

const TOTAL_PAGES = 3;

class Register extends React.Component<{}, State> {

  state = {
    group: {},
    activePageNumber: 1
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

  bDayDateChanged(_date: Date) {

    this.setState({
      bDay: _date.toDate()
    })

  }

  onFormSubmit = (event) => {

    event.preventDefault(); // stop from further submit

    const groupSymbol = this.props.match.params.groupSymbol;
    const pupilFullName = `${event.target.pupilName.value} ${event.target.pupilLastName.value}`;

    const pupil = {
      groupSymbol: groupSymbol,
      name: pupilFullName,
      pupilId: event.target.pupilTZ.value,
      address: event.target.pupilAddress.value,
      birthDay: moment(this.state.bDay).format('DD/MM/YYYY'),
      phoneNumber: event.target.pupilPhone.value,
      notices: event.target.notices.value,

      parentId: event.target.parentTZ.value,

      whenRegistered: moment().format('DD/MM/YYYY')
    }

    fetch('http://us-central1-theta-1524876066401.cloudfunctions.net/api/pupil?secret=Ep$ilon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
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

  pageChanged = (activePageNumber: number) => {

    if( activePageNumber < TOTAL_PAGES + 1 ) {

      this.setState({
        activePageNumber: activePageNumber
      });

    }

  }

  render() {

    const firstPageClass = classNames({
      'd-none': this.state.activePageNumber != 1
    })
    const secondPageClass = classNames({
      'd-none': this.state.activePageNumber != 2
    })
    const thirdPageClass = classNames({
      'd-none': this.state.activePageNumber != 3
    })

    return (
      <div className="d-flex align-items-center flex-column justify-content-center h-100 text-white start-wrapper">
        <h1 className="display-4">רישום ל{this.state.group.name}</h1>
        <div className='box-wide'>
          <Form onSubmit={::this.onFormSubmit}>

            <div className={firstPageClass}>
              <div className="form-group">
                <Row>
                  <Col className='col-12 text-center'>
                    <h2>פרטי הנרשם/ת</h2>
                  </Col>
                </Row>
                <Row>
                  <Col className='col-4 text-left'>
                    <div>שם פרטי<span className='w3l-star'> * </span></div>
                    <div>
                      <Input id='pupilName' name='pupilName' />
                    </div>
                  </Col>
                  <Col className='col-4 text-left'>
                    <div>שם משפחה<span className='w3l-star'> * </span></div>
                    <div>
                      <Input id='pupilLastName' name='pupilLastName' />
                    </div>
                  </Col>
                  <Col className='col-4 text-left'>
                    <div>ת.זהות<span className='w3l-star'> * </span></div>
                    <div>
                      <Input id='pupilTZ' name='pupilTZ'  />
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="form-group">
                <div className='text-left'>כתובת</div>
                <div className="w-200">
                  <Input id='pupilAddress' name='pupilAddress'/>
                </div>
              </div>
              <div className="form-group">
                <Row>
                  <Col className='col-6 text-left'>
                    <div>תאריך לידה</div>
                    <div>
                      <Datetime ref = { (el) => { this.bDayDateCtrl = el }}
                                open={false}
                                dateFormat="DD-MM-YYYY"
                                timeFormat={false}
                                onChange={::this.bDayDateChanged}
                                closeOnSelect={true}
                                local='he'/>
                    </div>
                  </Col>
                  <Col className='col-6 text-left'>
                    <div>טלפון בבית<span className='w3l-star'> * </span></div>
                    <div className="w-200">
                      <Input id='pupilPhone' name='pupilPhone' />
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="form-group">
                <div className='text-left'>הערות</div>
                <div className="w-200">
                  <Input id='notices' name='notices'/>
                </div>
              </div>

            </div>

            <div className={secondPageClass}>
              <div className="form-group">
                <Row>
                  <Col className='col-12 text-center'>
                    <h2>פרטי ראש/ת-משפחה</h2>
                  </Col>
                </Row>
                <Row>
                  <Col className='col-4 text-left'>
                    <div>שם פרטי</div>
                    <div>
                      <Input />
                    </div>
                  </Col>
                  <Col className='col-4 text-left'>
                    <div>שם משפחה</div>
                    <div>
                      <Input />
                    </div>
                  </Col>
                  <Col className='col-4 text-left'>
                    <div><span className='w3l-star'> * </span>ת.זהות</div>
                    <div>
                      <Input name='parentTZ' id='parentTZ'/>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <div className={thirdPageClass}>
              <div className="form-group">
                <Row>
                  <Col className='col-12 text-center'>
                    <h2>פרטי תשלום</h2>
                  </Col>
                </Row>
                <Row>
                  <Col className='col-4 text-left'>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="form-group">
              <Row>
                <Col className='col-4 text-left'>
                  <Button onClick={ () => ::this.pageChanged(this.state.activePageNumber + 1) }>המשך</Button>
                </Col>
                <Col className='col-4 text-left'>
                  <div className={thirdPageClass}>
                    <Button className="w-200" type="submit">Register</Button>
                  </div>
                </Col>
                <Col className='col-4 text-left'>
                  <Button onClick={ () => ::this.pageChanged(this.state.activePageNumber - 1)}>קודם</Button>
                </Col>
              </Row>
            </div>
          </Form>
        </div>

      </div>
    )
  }

};

export default Register;
