/* =========================================================================
   CYBERACADEMY PRO - Core Engine
   Auteur : Équipe CyberAcademy
   Features : Grands Cours Pédagogiques, CTF Verrouillés, CIDR Tool
   ========================================================================= */

// =========================================================================
// 1. BASE DE DONNÉES DES PILIERS (COURS MASSIFS)
// =========================================================================

const trackDB = {
    "red": [
        {
            id: 101, title: "Niveau 1 : Reconnaissance et Fondations",
            themes: [
                { 
                    id: "r_linux", title: "Le Cœur de Linux", desc: "Architecture, permissions et fichiers cachés.", 
                    content: `
                        <h2>Pourquoi Linux est incontournable ?</h2>
                        <p>Plus de 90% des serveurs qui font tourner Internet utilisent Linux. Un professionnel de la cybersécurité doit maîtriser la ligne de commande sur le bout des doigts. Contrairement à Windows, sous Linux, <strong>tout est un fichier</strong>.</p>
                        <div class="media-wrapper">
                            <img src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80" alt="Terminal Linux">
                        </div>
                        <h2>La navigation absolue et relative</h2>
                        <p>Pour vous déplacer, on utilise la commande <code>cd</code> (Change Directory). Pour vérifier vos privilèges sur un fichier, on regarde les permissions (Lecture, Écriture, Exécution).</p>
                        <h2>Le secret des fichiers cachés</h2>
                        <p>Les administrateurs masquent souvent des fichiers sensibles (comme des clés <code>.ssh</code>). Sous Linux, il suffit d'ajouter un point (<code>.</code>) au début du nom de fichier. La commande classique <code>ls</code> ne l'affichera pas. Il faut utiliser l'argument "all" : <code>ls -a</code>.</p>
                    `, 
                    simType: "terminal", 
                    simData: { instruction: "Affichez tous les fichiers cachés du répertoire actuel.", expected: "ls -a", successOutput: "Exécution réussie.\nFichiers détectés : config.php, index.html, .secret_flag" }, 
                    quiz: [{ q: "Quelle commande permet de forcer l'affichage des fichiers cachés sous Linux ?", options: ["cd /", "ls -a", "pwd", "whoami"], ans: "1" }] 
                },
                { 
                    id: "r_sqli", title: "Injection SQL (SQLi)", desc: "Détruire la logique d'une base de données.", 
                    content: `
                        <h2>Qu'est-ce que le langage SQL ?</h2>
                        <p>Les bases de données stockent les informations vitales d'un site. Le serveur web interroge ces bases de données en utilisant le langage SQL. Une requête typique ressemble à :<br> <code>SELECT * FROM users WHERE login='admin' AND password='mon_mot_de_passe'</code></p>
                        <div class="media-wrapper video-container">
                            <iframe src="https://www.youtube.com/embed/ciNHn38FEHQ" allowfullscreen></iframe>
                        </div>
                        <h2>L'art de l'Injection (Bypass)</h2>
                        <p>Si le développeur n'a pas filtré l'entrée, l'attaquant peut taper du code SQL dans le champ de mot de passe. La technique de contournement la plus célèbre est <code>' OR 1=1 --</code>.</p>
                        <ul>
                            <li>L'apostrophe (<strong>'</strong>) ferme le champ de texte prématurément.</li>
                            <li><strong>OR 1=1</strong> crée une condition mathématiquement toujours vraie. La base de données autorise donc l'accès.</li>
                            <li>Les tirets (<strong>--</strong>) transforment le reste de la requête en commentaire, la neutralisant totalement.</li>
                        </ul>
                    `, 
                    simType: "sqli", 
                    simData: { instruction: "Bypassez ce panneau d'administration en utilisant la payload SQLi vue en cours." }, 
                    quiz: [{ q: "Quel est l'objectif des tirets '--' dans une injection SQL ?", options: ["Mettre la suite de la requête en commentaire", "Chiffrer le mot de passe", "Faire planter le serveur"], ans: "0" }] 
                }
            ],
            exam: [{ q: "Quelle faille cible la base de données située sur le Backend d'un serveur ?", options: ["Cross-Site Scripting (XSS)", "Injection SQL (SQLi)", "Déni de service (DDoS)"], ans: "1" }]
        }
    ],
    "blue": [
        {
            id: 201, title: "Niveau 1 : Analyse & Investigation",
            themes: [
                { 
                    id: "b_logs", title: "Analyse de Logs Serveur", desc: "Traquer un attaquant dans Apache.", 
                    content: `
                        <h2>Le journal de bord du serveur</h2>
                        <p>Dans un Centre Opérationnel de Sécurité (SOC), le rôle du défenseur est de surveiller les traces laissées par les attaquants dans des fichiers de "logs".</p>
                        <div class="media-wrapper">
                            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" alt="Serveurs">
                        </div>
                        <h2>Identifier une attaque</h2>
                        <p>Un utilisateur normal demandera la page <code>GET /index.html</code> (Code 200 OK). Un attaquant laissera des traces de ses tentatives. Par exemple : <code>GET /login.php?user=' UNION SELECT</code> montre qu'une attaque SQLi est en cours depuis cette IP.</p>
                    `, 
                    simType: "logs", 
                    simData: { instruction: "Lisez les logs et trouvez l'Adresse IP de l'attaquant qui tente une SQLi." }, 
                    quiz: [{ q: "Lorsqu'une page se charge avec succès, quel code HTTP le serveur renvoie-t-il ?", options: ["404 Not Found", "200 OK", "500 Internal Error"], ans: "1" }] 
                }
            ],
            exam: [{ q: "En Blue Team, quel fichier doit-on examiner en priorité après une attaque web ?", options: ["Les fichiers de logs d'accès", "Le code source de la page d'accueil"], ans: "0" }]
        }
    ],
    "code": [
        {
            id: 301, title: "Niveau 1 : Python pour le Hacking",
            themes: [
                { 
                    id: "c_py1", title: "Requêtes Web en Python", desc: "Automatiser l'interaction web.", 
                    content: `
                        <h2>Pourquoi Python ?</h2>
                        <p>Python est le langage de prédilection en cybersécurité. Que ce soit pour développer un scanner de ports ou automatiser un bruteforce, c'est l'outil parfait.</p>
                        <h2>Le module Requests</h2>
                        <p>Pour qu'un script puisse télécharger le code source d'une page web, on utilise la bibliothèque <code>requests</code>. La commande de base est : <code>import requests</code>.</p>
                    `, 
                    simType: "code", 
                    simData: { instruction: "Écrivez le code Python exact pour importer le module permettant de faire des requêtes HTTP." }, 
                    quiz: [{ q: "Quel module Python est le standard pour envoyer des requêtes web ?", options: ["os", "socket", "requests"], ans: "2" }] 
                }
            ],
            exam: [{ q: "Quelle est la principale force de Python en cyber ?", options: ["Langage très bas niveau", "Prototypage et automatisation ultra-rapides"], ans: "1" }]
        }
    ],
    "dev": [
        {
            id: 401, title: "Niveau 1 : Architecture du Web",
            themes: [
                { 
                    id: "d_html", title: "Le DOM (HTML)", desc: "Comprendre la structure d'une page.", 
                    content: `
                        <h2>Le Document Object Model</h2>
                        <p>Le HTML structure la page avec des balises. Un hacker (Red Team) doit comprendre cela pour trouver des failles XSS ou des commentaires cachés laissés par les développeurs.</p>
                        <p>Un titre principal s'écrit <code>&lt;h1&gt;Texte&lt;/h1&gt;</code>.</p>
                    `, 
                    simType: "dev_html", 
                    simData: { instruction: "Écrivez la balise HTML pour créer un titre h1 contenant le mot 'Hack'." }, 
                    quiz: [{ q: "Quelle balise insère un lien cliquable ?", options: ["<link>", "<a>", "<href>"], ans: "1" }] 
                }
            ],
            exam: [{ q: "Lequel de ces langages gère uniquement le design visuel ?", options: ["HTML", "JavaScript", "CSS"], ans: "2" }]
        }
    ]
};

