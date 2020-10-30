// import { isIos } from '~/scripts/helpers/environment.js';

// let isSigningUp = false;
// let unsubscribeUser = null;

// const userChangeHandler = (change, commit) => {
//   const data = change.doc.data();

//   switch (change.type) {
//     case 'added':
//       commit('SET_USER_DATA', { ...data, id: change.doc.id });
//       break;
//     case 'modified':
//       commit('UPDATE_USER_DATA', { ...data, id: change.doc.id });
//       break;
//     // default:
//     //   console.warn('!!! unhandled user change type');
//     //   console.warn(change.type);
//   }
// };

// export const state = () => ({
//   currentUser: null,
//   userData: null,
//   loggedIn: false,
//   authRequested: false,
//   authInitialized: false,
// });

// export const mutations = {
//   AUTH_INITIALIZED() {
//     state.authInitialized = true;
//   },
//   REQUEST_AUTH() {
//     state.authRequested = true;
//   },
//   SET_USER(state, user) {
//     state.loggedIn = true;
//     state.authRequested = false;
//     state.currentUser = {
//       uid: user.uid,
//       email: user.email,
//       displayName: user.displayName,
//       photoURL: user.photoURL,
//     };
//   },
//   UPDATE_USER(state, user) {
//     let key;

//     for (key in user) {
//       if (Object.prototype.hasOwnProperty.call(state.currentUser, key)) {
//         state.currentUser[key] = user[key];
//       }
//     }
//   },
//   UNSET_USER(state) {
//     state.loggedIn = false;
//     state.currentUser = null;
//     state.userRef = null;
//   },
//   SET_USER_DATA(state, data) {
//     state.userData = data;
//   },
//   UPDATE_USER_DATA(state, data) {
//     state.userData = data;
//   },
// };

// export const actions = {
//   init({ commit, dispatch, rootState }) {
//     rootState.auth.onAuthStateChanged((user) => {
//       if (user) {
//         const userRef = rootState.usersCollection.where('uid', '==', user.uid);

//         dispatch('files/connect', user.uid, { root: true });

//         unsubscribeUser = userRef.onSnapshot((snapshot) => {
//           return snapshot
//             .docChanges()
//             .forEach((change) => userChangeHandler(change, commit, dispatch));
//         });
//       }

//       commit('AUTH_INITIALIZED');

//       if (user) {
//         if (isSigningUp) {
//           isSigningUp = false;
//         } else {
//           commit('SET_USER', user);
//         }
//       } else {
//         commit('UNSET_USER');
//       }
//     });
//   },
//   signup({ commit, rootState }, { displayName, email, password }) {
//     isSigningUp = true;

//     rootState.auth
//       .createUserWithEmailAndPassword(email, password)
//       .then(({ user }) => {
//         if (user) {
//           return user.updateProfile({ displayName });
//         }
//       })
//       .then(() => {
//         commit('SET_USER', { user: rootState.auth.currentUser });
//       })
//       .catch((error) => {
//         if (error) {
//           // TODO
//           // console.log('*** Sign Up Error ************');
//           // console.log(error.code, error.message);
//         }
//       });
//   },
//   login({ rootState }, { email, password }) {
//     rootState.auth
//       .signInWithEmailAndPassword(email, password)
//       .catch((error) => {
//         if (error) {
//           // TODO
//           // console.log('*** Login Error ************')
//           // console.log(error.code, error.message)
//         }
//       });
//   },
//   googleLogin({ rootState }) {
//     const authProvider = this.$fireAuth.GoogleAuthProvider();

//     if (isIos()) {
//       rootState.auth.signInWithRedirect(authProvider);
//     } else {
//       rootState.auth.signInWithPopup(authProvider);
//     }
//   },
//   requestReset({ rootState }, email) {
//     rootState.auth.sendPasswordResetEmail(email).catch((error) => {
//       if (error) {
//         // TODO
//         // console.log('*** Request Reset Error ************')
//         // console.log(error.code, error.message)
//       }
//     });
//   },
//   updateUser({ rootState, dispatch, commit }, updatedUser) {
//     rootState.auth.currentUser
//       .updateProfile(updatedUser)
//       .then(() => {
//         commit('UPDATE_USER', updatedUser);
//         dispatch('toast/success', 'Profile updated!', { root: true });
//       })
//       .catch((error) => {
//         if (error) {
//           // TODO
//           // console.log('*** Update User Error ************')
//           // console.log(error.code, error.message)
//         }
//       });
//   },
//   updatePassword(
//     { rootState, state, dispatch },
//     { newPassword, currentPassword }
//   ) {
//     const credential = this.$fireAuth.EmailAuthProvider.credential(
//       state.currentUser.email,
//       currentPassword
//     );

//     return new Promise((resolve, reject) => {
//       this.$fireAuth.currentUser
//         .reauthenticateAndRetrieveDataWithCredential(credential)
//         .then(() => rootState.auth.currentUser.updatePassword(newPassword))
//         .then(() => {
//           dispatch('toast/success', 'Password updated!', { root: true });
//           resolve();
//         })
//         .catch((error) => {
//           if (error) {
//             switch (error.code) {
//               case 'auth/wrong-password':
//                 dispatch('toast/send', 'Password is incorrect!', {
//                   root: true,
//                 });
//                 break;
//               default:
//                 // TODO
//                 // console.log('*** Unknown Password Reset Error ************')
//                 // console.log(error.code, error.message)
//                 break;
//             }
//           }
//         });
//     });
//   },
//   updateUserData({ state, rootState }, userData) {
//     // TODO
//     // const userRef = rootState.usersCollection.doc(state.userData.id);
//     // userRef.set(userData, { merge: true });
//   },
//   requestAuth({ commit }) {
//     commit('REQUEST_AUTH');
//   },
//   logout({ rootState, dispatch }) {
//     unsubscribeUser();
//     dispatch('files/disconnect', null, { root: true });
//     rootState.auth.signOut();
//   },
// };

// // export default {
// //   namespaced: true,
// //   state,
// //   mutations,
// //   actions,
// // };
