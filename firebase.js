import { initializeApp } from "@react-native-firebase/app";
import { getAuth } from "@react-native-firebase/auth";
import { getFirestore } from "@react-native-firebase/firestore";
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAgo0EeXlFfsakybPn-4K_K6j4R2m-9Okk",
  authDomain: "lahamove-3beca.firebaseapp.com",
  projectId: "lahamove-3beca",
  storageBucket: "lahamove-3beca.appspot.com",
  messagingSenderId: "615829922807",
  appId: "1:615829922807:web:f041aa4e0cdfbba1db84f2",
//   databaseURL: Constants.expoConfig.extra.databaseURL,
  //   @deprecated is deprecated Constants.manifest
};
// initialize firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };