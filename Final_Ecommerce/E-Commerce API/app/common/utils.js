const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const fs = require("fs");
var myUtils = require("./utils");
require("./constants");

exports.cryptPassword = function (password) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

exports.comparePassword = async function (plainPass, hashword, user) {
  const match = await bcrypt.compare(plainPass, hashword);
  if (match) {
    return await generateJWTtoken(user);
  } else {
    return false;
  }
};
async function generateJWTtoken(user) {
  var token = jwt.sign(
    user,
    "my-32-character-ultra-secure-and-ultra-long-secret"
  );
  return token;
}

exports.check_request_params = function (
  request_data_body,
  params_array,
  response
) {
  var missing_param = "";
  var is_missing = false;
  var invalid_param = "";
  var is_invalid_param = false;

  params_array.forEach(function (param) {
    if (request_data_body[param.name] == undefined) {
      missing_param = param.name;
      is_missing = true;
    } else {
      if (param.type && typeof request_data_body[param.name] !== param.type) {
        is_invalid_param = true;
        invalid_param = param.name;
      }
    }
  });
  if (is_missing) {
    console.log("missing_param: " + missing_param);
    response({
      success: false,
      error_code: "ERROR_CODE.PARAMETER_MISSING",
      error_description: missing_param + " parameter missing",
    });
  } else if (is_invalid_param) {
    console.log("invalid_param: " + invalid_param);
    response({
      success: false,
      error_code: "ERROR_CODE.PARAMETER_INVALID",
      error_description: invalid_param + " parameter invalid",
    });
  } else {
    response({ success: true });
  }
};

exports.getStoreImageFolderPath = function (id) {
  return myUtils.getImageFolderName(id);
};

exports.getImageFolderName = function (id) {
  switch (id) {
    case FOLDER_NAME.USER_PROFILES:
      return "user_profiles/";
    default:
      break;
  }
};
exports.getSaveImageFolderPath = function (id) {
  if (setting_detail.is_use_aws_bucket) {
    return myUtils.getImageFolderName(id);
  } else {
    return "./uploads/" + myUtils.getImageFolderName(id);
  }
};
exports.getSaveImageFolderPathForLogo = function (id) {
  return "./uploads/" + myUtils.getImageFolderName(id);
};
exports.storeImageToFolder = function (local_image_path, image_name, id) {
  var bf = new Buffer(100000);
  // var bf = Buffer.alloc(100000);

  var file_new_path = myUtils.getSaveImageFolderPathForLogo(id) + image_name;

  fs.readFile(local_image_path, function (error, data) {
    console.log("Read file : " + error);
    fs.writeFile(file_new_path, data, "binary", function (error) {
      if (error) {
        console.log("Save file : " + error);
      } else {
        console.log("File uploaded successfully");
      }
    });
  });
};
