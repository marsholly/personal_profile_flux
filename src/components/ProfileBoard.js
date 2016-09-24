import React, { Component } from 'react';
import { Accordion, Panel, Thumbnail, Button } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import { Dialog, FlatButton, TextField, RadioButton, RadioButtonGroup, DatePicker, Checkbox } from 'material-ui';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

const styles = {
  block: {
    maxWidth: 150,
  },
  radioButton: {
    marginBottom: 16,
  },
  checkbox: {
    marginBottom: 16,
  },
};

const style = {
  margin: 12,
};

export default class ProfileBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      editBirthday: null,
      editName: '',
      editGender: '',
      editEmail: '',
      editPhone: '',
      editSports: [],
      editBio: '',
      editPic_url: ''
    }
    this.editProfile = this.editProfile.bind(this);
    this.handleOpen =  this.handleOpen.bind(this);
    this.handleClose =  this.handleClose.bind(this);
    this.editSports =  this.editSports.bind(this);
    this._onSubmit =  this._onSubmit.bind(this);
    this.editBirthdayChange =  this.editBirthdayChange.bind(this);
    this.editGender =  this.editGender.bind(this);
  }

  editProfile(profile){
    this.handleOpen();
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  editSports(e, checked) {
    let favoriteSport = e.target.value;
    let { editSports } = this.state;
    if( checked ) {
      this.setState({
        editSports: [...editSports, favoriteSport]
      });
    } else {
      if( !checked ) {
        let sportsCopy = [...editSports];
        let newSports = sportsCopy.filter(sport => {
          return sport !== favoriteSport;
        });
        this.setState({
          editSports: newSports
        })
      }
    }
  }

  _onSubmit() {
    let { editName, editBirthday, editGender, editEmail, editPhone, editSports, editBio, editPic_url } =this.state;
    let editProfile = {
      name: editName,
      birthday: editBirthday,
      gender: editGender,
      email: editEmail,
      phone: editPhone,
      sports: editSports,
      bio: editBio,
      pic_url: editPic_url
    };

    this.props.updateProfile(editProfile);

    this.setState({
      editBirthday: null,
      editName: '',
      editGender: '',
      editEmail: '',
      editPhone: '',
      editSports: [],
      editBio: '',
      editPic_url: ''
    })

    this.handleClose();
  }

  editBirthdayChange( event, date ) {
    this.setState({ editBirthday: date });
  }

  editGender(e) {
    let editGender = e.target.value;
    this.setState({ editGender });
  }

  render() {
    let { profile } = this.props;
    let personalProfile;
    if (profile.length) {
      personalProfile = profile[0];
    } else {
      personalProfile = {
        birthday: Date.now(),
        name: 'Superman',
        gender: 'male',
        email: 'superman@abc.com',
        phone: '33333333',
        sports: ['fly','run'],
        bio: 'super!!',
        pic_url: 'http://tx.haiqq.com/uploads/allimg/150325/12223931P-1.jpg'
      }
    }

    let genderImg;
    if(personalProfile.gender === 'male') {
      genderImg = 'http://www.psdgraphics.com/file/male-gender-sign.jpg';
    } else {
      genderImg = 'http://www.psdgraphics.com/file/female-gender-sign.jpg';
    }

    let sports = personalProfile.sports;
    let list = sports.map((sport,index) => {
      return <li key={index}><h4>{sport}</h4></li>
    })

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._onSubmit}
      />,
    ];

    return(
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Thumbnail src={personalProfile.pic_url} alt="242x200">
              <h3 className="text-center"><img src={genderImg} width="50" height="45"/>{personalProfile.name}</h3>
              <div className="text-center">
                <RaisedButton label="Edit Profile" primary={true} style={style} onClick={()=>this.editProfile(personalProfile)}/>
              </div>
            </Thumbnail>
          </div>
          <div className="col-md-8">
            <Accordion>
              <Panel bsStyle="info" header="General Information" eventKey="1">
                <h4><img src="https://cdn0.iconfinder.com/data/icons/party-icons-rounded/110/Birthday-Cake-512.png" width="30" height="30"/> Birthday: { moment(personalProfile.birthday).format('LL') }</h4>
                <hr/>
                <h4><img src="https://www.healthit.gov/sites/default/files/notepad-icon.png" width="30" height="30"/> Bio: {personalProfile.bio}</h4>
              </Panel>
              <Panel bsStyle="success" header="Contact Information" eventKey="2">
                <h4><img src="http://www.freeiconspng.com/uploads/email-icon--100-flat-vol-2-iconset--graphicloads-18.png" width="30" height="30"/> E-mail: { personalProfile.email }</h4>
                <hr/>
                <h4><img src="http://www.maqdevelopment.com/img/mobile.png" width="30" height="30"/> Phone Number: { personalProfile.phone }</h4>
              </Panel>
              <Panel bsStyle="warning" header="Additional Information" eventKey="3">
                <h4><img src="https://suffolk1419infosite.files.wordpress.com/2012/08/sport-icon.jpg" width="30" height="30"/> Favoriate Sports: </h4>
                <hr/>
                <ul>
                  {list}
                </ul>
              </Panel>
            </Accordion>
          </div>
        </div>
        <Dialog
          title="Edit Profile"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <TextField floatingLabelText="Name" value={this.state.editName} onChange = {e => { this.setState({editName: e.target.value}) }}/>
          <DatePicker
            floatingLabelText="Birthday"
            value={this.state.editBirthday}
            onChange={this.editBirthdayChange}
          />
          <RadioButtonGroup name="gender" defaultSelected="male" >
            <RadioButton value="male" label="Male" style={styles.radioButton} name="male" onClick={this.editGender}/>
            <RadioButton value="female" label="Female" style={styles.radioButton} name="female" onClick={this.editGender}/>
          </RadioButtonGroup>
          <TextField floatingLabelText="E-mail" value={this.state.editEmail} onChange = {e => { this.setState({editEmail: e.target.value}) }} />&nbsp;&nbsp;&nbsp;&nbsp;
          <TextField floatingLabelText="Mobile" value={this.state.editPhone} onChange = {e => { this.setState({editPhone: e.target.value}) }} />
          <p>Favorite Sports:</p>
          <Checkbox checkedIcon={<ActionFavorite />} uncheckedIcon={<ActionFavoriteBorder />} label="Football" value="Football" style={styles.checkbox} onCheck={this.editSports} />
          <Checkbox checkedIcon={<ActionFavorite />} uncheckedIcon={<ActionFavoriteBorder />} label="Basketball" value="Basketball" style={styles.checkbox} onCheck={this.editSports} />
          <Checkbox checkedIcon={<ActionFavorite />} uncheckedIcon={<ActionFavoriteBorder />} label="Swimming" value="Swimming" style={styles.checkbox} onCheck={this.editSports} />
          <Checkbox checkedIcon={<ActionFavorite />} uncheckedIcon={<ActionFavoriteBorder />} label="Skiing" value="Skiing" style={styles.checkbox} onCheck={this.editSports} />
          <TextField
            floatingLabelText="Bio"
            multiLine={true}
            rows={2}
            rowsMax={4}
            value={this.state.editBio}
            onChange={e => { this.setState({editBio: e.target.value}) }}
          /><br />
          <TextField floatingLabelText="Picture URL" fullWidth={true} value={this.state.editPic_url} onChange={e => { this.setState({editPic_url: e.target.value}) }}/>
        </Dialog>
      </div>
    )
  }
}
