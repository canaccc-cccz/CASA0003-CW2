
mapboxgl.accessToken = 'pk.eyJ1IjoidWNmbmJrbyIsImEiOiJja29pOXB2cm4wbWs0MnZrMnNzOHV6ZnhxIn0.HWoIvH-ojLAoqTxsjdnPfw';

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/ucfnbko/ckok4ndr626xs18t4krowr90d', // stylesheet location
    center: [-0.7, 51.9], // starting position [lng, lat]
    zoom: 7.3, // starting zoom
    pitch: 30
});

function addDataLayers () {
    map.addLayer({
        id: '3dpower_stations',
        type: 'fill-extrusion',
        source: {
            type: 'vector',
            url: 'mapbox://ucfnbko.6eytoj1m' // Your Mapbox tileset Map ID
        },
        'source-layer': '3dpower_stations-925bq5', // name of tileset
        'layout': {
            'visibility': 'visible' },

        paint: {
            'fill-extrusion-color': [
                'match',
                ['get', 'type'],
                "Coal", "#ced1cc",
                "Storage", "#4e80e5",
                "Solar", "#ffc83e",
                "Nuclear", "#dd54b6",
                "Oil", "#a45edb",
                "Hydro", "#43cfef",
                "Wave & Tidal", "#ff8767",
                "Wind", "#00a98e",
                "Biomass", "#A7B734",
                "Waste", "#ea545c",
                "Gas", "#cc9b7a",
                /* other */ '#ccc'
            ],
            'fill-extrusion-height': [
                "interpolate",
                ["linear"],
                ["get", "capacity"],
                0,
                0,
                3870,
                90000
            ], //expression that controls the extrusion height based on employment attribute Emp2011
            'fill-extrusion-opacity': [
                "interpolate",
                ["linear"],
                ["zoom"],
                6,
                1,
                10,
                0.4
            ],
            'fill-extrusion-opacity-transition': { //Opacity transition adds a delay when changing the opacity for a smooth layer change effect
                duration: 1000,
                delay: 0 }
        } });
}

// different filters to avoid interference
var filterStartYear2 = ['<=', ['number', ['get', 'yearStart']], 2018];
var filterEndYear2 = ['>=', ['number', ['get', 'yearEnd']], 2018];
var filterType2 = ['!=', ['string', ['get','type']], 'placeholder'];

var getYear = {
    2007: "2007",
    2008: "2008",
    2009: "2009",
    2010: "2010",
    2011: "2011",
    2012: "2012",
    2013: "2013",
    2014: "2014",
    2015: "2015",
    2016: "2016",
    2017: "2017",
    2018: "2018",
    2019: "future"
}

var categories = ["Coal",
    "Storage",
    "Solar",
    "Nuclear",
    "Oil",
    "Hydro",
    "Wave & Tidal",
    "Wind",
    "Biomass",
    "Waste",
    "Gas", ];
var colors = [ "#ced1cc",
    "#4e80e5",
    "#ffc83e",
    "#dd54b6",
    "#a45edb",
    "#43cfef",
    "#ff8767",
    "#00a98e",
    "#A7B734",
    "#ea545c",
    "#cc9b7a",]

