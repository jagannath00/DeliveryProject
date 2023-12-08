$(document).ready(function () {
    $(".login").click(function () {
        verifyLoginDetails();
    });
});


function verifyLoginDetails() {
    var userName = $("#uname").val();
    var password = $("#upwd").val();
    if (userName === '' || userName === undefined) {
        swal("Please Enter User Name");
        return false;
    } else if (password === '' || password === undefined) {
        swal("Please Enter Password");
        return false;
    } else if (!checkuser(userName, password)) {
        return false;
    } else {
    }
}

function checkuser(username, password) {
    var flag = false;
    var UserDetails = {

        "username": username,
        "password": password
    };
    $.ajax({
        type: "POST",
        url: "/login_with_username/",
        data: UserDetails,
        async: false,
        success: function (data) {
            if (data.result === "valid") {
                    setTimeout(function () {
                        gotoRespectiveLogin(data.u_id, data.user_role);
                    }, 20);

            } else if (data.result === "Invalid") {
                $("#uname").val('');
                $("#upwd").val('');
                swal(data.msg);
            }
        },
        error: function (error) {
            swal("Internal Server Error At This Moment.");
        }
    });
    return flag;
}

function gotoRespectiveLogin(u_id, user_role) {
    if (user_role === 'SK') {
        window.location.href = '/admindashboard/';
    } else if (user_role === 'US') {
        window.location.href = '/products/';
    }
}

