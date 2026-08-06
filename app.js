// --- BASE DE DONNÉES MASSIVE DES COURS ---
const db = [
    {
        id: 1, title: "Niveau 1 : Reconnaissance et Fondations",
        themes: [
            {
                id: "t1_linux", title: "Le Cœur de Linux", desc: "Architecture, permissions et fichiers cachés.",
                content: `
                    <h2>Pourquoi Linux ?</h2>
                    <p>90% des serveurs web mondiaux tournent sous Linux. Un pentester ou un hacker éthique doit maîtriser ce système sur le bout des doigts. Contrairement à Windows, sous Linux, <strong>tout est un fichier</strong> (même votre clavier ou votre écran sont considérés comme des fichiers par le système).</p>
                    <img src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80" alt="Terminal" class="media-img">
                    <h2>La navigation absolue et relative</h2>
                    <p>Le système de fichiers est un arbre inversé dont la racine s'appelle <code>/</code>. Pour se déplacer, on utilise la commande <code>cd</code> (Change Directory). Pour savoir où l'on se trouve, on tape <code>pwd</code> (Print Working Directory).</p>
                    <ul>
                        <li><code>cd /var/www/html</code> : Chemin absolu (démarre de la racine).</li>
                        <li><code>cd ../</code> : Remonte d'un dossier (chemin relatif).</li>
                    </ul>
                    <h2>Le secret des fichiers cachés</h2>
                    <p>Pour masquer un fichier sensible (comme des clés SSH ou des configurations de mots de passe), les administrateurs Linux ajoutent simplement un point (<code>.</code>) au début du nom de fichier. La commande classique <code>ls</code> ne les affichera pas. Il faut lui ajouter l'argument "all" : <code>ls -a</code>.</p>
                `,
                simType: "terminal",
                simData: { instruction: "L'administrateur a caché un fichier de configuration dans ce dossier. Trouvez la commande pour afficher TOUS les fichiers.", expected: "ls -a", successOutput: "[OK] Exécution réussie.\nFichiers détectés : config.php, index.html, .secret_flag\n\nCONTENU DU FICHIER CACHÉ :\nFLAG{linux_master_99}" },
                quiz: [
                    { q: "Quelle commande permet de savoir dans quel dossier on se trouve actuellement ?", options: ["cd", "pwd", "ls", "whoami"], ans: "1" },
                    { q: "Comment s'appelle la racine absolue du système de fichiers sous Linux ?", options: ["C:\\", "/root", "/", "/home"], ans: "2" },
                    { q: "Quel est le FLAG que vous avez découvert dans le simulateur ci-dessus ?", options: ["FLAG{hidden_file}", "FLAG{linux_master_99}", "FLAG{root_access}"], ans: "1" }
                ]
            },
            {
                id: "t1_net", title: "Protocoles et Ports (OSI)", desc: "Comprendre comment les machines discutent.",
                content: `
                    <h2>Le Modèle OSI : La Poste d'Internet</h2>
                    <p>Pour que ton téléphone puisse afficher une vidéo hébergée au Japon, les données doivent être découpées, étiquetées, et transportées. C'est le rôle des protocoles réseau. Regarde cette courte vidéo explicative sur le modèle OSI :</p>
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/n30Y2tI0wD4" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <h2>Les Adresses IP et les Ports</h2>
                    <p>Si l'adresse IP (ex: 192.168.1.15) est l'adresse postale d'un immeuble, les <strong>Ports</strong> sont les numéros d'appartement. Une machine a 65 535 ports disponibles. Chaque service écoute sur un port spécifique :</p>
                    <ul>
                        <li><strong>Port 21 :</strong> FTP (Transfert de fichiers)</li>
                        <li><strong>Port 22 :</strong> SSH (Prise de contrôle à distance sécurisée)</li>
                        <li><strong>Port 80 :</strong> HTTP (Trafic web en clair)</li>
                        <li><strong>Port 443 :</strong> HTTPS (Trafic web chiffré, incontournable aujourd'hui)</li>
                    </ul>
                    <p>Lors d'un audit (pentest), la première étape consiste à utiliser un outil comme <strong>Nmap</strong> pour scanner tous les ports d'une cible et voir quelles "portes" sont ouvertes.</p>
                `,
                simType: "none",
                quiz: [
                    { q: "À quoi sert un Port réseau ?", options: ["À chiffrer les données", "À identifier un service ou une application spécifique sur une machine", "À booster la connexion internet"], ans: "1" },
                    { q: "Si je veux pirater un site web mal sécurisé sans chiffrement TLS/SSL, quel port vais-je cibler par défaut ?", options: ["Port 443", "Port 22", "Port 80"], ans: "2" },
                    { q: "Quel port est utilisé pour prendre le contrôle sécurisé d'un serveur à distance (SSH) ?", options: ["Port 21", "Port 22", "Port 8080"], ans: "1" }
                ]
            }
        ],
        exam: [
            { q: "Laquelle de ces affirmations sur Linux est VRAIE ?", options: ["La racine est C:\\", "Les fichiers cachés commencent par un tiret (-)", "Tout est considéré comme un fichier"], ans: "2" },
            { q: "Quel outil est le plus utilisé pour scanner les ports ouverts d'une machine cible ?", options: ["Wireshark", "Nmap", "Burp Suite"], ans: "1" },
            { q: "Que doit-on taper pour voir un fichier nommé '.env' dans le terminal ?", options: ["ls", "show .env", "ls -a"], ans: "2" }
        ]
    },
    {
        id: 2, title: "Niveau 2 : Failles Web Critiques (OWASP)",
        themes: [
            {
                id: "t2_sqli", title: "Injection SQL (SQLi)", desc: "Détruire la logique d'une base de données.",
                content: `
                    <h2>Le Langage SQL</h2>
                    <p>Presque tous les sites web modernes utilisent une base de données pour stocker les comptes utilisateurs, les articles, etc. Le langage pour parler à cette base est le SQL. Une requête de connexion normale ressemble à ça :</p>
                    <p><code>SELECT * FROM utilisateurs WHERE pseudo='admin' AND password='mon_mot_de_passe'</code></p>
                    <h2>Briser la structure : Le Bypass</h2>
                    <p>Si le développeur n'a pas sécurisé le champ de saisie, on peut taper du code SQL directement dedans. Si dans le champ "mot de passe" je tape : <strong>' OR 1=1 --</strong></p>
                    <p>La requête devient : <code>SELECT * FROM utilisateurs WHERE pseudo='admin' AND password='' OR 1=1 --'</code></p>
                    <ul>
                        <li>L'apostrophe (<strong>'</strong>) ferme prématurément le champ du mot de passe.</li>
                        <li>Le <strong>OR 1=1</strong> est une question dont la réponse est toujours VRAIE. La base de données se dit : "Le mot de passe est faux, OU BIEN 1 est égal 1... Ah oui, 1=1, donc j'autorise l'accès !".</li>
                        <li>Les tirets (<strong>--</strong>) disent à la base de données d'ignorer tout le reste du code.</li>
                    </ul>
                `,
                simType: "sqli",
                simData: { instruction: "Vous êtes face à un panneau d'administration. Essayez de contourner le mot de passe en utilisant la technique vue dans le cours." },
                quiz: [
                    { q: "Quel est le but des tirets '--' dans une injection SQL ?", options: ["Mettre la suite de la requête en commentaire (l'ignorer)", "Chiffrer le mot de passe", "Faire planter le serveur"], ans: "0" },
                    { q: "Pourquoi la payload ' OR 1=1 fonctionne-t-elle pour contourner un login ?", options: ["Elle efface la base de données", "Elle force la condition de vérification à devenir mathématiquement vraie", "Elle change le mot de passe de l'admin en 1=1"], ans: "1" },
                    { q: "Quel FLAG le simulateur vous a-t-il donné après l'injection réussie ?", options: ["FLAG{sql_is_dead}", "FLAG{bypass_auth_0x1}", "FLAG{admin_hacked}"], ans: "1" }
                ]
            }
        ],
        exam: [
            { q: "L'Injection SQL cible principalement...", options: ["Le navigateur de l'utilisateur", "Le routeur de l'entreprise", "Le serveur de base de données (Backend)"], ans: "2" }
        ]
    }
];

