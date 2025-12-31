// =============================================
// INITIALISATION DES ICÔNES LUCIDE
// Charge et affiche les icônes vectorielles
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    // Remplace tous les éléments [data-lucide] par leurs icônes SVG
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// =============================================
// GÉNÉRATION DES PARTICULES EN ARRIÈRE-PLAN
// Crée un effet visuel de particules flottantes
// =============================================

// Récupération du conteneur des particules
const particlesContainer = document.getElementById('particles');

// Boucle pour créer 50 particules
for (let i = 0; i < 50; i++) {
    // Création d'un élément div pour chaque particule
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Position horizontale aléatoire (0-100%)
    particle.style.left = Math.random() * 100 + '%';
    
    // Position verticale aléatoire (0-100%)
    particle.style.top = Math.random() * 100 + '%';
    
    // Délai d'animation aléatoire (0-20 secondes)
    particle.style.animationDelay = Math.random() * 20 + 's';
    
    // Durée d'animation aléatoire (15-25 secondes)
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    
    // Ajout de la particule au conteneur
    particlesContainer.appendChild(particle);
}

// =============================================
// NAVIGATION FLUIDE (SMOOTH SCROLL)
// Gère le défilement fluide vers les sections au clic
// =============================================

// Sélection de tous les liens commençant par "#"
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Ajout d'un écouteur d'événement sur chaque lien
    anchor.addEventListener('click', function (e) {
        // Empêche le comportement par défaut du lien
        e.preventDefault();
        
        // Récupère l'élément cible à partir de l'attribut href
        const target = document.querySelector(this.getAttribute('href'));
        
        // Si l'élément cible existe
        if (target) {
            // Défilement fluide vers l'élément
            target.scrollIntoView({
                behavior: 'smooth',  // Animation de défilement
                block: 'start'       // Aligne en haut de la fenêtre
            });
        }
    });
});

// =============================================
// ANIMATION AU SCROLL (INTERSECTION OBSERVER)
// Fait apparaître les éléments progressivement lors du défilement
// =============================================

// Configuration de l'observateur d'intersection
const observerOptions = {
    threshold: 0.1,                    // Déclenche quand 10% de l'élément est visible
    rootMargin: '0px 0px -50px 0px'   // Marge inférieure de 50px
};

