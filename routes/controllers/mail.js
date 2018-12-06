const express = require('express');
const router = express.Router();

let MailjetClient = require('node-mailjet');

router.post('/', function (req, res) {

    let mailjet = MailjetClient.connect(
        process.env.MJ_APIKEY_PUBLIC || 'f1247339a73850e153d6aca37610db8d',
        process.env.MJ_APIKEY_PRIVATE || '1726bd7b8f71ad63bbc08b91251c90b9'
        ),
        data = {
            "Messages": [
                {
                    "FromEmail": "no-reply@nectarbeverages.co.nz",
                    "FromName": "Nectar Order: " + req.body.name,
                    "Subject": req.body.subject,
                    "Html-part": "<h3>Order: </h3>" +
                    "<p>From: " + req.body.name + "</p>" +
                    "<p>Email: " + req.body.email + "</p>" +
                    "<p>Email: " + req.body.phone + "</p>" +
                    "<p>Subject: " + req.body.subject + "</p>",
                    "Recipients": [{"Email": "support@nectarbeverages.co.nz"}]
                },
                {
                    "FromEmail": "no-reply@nectarbeverages.co.nz",
                    "FromName": "Nectar",
                    "Recipients": [{"Email": req.body.email}],
                    "MJ-TemplateID": 409828,
                    "MJ-TemplateLanguage": true,
                    "Subject": req.body.subject,
                    "Vars": {
                        "firstname": req.body.name,
                        "order": req.body.subject
                    }
                }
            ]
        };

    console.log(req.body);
    let request = mailjet.post('send').request(data);

    request
        .then(function (response, body) {
            console.log('Email Sent!: ' + JSON.stringify(response));
            return res.send(JSON.stringify(response))
            /*
            Needs JSON
             */
        })

        .catch(function (err, e) {
            console.log('Email Failed!: ' + err + ' ' + e);
            res.send(JSON.stringify(response));
            return next(err);
        });
});

module.exports = router;