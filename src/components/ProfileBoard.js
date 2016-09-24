import React, { Component } from 'react';
import { Accordion, Panel, Thumbnail, Button } from 'react-bootstrap';

export default class ProfileBoard extends Component {

  render() {
    let { profile } = this.props;
    let personalProfile;
    if (profile.length) {
      personalProfile = profile[0];
    } else {
      personalProfile = {
        birthday: null,
        name: 'superman',
        gender: 'male',
        email: 'superman@abc.com',
        phone: '33333333',
        sports: [],
        bio: 'super!!',
        pic_url: 'http://tx.haiqq.com/uploads/allimg/150325/12223931P-1.jpg'
      }
    }

    return(
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Thumbnail src={personalProfile.pic_url} alt="242x200">
              <h3>gender && name</h3>
              <p>
                <Button bsStyle="primary">Edit</Button>
              </p>
            </Thumbnail>
            {/* <img src={personalProfile.pic_url} width="200" height="200"/> */}
          </div>
          <div className="col-md-8">
            <Accordion>
              <Panel bsStyle="info" header="General Information" eventKey="1">
                Birthday, bio
              </Panel>
              <Panel bsStyle="success" header="Contact Information" eventKey="2">
                email, phone
              </Panel>
              <Panel bsStyle="warning" header="Additional Information" eventKey="3">
                sports
              </Panel>
            </Accordion>
          </div>
        </div>
      </div>
    )
  }
}
