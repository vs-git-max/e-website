import { handleImageUpload } from "../../config/cloudinary.js";

const uploadImage = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");

    const url = `data:${req.file.mimetype};base64,${b64}`;

    const result = await handleImageUpload(url);

    res.json({
      success: true,
      message: "Image uploaded",
      result,
    });
  } catch (error) {
    res.json({ success: false, message: `Some error occurred` });
  }
};

export default uploadImage;
