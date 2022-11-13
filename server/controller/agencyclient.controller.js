const db = require('../model/index');
const { success, error, validation } = require('../helper/response');
const { agency } = require('../model/index');

const Agency = db.agency;
const Client = db.client;

exports.createAgencyClient = (req, res) => {
    const agency = new Agency({
        name: req.body.agency.name,
        addressOne: req.body.agency.addressOne,
        addressTwo: req.body.agency.addressTwo,
        state: req.body.agency.state,
        city: req.body.agency.city,
        phoneNumber: req.body.agency.phoneNumber
    })

    agency.save((err, agency) => {
        if (err) {
            return res.status(500).json(error(err, 500));
        }

        if (agency) {
            if (typeof req.body.client !== "undefined" && req.body.client !== null && req.body.client !== "" && req.body.client.length > 0) {
                req.body.client.forEach(data => {
                    const client = new Client({
                        name: data.name,
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                        totalBill: data.totalBill
                    });

                    client.save((err, client) => {
                        if (err) {
                            return res.status(500).json(error(err, 500));
                        }

                        if (data.agencyId) {
                            Agency.find({
                                name: { $in: data.agencyId }
                            }, (err, agencyId) => {
                                if (err) {
                                    return res.status(500).json(error(err, 500));
                                }
                                client.agencyId = agencyId.map(agen => agen._id);
                                client.save(err => {
                                    if (err) {
                                        return res.status(500).json(error(err, 500));
                                    }

                                    return res.status(200).json(success("Agency And Client Created Successfully!", {}, 200));
                                });
                            })
                        }
                    })

                });
            }
        }
    })
}

exports.updateClientDetail = (req, res) => {
    let clientBasedId = { _id: req.body.clientId };
    let updateValues = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        totalBill: req.body.totalBill
    };
    Client.updateOne(clientBasedId, updateValues, (err, client) => {
        if (err) {
            return res.status(500).json(error(err, 500));
        }
    });

    return res.status(200).json(success("Client Details Updated Successfully", {}, 200));

}

exports.getClientList = (req, res) => {
    Client.findOne().sort({ totalBill: -1 }).exec((err, client) => {
        if (err) {
            return res.status(500).json(error(err, 500));
        }

        Agency.find({ _id: client.agencyId }).exec((err, agency) => {
            if (err) {
                return res.status(500).json(error(err, 500));
            }

            return res.status(200).json(success("Client List", {
                clientName: client.name,
                totalBill: client.totalBill,
                agencyName: agency[0].name
            }, 200));
        });

    })
}