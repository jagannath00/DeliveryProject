/**
 * Created by Admin on 7/5/2023.
 */

$(document).ready(function () {
    user_data();
});


function user_data() {
    $.ajax({
        type: "POST",
        url: "/user_details/",
        async: false,
        success: function (data) {
            if (data.result === "success") {
                var user_list = data.user_list;
                var image = user_list[0].u_id;
                $(".profile-image").attr('src', '/static/profile_image/' + image + '.png');
            }
        },
        error: function (error) {
            console.log("Error in item_list function", error);
        }
    });
}