// =========================================================================
// 2. BASE DE DONNÉES CTF (AVEC SYSTÈME DE DÉBLOCAGE)
// =========================================================================

const ctfDB = [
    { id: "ctf1", title: "L'Inspecteur", difficulty: "Débutant", category: "Web", points: 100, reqTrack: "dev", reqLevel: 401, desc: "Fouillez le code source du faux navigateur pour trouver le flag.", expectedFlag: "FLAG{html_source_ez}", simType: "html" },
    { id: "ctf2", title: "Injection Critique", difficulty: "Intermédiaire", category: "Web", points: 250, reqTrack: "red", reqLevel: 101, desc: "Bypassez ce panneau de connexion aveugle.", expectedFlag: "FLAG{red_team_sql}", simType: "sqli" },
    { id: "ctf3", title: "Log Hunter", difficulty: "Intermédiaire", category: "Blue Team", points: 300, reqTrack: "blue", reqLevel: 201, desc: "Retrouvez l'IP de l'attaquant dans ces logs.", expectedFlag: "FLAG{blue_log_master}", simType: "ctf_logs" },
    { id: "ctf4", title: "Poupées Russes", difficulty: "Débutant", category: "Crypto", points: 150, reqTrack: null, reqLevel: null, desc: "Décodez ce message : RkxBR3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259", expectedFlag: "FLAG{base64_is_not_encryption}", simType: "crypto" },
    { id: "ctf5", title: "OSINT Fantôme", difficulty: "Expert", category: "OSINT", points: 600, reqTrack: "red", reqLevel: 101, desc: "Utilisez le terminal HUD. Vérifiez votre identité ('whoami'), puis demandez un indice ('search').", expectedFlag: "FLAG{osint_ghost_tracker}", simType: "osint" }
];

