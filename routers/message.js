const express = require("express");
const hubs = require("../hubs/hubs-model")

const router = express.Router({
    mergeParams: true,
});

router.get("/", (req, res) => {
    // res.end()
    hubs
        .findHubMessages(req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(error =>{
            res.status(500).json({ message: "Could not get hub messages" })
        })
})

router.get("/:messageId", (req, res) => {
    hubs
        .findHubMessageById(req.params.id, req.params.messageId)
        .then(data => {
            if (data){
                res.json(data)
            }else{
                res.status(404).json({ message: "Message was not found"})
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Could not get hub message" })
        })
})

router.post("/", (req, res) => {
    const body = {
        sender: req.body.sender,
        text: req.body.text,
    }
    if(!req.body.sender || !req.body.text) {
        return res.status(400).json({ message: "Need sender and text"})
    }
    hubs
        .addHubMessage(req.params.id, body)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => {
            res.status(500).json({ message: "Could not create hub message" })
        })
})

module.exports = router;