var num
$.get('/users/myid')
.then(function(data){
  console.log(data)
   num = data[0].id

$.get('/users/econtactbyuser/' +num)
.then(function(data){
  console.log(data)
  data.forEach(function(el){
    var $newcontact = $('<li>')
    $newcontact.append('<p>Name: '+el.firstname+' '+el.lastname+'</p><p>E-mail: '+el.email+'</p><p>Phone Number: '+el.phone+'</p>')
    $newcontact.attr('id', el.id)
    $('#contacts').append($newcontact.clone())
  })
})
})
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
      })
      .catch(function(err){
        window.location = '/addphone.html'
      })
    }
})
})
