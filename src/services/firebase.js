import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBTKXmfDqnVvv04fJekGnBgXmeI6tL5YeM",
    authDomain: "my-predev.firebaseapp.com",
    databaseURL: "https://my-predev.firebaseio.com",
    projectId: "my-predev",
    storageBucket: "my-predev.appspot.com",
    messagingSenderId: "397617009809",
    appId: "1:397617009809:web:ff5323d61d219d3bd21b30"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)   
}

export default firebase



