import React, { Component } from 'react';
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

export default class NewProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      birthday: null,
      name: '',
      gender: '',
      email: '',
      phone: '',
      sports: [],
      bio: '',
      pic_url: ''
    }

    this.handleOpen =  this.handleOpen.bind(this);
    this.handleClose =  this.handleClose.bind(this);
    this.getSports =  this.getSports.bind(this);
    this._onSubmit =  this._onSubmit.bind(this);
    this.birthdayChange =  this.birthdayChange.bind(this);
    this.getGender =  this.getGender.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
    document.getElementById('addbtn').style.visibility = "hidden";
  }

  handleClose() {
    this.setState({ open: false });
  }

  getSports(e, checked) {
    let favoriteSport = e.target.value;
    let { sports } = this.state;
    if( checked ) {
      this.setState({
        sports: [...sports, favoriteSport]
      });
    } else {
      if( !checked ) {
        let sportsCopy = [...sports];
        let newSports = sportsCopy.filter(sport => {
          return sport !== favoriteSport;
        });
        this.setState({
          sports: newSports
        })
      }
    }
  }

  _onSubmit() {
    let { name, birthday, gender, email, phone, sports, bio, pic_url } =this.state;
    let newProfile = {
      name: name,
      birthday: birthday,
      gender: gender,
      email: email,
      phone: phone,
      sports: sports,
      bio: bio,
      pic_url: pic_url
    };

    this.props.addNewProfile(newProfile);

    this.setState({
      birthday: null,
      name: '',
      gender: '',
      email: '',
      phone: '',
      sports: [],
      bio: '',
      pic_url: ''
    });
    this.handleClose();
  }

  birthdayChange( event, date ) {
    this.setState({ birthday: date });
  }

  getGender(e) {
    let gender = e.target.value;
    this.setState({ gender });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._onSubmit}
      />,
    ];
    return (
      <div>
        <div className="row">
          <button id ='addbtn' className="btn btn-success btn-md" onTouchTap={this.handleOpen}><i className="glyphicon glyphicon-plus"></i></button>
        </div>
        <Dialog
          title="New Profile"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <TextField floatingLabelText="Name" value={this.state.name} onChange = {e => { this.setState({name: e.target.value}) }}/>
          <DatePicker
            floatingLabelText="Birthday"
            value={this.state.birthday}
            onChange={this.birthdayChange}
          />
          <RadioButtonGroup name="gender" defaultSelected="male" >
            <RadioButton value="male" label="Male" style={styles.radioButton} name="male" onClick={this.getGender}/>
            <RadioButton value="female" label="Female" style={styles.radioButton} name="female" onClick={this.getGender}/>
          </RadioButtonGroup>
          <TextField floatingLabelText="E-mail" value={this.state.email} onChange = {e => { this.setState({email: e.target.value}) }} />&nbsp;&nbsp;&nbsp;&nbsp;
          <TextField floatingLabelText="Mobile" value={this.state.phone} onChange = {e => { this.setState({phone: e.target.value}) }} />
          <p>Favorite Sports:</p>
          <Checkbox checkedIcon={<ActionFavorite />} uncheckedIcon={<ActionFavoriteBorder />} label="Football" value="Football" style={styles.checkbox} onCheck={this.getSports} />
          <Checkbox checkedIcon={<ActionFavorite />} uncheckedIcon={<ActionFavoriteBorder />} label="Basketball" value="Basketball" style={styles.checkbox} onCheck={this.getSports} />
          <Checkbox checkedIcon={<ActionFavorite />} uncheckedIcon={<ActionFavoriteBorder />} label="Swimming" value="Swimming" style={styles.checkbox} onCheck={this.getSports} />
          <Checkbox checkedIcon={<ActionFavorite />} uncheckedIcon={<ActionFavoriteBorder />} label="Skiing" value="Skiing" style={styles.checkbox} onCheck={this.getSports} />
          <TextField
            floatingLabelText="Bio"
            multiLine={true}
            rows={2}
            rowsMax={4}
            value={this.state.bio}
            onChange={e => { this.setState({bio: e.target.value}) }}
          /><br />
          <TextField floatingLabelText="Picture URL" fullWidth={true} value={this.state.pic_url} onChange={e => { this.setState({pic_url: e.target.value}) }}/>
        </Dialog>
      </div>
    )
  }
};
