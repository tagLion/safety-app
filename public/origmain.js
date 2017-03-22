<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>GetMeSafe Main Page</title>
    <script
      src="https://code.jquery.com/jquery-3.2.1.js"
      ></script>

      <style>
        #map {
            height: 400px;
            width: 100%;
            background-color: grey;
            }
      </style>

  </head>

  <body>
    <button type="button" id="safe-button">I AM SAFE</button>
    <button type="button" id="abort-button">ABORT</button>
    <h1>Google Maps And Places Page</h1>

    <div id="map"></div>

<div id = "bottom-panel"></div>
    <script>
    var map
    var num = 1
    var int
    var start
    var directionsDisplay = null
    var pos
    var incidentid
    var myLocation
    var nearestSafeSpaceCoords
    function calculateAndDisplayRoute(directionsService, directionsDisplay, myLocation, nearestSafeSpaceCoords) {

      directionsService.route({
        origin: myLocation,
        destination: nearestSafeSpaceCoords,
        travelMode: google.maps.TravelMode.WALKING
      }, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          $('#bottom-panel').empty()
          console.log('emptied')
          directionsDisplay.setDirections(response);
          directionsDisplay.setPanel(document.getElementById('bottom-panel'))
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
      }
      function initMap2() {

	var myCurrentLat = pos.lat;
  var myCurrentLng = pos.lng;
  //use current location from main.html
  myLocation = {
    lat: myCurrentLat,
    lng: myCurrentLng
  }
  //get nearest location using https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=39.670203,-104.864231&opennow&rankby=distance&key=PUTINBILLSKEYHERE!!!!!!!!!!!!!!!!!
  // use the lat lng from the first object in the results array


  var myOptions = {
      zoom: 7,
      center: myLocation
    },
    map = new google.maps.Map(document.getElementById('map'), myOptions),
    // Instantiate a directions service.
    directionsService = new google.maps.DirectionsService,
    directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
    }),
    //    markerA = new google.maps.Marker({
    //    position: myLocation,
    //  title: "Your Location",
    //label: "You",
    //map: map
    // }),
    markerB = new google.maps.Marker({
      position: nearestSafeSpaceCoords,
      title: "Your Safe Place",
      label: "Safe Place",
      map: map
    });

  // get route from myLocation to nearestSafeSpaceCoords
  calculateAndDisplayRoute(directionsService, directionsDisplay, myLocation, nearestSafeSpaceCoords);

}
function getpos (){


navigator.geolocation.getCurrentPosition(function(position) {
  pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }
  myLocation = {
    lat: pos.lat,
    lng: pos.lng
  }
  console.log(pos)
  $.post('/incidents/coordinates', {LAT: pos.lat, LONG: pos.lng, incident_id: incidentid, user_id: num} )
  .done(function(data){
    console.log('location POST')
  })
  var request = {
location: pos,
openNow: true,
rankBy: google.maps.places.RankBy.DISTANCE,
types: ['accounting',
'airport',
'amusement_park',
'aquarium',
'art_gallery',
'bakery',
'bank',
'bar',
'beauty_salon',
'bicycle_store',
'book_store',
'bowling_alley',
'bus_station',
'cafe',
'car_dealer',
'car_rental',
'car_repair',
'car_wash',
'casino',
'church',
'city_hall',
'clothing_store',
'convenience_store',
'courthouse',
'dentist',
'department_store',
'doctor',
'electrician',
'electronics_store',
'embassy',
'establishment',
'finance',
'fire_station',
'florist',
'food',
'funeral_home',
'furniture_store',
'gas_station',
'grocery_or_supermarket',
'gym',
'hair_care',
'hardware_store',
'health',
'hindu_temple',
'home_goods_store',
'hospital',
'insurance_agency',
'jewelry_store',
'laundry',
'lawyer',
'library',
'liquor_store',
'local_government_office',
'locksmith',
'lodging',
'meal_delivery',
'meal_takeaway',
'mosque',
'movie_rental',
'movie_theater',
'moving_company',
'museum',
'night_club',
'painter',
'pet_store',
'pharmacy',
'physiotherapist',
'place_of_worship',
'plumber',
'police',
'post_office',
'real_estate_agency',
'restaurant',
'roofing_contractor',
'rv_park',
'school',
'shoe_store',
'shopping_mall',
'spa',
'stadium',
'storage',
'store',
'subway_station',
'synagogue',
'taxi_stand',
'train_station',
'transit_station',
'travel_agency',
'university',
'veterinary_care',
'zoo']
};

service = new google.maps.places.PlacesService(map);
service.nearbySearch(request, callback);


function callback(results, status) {
if (status == google.maps.places.PlacesServiceStatus.OK) {
console.log(results)
nearestSafeSpaceCoords = results[0].geometry.location
markerB = new google.maps.Marker({
position: nearestSafeSpaceCoords,
title: results[0].name,
label: results[0].name,
map: map
})
}
directionsService = new google.maps.DirectionsService
if (directionsDisplay !== null){directionsDisplay.setMap(null)}
directionsDisplay = new google.maps.DirectionsRenderer({
  map: map
}),
//    markerA = new google.maps.Marker({
//    position: myLocation,
//  title: "Your Location",
//label: "You",
//map: map
// }),

// get route from myLocation to nearestSafeSpaceCoords
calculateAndDisplayRoute(directionsService, directionsDisplay, myLocation, nearestSafeSpaceCoords);
}
if ( start == undefined){
  $.ajax({
    method: 'PATCH',
    url: '/incidents/'+ incidentid,
    data: {
      start_LAT: pos.lat,
      start_LONG: pos.lng,
      is_incident: true
    }
  })
  .done(function(data){
    console.log('POSTed initial coordinates')
    start = true
    // $('#bottom-panel').empty()
    // initMap2()
  })
}
})
}
//     $.ajax({
//     type: 'GET',
//     url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + pos.lat + ','+ pos.lng + '&opennow&rankby=distance&key=AIzaSyDWswS_LVzU1y8k-zYxee3zijchYq6b3fM',
//     async: false,
//     jsonpCallback: 'jsonCallback',
//     contentType: "application/json",
//     dataType: 'jsonp',
//     success: function (json) {
//         console.dir(json.sites);
//     },
//     error: function (e) {
//         console.log(e.message);
//
//     }
// });
//           $.getJSON()
//           .done(function(data){
//             console.log(data)
//             var targetLocation = data['results'][0]['geometry']['location']
// console.log(targetLocation)