// =========================================================================
// 3. LOGIQUE D'ÉTAT & SÉCURITÉ
// =========================================================================

let accounts = {};
let activeUser = null;
let currentTrack = null;
let authMode = 'login';
let state = { completedCourses: [], completedExams: [], completedCTF: [] };

async function initApp() {
    try {
        const storedDB = localStorage.getItem('cyberacademy_pro_v2');
        if (storedDB) accounts = JSON.parse(storedDB);
        const session = localStorage.getItem('cyberacademy_session_v2');
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

// =========================================================================
// 4. NAVIGATION & AUTHENTIFICATION
// =========================================================================

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
}

function setAuthMode(mode) {
    authMode = mode;
    document.getElementById('tab-login').classList.toggle('active', mode === 'login');
    document.getElementById('tab-register').classList.toggle('active', mode === 'register');
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
            localStorage.setItem('cyberacademy_pro_v2', JSON.stringify(accounts));
            msgBox.style.display='block'; msgBox.style.color='var(--accent)'; msgBox.innerText="Opérateur enregistré.";
            setTimeout(() => loginUser(user), 1000);
        }
    } else {
        if (!accounts[user] || accounts[user].passHash !== secureHash) { msgBox.style.display='block'; msgBox.style.color='var(--danger)'; msgBox.innerText="Accès refusé."; } 
        else { loginUser(user); }
    }
}

function loginUser(username) {
    activeUser = username;
    localStorage.setItem('cyberacademy_session_v2', username);
    state = {
        completedCourses: accounts[username].completedCourses || [],
        completedExams: accounts[username].completedExams || [],
        completedCTF: accounts[username].completedCTF || []
    };
    
    document.getElementById('main-header').style.display = 'flex';
    document.getElementById('header-user').innerText = "@" + username;
    
    updateProfileUI();
    switchView('dashboard-view');
}

function logout() {
    activeUser = null;
    localStorage.removeItem('cyberacademy_session_v2');
    document.getElementById('main-header').style.display = 'none';
    switchView('auth-view');
}

function saveProgress() {
    if (activeUser && accounts[activeUser]) {
        accounts[activeUser] = { ...accounts[activeUser], ...state };
        localStorage.setItem('cyberacademy_pro_v2', JSON.stringify(accounts));
    }
    updateProfileUI();
}

