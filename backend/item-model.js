const { ObjectId } = require('mongodb');

class itemModel {
  constructor(client) {
    this.itemCollection = client.db('DB1').collection('catalog-items');
  }

  //Get All Items
  async getAll() {
    return await this.itemCollection.find().toArray();
  }

  //Get All Items starting from low to high price
  async getLowToHighPrice() {
    return await this.itemCollection
      .find()
      .sort({ price: 1 })
      .toArray();
  }

  //Get All Items starting from high to low price
  async getHighToLowPrice() {
    return await this.itemCollection
      .find()
      .sort({ price: -1 })
      .toArray();
  }

  //Get All Items from low to high popularity
  async getLowToHighPopularity() {
    return await this.itemCollection
      .find()
      .sort({ popularity: 1 })
      .toArray();
  }

  //Get All Items from high to low popularity
  async getHighToLowPopularity() {
    return await this.itemCollection
      .find()
      .sort({ popularity: -1 })
      .toArray();
  }

  //Get All Items of Specific Category
  async getItemsByCategory(category_id) {
    return await this.itemCollection
      .find({ category_id: new ObjectId(category_id) })
      .toArray();
  }

  //Get All Items of Specific Category starting from low to high price
  async getItemsByCategoryLowToHigh(category_id) {
    return await this.itemCollection
      .find({ category_id: new ObjectId(category_id) })
      .sort({ price: 1 })
      .toArray();
  }
 
  //Get All Items of Specific Category starting from high to low price
  async getItemsByCategoryHighToLow(category_id) {
    return await this.itemCollection
      .find({ category_id: new ObjectId(category_id) })
      .sort({ price: -1 })
      .toArray();
  }

  //Get All Items of Specific Category from low to high popularity
  async getItemsByCategoryLowToHighPopularity(category_id) {
    return await this.itemCollection
      .find({ category_id: new ObjectId(category_id) })
      .sort({ popularity: 1 })
      .toArray();
  }

  //Get All Items of Specific Category from high to low popularity
  async getItemsByCategoryHighToLowPopularity(category_id) {
    return await this.itemCollection
      .find({ category_id: new ObjectId(category_id) })
      .sort({ popularity: -1 })
      .toArray();
  }
}

module.exports = itemModel;
