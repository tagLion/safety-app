var num
$.get('users/myid')
.then(function(data){
  console.log(data)
   num = data[0].id
})



$('#send').click(function(e){
console.log('test')

  function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    function validate() {
      var email = $("#email").val();
      if (!validateEmail(email)) {
        alert("Not a valid e-mail address");
      } else {
      alert("eContact added")
      e.preventDefault()
      var econtobj = {
        firstname: $('#fn').val(),
        lastname: $('#ln').val(),
        phone: $('#phone').val(),
        email: $('#email').val()
      }
      $.post('users/newecontact', econtobj)
        .then(function(data) {
          console.log(data)
          window.location = '/edit-profile-page.html'
        })
      }
    }
    validate()





})
