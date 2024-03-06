
// array with fly attributes for filtering
const flies = [
    { name: "Wooly Bugger", 
    seasons: ["Summer", "Spring"], 
    type: "Streamer", 
    rec_size: 8, 
    weighted: true },

    { name: "Parachute Adams", 
    seasons: ["Spring", "Summer"], 
    type: "Dry Fly", 
    rec_size: 14, 
    weighted: false },

    { name: "October Caddis", 
    seasons: ["Fall", "Winter"], 
    type: "Dry Fly", 
    rec_size: 14, 
    weighted: false },

    { name: "Zebra Midge", 
    seasons: ["Fall", "Winter"], 
    type: "Nymph", 
    rec_size: 16, 
    weighted: true },

    { name: "Sculpzilla", 
    seasons: ["Spring", "Summer", "Winter", "Fall"], 
    type: "Streamer", 
    rec_size: 6, 
    weighted: true },

    { name: "San Juan Worm", 
    seasons: ["Spring", "Winter", "Fall"], 
    type: "Nymph", 
    rec_size: 12, 
    weighted: true },
];

function display_fly() { // function that displays a randomized fly for the user to experiment with
    // gathers user input, removes any whitespace and converts to lowercase for consistency
    const season_input = document.getElementById("input_season").value.trim().toLowerCase();

    // finds fly in array that fits the user chosen season
    const filtered_flies = flies.filter(fly => fly.seasons.map(season => season.toLowerCase()).includes(season_input));

    // retrieves the information to display fly and casting tips
    const results_div = document.getElementById("search_results");
    const casting_div = document.getElementById("casting_tips");

    // if loop to check if a fly matches user input
    if (filtered_flies.length > 0) {
        // picks a random fly from flies that fits user input season
        const random_fly = filtered_flies[Math.floor(Math.random() * filtered_flies.length)];

        // puts together the flies specifics
        const fly_details = `Name: ${random_fly.name}<br>Type: ${random_fly.type}<br>Most effective hook size: 
        #${random_fly.rec_size}<br>Weighted: ${random_fly.isWeighted ? 'Yes' : 'No'}`;

        results_div.innerHTML = fly_details; // updates html with the flies info

        // lets the tips section be initialized for future output
        let casting_tips = "";

        // changes message based on type of fly
        switch (random_fly.type) {
            case "Streamer":
                casting_tips = "Cast 45 degrees upstream and allow the fly to drift until perpendicular";
                break;
            case "Dry Fly":
                casting_tips = "Cast close, moving 5 feet away each cast";
                break;
            case "Nymph":
                casting_tips = "Cast upstream and allow the nymph to drift downstream with the current";
                break;
        }
        casting_div.innerHTML = casting_tips;
    } else {
        results_div.innerHTML = "No flies match the season you entered. Try another season."; // display message for wrong entry
        casting_div.innerHTML = ""; //removes casting tips when no fly is being displayed
    }
}