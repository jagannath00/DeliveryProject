$(document).ready(function () {
    $("#datepicker").change();
    $("#view_member_details").click(function () {
        $("#user_profile_modal").modal('show')
    });
    $("#reset_dropdownsorting").click(function () {
        location.reload()
    });
    $("input[required]").addClass("required");
    GroupMembersChartAll();
    loadMeetingListInDashboard();

    $(".meeting_cal").change(function () {
        var date = $(this).val();
        loadMeetingListOnDate(date);
    });

    $(function () {
        $("#my_date_picker").datepicker({
            dateFormat: 'dd-mm-yy',
            autoclose: true
        });
    });
    $("#calander").click(function () {
        $("#my_date_picker").trigger('click');
    });
    $("#my_date_picker").on("change", function () {
        var selected = $(this).val();
        alert(selected);
    });
    // Create Object
    $("#export").click(function () {
        ConvertToCSV()
    });
    cuurentDate();
    loadGroupList();

    $("#exportgroups").change(function () {
        move();
        var export_val = $(this).val();
        if (export_val === "Export as Excel") {
            setTimeout(function () {
                exportGroupsListInExcel();
            }, 1200);
        }


    });
    pageSizeDash = 9;
    $(function () {
        var pageCount = $(".item").length / pageSizeDash;

        for (var i = 0; i < pageCount; i++) {
            if (i === 0) {
                $(".pagination").append('<li class="page-item d-none active"><a class="page-link" href="javascript:void(0)">' + ( i + 1) +
                    "</a></li>"
                );
                $(".pre").addClass("pag-disable"); // For adding Arrow disable on load
            }
            else {
                $(".pagination").append('<li class="page-item d-none"><a class="page-link" href="javascript:void(0)">' + (i + 1 ) +
                    "</a></li>"
                );
            }
        }

        showPage(1);

        $(".pagination li").click(function () {
            $(".pagination li").removeClass("active");
            $(".pre").removeClass("pag-disable"); // For Removing Arrow disable
            $(this).addClass("active");
            showPage(parseInt($(this).text()));
        });
    });

    showPage = function (page) {
        $(".item").addClass("pag-dis");
        $(".item").each(function (n) {
            if (n >= pageSizeDash * (page - 1) && n < pageSizeDash * page)
                $(this).removeClass("pag-dis");
        });
    };

    //Pagniation previous and next buttons

    $(".nex").click(function () {
        if ($(".pagination li").next().length !== 0) {
            $(".page-item.active").next().addClass("active").prev().removeClass("active");
            $(".page-item.active a").trigger("click");
        } else {
            $(".pagination li").removeClass("active");
            $(".pagination li:first").addClass("active");
        }
        return false;
    });

    $(".pre").click(function () {
        if ($(".pagination li").prev().length !== 0) {
            $(".page-item.active").prev().addClass("active").next().removeClass("active");
            $(".page-item.active a").trigger("click");
        } else {
            $(".pagination li").removeClass("active");
            $(".pagination li:last").addClass("active");
        }
        return false;
    });

    $(".page-item a").click(function () {
        //Pagniation previous and next buttons disable Condition
        if ($(".page-item.active").is(":last-child")) {
            $(".pre").removeClass("pag-disable");
            $(".nex").addClass("pag-disable");
        } else if ($(".page-item.active").is(":first-child")) {
            $(".nex").removeClass("pag-disable");
            $(".pre").addClass("pag-disable");
        } else {
            $(".pre").removeClass("pag-disable");
            $(".nex").removeClass("pag-disable");
        }
    });

});
$(function () {
    $("#datepicker").datepicker({
        dateFormat: 'yy-dd-mm',
        autoclose: true,
        showAnim: "slideDown"
    }, 5000);
});
function show_dp() {
    $("#datepicker").datepicker('show'); //Show on click of button
    $(".datepicker-days").removeClass('d-none')
}

