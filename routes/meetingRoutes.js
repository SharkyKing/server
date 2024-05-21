const express = require('express');
const router = express.Router();
const { Meeting } = require('../models');

router.get("/", async (req, res) => {
    try {
        const meetings = await Meeting.findAll();
        res.send(meetings);
    } catch(error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const meeting = await Meeting.findOne({ where: { id: id } });
        if (!meeting) {
            return res.status(404).send({ error: "Meeting not found" });
        }
        res.status(200).send({ data: "Meeting found", meeting });
    } catch(error) {
        console.error("Error getting meeting:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

router.post("/", async(req, res) => {
    const { firstName, lastName, phoneNo, email, date, specialist } = req.query;
    console.log(req.query)
    try {
        const newMeeting = await Meeting.create({ 
            FirstName:firstName,
            LastName:lastName,
            Email:email,
            Phone:phoneNo,
            MeetingDate:date,
            PersonID:specialist
        });

        res.status(200).send({ data: "Meeting created", meeting: newMeeting });
    } catch (error) {
        console.error("Error creating meeting:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { FirstName, LastName, Email, Phone, MeetingDate, PersonID } = req.body;
    try {
        const meeting = await Meeting.findOne({ where: { id: id } });
        if (!meeting) {
            return res.status(404).send({ error: "Meeting not found" });
        }

        await meeting.update({
            FirstName,
            LastName,
            Email,
            Phone,
            MeetingDate,
            PersonID
        });

        res.status(200).send({ data: "Meeting updated", meeting });
    } catch (error) {
        console.error("Error updating meeting:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const meeting = await Meeting.findOne({ where: { id: id } });
        if (!meeting) {
            return res.status(404).send({ error: "Meeting not found" });
        }

        await meeting.destroy();

        res.status(200).send({ data: "Meeting deleted" });
    } catch (error) {
        console.error("Error deleting meeting:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

module.exports = router;