// Création de l'observateur
const observer = new IntersectionObserver(function(entries) {
    // Pour chaque élément observé
    entries.forEach(entry => {
        // Si l'élément entre dans la zone visible
        if (entry.isIntersecting) {
            // Ajout de la classe 'visible' pour déclencher l'animation
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer tous les éléments avec la classe 'fade-in'
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// =============================================
// GESTION DU FORMULAIRE DE CONTACT
// Traite la soumission du formulaire
// =============================================

// Récupération du formulaire par son ID
const contactForm = document.getElementById('contactForm');

// Ajout d'un écouteur sur la soumission du formulaire
contactForm.addEventListener('submit', function(e) {
    // Empêche le rechargement de la page
    e.preventDefault();
    
    // Récupération des valeurs des champs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validation simple : vérifier que les champs ne sont pas vides
    if (name && email && message) {
        // Message de confirmation personnalisé
        alert(`Merci ${name} ! Votre message a été envoyé.\nNous vous répondrons à ${email} dans les plus brefs délais.`);
        
        // Réinitialisation du formulaire
        contactForm.reset();
        
        // REMARQUE : Dans un vrai projet, vous enverriez les données à un serveur
        // Exemple avec fetch() :
        /*
        fetch('votre-api-endpoint.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
        })
        .then(response => response.json())
        .then(data => {
            alert('Message envoyé avec succès !');
            contactForm.reset();
        })
        .catch(error => {
            alert('Erreur lors de l\'envoi du message.');
            console.error('Erreur:', error);
        });
        */
    } else {
        // Message d'erreur si des champs sont vides
        alert('Veuillez remplir tous les champs du formulaire.');
    }
});

// =============================================
// ANIMATION DES CARTES DE PROJET (EFFET TILT 3D)
// Ajoute un effet de parallaxe léger au survol des cartes
// =============================================

// Sélection de toutes les cartes de projet
document.querySelectorAll('.project-card').forEach(card => {
    
    // Événement lors du mouvement de la souris sur la carte
    card.addEventListener('mousemove', function(e) {
        // Récupération des dimensions et position de la carte
        const rect = this.getBoundingClientRect();
        
        // Position X de la souris par rapport à la carte
        const x = e.clientX - rect.left;
        
        // Position Y de la souris par rapport à la carte
        const y = e.clientY - rect.top;
        
        // Calcul du centre de la carte
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calcul de la rotation X (vertical)
        // Plus la souris est haute, plus la carte bascule vers l'avant
        const rotateX = (y - centerY) / 20;
        
        // Calcul de la rotation Y (horizontal)
        // Plus la souris est à gauche, plus la carte bascule à droite
        const rotateY = (centerX - x) / 20;
        
        // Application de la transformation 3D
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    // Événement lorsque la souris quitte la carte
    card.addEventListener('mouseleave', function() {
        // Retour à la position normale (sans rotation)
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// =============================================
// EFFET DE CHANGEMENT DE COULEUR DE LA NAVIGATION
// Change l'opacité de la navigation selon le scroll
// =============================================

// Variable pour stocker la position de scroll précédente
let lastScrollTop = 0;

// Récupération de l'élément de navigation
const nav = document.querySelector('nav');

// Événement lors du défilement de la page
window.addEventListener('scroll', function() {
    // Position actuelle du scroll
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Si on défile vers le bas
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Augmente légèrement l'opacité du fond
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        // Revient à l'opacité normale
        nav.style.background = 'rgba(10, 10, 15, 0.8)';
    }
    
    // Mise à jour de la position précédente
    lastScrollTop = scrollTop;
});

// =============================================
// ANIMATION DE COMPTEUR POUR LES STATISTIQUES
// Anime les chiffres qui s'incrémentent progressivement
// =============================================

// Fonction pour animer un compteur de 0 à sa valeur finale
function animateCounter(element, target, duration = 2000) {
    // Valeur de départ
    let start = 0;
    
    // Temps de début de l'animation
    const startTime = performance.now();
    
    // Fonction d'animation récursive
    function update(currentTime) {
        // Temps écoulé depuis le début
        const elapsedTime = currentTime - startTime;
        
        // Progression de l'animation (0 à 1)
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Calcul de la valeur actuelle avec effet d'accélération
        const current = Math.floor(progress * target);
        
        // Mise à jour du texte de l'élément
        element.textContent = current;
        
        // Si l'animation n'est pas terminée, continuer
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // Afficher la valeur finale exacte
            element.textContent = target;
        }
    }
    
    // Démarrage de l'animation
    requestAnimationFrame(update);
}

// Observer les cartes de statistiques pour déclencher l'animation
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        // Si la carte devient visible
        if (entry.isIntersecting) {
            // Récupération de l'élément contenant le chiffre
            const statNumber = entry.target.querySelector('.stat-number');
            
            // Récupération de la valeur cible (texte actuel)
            const targetValue = parseInt(statNumber.textContent);
            
            // Si c'est un nombre valide
            if (!isNaN(targetValue)) {
                // Lancement de l'animation du compteur
                animateCounter(statNumber, targetValue);
                
                // Arrêt de l'observation pour ne pas répéter l'animation
                statsObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 }); // Déclenche quand 50% de la carte est visible

// Observer toutes les cartes de statistiques
document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// =============================================
// MESSAGE DE CONFIRMATION DANS LA CONSOLE
// Affiche un message pour confirmer que le script est chargé
// =============================================
console.log('Portfolio chargé avec succès ! 🚀');
console.log('Tous les scripts sont opérationnels.');

// =============================================
// DÉTECTION DU MODE SOMBRE DU SYSTÈME
// (Optionnel) Détecte si l'utilisateur préfère le mode sombre
// =============================================

// Vérification de la préférence système
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('Mode sombre détecté ✓');
}

// Écoute des changements de préférence
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        console.log('Passage en mode sombre');
    } else {
        console.log('Passage en mode clair');
    }
});



