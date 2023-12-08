/**
 * Created by Admin on 7/4/2023.
 */
$(document).ready(function (){
    $(".fa-chevron-left").click(function (){
        $("#f_btn").removeClass("d-none");
        $(".js-card").removeClass("flip_card_margin_top")
    });

    user_details();

    $("#f_btn").click(function (){
        $(".js-card").addClass('flip_card_margin_top')
    })

});

function user_details() {
    $.ajax({
        type: "POST",
        url: "/user_details/",
        async: false,
        success: function (data) {
            if(data.result === "success"){
                var user_list = data.user_list;
                var image = user_list[0].u_id;
                $(".main_profile_image").attr('src', '/static/profile_image/' + image + '.png');
            }
        },
        error: function (error) {
            console.log("Error in item_list function", error);
        }
    });
}