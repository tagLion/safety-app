var num
$.get('users/myid')
.then(function(data){
  console.log(data)
   num = data[0].id
})



$('#send').click(function(e){
  e.preventDefault()
  var econtobj = {
    user_id: num,
    firstname: $('#fn').val(),
    lastname: $('#ln').val(),
    phone: $('#phone').val(),
    email: $('#email').val()
  }
  $.post('users/newecontact', econtobj)
  .then(function(data){
    console.log(data)

  })
})
