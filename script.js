let timeout
document.querySelector('#dep').addEventListener('input', function(e){
    demarrage(e, '#dep')
})

document.querySelector('#dest').addEventListener('input', function(e){
    demarrage(e, '#dest')
})

function demarrage(e, id){
    clearTimeout(timeout)
    const ul_existance = document.querySelector('#ul_rech')
    if(ul_existance){
        ul_existance.remove()
    }
    timeout = setTimeout(() =>{
        if(e.target.value.length > 3){
            rechercheVille(e.target.value, id)
        }
    }, 300)
    
}

async function rechercheVille(ville, id){
    const loader = (id === '#dep') ? '.loader1' : '.loader2'
    document.querySelector(loader).style.display = 'block'
    
    
    const bbox = "46.6,-19.5,48.5,-17.5"
    // const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(ville)}&bbox=${bbox}&limit=10`
    const url = `villes/recherche?q=${encodeURIComponent(ville)}`
    try{
        const requete = await fetch(url)
        
        if(requete.ok){
            const data = await requete.json()
            data.features.slice(0, 5).forEach(feature => {
                const nom = feature.properties.name || ""
                const villeNom = feature.properties.city || ''
                const nom_complet = `${nom} ${villeNom}` . trim()
                creation_liste(nom_complet, id)
            })
            document.querySelector(loader).style.display = 'none'
            
            
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
