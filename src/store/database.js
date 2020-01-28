import firebase from "firebase/app";

export default {
  state: {},
  mutations: {},
  actions: {
    updateData: async (undefined, data) => {
      // data = {key: value}
      const user = firebase.auth().currentUser;
      await firebase
        .database()
        .ref(`user_data/${user.uid}`)
        .update(data);
    },

    loadData: async () => {
      const user = firebase.auth().currentUser;
      const data = await firebase
        .database()
        .ref(`user_data/${user.uid}`)
        .once("value");
      return data.val();
    },

    removeData: async () => {
      const user = firebase.auth().currentUser;
      firebase
        .database()
        .ref(`user_data/${user.uid}`)
        .remove();
    }
  },
  getters: {}
};