// --- GESTION DE L'ÉTAT ET VUES ---
let accounts = {};
let activeUser = null;
let authMode = 'login';
let state = { completedThemes: [], completedExams: [] };

function initApp() {
    try {
        const storedDB = localStorage.getItem('cybersec_db_v5');
        if (storedDB) accounts = JSON.parse(storedDB);
        const session = localStorage.getItem('cybersec_session_v5');
        if (session && accounts[session]) loginUser(session);
    } catch(e) {
        accounts = {};
    }
}

// Fonction stricte pour changer de vue (Corrige le bug de superposition)
function switchView(targetViewId) {
    // 1. Cacher toutes les vues
    const views = document.querySelectorAll('.view-section');
    for (let i = 0; i < views.length; i++) {
        views[i].classList.remove('active-view');
        views[i].style.display = 'none'; // Force le masquage
    }
    
    // 2. Afficher uniquement la vue ciblée
    const target = document.getElementById(targetViewId);
    if (target) {
        target.style.display = 'block'; // Force l'affichage avant l'animation
        // Un petit délai pour que l'animation CSS s'applique bien
        setTimeout(() => { target.classList.add('active-view'); }, 10);
    }
    window.scrollTo(0, 0);
}

// --- SIDEBAR ---
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('active');
}

// --- AUTHENTIFICATION ---
function setAuthMode(mode) {
    authMode = mode;
    document.getElementById('tab-login').classList.toggle('active', mode === 'login');
    document.getElementById('tab-register').classList.toggle('active', mode === 'register');
    document.getElementById('auth-btn-action').innerText = mode === 'login' ? "Connexion" : "Créer le compte";
    document.getElementById('auth-msg').style.display = 'none';
}

