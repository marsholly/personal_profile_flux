import  React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui';
import NewProfile from './NewProfile';
import ProfileActions from '../actions/ProfileActions';
import ProfileStore from  '../stores/ProfileStore';

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
          <div className="row">
            <div className="col-md-4">
              <img src="http://img0.imgtn.bdimg.com/it/u=2668720173,3738761438&fm=21&gp=0.jpg" width="200" height="200"/>
            </div>
            <div className="col-md-8">
              <h2>content</h2>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
};
