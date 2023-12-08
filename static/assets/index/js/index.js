/**
 * Created by Admin on 12/28/2022.
 */
$(document).ready(function () {
    $("#Submit_sms").click(function () {
        SendEmailForContact();
    });

});

/**
 * @return {boolean}
 */
function SendEmailForContact() {
    var name = $("#index-name").val();
    var email = $("#index-email").val();
    var message = $("#index-message").val();
    if (name === '' || name === undefined) {
        swal("Please Enter Name");
        return false;
    } else if (email === '' || email === undefined) {
        swal("Please Enter Email");
        return false;
    } else if (message === '' || message === undefined) {
        swal("Please Enter Message");
        return false;
    } else {
        var contactData = {
            'name': name,
            'email': email,
            'message': message
        };
        $.ajax({
            type: "POST",
            url: "/send_contact_email/",
            data: contactData,
            async: false,
            success: function (data) {
                if (data.result === 'success') {
                    swal("Sent Successfully")
                }
            }
        })
    }
}