function processAuth() {
    const user = document.getElementById('auth-user').value.trim();
    const pass = document.getElementById('auth-pass').value.trim();
    const msgBox = document.getElementById('auth-msg');
    
    if (!user || !pass) {
        msgBox.style.display = 'block'; msgBox.style.color = 'var(--danger)'; msgBox.innerText = "Remplissez tous les champs.";
        return;
    }
    const hashedPass = btoa(pass); // Obfuscation basique

    if (authMode === 'register') {
        if (accounts[user]) {
            msgBox.style.display = 'block'; msgBox.style.color = 'var(--danger)'; msgBox.innerText = "Pseudo déjà pris.";
        } else {
            accounts[user] = { pass: hashedPass, completedThemes: [], completedExams: [] };
            localStorage.setItem('cybersec_db_v5', JSON.stringify(accounts));
            msgBox.style.display = 'block'; msgBox.style.color = 'var(--accent)'; msgBox.innerText = "Compte créé ! Connexion...";
            setTimeout(() => loginUser(user), 1000);
        }
    } else {
        if (!accounts[user] || accounts[user].pass !== hashedPass) {
            msgBox.style.display = 'block'; msgBox.style.color = 'var(--danger)'; msgBox.innerText = "Identifiants incorrects.";
        } else {
            loginUser(user);
        }
    }
}

function loginUser(username) {
    activeUser = username;
    localStorage.setItem('cybersec_session_v5', username);
    state.completedThemes = accounts[username].completedThemes || [];
    state.completedExams = accounts[username].completedExams || [];
    
    document.getElementById('auth-user').value = ''; 
    document.getElementById('auth-pass').value = '';
    
    document.getElementById('main-header').classList.add('visible');
    document.getElementById('sidebar-user').innerText = "@" + username;
    
    renderDashboard();
    switchView('dashboard-view');
}

function logout() {
    activeUser = null;
    localStorage.removeItem('cybersec_session_v5');
    document.getElementById('main-header').classList.remove('visible');
    switchView('auth-view');
    document.getElementById('auth-msg').style.display = 'none';
}

function saveProgress() {
    if (activeUser && accounts[activeUser]) {
        accounts[activeUser].completedThemes = state.completedThemes;
        accounts[activeUser].completedExams = state.completedExams;
        localStorage.setItem('cybersec_db_v5', JSON.stringify(accounts));
    }
    updateProfileUI();
}

function updateProfileUI() {
    let pts = (state.completedThemes.length * 100) + (state.completedExams.length * 300);
    document.getElementById('sidebar-points').innerText = pts.toString().padStart(4, '0') + " PTS";
    let rank = "Recrue";
    if(pts >= 200) rank = "Initié";
    if(pts >= 500) rank = "Opérateur";
    document.getElementById('sidebar-rank').innerText = rank;
}

