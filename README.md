# 🎵 SUNO FORGE – Générateur de prompts pour Suno 4.5

> Créez des prompts musicaux optimisés pour le modèle Suno 4.5 avec une interface réactive.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Fonctionnalités complètes

### 🏷️ Catégories principales (5)
- **Metal** – Viking Folk Metal, Black Metal Atmosphérique, Melodic Death Metal, Doom, Power Metal, Symphonic, Industrial, Post-Metal
- **Cinématique** – Epic Orchestral, Viking Cinématique, Dark Thriller Score, Fantasy RPG, Néoclassique, Grégorien, Score Nordique
- **Folk & World** – Celtic Irlandais, Nordic Folk, Folk Acoustique, Médiéval, Pagan Rituel, World Tribal, Bard
- **Electronic** – Synthwave, Darksynth, Dark Ambient, Pagan Electronic, Lo-fi Chillhop, Tribal Electronic, EBM/Aggrotech
- **Urban** – Jazz Noir, Hip-Hop Boom Bap, Trap, R&B Neo-Soul, Funk Groove, Blues Électrique, Dark Pop Cinématique

### 🎭 Moods (14 ambiances, max 5)
Épique · Sombre · Mystique · Rituel · Triomphant · Mélancolique · Agressif · Atmosphérique · Primal · Paisible · Furieux · Spirituel · Hypnotique · Dramatique

### 🎤 Voix (7 groupes, max 5 tags)
- **Registre** : masculine, féminine, mixte, ténor, baryton, basse, soprano, contralto, contre-ténor
- **Style** : clean, harsh, death growls, black metal screams, guttural, falsetto, chuchoté, aéré, râpeuse, spoken word, opératique, lyrique, folk, bluesy, soul, rap, mélodique, trap ad libs, nasal folk, yodel
- **Chœur & Groupe** : mixte, masculin, féminin, épique, harmonies, backing vocals, call and response, antiphonie, unisson, barbershop
- **Traditionnel & Rituel** : throat singing, khoomei, diphonique, grégorien, rituel, joïk sami, chamanique, bardique, védique, qawwali
- **Technique vocale** : vibrato, mélismatique, belting, voix de tête/poitrine, scat, vocalises, fredonné, crooning, sprechgesang, legato
- **Traitement & Effets** : vocoder, auto-tune, saturé, réverb intense, pitch-shifted, double tracking, a cappella
- **Absence** : sans voix, instrumental

### 🎸 Instruments (par catégorie)
- **Metal** : guitares (élec, saturée, twin, 7 cordes, drop tuning, baryton, classique) · folk nordique (vielle à roue, nyckelharpa, tagelharpa, hardanger, violon folk, flûte en os, cor de guerre, cornemuse, tin whistle) · percussions (double grosse caisse, tambours de guerre, frame drums, blast beat, tribales) · basse & cordes (basse lourde/saturée, violoncelle, orchestre cordes) · claviers & vents (orgue, synthé, piano, duduk, bombarde)
- **Cinématique** : cordes (orchestre, violons, violoncelles, alto, quatuor, violon solo) · cuivres (section, cor français, trompette, trombone, tuba, bugle) · bois (flûte, hautbois, clarinette, basson, cor anglais) · percussions (timbales, taiko, percussions orchestrales, tam-tam, caisse claire) · claviers (piano à queue, orgue à tuyaux, clavecin, célesta, harpe) · nordique & chœur (chœur épique, vocalises, nyckelharpa, frame drums, flûte nordique, tagelharpa)
- **Folk & World** : celtique (tin whistle, uilleann pipes, fiddle, bodhrán, harpe celtique, accordéon, concertina) · nordique (nyckelharpa, hardanger, tagelharpa, vielle à roue, frame drums, kantele, flûte en os, lur) · médiéval (luth, flûte à bec, chalumeau, dulcimer, cromorne, rebec) · world (sitar, tabla, djembé, kora, oud, darbuka, didgeridoo, mbira) · acoustique (guitare, banjo, mandoline, contrebasse, harmonica, autoharp)
- **Electronic** : synthétiseurs (analogique, modulaire, Moog, pads, lead, polyphonique) · rythme (808, 909, batterie programmée, TR-606) · basse électronique (808 bass, sub bass, basse synth, acid bass) · effets & textures (vocoder, thérémine, synthé saturé, bruit industriel, granulaire, sampler) · tribal & ethnique (frame drums électroniques, samples tribaux/ethniques)
- **Urban** : jazz (contrebasse, piano jazz, baguettes brosses, saxophone, trompette, guitare jazz, Hammond, vibraphone) · hip-hop (808 bass, drums samplés, samples vinyle, charleston, boom bap) · R&B/soul (Rhodes, piano électrique, basse, section cuivres, cordes soul) · blues/funk (slide guitar, guitare blues, harmonica, basse funky, wah-wah, clavinet)

### 🛠️ Techniques de jeu (dynamiques par instrument)
Plus de 200 techniques associées aux instruments (palm muting, blast beats, fingerpicking, tapping, sweep picking, vibrato, power chords, legato, double stopping, polyrythmies, etc.)

