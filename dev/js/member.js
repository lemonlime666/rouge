$(document).ready(function(){


    //最外層會員資料大tab start
    $(".mem_content .mem_tabcontent").hide();
    $(".mem_content .mem_tabcontent:first-child").show();

    // maintabclick function
    $("ul li").click(function(){
        $("ul li").removeClass("mem_active");
        $(this).addClass("mem_active");

        var M_current_tab_value = $(this).attr("data-list");
        $(".mem_content .mem_tabcontent").hide();
        $("."+  M_current_tab_value).fadeIn("slow");
    });
    //最外層會員資料大tab start end

    // 訂單紀錄 tab start
    $(".mem_buycontent .mem_buy").hide();
    $(".mem_buycontent .mem_buy:first-child").show();

    $(".mem_buybtn").click(function(){
        $(".mem_detailGroupbtn button").removeClass(".mem_buybtn" );
        $(".mem_detailGroupbtn button").removeClass("mem_buyactive" );
        $(this).addClass("mem_buyactive");

        var M_current_buy_value = $(this).attr("data-list");
        $(".mem_buycontent .mem_buy").hide();
        $("."+  M_current_buy_value).slideDown(1000);
    });
    // 訂單紀錄 tab end

    // Create 訂單查詢細項 table start
    var createTableArray = [
        {'ordernumber':'000001','orderdate':'2020/06/06','sataus':'0:未送出','totalprice':'3000','adress':'桃園中壢','info':'<a href="#">詳細資料</a>'},
        {'ordernumber':'000002','orderdate':'2020/06/10','sataus':'1:運送中','totalprice':'6500','adress':'桃園中壢','info':'<a href="#">詳細資料</a>'},
        {'ordernumber':'000003','orderdate':'2020/06/20','sataus':'2:已送達','totalprice':'1200','adress':'桃園中壢','info':'<a href="#">詳細資料</a>'},
    ]
    //最後一步印出表格
    mem_CreateTable(createTableArray);

    function mem_CreateTable(data){
        var mem_table = document.getElementById('mem_buydetail_info')
        // 製作列-迴圈
        for(i=0;i<data.length;i++){
            var row = `<tr>
                            <td>${data[i].ordernumber}</td>
                            <td>${data[i].orderdate}</td>
                            <td>${data[i].sataus}</td>
                            <td>${data[i].totalprice}</td>
                            <td>${data[i].adress}</td>
                            <td>${data[i].info}</td>
                        </tr>`
                        // 資料加進表格
                        mem_table.innerHTML += row
        }
    }
    // Create 訂單查詢細項 table end

});