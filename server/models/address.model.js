import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({});

const Address = mongoose.model("Address", AddressSchema);

export default Address;
