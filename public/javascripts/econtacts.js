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
