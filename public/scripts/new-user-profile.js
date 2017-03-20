$(document).ready(function() {

	$(".add-contact-button").on("click", () => {
		console.log('hello')
		$(".emergency-contact-form-container").append(
				`<h1>Emergency Contact 2</h1>
				<input type="text" placeholder="Emergency Contact First Name" name="contact-first-name" class = "col-xs-10">
				<input type="text" placeholder="Emergency Contact Last Name" name="contact-last-name" class = "col-xs-10"><input type="text" placeholder="Emergency Contact Email" name="contact-email" class = "col-xs-10"><input type="text" placeholder="Emergency Contact Phone Number" name="contact-phone" class = "col-xs-10">
				<div class = "add-contact-button-container col-xs-10">
				`
			)

		$(".add-contact-button").hide()
	})

	$(".profile-submit-button").on("click", () => {
		
	})




});

