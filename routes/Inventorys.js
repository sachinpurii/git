const express = require('express');
const router = express.Router();
const Inventory = require('../model/inventory');
const User = require('../model/userschema');
const uploads = require('../middleware/upload')
// const Product = require('../model/productschema')
const { findById } = require('../model/userschema');

// for one product 
router.get('/User/:id/inventorys', async (req, res) => {
  
  try {
    const user = await User.findById(req.params.id);
    res.send({ Productdetails: user.inventorys });
  }
  catch (err) {
    res.status(404).json({ status: 404, message: err });
  }
})

// for all product 
  router.get('/inventory', (req, res) => {
    Inventory.find((err, docs) => {
      if (!err) {
        res.status(200).json({ status: 200, message: "Success", data: docs });
      } else {
        res.status(404).json({ status: 404, message: err });
      }
    });
  })
  

  
  
  router.post("/add_inventory/:id", uploads.single('productImage'), async (req, res) => {
    // console.log(req.file);
    if (req.body.selectServiceType) {
      try {
        const inventory = new Inventory({
          photo: req.file.filename,
          itemCategory: req.body.itemCategory,
          itemName: req.body.itemName,
          itemDescription: req.body.itemDescription,
          itemPrice: req.body.itemPrice,
          unitQuantity: req.body.unitQuantity,
          unitType: req.body.unitType,
          etaDelieveryTime: req.body.etaDelieveryTime,
          itemsIn: req.body.itemsIn,
          selectServiceType: req.body.selectServiceType,
          image: 'http://localhost:4001/uploads/' + req.file.filename,
        });
  
        const inventorys = await inventory.save();
        const user = await User.findById(req.params.id)
        user.inventorys.push(inventorys)
        await user.save()
        res.status(200).json
          ({ "status": 200, "message": "Success", "result": user });
      } catch (err) {
        res.status(404).json({ status: 404, message: err });
        console.log(err);
      }
  
    }
    else {
      res.send('Not allowed')
    }
  })
  
  
  
  router.put("/update_inventory/:id", async (req, res) => {
    try {
      const updatedAddress = await Inventory.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.send(updatedAddress);
    } catch (err) {
      res.send(err);
    }
  
  });
  
  
  router.delete('/user/:userid/inventory/:id', async (req, res) => {
  
    const { userid, id } = req.params;
    await User.findByIdAndUpdate(userid, { $pull: { products: id } })
    res.send("Product removed from inventory successfully");
  });

// getting one product 
//   router.get("/product/:name", async (req, res) => {
//     try {
//       const product = await Product.findOne(req.body.name);
//       res.status(200).json(product);
//     } catch (err) {
//       res.status(404).json({ status: 404, message: err });
//     }
  
//   });
  
  // Getting all products
//   router.get('/product', (req, res) => {
//     Product.find((err, docs) => {
//       if (!err) {
//         res.status(200).json({ status: 200, message: "Success", data: docs });
//       } else {
//         res.status(404).json({ status: 404, message: err });
//       }
//     });
//   })
//   router.post("/product_details", async (req, res) => {
//     try {
//       const product = new Product({
//         itemName: req.body.itemName,
//         quantity: req.body.quantity,
//         price: req.body.price,
//         category: req.body.category,
//       });
//       const user = await product.save();
//       console.log('product', user)
//       res.status(200).json
//         ({ "status": 200, "message": "Success", "result": user });
//     } catch (err) {
//       res.status(404).json({ status: 404, message: err });
//       console.log(err);
//     }
//   })
//   router.put("/update_details", async (req, res) => {
//     try {
//       const updatedDetails = await Product.findByIdAndUpdate(
//         req.body.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       res.status(200).json({ "status": 200, "message": "Success", "result": updatedDetails });
//     } catch (err) {
//       res.status(404).json({ status: 404, message: err });
//     }
//   });

//   router.delete("/delete_details", async (req, res) => {
//     try {
//       const details = await Product.findById(req.body.id);
//       try {
//         await details.delete();
//         res.send("Product has been deleted.");
//       } catch (err) {
//         res.send(err);
//       }
  
//     } catch (err) {
//       res.status(404).json({ status: 404, message: err });
//     }
//   });

  module.exports = router;