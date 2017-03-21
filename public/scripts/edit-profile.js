$(document).ready(function() {
	//get id
	function getUrlParameter(sParam) {
		const sPageURL = decodeURIComponent(window.location.search.substring(1));
		const sURLVariables = sPageURL.split('&');
		let id;
		sURLVariables.forEach((paraName) => {
			const sParameterName = paraName.split('=');
			if (sParameterName[0] === sParam) {
				id = sParameterName[1] === undefined ? false : sParameterName[1];
			}
		});
		return id;
	}
	var userId = getUrlParameter('id');
	console.log(userId);


	var userContacts = []

	$.get(`https://getmesafe.herokuapp.com/users/econtactbyuser/${userId}`, (data) => {
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


});

