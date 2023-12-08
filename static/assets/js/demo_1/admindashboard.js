$(document).ready(function () {

    $("#admin_reset_dropdownsorting").click(function () {
        loaction.reload()
    });
    $("input[required]").addClass("required");
    approved_groups();
    pendingGroups();


    $(".meeting_cal").change(function () {
        var date = $(this).val();
        loadMeetingListOnDate(date);
    });

    $(function () {
        $("#my_date_picker").datepicker({
            format: 'yyyy-mm-dd'
        });
    });
    $("#calander").click(function () {
        $("#my_date_picker").trigger('click');
    });
    $("#my_date_picker").on("change", function () {
        var selected = $(this).val();
        alert(selected);
    });


    $("#export").click(function () {
        ConvertToCSV()
    });
    cuurentDate();


    $("#admin_dashboard_export").change(function () {
        move();
        var export_val = $(this).val();
        if (export_val === "Export as Excel") {
            setTimeout(function () {
                exportGroupsListInExcel();
            }, 1200);
        }
    });


    (function ($) {
        'use strict';
        $(function () {
            var TotalMembers = [];
            var ActiveGroupscount = [];
            var InActiveGroupscount = [];
            var Groups = [];
            var PendingGroups = [];
            $.ajax({
                type: "POST",
                url: "/get_Dynamic_Chart_Total_Members_Count_All/",
                async: false,
                success: function (data) {
                    TotalMembers = data.TotalMembers;
                    ActiveGroupscount = data.ActiveGroupscount;
                    InActiveGroupscount = data.InActiveGroupscount;
                    Groups = data.Groups;
                    PendingGroups = data.PendingGroups;
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

                        var data_1_1 = TotalMembers;

                        var areaData = {
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "sep", "Oct", "Nov", "Dec"],
                            datasets: [
                                {
                                    label: 'Users',
                                    data: data_1_1,
                                    borderColor: '#273472',
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

                        $("#sales-statistics_switch_1").click(function () {
                            var data = salesChart.data;
                            data.datasets[0].data = data_1_1;
                            data.datasets[1].data = data_1_2;
                            salesChart.update();
                        });
                        $("#sales-statistics_switch_2").click(function () {
                            var data = salesChart.data;
                            data.datasets[0].data = data_2_1;
                            data.datasets[1].data = data_2_2;
                            salesChart.update();
                        });
                        $("#sales-statistics_switch_3").click(function () {
                            var data = salesChart.data;
                            data.datasets[0].data = data_3_1;
                            data.datasets[1].data = data_3_2;
                            salesChart.update();
                        });
                        $("#sales-statistics_switch_4").click(function () {
                            var data = salesChart.data;
                            data.datasets[0].data = data_4_1;
                            data.datasets[1].data = data_4_2;
                            salesChart.update();
                        });
                    }
                    if ($("#net-profit").length) {
                        var marksCanvas = document.getElementById("net-profit");
                        var marksData = {
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                            datasets: [{
                                label: "Excepted",
                                backgroundColor: 'rgba(88, 208, 222,0.8)',
                                borderColor: 'rgba(88, 208, 222,0.8)',
                                borderWidth: 0,
                                fill: true,
                                radius: 0,
                                pointRadius: 0,
                                pointBorderWidth: 0,
                                pointBackgroundColor: 'rgba(88, 208, 222,0.8)',
                                pointHoverRadius: 10,
                                pointHitRadius: 5,
                                data: [54, 45, 60, 70, 54, 75, 60, 54]
                            }, {
                                label: "Collected",
                                backgroundColor: 'rgba(150, 77, 247,1)',
                                borderColor: 'rgba(150, 77, 247,1)',
                                borderWidth: 0,
                                fill: true,
                                radius: 0,
                                pointRadius: 0,
                                pointBorderWidth: 0,
                                pointBackgroundColor: 'rgba(150, 77, 247,1)',
                                pointHoverRadius: 10,
                                pointHitRadius: 5,
                                data: [65, 75, 70, 80, 60, 80, 36, 60]
                            }]
                        };

                        var chartOptions = {
                            scale: {
                                ticks: {
                                    beginAtZero: true,
                                    min: 0,
                                    max: 100,
                                    stepSize: 20,
                                    display: false,
                                },
                                pointLabels: {
                                    fontSize: 14
                                },
                                angleLines: {
                                    color: '#e9ebf1'
                                },
                                gridLines: {
                                    color: "#e9ebf1"
                                }
                            },
                            legend: false,
                            legendCallback: function (chart) {
                                var text = [];
                                text.push('<div class="chartjs-legend"><ul>');
                                for (var i = 0; i < chart.data.datasets.length; i++) {
                                    text.push('<li>');
                                    text.push('<span style="background-color:' + chart.data.datasets[i].backgroundColor + '">' + '</span>');
                                    text.push(chart.data.datasets[i].label);
                                    text.push('</li>');
                                }
                                text.push('</ul></div>');
                                return text.join("");
                            },
                        };

                        var radarChart = new Chart(marksCanvas, {
                            type: 'radar',
                            data: marksData,
                            options: chartOptions
                        });
                        document.getElementById('net-profit-legend').innerHTML = radarChart.generateLegend();
                    }
                    if ($('#total-revenue').length) {
                        var ctx = $('#total-revenue').get(0).getContext("2d");

                        var data = {
                            labels: [
                                "Day01",
                                "Day02",
                                "Day03",
                                "Day04",
                                "Day05",
                                "Day06",
                                "Day07",
                                "Day08",
                                "Day09",
                                "Day10",
                                "Day11",
                                "Day12",
                                "Day13",
                                "Day14",
                                "Day15",
                                "Day16",
                                "Day17",
                                "Day18",
                                "Day19",
                                "Day20",
                                "Day21",
                                "Day22",
                                "Day23",
                                "Day24",
                                "Day25",
                                "Day26",
                                "Day27",
                                "Day28",
                                "Day29",
                                "Day30",
                                "Day31",
                                "Day32",
                                "Day33",
                                "Day34",
                                "Day35",
                                "Day36",
                                "Day37",
                                "Day38",
                                "Day39",
                                "Day40",
                                "Day41",
                                "Day42",
                                "Day43",
                                "Day44",
                                "Day45",
                                "Day46",
                                "Day47",
                                "Day48",
                                "Day49",
                                "Day50",
                                "Day51",
                                "Day52",
                                "Day53",
                                "Day54",
                                "Day55",
                                "Day56",
                                "Day57",
                                "Day58",
                                "Day59",
                                "Day60",
                                "Day61",
                                "Day62",
                                "Day63",
                                "Day64",
                                "Day65",
                                "Day66",
                                "Day67",
                                "Day68",
                                "Day69",
                                "Day70",
                                "Day71",
                                "Day72",
                                "Day73",
                                "Day74",
                                "Day75",
                                "Day76",
                                "Day77",
                                "Day78",
                                "Day79",
                                "Day80",
                                "Day81",
                                "Day82"
                            ],
                            datasets: [{
                                label: 'Total Revenue',
                                data: [56,
                                    55,
                                    59,
                                    59,
                                    59,
                                    57,
                                    56,
                                    57,
                                    54,
                                    56,
                                    58,
                                    57,
                                    59,
                                    58,
                                    59,
                                    57,
                                    55,
                                    56,
                                    54,
                                    52,
                                    49,
                                    48,
                                    50,
                                    50,
                                    46,
                                    45,
                                    49,
                                    50,
                                    52,
                                    53,
                                    52,
                                    55,
                                    54,
                                    53,
                                    56,
                                    55,
                                    56,
                                    55,
                                    54,
                                    55,
                                    57,
                                    58,
                                    56,
                                    55,
                                    56,
                                    57,
                                    58,
                                    59,
                                    58,
                                    57,
                                    55,
                                    53,
                                    52,
                                    55,
                                    57,
                                    55,
                                    54,
                                    52,
                                    55,
                                    57,
                                    56,
                                    57,
                                    58,
                                    59,
                                    58,
                                    59,
                                    57,
                                    56,
                                    55,
                                    57,
                                    58,
                                    59,
                                    60,
                                    62,
                                    60,
                                    59,
                                    58,
                                    57,
                                    56,
                                    57,
                                    56,
                                    58,
                                    59
                                ],
                                borderColor: '#9B86F1',
                                backgroundColor: '#f2f2ff',
                                borderWidth: 3,
                                fill: 'origin'
                            }]
                        };
                        var lineChart = new Chart(ctx, {
                            type: 'line',
                            data: data,
                            options: {
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
                        });
                    }
                    if ($('#my-group-total-revenue').length) {
                        var ctx = $('#my-group-total-revenue').get(0).getContext("2d");

                        var data = {
                            labels: [
                                "Day01",
                                "Day02",
                                "Day03",
                                "Day04",
                                "Day05",
                                "Day06",
                                "Day07",
                                "Day08",
                                "Day09",
                                "Day10",
                                "Day11",
                                "Day12",
                                "Day13",
                                "Day14",
                                "Day15",
                                "Day16",
                                "Day17",
                                "Day18",
                                "Day19",
                                "Day20",
                                "Day21",
                                "Day22",
                                "Day23",
                                "Day24",
                                "Day25",
                                "Day26",
                                "Day27",
                                "Day28",
                                "Day29",
                                "Day30",
                                "Day31",
                                "Day32",
                                "Day33",
                                "Day34",
                                "Day35",
                                "Day36",
                                "Day37",
                                "Day38",
                                "Day39",
                                "Day40",
                                "Day41",
                                "Day42",
                                "Day43",
                                "Day44",
                                "Day45",
                                "Day46",
                                "Day47",
                                "Day48",
                                "Day49",
                                "Day50",
                                "Day51",
                                "Day52",
                                "Day53",
                                "Day54",
                                "Day55",
                                "Day56",
                                "Day57",
                                "Day58",
                                "Day59",
                                "Day60",
                                "Day61",
                                "Day62",
                                "Day63",
                                "Day64",
                                "Day65",
                                "Day66",
                                "Day67",
                                "Day68",
                                "Day69",
                                "Day70",
                                "Day71",
                                "Day72",
                                "Day73",
                                "Day74",
                                "Day75",
                                "Day76",
                                "Day77",
                                "Day78",
                                "Day79",
                                "Day80",
                                "Day81",
                                "Day82"
                            ],
                            datasets: [{
                                label: 'Total Active Member',
                                data: [56,
                                    55,
                                    59,
                                    59,
                                    59,
                                    57,
                                    56,
                                    57,
                                    54,
                                    56,
                                    58,
                                    57,
                                    59,
                                    58,
                                    59,
                                    57,
                                    55,
                                    56,
                                    54,
                                    52,
                                    49,
                                    48,
                                    50,
                                    50,
                                    46,
                                    45,
                                    49,
                                    50,
                                    52,
                                    53,
                                    52,
                                    55,
                                    54,
                                    53,
                                    56,
                                    55,
                                    56,
                                    55,
                                    54,
                                    55,
                                    57,
                                    58,
                                    56,
                                    55,
                                    56,
                                    57,
                                    58,
                                    59,
                                    58,
                                    57,
                                    55,
                                    53,
                                    52,
                                    55,
                                    57,
                                    55,
                                    54,
                                    52,
                                    55,
                                    57,
                                    56,
                                    57,
                                    58,
                                    59,
                                    58,
                                    59,
                                    57,
                                    56,
                                    55,
                                    57,
                                    58,
                                    59,
                                    60,
                                    62,
                                    60,
                                    59,
                                    58,
                                    57,
                                    56,
                                    57,
                                    56,
                                    58,
                                    59
                                ],
                                borderColor: '#19c900',
                                backgroundColor: '#f2f2ff',
                                borderWidth: 3,
                                fill: 'origin'
                            }]
                        };
                        var lineChart = new Chart(ctx, {
                            type: 'line',
                            data: data,
                            options: {
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
                        });
                    }
                    if ($('#my-contribution-total-revenue').length) {
                        var ctx = $('#my-contribution-total-revenue').get(0).getContext("2d");

                        var data = {
                            labels: [
                                "Day01",
                                "Day02",
                                "Day03",
                                "Day04",
                                "Day05",
                                "Day06",
                                "Day07",
                                "Day08",
                                "Day09",
                                "Day10",
                                "Day11",
                                "Day12",
                                "Day13",
                                "Day14",
                                "Day15",
                                "Day16",
                                "Day17",
                                "Day18",
                                "Day19",
                                "Day20",
                                "Day21",
                                "Day22",
                                "Day23",
                                "Day24",
                                "Day25",
                                "Day26",
                                "Day27",
                                "Day28",
                                "Day29",
                                "Day30",
                                "Day31",
                                "Day32",
                                "Day33",
                                "Day34",
                                "Day35",
                                "Day36",
                                "Day37",
                                "Day38",
                                "Day39",
                                "Day40",
                                "Day41",
                                "Day42",
                                "Day43",
                                "Day44",
                                "Day45",
                                "Day46",
                                "Day47",
                                "Day48",
                                "Day49",
                                "Day50",
                                "Day51",
                                "Day52",
                                "Day53",
                                "Day54",
                                "Day55",
                                "Day56",
                                "Day57",
                                "Day58",
                                "Day59",
                                "Day60",
                                "Day61",
                                "Day62",
                                "Day63",
                                "Day64",
                                "Day65",
                                "Day66",
                                "Day67",
                                "Day68",
                                "Day69",
                                "Day70",
                                "Day71",
                                "Day72",
                                "Day73",
                                "Day74",
                                "Day75",
                                "Day76",
                                "Day77",
                                "Day78",
                                "Day79",
                                "Day80",
                                "Day81",
                                "Day82"
                            ],
                            datasets: [{
                                label: 'Total Revenue',
                                data: [56,
                                    55,
                                    59,
                                    59,
                                    59,
                                    57,
                                    56,
                                    57,
                                    54,
                                    56,
                                    58,
                                    57,
                                    59,
                                    58,
                                    59,
                                    57,
                                    55,
                                    56,
                                    54,
                                    52,
                                    49,
                                    48,
                                    50,
                                    50,
                                    46,
                                    45,
                                    49,
                                    50,
                                    52,
                                    53,
                                    52,
                                    55,
                                    54,
                                    53,
                                    56,
                                    55,
                                    56,
                                    55,
                                    54,
                                    55,
                                    57,
                                    58,
                                    56,
                                    55,
                                    56,
                                    57,
                                    58,
                                    59,
                                    58,
                                    57,
                                    55,
                                    53,
                                    52,
                                    55,
                                    57,
                                    55,
                                    54,
                                    52,
                                    55,
                                    57,
                                    56,
                                    57,
                                    58,
                                    59,
                                    58,
                                    59,
                                    57,
                                    56,
                                    55,
                                    57,
                                    58,
                                    59,
                                    60,
                                    62,
                                    60,
                                    59,
                                    58,
                                    57,
                                    56,
                                    57,
                                    56,
                                    58,
                                    59
                                ],
                                borderColor: '#ff8f08',
                                backgroundColor: '#f2f2ff',
                                borderWidth: 3,
                                fill: 'origin'
                            }]
                        };
                        var lineChart = new Chart(ctx, {
                            type: 'line',
                            data: data,
                            options: {
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
                        });
                    }
                    if ($('#total-transaction').length) {
                        var ctx = document.getElementById('total-transaction').getContext('2d');
                        // var gradientStrokeFill_1 = ctx.createLinearGradient(0, 100, 200, 0);
                        // gradientStrokeFill_1.addColorStop(0, '#fa5539');
                        // gradientStrokeFill_1.addColorStop(1, '#fa3252');
                        var areaData = {
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                            datasets: [{
                                label: 'Total Transaction',
                                data: [320, 280, 300, 280, 300, 270, 350],
                                backgroundColor: gradientStrokeFill_1,
                                borderColor: '#fa394e',
                                borderWidth: 0,
                                pointBackgroundColor: "#fa394e",
                                pointRadius: 7,
                                pointBorderWidth: 3,
                                pointBorderColor: '#fff',
                                pointHoverRadius: 7,
                                pointHoverBackgroundColor: "#fa394e",
                                pointHoverBorderColor: "#fa394e",
                                pointHoverBorderWidth: 2,
                                pointHitRadius: 7,
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
                                    radius: 0
                                }
                            },
                            layout: {
                                padding: {
                                    left: -10,
                                    right: 0,
                                    top: 0,
                                    bottom: -10
                                }
                            },
                            legend: false,
                            scales: {
                                xAxes: [{
                                    gridLines: {
                                        display: false
                                    },
                                    ticks: {
                                        display: false
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        display: false
                                    },
                                    ticks: {
                                        display: false
                                    }
                                }]
                            }
                        }
                        var revenueChart = new Chart(ctx, {
                            type: 'line',
                            data: areaData,
                            options: areaOptions
                        });
                    }
                    if ($('#my-contribution-total-transaction').length) {
                        var ctx = document.getElementById('my-contribution-total-transaction').getContext('2d');
                        // var gradientStrokeFill_1 = ctx.createLinearGradient(0, 100, 200, 0);
                        // gradientStrokeFill_1.addColorStop(0, '#fa5539');
                        // gradientStrokeFill_1.addColorStop(1, '#fa3252');
                        var areaData = {
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                            datasets: [{
                                label: 'Total Transaction',
                                data: [320, 280, 300, 280, 300, 270, 350],
                                backgroundColor: gradientStrokeFill_1,
                                borderColor: '#da0d00',
                                borderWidth: 0,
                                pointBackgroundColor: "#da0d00",
                                pointRadius: 7,
                                pointBorderWidth: 3,
                                pointBorderColor: '#fff',
                                pointHoverRadius: 7,
                                pointHoverBackgroundColor: "#da0d00",
                                pointHoverBorderColor: "#da0d00",
                                pointHoverBorderWidth: 2,
                                pointHitRadius: 7,
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
                                    radius: 0
                                }
                            },
                            layout: {
                                padding: {
                                    left: -10,
                                    right: 0,
                                    top: 0,
                                    bottom: -10
                                }
                            },
                            legend: false,
                            scales: {
                                xAxes: [{
                                    gridLines: {
                                        display: false
                                    },
                                    ticks: {
                                        display: false
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        display: false
                                    },
                                    ticks: {
                                        display: false
                                    }
                                }]
                            }
                        }
                        var revenueChart = new Chart(ctx, {
                            type: 'line',
                            data: areaData,
                            options: areaOptions
                        });
                    }
                    if ($("#market-overview-chart").length) {
                        var MarketingChartCanvas = $("#market-overview-chart").get(0).getContext("2d");

                        var Marketing_data_1_1 = [145, 238, 148, 293, 242, 235, 256, 334];
                        var Marketing_data_1_2 = [330, 380, 230, 400, 309, 430, 340, 310];
                        var Marketing_data_1_3 = [375, 440, 284, 450, 386, 480, 400, 365];
                        var Marketing_data_1_4 = [425, 480, 324, 490, 426, 520, 440, 405];

                        var Marketing_data_2_1 = [125, 138, 108, 193, 102, 200, 290, 204];
                        var Marketing_data_2_2 = [330, 380, 230, 400, 309, 430, 340, 310];
                        var Marketing_data_2_3 = [375, 440, 284, 450, 386, 480, 400, 365];
                        var Marketing_data_2_4 = [425, 480, 324, 490, 426, 520, 440, 405];

                        var Marketing_data_1_1 = [145, 238, 148, 293, 242, 235, 256, 334];
                        var Marketing_data_1_2 = [330, 380, 230, 400, 309, 430, 340, 310];
                        var Marketing_data_1_3 = [375, 440, 284, 450, 386, 480, 400, 365];
                        var Marketing_data_1_4 = [425, 480, 324, 490, 426, 520, 440, 405];

                        var MarketingChart = new Chart(MarketingChartCanvas, {
                            type: 'bar',
                            data: {
                                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                                datasets: [{
                                    label: 'OVERDUE',
                                    data: Marketing_data_1_1,
                                    backgroundColor: '#826af9',
                                    borderColor: '#826af9',
                                    borderWidth: 0
                                }, {
                                    label: 'SNOOZED',
                                    data: Marketing_data_1_2,
                                    backgroundColor: '#9e86ff',
                                    borderColor: '#9e86ff',
                                    borderWidth: 0
                                },
                                    {
                                        label: 'COMPLETED',
                                        data: Marketing_data_1_3,
                                        backgroundColor: '#d0aeff',
                                        borderColor: '#d0aeff',
                                        borderWidth: 0
                                    },
                                    {
                                        label: 'OVERDUE',
                                        data: Marketing_data_1_4,
                                        backgroundColor: '#f7d2ff',
                                        borderColor: '#f7d2ff',
                                        borderWidth: 0
                                    }
                                ]
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: true,
                                layout: {
                                    padding: {
                                        left: 0,
                                        right: 0,
                                        top: 20,
                                        bottom: 0
                                    }
                                },
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            max: 400,
                                            display: true,
                                            beginAtZero: true,
                                            fontColor: "#212529",
                                            stepSize: 100
                                        },
                                        gridLines: {
                                            display: false,
                                        }
                                    }],
                                    xAxes: [{
                                        stacked: true,
                                        ticks: {
                                            beginAtZero: true,
                                            fontColor: "#212529"
                                        },
                                        gridLines: {
                                            color: "#e9ebf1",
                                            display: true
                                        },
                                        barPercentage: 0.2
                                    }]
                                },
                                legend: {
                                    display: false
                                },
                                elements: {
                                    point: {
                                        radius: 0
                                    }
                                }
                            }
                        });
                        $("#market-overview_1").click(function () {
                            var data = MarketingChart.data;
                            data.datasets[0].data = Marketing_data_1_1;
                            data.datasets[1].data = Marketing_data_1_2;
                            data.datasets[2].data = Marketing_data_1_2;
                            data.datasets[3].data = Marketing_data_1_2;
                            MarketingChart.update();
                        });
                        $("#market-overview_2").click(function () {
                            var data = MarketingChart.data;
                            data.datasets[0].data = Marketing_data_2_1;
                            data.datasets[1].data = Marketing_data_2_2;
                            data.datasets[2].data = Marketing_data_2_2;
                            data.datasets[3].data = Marketing_data_2_2;
                            MarketingChart.update();
                        });
                        $("#market-overview_3").click(function () {
                            var data = MarketingChart.data;
                            data.datasets[0].data = Marketing_data_3_1;
                            data.datasets[1].data = Marketing_data_3_2;
                            data.datasets[2].data = Marketing_data_3_2;
                            data.datasets[3].data = Marketing_data_3_2;
                            MarketingChart.update();
                        });
                    }
                    if ($("#my-group-market-overview-chart").length) {
                        var MarketingChartCanvas = $("#my-group-market-overview-chart").get(0).getContext("2d");

                        var Marketing_data_1_1 = [145, 238, 148, 293, 242, 235, 256, 334];
                        var Marketing_data_1_2 = [330, 380, 230, 400, 309, 430, 340, 310];
                        var Marketing_data_1_3 = [375, 440, 284, 450, 386, 480, 400, 365];
                        var Marketing_data_1_4 = [425, 480, 324, 490, 426, 520, 440, 405];

                        var Marketing_data_2_1 = [125, 138, 108, 193, 102, 200, 290, 204];
                        var Marketing_data_2_2 = [330, 380, 230, 400, 309, 430, 340, 310];
                        var Marketing_data_2_3 = [375, 440, 284, 450, 386, 480, 400, 365];
                        var Marketing_data_2_4 = [425, 480, 324, 490, 426, 520, 440, 405];

                        var Marketing_data_1_1 = [145, 238, 148, 293, 242, 235, 256, 334];
                        var Marketing_data_1_2 = [330, 380, 230, 400, 309, 430, 340, 310];
                        var Marketing_data_1_3 = [375, 440, 284, 450, 386, 480, 400, 365];
                        var Marketing_data_1_4 = [425, 480, 324, 490, 426, 520, 440, 405];

                        var MarketingChart = new Chart(MarketingChartCanvas, {
                            type: 'bar',
                            data: {
                                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                                datasets: [{
                                    label: 'Total Members',
                                    data: Marketing_data_1_1,
                                    backgroundColor: '#826af9',
                                    borderColor: '#826af9',
                                    borderWidth: 0
                                }, {
                                    label: 'SNOOZED',
                                    data: Marketing_data_1_2,
                                    backgroundColor: '#9e86ff',
                                    borderColor: '#9e86ff',
                                    borderWidth: 0
                                },
                                    {
                                        label: 'COMPLETED',
                                        data: Marketing_data_1_3,
                                        backgroundColor: '#d0aeff',
                                        borderColor: '#d0aeff',
                                        borderWidth: 0
                                    },
                                    {
                                        label: 'Total Members',
                                        data: Marketing_data_1_4,
                                        backgroundColor: '#f7d2ff',
                                        borderColor: '#f7d2ff',
                                        borderWidth: 0
                                    }
                                ]
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: true,
                                layout: {
                                    padding: {
                                        left: 0,
                                        right: 0,
                                        top: 20,
                                        bottom: 0
                                    }
                                },
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            max: 400,
                                            display: true,
                                            beginAtZero: true,
                                            fontColor: "#212529",
                                            stepSize: 100
                                        },
                                        gridLines: {
                                            display: false,
                                        }
                                    }],
                                    xAxes: [{
                                        stacked: true,
                                        ticks: {
                                            beginAtZero: true,
                                            fontColor: "#212529"
                                        },
                                        gridLines: {
                                            color: "#e9ebf1",
                                            display: true
                                        },
                                        barPercentage: 0.2
                                    }]
                                },
                                legend: {
                                    display: false
                                },
                                elements: {
                                    point: {
                                        radius: 0
                                    }
                                }
                            }
                        });
                        $("#market-overview_1").click(function () {
                            var data = MarketingChart.data;
                            data.datasets[0].data = Marketing_data_1_1;
                            data.datasets[1].data = Marketing_data_1_2;
                            data.datasets[2].data = Marketing_data_1_2;
                            data.datasets[3].data = Marketing_data_1_2;
                            MarketingChart.update();
                        });
                        $("#market-overview_2").click(function () {
                            var data = MarketingChart.data;
                            data.datasets[0].data = Marketing_data_2_1;
                            data.datasets[1].data = Marketing_data_2_2;
                            data.datasets[2].data = Marketing_data_2_2;
                            data.datasets[3].data = Marketing_data_2_2;
                            MarketingChart.update();
                        });
                        $("#market-overview_3").click(function () {
                            var data = MarketingChart.data;
                            data.datasets[0].data = Marketing_data_3_1;
                            data.datasets[1].data = Marketing_data_3_2;
                            data.datasets[2].data = Marketing_data_3_2;
                            data.datasets[3].data = Marketing_data_3_2;
                            MarketingChart.update();
                        });
                    }
                    if ($("#my-contribution-market-overview-chart").length) {
                        var MarketingChartCanvas = $("#my-contribution-market-overview-chart").get(0).getContext("2d");

                        var Marketing_data_1_1 = [145, 238, 148, 293, 242, 235, 256, 334];
                        var Marketing_data_1_2 = [330, 380, 230, 400, 309, 430, 340, 310];
                        var Marketing_data_1_3 = [375, 440, 284, 450, 386, 480, 400, 365];
                        var Marketing_data_1_4 = [425, 480, 324, 490, 426, 520, 440, 405];

                        var Marketing_data_2_1 = [125, 138, 108, 193, 102, 200, 290, 204];
                        var Marketing_data_2_2 = [330, 380, 230, 400, 309, 430, 340, 310];
                        var Marketing_data_2_3 = [375, 440, 284, 450, 386, 480, 400, 365];
                        var Marketing_data_2_4 = [425, 480, 324, 490, 426, 520, 440, 405];

                        var Marketing_data_1_1 = [145, 238, 148, 293, 242, 235, 256, 334];
                        var Marketing_data_1_2 = [330, 380, 230, 400, 309, 430, 340, 310];
                        var Marketing_data_1_3 = [375, 440, 284, 450, 386, 480, 400, 365];
                        var Marketing_data_1_4 = [425, 480, 324, 490, 426, 520, 440, 405];

                        var MarketingChart = new Chart(MarketingChartCanvas, {
                            type: 'bar',
                            data: {
                                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                                datasets: [{
                                    label: 'OVERDUE',
                                    data: Marketing_data_1_1,
                                    backgroundColor: '#826af9',
                                    borderColor: '#826af9',
                                    borderWidth: 0
                                }, {
                                    label: 'SNOOZED',
                                    data: Marketing_data_1_2,
                                    backgroundColor: '#9e86ff',
                                    borderColor: '#9e86ff',
                                    borderWidth: 0
                                },
                                    {
                                        label: 'COMPLETED',
                                        data: Marketing_data_1_3,
                                        backgroundColor: '#d0aeff',
                                        borderColor: '#d0aeff',
                                        borderWidth: 0
                                    },
                                    {
                                        label: 'OVERDUE',
                                        data: Marketing_data_1_4,
                                        backgroundColor: '#f7d2ff',
                                        borderColor: '#f7d2ff',
                                        borderWidth: 0
                                    }
                                ]
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: true,
                                layout: {
                                    padding: {
                                        left: 0,
                                        right: 0,
                                        top: 20,
                                        bottom: 0
                                    }
                                },
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            max: 400,
                                            display: true,
                                            beginAtZero: true,
                                            fontColor: "#212529",
                                            stepSize: 100
                                        },
                                        gridLines: {
                                            display: false,
                                        }
                                    }],
                                    xAxes: [{
                                        stacked: true,
                                        ticks: {
                                            beginAtZero: true,
                                            fontColor: "#212529"
                                        },
                                        gridLines: {
                                            color: "#e9ebf1",
                                            display: true
                                        },
                                        barPercentage: 0.2
                                    }]
                                },
                                legend: {
                                    display: false
                                },
                                elements: {
                                    point: {
                                        radius: 0
                                    }
                                }
                            }
                        });
                        $("#market-overview_1").click(function () {
                            var data = MarketingChart.data;
                            data.datasets[0].data = Marketing_data_1_1;
                            data.datasets[1].data = Marketing_data_1_2;
                            data.datasets[2].data = Marketing_data_1_2;
                            data.datasets[3].data = Marketing_data_1_2;
                            MarketingChart.update();
                        });
                        $("#market-overview_2").click(function () {
                            var data = MarketingChart.data;
                            data.datasets[0].data = Marketing_data_2_1;
                            data.datasets[1].data = Marketing_data_2_2;
                            data.datasets[2].data = Marketing_data_2_2;
                            data.datasets[3].data = Marketing_data_2_2;
                            MarketingChart.update();
                        });
                        $("#market-overview_3").click(function () {
                            var data = MarketingChart.data;
                            data.datasets[0].data = Marketing_data_3_1;
                            data.datasets[1].data = Marketing_data_3_2;
                            data.datasets[2].data = Marketing_data_3_2;
                            data.datasets[3].data = Marketing_data_3_2;
                            MarketingChart.update();
                        });
                    }
                    if ($("#realtime-statistics").length) {
                        var realtimeChartCanvas = $("#realtime-statistics").get(0).getContext("2d");
                        var realtimeChart = new Chart(realtimeChartCanvas, {
                            type: 'bar',
                            data: {
                                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                                datasets: [{
                                    label: 'Profit',
                                    data: [330, 380, 230, 400, 309, 530, 340],
                                    backgroundColor: "#0f5bff",
                                    borderColor: '#0f5bff',
                                    borderWidth: 0

                                },
                                    {
                                        label: 'Target',
                                        data: [600, 600, 600, 600, 600, 600, 600],
                                        backgroundColor: '#e5e9f2',
                                        borderColor: '#e5e9f2',
                                        borderWidth: 0
                                    }
                                ]
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: true,
                                layout: {
                                    padding: {
                                        left: 0,
                                        right: 25,
                                        top: 0,
                                        bottom: 0
                                    }
                                },
                                scales: {
                                    yAxes: [{
                                        display: false,
                                        gridLines: {
                                            display: false
                                        }
                                    }],
                                    xAxes: [{
                                        stacked: true,
                                        ticks: {
                                            display: false,
                                            beginAtZero: true,
                                            fontColor: "#354168"
                                        },
                                        gridLines: {
                                            color: "rgba(0, 0, 0, 0)",
                                            display: false
                                        },
                                        barPercentage: 0.5,
                                    }]
                                },
                                legend: {
                                    display: false
                                },
                                elements: {
                                    point: {
                                        radius: 0
                                    }
                                }
                            }
                        });
                    }
                    /* if ($("#dashboard-vmap").length) {
                     $('#dashboard-vmap').Highcharts.mapChart({
                     map: 'https://code.highcharts.com/mapdata/countries/gh/gh-all.topo.json',
                     MapZoom: '50',
                     panOnDrag: true,
                     backgroundColor: 'transparent',
                     data: [
                     ['gh-ah', 10],
                     ['gh-ep', 11],
                     ['gh-wp', 12],
                     ['gh-aa', 13],
                     ['gh-tv', 14],
                     ['gh-np', 15],
                     ['gh-ue', 16],
                     ['gh-uw', 17],
                     ['gh-ba', 18],
                     ['gh-cp', 19]
                     ],
                     focusOn: {
                     x: 0.5,
                     y: 0.5,
                     scale: 1,
                     animate: true
                     },
                     series: {
                     regions: [{
                     scale: ['#2d99ff'],
                     normalizeFunction: 'polynomial',
                     }]
                     }
                     });
                     }*/
                    if ($('#stats-line-graph-TotalGroupscount').length) {
                        var lineChartCanvas = $("#stats-line-graph-TotalGroupscount").get(0).getContext("2d");
                        var gradientStrokeFill_1 = lineChartCanvas.createLinearGradient(0, 0, 0, 50);
                        gradientStrokeFill_1.addColorStop(0, 'rgba(131, 144, 255, 0.5)');
                        gradientStrokeFill_1.addColorStop(1, '#fff');
                        var lineChart = new Chart(lineChartCanvas, {
                            type: 'line',
                            data: {
                                labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13"],
                                datasets: [{
                                    label: 'Groups',
                                    data: Groups,
                                    borderColor: '#273472',
                                    backgroundColor: gradientStrokeFill_1,
                                    borderWidth: 3,
                                    fill: true
                                }]
                            },
                            options: lineStatsOptions
                        });
                    }
                    if ($('#stats-line-graph-totalActiveGroups').length) {
                        var lineChartCanvas = $("#stats-line-graph-totalActiveGroups").get(0).getContext("2d");
                        var gradientStrokeFill_1 = lineChartCanvas.createLinearGradient(0, 0, 0, 50);
                        gradientStrokeFill_1.addColorStop(0, 'rgba(131, 144, 255, 0.5)');
                        gradientStrokeFill_1.addColorStop(1, '#fff');
                        var lineChart = new Chart(lineChartCanvas, {
                            type: 'line',
                            data: {
                                labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13"],
                                datasets: [{
                                    label: 'ActiveGroups',
                                    data: ActiveGroupscount,
                                    borderColor: '#273472',
                                    backgroundColor: gradientStrokeFill_1,
                                    borderWidth: 3,
                                    fill: true
                                }]
                            },
                            options: lineStatsOptions
                        });
                    }
                    if ($('#stats-line-graph-totalInActiveGroups').length) {
                        var lineChartCanvas = $("#stats-line-graph-totalInActiveGroups").get(0).getContext("2d");
                        var gradientStrokeFill_1 = lineChartCanvas.createLinearGradient(0, 0, 0, 50);
                        gradientStrokeFill_1.addColorStop(0, 'rgba(131, 144, 255, 0.5)');
                        gradientStrokeFill_1.addColorStop(1, '#fff');
                        var lineChart = new Chart(lineChartCanvas, {
                            type: 'line',
                            data: {
                                labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13"],
                                datasets: [{
                                    label: 'InActiveGroups',
                                    data: InActiveGroupscount,
                                    borderColor: '#273472',
                                    backgroundColor: gradientStrokeFill_1,
                                    borderWidth: 3,
                                    fill: true
                                }]
                            },
                            options: lineStatsOptions
                        });
                    }
                    if ($('#stats-line-graph-TotalPendingGroups').length) {
                        var lineChartCanvas = $("#stats-line-graph-TotalPendingGroups").get(0).getContext("2d");
                        var gradientStrokeFill_1 = lineChartCanvas.createLinearGradient(0, 0, 0, 50);
                        gradientStrokeFill_1.addColorStop(0, 'rgba(131, 144, 255, 0.5)');
                        gradientStrokeFill_1.addColorStop(1, '#fff');
                        var lineChart = new Chart(lineChartCanvas, {
                            type: 'line',
                            data: {
                                labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13"],
                                datasets: [{
                                    label: 'Groups',
                                    data: PendingGroups,
                                    borderColor: '#273472',
                                    backgroundColor: gradientStrokeFill_1,
                                    borderWidth: 3,
                                    fill: true
                                }]
                            },
                            options: lineStatsOptions
                        });
                    }
                    if ($('#dashboard-guage-chart').length) {
                        var g3 = new JustGage({
                            id: 'dashboard-guage-chart',
                            value: 65,
                            min: 0,
                            max: 100,
                            symbol: '%',
                            pointer: true,
                            gaugeWidthScale: 1,
                            customSectors: [{
                                color: '#ff0000',
                                lo: 50,
                                hi: 100
                            }, {
                                color: '#00ff00',
                                lo: 0,
                                hi: 50
                            }],
                            counter: true
                        });
                    }
                }
            });
        });
    })(jQuery);
    load_credit_profile_details_in_main_dashboard();

    group_expiry();
});

