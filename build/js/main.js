$(document).ready(function() {

    var servicesArray = document.querySelectorAll('.service');
    console.log(servicesArray.length);
    for (var i = 0; i <= servicesArray.length; i++) {
        var liArray = servicesArray[i].querySelectorAll('li');
        if(liArray.length > 5) {
            servicesArray[i].innerHTML += "<a class=\"all-list\">Развернуть весь список</a>";

            for (var j = 5; j >= liArray.lenght; j++) {
                // liArray[j].style.display = "none";
            }
        }
            console.log(servicesArray[i]);

    }

	// Action form onSubmit
  function call() {
 	  var msg = $(this).serialize();
 	  //var msg = $(form-id).serialize();
    $.ajax({
      type: 'POST',
      url: '../components/send.php',
      data: msg,
      success: function(data) {
        alert('Всё круто!');
      },
      error:  function(xhr, str){
  			alert('Возникла ошибка: ' + xhr.responseCode);
      }
    });
  }

	// Smooth to top action
	$(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
          $('.back-to-top').fadeIn('slow');
      } else {
          $('.back-to-top').fadeOut('slow');
      }
  });

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