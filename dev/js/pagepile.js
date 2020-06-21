//pagepile
$(document).ready(function () {
    $('#pagepiling').pagepiling({
        menu: null,
        direction: 'horizontal',
        scrollingSpeed: 1200,
        loopBottom: true,
        navigation: {
            'textColor': '#efefef',
            'bulletsColor': '#efefef',
            'position': 'right',
            'tooltips': ['','HOME', 'LIPS', 'MAKEUP', 'CARE', 'STEP', 'CARD', 'VOTE']
        },
        //normalScrollElements: '.scrollbox',
    });
    $('#pp-nav ul li:nth-child(1)').css({opacity:0});
});
//pagepile

// tilt
$(document).ready(function () {
    $('.tryTilt').tilt({
        maxTilt: 30,
        perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
        //easing: "cubic-bezier(.03,.98,.52,.99)",// Easing on enter/exit.
        //scale: 1.5, // 2 = 200%, 1.5 = 150%, etc..
        speed: 1000, // Speed of the enter/exit transition.
        transition: true, // Set a transition on enter/exit.
        // disableAxis: null, // What axis should be disabled. Can be X or Y.
        // reset: true, // If the tilt effect has to be reset on exit.
        glare: true, // Enables glare effect
        maxGlare: .1, // From 0 - 1.
        // reverse:true,
    })
})
// tilt