var cat = {
    2008: {
        "Coal": 34.067,
        "Storage": 3.482,
        "Solar": 0.001,
        "Nuclear": 10.720,
        "Oil": 6.128,
        "Hydro": 1.768,
        "Wave & Tidal": 2.697,
        "Wind": 3.909,
        "Biomass": 0.296,
        "Waste": 1.669,
        "Gas": 35.265
    },
    2009: {
        "Coal": 33.725,
        "Storage": 3.447,
        "Solar": 0.029,
        "Nuclear": 10.613,
        "Oil": 5.371,
        "Hydro": 1.750,
        "Wave & Tidal": 2.670,
        "Wind": 4.722,
        "Biomass": 0.304,
        "Waste": 1.740,
        "Gas": 35.629
    },
    2010: {
        "Coal": 32.974,
        "Storage": 3.371,
        "Solar": 0.099,
        "Nuclear": 10.376,
        "Oil": 5.337,
        "Hydro": 1.720,
        "Wave & Tidal": 2.610,
        "Wind": 5.660,
        "Biomass": 0.335,
        "Waste": 1.846,
        "Gas": 35.671
    },
    2011: {
        "Coal": 28.871,
        "Storage": 3.282,
        "Solar": 1.017,
        "Nuclear": 10.104,
        "Oil": 4.770,
        "Hydro": 1.707,
        "Wave & Tidal": 3.558,
        "Wind": 6.706,
        "Biomass": 1.183,
        "Waste": 1.971,
        "Gas": 36.885
    },
    2012: {
        "Coal": 26.215,
        "Storage": 3.206,
        "Solar": 1.742,
        "Nuclear": 9.116,
        "Oil": 3.304,
        "Hydro": 1.681,
        "Wave & Tidal": 3.972,
        "Wind": 8.967,
        "Biomass": 1.158,
        "Waste": 1.985,
        "Gas": 38.604
    },
    2013: {
        "Coal": 21.509,
        "Storage": 3.348,
        "Solar": 3.042,
        "Nuclear": 11.709,
        "Oil": 2.022,
        "Hydro": 1.770,
        "Wave & Tidal": 4.144,
        "Wind": 11.687,
        "Biomass": 2.025,
        "Waste": 2.144,
        "Gas": 36.598
    },
    2014: {
        "Coal": 18.151,
        "Storage": 3.289,
        "Solar": 5.600,
        "Nuclear": 12.530,
        "Oil": 1.882,
        "Hydro": 1.752,
        "Wave & Tidal": 4.052,
        "Wind": 13.243,
        "Biomass": 2.287,
        "Waste": 2.352,
        "Gas": 34.862
    },
    2015: {
        "Coal": 14.162,
        "Storage": 3.266,
        "Solar": 9.656,
        "Nuclear": 11.969,
        "Oil": 0.515,
        "Hydro": 1.787,
        "Wave & Tidal": 4.023,
        "Wind": 14.387,
        "Biomass": 2.619,
        "Waste": 2.684,
        "Gas": 34.931
    },
    2016: {
        "Coal": 12.821,
        "Storage": 3.163,
        "Solar": 11.501,
        "Nuclear":11.611,
        "Oil": 0.425,
        "Hydro": 1.773,
        "Wave & Tidal": 3.862,
        "Wind": 14.616,
        "Biomass": 2.754,
        "Waste": 2.802,
        "Gas": 34.673
    },
    2017: {
        "Coal": 10.177,
        "Storage": 3.205,
        "Solar": 11.613,
        "Nuclear":15.509,
        "Oil": 0.388,
        "Hydro": 1.704,
        "Wave & Tidal": 3.636,
        "Wind":15.985,
        "Biomass": 2.777,
        "Waste": 2.719,
        "Gas": 34.287
    },
    2018: {
        "Coal": 8.044,
        "Storage": 3.769,
        "Solar": 11.633,
        "Nuclear":15.314,
        "Oil": 0.379,
        "Hydro": 1.669,
        "Wave & Tidal": 3.553,
        "Wind":16.311,
        "Biomass": 4.172,
        "Waste": 2.654,
        "Gas": 32.502
    },
    2019: {
        "Coal": 0.001,
        "Storage": 2.747,
        "Solar": 19.57,
        "Nuclear":20.796,
        "Oil": 0.263,
        "Hydro": 1.046,
        "Wave & Tidal": 2.016,
        "Wind":21.401,
        "Biomass": 8.137,
        "Waste": 1.839,
        "Gas": 20.213
    },
}


