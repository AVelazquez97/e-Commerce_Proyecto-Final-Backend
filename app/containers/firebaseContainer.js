import FirebaseConnection from '../database/configFirebase.js';
const firebase = FirebaseConnection.getFirebaseConnectionInstance();

class FirebaseContainer {
  constructor(collectionName) {
    this.db = firebase.connectDB()
    this.collectionName = this.db.collection(collectionName);
  }
}

export default FirebaseContainer;