function cuurentDate() {
    var to = new Date();
    var dd = String(to.getDate()).padStart(2, '0');
    var mm = String(to.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = to.getFullYear();

    to = yyyy + '-' + mm + '-' + dd;
    $(".meeting_cal").val(to)
}

$(function () {
    $(".edit").tooltip(1000);
});


function move() {
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}

function loadGroupList() {
    $.ajax({
        type: "POST",
        url: "/load_group_list/",
        async: false,
        success: function (data) {
            var group_list = data.group_list;
            $('#groups_in_dashboard > tbody').empty();
            var row = '';
            for (var i = 0; i < group_list.length; i++) {
                var group_name = (group_list[i].g_name);
                var group_id = (group_list[i].g_id);
                var full_path_ad = "";
                if (group_list[i].groupsettings__gss_icon_path !== '' && group_list[i].groupsettings__gss_icon_path !== null){
                    full_path_ad = "/static/group_icon/" + group_name + '_' + group_id + '.jpg';
                }
                else{
                    full_path_ad = "/static/assets/images/letter-m.png";
                }
                row += '<tr class="content hideContent' + i + 1 + ' item">' +
                    '<td class="py-1">' +
                    '               <img src="' + full_path_ad + '" class="" alt="image" style="border-radius: 50%"></td>' +
                    '                                        <td>' + group_list[i].g_name + '</td>' +
                    '                                        <td class="text-center">' + '<input class="form-check-input" name="flexRadioDefault" type="radio" value="' + group_list[i].g_id + '" id="flexCheckDefault"> ' +
                    '   </tr>';
            }
            $('#groups_in_dashboard > tbody').append(row);

        },
        error: function (error) {
            swal({
                title: "Error",
                text: "Error while Loading data",
                icon: "error",
                dangerMode: true
            });
        }
    });
    $('input[type="radio"]').change(function () {
        if ($(this).is(":checked")) {
            var g_id = $(this).val();
            GroupMembersChart(g_id)
        }
    });
}


function GroupMembersChart(g_id) {
    'use strict';
    $(function () {
        var TotalMembers = [];
        var TotalPayments = [];
        $.ajax({
            type: "POST",
            url: "/get_Dynamic_Chart_Total_Members_Count_Based_On_Groups/",
            data: {'g_id': g_id},
            async: false,
            success: function (data) {
                TotalMembers = data.TotalMembers;
                TotalPayments = data.TotalPayments;
                var lineStatsOptions = {
                    scales: {
                        yAxes: [{
                            display: false
                        }],
                        xAxes: [{
                            display: false
                        }]
                    },
                    legend: {
                        display: false
                    },
                    elements: {
                        point: {
                            radius: 0
                        },
                        line: {
                            tension: 0
                        }
                    },
                    stepsize: 100
                }
                if ($('#users-statistics-overview').length) {
                    var salesChartCanvas = $("#users-statistics-overview").get(0).getContext("2d");
                    var gradientStrokeFill_1 = salesChartCanvas.createLinearGradient(0, 0, 0, 450);
                    gradientStrokeFill_1.addColorStop(1, 'rgba(255,255,255, 0.0)');
                    gradientStrokeFill_1.addColorStop(0, 'rgba(102,78,235, 0.2)');
                    var gradientStrokeFill_2 = salesChartCanvas.createLinearGradient(0, 0, 0, 400);
                    gradientStrokeFill_2.addColorStop(1, 'rgba(255, 255, 255, 0.01)');
                    gradientStrokeFill_2.addColorStop(0, '#273472');

                    var data_1_1 = TotalMembers;
                    var data_2_2 = TotalPayments;

                    var areaData = {
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "sep", "Oct", "Nov", "Dec"],
                        datasets: [
                            {
                                label: 'Users',
                                data: data_1_1,
                                borderColor: '#273472',
                                backgroundColor: gradientStrokeFill_2,
                                borderWidth: 2
                            },
                            {
                                label: 'Payments',
                                data: data_2_2,
                                borderColor: '#ed0007',
                                backgroundColor: gradientStrokeFill_2,
                                borderWidth: 2
                            }]
                    };
                    var areaOptions = {
                        responsive: true,
                        animation: {
                            animateScale: true,
                            animateRotate: true
                        },
                        elements: {
                            point: {
                                radius: 3,
                                backgroundColor: "#fff"
                            },
                            line: {
                                tension: 0
                            }
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }
                        },
                        legend: false,
                        legendCallback: function (chart) {
                            var text = [];
                            text.push('<div class="chartjs-legend"><ul>');
                            for (var i = 0; i < chart.data.datasets.length; i++) {
                                text.push('<li>');
                                text.push('<span style="background-color:' + chart.data.datasets[i].borderColor + '">' + '</span>');
                                text.push(chart.data.datasets[i].label);
                                text.push('</li>');
                            }
                            text.push('</ul></div>');
                            return text.join("");
                        },
                        scales: {
                            xAxes: [{
                                display: false,
                                ticks: {
                                    display: false,
                                    beginAtZero: false
                                },
                                gridLines: {
                                    drawBorder: false
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    max: 200,
                                    min: 0,
                                    stepSize: 50,
                                    fontColor: "#858585",
                                    beginAtZero: false
                                },
                                gridLines: {
                                    color: '#e2e6ec',
                                    display: true,
                                    drawBorder: false
                                }
                            }]
                        }
                    }
                    var salesChart = new Chart(salesChartCanvas, {
                        type: 'line',
                        data: areaData,
                        options: areaOptions
                    });
                    document.getElementById('sales-statistics-legend').innerHTML = salesChart.generateLegend();


                }
            }
        });
    });
}
(jQuery);

