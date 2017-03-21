$('#send').click(function(e){
  e.preventDefault()
  $.post('/users', {
    phone: $('#phone').val()
  })
  .then(function(data){
    window.location = '/econtacts.html'
  })
  .catch(function(err){
    console.log(err)
  })
})
