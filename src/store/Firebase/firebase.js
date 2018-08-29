import fire from 'firebase';
var config = {
  apiKey: "AIzaSyAwlY7EBMtDa9Ct0j240FxKBLSoAI3G764",
  authDomain: "inventory-90f0f.firebaseapp.com",
  databaseURL: "https://inventory-90f0f.firebaseio.com",
  projectId: "inventory-90f0f",
  storageBucket: "inventory-90f0f.appspot.com",
  messagingSenderId: "936420563199"
};
let firebase = fire.initializeApp(config);
export default firebase;