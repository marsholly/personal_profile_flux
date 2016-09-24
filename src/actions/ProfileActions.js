import AppDispatcher from '../AppDispatcher';

const ProfileActions = {
  createProfile(newProfile) {
    AppDispatcher.dispatch({
      type: 'CREATE_PROFILE',
      payload: { newProfile }
    })
  }
}

export default ProfileActions;