function GroupMembersChartAll() {
    'use strict';
    $(function () {
        var TotalMembers = [];
        var Groups = [];
        var ActiveGroupscount = [];
        var InActiveGroupscount = [];
        var PendingGroups = [];
        var TotalPayments = [];
        $.ajax({
            type: "POST",
            url: "/get_Dynamic_Chart_Total_Members_Count_All/",
            async: false,
            success: function (data) {
                TotalMembers = data.TotalMembers;
                ActiveGroupscount = data.ActiveGroupscount;
                InActiveGroupscount = data.InActiveGroupscount;
                PendingGroups = data.PendingGroups;
                Groups = data.Groups;
                TotalPayments = data.TotalPayments;
                var lineStatsOptions = {
                    scales: {
                        yAxes: [{
                            display: false
                        }],
                        xAxes: [{
                            display: false
                        }]
                    },
                    legend: {
                        display: false
                    },
                    elements: {
                        point: {
                            radius: 0
                        },
                        line: {
                            tension: 0
                        }
                    },
                    stepsize: 50
                }
                if ($('#users-statistics-overview').length) {
                    var salesChartCanvas = $("#users-statistics-overview").get(0).getContext("2d");
                    var gradientStrokeFill_1 = salesChartCanvas.createLinearGradient(0, 0, 0, 450);
                    gradientStrokeFill_1.addColorStop(1, 'rgba(255,255,255, 0.0)');
                    gradientStrokeFill_1.addColorStop(0, 'rgba(102,78,235, 0.2)');
                    var gradientStrokeFill_2 = salesChartCanvas.createLinearGradient(0, 0, 0, 400);
                    gradientStrokeFill_2.addColorStop(1, 'rgba(255, 255, 255, 0.01)');
                    gradientStrokeFill_2.addColorStop(0, '#273472');

                    var data_1_2 = TotalMembers;
                    var data_payment = TotalPayments;

                    var areaData = {
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "sep", "Oct", "Nov", "Dec"],
                        datasets: [
                            {
                                label: 'Users',
                                data: data_1_2,
                                borderColor: '#273472',
                                backgroundColor: gradientStrokeFill_2,
                                borderWidth: 2
                            },
                            {
                                label: 'Payments',
                                data: data_payment,
                                borderColor: '#ed0007',
                                backgroundColor: gradientStrokeFill_2,
                                borderWidth: 2
                            }]
                    };
                    var areaOptions = {
                        responsive: true,
                        animation: {
                            animateScale: true,
                            animateRotate: true
                        },
                        elements: {
                            point: {
                                radius: 3,
                                backgroundColor: "#fff"
                            },
                            line: {
                                tension: 0
                            }
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }
                        },
                        legend: false,
                        legendCallback: function (chart) {
                            var text = [];
                            text.push('<div class="chartjs-legend"><ul>');
                            for (var i = 0; i < chart.data.datasets.length; i++) {
                                text.push('<li>');
                                text.push('<span style="background-color:' + chart.data.datasets[i].borderColor + '">' + '</span>');
                                text.push(chart.data.datasets[i].label);
                                text.push('</li>');
                            }
                            text.push('</ul></div>');
                            return text.join("");
                        },
                        scales: {
                            xAxes: [{
                                display: false,
                                ticks: {
                                    display: false,
                                    beginAtZero: false
                                },
                                gridLines: {
                                    drawBorder: false
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    max: 200,
                                    min: 0,
                                    stepSize: 50,
                                    fontColor: "#858585",
                                    beginAtZero: false
                                },
                                gridLines: {
                                    color: '#e2e6ec',
                                    display: true,
                                    drawBorder: false
                                }
                            }]
                        }
                    }
                    var salesChart = new Chart(salesChartCanvas, {
                        type: 'line',
                        data: areaData,
                        options: areaOptions
                    });
                    document.getElementById('sales-statistics-legend').innerHTML = salesChart.generateLegend();
                }
                if ($('#stats-line-graph-TotalGroupscount').length) {
                    var lineChartCanvas = $("#stats-line-graph-TotalGroupscount").get(0).getContext("2d");
                    var gradientStrokeFill_1 = lineChartCanvas.createLinearGradient(0, 0, 0, 50);
                    gradientStrokeFill_1.addColorStop(0, 'rgba(131, 144, 255, 0.5)');
                    gradientStrokeFill_1.addColorStop(1, '#fff');
                    var lineChart = new Chart(lineChartCanvas, {
                        type: 'line',
                        data: {
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                            datasets: [{
                                label: 'Total Groups',
                                data: Groups,
                                borderColor: '#27336f',
                                backgroundColor: gradientStrokeFill_1,
                                borderWidth: 3,
                                fill: true
                            }]
                        },
                        options: lineStatsOptions
                    });
                }
                if ($('#stats-line-graph-totalActiveGroupscount').length) {
                    var lineChartCanvas = $("#stats-line-graph-totalActiveGroupscount").get(0).getContext("2d");
                    var gradientStrokeFill_1 = lineChartCanvas.createLinearGradient(0, 0, 0, 50);
                    gradientStrokeFill_1.addColorStop(0, 'rgba(131, 144, 255, 0.5)');
                    gradientStrokeFill_1.addColorStop(1, '#fff');
                    var lineChart = new Chart(lineChartCanvas, {
                        type: 'line',
                        data: {
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                            datasets: [{
                                label: 'Active Groups',
                                data: ActiveGroupscount,
                                borderColor: '#27336f',
                                backgroundColor: gradientStrokeFill_1,
                                borderWidth: 3,
                                fill: true
                            }]
                        },
                        options: lineStatsOptions
                    });
                }
                if ($('#stats-line-graph-totalInActiveGroupscount').length) {
                    var lineChartCanvas = $("#stats-line-graph-totalInActiveGroupscount").get(0).getContext("2d");
                    var gradientStrokeFill_1 = lineChartCanvas.createLinearGradient(0, 0, 0, 50);
                    gradientStrokeFill_1.addColorStop(0, 'rgba(131, 144, 255, 0.5)');
                    gradientStrokeFill_1.addColorStop(1, '#fff');
                    var lineChart = new Chart(lineChartCanvas, {
                        type: 'line',
                        data: {
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                            datasets: [{
                                label: 'InActive Groups',
                                data: InActiveGroupscount,
                                borderColor: '#27336f',
                                backgroundColor: gradientStrokeFill_1,
                                borderWidth: 3,
                                fill: true
                            }]
                        },
                        options: lineStatsOptions
                    });
                }
                if ($('#stats-line-graph-totalpendingGroupscount').length) {
                    var lineChartCanvas = $("#stats-line-graph-totalpendingGroupscount").get(0).getContext("2d");
                    var gradientStrokeFill_1 = lineChartCanvas.createLinearGradient(0, 0, 0, 50);
                    gradientStrokeFill_1.addColorStop(0, 'rgba(131, 144, 255, 0.5)');
                    gradientStrokeFill_1.addColorStop(1, '#fff');
                    var lineChart = new Chart(lineChartCanvas, {
                        type: 'line',
                        data: {
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                            datasets: [{
                                label: 'Pending Groups',
                                data: PendingGroups,
                                borderColor: '#27336f',
                                backgroundColor: gradientStrokeFill_1,
                                borderWidth: 3,
                                fill: true
                            }]
                        },
                        options: lineStatsOptions
                    });
                }
            }
        });
    });
}
(jQuery);