function updateProfileUI() {
    let pts = (state.completedCourses.length * 50) + (state.completedExams.length * 200) + (state.completedCTF.length * 150);
    document.getElementById('header-points').innerText = pts.toString().padStart(4, '0') + " PTS";
    let rank = "Recrue"; if(pts >= 500) rank = "Initié"; if(pts >= 1200) rank = "Opérateur";
    document.getElementById('header-rank').innerText = rank;
}

// =========================================================================
// 5. MOTEUR DES COURS ET SIMULATEURS
// =========================================================================

function openTrack(trackKey) {
    currentTrack = trackKey;
    document.getElementById('tracks-selection').style.display = 'none';
    document.getElementById('track-content').style.display = 'block';
    
    const titles = { "dev": "🌐 Fondations Web", "red": "🔴 Red Team", "blue": "🔵 Blue Team", "code": "💻 Scripting Python" };
    document.getElementById('current-track-title').innerText = titles[trackKey];
    
    const container = document.getElementById('levels-container');
    container.innerHTML = '';
    
    trackDB[trackKey].forEach((level, index) => {
        const unlocked = index === 0 || state.completedExams.includes(trackDB[trackKey][index - 1].id);
        const statusBadge = unlocked ? `<span class="status-badge unlocked">🔓 DÉBLOQUÉ</span>` : `<span class="status-badge locked">🔒 VERROUILLÉ</span>`;

        let themesHTML = ''; let allThemesDone = true;
        level.themes.forEach(theme => {
            const isDone = state.completedCourses.includes(theme.id);
            if(!isDone) allThemesDone = false;
            const cardClass = "theme-card " + (isDone ? 'completed' : '') + (!unlocked ? ' disabled' : '');
            themesHTML += `<div class="${cardClass}" onclick="openCourse('${trackKey}', '${theme.id}', ${unlocked})"><div class="theme-title">${theme.title}</div><div class="theme-desc">${theme.desc}</div></div>`;
        });

        container.innerHTML += `<div class="level-section"><div class="level-header"><h3>${level.title}</h3>${statusBadge}</div><div class="theme-grid">${themesHTML}</div></div>`;
    });
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
    else if (currentCourse.simType === "dev_html") { simC.innerHTML = `<div class="sim-box sim-dev"><div class="sim-header">🌐 [ HTML EDITOR ] : ${currentCourse.simData.instruction}</div><textarea id="html-input" class="web-input code-editor" placeholder="<!-- Code HTML ici -->"></textarea><button class="auth-btn" style="background:#a855f7; margin-top:0;" onclick="checkHTML()">RENDRE LA PAGE</button><div id="html-output" class="term-output" style="margin-top:15px; background:#fff; color:#000; padding:10px; border-radius:4px;"></div></div>`; }
    else if (currentCourse.simType === "sqli") { simC.innerHTML = `<div class="sim-box sim-red"><div class="sim-header">⚙️ [ TARGET ] : ${currentCourse.simData.instruction}</div><input type="text" id="sql-input" class="web-input" placeholder="Mot de passe..."><button class="auth-btn" style="background:var(--danger);" onclick="checkSQL()">Login</button><div id="sql-output" class="term-output"></div></div>`; }
    else if (currentCourse.simType === "logs") { simC.innerHTML = `<div class="sim-box sim-blue"><div class="sim-header">🔵 [ LOG VIEWER ] : ${currentCourse.simData.instruction}</div><div class="log-viewer">10.0.0.1 - GET / HTTP/1.1<br>192.168.1.50 - GET /login?user=' OR 1=1 --</div><input type="text" id="log-input" class="web-input" placeholder="IP..."><button class="auth-btn" style="background:#3b82f6;" onclick="checkLogs()">Analyser</button><div id="log-output" class="term-output"></div></div>`; }
    else if (currentCourse.simType === "code") { simC.innerHTML = `<div class="sim-box sim-code"><div class="sim-header">💻 [ PYTHON ] : ${currentCourse.simData.instruction}</div><textarea id="code-input" class="web-input code-editor" placeholder="# Script..."></textarea><button class="auth-btn" style="background:var(--accent);" onclick="checkCode()">RUN</button><div id="code-output" class="term-output"></div></div>`; }
    else { simC.innerHTML = ''; }
    
    let quizHTML = '';
    currentCourse.quiz.forEach((q, qIndex) => {
        let optionsHTML = '';
        q.options.forEach((opt, optIndex) => { optionsHTML += `<label><input type="radio" name="cq_${qIndex}" value="${btoa(optIndex.toString())}"> ${opt}</label>`; });
        quizHTML += `<div style="margin-bottom:20px;"><p style="font-weight:bold; margin-bottom:10px; color:#fff;">${q.q}</p><div>${optionsHTML}</div></div>`;
    });
    document.getElementById('quiz-content').innerHTML = quizHTML;
    document.getElementById('quiz-result').style.display = 'none';
    switchView('theme-view');
}