// Try HTML5 geolocation.


      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 39.397, lng: -104.644},
          zoom: 6
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

          $.get('/users/myid')
        	.then(function(data){
        	  console.log(data)
            if (data.length > 0){
        	   num = data[0].id}
          $.post('/incidents', {user_id: num})
          .then(function(data){
            console.log(data)
            incidentid = data[0].id
            console.log('incident posted')
              getpos()
              int = setInterval(function(){getpos()}, 20000)
              console.log(pos)

        })
        })
    $('#safe-button').click(function(e){
      clearInterval(int)
      $.ajax({
        method: 'PATCH',
        url: '/incidents/'+incidentid,
        data: {
          end_LAT: pos.lat,
          end_LONG: pos.lng,
          is_incident: true
        }
      })
      .done(function(data){
        console.log('you are safe')
      })
    })
    $('#abort-button').click(function(e){
      clearInterval(int)
      $.ajax({
        method: 'PATCH',
        url: '/incidents/'+incidentid,
        data: {
          end_LAT: pos.lat,
          end_LONG: pos.long,
          is_incident: false
        }
      })
      .done(function(data){
        console.log('you aborted')
      })
    })

  }
    </script>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDWswS_LVzU1y8k-zYxee3zijchYq6b3fM&libraries=places&callback=initMap"></script>
    <script src="./javascripts/main.js"></script>
  </body>
</html>
