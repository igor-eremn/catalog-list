const express = require('express');
const CatalogModel = require('./catalog-model');
const ItemModel = require('./item-model');

module.exports = (client) => {
    const router = express.Router();
    const catalogModel = new CatalogModel(client);
    const itemModel = new ItemModel(client);

    //Get All Catalog Categories
    router.get('/catalog/categories', async (req, res) => {
        try {
            const catalog = await catalogModel.getAll();
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    //Get All Items
    router.get('/catalog/items', async (req, res) => {
        try {
            const result = await itemModel.getAll();
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    //Get All Items of Specific Category
    router.get('/catalog/items/:category_id', async (req, res) => {
        try {
            const result = await itemModel.getItemsByCategory(req.params.category_id);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};