// --- DASHBOARD ---
function renderDashboard() {
    updateProfileUI();
    const container = document.getElementById('levels-container');
    container.innerHTML = '';

    db.forEach((level, index) => {
        const unlocked = index === 0 || state.completedExams.includes(db[index - 1].id);
        const statusBadge = unlocked ? `<span class="status-badge unlocked">🔓 DÉBLOQUÉ</span>` : `<span class="status-badge locked">🔒 REQUIS : NIVEAU ${index}</span>`;

        let themesHTML = '';
        let allThemesDone = true;

        level.themes.forEach(theme => {
            const isDone = state.completedThemes.includes(theme.id);
            if(!isDone) allThemesDone = false;
            const cardClass = "theme-card " + (isDone ? 'completed' : '') + (!unlocked ? ' disabled' : '');
            themesHTML += `<div class="${cardClass}" onclick="openTheme('${theme.id}', ${unlocked})"><div class="theme-title">${theme.title}</div><div class="theme-desc">${theme.desc}</div></div>`;
        });

        let examBtnHTML = '';
        if (unlocked) {
            const examDone = state.completedExams.includes(level.id);
            if (allThemesDone && !examDone) {
                examBtnHTML = `<button class="exam-btn" onclick="openExam(${level.id})">🔥 PASSER L'EXAMEN DU NIVEAU ${level.id} 🔥</button>`;
            } else if (examDone) {
                examBtnHTML = `<div style="text-align:center; color:var(--accent); margin: 0 0 20px 0; font-weight:bold;">[ NIVEAU VALIDÉ À 100% ]</div>`;
            }
        }
        container.innerHTML += `<div class="level-section"><div class="level-header"><h3>${level.title}</h3>${statusBadge}</div><div class="theme-list">${themesHTML}</div>${examBtnHTML}</div>`;
    });
}

// --- MODULES & SIMULATEURS ---
function openTheme(themeId, isUnlocked) {
    if (!isUnlocked) return;
    let currentTheme = null;
    db.forEach(l => l.themes.forEach(t => { if (t.id === themeId) currentTheme = t; }));
    
    document.getElementById('theme-view').dataset.themeId = themeId;
    document.getElementById('lesson-content').innerHTML = currentTheme.content;
    
    const simContainer = document.getElementById('simulator-container');
    if (currentTheme.simType === "terminal") {
        simContainer.innerHTML = `<div class="sim-box"><div class="sim-header">💻 [ TERMINAL ] : ${currentTheme.simData.instruction}</div><input type="text" id="term-input" class="term-input" placeholder="root@academy:~#" autocomplete="off" onkeypress="handleTerm(event, '${btoa(currentTheme.simData.expected)}', '${btoa(currentTheme.simData.successOutput)}')"><div id="term-output" class="term-output">Système prêt. En attente d'instruction...</div></div>`;
    } else if (currentTheme.simType === "sqli") {
        simContainer.innerHTML = `<div class="sim-box"><div class="sim-header">⚙️ [ TARGET ] : ${currentTheme.simData.instruction}</div><input type="text" class="web-input" value="admin" disabled><input type="text" id="sql-input" class="web-input" placeholder="Mot de passe..." oninput="checkSQL()"><div id="sql-output" class="term-output">Accès refusé.</div></div>`;
    } else { 
        simContainer.innerHTML = ''; 
    }

    let quizHTML = '';
    currentTheme.quiz.forEach((q, qIndex) => {
        let optionsHTML = '';
        q.options.forEach((opt, optIndex) => { optionsHTML += `<label><input type="radio" name="q_${qIndex}" value="${btoa(optIndex.toString())}"> ${opt}</label>`; });
        quizHTML += `<div style="margin-bottom:20px;"><p style="font-weight:bold; margin-bottom:10px; color:#fff;">${q.q}</p><div>${optionsHTML}</div></div>`;
    });
    document.getElementById('quiz-content').innerHTML = quizHTML;
    document.getElementById('quiz-result').style.display = 'none';
    
    switchView('theme-view');
}

// Logique Simulateurs
function handleTerm(e, expectedHash, outputHash) {
    if (e.key === 'Enter') {
        const val = e.target.value.trim().toLowerCase();
        if (btoa(val) === expectedHash) document.getElementById('term-output').innerHTML = "<span style='color:var(--accent);'>" + atob(outputHash) + "</span>";
        else document.getElementById('term-output').innerHTML = `<span style='color:var(--danger);'>bash: ${val}: command not found</span>`;
    }
}
function checkSQL() {
    const val = document.getElementById('sql-input').value;
    if (val.includes("' OR 1=1")) document.getElementById('sql-output').innerHTML = "<span style='color:var(--accent);'>[BYPASS RÉUSSI] Authentification contournée.<br>FLAG SECRET : FLAG{bypass_auth_0x1}</span>";
    else document.getElementById('sql-output').innerHTML = "Accès refusé.";
}

