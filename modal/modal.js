const firebase = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://food--service.firebaseio.com"
});
const db = firebase.database();

module.exports = class Organisation {
    constructor(time, name, date, email, phone, no, pincode) {
        this.time = time;
        this.orginasitionName = name;
        this.orginasitionContactNo = phone;
        this.orginasitionEmailId = email;
        this.serviceDate = date.substring(8) + '-' + date.substring(5, 7) + '-' + date.substring(0, 4);
        this.units = no;
        this.servicePincode = pincode;
        this.addedOn = (new Date).toString();
    }
    save() {
        const ref = db.ref(`AreawiseData/${this.servicePincode}/${this.serviceDate}/${this.time}`);
        return ref.push(this);
    }
}