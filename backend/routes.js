const express = require('express');
const catalogModel = require('./catalog-model');
const itemModel = require('./item-model');

module.exports = (client) => {
    const router = express.Router();
    //const catalogModel = new catalogModel(client);
    //const itemModel = new itemModel(client);

    //Get All Catalog Categories
    router.get('/catalog', async (req, res) => {
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
            const items = await itemModel.getAll();
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    //Get All Items of Specific Category
    router.get('/catalog/items/:category', async (req, res) => {
        try {
            const items = await itemModel.getItemsByCategory(req.params.category);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};