function handleTerm(e, expectedHash, outputHash) { if (e.key === 'Enter') { const val = escapeHTML(e.target.value.trim().toLowerCase()); if (btoa(val) === expectedHash) { document.getElementById('term-output').innerHTML = "<span style='color:var(--accent);'>" + atob(outputHash) + "</span>"; } else { document.getElementById('term-output').innerHTML = `<span style='color:var(--danger);'>bash: ${val}: command not found</span>`; } } }
function checkHTML() { const val = document.getElementById('html-input').value.trim(); const out = document.getElementById('html-output'); out.innerHTML = val; if (val.includes("<h1>Hack</h1>") || val.includes("<h1> Hack </h1>")) { out.innerHTML += "<br><br><span style='color:#a855f7; font-weight:bold;'>[SUCCÈS] DOM modifié.</span>"; } else { out.innerHTML += "<br><br><span style='color:red;'>[ERREUR] Balise H1 introuvable.</span>"; } }
function checkSQL() { const val = document.getElementById('sql-input').value; if (val.includes("' OR 1=1")) { document.getElementById('sql-output').innerHTML = "<span style='color:var(--accent);'>[BYPASS RÉUSSI]</span>"; } else { document.getElementById('sql-output').innerHTML = "Accès refusé."; } }
function checkLogs() { const val = document.getElementById('log-input').value.trim(); if (val === "192.168.1.50") { document.getElementById('log-output').innerHTML = "<span style='color:var(--accent);'>[IP CONFIRMÉE] Attaque identifiée.</span>"; } else { document.getElementById('log-output').innerHTML = "Anomalie non détectée."; } }
function checkCode() { const val = document.getElementById('code-input').value.trim(); if (val.includes("import requests")) { document.getElementById('code-output').innerHTML = "<span style='color:var(--accent);'>[SCRIPT VALIDE] Module Http chargé.</span>"; } else { document.getElementById('code-output').innerHTML = "<span style='color:var(--danger);'>Erreur.</span>"; } }

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
        resBox.innerText = "[+] Validé !";
        if (!state.completedCourses.includes(courseId)) { state.completedCourses.push(courseId); saveProgress(); openTrack(currentTrack); }
        setTimeout(() => switchView('dashboard-view'), 1000);
    } else {
        resBox.className = 'res-error'; resBox.style.background = 'rgba(239, 68, 68, 0.2)'; resBox.style.color = 'var(--danger)'; resBox.style.border = '1px solid var(--danger)';
        resBox.innerText = "[-] Échec de l'audit. Relisez le cours.";
    }
}

// =========================================================================
// 6. ZONE CTF (DÉBLOCAGE SOUS CONDITION)
// =========================================================================

