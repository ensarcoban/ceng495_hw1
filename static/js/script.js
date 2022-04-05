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

// Export functions
function createPDF() {
    var pdf = new jsPDF('p', 'pt', 'letter');
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    source = document.getElementById('schedule_table')[0];

    // we support special element handlers. Register them with jQuery-style
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors
    // (class, of compound) at this time.
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function(element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true
        }
    };
    margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, {// y coord
                'width': margins.width, // max width of content on PDF
                'elementHandlers': specialElementHandlers
            },
    function(dispose) {
        // dispose: object with X, Y of the last line add to the PDF
        //          this allow the insertion of new lines after html
        pdf.save('Test.pdf');
    }
    , margins);
}
