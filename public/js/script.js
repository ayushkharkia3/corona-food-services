document.querySelector('.view').addEventListener('click', e => {
    e.preventDefault();
});

function view() {
    const pin = document.getElementById("pincode").value;
    let date = document.getElementById("date").value;
    date = date.substring(8) + '-' + date.substring(5, 7) + '-' + date.substring(0, 4);
    const time = document.getElementById("time").value;
    console.log(pin, date, time);
    if (pin && date && time) {
        window.location.replace(`/${pin}/${date}/${time}/view`);
    }
}