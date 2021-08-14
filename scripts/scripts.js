$(document).ready(function(){

    const faders = document.querySelectorAll(".fade-in");
    const sliders = document.querySelectorAll(".slide-in");

    var body = document.body;
    body.classList.add('appear');

    //OwlCarousel 2 initiation and settings
    $('.owl-carousel-slider').owlCarousel({
        loop:true,
        items: 1,
        autoplay: false,
        autoplayHoverPause: true,
        dots: false,
    });

    $('.owl-carousel-banner').owlCarousel({
        loop:true,
        items: 1,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 1200,
        slideTransition: 'linear',
        autoplayHoverPause: false,
        dots: false,
    });

    //Hide navbar on scroll and change color
    var navbar = document.getElementById("navbar");
    var prevScrollpos = window.pageYOffset;

    window.onscroll = function(){
        if (window.pageYOffset >=200){
            navbar.classList.add("my-bg-black");
            navbar.classList.remove("my-bg-transparent");            
        }
        else {
            navbar.classList.add("my-bg-transparent");
            navbar.classList.remove("my-bg-black");           
        }

        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-56px";
        }
        prevScrollpos = currentScrollPos;
    }

    const fadeinOptions = {
        threshold: .25,
        rootMargin: "0px 0px 0px 0px"
      };
      
      const appearOnScroll = new IntersectionObserver(function(
        entries,
        appearOnScroll
      ) {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            return;
          } else {
            entry.target.classList.add("appear");
            appearOnScroll.unobserve(entry.target);
          }
        });
      },
      fadeinOptions);
      
      faders.forEach(fader => {
        appearOnScroll.observe(fader);
      });


      const slideinOptions = {
        threshold: .03,
        rootMargin: "0px 0px 0px 0px"
      };
      
      const slideinOnScroll = new IntersectionObserver(function(
        entries,
        appearOnScroll
      ) {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            return;
          } else {
            entry.target.classList.add("appear");
            slideinOnScroll.unobserve(entry.target);
          }
        });
      },
      slideinOptions);

      sliders.forEach(slider => {
        slideinOnScroll.observe(slider)
      });


      document.querySelector("form").addEventListener("submit", handleSubmit);

      const handleSubmit = (e) => {
        e.preventDefault()
        let myForm = document.getElementById('contact-form');
        let formData = new FormData(myForm)
        fetch('/', {
          method: 'POST',
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString()
        }).then(() => console.log('Form successfully submitted')).catch((error) =>
          alert(error))
      }
});