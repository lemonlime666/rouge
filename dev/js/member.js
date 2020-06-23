$(document).ready(function(){
    $(".mem_content .mem_tabcontent").hide();
    $(".mem_content .mem_tabcontent:first-child").show();


    $("ul li").click(function(){
        $("ul li").removeClass("mem_active");
        $(this).addClass("mem_active");

        var M_current_tab_value = $(this).attr("data-list");
        $(".mem_content .mem_tabcontent").hide();
        $("."+  M_current_tab_value).fadeIn("slow");
    });

});