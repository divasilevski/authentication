import firebase from "firebase/app";

export default {
  state: {},
  mutations: {},
  actions: {
    updateUserData: async ({ getters }, data) => {
      // Заходим в базу данных по id и обновляем/добавляем данные
      // data = {key: value}
      await firebase
        .database()
        .ref(`user_data/${getters.user.id}`)
        .update(data);
    }
  },
  getters: {}
};
