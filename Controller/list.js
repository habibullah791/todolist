import _ from "lodash";

// Importing Models from the Models 
import { Item, List } from "../Models/list.js";

// Make 3 item by using Item model
const item1 = new Item({
    item: "Welcome TO Your ToDoList"
});

// Array to store the three item
const defaultItems = [item1]


//  Find All from DB
export const findAll = async (req, res) => {
    try {
        Item.find({}, (err, results) => {
            if (results.length === 0) {
                Item.insertMany(defaultItems, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Added to DB");
                });
                res.redirect("/");
            }
            else {
                res.status(200).render('list', { listName: "Today", newListItem: results });
            }
        });
    } catch (error) {
        res.status(404).send("404");
    }
}


//  Add list to DB
export const addListItems = async (req, res) => {
    try {

        const itemName = req.body.newItem
        const listName = req.body.list

        const item = new Item({
            item: itemName
        });
        if (item.item === ' ') {
            console.log("yelo");
            // res.redirect("/" + listName);
        }
        else {
            if (listName === "Today") {
                item.save();
                res.status(200).redirect("/");
            } else {
                List.findOne({ name: listName }, (err, foundList) => {
                    foundList.items.push(item);
                    foundList.save();
                    res.status(200).redirect("/" + listName);
                });
            }
        }
    } catch (error) {
        res.status(404).send("404");
    }
}

// Delete Items from the list 
export const deleteListItems = async (req, res) => {
    try {
        const checkItemID = req.body.checkBox
        const listName = req.body.list

        if (listName === "Today") {
            Item.deleteOne({ _id: checkItemID }, (err) => {
                if (!err) {
                    res.status(200).redirect("/");
                }
            });
        }
        else {
            List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkItemID } } }, (err, foundList) => {
                if (!err) {
                    res.status(200).redirect("/" + listName);
                }
            });
        }
    } catch (error) {
        res.status(404).send("404");
    }
}


// custom List 
export const customListName = async (req, res) => {
    try {

        const customListName = _.capitalize(req.params.customListName);

        List.findOne({ name: customListName }, (err, founded) => {
            if (!err) {
                if (!founded) {
                    const list = List({
                        name: customListName,
                        items: defaultItems
                    });
                    list.save()
                    res.status(200).redirect("/" + customListName)
                }
                else {
                    res.status(200).render("list", { listName: founded.name, newListItem: founded.items });
                }
            }

        });
    } catch (error) {
        res.status(404).send("404");
    }
}