document.querySelector('#dep').addEventListener('input', function(e){
    demarrage(e, '#dep')
})

document.querySelector('#dest').addEventListener('input', function(e){
    demarrage(e, '#dest')
})

function demarrage(e, id){
    const ul_existance = document.querySelector('#ul_rech')
    if(ul_existance){
        ul_existance.remove()
    }
    if(e.target.value.length > 3){
        console.log("Lancer le recherche");
        rechercheVille(e.target.value, id)
    }
}

async function rechercheVille(ville, id){
    if(id === '#dep'){
        document.querySelector('.loader1').style.display = 'block'
    }else{
        document.querySelector('.loader2').style.display = 'block'
    }
    
    const bbox = "46.6,-19.5,48.5,-17.5"
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(ville)}&bbox=${bbox}&limit=10`
    try{
        const requete = await fetch(url)
        
        if(requete.ok){
            const data = await requete.json()
            console.log("On a trouveé des résultat")
            data.features.slice(0, 5).forEach(feature => {
                const nom = feature.properties.name || ""
                const villeNom = feature.properties.city || ''
                const nom_complet = `${nom} ${villeNom}` . trim()
                creation_liste(nom_complet, id)
            })
            if(id === '#dep'){
                document.querySelector('.loader1').style.display = 'none'
            }else{
                document.querySelector('.loader2').style.display = 'none'
            }
            
        }else{
            console.log("Pas de résultat");
        }
    }catch(error){
        // Erreur de connexion
        console.error(error);
    }
}

function creation_liste(ville, id){
    
    const ul_existance = document.querySelector('#ul_rech')
    
    if(!ul_existance){
        if(id === '#dep'){
            document.querySelector('#resultat').style.display = 'block'
        }else{
            document.querySelector('#resultat2').style.display = 'block'
        }
        
        const ul = document.createElement('ul')
        ul.id = 'ul_rech'
        ul.classList.add('list-group')
        if(id === '#dep'){
            document.querySelector('#resultat').appendChild(ul)    
        }else{
            document.querySelector('#resultat2').appendChild(ul)
        }
        
        
    }
    
    const li = document.createElement('li')
    li.classList.add('list-group-item')

    document.querySelector('#ul_rech').appendChild(li)

    const a = document.createElement('a')
    a.classList.add('text-decoration-none', 'link-dark', 'd-block')
    li.appendChild(a)
    a.textContent = ville

    a.style.cursor = 'pointer'

    a.addEventListener('click', ()=>{
        if(id === '#dep'){
            document.querySelector('#dep').value = ville
        }else{
            document.querySelector('#dest').value = ville
        }
        
        document.querySelector('#ul_rech').remove()
    })

    
}
// slice : extraire tableau
// Petit problème : Le API Photon doit être dans le backend pour bien fonctionner