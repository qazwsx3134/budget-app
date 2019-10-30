import * as firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyCyNf5zYbxJk3KeMo-S1D5JhNTRVMUd12Y",
    authDomain: "budgetapp-4eebf.firebaseapp.com",
    databaseURL: "https://budgetapp-4eebf.firebaseio.com",
    projectId: "budgetapp-4eebf",
    storageBucket: "budgetapp-4eebf.appspot.com",
    messagingSenderId: "420091807168",
    appId: "1:420091807168:web:62cfeea3f7a854398ef425",
    measurementId: "G-8J01P93YJZ"
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
