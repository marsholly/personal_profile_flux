import  React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui';
import ProfileActions from '../actions/ProfileActions';
import ProfileStore from  '../stores/ProfileStore';
import NewProfile from './NewProfile';
import ProfileBoard from './ProfileBoard';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: []
    }
    this.addNewProfile = this.addNewProfile.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    ProfileStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    ProfileStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      profile: ProfileStore.getAll()
    })
  }

  addNewProfile(newProfile) {
    ProfileActions.createProfile(newProfile);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <h1 className="text-center">Personal Profile</h1>
          <NewProfile addNewProfile={this.addNewProfile}/>
          <hr/>
          <ProfileBoard profile={this.state.profile}/>
        </div>
      </MuiThemeProvider>
    )
  }
};