map.on('load', function() {

    var cate_count = [];
    for (var x in categories) {
        cate_count.push(cat[2018][categories[x]])
    };
    barchartplotter('total_bar',cate_count,'% in 2018');


    // update hour filter when the slider is dragged
    document.getElementById('slider').addEventListener('input', function(e) {
        var year = parseInt(e.target.value);

        // the total count barchart
        var cate_count = [];
        for (var x in categories) {
            cate_count.push(cat[year][categories[x]])
        };
        barchartplotter('total_bar',cate_count,'% in '+getYear[year]);

        // update the map
        filterStartYear2 = ['<=', ['number', ['get', 'yearStart']], year];
        filterEndYear2 = ['>=', ['number', ['get', 'yearEnd']], year];
        map.setFilter('3dpower_stations', ['all', filterStartYear2, filterEndYear2, filterType2]); //the filter only applies to the powerplants layer

        // update text in the UI
        document.getElementById('active-hour').innerText = getYear[year];
    });

    addDataLayers();



    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    let coordinates;
    let name;
    let capacity;
    let type;
    let open;

    map.on('mouseover', '3dpower_stations', function(e) {

        coordinates = e.features[0].geometry.coordinates[0][0];
        name = e.features[0].properties.site;
        capacity = e.features[0].properties.capacity;
        type = e.features[0].properties.type;
        open = e.features[0].properties.yearOpen;
        close = e.features[0].properties.yearEnd;
        lowCarbon = e.features[0].properties.lowCarbon;

        // Populate the popup and set its coordinates
        // based on the feature found.


        popup.setLngLat(coordinates)
            .setHTML("<h3>" + name + "</h3>Capacity: "  + capacity + "MW<br />Type: " + type + '<br />Year open: ' + open +
                '<br />Year close: ' + close + '<br />Low carbon: ' + lowCarbon + '<br />')
            .addTo(map);
    });

    map.on('mouseenter', '3dpower_stations', function() {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', '3dpower_stations', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });






});

/* Storyline buttons to make interaction easier, d3 used */
var pageNum = 1;
var backButton = d3.select("#story-back");
var forwardButton = d3.select("#story-forward");
var pageNumbers = d3.select("#storymode-controls-numbers");
var storyHeader = d3.select("#storymode-header");
var storyContent = d3.select("#storymode-content h9");

/* STORY PAGES */
var stories = [
    { title: "UK energy map",
        description: "The map shows UK energy supply transformation in electricity sector during 2008 to 2018. Points represent power stations generating electricity with height representing Capacity in MegaWatt(MW) of power stations. Drag the slider to explore how the UK's energy supply in electricity has changed.",
        // change starting position also on filter of map!!!!
        index: 0,

        flyTo1: {
            center: [-0.7, 51.9], // starting position [lng, lat]
            zoom: 7.3, // starting zoom
            pitch: 30,

            speed: 0.3
        },

    },

    { title: "Coal supply",
        description: "Large coal-fired power stations mostly gathered near Sheffield. From 2008 to 2018, a great number of stations have been shut down due to energy transition policies. Coal’s supply of the electricity mix shrinks from nearly 40% in 2008 to 8% in 2018.",
        // change starting position also on filter of map!!!!
        index: 0,
        flyTo1: {
            center: [-1.26, 53.4],
            zoom: 8.5,
            bearing: 0,
            pitch: 50,
            speed: 0.3
        },

    },

    { title: "Gas supply",
        description: "Although there exists slight decrease in the proportion of gas usage in power sector, gas has always been one of the most important energy type during 2008 to 2018. A 2.2GW site at Pembroke on the coast of south Wales has been built in 2012.",
        index: 312,

        flyTo1: {
            zoom: 8.3,
            center: [-5, 52],
            pitch: 50,
            speed: 0.3
        },

    },

    { title: "Oil supply",
        description: "Several large oil-fired power stations were located near London, but most of them have been closed before 2015.",
        index: 312,

        flyTo1: {
            zoom: 8.5,
            center: [0.24, 51.72],
            pitch: 50,
            speed: 0.3
        },

    },

    { title: "Solar energy",
        description: "Solar energy supply for electricity has been developed recently. More and more solar rooftops have been constructed around the uk. In April 2016, country’s solar panels generate more electricity than coal, which is a milestone for renewable energy transition.",
        index: 312,

        flyTo1: {
            zoom: 7.5,
            center: [-1, 51.9],
            pitch: 50,
            speed: 0.3
        }

    },

    { title: "Windfarm",
        description: "Windfarm have been developed rapidly from 2008 to 2018. Offshore windfarms have been constructed near London. Onshore windfarms have been constructed near Glasgow after 2010.",
        index: 312,

        flyTo1: {
            zoom: 7.5,
            center: [-4.05, 54.22],
            bearing: 0,
            pitch: 50,
            speed: 0.3
        }
    }
];

/* STORY FUNCTIONS */

// Update Story.
function updateStory(storyObj) {
    // story variables
    var title = storyObj['title'];
    var description = storyObj['description'];
    var cameraSettings = storyObj['flyTo1'];

    // Update the Storymode content.
    storyHeader.text(title);
    storyContent.text(description);

    // Update Camera.
    map.flyTo(cameraSettings);

};

/* CALL TO STORY */

// Story mode click through FORWARD.
backButton.on("click", function () {
    // Update the Navigation bottom panel.
    pageNum = pageNum - 1;
    pageNumbers.text(pageNum + " of " + stories.length);
    backButton.style( "visibility", (pageNum == 1) ? "hidden" : "visible" );
    forwardButton.style( "visibility", (pageNum == stories.length) ? "hidden" : "visible" );

    // Update the story.
    updateStory(stories[pageNum-1]);
});

// Story mode click through BACKWARD.
forwardButton.on("click", function () {
    // Update the Navigation bottom panel.
    pageNum = pageNum + 1;
    pageNumbers.text(pageNum + " of " + stories.length);
    backButton.style( "visibility", (pageNum == 1) ? "hidden" : "visible" );
    forwardButton.style( "visibility", (pageNum == stories.length) ? "hidden" : "visible" );

    // Update the story.
    updateStory(stories[pageNum-1]);
});



// define function to generate barchart
function barchartplotter(id,data,label){
    new Chart(document.getElementById(id), {
        type: 'horizontalBar',
        data: {
            labels: categories,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: colors,
            }]
        },
        options: {
            events: ['click'],
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });
};


// control the open and close of side collapsibles
function openStat() {
    document.getElementById("statPanel").style.width = "500px";
}
function closeStat() {
    document.getElementById("statPanel").style.width = "0";
}