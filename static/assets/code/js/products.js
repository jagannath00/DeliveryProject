/**
 * Created by Admin on 7/5/2023.
 */

$(document).ready(function () {
    addGroceryShop();
    foodShop();
    clothShop();
    footwareShop();
    Cosmetics();
    $(".open_modal").click(function () {
        $(".product-modal").modal('show')
    });

    $(".see-items").click(function () {
        var as_id = $(this).attr('id');
        items(as_id);
    });
    $(".check_out").click(function () {
        $(".cart_product_card").addClass('d-none');
        $(".cart_checkout_card").removeClass('d-none');
        var total_item_amount = $(".total_item_amount").text().trim();
        var cgst = $(".cgst").text().trim();
        var igst = $(".igst").text().trim();
        var delivery_charge = $(".delivery_charge").text().trim();
        var total_payable_amount = parseInt(total_item_amount) + parseInt(cgst) + parseInt(igst) + parseInt(delivery_charge);
        $(".total_amount").text(total_payable_amount);
        $(".check_out").addClass("d-none");
        $(".paynow").removeClass("d-none");
    });

    $(".fa-chevron-left").click(function () {
        $(".cart_product_card").removeClass('d-none');
        $(".cart_checkout_card").addClass('d-none');
        $(".check_out").text("CheckOut");
        $(".paynow").addClass("d-none");
        $(".check_out").removeClass("d-none");
    });

    $("#payment_mode").click(function () {
        var select_data = $(this).val();
        if (select_data === "Online") {
            swal("Notice", "Currently we are not available for online payments, It's Under Development . Please Proceed with Cash On Delivery", "error").then(function (isConfirm) {
                if (isConfirm) {
                    location.reload();
                }
            });
            return true;
        } else {
            return true;
        }
    });

    $(".paynow").click(function (){
        ComplateOrder()
    })

});

