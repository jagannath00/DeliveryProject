/**
 * Created by Admin on 7/5/2023.
 */

$(document).ready(function (){
    item_list();
    shop_list();

    $(".create_item").click(function (){
        addItem();
    })
});

function item_list() {
    $.ajax({
        type: "POST",
        url: "/item_list/",
        async: false,
        success: function (data) {
            var item_list = data.item_list;
            $("#item_type").empty().append($("<option value=''>Select Item</option>"));
            $.each(item_list, function (key, value) {
                $("#item_type").append($("<option></option>").val(value['it_id']).html(value['it_type']));
            });
        },
        error: function (error) {
            console.log("Error in item_list function", error);
        }
    });
}
function shop_list() {
    $.ajax({
        type: "POST",
        url: "/shop_list/",
        async: false,
        success: function (data) {
            var shop_list = data.shop_list;
            $("#shop_type").empty().append($("<option value=''>Select Shop</option>"));
            $.each(shop_list, function (key, value) {
                $("#shop_type").append($("<option></option>").val(value['as_id']).html(value['as_name']));
            });
        },
        error: function (error) {
            console.log("Error in item_list function", error);
        }
    });
}

function addItem() {
    var item_id = $("#hidden_item_id").val();
    var shop_type = $("#shop_type").val();
    var item_name = $("#item_name").val();
    var item_price = $("#item_price").val();
    var item_desc = $("#item_desc").val();
    var item_quantity = $("#item_quantity").val();

    if (shop_type === '' || shop_type === undefined) {
        swal("", "Please Select Your Shop", "warning");
        return true
    } else if (item_name === '' || item_name === undefined) {
        swal("", "Please Enter Item Name", "warning");
        return true;
    } else if (item_price === '' || item_price === undefined) {
        swal("", "Please Enter Item Price", "warning");
        return true;
    } else if (item_desc === '' || item_desc === undefined) {
        swal("", "Please Enter Description", "warning");
        return true;
    } else if (item_quantity === '' || item_quantity === undefined) {
        swal("", "Please Enter Item Quantity", "warning");
        return true;
    } else {
        var item_image = $("#item_image")[0].files;

        formData = new FormData();
        if (item_image !== '' && item_image !== undefined) {
            formData.append('item_image', item_image[0]);
            formData.append('item_image_flag', 'avail')
        } else {
            formData.append('item_image_flag', 'unavail')
        }
        formData.append('item_id', item_id);
        formData.append('shop_type', shop_type);
        formData.append('item_name', item_name);
        formData.append('item_price', item_price);
        formData.append('item_desc', item_desc);
        formData.append('item_quantity', item_quantity);

        $.ajax({
            type: "POST",
            url: "/addItem/",
            data: formData,
            async: false,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.result === 'success') {
                    swal("",data.msg,"success");
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

}