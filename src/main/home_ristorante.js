$(document).ready(function() {
    let id = 25;
    let vettoreIngredienti1 = [];
    let idPiatto1;
    let idPiatto2;
    let vettoreIngredienti2 = [];
    let vettoreCategorie = [];
    let vettoreMenu = [];
    let ristorante = {};
    popolaRistorante();
    popolaMenu();
    // Fixare in AGGIUNGI il passaggio dell'id categoria
    // AGGIUNGI

    const modaleAggiungi = document.getElementById('id_modale_aggiungi');

    // DETTAGLIO

    let indiceDettaglio;
    const modaleDettaglio = document.getElementById('id_modale_dettaglio');

    // MODIFICA
    let indiceEliminaIngrediente;
    let parentEliminaIngrediente;
    let indiceNuovoIngrediente;
    let indiceModifica;
    const modaleModifica = document.getElementById('id_modale_modifica');

    // ELIMINA

    let indiceElimina;
    let parentElimina;
    const modaleElimina = document.getElementById('id_modale_elimina');

    /* DISEGNA TABELLA */
    function popolaRistorante() {
        ristorante = {};

        $.get(`ristoranti/${id}`, function(res) {
            if (res != null) {
                ristorante = {
                    "id": res.id,
                    "ragionesociale": res.ragionesociale,
                    "piva" : res.piva,
                    "regione": res.regione,
                    "citta": res.citta,
                    "via": res.via,
                    "ncivico": res.ncivico
                }
                // INFO RISTORANTE

                $('#id_info_ristorante').append(`
                <h4>Ragione sociale</h4>
                <p>${ristorante.ragionesociale}</p>
                <h4>Località</h4>
                <p>${ristorante.regione}, ${ristorante.citta}</p>
                <p>${ristorante.via}, ${ristorante.ncivico}</p>
                <h4>Partita IVA</h4>
                <p>${ristorante.piva}</p>
            `   );

                // NOME RISTORANTE

         

            }
        });
    }

    function popolaMenu() {
    	
        vettoreMenu = [];

        $.get(`ristoranti/${id}/piatti`, function(res) {
            for (let i = 0; i < res.length; i++) {
                let piatto = {     
                                "id": res[i].id,
                                "nome": res[i].nome,
                                "prezzo": res[i].prezzo, 
                                "categoria": {
                                                "id" : res[i].categoria.id,
                                                "nome" : res[i].categoria.nome
                                            }
                            };
                vettoreMenu.push(piatto);
                disegnaTabella(vettoreMenu);
            }


        });
        
        console.log(vettoreMenu);
        
    };

    function disegnaTabella(arrayTabella) {
        const tabella = $('#id_contenitore_tabella table');
        if (tabella) {
            tabella.remove();
        }
        $('#id_contenitore_tabella').append(`
        <table class="tabella_menu" id="id_tabella_menu">
            <thead class="intestazione_tabella">
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
                    <th class="colonna_azioni">Azioni</th>
                </tr>
            </thead>
            <tbody class="corpo_tabella">
            </tbody>
        </table>
        `);
        for (let elemento of arrayTabella) {
            $('.corpo_tabella').append(`
            <tr indice="${elemento.id}" class="riga_tabella_piatti">
                <td>${elemento.nome}</td>
                <td>${elemento.categoria.nome}</td>
                <td>${elemento.prezzo}</td>
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
            </tr>
            `);
        }

        $('#id_tabella_menu').tablesorter();

        /* CLICK APRIRE MODALI */

        //AGGIUNGI

        $('#id_nuovo_piatto').click(function() {
            vettoreIngredienti1 = [];
            $.get('categorie', function(res) {
                vettoreCategorie = [];
                for (let i = 0; i < res.length; i++) {
                    let categoria = {  
                                        "id": res[i].id,
                                        "nome": res[i].nome, 
                                    };
                    vettoreCategorie.push(categoria);
                }
                $('#id_categoria').empty();
                for(let c of vettoreCategorie) {
                    
                    $('#id_categoria').append(`
                    <option id="id_elemento_categoria_1" value="${c.id}">
                        ${c.nome}
                    </option>
                    `);
                }

            });
            modaleAggiungi.style.display ='flex';
        });

        //DETTAGLIO

        $('.dettaglio').click(function() {
            modaleDettaglio.style.display ='flex';
            indiceDettaglio = +$(this).parent().parent().parent().attr('indice'); //prendo attributo indice del tr e lo rendo un intero
            $('#id_dettaglio_nome div').remove();
            $('#id_dettaglio_categoria div').remove();
            $('#id_dettaglio_prezzo div').remove();
            $('#id_dettaglio_descrizione div').remove();
            $('#id_dettaglio_lista_ingredienti div').remove();
            
            let piatto = {};
            $.get(`piatti/${indiceDettaglio}`, function(res) {
                if (res != null) {
                    piatto = {
                                
                                "id": res.id,
                                "nome": res.nome,
                                "prezzo": res.prezzo, 
                                "categoria": {
                                                "id" : res.categoria.id,
                                                "nome" : res.categoria.nome
                                            },
                                "descrizione": res.descrizione
                            };
					console.log(piatto);
                    let ingredienti = [];
					console.log(res);
					console.log(res.ingredienti);
                    for(let i of res.ingredienti) {
                        let ingrediente = {
                            "id": i.id,
                            "nome" : i.nome,
                            "allergene": i.allergene
                        };
                        console.log(ingrediente);
                        console.log(i);
                        ingredienti.push(ingrediente);
                    }
					console.log(ingredienti);
                    piatto.ingredienti = ingredienti;
                    console.log(piatto);
                    
                    let elementiIngredienti = ``;
                    for (let ingrediente of piatto.ingredienti) {
                        elementiIngredienti += `<li id-ingrediente=${ingrediente.id}>${ingrediente.nome}</li>`;
                    }
                    $('#id_dettaglio_nome').append(`
                        <div class="dettaglio_nome">
                            <p>${piatto.nome}</p>
                        </div>
                    `);
                    $('#id_dettaglio_categoria').append(`
                        <div class="dettaglio_categoria">
                                <p>${piatto.categoria.nome}</p>
                        </div>
                    `);
                    $('#id_dettaglio_prezzo').append(`
                        <div class="dettaglio_prezzo">
                            <p>${piatto.prezzo}</p>
                        </div>
                    `);
                    $('#id_dettaglio_descrizione').append(`
                        <div class="dettaglio_descrizione">
                            <p>${piatto.descrizione}</p>
                        </div>
                    `);
                    $('#id_dettaglio_lista_ingredienti').append(`
                        <div class="dettaglio_lista_ingredienti">
                            <ol>${elementiIngredienti}</ol>
                        </div>
                    `);
                }
            });

        });

        //MODIFICA

        $('.modifica').click(function() {
            $('#form_modale_modifica_piatto').find("li").remove();
            parentModifica = $(this).parent().parent().parent();
            indiceModifica = parentModifica.attr("indice");
            let piatto;
            $.get(`piatti/${indiceModifica}`, function(res) {
                if (res != null) {
                    piatto = {
                        "id": res.id,
                        "nome": res.nome,
                        "categoria" : {
                            "id": res.categoria.id,
                            "nome": res.categoria.nome
                        },
                        "prezzo": res.prezzo,
                        "descrizione": res.descrizione,
                        "ingredienti": res.ingredienti
                    }

                    $('#id_form_modale_modifica_piatto').find("input[type=text], textarea").val("");
                    $('input#id_nome_mod').val(piatto.nome);
                    $('input#id_categoria_mod').val(piatto.categoria.nome);
                    $('input#id_prezzo_mod').val(piatto.prezzo);
                    $('textarea#id_descrizione_mod').val(piatto.descrizione);
                    
                    vettoreIngredienti2 = [];
                    $.get('categorie', function(res) {
                        vettoreCategorie = [];
                        for (let i = 0; i < res.length; i++) {
                            let categoria = {  
                                                "id": res[i].id,
                                                "nome": res[i].nome, 
                                            };
                            vettoreCategorie.push(categoria);
                        }
                        $('#id_categoria_mod').empty();
                        for(let c of vettoreCategorie) {
                            
                            $('#id_categoria_mod').append(`
                            <option id="id_elemento_categoria_1" value="${c.id}">
                                ${c.nome}
                            </option>
                            `);
                        }

                    });
                    $('#ingredienti_2').html("");
                    for(let i of piatto.ingredienti) {
                        let icon_allergene = i.allergene == "true" ? `&#9888;` : ``;

                        $('#ingredienti_2').append(`<li class="elemento" hidden-id="${i.id}"><svg class="elimina_2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>${i.nome}&nbsp;${icon_allergene}</li>`);
                    }


                    modaleModifica.style.display ='flex';

                }
            })
        });

        //ELIMINA

        $('.elimina').click(function() {
            parentElimina = $(this).parent().parent().parent();
            indiceElimina = parentElimina.attr("indice"); //salvo l'indice dell'elemento che sto per eliminare
            modaleElimina.style.display ='flex';
        });
       
    }



    // AGGIUNGI

    $('#id_aggiungi_1').click(function() {
        const input = $('input#id_ingrediente_1');
        let allergene= +$('select#id_allergene_1').val();
        const valore = input.val();
        const ingrediente1 = {
            "nome": valore
        };
        let icon_allergene = allergene == 1 ? `&#9888;` : ``;
        if (valore) {
            vettoreIngredienti1.push(ingrediente1);
            $('#ingredienti_1').append(`<li class="elemento" nome="${ingrediente1.nome}"><svg class="elimina_1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>${ingrediente1.nome}&nbsp;${icon_allergene}</li>`);
        }
        input.val('');
        input.focus();
    });
    $('#ingredienti_1').on('click', '.elimina_1', function() { 
        const nome = $(this).parent().attr('nome');
        const ingrediente1 = {
            "nome": nome
        };
        $(this).parent().remove();
        const indiceIngrediente = vettoreIngredienti1.indexOf(ingrediente1);
        vettoreIngredienti1.splice(indiceIngrediente, 1); //.splice rimuove n (n=1 in questo caso) elementi a partire da un indice
    });
    $('#chiudi_modale_aggiungi').click(function() {
        modaleAggiungi.style.display = 'none';
        $('#id_form_modale_aggiungi_piatto').find("input[type=text], textarea").val("");
    });
    function addPiatto(p) {

        $.ajax({
            type: 'POST',
            url: `/piatti/ristoranti/${ristorante.id}/${p.categoria.id}`,
            data: JSON.stringify(p),
            contentType: "application/json",
            dataType: 'json',
            success: function(data) {
                $('#id_tabella_menu').tablesorter();
                console.log("Dati!");
                console.log(data);
                console.log("ID!");
                console.log(data.id);
                idPiatto1 = +data.id;
                for (let ingrediente of p.ingredienti) {
                    $.ajax({
                        type: 'POST',
                        url: `/ingredienti/piatti/${idPiatto1}`,
                        data: JSON.stringify(ingrediente),
                        contentType: "application/json",
                        dataType: 'json',
                        success: function(data) {
                            console.log(ingrediente);
                        }
                    });
                }
                popolaMenu();
                $('#id_tabella_menu').tablesorter();

            }
        })
    }

   
    $('#id_salva_1').click(function() {
        modaleAggiungi.style.display = 'none';
        const nome = $('input#id_nome').val();
        const idcategoria = +$('select#id_categoria').val(); // questo non funziona!!!  -> fare una mappa tra categorie e id per evitare altra chiamata get
        categoria = {
            "id" : idcategoria
        };
        const prezzo = $('input#id_prezzo').val();
        const descrizione = $('textarea#id_descrizione').val();
        let ingredienti = [];
        vettoreIngredienti1.forEach(ingrediente => ingredienti.push(ingrediente)); // foreach chiede un nome per l'elemento iterato => funzione da eseguire con quell'elemento
        const piatto = {nome, categoria, prezzo, descrizione, ingredienti};
        if(nome, categoria, prezzo, descrizione) {
            addPiatto(piatto);
        }
        // console.warn(piatto);
        // console.warn('Menu', vettoreMenu);
        $('#id_form_modale_aggiungi_piatto').find("input, select, textarea").val("");
        $('#id_form_modale_aggiungi_piatto').find("li").remove();
    });

    // DETTAGLIO

    $('#chiudi_modale_dettaglio').click(function() {
        modaleDettaglio.style.display = 'none';
    });

    // MODIFICA
    // devo caricare i dati del piatto
    // tutti i suoi ingredienti con id
    // aggiungi ed elimina fanno direttamente chiamate post / delete
    // quando faccio aggiungi o elimina devo ricaricare la lista degli ingredienti
    function deleteIngredienti(indiceEliminaIngrediente, htmlRow) {
		$.ajax({
			url: `ingredienti/${indiceEliminaIngrediente}`,
			type: 'DELETE',
			success: function() {
                htmlRow.remove();
                // $.get(`ingredienti/piatti/${indiceModifica}`, function(res) {
                //     for(let i of res) {
                //         $('#ingredienti_2').append(`<li class="elemento" hidden-id="${i.id}"><svg class="elimina_2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                //         <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                //         </svg>${i.nome}</li>`);
                //     }
                // });     

                popolaMenu();
                $('#id_tabella_menu').tablesorter();
                
			}
		})
    }
    function addIngrediente(i) {
        $.ajax({
            type: 'POST',
            url: `/ingredienti/piatti/${indiceModifica}`,
            data: JSON.stringify(i),
            contentType: "application/json",
            dataType: 'json',
            success: function(res) {
                indiceNuovoIngrediente = res.id;
                let icon_allergene = res.allergene == "true" ? `&#9888;` : ``;
                $('#ingredienti_2').append(`<li class="elemento" hidden-id="${res.id}"><svg class="elimina_2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>${res.nome}&nbsp;${icon_allergene}</li>`);
            }
        })
    }
    $('#id_aggiungi_2').click(function() {
        const input = $('input#id_ingrediente_2');
        
        const valore = input.val();
        i = {
            "nome": valore
        }
        addIngrediente(i)

        

        
        input.val('');
        input.focus();
    });
    $('#ingredienti_2').on('click', '.elimina_2', function() {
        idElimina = $(this).parent().attr("hidden-id");
        parentElimina = $(this).parent();
        deleteIngredienti(idElimina, parentElimina);


    });
    $('#chiudi_modale_modifica').click(function() {
        modaleModifica.style.display = 'none';
        $('#id_form_modale_modifica_piatto').find("input[type=text], textarea").val("");
    });
    function updatePiatto(piatto) {
        $.ajax({
            type: 'PUT',
            url: `/piatti/ristoranti/${ristorante.id}/${piatto.categoria.id}`,
            data: JSON.stringify(piatto),
            contentType: "application/json",
            dataType: 'json',
            success: function(res) {
                $('id_contenitore_tabella').html("");
                vettoreMenu = [];
                // popolaMenu();
                // disegnaTabella(vettoreMenu)
                // // Document.location.reload(true);
                // window.location.reload();



            }
        })
    }
    function kickReload() {
        popolaMenu(); // ho aggiunto questo
        disegnaTabella(vettoreMenu);
        window.location.reload();
    }
    $('#id_salva_2').click(function() {
        modaleModifica.style.display = 'none';
        const id = indiceModifica;
        const nome = $('input#id_nome_mod').val();
        const idcategoria = +$('select#id_categoria_mod').val();
        const categoria = {
            "id": idcategoria
        };
        const prezzo = $('input#id_prezzo_mod').val();
        const descrizione = $('textarea#id_descrizione_mod').val();
        const piatto = {id, nome, categoria, prezzo, descrizione};
        if(id, nome, categoria, prezzo) {
            updatePiatto(piatto);
            // popolaMenu(); // ho aggiunto questo
            // disegnaTabella(vettoreMenu);
            // window.location.reload();
            setTimeout(kickReload(), 3000);
        }
        //console.warn(piatto);
        vettoreIngredienti2 = [];
        $('#id_form_modale_modifica_piatto').find("input, select, textarea").val(""); //svuota le caselle di input
    });

    // ELIMINA

    $('#chiudi_modale_elimina').click(function() {
        modaleElimina.style.display = 'none';
    });
    function deletePiatti(indiceElimina, htmlRow) {
		$.ajax({
			url: `piatti/${indiceElimina}`,
			type: 'DELETE',
			success: function() {
                htmlRow.remove();
                popolaMenu();
                $('#id_tabella_menu').tablesorter();
                
			}
		})
	}
    $('.conferma_eliminazione_piatto').click(function() {
        deletePiatti(indiceElimina, parentElimina);
        modaleElimina.style.display = 'none';
    });
    $('.annulla_eliminazione_piatto').click(function() {
        modaleElimina.style.display = 'none';
    });
});
    
