$(document).ready(function() {
  $.get('/isloggedin')
  .then(function(data){
    console.log(data)
})


});
