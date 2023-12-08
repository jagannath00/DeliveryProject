/**
 * Created by Admin on 7/4/2023.
 */
$(document).ready(function () {
    loadShplist();
    $(".create_shop").click(function () {
        createShop();
    });
    item_list()
});

function item_list() {
    $.ajax({
        type: "POST",
        url: "/item_list/",
        async: false,
        success: function (data) {
            var item_list = data.item_list;
            $("#as_item_type").empty().append($("<option value=''>Select Item</option>"));
            $.each(item_list, function (key, value) {
                $("#as_item_type").append($("<option></option>").val(value['it_id']).html(value['it_type']));
            });
        },
        error: function (error) {
            console.log("Error in item_list function", error);
        }
    });
}

function createShop() {
    var as_id = $("#hidden_as_id").val();
    var shop_name = $("#shop_name").val();
    var owner_name = $("#owner_name").val();
    var gst_number = $("#gst_number").val();
    var item_type = $("#as_item_type").val();

    if (shop_name === '' || shop_name === undefined) {
        swal("", "Please Enter Your Shop Name", "warning");
        return true
    } else if (owner_name === '' || owner_name === undefined) {
        swal("", "Please Enter Owner Name", "warning");
        return true;
    } else if (gst_number === '' || gst_number === undefined) {
        swal("", "Please Enter GST Number", "warning");
        return true;
    } else {
        var shop_image = $("#shop_image")[0].files;

        formData = new FormData();
        if (shop_image !== '' && shop_image !== undefined) {
            formData.append('shop_image', shop_image[0]);
            formData.append('shop_image_flag', 'avail')
        } else {
            formData.append('shop_image_flag', 'unavail')
        }
        formData.append('as_id', as_id);
        formData.append('shop_name', shop_name);
        formData.append('owner_name', owner_name);
        formData.append('gst_number', gst_number);
        formData.append('item_type', item_type);
        $.ajax({
            type: "POST",
            url: "/create_shop/",
            data: formData,
            async: false,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.result === 'success') {
                    swal("",data.msg,"success");
                    loadShplist();
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

function loadShplist() {
    $.ajax({
        type: "POST",
        url: "/shop_list/",
        async: false,
        success: function (data) {
            var shop_list = data.shop_list;
            var row = '';
            for (var i = 0; i < shop_list.length; i++) {
                row += '<tr>' +
                    '                                        <td>' + shop_list[i].as_name + '</td>' +
                    '                                        <td>' + shop_list[i].as_owner_name + '</td>' +
                    '                                        <td>' + shop_list[i].as_gst_num + '</td>' +
                    '                                        <td>' + '<button type="button" class="btn btn-success btn-sm shop_edit" id="' + shop_list[i].as_id + '">Edit</button> <button type="button" class="btn btn-danger btn-sm shop_view" id="' + shop_list[i].as_id + '">View</button>' + '</td>' +
                    '   </tr>';
            }
            $('#shop_list > tbody').empty().append(row);
        },
        error: function (error) {
            swal({
                title: "Error",
                text: "Error while Loading Data ",
                icon: "error",
                dangerMode: true
            });
        }
    });

    // $('#bus_list_table').DataTable();
}
