$(document).ready(function() {

	var num
	$.get('/users/myid')
	.then(function(data){
	  console.log(data)
	   num = data[0].id

	//get id
	// function getUrlParameter(sParam) {
	// 	const sPageURL = decodeURIComponent(window.location.search.substring(1));
	// 	const sURLVariables = sPageURL.split('&');
	// 	let id;
	// 	sURLVariables.forEach((paraName) => {
	// 		const sParameterName = paraName.split('=');
	// 		if (sParameterName[0] === sParam) {
	// 			id = sParameterName[1] === undefined ? false : sParameterName[1];
	// 		}
	// 	});
	// 	return id;
	// }
	var userId = num
	console.log(userId);

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


	var userContacts = []

	$.get(`/users/econtactbyuser/${userId}`, (data) => {
			data.forEach((element) => {
				userContacts.push(element)
			})
			console.log(userContacts)

			var source = $("#emergency-contact-template").html();
			var template = Handlebars.compile(source);

			userContacts.forEach((element) => {
				var html = template(element)
				$('.emergency-contacts-placeholder').append(html)
			})
		})
	})
})


// $(".delete-contact-button").on("click", function(){
// 	console.log("alsdkfjsa;")
// 	console.log("datatatatddaddatdadtadatdat")
// 	var contactIdToDelete = $(this).data('id');
// 	console.log("contactIdToDelete is: " + contactIdToDelete)

// 	$.ajax({
// 		url: '/econtact/'+contactIdToDelete,
// 		type: 'DELETE',
// 		success: function(result){
// 			location.reload(true)
// 		}

// 	})
// })

//
// });

// $.get('/users/econtactbyuser/' +num)
// .then(function(data){
//   console.log(data)
//   data.forEach(function(el){
//     var $newcontact = $('<li>')
//     $newcontact.append('<p>Name: '+el.firstname+' '+el.lastname+'</p><p>E-mail: '+el.email+'</p><p>Phone Number: '+el.phone+'</p>')
//     $newcontact.attr('id', el.id)
//     $('#contacts').append($newcontact.clone())
//   })
// })
// })
// $(document).ready(function(){
//   $.get('/isloggedin')
//   .then(function(data){
//     console.log(data)
//     if (data != false){
//       $.get('/users/myid')
//       .then(function(data){
//         console.log(data)
//         if (data.length < 1){
//           window.location = '/addphone.html'
//         }
//       })
//       .catch(function(err){
//         window.location = '/addphone.html'
//       })
//     }
// })
// })
