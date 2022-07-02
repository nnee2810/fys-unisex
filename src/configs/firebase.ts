import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB13zAXD4Jd1C0bu9LsvujMOYocMsjFVhU",
  authDomain: "infra-earth-347015.firebaseapp.com",
  projectId: "infra-earth-347015",
  storageBucket: "infra-earth-347015.appspot.com",
  messagingSenderId: "548099056895",
  appId: "1:548099056895:web:2725406340eff57366d8ca",
}

const app = initializeApp(firebaseConfig)

export const firebaseAuth = getAuth(app)
