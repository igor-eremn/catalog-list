class catalogModel {
  constructor(client) {
    this.categoryCollection = client.db('DB1').collection('category');
  }

  async getAll() {
    return await this.categoryCollection.find().toArray();
  }
}

module.exports = catalogModel;