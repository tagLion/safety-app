$(document).ready(function(){
  $.get('/isloggedin')
  .then(function(data){
    console.log(data)
    if (data != false){
      $.get('users/myid')
      .then(function(data){
        console.log(data)
        if (data.length < 1){
          window.location = '/addphone.html'
        }
      })
      .catch(function(err){
        window.location = '/addphone.html'
      })
    }
})
})