function renderCTF() {
    const container = document.getElementById('ctf-container');
    container.innerHTML = '';
    
    // Mettre à jour l'affichage en fonction de la progression de l'utilisateur
    ctfDB.forEach(ctf => {
        const isDone = state.completedCTF.includes(ctf.id);
        
        // VÉRIFICATION DU NIVEAU REQUIS POUR DÉBLOQUER LE CTF
        // Si le CTF n'a pas de condition (reqTrack null) OU si l'utilisateur a fini l'examen requis, on débloque.
        let isUnlocked = false;
        if(ctf.reqTrack === null) {
            isUnlocked = true;
        } else if (state.completedExams.includes(ctf.reqLevel)) {
            isUnlocked = true;
        }

        let catColor = "var(--danger)";
        if(ctf.category === "Blue Team" || ctf.category === "Forensics") catColor = "#3b82f6";
        if(ctf.category === "Code (Python)") catColor = "var(--accent)";
        
        if (isUnlocked) {
            const cardClass = "theme-card " + (isDone ? 'completed' : '');
            container.innerHTML += `<div class="${cardClass}" style="border-left: 4px solid ${catColor};" onclick="openCTF('${ctf.id}')"><div style="color:${catColor}; font-size:0.8rem; font-weight:bold; margin-bottom:5px;">[${ctf.category}] ${ctf.difficulty} | ${ctf.points} PTS</div><div class="theme-title">${ctf.title}</div><div class="theme-desc">${ctf.desc}</div></div>`;
        } else {
            // Affichage verrouillé
            container.innerHTML += `<div class="theme-card ctf-locked" style="border-left: 4px solid #333;"><div class="lock-icon">🔒</div><div style="color:var(--text-muted); font-size:0.8rem; font-weight:bold; margin-bottom:5px;">[${ctf.category}] ${ctf.difficulty}</div><div class="theme-title">${ctf.title}</div><div class="theme-desc">Requis : Valider le pilier ${ctf.reqTrack.toUpperCase()} (Niveau ${ctf.reqLevel})</div></div>`;
        }
    });
}

function openCTF(ctfId) {
    let currentCTF = null; ctfDB.forEach(c => { if(c.id === ctfId) currentCTF = c; });
    document.getElementById('challenge-view').dataset.ctfId = ctfId;
    document.getElementById('challenge-desc').innerHTML = `<h2>${currentCTF.title}</h2><p>${currentCTF.desc}</p>`;
    
    const simC = document.getElementById('challenge-sim-container');
    if(currentCTF.simType === "html") { simC.innerHTML = `<div class="sim-box"><div class="sim-header">💻 Faux Navigateur Web</div><div style="background:#fff; color:#000; padding:20px; text-align:center;"><h1>Admin</h1></div><button onclick="document.getElementById('source-code').style.display='block'" class="btn-back" style="margin-top:10px;">[Clic-droit] > Code source</button><div id="source-code" style="display:none; margin-top:15px; color:#4ade80; font-family:monospace;">&lt;html&gt;<br>&nbsp;&nbsp;&lt;!-- FLAG{html_source_ez} --&gt;<br>&lt;/html&gt;</div></div>`; }
    else if(currentCTF.simType === "crypto") { simC.innerHTML = `<div class="sim-box"><div class="sim-header">Intercepté</div><div style="word-break:break-all; color:var(--warning); font-family:monospace;">RkxBR3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259</div></div>`; }
    else if(currentCTF.simType === "sqli") { simC.innerHTML = `<div class="sim-box sim-red"><div class="sim-header">⚙️ [ TARGET ] : ${currentCTF.desc}</div><input type="text" id="ctf-sql-input" class="web-input" placeholder="Mot de passe..."><button class="auth-btn" style="background:var(--danger);" onclick="checkCTFSQL()">Login</button><div id="ctf-sql-output" class="term-output"></div></div>`; }
    else if(currentCTF.simType === "ctf_logs") { simC.innerHTML = `<div class="sim-box sim-blue"><div class="sim-header">Log Server (14:00 - 14:05)</div><div class="log-viewer">14:01 - 10.0.0.1 - GET /index.html<br>14:02 - 172.16.0.4 - GET /login.php?admin=1</div><input type="text" id="ctf-log-input" class="web-input" placeholder="IP Attaquant..."><button class="auth-btn" style="background:#3b82f6;" onclick="checkCTFLog()">Valider</button><div id="ctf-log-out" class="term-output"></div></div>`; }
    else if(currentCTF.simType === "osint") { simC.innerHTML = `<div class="sim-box"><div class="sim-header">Terminal OSINT</div><p style="color:var(--text-muted); font-size:0.9rem;">Utilisez le HUD. Tapez 'whoami', puis 'search'.</p></div>`; }
    else { simC.innerHTML = ''; }
    
    document.getElementById('flag-input').value = '';
    document.getElementById('flag-result').style.display = 'none';
    switchView('challenge-view');
}

