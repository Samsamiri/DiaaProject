// Get the current year for the copyright
$('#year').text(new Date().getFullYear());

// Configure Slider
$('.carousel').carousel({
    interval: 2000,
    pause: 'null'
});

// Lightbox Init
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

// Toggle Navbar Transparency
$(window).scroll(function () {
    if ($(this).scrollTop() > 30) {
        $('.navbar').addClass('opaque');
    } else {
        $('.navbar').removeClass('opaque');
    }
});

//SCROLLING
// Sélectionnez l'élément sur lequel vous souhaitez cliquer pour le défilement doux
const enSavoirPlusButton = document.querySelector('.smooth-scroll');

// Sélectionnez la cible du défilement doux (votre section "A propos")
const aProposSection = document.getElementById('aPropos');

// Durée du défilement en millisecondes (par exemple, 1000 ms équivaut à 1 seconde)
const dureeDuDefilement = 1000; // Vous pouvez ajuster cette valeur

// Ajoutez un gestionnaire d'événement au clic sur le bouton "En savoir plus"
enSavoirPlusButton.addEventListener('click', function() {
    const positionDebut = window.pageYOffset;
    const positionFin = aProposSection.getBoundingClientRect().top + window.pageYOffset - 90;
    const distance = positionFin - positionDebut;
    let debut = null;

    function animationDefilement(timestamp) {
        if (!debut) debut = timestamp;
        const tempsEcoule = timestamp - debut;
        window.scrollTo(0, positionDebut + easeInOutCubic(tempsEcoule, 0, distance, dureeDuDefilement));
        if (tempsEcoule < dureeDuDefilement) {
            requestAnimationFrame(animationDefilement);
        }
    }

    function easeInOutCubic(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    }

    requestAnimationFrame(animationDefilement);
});