function addGroceryShop() {
    var it_id = $(".grocery").attr('id');
    $.ajax({
        type: "POST",
        url: "/OrderProducts/",
        data: {'it_id': it_id},
        async: false,
        success: function (data) {
            if (data.result === "success") {
                var shop_list = data.shop_list;
                var row = '';
                for (var i = 0; i < shop_list.length; i++) {
                    row += '<div class="col-3">' +
                        '<div class="card">' +
                        '<div class="card-media">' +
                        '<img class="shop_image" src="/static/shop_image/' + shop_list[i].as_name + '.jpg" height="200px" width="100%">' +
                        '<div class="pro-discount">PRO extra 15% OFF</div>' +
                        '<div class="delivery-time">39 mins</div>' +
                        '<div class="bookmark"></div>' +
                        '</div>' +
                        '<div class="card-description">' +
                        '<div class="about-place">' +
                        '<div class="place">' +
                        '<p class="place-name">' + shop_list[i].as_name + '</p>' +
                        '</div>' +
                        '<div class="place-review">' +
                        '<p class="per-person">' +
                        '<button type="button" id="' + shop_list[i].as_id + '" class="btn btn-danger btn-sm open_modal see-items">Order</button>' +
                        '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                $('.grocery_list').empty().append(row);

            }
        },
        error: function (error) {
            console.log("Error in item_list function", error);
        }
    });
}

function foodShop() {
    var it_id = $(".food").attr('id');
    $.ajax({
        type: "POST",
        url: "/OrderProducts/",
        data: {'it_id': it_id},
        async: false,
        success: function (data) {
            if (data.result === "success") {
                var shop_list = data.shop_list;
                var row = '';
                for (var i = 0; i < shop_list.length; i++) {
                    row += '<div class="col-3">' +
                        '<div class="card">' +
                        '<div class="card-media">' +
                        '<img class="shop_image" src="/static/shop_image/' + shop_list[i].as_name + '.jpg" height="200px" width="100%">' +
                        '<div class="pro-discount">PRO extra 15% OFF</div>' +
                        '<div class="delivery-time">39 mins</div>' +
                        '<div class="bookmark"></div>' +
                        '</div>' +
                        '<div class="card-description">' +
                        '<div class="about-place">' +
                        '<div class="place">' +
                        '<p class="place-name">' + shop_list[i].as_name + '</p>' +
                        '</div>' +
                        '<div class="place-review">' +
                        '<p class="per-person">' +
                        '<button type="button" id="' + shop_list[i].as_id + '" class="btn btn-danger btn-sm see-items open_modal">Order</button>' +
                        '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                $('.food_list').empty().append(row);

            }
        },
        error: function (error) {
            console.log("Error in item_list function", error);
        }
    });
}

function clothShop() {
    var it_id = $(".cloth").attr('id');
    $.ajax({
        type: "POST",
        url: "/OrderProducts/",
        data: {'it_id': it_id},
        async: false,
        success: function (data) {
            if (data.result === "success") {
                var shop_list = data.shop_list;
                var row = '';
                for (var i = 0; i < shop_list.length; i++) {
                    row += '<div class="col-3">' +
                        '<div class="card">' +
                        '<div class="card-media">' +
                        '<img class="shop_image" src="/static/shop_image/' + shop_list[i].as_name + '.jpg" height="200px" width="100%">' +
                        '<div class="pro-discount">PRO extra 15% OFF</div>' +
                        '<div class="delivery-time">39 mins</div>' +
                        '<div class="bookmark"></div>' +
                        '</div>' +
                        '<div class="card-description">' +
                        '<div class="about-place">' +
                        '<div class="place">' +
                        '<p class="place-name">' + shop_list[i].as_name + '</p>' +
                        '</div>' +
                        '<div class="place-review">' +
                        '<p class="per-person">' +
                        '<button type="button" id="' + shop_list[i].as_id + '" class="btn btn-danger btn-sm see-items open_modal">Order</button>' +
                        '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                $('.cloth_list').empty().append(row);

            }
        },
        error: function (error) {
            console.log("Error in item_list function", error);
        }
    });
}
function footwareShop() {
    var it_id = $(".footware").attr('id');
    $.ajax({
        type: "POST",
        url: "/OrderProducts/",
        data: {'it_id': it_id},
        async: false,
        success: function (data) {
            if (data.result === "success") {
                var shop_list = data.shop_list;
                var row = '';
                for (var i = 0; i < shop_list.length; i++) {
                    row += '<div class="col-3">' +
                        '<div class="card">' +
                        '<div class="card-media">' +
                        '<img class="shop_image" src="/static/shop_image/' + shop_list[i].as_name + '.jpg" height="200px" width="100%">' +
                        '<div class="pro-discount">PRO extra 15% OFF</div>' +
                        '<div class="delivery-time">39 mins</div>' +
                        '<div class="bookmark"></div>' +
                        '</div>' +
                        '<div class="card-description">' +
                        '<div class="about-place">' +
                        '<div class="place">' +
                        '<p class="place-name">' + shop_list[i].as_name + '</p>' +
                        '</div>' +
                        '<div class="place-review">' +
                        '<p class="per-person">' +
                        '<button type="button" id="' + shop_list[i].as_id + '" class="btn btn-danger btn-sm see-items open_modal">Order</button>' +
                        '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                $('.footware_list').empty().append(row);

            }
        },
        error: function (error) {
            console.log("Error in item_list function", error);
        }
    });
}
function Cosmetics() {
    var it_id = $(".cosmetics").attr('id');
    $.ajax({
        type: "POST",
        url: "/OrderProducts/",
        data: {'it_id': it_id},
        async: false,
        success: function (data) {
            if (data.result === "success") {
                var shop_list = data.shop_list;
                var row = '';
                for (var i = 0; i < shop_list.length; i++) {
                    row += '<div class="col-3">' +
                        '<div class="card">' +
                        '<div class="card-media">' +
                        '<img class="shop_image" src="/static/shop_image/' + shop_list[i].as_name + '.jpg" height="200px" width="100%">' +
                        '<div class="pro-discount">PRO extra 15% OFF</div>' +
                        '<div class="delivery-time">39 mins</div>' +
                        '<div class="bookmark"></div>' +
                        '</div>' +
                        '<div class="card-description">' +
                        '<div class="about-place">' +
                        '<div class="place">' +
                        '<p class="place-name">' + shop_list[i].as_name + '</p>' +
                        '</div>' +
                        '<div class="place-review">' +
                        '<p class="per-person">' +
                        '<button type="button" id="' + shop_list[i].as_id + '" class="btn btn-danger btn-sm see-items open_modal">Order</button>' +
                        '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                $('.cosmetics_list').empty().append(row);

            }
        },
        error: function (error) {
            console.log("Error in item_list function", error);
        }
    });
}
function items(as_id) {
    $.ajax({
        type: "POST",
        url: "/items/",
        data: {'as_id': as_id},
        async: false,
        success: function (data) {
            if (data.result === "success") {
                var order_item_list = data.order_item_list;
                var row = '';
                for (var i = 0; i < order_item_list.length; i++) {
                    row += '<div class="col-lg-3" style="padding: 10px;">' +
                        '<input type="hidden" id="product_name_hid" value="' + order_item_list[i].item_name + '">' +
                        '<div class="products" style="text-align: center;box-shadow: 0 4px 16px 0 rgba(167, 175, 183, 0.33);border-radius: 4px;padding: 8px; height: 164px; width: auto; background: white;">' +
                        '<img class="product-image" src="/static/item_image/' + order_item_list[i].item_name + '.jpg" height="70px" width="70px">' +
                        '<p class="product-name" value="' + order_item_list[i].item_name + '"><b>' + order_item_list[i].item_name + " | " + order_item_list[i].item_desc + '</b></p>' +
                        '<p class="product-price" value="' + order_item_list[i].item_price + '"><b>' + order_item_list[i].item_price + '</b></p>' +
                        '<a class="add-to-cart float-right" onclick="addtoCart(' + order_item_list[i].at_id + ')" id="test" value="' + order_item_list[i].at_id + '"><i class="fa fa-plus" style="cursor: pointer;"></i></a>' +
                        '</div>' +
                        '<input type="hidden" id="item_id" value="' + order_item_list[i].at_id + '">' +
                        '</div>';
                }
                $('#shop').empty().append(row);

            }
        },
        error: function (error) {
            console.log("Error in item_list function", error);
        }
    });
}
function addtoCart(at_id) {
    $.ajax({
        type: "POST",
        url: "/add_item_to_cart/",
        data: {'at_id': at_id},
        async: false,
        success: function (data) {
            if (data.result === "success") {
                var cart_item_list = data.cart_item_list;
                var row = '';
                for (var i = 0; i < cart_item_list.length; i++) {
                    row += '<div class="row col-12 mt-1 cart_details">' +
                        '<input type="hidden" class="order_type" value="' + cart_item_list[i].shop_type__it_id__it_type + '">' +
                        '<div class="col-2">' +
                        '<img src="/static/item_image/' + cart_item_list[i].item_name + '.jpg" style="height: 41px; margin-left: -10px;">' +
                        '</div>' +
                        '<div class="col-5" style="background: lightgrey">' +
                        '<h5 class="text-color item_name">' + cart_item_list[i].item_name + '</h5>' +
                        '</div>' +
                        '<div class="col-3" style="background: #6778ff; text-align: center;">' +
                        '<p style="margin-top: 11px;"><span>₹</span> <span class="text-color item_price"> ' + cart_item_list[i].item_price + '</span></p>' +
                        '<input type="hidden" class="t_price" value="' + cart_item_list[i].item_price + '">' +
                        '</div>' +
                        '<div class="col-1 remove_cart_item" >' +
                        '<i class="fa fa-minus-circle remove_item" style="margin-top: 16px;"></i>' +
                        '</div>' +
                        '</div>';
                    var prices = cart_item_list[i].item_price;
                    var total = i + prices;
                    console.log(total)
                }
                $('#added_cart').append(row);
            }
        },
        error: function (error) {
            console.log("Error in item_list function", error);
        }
    });

}

$(document).on('click', '.remove_cart_item', function (event) {
    $(this).parent().remove();
});


function ComplateOrder() {
    var odr_id = $("#odr_hidden_id").val();
    var odr_name = $(".item_name").text().trim();
    var odr_amount = $(".total_item_amount").text().trim();
    var odr_igst = $(".igst").text().trim();
    var odr_cgst = $(".cgst").text().trim();
    var odr_delivery_amount = $(".delivery_charge").text().trim();
    var odr_total_amount = $(".total_amount").text().trim();

    var order_details = {
        "odr_id": odr_id,
        "odr_name": odr_name,
        "odr_amount": odr_amount,
        "odr_igst": odr_igst,
        "odr_cgst": odr_cgst,
        "odr_delivery_amount": odr_delivery_amount,
        "odr_total_amount": odr_total_amount
    };
    if (odr_id === "-") {
        alert(odr_id);
        swal("", "Are you Sure", "warning").then(function (isConfirm) {
            if (isConfirm) {
                $.ajax({
                    type: "POST",
                    url: "//",
                    data: {'order_details': order_details},
                    async: false,
                    success: function (data) {
                        if (data.result === 'success') {
                            swal("", data.msg, "success");

                        }
                    },
                    error: function (error) {
                        swal({
                            title: "Error",
                            text: "Error while Adding Data",
                            icon: "error",
                            dangerMode: true
                        });
                    }
                });
            }
        });

    } else {
        swal("Sorry", "Something Went Wrong, Please Try Again After Some Time", "error")
    }
}