function change_date_format(myDate) {
    var changed_date = moment(myDate).format("YYYY-MM-DD");
    if (changed_date === 'Invalid date') {
        return "";
    } else {
        return changed_date;
    }
}




function loadMeetingListInDashboard() {
    $.ajax({
        type: "POST",
        url: "/load_meeting_list_in_dashboard/",
        async: false,
        success: function (data) {
            $('#meetings_in_dashboard > tbody').empty();
            var meeting_list = data.meeting_list;
            var row = '';
            for (var i = 0; i < meeting_list.length; i++) {
                var meeting=meeting_list[i];
                row += '<tr>' +
                    '                                        <td>' + meeting.gm_name + '</td>' +
                    '                                        <td>' + change_date_format(meeting.gm_start_date) + '</td>' +
                    '                                        <td class="text-center">' + '<button type="button" class="btn btn-primary btn-sm joinmeeting" id="' + meeting.gm_id + '">Join</button> </td>' +
                    '   </tr>';
            }
            $(' #meetings_in_dashboard > tbody').append(row);
        },
        error: function (error) {
            swal({
                title: "Error",
                text: "Error while Loading data",
                icon: "error",
                dangerMode: true
            });
        }
    });

    $(".joinmeeting").click(function () {
        var meeting_id = $(this).attr('id');
        join_Meeting(meeting_id)
    });
}


