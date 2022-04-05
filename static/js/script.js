document.querySelectorAll('#schedule_table td').forEach(function (element) {
    element.addEventListener('click', function (event) {
        if (event.target.style.backgroundColor === 'red') {
            event.target.style.backgroundColor = 'white';
            event.target.style.color = 'black';
        } else {
            event.target.style.backgroundColor = 'red';
            event.target.style.color = 'white';
        }
    });
});

document.getElementById('add_event').addEventListener('click', function (event) {
    console.log('event added');
    console.log(document.getElementById('day_selection').value);
    console.log(document.getElementById('hour_selection').value);
    console.log(document.getElementById('hour_selection').value + document.getElementById('day_selection').value);
    let cell_id = document.getElementById('hour_selection').value + document.getElementById('day_selection').value;
    let cell = document.getElementById(cell_id);
    let text_input = document.getElementById('custom_event_text');
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    cell.style.backgroundColor = '#' + randomColor;
    cell.innerText = text_input.value;

});
// <i data-feather="x-circle" class="float-end"></i>


document.getElementById('add_poem').addEventListener('click', async function (event) {
    let cell_id = document.getElementById('hour_selection').value + document.getElementById('day_selection').value;
    let cell = document.getElementById(cell_id);
    fetch('https://poetrydb.org/author/Emily Dickinson/title')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let text_input = 'Read ' + data[Math.floor(Math.random() * 360)].title + '!';
            console.log(text_input);
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            cell.style.backgroundColor = '#' + randomColor;
            cell.innerText = text_input;
        });
});

document.getElementById('add_activity').addEventListener('click', async function (event) {
    let cell_id = document.getElementById('hour_selection').value + document.getElementById('day_selection').value;
    let cell = document.getElementById(cell_id);
    fetch('https://www.boredapi.com/api/activity/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let text_input = 'Do ' + data.activity + '!';
            console.log(text_input);
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            cell.style.backgroundColor = '#' + randomColor;
            cell.innerText = text_input;
        });
});

document.getElementById('add_seat_geek_event').addEventListener('click', async function (event) {
    let cell_id = document.getElementById('hour_selection').value + document.getElementById('day_selection').value;
    let cell = document.getElementById(cell_id);
    fetch('https://api.seatgeek.com/2/events?client_id=MjY0MTg3NDJ8MTY0OTEwMjkyNy4wMjY0NjQy')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            index = Math.floor(Math.random() * 10);
            let text_input = data.events[index].type + ' at ' + data.events[index].venue.name + '!';
            console.log(text_input);
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            cell.style.backgroundColor = '#' + randomColor;
            cell.innerText = text_input;
        });
});

// console.log(document.getElementById('11').innerText == '');

// Export functions
function createPDF() {
    var sTable = document.getElementById('schedule_table').innerHTML;

    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write('<title>Profile</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');

    win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    win.print();    // PRINT THE CONTENTS.
}
