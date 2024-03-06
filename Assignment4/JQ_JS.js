// array with fly attributes for filtering, will simplify in the future
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

$(document).ready(function() { //ensures html is loaded before executing
    $("#casting_tips_container").accordion({ //initializes accordion from jquery library
        collapsible: true, //accordion container should be collapsible 
        heightStyle: "content", //adjusts size of accordion to amount of text
        active: false //makes sure container is closed until clicked 
    });

    $("#search_button").click(function display_fly() { //intializes click for the search button
        const season_input = $("#input_season").val().trim().toLowerCase(); //changes input to lowercase and removes whitespace
        const filtered_flies = flies.filter(fly => fly.seasons.map(season => season.toLowerCase()).includes(season_input)); //filters

        //if loop to check if user input matches fly options
        if (filtered_flies.length > 0) {
            const random_fly = filtered_flies[Math.floor(Math.random() * filtered_flies.length)]; //randomly chooses fly
            const fly_details = `
                <div>Name: ${random_fly.name}</div>
                <div>Type: ${random_fly.type}</div>
                <div>Most effective hook size: #${random_fly.rec_size}</div>
                <div>Weighted: ${random_fly.weighted ? 'Yes' : 'No'}</div>
            `;

            $("#search_results").html(fly_details).hide().fadeIn(1200); //jquery fade in for fly information box

            let casting_tips = ""; //empty string for casting tips, fills in information depending on random fly
            switch (random_fly.type) {
                case "Streamer":
                    casting_tips = `
                        <ul>
                             <li>Cast upstream and allow the streamer to drift until perpendicular</li>
                             <li>Strip in line and different speeds each cast.</li>
                             <li>Do not use too big of a streamer at first, start small.</li>
                        </ul>
                    `;
                    break;
                case "Dry Fly":
                    casting_tips = `
                        <ul>
                             <li>Start close to the bank and cast 5ft further each cast.</li>
                             <li>Focus on light cast to not spook fish under the surface.</li>
                             <li>Give fish the time to bite, don't set your hook to early.</li>
                        </ul>
                    `;
                    break;
                case "Nymph":
                    casting_tips = `
                        <ul>
                            <li>Cast upstream and allow the nymph to drift downstream with the current.</li>
                            <li>Start small and increase the size as needed.</li>
                            <li>Study the banks to find insect hatches and larva.</li>
                        </ul>
                    `;
                    break;
            }

            $("#casting_tips").html(casting_tips); //changes div to respective casting tips
            $("#casting_tips_container").accordion("refresh");
        } else {
            $("#search_results").html("Check your spelling please!").hide().fadeIn(1200); //error message with jquery fade 
            $("#casting_tips").html("");
        }
    });
});