# noteatyet@DeadEndDev
## Gestionale per l'azienda NotEatYet

### 1. Contenuti

Questa repository contiene il risultato di un progetto di gruppo nell'ambito del corso di Full Stack Web Development offerto da Generation Italy in collaborazione con Intesa SanPaolo. Il lavoro mira a rappresentare un'esperienza lavorativa dalla richiesta del cliente alla consegna del prototipo. 

A questo progetto hanno collaborato:

- Matteo Fordiani (https://github.com/matteo4diani) - Team Leader, Backend, Frontend, JQuery
- Eugenio Caltabiano (https://github.com/gegio98) - Backend, Security, Documentazione Tecnica
- Hermann Josimar (https://github.com/josimarhermann) - Frontend, Costruzione Filesystem, Grafica
- Linda Pilla (https://github.com/lindapilla) - Frontend, JQuery, Grafica


### 2. Consegna originale

<< Siamo NotEatYet, una nuova azienda specializzata nelle consegne di cibo a domicilio.

Abbiamo bisogno di una webapp che sia in grado di gestire la nostra lista di
clienti e i loro menù.

Dobbiamo essere in grado di gestire la lista di Ristoranti nostri clienti
di cui salviamo le seguenti informazioni:

- ragione sociale
- piva
- regione
- citta
- via
- n civico

Ogni ristorante ha un menù.
Il piatti del menù possoni essere divisi in categorie.
Ma la cosa fondamentale è che ogni piatto abbia le seguenti informazioni:

- nome
- prezzo
- la lista degli ingredienti

Come prima fase ci accontentiamo di avere un sistema per gestire i nostri clienti e i loro menù.

Nella seconda fase desideriamo una web-app che permetta ai clienti di gestire i loro ristoranti.

Il vostro team è in grado di fornirci una valutazione su quanto tempo occorre per un primo prototipo? >>

### 3. Utilizzare il progetto

1. Creare un nuovo Maven Project dal pom.xml fornito nel proprio IDE
2. Importare i package in /src/main/java/**/NotEatYet01/** nelle Java Resources del proprio progetto
3. Importare le risorse in /src/main/resources/static/** nella cartella static sotto /src/main/resources/ nel proprio progetto
4. Su MySQL creare uno schema 'noteatyet'
5. Eseguire una prima volta il comando "Run as Java Application" sulla classe Application.java per costruire i database con Spring Data JPA
6. Stoppare l'applicazione, controllare la corretta creazione delle table 'utente', 'ristorante', 'categoria', 'piatto', 'ingrediente'.
7. Aprire gli script SQL in /MockarooDB/** ed eseguire gli insert in quest'ordine: 1. Ristoranti 2. Categorie 3. Piatti 4. Ingredienti
8. Eseguire il comando "Run as Java Application" sulla classe Application.java
9. Sul proprio browser navigare a 'localhost:8080' e eseguire il signup di un nuovo account (per ottenere il ruolo admin modificare la colonna ruolo della table utente inserendo 'ADMIN')
10. Eseguire il login e cliccare su 'Accesso Ristoratori' (ruolo USER) o 'Accesso Operatori' (ruolo ADMIN)
