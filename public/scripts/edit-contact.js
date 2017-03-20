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
	var emergencyContactId = getUrlParameter('id');
	console.log(emergencyContactId);


	var userContacts = []

	$.get(`https://getmesafe.herokuapp.com/users/econtacts/${emergencyContactId}`, (data) => {
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
	$(".emergency-contact-submit-button").on("click", () => {
		var contactObject = {}
		contactObject['id'] = emergencyContactId;
		contactObject['firstname'] = $(".emergency-contact-firstname-input").val();
		contactObject['lastname'] = $(".emergency-contact-lastname-input").val();
		contactObject['phone'] = $(".emergency-contact-phone-input").val();
		contactObject['email'] = $(".emergency-contact-email-input").val();

		$.ajax({
			type: "PATCH",
			url: "https://getmesafe.herokuapp.com/users/updatecontact/",
			crossDomain: true,
			data: JSON.stringify(contactObject),
			contentType: "application/json; charset=utf-8",
			success: function(returnValue){
				location.href = "edit-profile-page.html"
			},
			error: function(){
				console.log('failure')
			}
		})
	})

});