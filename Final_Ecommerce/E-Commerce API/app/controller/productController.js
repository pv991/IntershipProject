const con = require("../config/database");
const table = require("../config/tables");
const utils = require("../common/utils");

exports.AddProduct = async (req, res) => {
  const requestData = req.body;
  var image_file = req.files;
  console.log(image_file);
  if (image_file != undefined && image_file.length > 0) {
    var image_name = req.files[0].originalname;
    var url =
      utils.getStoreImageFolderPath(FOLDER_NAME.USER_PROFILES) + image_name;
    requestData.ProductImage = url;

    utils.storeImageToFolder(
      image_file[0].path,
      image_name,
      FOLDER_NAME.USER_PROFILES
    );
  }
  const sql =
    `INSERT INTO ${table.product} (ProductImage,  ProductName, ProductDescription, ProductPrice, ProductCategory)` +
    ` VALUES ('${requestData.ProductImage}', '${requestData.ProductName}', '${requestData.ProductDescription}', '${requestData.ProductPrice}', '${requestData.ProductCategory}')`;
  con.query(sql, (err, results) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: `Server Internal error`,
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Product Add successfully",
      result: results,
    });
  });
};

exports.ProductDetail = async (req, res) => {
  // const requestData = req.body;
  const sql = `SELECT * FROM ${table.product}`;
  con.query(sql, (err, results) => {
    if (err) {
      return res.status(400).send({
        success: false,
        message: `Server Internal error`,
        error: err,
      });
    }
    return res.status(200).send({
      success: true,
      status: 200,
      message: "Product detail",
      result: results,
    });
  });
};

exports.AddToCart = async (req, res) => {
  const requestData = req.body;
  const sql =
    `INSERT INTO ${table.cart} (ProductPrice,ProductId,  ProductName, ProductPhoto, ProductQuantity,CustomerId )` +
    ` VALUES ('${requestData.ProductPrice}','${requestData.ProductId}', '${requestData.ProductName}', '${requestData.ProductPhoto}', '${requestData.ProductQuantity}','${requestData.CustomerId}')`;
  con.query(sql, (err, results) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: `Server Internal error`,
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Product Addedd successfully",
      result: results,
    });
  });
};

exports.RemoveFromCart = async (req, res) => {
  const requestData = req.body;
  const sql = `DELETE FROM ${table.cart} WHERE ProductId = ${req.body.id} AND CustomerId = ${req.body.CustomerId}`;
  con.query(sql, (err, results) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: `Server Internal error`,
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Product Deleted successfully",
      result: results,
    });
  });
};

exports.AddOrder = async (req, res) => {
  const requestData = req.body;
  const sql1 = `DELETE FROM ${table.cart} WHERE CustomerId=${req.body.CustomerId}`;
  con.query(sql1, (err, results) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: `Server Internal error`,
        error: err,
      });
    }
  });

  const sql =
    `INSERT INTO ${table.ordertable} (uniqueId,ProductPhoto,  ProductName, ProductPrice, Total,CustomerId)` +
    ` VALUES ('${requestData.uniqueId}','${requestData.ProductPhoto}', '${requestData.ProductName}', '${requestData.ProductPrice}', '${requestData.Total}', '${requestData.CustomerId}')`;
  con.query(sql, (err, results) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: `Server Internal error`,
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Product Add successfully",
      result: results,
    });
  });
};

exports.RecentOrder = async (req, res) => {
  // const requestData = req.body;
  let sql;
  if(req.body.admin==="1"){
    sql = `SELECT ordertable.payment_gateway,ordertable.created_at,ordertable.razorpay_payment_id,userregistration.FirstName,ordertable.CustomerId,ordertable.uniqueId, group_concat( ordertable.ProductPrice ) as ProductPrice,
   group_concat( ordertable.Total ) as Total,
   
   group_concat( ordertable.ProductPhoto ) as ProductPhoto,
   group_concat( ordertable.ProductName ) as ProductName,
   group_concat( ordertable.razorpay_payment_id) as razorpay_payment_ids
   FROM ordertable 
  LEFT JOIN userregistration ON ordertable.CustomerId=userregistration.id
  group by ordertable.uniqueId; `;
  }else{
    sql = `SELECT ordertable.payment_gateway,ordertable.created_at,ordertable.razorpay_payment_id,userregistration.FirstName,ordertable.CustomerId,ordertable.uniqueId, group_concat( ordertable.ProductPrice ) as ProductPrice,
   group_concat( ordertable.Total ) as Total,
   
   group_concat( ordertable.ProductPhoto ) as ProductPhoto,
   group_concat( ordertable.ProductName ) as ProductName,
   group_concat( ordertable.razorpay_payment_id) as razorpay_payment_ids
   FROM ordertable 
  LEFT JOIN userregistration ON ordertable.CustomerId=userregistration.id
  WHERE ordertable.CustomerId = "${req.body.id}" group by ordertable.uniqueId; `;
  } 
  con.query(sql, (err, results) => {
    if (err) {
      return res.status(400).send({
        success: false,
        message: `server internal error!!!!`,
        error: err,
      });
    }
    results.forEach(element => {
      const ProductName = element.ProductName.split(",");
      element.ProductName = ProductName;
      const ProductPhoto = element.ProductPhoto.split(",");
      element.ProductPhoto = ProductPhoto;
      
      const ProductPrice = element.ProductPrice.split(",");
      element.ProductPrice = ProductPrice;
      const Total = element.Total.split(",");
      element.Total = Total;
    });
    return res.status(200).send({
      success: true,
      message: `Cart Detail`,
      result: results,
    });
  });
};


exports.PaymentStatus = async (req, res) => {
  // const requestData = req.body;
  let sql;
    sql = `UPDATE ${table.ordertable} SET payment_gateway="${req.body.payment_gateway}",razorpay_payment_id="${req.body.razorpay_payment_id}" WHERE uniqueId="${req.body.uniqueId}"`; 
  
  con.query(sql, (err, results) => {
    if (err) {
      return res.status(400).send({
        success: false,
        message: `Server Internal error`,
        error: err,
      });
    }
    return res.status(200).send({
      success: true,
      status: 200,
      message: "Bill detail",
      result: results,
    });
  });
};
