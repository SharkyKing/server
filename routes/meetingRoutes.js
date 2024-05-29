const express = require('express');
const router = express.Router();
const { Meeting, MeetingState, User } = require('../models');

router.get("/:email/state/:stateId", async (req, res) => {
    const email = req.params.email;
    const stateId = req.params.stateId;
    try {
        const user = await User.findOne({ where: { Email: email } });
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        const meetings = await Meeting.findAll({ where: { PersonID: user.id, MeetingStateId: stateId } });
        if (!meetings.length) {
            return res.status(404).send({ error: "No meetings found for this specialist and state" });
        }
        res.status(200).send({ data: "Meetings found", meetings });
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
            PersonID:specialist,
            MeetingStateId:1
        });

        res.status(200).send({ data: "Meeting created", meeting: newMeeting });
    } catch (error) {
        console.error("Error creating meeting:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

module.exports = router;
