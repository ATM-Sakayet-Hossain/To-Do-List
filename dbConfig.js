import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTHXsaryG3OyxKA5_9RMlve7xO0EcOqqg",
  authDomain: "todolist-c89f2.firebaseapp.com",
  projectId: "todolist-c89f2",
  storageBucket: "todolist-c89f2.firebasestorage.app",
  messagingSenderId: "583766210101",
  appId: "1:583766210101:web:17b814a70fcd28bd97637c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize realtime database and get a reference to the service
export const database = getDatabase(app);
