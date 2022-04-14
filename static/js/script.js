// import html2canvas from 'html2canvas';

feather.replace({ 'aria-hidden': 'true' })

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

// Export to PDF
document.getElementById('export_button').addEventListener('click', function (event) {
    console.log("selam");
    // send a post request with fetch api
    fetch('/export', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/HTML'
        },
        body: document.getElementById('schedule_table').outerHTML
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        });
});
