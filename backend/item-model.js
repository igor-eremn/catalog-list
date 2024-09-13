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

  //Get Item by ID
  async getItem(id) {
    return await this.itemCollection.findOne({ _id: new ObjectId(id) });
  }


  async searchByName(searchQuery) {
    return await this.itemCollection
      .find({ name: { $regex: searchQuery, $options: 'i' } })
      .toArray();
  }

  // Search by Description
  async searchByDescription(searchQuery) {
    return await this.itemCollection
      .find({ description: { $regex: searchQuery, $options: 'i' } })
      .toArray();
  }
  //Search by Specs combined
  async searchBySpecs(searchQuery) {
    return await this.itemCollection
      .find({ $or: [
        { 'specs.Battery': { $regex: searchQuery, $options: 'i' } },
        { 'specs.Biometrics': { $regex: searchQuery, $options: 'i' } },
        { 'specs.Connectivity': { $regex: searchQuery, $options: 'i' } },
        { 'specs.Display': { $regex: searchQuery, $options: 'i' } },
        { 'specs.Processor': { $regex: searchQuery, $options: 'i' } },
        { 'specs.Storage': { $regex: searchQuery, $options: 'i' } },
        { 'specs.OS': { $regex: searchQuery, $options: 'i' } },
        { 'specs.Resistance': { $regex: searchQuery, $options: 'i' } },
      ]})
      .toArray();
  }

  // Combined Search (Name, Description, and Specs)
  async searchAll(searchQuery) {
    let res1 = await this.searchByName(searchQuery);
    let res2 = await this.searchByDescription(searchQuery);
    let res3 = await this.searchBySpecs(searchQuery);
    return [...res1, ...res2, ...res3];
  }
}

module.exports = itemModel;
