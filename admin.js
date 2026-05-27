import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
  import {getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAdvPCB1DA_wFB2qD95-vtB5HSVhaZpujk",
    authDomain: "laxmi-xerox-47cb3.firebaseapp.com",
    projectId: "laxmi-xerox-47cb3",
    storageBucket: "laxmi-xerox-47cb3.firebasestorage.app",
    messagingSenderId: "90263972495",
    appId: "1:90263972495:web:c28f8d4e96d770bc255efa",
    measurementId: "G-76K4WLZZY5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);


  window.login = async function(){
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;

 

  try{
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login Succesfully");
    window.location.href= "dashboard.html";
  }
catch(error){
  //alert("Give correct Email and Password");
  console.log(error.code);
  console.log(error.message);
  alert(error.code);
}

  }