function submitThemeQCM() {
    const themeId = document.getElementById('theme-view').dataset.themeId;
    let currentTheme = null;
    db.forEach(l => l.themes.forEach(t => { if (t.id === themeId) currentTheme = t; }));

    let allCorrect = true;
    currentTheme.quiz.forEach((q, index) => {
        const inputs = document.getElementsByName('q_' + index);
        let selectedVal = null;
        for(let i=0; i<inputs.length; i++) { if(inputs[i].checked) selectedVal = inputs[i].value; }
        if (selectedVal !== btoa(q.ans)) allCorrect = false;
    });
    
    const resBox = document.getElementById('quiz-result');
    resBox.style.display = 'block';
    if (allCorrect) {
        resBox.className = 'res-success';
        resBox.style.background = 'rgba(16, 185, 129, 0.2)'; resBox.style.color = 'var(--accent)'; resBox.style.border = '1px solid var(--accent)';
        resBox.innerText = "[+] Module validé avec succès ! Retour au parcours...";
        if (!state.completedThemes.includes(themeId)) { state.completedThemes.push(themeId); saveProgress(); }
        setTimeout(() => { renderDashboard(); switchView('dashboard-view'); }, 1500);
    } else {
        resBox.className = 'res-error';
        resBox.style.background = 'rgba(239, 68, 68, 0.2)'; resBox.style.color = 'var(--danger)'; resBox.style.border = '1px solid var(--danger)';
        resBox.innerText = "[-] Échec. Vérifiez vos réponses et la pratique sur le simulateur.";
    }
}

// --- EXAMEN FINAL ---
function openExam(levelId) {
    document.getElementById('exam-view').dataset.levelId = levelId;
    let currentLevel = null;
    db.forEach(l => { if (l.id === levelId) currentLevel = l; });
    
    let examHTML = '';
    currentLevel.exam.forEach((q, qIndex) => {
        let optionsHTML = '';
        q.options.forEach((opt, optIndex) => { optionsHTML += `<label><input type="radio" name="e_${qIndex}" value="${btoa(optIndex.toString())}"> ${opt}</label>`; });
        examHTML += `<div style="margin-bottom:20px;"><p style="font-weight:bold; margin-bottom:10px; color:#fff;">${q.q}</p><div>${optionsHTML}</div></div>`;
    });
    document.getElementById('exam-content').innerHTML = examHTML;
    document.getElementById('exam-result').style.display = 'none';
    
    switchView('exam-view');
}

function submitExam() {
    const levelId = parseInt(document.getElementById('exam-view').dataset.levelId);
    let currentLevel = null;
    db.forEach(l => { if (l.id === levelId) currentLevel = l; });

    let allCorrect = true;
    currentLevel.exam.forEach((q, index) => {
        const inputs = document.getElementsByName('e_' + index);
        let selectedVal = null;
        for(let i=0; i<inputs.length; i++) { if(inputs[i].checked) selectedVal = inputs[i].value; }
        if (selectedVal !== btoa(q.ans)) allCorrect = false;
    });
    
    const resBox = document.getElementById('exam-result');
    resBox.style.display = 'block';
    if (allCorrect) {
        resBox.className = 'res-success';
        resBox.style.background = 'rgba(16, 185, 129, 0.2)'; resBox.style.color = 'var(--accent)'; resBox.style.border = '1px solid var(--accent)';
        resBox.innerText = "EXAMEN RÉUSSI !";
        if (!state.completedExams.includes(levelId)) { state.completedExams.push(levelId); saveProgress(); }
        setTimeout(() => { renderDashboard(); switchView('dashboard-view'); }, 1500);
    } else {
        resBox.className = 'res-error';
        resBox.style.background = 'rgba(239, 68, 68, 0.2)'; resBox.style.color = 'var(--danger)'; resBox.style.border = '1px solid var(--danger)';
        resBox.innerText = "Échec. Vous devez avoir 100% de bonnes réponses.";
    }
}

// Lancement au chargement de la page
window.onload = initApp;
