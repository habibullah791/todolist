import mongoose from "mongoose";

// Item Schema
const itemSchema = mongoose.Schema({
    item: {
        required: true,
        type: [String, "Name is too short"]
    }
});

// List Schema
const listSchema = mongoose.Schema({
    name: String,
    items: {
        require: true,
        type: [itemSchema]
    }
});

// model the schema and make the Item (s) Document
export const Item = mongoose.model("Item", itemSchema);

// model the schema and make the List (s) Document
export const List = mongoose.model("List", listSchema);
