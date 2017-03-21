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
        $.get('/friendsInDanger')
        .then(function(data){
          console.log(data)
          alert('Friends in Danger: '+JSON.stringify(data))
        })
      })
      .catch(function(err){
        window.location = '/addphone.html'
      })
    }
})
})
