$(document).ready(function(){
  $.get('/isloggedin')
  .then(function(data){
    console.log(data)
    if (data != false){
      $.get('/users/myid')
      .then(function(data){
        console.log(data)
        if (data.length < 1){
          window.location = '/addphone.html'
        }
        // $.get('/friendsInDanger')
        // .then(function(data){
        //   console.log(data)
        //   alert('Friends in Danger: '+JSON.stringify(data))
        // })
        //this happens if logged in
         console.log('logged in')
         $(".login-button").hide()
      })
      .catch(function(err){
        window.location = '/addphone.html'
      })
    } else{
      //if not logged it
      console.log('not logged in')
      $(".logout-button").hide()
      $(".edit-profile-button").hide()
    }
})
})