function loadMeetingListOnDate(date) {
    $.ajax({
        type: "POST",
        url: "/load_meeting_list_based_on_date/",
        data: {'date': date},
        async: false,
        success: function (data) {
            $('#meetings_in_dashboard > tbody').empty();
            var meeting_list = data.meeting_list;
            var row = '';
            for (var i = 0; i < meeting_list.length; i++) {
                row += '<tr>' +
                    '                                        <td>' + meeting_list[i].gm_name + '</td>' +
                    '                                        <td>' + change_date_format(meeting_list[i].gm_start_date) + '</td>' +
                    '                                        <td class="text-center">' + '<button type="button" class="btn btn-primary btn-sm join_meeting_date" id="' + meeting_list[i].gm_id + '">Join</button> </td>' +
                    '   </tr>';
            }
            $(' #meetings_in_dashboard > tbody').append(row);

        },
        error: function (error) {
            swal({
                title: "Error",
                text: "Error while Loading data",
                icon: "error",
                dangerMode: true
            });
        }
    });

    $(".join_meeting_date").click(function () {
        var meeting_id = $(this).attr('id');
        join_Meeting(meeting_id)
    });
}

function join_Meeting(meeting_id) {
    $.ajax({
        type: "POST",
        url: "/get_meeting_details/",
        data: {'meeting_id': meeting_id},
        async: false,
        success: function (data) {
            if (data.result === 'success') {
                var meeting_details = data.meeting_details[0];
                var meeting_url = "https://bolomeet.com?meeting=58902df0-8faf-4897-963e-e5ea4ad51d82&password=d86578883b7b58bf580809f4954f649e:d9c45c9af7a6ace1c07c0d6d37ca33dc&iframe=true"
                $(".bolomeet_iframe_modal").modal('show');
                appendTo:$("#agent_frame").attr("src", meeting_url);
                var meeting_id = (meeting_details.gm_id);

                window.location.href = '/join_meeting/' + meeting_id + '/';

            }
        },
        error: function (error) {
            swal({
                title: "Error",
                text: "Error while loading data",
                icon: "error",
                dangerMode: true
            });
        }
    });
}


function exportGroupsListInExcel() {
    $.ajax({
        type: "POST",
        url: "/exportGroupsListInExcel/",
        async: false,
        success: function (data) {
            var file = data.report_file_name;
            console.log(file);
            var filepath = '/static/assets/GroupList/' + file;
            if (file === "") {
                return true;
            } else {
                downloadFile(file, filepath);
            }
        },
        error: function (error) {
            swal({
                title: "Error",
                text: "Error while Loading data",
                icon: "error",
                dangerMode: true
            });
        }
    });
}