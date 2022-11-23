
const firestore = require('../database/firebase/config').firebaseDb;
const normalizr = require('normalizr');
const util = require('util');
const normalize = normalizr.normalize;
const schema = normalizr.schema;
const author = new schema.Entity('author', {} ,{ idAttribute: 'email'});
const messages = new schema.Entity('messages');
const myArray = new schema.Array(
  {
    messages: messages,
    author: author
  }
);
class Chat {
  constructor() {
    this.nameTable = 'MESSAGES';
  }
  async saveMessage(message) {
    try {
      if (!message || typeof message !== 'object') {
        throw Error('Data invalid');
      }
      if (Object.keys(message).length === 0) {
        throw Error("Data empty");
      }
      const data = await firestore.collection(this.nameTable).add({
        ...message
      });
      return { _id: data.id, message };
    } catch (error) {
      throw Error(error.message);
    }
  }
  async getAllMessages() {
    try {
      const messageData = [];
      const dataMessages = await firestore.collection(this.nameTable).get();
      dataMessages.forEach((doc) => {
        messageData.push( {
          ...doc.data(),
          id: doc.id,
          }
        );
      });
      return {
        ...normalize(messageData, myArray),
        original: messageData
      };
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = Chat;