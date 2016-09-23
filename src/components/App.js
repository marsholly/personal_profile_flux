import React from 'react';
import { MuiThemeProvider } from 'material-ui';
import NewProfile from './NewProfile';

const App = React.createClass({
  getInitialState() {
    return {
      profile: []
    }
  },

  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <h1 className="text-center">Personal Profile</h1>
          <NewProfile />
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
});

export default App;
