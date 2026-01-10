/**
 * SERRA D'EQUACIONS - Lògica de Control Premium
 * Gestiona la navegació SPA, el menú lateral i els filtres de cerca.
 */

// 1. GESTIÓ DEL LOADER INICIAL
// S'assegura que la pantalla de càrrega desaparegui quan tot el contingut estigui llest.
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 800); // Temps de cortesia per a una transició suau
});

// 2. CONTROL DEL MENÚ LATERAL (SIDEBAR)
function openNav() {
    const sidebar = document.getElementById("mySidebar");
    sidebar.style.width = "350px";
    // Afegim un overlay si fos necessari o bloquegem el scroll
    document.body.style.overflowY = "hidden";
}

function closeNav() {
    const sidebar = document.getElementById("mySidebar");
    sidebar.style.width = "0";
    document.body.style.overflowY = "auto";
}

// 3. NAVEGACIÓ ENTRE PÀGINES (SISTEMA SPA - Single Page Application)
// Aquesta funció amaga la pàgina actual i mostra la seleccionada sense recarregar.
function anarA(idDesti) {
    // Tanquem el menú lateral per si està obert
    closeNav();

    // Mostrem el loader breument per donar sensació de canvi de secció
    const loader = document.getElementById('loader');
    loader.style.display = 'flex';
    loader.style.opacity = '1';

    setTimeout(() => {
        // Seleccionem totes les seccions amb la classe .page
        const pagines = document.querySelectorAll('.page');
        
        // Les ocultem totes
        pagines.forEach(p => {
            p.classList.remove('active');
        });

        // Activem només la que ens interessa
        const seccioDesti = document.getElementById(idDesti);
        if (seccioDesti) {
            seccioDesti.classList.add('active');
            
            // Tornem el scroll a la part superior
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });
        } else {
            console.error(`Error: No s'ha trobat la secció amb ID "${idDesti}". Revisa l'HTML.`);
        }

        // Amaguem el loader
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 400);

    }, 500); // Temps del canvi visual
}

// 4. FILTRE DE CERCA INTEL·LIGENT (HOME)
// Permet a l'usuari trobar cursos o temes en temps real des de la barra de cerca.
function filtrarContingut() {
    const input = document.getElementById('mainCercador');
    const filtre = input.value.toLowerCase();
    
    // Busquem en les targetes de l'ESO
    const targetesESO = document.querySelectorAll('.course-card');
    targetesESO.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (text.includes(filtre)) {
            card.style.display = "block";
            card.style.opacity = "1";
        } else {
            card.style.opacity = "0.1";
            // Després de l'animació d'opacitat, ho traiem del flux
            setTimeout(() => {
                if(card.style.opacity === "0.1") card.style.display = "none";
            }, 300);
        }
    });

    // Busquem en les files de Batxillerat
    const filesBat = document.querySelectorAll('.branch-item');
    filesBat.forEach(item => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(filtre) ? "flex" : "none";
    });

    // Amagar títols de secció si no hi ha resultats
    const seccions = document.querySelectorAll('.overlap-section .section-title');
    seccions.forEach(titol => {
        // Lògica opcional: amagar el títol si tot el seu grid és buit
    });
}

// 5. INTERACCIONS EXTRA: Tancament amb tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        closeNav();
    }
});

// 6. DETECCIÓ DE CLICS FORA DEL MENÚ
window.onclick = function(event) {
    const sidebar = document.getElementById("mySidebar");
    if (event.target == sidebar) {
        closeNav();
    }
}