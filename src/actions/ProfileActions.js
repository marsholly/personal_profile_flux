import AppDispatcher from '../AppDispatcher';

const ProfileActions = {
  createProfile(profile) {
    AppDispatcher.dispatch({
      type: 'CREATE_PROFILE',
      payload: { profile }
    })
  }
}

export default ProfileActions;
