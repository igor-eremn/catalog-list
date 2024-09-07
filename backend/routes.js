const express = require('express');
const CatalogModel = require('./catalog-model');
const ItemModel = require('./item-model');

module.exports = (client) => {
    const router = express.Router();
    const catalogModel = new CatalogModel(client);
    const itemModel = new ItemModel(client);

    //Get All Catalog Categories
    router.get('/category', async (req, res) => {
        try {
            const result = await catalogModel.getAll();
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    //Get All Items
    router.get('/items', async (req, res) => {
        try {
            const result = await itemModel.getAll();
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    //Get All Items starting from low to high price
    router.get('/items/low-to-high-price', async (req, res) => {
        try {
            const result = await itemModel.getLowToHighPrice();
            res.status(200).json(result);
        } catch (error) {
            console.error("Error fetching items:", error);  // Log the error for debugging
            res.status(400).json({ message: error.message });
        }
    });

    //Get All Items starting from high to low price
    router.get('/items/high-to-low-price', async (req, res) => {
        try {
            const result = await itemModel.getHighToLowPrice();
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    //Get All Items from low to high popularity
    router.get('/items/low-to-high-popularity', async (req, res) => {
        try {
            const result = await itemModel.getLowToHighPopularity();
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    //Get All Items from high to low popularity
    router.get('/items/high-to-low-popularity', async (req, res) => {
        try {
            const result = await itemModel.getHighToLowPopularity();
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    //Get All Items of Specific Category
    router.get('/items/:category_id', async (req, res) => {
        const category_id = req.params.category_id;

        try {
            const result = await itemModel.getItemsByCategory(category_id);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    //Get All Items of Specific Category from high to low price
    router.get('/items/:category_id/high-to-low-price', async (req, res) => {
        const category_id = req.params.category_id;

        try {
            const result = await itemModel.getItemsByCategoryHighToLow(category_id);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    //Get All Items of Specific Category from low to high price
    router.get('/items/:category_id/low-to-high-price', async (req, res) => {
        const category_id = req.params.category_id;

        try {
            const result = await itemModel.getItemsByCategoryLowToHigh(category_id);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    //Get All Items of Specific Category from high to low popularity
    router.get('/items/:category_id/high-to-low-popularity', async (req, res) => {
        const category_id = req.params.category_id;

        try {
            const result = await itemModel.getItemsByCategoryHighToLowPopularity(category_id);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    //Get All Items of Specific Category from low to high popularity
    router.get('/items/:category_id/low-to-high-popularity', async (req, res) => {
        const category_id = req.params.category_id;

        try {
            const result = await itemModel.getItemsByCategoryLowToHighPopularity(category_id);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    return router;
};
