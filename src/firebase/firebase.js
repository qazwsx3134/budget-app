import * as firebase from "firebase";


const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

// //child_removed
// database.ref('expenses').on('child_removed', (snapshot)=>{
//     console.log(snapshot.key, snapshot.val());
    
// });
// //child_changed
// database.ref('expenses').on('child_changed', (snapshot)=>{
//     console.log(snapshot.key, snapshot.val());
    
// });
// //child_added 一開始 會回傳所有child 然後有新的會再回傳
// database.ref('expenses').on('child_added', (snapshot)=>{
//     console.log(snapshot.key, snapshot.val());
    
// });

// database.ref('expenses')
// .once('value')
// .then((snapshot)=>{
//     const expenses = [];

//     snapshot.forEach((childSnapshot)=>{
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });

//     console.log(expenses);
    
// });

// // database.ref('expenses').push({
// //     description: 'Rent',
// //     note: '',
// //     amount: 123213,
// //     createdAt: 1213213
// // });

// database.ref('expenses').on('value', (snapshot)=>{
//     const expenses = [];

//     snapshot.forEach((childSnapshot)=>{
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });

//     console.log(expenses);
    
    
// }) 

// database.ref() //只接收一次
// .once('value')
// .then((snapshot)=>{
//     const val = snapshot.val();
//     console.log(val);
    
// })
// .catch((e)=>{
//     console.log(e);
    
// })

//   database.ref().set({
//       name : 'Peter',
//       age: 26,
//       isSingle: false,
//       location: {
//           city: 'Hualien',
//           country: 'TW'
//       }
//   })
