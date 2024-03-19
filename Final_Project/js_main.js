document.addEventListener('DOMContentLoaded', function() {

    // small array of flies for random fly generator 
    const flies = [
        { name: "Wooly Bugger", seasons: ["Summer", "Spring"], type: "Streamer", rec_size: 8, weighted: true },
        { name: "Parachute Adams", seasons: ["Spring", "Summer"], type: "Dry Fly", rec_size: 14, weighted: false },
        { name: "October Caddis", seasons: ["Fall", "Winter"], type: "Dry Fly", rec_size: 14, weighted: false },
        { name: "Zebra Midge", seasons: ["Fall", "Winter"], type: "Nymph", rec_size: 16, weighted: true },
        { name: "Sculpzilla", seasons: ["Spring", "Summer", "Winter", "Fall"], type: "Streamer", rec_size: 6, weighted: true },
        { name: "San Juan Worm", seasons: ["Spring", "Winter", "Fall"], type: "Nymph", rec_size: 12, weighted: true },
    ];

    const flyGeneratorButtons = document.querySelectorAll('.flyGeneratorBtn'); // attach event listeners to elements in generator
    const popup = document.getElementById('flyGeneratorPopup'); // ID for popup 
    const closeButton = document.querySelector('.close'); // select the close "x"
    const searchButton = document.getElementById('search_button'); // select the "generate" button

    function generate() { // function to filter flies based on user input season
        const season_input = $('#input_season').val().trim().toLowerCase(); 
        const filtered_flies = flies.filter(fly => fly.seasons.map(season => season.toLowerCase()).includes(season_input));
        
        if (filtered_flies.length > 0) { // if statement for randomly selecting one of the filtered flies
            const randomFly = filtered_flies[Math.floor(Math.random() * filtered_flies.length)];
            // format html output with fly details
            const fly_details = ` 
                <div>Name: ${randomFly.name}</div>
                <div>Type: ${randomFly.type}</div>
                <div>Most effective hook size: #${randomFly.rec_size}</div>
                <div>Weighted: ${randomFly.weighted ? 'Yes' : 'No'}</div>
            `;
            $('#search_results').hide().html(fly_details).fadeIn(1200); // input the fly specifics with fade in effect
        } else {
            $('#search_results').hide().text('You spelled it wrong!').fadeIn(1200); // show error message with fade in effect
        }
    }

    if (flyGeneratorButtons.length) { // event listeners for when button is clciked
        flyGeneratorButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                if (popup) popup.style.display = 'block'; // popup when fly generator button is clicked
            });
        });
    }

    if (closeButton) { // close popup screen when "x" in corner is clicked
        closeButton.addEventListener('click', function() {
            if (popup) popup.style.display = 'none';
        });
    }

    
    if (searchButton) { // generate random fly when button is clicked
        searchButton.addEventListener('click', generate);
    }

    
    window.addEventListener('click', function(event) { // close the generator when user clicks away from it
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    document.querySelectorAll('.learn-more-btn').forEach(button => { // event listener for "learn more" buttons on mainpage
        button.addEventListener('click', function() {
            window.location.href = 'lessons.html'; // take user to lessons.html page
        });
    });
});

