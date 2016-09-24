import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';

let _profile = [];

class ProfileStore extends EventEmitter {
  constructor(props) {
    super(props);

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'CREATE_PROFILE':
          let { profile } = action.payload;
          _profile.push(profile);
          this.emit('CHANGE');
          break;
        case 'UPDATE_PROFILE':
          let updateProfile = action.payload.profile;
          _profile[0] = updateProfile;
          this.emit('CHANGE');
          break;
      }
    });
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getAll() {
    return _profile;
  }
}

export default new ProfileStore();
