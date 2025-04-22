import utils from "../../helpers/cloudinary.js";

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await utils.handleImageUploadUtils(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(`Error in image Upload ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default handleImageUpload;
