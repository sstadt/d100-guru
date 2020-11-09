import { isIos } from '~/scripts/helpers/environment.js';

let isSigningUp = false;
let unsubscribeUser = null;

export const state = () => ({
  currentUser: null,
  userData: null,
  loggedIn: false,
  authRequested: false,
  authInitialized: false,
});

export const mutations = {
  AUTH_INITIALIZED() {
    state.authInitialized = true;
  },
  REQUEST_AUTH() {
    state.authRequested = true;
  },
  SET_USER(state, user) {
    state.loggedIn = true;
    state.authRequested = false;
    state.currentUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  },
  UPDATE_USER(state, user) {
    let key;

    for (key in user) {
      if (Object.prototype.hasOwnProperty.call(state.currentUser, key)) {
        state.currentUser[key] = user[key];
      }
    }
  },
  UNSET_USER(state) {
    state.loggedIn = false;
    state.currentUser = null;
    state.userRef = null;
    state.userData = {};
  },
  UPDATE_USER_DATA(state, data) {
    state.userData = data;
  },
};

export const actions = {
  authStateChanged({ commit }, { authUser }) {
    console.log('--- authStateChanged');
    console.log(authUser);
    if (authUser) {
      const userRef = this.$firestore
        .collection('users')
        .where('uid', '==', authUser.uid);

      unsubscribeUser = userRef.onSnapshot((snapshot) => {
        return snapshot.docChanges().forEach((change) => {
          if (['added', 'modified'].includes(change.type)) {
            const data = change.doc.data();
            commit('UPDATE_USER_DATA', { ...data, id: change.doc.id });
          }
        });
      });
    }

    commit('AUTH_INITIALIZED');

    if (authUser) {
      if (isSigningUp) {
        isSigningUp = false;
      } else {
        const { uid, email, emailVerified } = authUser;
        // eslint-disable-next-line
        console.log(authUser);
        commit('SET_USER', { uid, email, emailVerified });
      }
    } else {
      commit('UNSET_USER');
    }
  },
  signup({ commit, dispatch }, { displayName, email, password }) {
    console.log('--- signup');
    isSigningUp = true;

    this.$fire.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log('user created');
        return user
          ? user.updateProfile({ displayName })
          : new Promise().reject('Could not create user');
      })
      .then(() => {
        console.log('setting user');
        commit('SET_USER', { user: this.$fire.auth.currentUser });
      })
      .catch((error) => {
        if (error) {
          dispatch('error/handle', error, { root: true });
        }
      });
  },
  login({ dispatch }, { email, password }) {
    this.$fire.auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        if (error) {
          dispatch('error/handle', error, { root: true });
        }
      });
  },
  googleLogin() {
    const authProvider = this.$fire.auth.GoogleAuthProvider();

    if (isIos()) {
      this.$fire.auth.signInWithRedirect(authProvider);
    } else {
      this.$fire.auth.signInWithPopup(authProvider);
    }
  },
  requestReset({ dispatch }, email) {
    this.$fire.auth.sendPasswordResetEmail(email).catch((error) => {
      if (error) {
        dispatch('error/handle', error, { root: true });
      }
    });
  },
  updateUser({ dispatch, commit }, updatedUser) {
    this.$fire.auth.currentUser
      .updateProfile(updatedUser)
      .then(() => {
        commit('UPDATE_USER', updatedUser);
        dispatch('toast/success', 'Profile updated!', { root: true });
      })
      .catch((error) => {
        if (error) {
          dispatch('error/handle', error, { root: true });
        }
      });
  },
  updatePassword({ state, dispatch }, { newPassword, currentPassword }) {
    const credential = this.$fire.auth.EmailAuthProvider.credential(
      state.currentUser.email,
      currentPassword
    );

    return new Promise((resolve) => {
      this.$fire.auth.currentUser
        .reauthenticateAndRetrieveDataWithCredential(credential)
        .then(() => this.$fire.auth.currentUser.updatePassword(newPassword))
        .then(() => {
          dispatch('toast/success', 'Password updated!', { root: true });
          resolve();
        })
        .catch((error) => {
          if (error) {
            switch (error.code) {
              case 'auth/wrong-password':
                dispatch('toast/send', 'Password is incorrect!', {
                  root: true,
                });
                break;
              default:
                dispatch('error/handle', error, { root: true });
                break;
            }
          }
        });
    });
  },
  updateUserData({ state }, userData) {
    const userRef = this.$fireStore.collection('users').doc(state.userData.id);
    userRef.set(userData, { merge: true });
  },
  requestAuth({ commit }) {
    commit('REQUEST_AUTH');
  },
  logout({ dispatch }) {
    unsubscribeUser();
    dispatch('files/disconnect', null, { root: true });
    this.$fire.auth.signOut();
  },
};
