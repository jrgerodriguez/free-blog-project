const { Hardware } = require("../models/index");
const mongoose = require("mongoose")

async function getAllHardwareProducts(req, res) {
  //#swagger.tags=['Hardware Products']
  try {
    const products = await Hardware.find({});
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

async function getHardwareProductById(req, res) {
  //#swagger.tags=['Hardware Products']
  const productId = req.params.id;

  if ( !productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Missing product ID or Invalid product ID format" });
  }

  try {
    const product = await Hardware.findById(productId);
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

async function createNewHardwareProduct(req, res) {
  //#swagger.tags=['Hardware Products']
    const { name, price, description, model, brand, category } = req.body;

    const productDocument = {
        name, 
        price, 
        description, 
        model, 
        brand, 
        category
    }

    if (!productDocument.name || !productDocument.price || !productDocument.description || !productDocument.model || !productDocument.brand || !productDocument.category) {
        return res.status(400).json({error: "Missing required fields"})
    }

    try {
        await Hardware.create(productDocument)
        res.status(201).json({message: "New Product Added Successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function updateHardwareProductById(req, res) {
    //#swagger.tags=['Hardware Products']
      const productId = req.params.id;
  
      if ( !productId || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Missing product ID or Invalid product ID format" });
      }
  
      const { name, price, description, model, brand, category } = req.body;
  
      const productDocument = {
        name, 
        price, 
        description, 
        model, 
        brand, 
        category
    }
  
    if (!productDocument.name || !productDocument.price || !productDocument.description || !productDocument.model || !productDocument.brand || !productDocument.category) {
        return res.status(400).json({error: "Missing required fields"})
    }
  
      try {
          const product = await Hardware.findById(productId);
          if (!product) {
              res.status(404).json({ message: "Product not found" });
          }
          await Hardware.updateOne(
              {_id: productId },
              {$set: productDocument}
          )
          res.status(200).json({message: "Product updated successfully"})
      } catch (error) {
          console.error(error)
          res.status(500).json({ error: "Internal Server Error" });
      }
  }

  async function deleteHardwareProductById(req,  res) {
    //#swagger.tags=['Hardware Products']
      const productId = req.params.id;
  
      if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
          return res.status(400).json({message: "Missing product ID or Invalid product ID format"})
      }
  
      try {
          const product = await Hardware.findById(productId);
          if (!product) {
              res.status(404).json({ message: "Product not found" });
          }
          await Hardware.deleteOne({_id: productId})
          res.status(200).json({message: "Product deleted successfully"})
      } catch (error) {
          console.error(error)
          res.status(500).json({ error: "Internal Server Error" });
      }
  }
  

module.exports = {getAllHardwareProducts, getHardwareProductById, createNewHardwareProduct, updateHardwareProductById, deleteHardwareProductById}
