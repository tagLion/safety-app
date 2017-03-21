$('#send').click(function(e){
  e.preventDefault()
  $.post('/users', {
    phone: $('#phone').val()
  })
  .then(function(data){
    window.location = '/edit-profile-page.html'
  })
  .catch(function(err){
    console.log(err)
  })
})