function checkCTFSQL() { const val = document.getElementById('ctf-sql-input').value; if (val.includes("' OR 1=1")) { document.getElementById('ctf-sql-output').innerHTML = "<span style='color:var(--accent);'>[BYPASS RÉUSSI] FLAG{red_team_sql}</span>"; } else { document.getElementById('ctf-sql-output').innerHTML = "Accès refusé."; } }
function checkCTFLog() { const val = document.getElementById('ctf-log-input').value.trim(); if(val === "172.16.0.4") { document.getElementById('ctf-log-out').innerHTML = "<span style='color:var(--accent);'>Correct. FLAG{blue_log_master}</span>"; } else { document.getElementById('ctf-log-out').innerHTML = "Incorrect."; } }

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
        resBox.innerText = "[-] Flag Incorrect. Try harder.";
    }
}

// =========================================================================
// 7. TERMINAL HUD & NOUVEL OUTIL CIDR
// =========================================================================

function toggleHUD() { document.getElementById('hud-terminal').classList.toggle('open'); }

function handleHUD(e) {
    if (e.key === 'Enter') {
        const inputEl = document.getElementById('hud-input');
        const outEl = document.getElementById('hud-output');
        const val = escapeHTML(inputEl.value.trim().toLowerCase());
        
        outEl.innerHTML += `<br><span style="color:var(--accent);">> ${val}</span>`;
        let response = "";
        
        if (val === "help") response = "\n--- SYS COMMANDS ---\n1. help\n2. whoami\n3. pwd\n4. ls -a\n5. search : Indice (1/jour)";
        else if (val === "whoami") response = `User: ${activeUser || "Anonymous"}`;
        else if (val === "pwd") response = "/var/www/cyberacademy";
        else if (val === "ls -a") response = ".bash_history  .secret_flag";
        else if (val === "search") response = "💡 Indice (CTF OSINT) : Le flag complet est FLAG{osint_ghost_tracker}";
        else if (val !== "") response = `bash: ${val}: command not found`;
        
        outEl.innerHTML += `<br><span style="color:var(--text-main);">${response}</span>`;
        outEl.scrollTop = outEl.scrollHeight;
        inputEl.value = '';
    }
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

// NOUVEL OUTIL RÉEL : CALCULATEUR CIDR
function calculateCIDR() {
    const input = document.getElementById('tool-ip-in').value.trim();
    const out = document.getElementById('tool-ip-out');
    
    if (!input.includes('/')) {
        out.innerHTML = "<span style='color:var(--danger);'>Erreur : Format attendu (ex: 192.168.1.0/24)</span>";
        return;
    }
    
    const parts = input.split('/');
    const ip = parts[0];
    const mask = parseInt(parts[1]);
    
    if (mask < 0 || mask > 32) {
        out.innerHTML = "<span style='color:var(--danger);'>Erreur : Le masque doit être entre /0 et /32</span>";
        return;
    }
    
    const hosts = Math.pow(2, 32 - mask);
    const usableHosts = mask >= 31 ? 0 : hosts - 2;
    
    out.innerHTML = `
        <span style="color:var(--accent);">[+] Analyse de la notation CIDR terminée :</span><br>
        Réseau analysé : ${ip}<br>
        Masque (Bits) : /${mask}<br>
        Total adresses (Hosts) : ${hosts}<br>
        <span style="color:var(--warning);">Hôtes utilisables : ${usableHosts}</span><br>
        <br><span style="color:var(--text-muted); font-size:0.8rem;">* En Pentest, scanner un /24 (254 hôtes) est rapide. Un /16 (65 534 hôtes) demande de l'automatisation.</span>
    `;
}

// Lancement
window.onload = initApp;