### 🎛️ Production & Tempo
- **Production** : High production, Lo-fi/Raw, Organique, Cinématique, Dense/Saturé, Épuré/Minimaliste, Analog Warmth, Cold Digital
- **Tempo** : Funeral pace, Lent/Downtempo, Mid-tempo, Driving rhythm, Rapide/Energetic, Blast beat speed

### 🎼 Théorie musicale (NOUVEAU)
- **Tonalité** : 24 tonalités (majeures et mineures) – C, G, D, A, E, B, F#, C#, F, Bb, Eb, Ab et leurs relatives mineures
- **Tempo (BPM)** : réglage de 30 à 300 BPM (pas de 5)
- **Signature rythmique** : 12 signatures (4/4, 3/4, 2/4, 6/8, 9/8, 12/8, 5/4, 7/8, 5/8, 7/4, 3/2, 2/2)

### 🔧 Autres fonctionnalités
- **Mode libre** : saisie textuelle complète (description personnalisée)
- **Génération locale** : aucun appel API externe – prompts générés instantanément
- **Contrainte Suno respectée** : champ `style` limité à **200 caractères** avec compteur et barre de progression colorée (vert <170, orange 170-190, rouge >190)
- **Métatags pour paroles** : structure suggérée (`[Intro]`, `[Verse]`, `Pre-Chorus`, `[Chorus]`, `[Bridge]`, `[Outro]`, `[Solo]`, `[Breakdown]`, etc.) adaptée à chaque catégorie
- **Conseils dynamiques** : astuces personnalisées selon vos sélections
- **Variantes de prompt** : trois versions alternatives (Épique, Intime, Aggressive) prêtes à copier
- **Interface responsive** : deux colonnes sur desktop, bascule en colonne unique sur mobile
- **Design sombre et contrasté** : polices *Cinzel* (titres) et *Crimson Pro* (corps), palette inspirée des runes nordiques, contraste optimisé pour une lisibilité maximale
- **Copie rapide** : chaque bloc (style, métatags, variantes) dispose d’un bouton Copier

## 📦 Dépendances

| Package | Version | Utilisation |
|---------|---------|-------------|
| react | ^18.2.0 | Framework UI |
| react-dom | ^18.2.0 | Rendu DOM |
| lucide-react | ^0.263.1 | Icônes (Copy, Check, Wand2, etc.) |
| react-scripts | 5.0.1 | Outils de build et développement |

## 🚀 Installation

```bash
git clone https://github.com/sebastienbats/suno-forge.git
cd suno-forge
npm install
npm start
```
L’application sera accessible sur http://localhost:3000.

## 🧙 Utilisation
Choisissez le mode : “Guidé” (sélecteurs) ou “Libre” (description texte).

Mode guidé :
- Sélectionnez une catégorie (5 runes disponibles).
- Choisissez un sous‑style.
- Ajoutez jusqu’à 5 moods et 5 tags vocaux.
- Sélectionnez des instruments (affichage hiérarchique par groupes).
- Affinez avec des techniques de jeu (apparaissent dynamiquement selon les instruments choisis).
- Définissez la production, le tempo (prédéfini ou BPM personnalisé), la tonalité et la signature rythmique.
- Cliquez sur “FORGER LE PROMPT”.

Récupérez le résultat :
- Champ style : compteur 120 caractères + jauge colorée (vert <100, jaune >100, rouge >115)
- Métatags : structure de paroles prête à copier
- Conseils : astuces pour améliorer vos prompts
- Variantes : trois versions alternatives (Épique, Intime, Aggressive)

Copiez n’importe quel bloc via les boutons dédiés.

## 📊 Aperçu du prompt généré
Le générateur produit un prompt structuré comme suit :
```text
Viking Folk Metal, Épique, Sombre, hurdy-gurdy, tagelharpa, palm muting, blast beats, High production, C minor, 140 BPM, 6/8, male vocals
```
## 📁 Structure du projet
text
suno-forge/
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   └── App.js          # Composant principal (tout-en-un)
├── package.json
├── .gitignore
└── README.md

## 🛠 Personnalisation
Vous pouvez facilement enrichir les données dans src/App.js :
- Ajouter des sous-styles : modifiez l’objet SUBSTYLES
- Étendre les instruments : ajoutez des entrées dans INSTR (respectez la structure groupe → items)
- Nouvelles techniques : complétez l’objet TECH avec le tag exact de l’instrument
- Ajouter des tonalités : modifiez le tableau KEYS
- Ajouter des signatures : modifiez le tableau TIME_SIGS
- Modifier les couleurs : ajustez les accents dans CATS (propriété accent)
- Ajuster les limites (voix, moods, etc.) : Limites	tog() 

## 📄 Licence
MIT – vous êtes libre d’utiliser, modifier et distribuer ce projet.

Forgé avec ⚔️ pour les musiciens et créateurs de contenu Suno.