$(function () {
    $(".edit").tooltip(1000);
});


function move() {
    var elem = document.getElementById("AdminmyBar");
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

loadGroupList();
function loadGroupList() {
    $.ajax({
        type: "POST",
        url: "/load_group_list/",
        async: false,
        success: function (data) {
            var group_list = data.group_list;
            $('#dashboard_group_list > tbody').empty();
            var row = '';
            for (var i = 0; i < group_list.length; i++) {
                var group_name = (group_list[i].g_name);
                var group_id = (group_list[i].g_id);
                row += '<tr class="content hideContent' + i + 1 + '">' +
                    '<td class="py-1">' +
                    '               <img src="/static/group_icon/' + group_name + "_" + group_id + '.jpg" class="" alt="image" style="border-radius: 50%"></td>' +
                    '                                        <td>' + group_list[i].g_name + '</td>' +
                    '                                        <td class="text-center">' + '<button type="button" class="btn btn-danger btn-sm join_group" id="' + group_list[i].g_id + '"><i class="fa fa-user-plus"></i>Join</button> ' +
                    '   </tr>';
            }
            $('#dashboard_group_list > tbody').append(row);

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
    $('.join_group').click(function () {
        var group_id = $(this).attr('id');
        $(".gorup_details_modal").modal('show');
        $(".join_group_now").val(group_id);
        grp_regd_no(group_id);
    });
    $(".join_group_now").click(function () {
        var group_id = $(this).val();
        joinGroup(group_id);
        $("#close").click()
    });

}
function change_date_format(formatDate) {
    var changed_date = moment(formatDate).format("YYYY-MM-DD");
    if (changed_date === 'Invalid date') {
        return "";
    } else {
        return changed_date;
    }
}

function joinGroup(group_id) {
    var user_id = $("#group_list_user_id").val();
    var group_user_details = {
        'join_group_user_details': JSON.stringify({
            'user_id': user_id,
            'group_id': group_id
        })
    };
    $.ajax({
        type: "POST",
        url: "/join_group/",
        data: group_user_details,
        async: false,
        success: function (data) {
            if (data.result === 'join') {
                swal('', data.msg, 'success');
            } else if (data.result === 'join_again') {
                swal('', data.msg, 'success');
            } else if (data.result === 'joined') {
                swal('', data.msg, 'info');
            }
        },
        error: function (error) {
            swal({
                title: "Error",
                text: "Error while Adding Group Setting",
                icon: "error",
                dangerMode: true
            });
        }
    })
}

function grp_regd_no(group_id) {
    $("#qrcode, #grp_regd_no, #group_description, #grp_name" +
        "#grp_estd, #grp_country, #grp_type, #grp_type, #ga_office_address," +
        "#ga_city, #ga_zip_code, #ga_district, #ga_state, #ga_street_name" +
        "#ga_house_no").empty();
    $.ajax({
        type: "POST",
        url: "/load_group_details/",
        data: {'group_id': group_id},
        async: false,
        success: function (data) {
            if (data.result === 'success') {
                var each_group_details = data.each_group_details[0];
                var each_group_address = data.each_group_address[0];
                var each_group_setting_details = data.each_group_setting_details[0];
                var qr_details = data.each_group_details;

                $('#grp_regd_no').text(each_group_details.g_registration_no);
                $('#group_description').text(each_group_details.g_group_description);
                $('#grp_name').text(each_group_details.g_name);
                $('#grp_estd').text(change_date_format(each_group_details.g_date_of_establishment));
                $('#grp_country').text(each_group_details.country_id__country_name + "( " + each_group_details.country_id__country_code + " )");
                $('#grp_type').text(each_group_details.gt_id__gt_name);
                $('#grp_activity_code').text(each_group_details.g_principal_activity_code);
                
                if (each_group_address !== undefined){
                    $('#ga_office_address').text(each_group_address.ga_registered_office_address);
                    $('#ga_city').text(each_group_address.ga_city);
                    $('#ga_zip_code').text(each_group_address.ga_zip_code);
                    $('#ga_district').text(each_group_address.ga_district);
                    $('#ga_state').text(each_group_address.ga_state);
                    $('#ga_street_name').text(each_group_address.ga_street_name);
                    $('#ga_house_no').text(each_group_address.ga_house_no);
                }
                else{
                    $('#ga_office_address').text("Address is Not Available");
                }
               

                var g_id = (each_group_details.g_id);
                var g_name = (each_group_details.g_name);
                var full_path = "";
                if (each_group_setting_details.gss_icon_path !== '' && each_group_setting_details.gss_icon_path !== null){
                    full_path = "/static/group_icon/" + g_name + '_' + g_id + '.jpg';
                }
                else{
                    full_path = "/static/assets/images/letter-m.png";
                }
                $(".group-img").attr("src", full_path);
                $('#grp_total_member').text(data.totalMembers);

                var QR_CODE = new QRCode("qrcode", {
                    width: 200,
                    height: 200,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
                QR_CODE.makeCode("Registration No : " + qr_details[0]['g_registration_no'] + " \n " + "Group Name : " + qr_details[0]['g_name'] + " \n " + "Date Of Estd : " + qr_details[0]['g_date_of_establishment'] + " \n " + "Activity Code : " + qr_details[0]['g_principal_activity_code']);

            }
        },
        error: function (error) {
            swal({
                title: "Error",
                text: "Error while showing data",
                icon: "error",
                dangerMode: true
            });
        }
    });
}

function exportHTML() {
    var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>" +
        "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    var footer = "</body></html>";
    var sourceHTML = header + document.getElementById("expert-dashboard-page").innerHTML + footer;

    var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'document.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
}

function generatePDF() {
    var element = document.getElementById('expert-dashboard-page');
    html2pdf().from(element).save();
}


function pendingGroups() {
    $.ajax({
        type: "POST",
        url: "/pending_groups/",
        async: false,
        success: function (data) {
            var group_list = data.group_list;
            $('#pending_groups > tbody').empty();
            var row = '';
            for (var i = 0; i < group_list.length; i++) {
                row += '<tr>' +
                    '<td class="py-1">' +
                    '                                        <td>' + group_list[i].g_name + '</td>' +
                    '                                        <td class="text-center">' + '<button type="button" class="btn btn-sm grp_details" id="' + group_list[i].g_id + '">View</button></td>' +
                    '   </tr>';
            }
            $('#pending_groups > tbody').append(row);
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

    $('.grp_details').click(function () {
        var group_id = $(this).attr('id');
        $("#approve_group").val(group_id);
        $("#reject_group").val(group_id);
        $(".gorup_details_modal").modal('show');
        $(".join_group_now").hide();
        // $(".conditioncheck").removeClass('col-7');
        $(".conditioncheck").addClass('d-none');
        grp_regd_no(group_id);

    });

}

function approved_groups() {
    $.ajax({
        type: "POST",
        url: "/pending_groups/",
        async: false,
        success: function (data) {
            var group_Appoved_list = data.group_Appoved_list;
            $('#approved_groups > tbody').empty();
            var row = '';
            for (var i = 0; i < group_Appoved_list.length; i++) {
                row += '<tr>' +
                    '<td class="py-1">' +
                    '                                        <td>' + group_Appoved_list[i].g_name + '</td>' +
                    '                                        <td class="text-center">' + '<button type="button" class="btn btn-sm grp_details" id="' + group_Appoved_list[i].g_id + '">View</button></td>' +
                    '   </tr>';
            }

            $('#approved_groups > tbody').append(row);
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

    $('.grp_details').click(function () {
        var group_id = $(this).attr('id');
        $("#approve_group").val(group_id);
        $("#reject_group").val(group_id);
        $(".gorup_details_modal").modal('show');
        $(".join_group_now").hide();
        $(".conditioncheck").addClass('d-none');
        grp_regd_no(group_id);

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
            downloadFile(file, filepath);


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


function load_credit_profile_details_in_main_dashboard() {
    $.ajax({
        type: "POST",
        url: "/load_credit_profile_details/",
        async: false,
        success: function (data) {
            var cp_details = data.cp_details;
            var user_role = data.user_role;
            $('#loan_details_in_main_dashboard > tbody').empty();
            if (user_role === 'AD') {
                var row = '';
                for (var i = 0; i < cp_details.length; i++) {
                    row += '<tr>' +
                        '                                        <td>' + cp_details[i].u_id__u_name + '</td>' +
                        '                                        <td>' + "Business" + '</td>' +
                        '                                        <td>' + change_date_format(cp_details[i].cp_createdDate) + '</td>' +
                        '                                        <td>' + cp_details[i].cp_loan_amount + '</td>' +
                        '                                        <td>' + cp_details[i].cp_currency + '</td>' +
                        '                                        <td>' + cp_details[i].cp_status + '</td>' +
                        '   </tr>';
                }
                $('#loan_details_in_main_dashboard > tbody').append(row);
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

    $(".edit_loan").click(function () {
        var cp_id = $(this).attr('id');
        window.location.href = '/update_credit_profile/' + cp_id + "/"
    });

    $(".open_loan").click(function () {
        var cp_id = $(this).attr('id');
        window.location.href = '/admin_update_credit_profile/' + cp_id + "/"
    });

    $(".delete_loan").click(function () {
        var cp_id = $(this).attr('id');
        delete_credit_profile_details(cp_id)
    });

    $('#applied_loan_table').DataTable()
}

$(function () {
    $("#datepicker").datepicker({
        autoclose: true,
        format: "yyyy-mm-dd",
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
function group_expiry() {
    $.ajax({
        type: "POST",
        url: "/expire_group/",
        async: true,
        success: function (data) {
            if (data.result === 'success') {
                return true
            }
        }
    });
}
