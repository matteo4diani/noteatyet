$(document).ready(function() {

    let vettoreRistoranti = [];
    let vettoreCategorie = [];
    popolaRistoranti();


    // AGGIUNGI

    const modaleAggiungi = document.getElementById('id_modale_aggiungi');

    // GESTISCI CATEGORIE

    const modaleGestisci = document.getElementById('id_modale_gestisci');

    // MODIFICA
    let parentModifica;
    let indiceModifica;
    const modaleModifica = document.getElementById('id_modale_modifica');
    const formModaleModifica = document.getElementById('id_form_modale_modifica_ristorante');


    // DETTAGLIO

    let indiceDettaglio;
    const modaleDettaglio = document.getElementById('id_modale_dettaglio');

    // ELIMINA 

    let indiceElimina;
    let parentElimina;
    const modaleElimina = document.getElementById('id_modale_elimina');

    /* RIEMPI RISTORANTI */

    function popolaRistoranti() {
    	
    	vettoreRistoranti = [];

        $.get('ristoranti', function(res) {
            for (let i = 0; i < res.length; i++) {
                let ristorante = {  
                                    "id": res[i].id,
                                    "ragionesociale": res[i].ragionesociale, 
                                    "piva": res[i].piva, 
                                    "regione": res[i].regione,
                                    "citta": res[i].citta,
                                    "via": res[i].via,
                                    "ncivico": res[i].ncivico,
                                    "mail": "",
                                    "username": "",
                                    "menu": [],
                                    "password": 0
                                };
                vettoreRistoranti.push(ristorante);
                disegnaTabella(vettoreRistoranti);
            }


        });
        
        console.log(vettoreRistoranti);
        
    };

    function popolaCategorie() {
    	
    	
        
        console.log(vettoreCategorie);
        console.log("ueue");
        
    };


    /* DISEGNA TABELLA */

    function disegnaTabella(arrayTabella) {
        let tabella = $('#id_contenitore_tabella table');
        if (tabella) {
            tabella.remove();
        }
        $('#id_contenitore_tabella').append(`
        <table class="tabella_ristoranti" id="id_tabella_ristoranti">
        <thead class="intestazione_tabella">
            <tr>
                <th>Ragione Sociale <svg class="ordina" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                </svg></th>
                <th>Regione <svg class="ordina" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                </svg></th>
                <th>Città <svg class="ordina" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                </svg></th>
                <th>Indirizzo <svg class="ordina" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                </svg></th>
                <th>Partita IVA <svg class="ordina" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                </svg></th>
                <th class="colonna_azioni">Azioni</th>
            </tr>
        </thead>
        <tbody class="corpo_tabella">
        </tbody>
        </table>`);
        for (let elemento of arrayTabella) {
            // indexOf mi salva l'indice così non viene mai modificato dal sorting
            $('.corpo_tabella').append(`
            <tr indice="${elemento.id}" >
                <input id="hidden-id" type="hidden" value=${elemento.id}/>
                <td>${elemento.ragionesociale}</td>
                <td>${elemento.regione}</td>
                <td>${elemento.citta}</td>
                <td>${elemento.via}, ${elemento.ncivico}</td>
                <td>${elemento.piva}</td>
                <td>
                    <div class="azioni">
                        <svg class="dettaglio" id="id_dettaglio" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                        <svg class="modifica" id="id_modifica" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                        <svg class="elimina" id="id_elimina" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </div>
                </td>
            </tr>`);
        }

        $('#id_tabella_ristoranti').tablesorter();

        /* CLICK APRIRE MODALI */

        // AGGIUNGI

        $('#id_nuovo_ristorante').click(function() {
            modaleAggiungi.style.display ='flex';
        });

        // GESTISCI

        $('#id_gestisci_categorie').click(function() {
            
            $.get('categorie', function(res) {
                vettoreCategorie = [];
                for (let i = 0; i < res.length; i++) {
                    let categoria = {  
                                        "id": res[i].id,
                                        "nome": res[i].nome, 
                                    };
                    vettoreCategorie.push(categoria);
                }
                $('#id_elenco_categorie').empty();
                for(let c of vettoreCategorie) {
                    
                    $('#id_elenco_categorie').append(`
                    <li class="elemento_categoria" valore="${c.nome}">
                        ${c.nome}
                    </li>
                    `);
                }
                modaleGestisci.style.display = 'flex';

            });
            
        });

        // DETTAGLIO

        $('.dettaglio').click(function() {
            indiceDettaglio = +$(this).parent().parent().parent().attr('indice'); //prendo attributo indice del tr e lo rendo un intero
            modaleDettaglio.style.display ='flex';
           
            $('#id_contenitore_tabella_dettaglio table').remove();
            $('#id_contenitore_tabella_dettaglio').append(`
            <table class="dettaglio_ristorante">
                        <thead>
                            <tr>
                                <th>Nome <svg class="ordina" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                                </svg></th>
                                <th>Categoria <svg class="ordina" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                                </svg></th>
                                <th>Prezzo <svg class="ordina" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                                </svg></th>
                            </tr>
                        </thead>
                        <tbody class="corpo_tabella_dettaglio_ristorante">
                        </tbody>
            </table>
            `);
            let ristorante = {};
            $.get(`ristoranti/${indiceDettaglio}`, function(res) {
                if (res != null) {
                    ristorante = {  
                                    "id": res.id,
                                    "ragionesociale": res.ragionesociale, 
                                    "piva": res.piva, 
                                    "regione": res.regione,
                                    "citta": res.citta,
                                    "via": res.via,
                                    "ncivico": res.ncivico,
                                    "mail": "",
                                    "username": "",
                                    "menu": [],
                                    "password": 0
                                };
                                $('#id_dettaglio_ragione_sociale').append(`
                                <p>${ristorante.ragionesociale}</p>
                                `);
                                $('#id_dettaglio_piva').append(`
                                    <p>${ristorante.piva}</p>
                                `);
                                $('#id_dettaglio_regione').append(`
                                    <p>${ristorante.regione}</p>
                                `);
                                $('#id_dettaglio_indirizzo').append(`
                                    <p>${ristorante.citta}, ${ristorante.via} ${ristorante.ncivico}</p>
                                `);
                }
            }); 
            let menu = [];
            $.get(`ristoranti/${indiceDettaglio}/piatti`, function(res) {
                for (let i = 0; i < res.length; i++) {
                    let piatto = {
                                        "nome": res[i].nome, 
                                        "prezzo": res[i].prezzo, 
                                        "categoria":{
                                                        "nome": res[i].categoria.nome
                                                    }
                                    };
                    menu.push(piatto);
                }
               
                console.log(menu);
                for (let piatto of menu) {
                    $('.corpo_tabella_dettaglio_ristorante').append(`
                    <tr>
                        <td>${piatto.nome}</td>
                        <td>${piatto.categoria.nome}</td>
                        <td>${piatto.prezzo}</td>
                    </tr>
                    `);
                }
                $('#id_tabella_ristoranti').tablesorter();
                $('.dettaglio_ristorante').tablesorter();
            });
            
            
        });

        // MODIFICA
        
        $('.modifica').click(function() {
            parentModifica = $(this).parent().parent().parent();
            indiceModifica = parentModifica.attr("indice");
            let ristorante;
            $.get(`ristoranti/${indiceModifica}`, function(res) {
                if (res != null) {
                    ristorante = {  
                                    "id": res.id,
                                    "ragionesociale": res.ragionesociale, 
                                    "piva": res.piva, 
                                    "regione": res.regione,
                                    "citta": res.citta,
                                    "via": res.via,
                                    "ncivico": res.ncivico,
                                    "mail": "",
                                    "username": "",
                                    "menu": [],
                                    "password": 0
                                };

                    
                                $('#id_form_modale_modifica_ristorante').find("input[type=text], textarea").val("");
                                $('input#id_ragione_sociale_mod').val(ristorante.ragionesociale);
                                $('input#id_piva_mod').val(ristorante.piva);
                                $('input#id_regione_mod').val(ristorante.regione);
                                $('input#id_citta_mod').val(ristorante.citta);
                                $('input#id_via_mod').val(ristorante.via);
                                $('input#id_ncivico_mod').val(ristorante.ncivico);
                                $('input#id_username_mod').val('');
                                $('input#id_email_mod').val('');
                                $('input#id_password_mod').val('');
                                modaleModifica.style.display ='flex';

                }
                
                
            });            
            
           
            
            
        });

        // ELIMINA

        $('.elimina').click(function() {
            //salvo l'indice dell'elemento che sto per eliminare
            parentElimina = $(this).parent().parent().parent();
            indiceElimina = parentElimina.attr("indice");
            modaleElimina.style.display ='flex';
        });

    };

    

    // AGGIUNGI
    function addRistorante(r) {

                $.ajax({
                    type: 'POST',
                    url: '/ristoranti',
                    data: JSON.stringify(r),
                    contentType: "application/json",
                    dataType: 'json',
                    success: function(data) {
                    	vettoreRistoranti = [];
                    	disegnaTabella(vettoreRistoranti);
                        popolaRistoranti();
                        $('#id_tabella_ristoranti').tablesorter();
                    }
                })
            }
    $('#chiudi_modale_aggiungi').click(function() {
        modaleAggiungi.style.display = 'none';
        $('#id_form_modale_aggiungi_ristorante').find("input[type=text], textarea").val("");
    });
    $('#id_salva_nuovo_ristorante').click(function() {
        modaleAggiungi.style.display = 'none';
        const ragionesociale = $('input#id_ragione_sociale').val();
        const piva = $('input#id_piva').val();
        const regione = $('input#id_regione').val();
        const citta = $('input#id_citta').val();
        const via = $('input#id_via').val();
        const ncivico = $('input#id_ncivico').val();
        const menu = [];
        const username = $('input#id_username').val();
        const email = $('input#id_email').val();
        const password = $('input#id_password').val();
        const ristorante = {ragionesociale, piva, regione, citta, via, ncivico, menu, username, email, password};
        if(ragionesociale, piva, regione, citta, via, ncivico, username, email, password) {
            addRistorante(ristorante);
            popolaRistoranti();
            $('#id_tabella_ristoranti').tablesorter();
            console.warn(ristorante);
        }
        
        $('#id_form_modale_aggiungi_ristorante').find("input[type=text], textarea").val("");
        
    });

    // GESTISCI

    $('#chiudi_modale_gestisci').click(function() {
        modaleGestisci.style.display = 'none';
        $('#id_form_modale_gestisci_categorie').find("input[type=text], textarea").val("");
    });
    $('#id_salva_nuova_categoria').click(function() {
        const nuovaCategoria = $('input#id_nuova_categoria').val();
        nome = nuovaCategoria;
        let cat = {nome};
        $.ajax({
            type: 'POST',
            url: '/categorie',
            data: JSON.stringify(cat),
            contentType: "application/json",
            dataType: 'json',
            success: function(data) {
            }
        });

        $('#id_elenco_categorie').append(`
        <li class="elemento_categoria" valore="${cat.nome}">
            ${cat.nome} 
        </li>
        `);
        
        $('input#id_nuova_categoria').focus();
        $('#id_form_modale_gestisci_categorie').find("input[type=text], textarea").val("");
        
    });
    
    

    // DETTAGLIO

    $('#chiudi_modale_dettaglio').click(function() {
        modaleDettaglio.style.display = 'none';
        $('#id_dettaglio_ragione_sociale').html("");
        $('#id_dettaglio_piva').html("");
        $('#id_dettaglio_regione').html("");
        $('#id_dettaglio_indirizzo').html("");
    });

    // MODIFICA 
    function updateRistorante(r) {
        $.ajax({
            type: 'PUT',
            url: '/ristoranti',
            data: JSON.stringify(r),
            contentType: "application/json",
            dataType: 'json',
            success: function(data) {
                $('id_contenitore_tabella').html("");
                vettoreRistoranti = [];
                popolaRistoranti();
                disegnaTabella(vettoreRistoranti);
                // Document.location.reload(true);
                window.location.reload();

            },
            done: function() {
                window.location.reload();
            }
        })
    }
    $('#chiudi_modale_modifica').click(function() {
        modaleModifica.style.display = 'none';
        $('#id_form_modale_modifica_ristorante').find("input[type=text], textarea").val("");
    });
    $('#id_salva_modifica_ristorante').click(function() {
        modaleModifica.style.display = 'none';
        const id = indiceModifica;
        const ragionesociale = $('input#id_ragione_sociale_mod').val();
        const piva = $('input#id_piva_mod').val();
        const regione = $('input#id_regione_mod').val();
        const citta = $('input#id_citta_mod').val();
        const via = $('input#id_via_mod').val();
        const ncivico = $('input#id_ncivico_mod').val();
        const ristorante = {id, ragionesociale, piva, regione, citta, via, ncivico};
        if(id, ragionesociale, piva, regione, citta, via, ncivico) {
            updateRistorante(ristorante);
            popolaRistoranti(); // ho aggiunto questo
            disegnaTabella(vettoreRistoranti)
            window.location.reload();
        }
        console.warn(ristorante);
        $('#id_form_modale_modifica_ristorante').find("input[type=text], textarea").val(""); //svuota le caselle di input
    });

    // ELIMINA 
    function deleteRistoranti(id, htmlRow) {
		$.ajax({
			url: `ristoranti/${id}`,
			type: 'DELETE',
			success: function() {
                htmlRow.remove();
                popolaRistoranti();
                //disegnaTabella(vettoreRistoranti);
                $('#id_tabella_ristoranti').tablesorter();
                
			}
		})
	}
    $('#chiudi_modale_elimina').click(function() {
        modaleElimina.style.display = 'none';
    });
    $('.conferma_eliminazione_ristorante').click(function() {
        //elimino l'elemento dal vettore
        deleteRistoranti(indiceElimina, parentElimina);
        modaleElimina.style.display = 'none';
       


    });
    $('.annulla_eliminazione_ristorante').click(function() {
        modaleElimina.style.display = 'none';
    });

    // INFO OPERATORE

    $('#id_nome_operatore').append(`
        <p>Mario Rossi #1234</p>
    `);

});