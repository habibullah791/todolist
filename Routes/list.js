import express from "express";


import {
    findAll,
    addListItems,
    deleteListItems,
    customListName
} from "../controller/list.js";

const router = express.Router();

// GET ROUTES
router.get("/", findAll);

//  POST ROUTES
router.post("/", addListItems)
router.post("/delete", deleteListItems)

// CUSTOM list GET Routes
router.get("/:customListName", customListName)




export default router;