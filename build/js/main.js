$(document).ready(function() {

    $('.left-side').css("background-image", "url(img/quiz/img-1.jpg)");


    $('#checkbox-6').on('input', textareaFocus);
    $('#checkbox-9').on('input', textareaFocus);
    function textareaFocus() {
        if($(this).prop('checked')){
            $("textarea").prop('disabled', false).focus();
            console.log(2);
            return false;
        }
        console.log(1);
        $("textarea").prop('disabled', true);
    };

    var i = 1;
    $( ".fieldset input:checkbox" ).on('input', function () {
        if($( ".fieldset:eq("+(i-1)+")  input:checkbox:checked" ).length) {
            $('.next').prop('disabled', false);
            return false;
        }
        $('.next').prop('disabled', true);

    });

    $('.next').click(function () {
        i++;
        $(this).parent('.fieldset').hide();
        $(this).parent('.fieldset').next('.fieldset').css({opacity: 0, display: 'flex'}).animate({
            opacity: 1
        }, 300);

        $('.left-side').css("background-image", "url(img/quiz/img-" + i +".jpg");
        $('.left-side').children('img').attr("src","img/quiz/steps/step-" + i + ".png");

        $('.quiz-progress').children('.step.active').toggleClass("active").next('.step').toggleClass("active");

        $('.next').prop('disabled', true);
        $("textarea").prop('disabled', true);
    });



    $('.modal-1').click(function () {
       $('#modal-1').modal({
           fadeDuration: 300
       });
    });

    //Social parallax
    var parallax = $('#parallax');
    $(window).scroll(function() {
        var x = $(this).scrollTop();
        parallax.css('background-position', '0% ' + parseInt(-x / 50) + 'px');
    });

    //Script for burger
    const menuToggle = document.querySelector('.menuToggle');
    function addClassFunSix() {
        this.classList.toggle("clickmenuToggle");
    }
    menuToggle.addEventListener('click', addClassFunSix);
    $('.menuToggle').click(function () {
        $(".menu").slideToggle();
    });

    //Group big listst
    var $tdm = $('.services-row');
    var $max = 5;
    // Перебераем все .tdm
    var $i = 0;
    $tdm.each(function () {
        $i++;
        // Получаем все пункты li в .tdm
        var $item = $(this).find('li'),
            // С помощью фильтра выбираем все пункты, которые идут после пятого
            $item_target = $item.filter(function () {
                return $(this).index() > $max-1;
            });
        // Создаём ссылку, по нажатию на которую будут показываться все пункты
        var $link = [];
        $link[$i] = $('<a class="all-list">Развернуть весь список</a>').click(function () {
            // Показываем скрытые пункты
            $item_target.slideToggle();
            // Переименовываем кнопку
            if($(this).text() == "Свернуть весь список") {
                $(this).text("Развернуть весь список");
            } else {
                $(this).text("Свернуть весь список");
                $(this).toggleClass("active");
            }
            // Блокируем все последущие действия ссылки
            return false;
        });
        // Скрываем пункты, которые идут после пятого и добавляем перед шестым пунктом ссылку, с помощью которой покажем скрытые пункты
        $item_target.hide().eq(0).parent().after($link[$i]);
    });

    $('#to-top').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
    // Smooth to top action
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#to-top').fadeIn('slow');
        } else {
            $('#to-top').fadeOut('slow');
        }});

    // Smooth the scroll action
    smoothScroll();
    function smoothScroll() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1500);
                    return false;
                }
            }
        });
    }


});