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
	var userId;

	$.get(`/users/econtacts/${emergencyContactId}`, (data) => {
		data.forEach((element) => {
			userContacts.push(element)
		})
		userId = userContacts[0]['user_id']
		console.log("userId is " + userId)
		console.log(userContacts)

		var source = $("#emergency-contact-template").html();
		var template = Handlebars.compile(source);

		userContacts.forEach((element) => {
			var html = template(element)
			$('.emergency-contacts-placeholder').append(html)
		})
	})
	$(".emergency-contact-submit-button").on("click", () => {

		function validateEmail(email) {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}

		function validate() {
			var email = $(".emergency-contact-email-input").val();
			if (!validateEmail(email)) {
				$(".emergency-contact-email-input").css("border-color", "red")
				$(".emergency-contact-email-input").val('');
				$(".emergency-contact-email-input").attr('placeholder', 'Please Enter a Valid Email');

			} else {
				var contactObject = {}
				contactObject['id'] = emergencyContactId;
				contactObject['firstname'] = $(".emergency-contact-firstname-input").val();
				contactObject['lastname'] = $(".emergency-contact-lastname-input").val();
				contactObject['phone'] = $(".emergency-contact-phone-input").val();
				contactObject['email'] = $(".emergency-contact-email-input").val();

				$.ajax({
					type: "PATCH",
					url: "/users/updatecontact/" + emergencyContactId,
					crossDomain: true,
					data: JSON.stringify(contactObject),
					contentType: "application/json; charset=utf-8",
					success: function(returnValue) {
						location.href = "edit-profile-page.html"
					},
					error: function() {
						console.log('failure')
					}
				})
			}
		}
		validate()

	})

});