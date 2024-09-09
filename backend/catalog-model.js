const { ObjectId } = require('mongodb');

class catalogModel {
  constructor(client) {
    this.categoryCollection = client.db('DB1').collection('category');
  }

  async getAll() {
    return await this.categoryCollection.find().toArray();
  }

  async getCategoryById(id) {
    return await this.categoryCollection.findOne({ _id: new ObjectId(id) });
  }
  
}

module.exports = catalogModel;