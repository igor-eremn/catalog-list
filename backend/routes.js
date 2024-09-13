const express = require('express');
const CatalogModel = require('./catalog-model');
const ItemModel = require('./item-model');
const { ObjectId } = require('mongodb');

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

    //Get Category by ID
    router.get('/category/:id', async (req, res) => {
        const id = req.params.id;
      
        try {
          const result = await catalogModel.getCategoryById(id);
          if (!result) {
            return res.status(404).json({ message: "Category not found" });
          }
          res.status(200).json(result);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
    });
    
    //Get Category by Name
    router.get('/category/name/:name', async (req, res) => {
        const name = req.params.name;
      
        try {
          const result = await catalogModel.getCategoryByName(name);
          if (!result) {
            return res.status(404).json({ message: "Category not found" });
          }
          res.status(200).json(result);
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

    // Get Specific Item's Details
    router.get('/items/info/:item_id', async (req, res) => {
        const item_id = req.params.item_id;

        // Validate item_id before querying the database
        if (!ObjectId.isValid(item_id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        try {
            const result = await itemModel.getItem(item_id);
            if (!result) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // Search Route Name
    router.get('/items/search/name', async (req, res) => {
        const searchQuery = req.query.name;
        if (!searchQuery) {
            return res.status(400).json({ message: 'Search query is required' });
        }
        try {
            const results = await itemModel.searchByName(searchQuery);
            
            if (results.length === 0) {
                return res.status(404).json({ message: 'No items found matching the search criteria' });
            }
            
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // Search Route Description
    router.get('/items/search/description', async (req, res) => {
        const searchQuery = req.query.description;
        if (!searchQuery) {
            return res.status(400).json({ message: 'Search query is required' });
        }
        try {
            const results = await itemModel.searchByDescription(searchQuery);
            
            if (results.length === 0) {
                return res.status(404).json({ message: 'No items found matching the search criteria' });
            }
            
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // Search Route Specs
    router.get('/items/search/specs', async (req, res) => {
        const searchQuery = req.query.specs;
        if (!searchQuery) {
            return res.status(400).json({ message: 'Search query is required' });
        }
        try {
            const results = await itemModel.searchBySpecs(searchQuery);
            
            if (results.length === 0) {
                return res.status(404).json({ message: 'No items found matching the search criteria' });
            }
            
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // Combined Search Route
    router.get('/items/search/all', async (req, res) => {
        const searchQuery = req.query.query;
        if (!searchQuery) {
            return res.status(400).json({ message: 'Search query is required' });
        }
        
        try {
            const results = await itemModel.searchAll(searchQuery);
            
            if (results.length === 0) {
                return res.status(404).json({ message: 'No items found matching the search criteria' });
            }
            
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
    
    


    return router;
};
