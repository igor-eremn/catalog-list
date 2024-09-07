const { ObjectId } = require('mongodb');

class catalogModel {
  constructor(client) {
    this.categoryCollection = client.db('DB1').collection('catalog-item');
  }

  async getAll() {
    return await this.categoryCollection.find().toArray();
  }
}

module.exports = catalogModel;