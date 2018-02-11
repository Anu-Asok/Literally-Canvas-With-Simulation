var config = {
  apiKey: "AIzaSyCapvFfMPwCwQURa9us4FUqEflqXKi5CbM",
  authDomain: "test-anybodycanlearn.firebaseapp.com",
  databaseURL: "https://test-anybodycanlearn.firebaseio.com",
  projectId: "test-anybodycanlearn",
  storageBucket: "test-anybodycanlearn.appspot.com",
  messagingSenderId: "938731257186"
};
firebase.initializeApp(config);

const dbRef = firebase.database().ref();
const sgRef = firebase.storage().ref();
