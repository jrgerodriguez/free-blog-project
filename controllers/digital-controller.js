const { Digital } = require("../models/index");
const mongoose = require("mongoose");

async function getAllDigitalProducts(req, res) {
  //#swagger.tags=['Digital Products']
  try {
    const products = await Digital.find({});
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(400).json({ message: "Unable to retrieve products" });
    }
  } catch (error) {
    console.error("Unable to get products:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getDigitalProductById(req, res) {
    //#swagger.tags=['Digital Products']
    const productId = req.params.id;
  
    if ( !productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Missing product ID or Invalid product ID format" });
    }
  
    try {
      const product = await Digital.findById(productId);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product Not Found" });
      }
    } catch (error) {
      console.error("Unable to get product:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }

async function createNewDigitalroduct(req, res) {
    //#swagger.tags=['Digital Products']
      const { name, version, company, description, extra, plan, available } = req.body;
  
      const productDocument = {
        name, 
        version, 
        company, 
        description, 
        extra, 
        plan, 
        available
      }
  
      if (!productDocument.name || !productDocument.version || !productDocument.company || !productDocument.description || !productDocument.extra || !productDocument.plan || productDocument.available === undefined) {
          return res.status(400).json({error: "Missing required fields"})
      }
  
      try {
          await Digital.create(productDocument)
          res.status(201).json({message: "New Product Added Successfully"})
      } catch (error) {
          console.error(error)
          res.status(500).json({ error: "Internal Server Error" });
      }
  }

async function updateDigitalProductById(req, res) {
    //#swagger.tags=['Digital Products']
      const productId = req.params.id;
  
      if ( !productId || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Missing product ID or Invalid product ID format" });
      }
  
      const { name, version, company, description, extra, plan, available } = req.body;
  
      const productDocument = {
        name, 
        version, 
        company, 
        description, 
        extra, 
        plan, 
        available
      }
  
      if (!productDocument.name || !productDocument.version || !productDocument.company || !productDocument.description || !productDocument.extra || !productDocument.plan || productDocument.available === undefined) {
          return res.status(400).json({error: "Missing required fields"})
      }
  
      try {
          const product = await Digital.findById(productId);
          if (!product) {
              res.status(404).json({ message: "Product not found" });
          }
          await Digital.updateOne(
              {_id: productId },
              {$set: productDocument}
          )
          res.status(200).json({message: "Product updated successfully"})
      } catch (error) {
          console.error(error)
          res.status(500).json({ error: "Internal Server Error" });
      }
  }

  async function deleteDigitalProductById(req,  res) {
    //#swagger.tags=['Digital Products']
      const productId = req.params.id;
  
      if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
          return res.status(400).json({message: "Missing product ID or Invalid product ID format"})
      }
  
      try {
          const product = await Digital.findById(productId);
          if (!product) {
              res.status(404).json({ message: "Product not found" });
          }
          await Digital.deleteOne({_id: productId})
          res.status(200).json({message: "Product deleted successfully"})
      } catch (error) {
          console.error(error)
          res.status(500).json({ error: "Internal Server Error" });
      }
  }

module.exports = { getAllDigitalProducts, getDigitalProductById, createNewDigitalroduct, updateDigitalProductById, deleteDigitalProductById };
