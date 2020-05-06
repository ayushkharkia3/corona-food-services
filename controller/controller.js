const Organisation = require('../modal/modal');
const firebase = require("firebase-admin");
const db = firebase.database();

exports.getIndex = (req, res, next) => {
    res.render('index', {
        filled: false
    });
}

exports.postIndex = (req, res, next) => {
    let date = req.body.date;
    date = date.substring(8) + '-' + date.substring(5, 7) + '-' + date.substring(0, 4);
    const ref = db.ref(`AreawiseData`);
    ref.once("value")
        .then(data => {
            const allData = data.val();
            if (!allData[req.body.pincode]) {
                res.render('register', {
                    date: req.body.date,
                    pincode: req.body.pincode,
                    time: req.body.time,
                    slots: 10,
                    odate: date,
                    time: req.body.time
                })
            } else if (!allData[req.body.pincode][date]) {
                res.render('register', {
                    date: req.body.date,
                    pincode: req.body.pincode,
                    time: req.body.time,
                    slots: 10,
                    odate: date,
                    time: req.body.time
                })
            } else if (!allData[req.body.pincode][date][req.body.time]) {
                res.render('register', {
                    date: req.body.date,
                    pincode: req.body.pincode,
                    time: req.body.time,
                    slots: 10,
                    odate: date,
                    time: req.body.time
                })
            } else {
                const keys = Object.keys(allData[req.body.pincode][date][req.body.time]);
                if (keys.length >= 10) {
                    res.render("index", {
                        filled: true
                    });
                } else {
                    res.render('register', {
                        date: req.body.date,
                        pincode: req.body.pincode,
                        time: req.body.time,
                        slots: 10 - keys.length,
                        odate: date,
                        time: req.body.time
                    })
                }
            }
        })
}

exports.postRegister = (req, res, next) => {
    const organisation = new Organisation(req.body.time, req.body.name, req.body.date, req.body.email, req.body.contact, req.body.units, req.body.pincode);
    organisation.save()
        .then(() => {
            res.redirect(`/${req.body.pincode}/${req.body.date}/${req.body.time}/view`);
        }).catch(err => {
            console.log(err);
        })
}

exports.getView = (req, res, next) => {
    let date = req.params.date;
    date = date.substring(8) + '-' + date.substring(5, 7) + '-' + date.substring(0, 4);
    const ref = db.ref(`AreawiseData/${req.params.pin}/${date}/${req.params.time}`)
    ref.once("value")
        .then(data => {
            const allData = data.val();
            const keys = Object.keys(allData);
            const dataArray = []
            keys.forEach(e => {
                dataArray.push(allData[e]);
            })
            res.render('cards', {
                value: dataArray,
                date: date,
                time: req.params.time
            });
        }).catch(err => {
            console.log(err);
        })
}