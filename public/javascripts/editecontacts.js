var num
$.get('/users/myid')
.then(function(data){
  console.log(data)
   num = data[0].id
function getContacts(){
$.get('/users/econtactbyuser/' +num)
.then(function(data){
  console.log(data)
  $('#contacts').empty()
  data.forEach(function(el){
    var $newcontact = $('<li>')
    $newcontact.append('<p>Name: '+el.firstname+' '+el.lastname+'</p><p>E-mail: '+el.email+'</p><p>Phone Number: '+el.phone+'</p><button class="edit">Edit</button>')
    $newcontact.attr('id', el.id)
    $('#contacts').append($newcontact.clone())
  })
  $('.edit').click(function(e){
    var editId = $(e.target).parent().attr('id')
    $.get('/users/econtacts/'+editId)
    .then(function(data){
      var econtact = data[0]
      $(e.target).parent().empty()
      $('#'+editId).append('<p>First Name: <input id="editFirst"</input></p><p>Last Name: <input id="editLast"></input></p><p>Phone Number: <input type="number" id="editPhone"></input></p><p>E-mail: <input id="editEmail"></input></p><button class="doneEdit">Done Editing</button>')
      $('#editFirst').val(econtact.firstname)
      $('#editLast').val(econtact.lastname)
      $('#editPhone').val(econtact.phone)
      $('#editEmail').val(econtact.email)
      $('.doneEdit').click(function(e){
        $.ajax({
          method: 'PATCH',
          url: 'users/updatecontact/' +editId,
          data: {
            firstname: $('#editFirst').val(),
            lastname: $('#editLast').val(),
            phone: $('#editPhone').val(),
            email: $('#editEmail').val()
          }})
          .done(function (data){
            console.log(data)
            getContacts()
          })
        })
      })
    })
  })
}
getContacts()
})
