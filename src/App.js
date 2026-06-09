import React, { useState, useEffect } from "react";
import { Copy, Check, Wand2, RotateCcw, ChevronRight, ChevronDown, Plus, Trash2, Save, Upload, Download } from "lucide-react";

/* ══════════════════════════════════════════════════════════
   DATA – Catégories, sous-styles, voix, instruments, techniques
══════════════════════════════════════════════════════════ */

const CATS = {
  metal:      { rune:"ᚠ", label:"Metal",       accent:"#CF6A37" },
  cinematic:  { rune:"ᚢ", label:"Cinématique",  accent:"#9B6FD4" },
  folk:       { rune:"ᚦ", label:"Folk & World", accent:"#4A9E6E" },
  electronic: { rune:"ᚨ", label:"Electronic",   accent:"#3A8FD4" },
  urban:      { rune:"ᚱ", label:"Urban",        accent:"#C4892A" },
};

const SUBSTYLES = {
  metal:      ["Viking Folk Metal","Black Metal Atmosphérique","Melodic Death Metal","Doom / Funeral Doom","Power Metal","Symphonic Metal","Folk Metal Celtique","Industrial Metal","Post-Metal / Sludge"],
  cinematic:  ["Epic Orchestral","Viking Cinématique","Dark Thriller Score","Fantasy RPG Score","Néoclassique","Grégorien / Rituel","Score Nordique"],
  folk:       ["Celtic Irlandais","Nordic Folk Scandinave","Folk Acoustique","Médiéval Historique","Pagan Rituel","World Music Tribal","Bard / Troubadour"],
  electronic: ["Synthwave / Outrun","Darksynth","Dark Ambient / Drone","Pagan Electronic","Lo-fi Chillhop","Tribal Electronic","EBM / Aggrotech"],
  urban:      ["Jazz Noir","Hip-Hop Boom Bap","Trap","R&B Neo-Soul","Funk Groove","Blues Électrique","Dark Pop Cinématique"],
};

const VOCAL_GROUPS = [
  { g:"Registre", items:[
    { t:"male vocals", l:"Voix masculine" },{ t:"female vocals", l:"Voix féminine" },{ t:"mixed vocals", l:"Voix mixtes" },
    { t:"tenor", l:"Ténor" },{ t:"baritone vocals", l:"Baryton" },{ t:"bass vocals", l:"Basse vocale" },
    { t:"soprano", l:"Soprano" },{ t:"contralto", l:"Contralto" },{ t:"countertenor", l:"Contre-ténor" },
  ] },
  { g:"Style", items:[
    { t:"clean vocals", l:"Clean" },{ t:"harsh vocals", l:"Harsh" },{ t:"death growls", l:"Death growls" },
    { t:"black metal screams", l:"BM screams" },{ t:"guttural vocals", l:"Gutturaux" },{ t:"falsetto", l:"Falsetto" },
    { t:"whispered vocals", l:"Chuchotés" },{ t:"breathy vocals", l:"Aéré" },{ t:"raspy vocals", l:"Voix râpeuse" },
    { t:"spoken word", l:"Spoken word" },{ t:"operatic vocals", l:"Opératique" },{ t:"lyric singing", l:"Lyrique" },
    { t:"folk singing", l:"Folk singing" },{ t:"bluesy vocals", l:"Blues" },{ t:"soulful vocals", l:"Soul" },
    { t:"rap vocals", l:"Rap" },{ t:"melodic rap", l:"Rap mélodique" },{ t:"trap ad libs", l:"Trap ad libs" },
    { t:"nasal folk vocals", l:"Folk nasal" },{ t:"yodeling", l:"Yodel" },
  ] },
  { g:"Chœur & Groupe", items:[
    { t:"choir", l:"Chœur mixte" },{ t:"male choir", l:"Chœur masculin" },{ t:"female choir", l:"Chœur féminin" },
    { t:"epic choir", l:"Chœur épique" },{ t:"vocal harmonies", l:"Harmonies" },{ t:"backing vocals", l:"Backing vocals" },
    { t:"call and response", l:"Questions-réponses" },{ t:"antiphon", l:"Antiphonie" },
    { t:"unison chanting", l:"Unisson" },{ t:"barbershop harmonies", l:"Barbershop" },
  ] },
  { g:"Traditionnel & Rituel", items:[
    { t:"throat singing", l:"Chant guttural" },{ t:"mongolian throat singing", l:"Khoomei" },
    { t:"overtone singing", l:"Diphonique" },{ t:"gregorian chant", l:"Grégorien" },
    { t:"ritual chanting", l:"Rituel" },{ t:"joik", l:"Joïk sami" },
    { t:"shamanic chanting", l:"Chamanique" },{ t:"bardic recitation", l:"Récitation bardique" },
    { t:"vedic chant", l:"Védique" },{ t:"sufi qawwali", l:"Qawwali" },
  ] },
  { g:"Technique vocale", items:[
    { t:"vibrato", l:"Vibrato" },{ t:"melismatic singing", l:"Mélismatique" },{ t:"belting", l:"Belting" },
    { t:"head voice", l:"Voix de tête" },{ t:"chest voice", l:"Voix de poitrine" },{ t:"mixed voice technique", l:"Voix mixte" },
    { t:"scat singing", l:"Scat jazz" },{ t:"wordless vocals", l:"Vocalises" },{ t:"humming", l:"Fredonner" },
    { t:"crooning", l:"Crooning" },{ t:"sprechgesang", l:"Sprechgesang" },{ t:"legato phrasing", l:"Phrasé legato" },
  ] },
  { g:"Traitement & Effets", items:[
    { t:"vocoder", l:"Vocoder" },{ t:"auto-tune", l:"Auto-tune" },{ t:"distorted vocals", l:"Saturé" },
    { t:"reverb-drenched vocals", l:"Réverb intense" },{ t:"pitch-shifted vocals", l:"Pitch-shifted" },
    { t:"double-tracked vocals", l:"Double tracking" },{ t:"a cappella", l:"A cappella" },
  ] },
  { g:"Absence", items:[
    { t:"no vocals", l:"Sans voix" },{ t:"instrumental", l:"Instrumental" },
  ] },
];

const INSTR = {
  metal:[
    { g:"Guitares", items:[
      { t:"electric guitar", l:"Guitare élec." },{ t:"distorted guitar", l:"Saturée" },
      { t:"twin guitars", l:"Twin guitars" },{ t:"7-string guitar", l:"7 cordes" },
      { t:"drop-tuned guitar", l:"Drop tuning" },{ t:"baritone guitar", l:"Baryton" },
      { t:"classical guitar", l:"Classique" },
    ] },
    { g:"Folk & Nordique", items:[
      { t:"hurdy-gurdy", l:"Vielle à roue" },{ t:"nyckelharpa", l:"Nyckelharpa" },
      { t:"tagelharpa", l:"Tagelharpa" },{ t:"hardanger fiddle", l:"Hardanger" },
      { t:"folk violin", l:"Violon folk" },{ t:"bone flute", l:"Flûte en os" },{ t:"war horn", l:"Cor de guerre" },
      { t:"bagpipes", l:"Cornemuse" },{ t:"tin whistle", l:"Tin whistle" },
    ] },
    { g:"Percussions", items:[
      { t:"double bass drums", l:"Double grosse caisse" },{ t:"war drums", l:"Tambours de guerre" },
      { t:"frame drums", l:"Tambours à cadre" },{ t:"blast beat drums", l:"Batterie blast" },
      { t:"tribal percussion", l:"Percussions tribales" },
    ] },
    { g:"Basse & Cordes", items:[
      { t:"heavy bass guitar", l:"Basse lourde" },{ t:"distorted bass", l:"Basse saturée" },
      { t:"cello", l:"Violoncelle" },{ t:"string orchestra", l:"Orchestre cordes" },
    ] },
    { g:"Claviers & Vents", items:[
      { t:"church organ", l:"Orgue d'église" },{ t:"synthesizer", l:"Synthétiseur" },
      { t:"piano", l:"Piano" },{ t:"duduk", l:"Duduk" },{ t:"bombarde", l:"Bombarde" },
    ] },
  ],
  cinematic:[
    { g:"Cordes", items:[
      { t:"string orchestra", l:"Orchestre à cordes" },{ t:"violin section", l:"Violons" },
      { t:"cello section", l:"Violoncelles" },{ t:"viola", l:"Alto" },
      { t:"string quartet", l:"Quatuor à cordes" },{ t:"solo violin", l:"Violon solo" },
    ] },
    { g:"Cuivres", items:[
      { t:"brass section", l:"Section cuivres" },{ t:"french horn", l:"Cor français" },
      { t:"trumpet", l:"Trompette" },{ t:"trombone", l:"Trombone" },{ t:"tuba", l:"Tuba" },
      { t:"flugelhorn", l:"Bugle" },
    ] },
    { g:"Bois", items:[
      { t:"flute", l:"Flûte" },{ t:"oboe", l:"Hautbois" },{ t:"clarinet", l:"Clarinette" },
      { t:"bassoon", l:"Basson" },{ t:"english horn", l:"Cor anglais" },
    ] },
    { g:"Percussions", items:[
      { t:"orchestral timpani", l:"Timbales" },{ t:"taiko drums", l:"Taiko" },
      { t:"orchestral percussion", l:"Percussions orch." },{ t:"tam-tam", l:"Tam-tam" },
      { t:"snare drum", l:"Caisse claire" },
    ] },
    { g:"Claviers", items:[
      { t:"grand piano", l:"Piano à queue" },{ t:"pipe organ", l:"Orgue à tuyaux" },
      { t:"harpsichord", l:"Clavecin" },{ t:"celesta", l:"Célesta" },{ t:"harp", l:"Harpe" },
    ] },
    { g:"Nordique & Chœur", items:[
      { t:"epic choir", l:"Chœur épique" },{ t:"wordless choir", l:"Chœur vocalise" },
      { t:"nyckelharpa", l:"Nyckelharpa" },{ t:"frame drums", l:"Tambours à cadre" },
      { t:"norse flute", l:"Flûte nordique" },{ t:"tagelharpa", l:"Tagelharpa" },
    ] },
  ],
  folk:[
    { g:"Celtique", items:[
      { t:"tin whistle", l:"Tin whistle" },{ t:"uilleann pipes", l:"Uilleann pipes" },
      { t:"fiddle", l:"Fiddle" },{ t:"bodhran", l:"Bodhrán" },
      { t:"celtic harp", l:"Harpe celtique" },{ t:"accordion", l:"Accordéon" },
      { t:"concertina", l:"Concertina" },
    ] },
    { g:"Nordique", items:[
      { t:"nyckelharpa", l:"Nyckelharpa" },{ t:"hardanger fiddle", l:"Hardanger" },
      { t:"tagelharpa", l:"Tagelharpa" },{ t:"hurdy-gurdy", l:"Vielle à roue" },
      { t:"frame drums", l:"Tambours à cadre" },{ t:"kantele", l:"Kantele" },
      { t:"bone flute", l:"Flûte en os" },{ t:"lur", l:"Lur" },
    ] },
    { g:"Médiéval", items:[
      { t:"lute", l:"Luth" },{ t:"recorder", l:"Flûte à bec" },
      { t:"shawm", l:"Chalumeau" },{ t:"dulcimer", l:"Dulcimer" },
      { t:"crumhorn", l:"Cromorne" },{ t:"rebec", l:"Rebec" },
    ] },
    { g:"World", items:[
      { t:"sitar", l:"Sitar" },{ t:"tabla", l:"Tabla" },
      { t:"djembe", l:"Djembé" },{ t:"kora", l:"Kora" },
      { t:"oud", l:"Oud" },{ t:"darbuka", l:"Darbuka" },
      { t:"didgeridoo", l:"Didgeridoo" },{ t:"mbira", l:"Mbira" },
    ] },
    { g:"Acoustique", items:[
      { t:"acoustic guitar", l:"Guitare acoustique" },{ t:"banjo", l:"Banjo" },
      { t:"mandolin", l:"Mandoline" },{ t:"upright bass", l:"Contrebasse" },
      { t:"harmonica", l:"Harmonica" },{ t:"autoharp", l:"Autoharp" },
    ] },
  ],
  electronic:[
    { g:"Synthétiseurs", items:[
      { t:"analog synthesizer", l:"Synth analogique" },{ t:"modular synthesizer", l:"Modulaire" },
      { t:"Moog synthesizer", l:"Moog" },{ t:"pad synthesizer", l:"Synth pads" },
      { t:"lead synthesizer", l:"Synth lead" },{ t:"polyphonic synthesizer", l:"Polyph." },
    ] },
    { g:"Rythme", items:[
      { t:"808 drum machine", l:"Roland 808" },{ t:"909 drum machine", l:"Roland 909" },
      { t:"programmed drums", l:"Batterie prog." },{ t:"tr-606 drum machine", l:"TR-606" },
    ] },
    { g:"Basse électronique", items:[
      { t:"808 bass", l:"808 bass" },{ t:"sub bass synthesizer", l:"Sub bass" },
      { t:"bass synthesizer", l:"Basse synth" },{ t:"acid bass", l:"Acid bass" },
    ] },
    { g:"Effets & Textures", items:[
      { t:"vocoder", l:"Vocoder" },{ t:"theremin", l:"Thérémine" },
      { t:"distorted synthesizer", l:"Synth saturé" },{ t:"industrial noise", l:"Bruit industriel" },
      { t:"granular synthesizer", l:"Granulaire" },{ t:"sampler", l:"Sampler" },
    ] },
    { g:"Tribal & Ethnique", items:[
      { t:"electronic frame drums", l:"Frame drums élec." },{ t:"tribal samples", l:"Samples tribaux" },
      { t:"ethnic instrument samples", l:"Samples ethniques" },
    ] },
  ],
  urban:[
    { g:"Jazz", items:[
      { t:"upright bass", l:"Contrebasse" },{ t:"jazz piano", l:"Piano jazz" },
      { t:"brushed drums", l:"Baguettes brosses" },{ t:"saxophone", l:"Saxophone" },
      { t:"trumpet", l:"Trompette" },{ t:"jazz guitar", l:"Guitare jazz" },
      { t:"hammond organ", l:"Hammond" },{ t:"vibraphone", l:"Vibraphone" },
    ] },
    { g:"Hip-Hop", items:[
      { t:"808 bass", l:"808 bass" },{ t:"sampled drums", l:"Drums samplés" },
      { t:"vinyl samples", l:"Samples vinyle" },{ t:"hi-hats", l:"Charleston" },
      { t:"boom bap drums", l:"Boom bap" },
    ] },
    { g:"R&B / Soul", items:[
      { t:"Rhodes piano", l:"Rhodes" },{ t:"electric piano", l:"Piano électrique" },
      { t:"bass guitar", l:"Guitare basse" },{ t:"horn section", l:"Section cuivres" },
      { t:"lush strings", l:"Cordes soul" },
    ] },
    { g:"Blues / Funk", items:[
      { t:"slide guitar", l:"Slide guitar" },{ t:"blues guitar", l:"Guitare blues" },
      { t:"harmonica", l:"Harmonica" },{ t:"funky bass guitar", l:"Basse funky" },
      { t:"wah-wah guitar", l:"Wah-wah" },{ t:"clavinet", l:"Clavinet" },
    ] },
  ],
};

const TECH = {
  "electric guitar":[{ t:"palm muting", l:"Palm muting" },{ t:"tremolo picking", l:"Tremolo picking" },{ t:"alternate picking", l:"Alternate picking" },{ t:"sweep picking", l:"Sweep picking" },{ t:"pinch harmonics", l:"Pinch harmonics" },{ t:"guitar tapping", l:"Tapping" },{ t:"vibrato technique", l:"Vibrato" },{ t:"power chords", l:"Power chords" },{ t:"whammy bar", l:"Whammy bar" },{ t:"legato technique", l:"Legato" },{ t:"open string riffs", l:"Open strings" }],
  "distorted guitar":[{ t:"palm muting", l:"Palm muting" },{ t:"power chords", l:"Power chords" },{ t:"pinch harmonics", l:"Pinch harmonics" },{ t:"chugging riffs", l:"Chugging" },{ t:"drop tuning riffs", l:"Drop riffs" },{ t:"galloping rhythm", l:"Galop" }],
  "twin guitars":[{ t:"guitar harmonies", l:"Harmonies" },{ t:"dual lead guitar", l:"Double lead" },{ t:"call and response guitar", l:"Questions-réponses" },{ t:"unison bends", l:"Bends unisson" }],
  "7-string guitar":[{ t:"extended range riffs", l:"Riffs extended" },{ t:"djent patterns", l:"Djent" },{ t:"palm muting", l:"Palm muting" },{ t:"drop tuning riffs", l:"Drop tuning" }],
  "drop-tuned guitar":[{ t:"down-tuned riffs", l:"Riffs down-tuned" },{ t:"chugging riffs", l:"Chugging" },{ t:"palm muting", l:"Palm muting" },{ t:"open string slams", l:"Open slams" }],
  "baritone guitar":[{ t:"deep resonant riffs", l:"Riffs graves" },{ t:"palm muting", l:"Palm muting" },{ t:"slow heavy picking", l:"Picking lent" }],
  "classical guitar":[{ t:"fingerstyle classical", l:"Fingerstyle classique" },{ t:"tremolo technique", l:"Tremolo" },{ t:"rest stroke", l:"Apoyando" },{ t:"harmonics classical", l:"Harmoniques" }],
  "hurdy-gurdy":[{ t:"drone strings", l:"Cordes bourdons" },{ t:"trompette buzz", l:"Trompette buzz" },{ t:"continuous wheel bowing", l:"Roue continue" },{ t:"hurdy-gurdy ornaments", l:"Ornements" },{ t:"dog hair staccato", l:"Dog hair" }],
  "nyckelharpa":[{ t:"drone accompaniment", l:"Bourdon" },{ t:"sympathetic resonance", l:"Résonance sympath." },{ t:"nyckelharpa ornaments", l:"Ornements" },{ t:"modal melody", l:"Mélodie modale" }],
  "tagelharpa":[{ t:"drone bowing", l:"Archet bourdon" },{ t:"open string resonance", l:"Résonance à vide" },{ t:"pentatonic melody", l:"Mélodie penta." },{ t:"raw bowing", l:"Archet brut" }],
  "hardanger fiddle":[{ t:"sympathetic strings resonance", l:"Cordes sympath." },{ t:"norwegian folk ornaments", l:"Ornements norvég." },{ t:"halling rhythm", l:"Rythme halling" },{ t:"slåtter bowing", l:"Archet slåtter" }],
  "folk violin":[{ t:"double stopping", l:"Double cordes" },{ t:"drone note", l:"Note bourdon" },{ t:"shuffle bowing", l:"Archet shuffle" },{ t:"folk ornaments", l:"Ornements folk" }],
  "fiddle":[{ t:"irish ornaments", l:"Ornements irlandais" },{ t:"double stopping fiddle", l:"Double cordes" },{ t:"ricochet bowing", l:"Ricochet" },{ t:"shuffle rhythm", l:"Rythme shuffle" },{ t:"drone note", l:"Note bourdon" },{ t:"cross-bowing", l:"Cross-bowing" }],
  "bodhran":[{ t:"tipper technique", l:"Technique tipper" },{ t:"muffled rim shots", l:"Rim shots étouffés" },{ t:"palm muting bodhran", l:"Palm muting" },{ t:"cross-rhythm", l:"Contre-rythme" },{ t:"wrist technique", l:"Technique poignet" }],
  "frame drums":[{ t:"finger rolls", l:"Roulements doigts" },{ t:"slap technique", l:"Slap" },{ t:"resonant bass strikes", l:"Frappes résonantes" },{ t:"polyrhythmic patterns", l:"Polyrythmie" },{ t:"heartbeat pulse", l:"Pulsation cardiaque" }],
  "tribal percussion":[{ t:"polyrhythmic layering", l:"Polyrythmie" },{ t:"call and response drums", l:"Questions-réponses" },{ t:"tribal groove", l:"Groove tribal" },{ t:"unison strikes", l:"Frappes unisson" }],
  "double bass drums":[{ t:"blast beats", l:"Blast beats" },{ t:"gallop rhythm", l:"Rythme galop" },{ t:"double kick groove", l:"Double kick groove" },{ t:"syncopated double bass", l:"Syncopé" }],
  "blast beat drums":[{ t:"blast beats", l:"Blast beats" },{ t:"gravity blast", l:"Gravity blast" },{ t:"hand-foot combination", l:"Main-pied" },{ t:"rhythmic blast", l:"Blast rythmique" }],
  "war drums":[{ t:"marching rhythm", l:"Rythme marche" },{ t:"unison hits", l:"Frappes unisson" },{ t:"slow powerful strikes", l:"Frappes lentes" },{ t:"tribal war beat", l:"Rythme tribal" }],
  "bone flute":[{ t:"pentatonic melody", l:"Mélodie pentatonique" },{ t:"breathy tone", l:"Ton aéré" },{ t:"ancient folk scales", l:"Gammes anciennes" },{ t:"circular breathing", l:"Respiration circulaire" }],
  "tin whistle":[{ t:"irish ornamentation", l:"Ornements irlandais" },{ t:"cuts and taps", l:"Cuts & taps" },{ t:"rolls ornament", l:"Rolls" },{ t:"legato whistle", l:"Legato" }],
  "uilleann pipes":[{ t:"regulator chords", l:"Accords régulateur" },{ t:"uilleann drones", l:"Bourdons" },{ t:"cuts and crans", l:"Cuts & crans" },{ t:"staccato piping", l:"Staccato" }],
  "war horn":[{ t:"sustained horn call", l:"Appel soutenu" },{ t:"fanfare horn", l:"Fanfare" },{ t:"low resonant drone", l:"Bourdon grave" },{ t:"battle signal", l:"Signal de bataille" }],
  "bagpipes":[{ t:"continuous droning", l:"Bourdon continu" },{ t:"melodic piping", l:"Jeu mélodique" },{ t:"grace notes pipes", l:"Ornements" },{ t:"pipe embellishments", l:"Fioritures" }],
  "grand piano":[{ t:"legato playing", l:"Legato" },{ t:"staccato chords", l:"Staccato" },{ t:"sustained pedal", l:"Pédale sustain" },{ t:"prepared piano", l:"Piano préparé" },{ t:"arpeggiated chords", l:"Arpèges" },{ t:"minimalist repetition", l:"Répétition min." }],
  "piano":[{ t:"legato playing", l:"Legato" },{ t:"staccato", l:"Staccato" },{ t:"arpeggiated chords", l:"Arpèges" },{ t:"sustained pedal", l:"Pédale sustain" },{ t:"ostinato", l:"Ostinato" }],
  "harp":[{ t:"cascading glissando", l:"Glissando cascade" },{ t:"arpeggiated harp", l:"Arpèges" },{ t:"harp harmonics", l:"Harmoniques" },{ t:"bisbigliando", l:"Bisbigliando" },{ t:"damped harp", l:"Étouffé" }],
  "church organ":[{ t:"sustained organ chords", l:"Accords tenus" },{ t:"legato organ", l:"Legato" },{ t:"organ crescendo", l:"Crescendo" },{ t:"pedal point organ", l:"Point pédale" }],
  "pipe organ":[{ t:"sustained organ chords", l:"Accords tenus" },{ t:"full organ", l:"Plein orgue" },{ t:"organ counterpoint", l:"Contrepoint" },{ t:"dramatic organ swells", l:"Swells dramatiques" }],
  "synthesizer":[{ t:"filter sweep", l:"Filter sweep" },{ t:"lfo modulation", l:"Modulation LFO" },{ t:"arpeggiator", l:"Arpégiateur" },{ t:"portamento synth", l:"Portamento" },{ t:"detuned pads", l:"Pads désaccordés" }],
  "analog synthesizer":[{ t:"filter sweep", l:"Filter sweep" },{ t:"pitch bend synth", l:"Pitch bend" },{ t:"portamento synth", l:"Portamento" },{ t:"lfo modulation", l:"Modulation LFO" },{ t:"detuned oscillators", l:"Oscillateurs désacc." },{ t:"ring modulation", l:"Ring modulation" },{ t:"sawtooth wave", l:"Onde en dents de scie" }],
  "modular synthesizer":[{ t:"patch sequencing", l:"Patch séquençage" },{ t:"generative modular", l:"Génératif" },{ t:"cv modulation", l:"Modulation CV" },{ t:"random voltage", l:"Tension aléatoire" }],
  "pad synthesizer":[{ t:"slow attack pads", l:"Attaque lente" },{ t:"evolving textures", l:"Textures évolutives" },{ t:"lush chord pads", l:"Pads riches" },{ t:"atmospheric swell", l:"Swell atmosphérique" }],
  "lead synthesizer":[{ t:"synth lead runs", l:"Runs lead" },{ t:"vibrato synth lead", l:"Vibrato" },{ t:"portamento lead", l:"Portamento" },{ t:"arpeggio lead", l:"Arpège lead" }],
  "808 drum machine":[{ t:"swing quantization", l:"Swing" },{ t:"syncopated patterns", l:"Syncopé" },{ t:"off-beat hi-hats", l:"Hi-hats off-beat" },{ t:"polyrhythmic patterns", l:"Polyrythmie" }],
  "909 drum machine":[{ t:"four on the floor", l:"Four on the floor" },{ t:"open hi-hat patterns", l:"Hi-hat ouvert" },{ t:"snare rolls 909", l:"Rolls caisse" },{ t:"acid house groove", l:"Groove acid house" }],
  "808 bass":[{ t:"pitched 808 slides", l:"Glissés 808" },{ t:"long sustain 808", l:"Sustain long" },{ t:"sub frequency rumble", l:"Sub rumble" },{ t:"rhythmic 808 hits", l:"Frappes rythmiques" }],
  "acid bass":[{ t:"303 acid filter", l:"Filter acid 303" },{ t:"portamento acid", l:"Portamento" },{ t:"squelching resonance", l:"Résonance squelch" },{ t:"acid riff", l:"Riff acid" }],
  "sampler":[{ t:"vinyl crackle", l:"Craquement vinyle" },{ t:"pitched sample loops", l:"Loops pitchés" },{ t:"granular stretching", l:"Étirement granulaire" },{ t:"reversed samples", l:"Samples inversés" },{ t:"chopped samples", l:"Samples découpés" }],
  "theremin":[{ t:"eerie glide", l:"Glissement inquiétant" },{ t:"vibrato theremin", l:"Vibrato" },{ t:"swooping melody", l:"Mélodie bondissante" }],
  "string orchestra":[{ t:"col legno", l:"Col legno" },{ t:"sul ponticello", l:"Sul ponticello" },{ t:"pizzicato strings", l:"Pizzicato" },{ t:"tremolo strings", l:"Tremolo" },{ t:"glissando strings", l:"Glissando" },{ t:"divisi strings", l:"Divisi" },{ t:"con sordino", l:"Con sordino" }],
  "violin section":[{ t:"spiccato bowing", l:"Spiccato" },{ t:"sul tasto violin", l:"Sul tasto" },{ t:"tremolo bowing violin", l:"Tremolo" },{ t:"violin harmonics", l:"Harmoniques" },{ t:"up-bow staccato", l:"Staccato montant" }],
  "cello section":[{ t:"pizzicato cello", l:"Pizzicato" },{ t:"col legno cello", l:"Col legno" },{ t:"cello harmonics", l:"Harmoniques" },{ t:"portamento cello", l:"Portamento" },{ t:"sul ponticello cello", l:"Sul ponticello" }],
  "cello":[{ t:"pizzicato cello", l:"Pizzicato" },{ t:"col legno cello", l:"Col legno" },{ t:"cello harmonics", l:"Harmoniques" },{ t:"expressive vibrato cello", l:"Vibrato expressif" }],
  "brass section":[{ t:"staccato brass", l:"Staccato" },{ t:"legato brass", l:"Legato" },{ t:"brass fanfare", l:"Fanfare" },{ t:"muted brass", l:"Sourdine" },{ t:"brass glissando", l:"Glissando" },{ t:"sforzando brass", l:"Sforzando" }],
  "french horn":[{ t:"stopped horn", l:"Cor bouché" },{ t:"hunting fanfare", l:"Fanfare chasse" },{ t:"horn echo", l:"Écho cor" },{ t:"legato horn", l:"Legato" }],
  "orchestral timpani":[{ t:"crescendo rolls", l:"Crescendo rolls" },{ t:"staccato timpani hits", l:"Staccato" },{ t:"timpani glissando", l:"Glissando" },{ t:"soft mallets", l:"Mailloches douces" }],
  "taiko drums":[{ t:"powerful unison strikes", l:"Frappes unisson" },{ t:"kakegoe shouts", l:"Kakegoe" },{ t:"ji-uchi rhythm", l:"Ji-uchi" },{ t:"kuchishōga patterns", l:"Kuchishōga" },{ t:"ma breathing", l:"Ma (silence)" }],
  "saxophone":[{ t:"growl saxophone technique", l:"Growl sax" },{ t:"flutter tongue saxophone", l:"Flutter tongue" },{ t:"legato saxophone", l:"Legato" },{ t:"blues scales saxophone", l:"Gammes blues" },{ t:"altissimo saxophone", l:"Altissimo" },{ t:"sub-tone saxophone", l:"Sub-tone" }],
  "trumpet":[{ t:"harmon mute trumpet", l:"Sourdine harmon" },{ t:"flutter tongue trumpet", l:"Flutter tongue" },{ t:"rip attack trumpet", l:"Rip attack" },{ t:"plunger mute", l:"Plunger mute" },{ t:"trumpet fanfare", l:"Fanfare" }],
  "jazz piano":[{ t:"jazz chord voicings", l:"Voicings jazz" },{ t:"stride piano", l:"Stride" },{ t:"block chords jazz", l:"Block chords" },{ t:"comping rhythm jazz", l:"Comping" },{ t:"blue note phrasing", l:"Blue notes" },{ t:"gospel runs", l:"Gospel runs" }],
  "Rhodes piano":[{ t:"rhodes chord voicings", l:"Voicings Rhodes" },{ t:"tremolo rhodes", l:"Tremolo" },{ t:"funky rhodes comping", l:"Comping funky" },{ t:"rhodes arpeggios", l:"Arpèges" }],
  "upright bass":[{ t:"pizzicato upright bass", l:"Pizzicato" },{ t:"arco upright bass", l:"Arco" },{ t:"slap upright bass", l:"Slap" },{ t:"walking bass line", l:"Walking bass" },{ t:"bow vibrato upright", l:"Vibrato archet" }],
  "jazz guitar":[{ t:"chord melody jazz", l:"Chord-melody" },{ t:"comping guitar jazz", l:"Comping" },{ t:"single note jazz runs", l:"Runs single note" },{ t:"jazz guitar harmonics", l:"Harmoniques" }],
  "hammond organ":[{ t:"leslie cabinet effect", l:"Leslie cabinet" },{ t:"drawbar technique", l:"Drawbars" },{ t:"organ glissando", l:"Glissando" },{ t:"gospel organ chords", l:"Accords gospel" }],
  "slide guitar":[{ t:"bottleneck slide", l:"Bottleneck" },{ t:"open tuning slide", l:"Accordage ouvert" },{ t:"vibrato slide", l:"Vibrato slide" },{ t:"delta blues slide", l:"Delta blues" }],
  "blues guitar":[{ t:"blues bending", l:"Bending blues" },{ t:"shuffle feel", l:"Shuffle feel" },{ t:"vibrato blues", l:"Vibrato" },{ t:"call and response blues", l:"Questions-réponses" }],
  "funky bass guitar":[{ t:"slap and pop", l:"Slap & pop" },{ t:"syncopated bass groove", l:"Groove syncopé" },{ t:"ghost notes bass", l:"Ghost notes" },{ t:"thumb technique", l:"Technique pouce" }],
  "acoustic guitar":[{ t:"fingerpicking", l:"Fingerpicking" },{ t:"travis picking", l:"Travis picking" },{ t:"open tuning", l:"Accordage ouvert" },{ t:"strumming patterns", l:"Strumming" },{ t:"hammer-on pull-off", l:"Hammer-on/pull-off" },{ t:"percussive tapping", l:"Percussif" }],
  "heavy bass guitar":[{ t:"palm-muted bass", l:"Palm muting" },{ t:"distorted bass tone", l:"Ton saturé" },{ t:"syncopated bass riffs", l:"Riffs syncopés" },{ t:"fuzz bass", l:"Fuzz bass" }],
  "kantele":[{ t:"plucked kantele", l:"Pizzicato" },{ t:"strummed kantele", l:"Strumming" },{ t:"overtone kantele", l:"Harmoniques" },{ t:"prepared kantele", l:"Préparé" }],
  "lute":[{ t:"renaissance fingerstyle", l:"Fingerstyle renaissance" },{ t:"lute ornamentation", l:"Ornements" },{ t:"renaissance tablature", l:"Tablature" },{ t:"campanella technique", l:"Campanella" }],
  "sitar":[{ t:"meend glissando sitar", l:"Meend (glissé)" },{ t:"sympathetic sitar strings", l:"Cordes sympath." },{ t:"raga improvisation", l:"Raga" },{ t:"jhala technique", l:"Jhala" }],
  "tabla":[{ t:"tala rhythm cycles", l:"Cycles tala" },{ t:"bayan tabla technique", l:"Bayan grave" },{ t:"dayan tabla technique", l:"Dayan" },{ t:"tabla ornaments", l:"Ornements" },{ t:"tintal cycle", l:"Tintal" }],
  "djembe":[{ t:"bass tone djembe", l:"Ton grave" },{ t:"open tone djembe", l:"Ton ouvert" },{ t:"slap djembe technique", l:"Slap" },{ t:"polyrhythmic djembe", l:"Polyrythmie" }],
  "harmonica":[{ t:"bend technique harmonica", l:"Bending" },{ t:"overblowing harmonica", l:"Overblow" },{ t:"tremolo harmonica", l:"Tremolo" },{ t:"wailing harmonica", l:"Wailing" }],
  "wah-wah guitar":[{ t:"auto-wah effect", l:"Auto-wah" },{ t:"envelope filter", l:"Envelope filter" },{ t:"wah pedal technique", l:"Pédale wah" }],
  "duduk":[{ t:"sustained duduk drone", l:"Bourdon soutenu" },{ t:"duduk ornamentation", l:"Ornements" },{ t:"breathy duduk tone", l:"Ton aéré" },{ t:"duduk vibrato", l:"Vibrato" }],
  "epic choir":[{ t:"homophonic choir", l:"Homophonie" },{ t:"contrapuntal voices", l:"Contrepoint" },{ t:"antiphonal choir", l:"Antiphonie" },{ t:"unison choir", l:"Unisson" }],
};

const MOODS = ["Épique","Sombre","Mystique","Rituel","Triomphant","Mélancolique","Agressif","Atmosphérique","Primal","Paisible","Furieux","Spirituel","Hypnotique","Dramatique"];
const PRODS = ["High production","Lo-fi / Raw","Organique","Cinématique","Dense / Saturé","Épuré / Minimaliste","Analog Warmth","Cold Digital"];
const TEMPOS = ["Funeral pace","Lent / Downtempo","Mid-tempo","Driving rhythm","Rapide / Energetic","Blast beat speed"];

// Paramètres musicaux
const KEYS = [
  "C major", "G major", "D major", "A major", "E major", "B major",
  "F# major", "C# major", "F major", "Bb major", "Eb major", "Ab major",
  "A minor", "E minor", "B minor", "F# minor", "C# minor", "G# minor",
  "D minor", "G minor", "C minor", "F minor", "Bb minor", "Eb minor"
];

const TIME_SIGS = ["4/4", "3/4", "2/4", "6/8", "9/8", "12/8", "5/4", "7/8", "5/8", "7/4", "3/2", "2/2"];

// Recommandations par catégorie
const RECOMMENDED_KEYS = {
  metal: ["E minor", "D minor", "C minor", "A minor", "B minor", "F# minor"],
  cinematic: ["D minor", "A minor", "G minor", "E minor", "C major", "F major"],
  folk: ["D major", "G major", "A major", "E minor", "A minor", "C major"],
  electronic: ["C minor", "D minor", "F minor", "G minor", "A minor", "E minor"],
  urban: ["C minor", "D minor", "E minor", "G minor", "A minor", "Bb major", "Db major"]
};

const RECOMMENDED_TIME_SIGS = {
  metal: ["4/4", "3/4", "6/8", "12/8", "7/8"],
  cinematic: ["4/4", "3/4", "6/8", "5/4", "2/2"],
  folk: ["4/4", "3/4", "6/8", "9/8", "2/4"],
  electronic: ["4/4", "3/4", "6/8", "2/4"],
  urban: ["4/4", "3/4", "6/8", "2/4", "5/4"]
};

// Tags pour métatags
const STRUCTURAL_TAGS = [
  "[Intro]", "[Verse 1]", "[Verse 2]", "[Pre-Chorus]", "[Chorus]", "[Post-Chorus]",
  "[Bridge]", "[Outro]", "[Hook]", "[Refrain]", "[Interlude]", "[Breakdown]",
  "[Build-up]", "[Drop]", "[Solo]", "[Instrumental]", "[Fade out]"
];

const DYNAMIC_TAGS = {
  vocal: [
    "[Spoken word]", "[Narration]", "[Whispered]", "[Breathy]", "[Chanted]",
    "[Screamed]", "[Growled]", "[A cappella]", "[Falsetto]", "[Choir]",
    "[Harmonized]", "[Call and response]", "[Operatic]", "[Throat singing]", "[Joik]"
  ],
  instrumental: [
    "[Guitar solo]", "[Drum break]", "[Bass drop]", "[Piano interlude]",
    "[Orchestral swell]", "[Flute melody]", "[Violin lead]", "[Ambient passage]"
  ],
  dynamic: [
    "[quiet]", "[loud]", "[soft]", "[heavy]", "[heavy guitars]", "[epic]",
    "[intimate]", "[aggressive]", "[intense]", "[atmospheric]", "[ethereal]",
    "[haunting]", "[triumphant]", "[melancholic]", "[dark]", "[ritualistic]",
    "[energetic]", "[driving]", "[slow]", "[building]", "[climax]", "[tense]"
  ]
};

/* ══════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════ */

const tog = (arr, val, max) =>
  arr.includes(val) ? arr.filter(x => x !== val) : arr.length < max ? [...arr, val] : arr;

const getInstrLabel = (catKey, instrTag) => {
  for (const group of INSTR[catKey] || []) {
    const found = group.items.find(i => i.t === instrTag);
    if (found) return found.l;
  }
  return instrTag;
};

const truncateStyle = (str, maxLen = 200) => {
  if (str.length <= maxLen) return str;
  let truncated = str.slice(0, maxLen);
  const lastComma = truncated.lastIndexOf(',');
  if (lastComma > maxLen * 0.7) truncated = truncated.slice(0, lastComma);
  return truncated.trim();
};

const buildStyleLocal = (sub, moods, instrs, techs, prod, tempo, vocals, key, bpm, timeSig) => {
  let parts = [sub];
  if (moods.length) parts.push(moods.slice(0, 2).join(", "));
  if (instrs.length) parts.push(instrs.slice(0, 2).map(i => i.toLowerCase().replace(/ guitar| drums| synth/i, '')).join(", "));
  if (techs.length) parts.push(techs.slice(0, 2).join(", "));
  if (prod) parts.push(prod);
  if (tempo) parts.push(tempo);
  if (key) parts.push(key);
  if (bpm) parts.push(`${bpm} BPM`);
  if (timeSig) parts.push(timeSig);
  if (vocals.length) parts.push(vocals.slice(0, 2).join(", "));
  let style = parts.join(", ");
  style = style.replace(/\s+/g, ' ').trim();
  return truncateStyle(style, 200);
};

const buildMetatagsFromSections = (sections, cat, sub) => {
  if (!sections.length) {
    return buildMetatagsLocal(cat, sub);
  }
  return sections.map(section => {
    const structural = section.structural.replace(/[\[\]]/g, '');
    const desc = section.dynamics.map(t => t.replace(/[\[\]]/g, '').toLowerCase()).join(', ');
    return desc ? `[${structural}: ${desc}]` : `[${structural}]`;
  }).join('\n');
};

const buildMetatagsLocal = (cat, sub) => {
  const defaults = {
    metal: `[intro: atmospheric, heavy guitars]\n[verse 1: growled, aggressive]\n[pre-chorus: building]\n[chorus: clean vocals, epic]\n[breakdown: heavy, slow]\n[solo: guitar, intense]\n[outro: fade out, atmospheric]`,
    cinematic: `[intro: strings, atmospheric]\n[build-up: orchestral swell]\n[climax: epic, choir]\n[bridge: quiet, intimate]\n[outro: resolution, fade]`,
    folk: `[intro: folk melody, acoustic]\n[verse 1: storytelling, gentle]\n[chorus: harmonies, uplifting]\n[instrumental: flute solo]\n[outro: acoustic fade]`,
    electronic: `[intro: synth pad, atmospheric]\n[build-up: drum roll, rising]\n[drop: heavy bass, energetic]\n[bridge: minimal, stripped]\n[outro: fade, ambient]`,
    urban: `[intro: sampled vinyl, chill]\n[verse: spoken word, smooth]\n[chorus: melodic, rnb]\n[bridge: emotional, soft]\n[outro: instrumental fade]`
  };
  return defaults[cat] || `[intro]\n[verse 1]\n[chorus]\n[bridge]\n[outro]`;
};

const buildTipsLocal = (moods, instrs, techs) => {
  let tips = [];
  if (moods.length) tips.push(`Les ambiances sélectionnées (${moods.join(", ")}) renforcent le caractère unique.`);
  if (instrs.length) tips.push(`Ajoutez des variations rythmiques pour mettre en valeur ${instrs[0]}.`);
  if (techs.length) tips.push(`Les techniques comme ${techs[0]} apportent de la profondeur.`);
  tips.push("Utilisez des métatags comme [breakdown] ou [solo] pour structurer.");
  tips.push("Pour Suno 4.5, privilégiez le format [section: description].");
  if (!techs.length) tips.push("Pensez aux nuances de jeu pour enrichir la dynamique.");
  return tips.slice(0, 4);
};

const buildVariantsLocal = (sub, moods, instrs, techs, prod, tempo, vocals, key, bpm, timeSig) => {
  const baseStyle = buildStyleLocal(sub, moods, instrs, techs, prod, tempo, vocals, key, bpm, timeSig);
  const variants = [
    { label: "Version Épique", style: truncateStyle(`${baseStyle}, Epic orchestral, massive drums`), desc: "Plus large, plus cinématique." },
    { label: "Version Intime", style: truncateStyle(`${baseStyle}, stripped down, acoustic`), desc: "Approche minimaliste et naturelle." },
    { label: "Version Aggressive", style: truncateStyle(`${baseStyle}, distorted, heavy attack`), desc: "Plus de puissance et d'énergie brute." }
  ];
  return variants;
};

const getSortedKeys = (category) => {
  const recommended = RECOMMENDED_KEYS[category] || [];
  const allKeys = KEYS;
  const recommendedSet = new Set(recommended);
  const otherKeys = allKeys.filter(k => !recommendedSet.has(k));
  return { recommended, otherKeys };
};

const getSortedTimeSigs = (category) => {
  const recommended = RECOMMENDED_TIME_SIGS[category] || [];
  const allTimeSigs = TIME_SIGS;
  const recommendedSet = new Set(recommended);
  const otherTimeSigs = allTimeSigs.filter(ts => !recommendedSet.has(ts));
  return { recommended, otherTimeSigs };
};

/* ══════════════════════════════════════════════════════════
   COMPOSANTS UI
══════════════════════════════════════════════════════════ */

const Pill = ({ label, active, accent = "#D4831A", onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}
    style={{
      background: active ? "#2A241C" : "#0C0B09",
      border: `1px solid ${active ? accent : "#3A3028"}`,
      color: active ? accent : "#D0C0A8",
      borderRadius: 20, padding: "4px 10px", fontSize: 11.5,
      fontFamily: "'Crimson Pro',serif", cursor: disabled ? "not-allowed" : "pointer",
      transition: "all .15s", opacity: disabled && !active ? .3 : 1,
      boxShadow: active ? `0 0 6px ${accent}28` : "none", whiteSpace: "nowrap",
      flexShrink: 0,
    }}>
    {label}
  </button>
);

const CopyBtn = ({ text, id, copied, onCopy }) => (
  <button onClick={() => onCopy(text, id)}
    style={{
      background: "#161310", border: "1px solid #3A3028", borderRadius: 6,
      color: copied === id ? "#5AB87A" : "#E8D8B0",
      padding: "3px 9px", fontSize: 11.5, cursor: "pointer",
      display: "flex", alignItems: "center", gap: 4,
      fontFamily: "'Crimson Pro',serif", flexShrink: 0,
    }}>
    {copied === id ? <><Check size={10} /> Copié</> : <><Copy size={10} /> Copier</>}
  </button>
);

const SLabel = ({ children, badge }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
    <span style={{ fontFamily: "'Cinzel',serif", fontSize: 10, color: "#D0C0A8", letterSpacing: ".16em", textTransform: "uppercase" }}>
      {children}
    </span>
    {badge != null && (
      <span style={{ fontFamily: "'Cinzel',serif", fontSize: 10, color: "#5A4A38" }}>{badge}</span>
    )}
  </div>
);

const AccGroup = ({ label, open, onToggle, children, count }) => (
  <div style={{ borderBottom: "1px solid #2A241C" }}>
    <button onClick={onToggle}
      style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "6px 0", background: "transparent", border: "none", cursor: "pointer",
        color: open ? "#E0D4B0" : "#A89880", fontFamily: "'Cinzel',serif",
        fontSize: 9.5, letterSpacing: ".13em", textTransform: "uppercase",
        transition: "color .15s",
      }}>
      <span>{label} {count > 0 && <span style={{ color: "#D4831A" }}>·{count}</span>}</span>
      {open ? <ChevronDown size={10} style={{ color: "#5A5040" }} /> : <ChevronRight size={10} style={{ color: "#3A3020" }} />}
    </button>
    {open && <div style={{ paddingBottom: 8 }}>{children}</div>}
  </div>
);

const Sec = ({ children, noBorder }) => (
  <div style={{
    display: "flex", flexDirection: "column", gap: 8,
    padding: "12px 16px",
    borderBottom: noBorder ? "none" : "1px solid #2A241C",
  }}>
    {children}
  </div>
);

/* ══════════════════════════════════════════════════════════
   META TAG EDITOR AVEC SAUVEGARDE, IMPORT, DUPLICATION
   ET DIALOGUE DE CONFIRMATION PERSONNALISÉ
══════════════════════════════════════════════════════════ */

const MetaTagEditor = ({ sections, onSectionsChange, accent }) => {
  const [selectedStructural, setSelectedStructural] = useState("[Verse 1]");
  const [selectedDynamics, setSelectedDynamics] = useState([]);
  const [showDynamicSelector, setShowDynamicSelector] = useState(false);
  const [savedStructures, setSavedStructures] = useState(() => {
    const saved = localStorage.getItem("suno_metatag_templates");
    return saved ? JSON.parse(saved) : [];
  });
  const [templateName, setTemplateName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ show: false, message: "", onConfirm: null });

  const showConfirm = (message, onConfirm) => {
    setConfirmDialog({ show: true, message, onConfirm: () => { onConfirm(); setConfirmDialog({ show: false, message: "", onConfirm: null }); } });
  };

  const addSection = () => {
    if (!selectedStructural) return;
    const newSection = {
      id: Date.now(),
      structural: selectedStructural,
      dynamics: [...selectedDynamics]
    };
    onSectionsChange([...sections, newSection]);
    setSelectedDynamics([]);
    setShowDynamicSelector(false);
  };

  const removeSection = (id) => {
    onSectionsChange(sections.filter(s => s.id !== id));
  };

  const duplicateSection = (index) => {
    const sectionToDuplicate = sections[index];
    const newSection = {
      ...sectionToDuplicate,
      id: Date.now()
    };
    const newSections = [...sections];
    newSections.splice(index + 1, 0, newSection);
    onSectionsChange(newSections);
  };

  const moveSection = (index, direction) => {
    const newSections = [...sections];
    const target = index + direction;
    if (target < 0 || target >= sections.length) return;
    [newSections[index], newSections[target]] = [newSections[target], newSections[index]];
    onSectionsChange(newSections);
  };

  const toggleDynamicTag = (tag) => {
    if (selectedDynamics.includes(tag)) {
      setSelectedDynamics(selectedDynamics.filter(t => t !== tag));
    } else {
      if (selectedDynamics.length < 3) {
        setSelectedDynamics([...selectedDynamics, tag]);
      } else {
        alert("Maximum 3 tags dynamiques par section (recommandation Suno)");
      }
    }
  };

  const getPreview = (section) => {
    const structural = section.structural.replace(/[\[\]]/g, '');
    const desc = section.dynamics.map(t => t.replace(/[\[\]]/g, '').toLowerCase()).join(', ');
    return desc ? `[${structural}: ${desc}]` : `[${structural}]`;
  };

  const saveCurrentStructure = () => {
    if (!templateName.trim()) {
      alert("Veuillez donner un nom à votre structure");
      return;
    }
    if (sections.length === 0) {
      alert("Aucune section à sauvegarder");
      return;
    }
    const newTemplate = {
      id: Date.now(),
      name: templateName,
      sections: sections,
      createdAt: new Date().toLocaleDateString()
    };
    const updated = [...savedStructures, newTemplate];
    setSavedStructures(updated);
    localStorage.setItem("suno_metatag_templates", JSON.stringify(updated));
    setTemplateName("");
    setShowSaveDialog(false);
  };

  const loadStructure = (template) => {
    showConfirm(`Charger "${template.name}" ? Cela remplacera la structure actuelle.`, () => {
      onSectionsChange(template.sections);
    });
  };

  const deleteTemplate = (id) => {
    showConfirm("Supprimer cette structure ?", () => {
      const updated = savedStructures.filter(t => t.id !== id);
      setSavedStructures(updated);
      localStorage.setItem("suno_metatag_templates", JSON.stringify(updated));
    });
  };

  const exportStructure = () => {
    if (sections.length === 0) {
      alert("Aucune structure à exporter");
      return;
    }
    const data = {
      name: "Exported structure",
      sections: sections,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `suno_structure_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importStructure = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.sections && Array.isArray(data.sections)) {
          const importedSections = data.sections.map(section => ({
            ...section,
            id: Date.now() + Math.random()
          }));
          showConfirm(`Importer ${importedSections.length} section(s) ? Cela remplacera la structure actuelle.`, () => {
            onSectionsChange(importedSections);
          });
        } else {
          alert("Format de fichier invalide");
        }
      } catch (error) {
        alert("Erreur lors de l'import du fichier");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  return (
    <div style={{ marginTop: 8 }}>
      {/* Dialogue de confirmation personnalisé */}
      {confirmDialog.show && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "#1A1612",
            border: "1px solid #3A3028",
            borderRadius: 8,
            padding: 16,
            maxWidth: 300,
            textAlign: "center"
          }}>
            <div style={{ color: "#F5EDE0", marginBottom: 12 }}>{confirmDialog.message}</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button onClick={confirmDialog.onConfirm}
                style={{ background: "#D4831A", border: "none", borderRadius: 4, color: "#0A0806", fontSize: 12, padding: "5px 12px", cursor: "pointer" }}>
                Confirmer
              </button>
              <button onClick={() => setConfirmDialog({ show: false, message: "", onConfirm: null })}
                style={{ background: "#2A241C", border: "1px solid #3A3028", borderRadius: 4, color: "#A09078", fontSize: 12, padding: "5px 12px", cursor: "pointer" }}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Barre d'outils de gestion des structures */}
      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
        <button onClick={exportStructure}
          style={{ background: "#141210", border: "1px solid #3A3028", borderRadius: 6, color: "#A0C0D8", fontSize: 10, padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
          <Download size={12} /> Exporter
        </button>
        <label style={{ background: "#141210", border: "1px solid #3A3028", borderRadius: 6, color: "#A0C0D8", fontSize: 10, padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
          <Upload size={12} /> Importer
          <input type="file" accept=".json" onChange={importStructure} style={{ display: "none" }} />
        </label>
        <button onClick={() => setShowSaveDialog(true)} disabled={sections.length === 0}
          style={{ background: sections.length === 0 ? "#0C0B09" : "#141210", border: "1px solid #3A3028", borderRadius: 6, color: sections.length === 0 ? "#5A4A38" : "#D0C0A8", fontSize: 10, padding: "4px 8px", cursor: sections.length === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 4 }}>
          <Save size={12} /> Sauvegarder
        </button>
      </div>

      {/* Dialogue de sauvegarde */}
      {showSaveDialog && (
        <div style={{ background: "#1A1612", border: "1px solid #3A3028", borderRadius: 6, padding: 8, marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: "#D0C0A8", marginBottom: 6 }}>Nom de la structure :</div>
          <input type="text" value={templateName} onChange={e => setTemplateName(e.target.value)}
            placeholder="ex: Metal Epic, Cinematic Default, etc."
            style={{ background: "#0C0B09", border: "1px solid #3A3028", borderRadius: 4, color: "#F5EDE0", fontSize: 12, padding: "5px 8px", width: "100%", marginBottom: 8 }} />
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={saveCurrentStructure}
              style={{ background: "#D4831A", border: "none", borderRadius: 4, color: "#0A0806", fontSize: 11, padding: "4px 10px", cursor: "pointer" }}>
              Sauvegarder
            </button>
            <button onClick={() => { setShowSaveDialog(false); setTemplateName(""); }}
              style={{ background: "#2A241C", border: "1px solid #3A3028", borderRadius: 4, color: "#A09078", fontSize: 11, padding: "4px 10px", cursor: "pointer" }}>
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Liste des structures sauvegardées */}
      {savedStructures.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, color: "#A89880", marginBottom: 4 }}>📦 Structures sauvegardées</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {savedStructures.map(template => (
              <div key={template.id} style={{ background: "#141210", border: "1px solid #2A241C", borderRadius: 6, padding: "4px 8px", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 10, color: "#D0C0A8" }}>{template.name}</span>
                <button onClick={() => loadStructure(template)}
                  style={{ background: "transparent", border: "none", color: "#7BA0B8", cursor: "pointer", fontSize: 9 }}>
                  Charger
                </button>
                <button onClick={() => deleteTemplate(template.id)}
                  style={{ background: "transparent", border: "none", color: "#E05050", cursor: "pointer", fontSize: 9 }}>
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ajout de section */}
      <div style={{ background: "#141210", borderRadius: 8, padding: 10, marginBottom: 12 }}>
        <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, color: "#A89880", marginBottom: 6 }}>➕ Ajouter une section</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <select value={selectedStructural} onChange={e => setSelectedStructural(e.target.value)}
            style={{ background: "#0C0B09", border: "1px solid #3A3028", borderRadius: 6, color: "#F5EDE0", fontSize: 12, padding: "5px 8px" }}>
            {STRUCTURAL_TAGS.map(tag => <option key={tag} value={tag}>{tag}</option>)}
          </select>
          <button onClick={() => setShowDynamicSelector(!showDynamicSelector)}
            style={{ background: "#2A241C", border: "1px solid #3A3028", borderRadius: 6, color: "#D0C0A8", fontSize: 11, padding: "5px 10px", cursor: "pointer" }}>
            {selectedDynamics.length > 0 ? `${selectedDynamics.length} tag(s) actif(s)` : "➕ Tags (max 3)"}
          </button>
          <button onClick={addSection}
            style={{ background: "#D4831A", border: "none", borderRadius: 6, color: "#0A0806", fontSize: 11, padding: "5px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
            <Plus size={12} /> Ajouter
          </button>
        </div>
        {showDynamicSelector && (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 10, color: "#A89880", marginBottom: 4 }}>Tags vocaux</div>
            <div className="pill-wrap" style={{ marginBottom: 8 }}>
              {DYNAMIC_TAGS.vocal.map(tag => (
                <button key={tag} onClick={() => toggleDynamicTag(tag)}
                  style={{ background: selectedDynamics.includes(tag) ? "#D4831A22" : "#0C0B09", border: `1px solid ${selectedDynamics.includes(tag) ? "#D4831A" : "#3A3028"}`, borderRadius: 20, padding: "2px 8px", fontSize: 10, color: selectedDynamics.includes(tag) ? "#D4831A" : "#A09078", cursor: "pointer" }}>
                  {tag}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 10, color: "#A89880", marginBottom: 4 }}>Tags instrumentaux</div>
            <div className="pill-wrap" style={{ marginBottom: 8 }}>
              {DYNAMIC_TAGS.instrumental.map(tag => (
                <button key={tag} onClick={() => toggleDynamicTag(tag)}
                  style={{ background: selectedDynamics.includes(tag) ? "#D4831A22" : "#0C0B09", border: `1px solid ${selectedDynamics.includes(tag) ? "#D4831A" : "#3A3028"}`, borderRadius: 20, padding: "2px 8px", fontSize: 10, color: selectedDynamics.includes(tag) ? "#D4831A" : "#A09078", cursor: "pointer" }}>
                  {tag}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 10, color: "#A89880", marginBottom: 4 }}>Tags dynamiques</div>
            <div className="pill-wrap">
              {DYNAMIC_TAGS.dynamic.map(tag => (
                <button key={tag} onClick={() => toggleDynamicTag(tag)}
                  style={{ background: selectedDynamics.includes(tag) ? "#D4831A22" : "#0C0B09", border: `1px solid ${selectedDynamics.includes(tag) ? "#D4831A" : "#3A3028"}`, borderRadius: 20, padding: "2px 8px", fontSize: 10, color: selectedDynamics.includes(tag) ? "#D4831A" : "#A09078", cursor: "pointer" }}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Liste des sections avec duplication */}
      {sections.length > 0 && (
        <div>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, color: "#A89880", marginBottom: 6 }}>📋 Structure personnalisée</div>
          {sections.map((section, idx) => (
            <div key={section.id} style={{ background: "#0C0B09", border: "1px solid #2A241C", borderRadius: 6, padding: "6px 10px", marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 4 }}>
                <button onClick={() => moveSection(idx, -1)} disabled={idx === 0} style={{ background: "transparent", border: "none", color: "#A09078", cursor: idx === 0 ? "not-allowed" : "pointer" }}>↑</button>
                <button onClick={() => moveSection(idx, 1)} disabled={idx === sections.length-1} style={{ background: "transparent", border: "none", color: "#A09078", cursor: idx === sections.length-1 ? "not-allowed" : "pointer" }}>↓</button>
              </div>
              <div style={{ flex: 1, fontFamily: "'Crimson Pro',serif", fontSize: 12 }}>
                <span style={{ color: accent }}>{section.structural}</span>
                {section.dynamics.length > 0 && (
                  <span style={{ color: "#7BA0B8", marginLeft: 6 }}>
                    {section.dynamics.join(" ")}
                  </span>
                )}
              </div>
              <button onClick={() => duplicateSection(idx)}
                style={{ background: "transparent", border: "none", color: "#4A9E6E", cursor: "pointer" }}>
                <Copy size={14} />
              </button>
              <button onClick={() => removeSection(section.id)}
                style={{ background: "transparent", border: "none", color: "#E05050", cursor: "pointer" }}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <div style={{ marginTop: 8, background: "#0A0908", borderRadius: 6, padding: 8, border: "1px solid #2A241C" }}>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, color: "#A89880", marginBottom: 4 }}>📝 Aperçu du format final :</div>
            <div style={{ fontFamily: "'Crimson Pro',serif", fontSize: 11, color: "#C0B098", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
              {sections.map(s => getPreview(s)).join('\n')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
══════════════════════════════════════════════════════════ */

export default function SunoForge() {
  const [cat, setCat] = useState("metal");
  const [sub, setSub] = useState("Viking Folk Metal");
  const [moods, setMoods] = useState([]);
  const [vocals, setVocals] = useState([]);
  const [instrs, setInstrs] = useState([]);
  const [techs, setTechs] = useState([]);
  const [prod, setProd] = useState("");
  const [tempo, setTempo] = useState("");
  const [key, setKey] = useState("");
  const [bpm, setBpm] = useState("");
  const [timeSig, setTimeSig] = useState("");
  const [customOn, setCustomOn] = useState(false);
  const [customTxt, setCustomTxt] = useState("");
  const [openVG, setOpenVG] = useState(["Registre", "Style"]);
  const [openIG, setOpenIG] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);
  const [err, setErr] = useState(null);
  const [metaSections, setMetaSections] = useState([]);

  const accent = CATS[cat].accent;

  // Injection des polices et styles globaux
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,400&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { height: 100%; background: #0A0908; }
      body { height: 100%; overflow: hidden; background: #0A0908; }
      #root { height: 100dvh; display: flex; flex-direction: column; overflow: hidden; }
      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-track { background: #090807; }
      ::-webkit-scrollbar-thumb { background: #3A3028; border-radius: 2px; }
      ::-webkit-scrollbar-thumb:hover { background: #5A4A38; }
      .sf-main {
        flex: 1;
        overflow: hidden;
        display: grid;
        grid-template-columns: 52% 48%;
      }
      .sf-panel {
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
      }
      .sf-panel-r { border-left: 1px solid #2A241C; }
      @media (max-width: 767px) {
        body { overflow: auto; }
        #root { height: auto; min-height: 100dvh; overflow: visible; }
        .sf-main {
          grid-template-columns: 1fr;
          overflow: visible;
          height: auto;
        }
        .sf-panel { height: auto; overflow-y: visible; }
        .sf-panel-r { border-left: none; border-top: 1px solid #2A241C; }
      }
      .pill-wrap { display: flex; flex-wrap: wrap; gap: 5px; }
      .cat-bar { display: flex; gap: 5px; overflow-x: auto; padding-bottom: 2px; }
      .cat-bar::-webkit-scrollbar { height: 2px; }
      .style-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 6px; }
      .fade-in { animation: fi .3s ease; }
      @keyframes fi { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; } }
      .btn-gen { transition: all .2s; }
      .btn-gen:hover:not(:disabled) { background: #E8921F !important; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(212,131,26,.3); }
      .btn-gen:active:not(:disabled) { transform: translateY(0); }
      .acc-grp-btn:hover { color: #E0D4B0 !important; }
      textarea:focus { outline: none; border-color: #D4831A !important; box-shadow: 0 0 0 2px rgba(212,131,26,.1); }
      @keyframes spin { to { transform: rotate(360deg); } }
      .hover-style:hover { background: #1A1612 !important; }
      .tech-grp-label { display: flex; align-items: center; gap: 5px; margin-bottom: 5px; margin-top: 10px; }
      select, input, textarea {
        color: #F5EDE0 !important;
        background-color: #141210 !important;
        border-color: #3A3028 !important;
      }
      select option {
        background-color: #141210;
        color: #F5EDE0;
      }
      ::placeholder {
        color: #7A6A58 !important;
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(link); document.head.removeChild(style); };
  }, []);

  const handleCatChange = (k) => {
    setCat(k); setSub(SUBSTYLES[k][0]);
    setInstrs([]); setTechs([]); setOpenIG([]);
  };

  const handleInstrToggle = (tag) => {
    const next = tog(instrs, tag, 99);
    setInstrs(next);
    if (!next.includes(tag)) {
      const removed = (TECH[tag] || []).map(x => x.t);
      setTechs(p => p.filter(t => !removed.includes(t)));
    }
  };

  const generateLocal = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        let style = "";
        let metatags = "";
        let tips = [];
        let variants = [];
        if (customOn && customTxt.trim()) {
          style = truncateStyle(`Custom: ${customTxt.substring(0, 100)}`, 200);
          metatags = "[intro]\n[verse 1]\n[chorus]\n[bridge]\n[outro]";
          tips = ["Ajoutez des métatags pour structurer vos paroles.", "Pensez à la dynamique (soft/loud)."];
          variants = [
            { label: "Style épuré", style: truncateStyle(`${style}, minimal, raw`), desc: "Version plus brute." },
            { label: "Style orchestral", style: truncateStyle(`${style}, cinematic strings`), desc: "Ambiance hollywoodienne." }
          ];
        } else {
          style = buildStyleLocal(sub, moods, instrs, techs, prod, tempo, vocals, key, bpm, timeSig);
          metatags = buildMetatagsFromSections(metaSections, cat, sub);
          tips = buildTipsLocal(moods, instrs, techs);
          variants = buildVariantsLocal(sub, moods, instrs, techs, prod, tempo, vocals, key, bpm, timeSig);
        }
        setResult({
          style: style,
          charCount: style.length,
          metatags: metatags,
          tips: tips,
          variants: variants
        });
        setErr(null);
      } catch (e) {
        setErr("Erreur lors de la génération. Vérifiez vos sélections.");
      } finally {
        setLoading(false);
      }
    }, 200);
  };

  const doCopy = (text, keyId) => {
    navigator.clipboard.writeText(text);
    setCopied(keyId);
    setTimeout(() => setCopied(null), 2000);
  };

  const charPct = result ? Math.min(100, (result.charCount / 200) * 100) : 0;
  const charClr = !result ? "#2A2018" : result.charCount > 190 ? "#E05050" : result.charCount > 170 ? "#D4C030" : "#4A9E6E";

  const vgCount = (g) => VOCAL_GROUPS.find(x => x.g === g)?.items.filter(x => vocals.includes(x.t)).length || 0;
  const igCount = (catKey, g) => (INSTR[catKey]||[]).find(x => x.g === g)?.items.filter(x => instrs.includes(x.t)).length || 0;

  const Left = () => (
    <div>
      <Sec>
        <div style={{ display: "flex", background: "#0C0B09", border: "1px solid #2A241C", borderRadius: 7, padding: 3, alignSelf: "flex-start", gap: 0 }}>
          {[["guided", "🎛 Guidé"], ["custom", "✍️ Libre"]].map(([m, lbl]) => (
            <button key={m} onClick={() => setCustomOn(m === "custom")}
              style={{
                background: (m === "custom") === customOn ? "#2A241C" : "transparent",
                border: (m === "custom") === customOn ? "1px solid #3A3028" : "1px solid transparent",
                color: (m === "custom") === customOn ? "#E0D4B0" : "#8A7A68",
                borderRadius: 5, padding: "5px 13px", fontSize: 12.5,
                fontFamily: "'Crimson Pro',serif", cursor: "pointer", transition: "all .2s",
              }}>
              {lbl}
            </button>
          ))}
        </div>
      </Sec>

      {customOn ? (
        <Sec>
          <SLabel>Description libre</SLabel>
          <textarea value={customTxt} onChange={e => setCustomTxt(e.target.value)} rows={5}
            placeholder="Ex: Cérémonie druidique au crépuscule, vielle à roue, chœurs masculins profonds, ambiance rituelle et sacrée…"
            style={{
              background: "#141210", border: "1px solid #3A3028", borderRadius: 7,
              color: "#F5EDE0", fontFamily: "'Crimson Pro',serif", fontSize: 14,
              padding: "9px 11px", width: "100%", lineHeight: 1.55,
              resize: "vertical", transition: "border-color .2s",
            }} />
          <div style={{ fontSize: 11.5, color: "#A09078", fontStyle: "italic" }}>Genre, ambiance, instruments, voix, images évocatrices…</div>
        </Sec>
      ) : (<>
        <Sec>
          <SLabel>Catégorie</SLabel>
          <div className="cat-bar">
            {Object.entries(CATS).map(([k, v]) => (
              <button key={k} onClick={() => handleCatChange(k)}
                style={{
                  background: cat === k ? "#1A1510" : "#0C0B09",
                  border: `1px solid ${cat === k ? v.accent : "#3A3028"}`,
                  color: cat === k ? v.accent : "#A89880",
                  borderRadius: 7, padding: "5px 11px", fontSize: 11.5,
                  fontFamily: "'Cinzel',serif", fontWeight: cat === k ? 600 : 400,
                  cursor: "pointer", whiteSpace: "nowrap", transition: "all .18s",
                  boxShadow: cat === k ? `0 0 9px ${v.accent}22` : "none",
                }}>
                {v.rune} {v.label}
              </button>
            ))}
          </div>
        </Sec>

        <Sec>
          <SLabel>Style</SLabel>
          <div className="style-grid">
            {SUBSTYLES[cat].map(s => (
              <button key={s} onClick={() => setSub(s)} className="hover-style"
                style={{
                  background: sub === s ? "#2A241C" : "#0C0B09",
                  border: `1px solid ${sub === s ? accent : "#3A3028"}`,
                  color: sub === s ? "#F5EDE0" : "#B0A088",
                  borderRadius: 7, padding: "7px 9px", fontSize: 11.5,
                  fontFamily: "'Crimson Pro',serif", textAlign: "left",
                  cursor: "pointer", transition: "all .15s", lineHeight: 1.3,
                }}>
                {sub === s && <span style={{ color: accent, marginRight: 3, fontSize: 8 }}>◆</span>}
                {s}
              </button>
            ))}
          </div>
        </Sec>

        <Sec>
          <SLabel badge={`${moods.length}/5`}>Mood</SLabel>
          <div className="pill-wrap">
            {MOODS.map(m => (
              <Pill key={m} label={m} active={moods.includes(m)} accent="#C0902A"
                disabled={!moods.includes(m) && moods.length >= 5}
                onClick={() => setMoods(p => tog(p, m, 5))} />
            ))}
          </div>
        </Sec>

        <Sec>
          <SLabel badge={`${vocals.length}/10`}>Voix</SLabel>
          {VOCAL_GROUPS.map(({ g, items }) => (
            <AccGroup key={g} label={g} open={openVG.includes(g)} count={vgCount(g)}
              onToggle={() => setOpenVG(p => p.includes(g) ? p.filter(x => x !== g) : [...p, g])}>
              <div className="pill-wrap" style={{ paddingTop: 3 }}>
                {items.map(({ t, l }) => (
                  <Pill key={t} label={l} active={vocals.includes(t)} accent="#7BA0B8"
                    disabled={!vocals.includes(t) && vocals.length >= 10}
                    onClick={() => setVocals(p => tog(p, t, 10))} />
                ))}
              </div>
            </AccGroup>
          ))}
        </Sec>

        <Sec>
          <SLabel badge={instrs.length > 0 ? `${instrs.length} sél.` : "optionnel"}>Instruments</SLabel>
          {(INSTR[cat] || []).map(({ g, items }) => (
            <AccGroup key={g} label={g} open={openIG.includes(g)} count={igCount(cat, g)}
              onToggle={() => setOpenIG(p => p.includes(g) ? p.filter(x => x !== g) : [...p, g])}>
              <div className="pill-wrap" style={{ paddingTop: 3 }}>
                {items.map(({ t, l }) => (
                  <Pill key={t} label={l} active={instrs.includes(t)} accent={accent}
                    onClick={() => handleInstrToggle(t)} />
                ))}
              </div>
            </AccGroup>
          ))}
        </Sec>

        {instrs.length > 0 && instrs.some(i => (TECH[i] || []).length > 0) && (
          <Sec>
            <SLabel badge={techs.length > 0 ? `${techs.length} sél.` : "optionnel"}>Techniques</SLabel>
            {instrs.map(instrTag => {
              const instrTechs = TECH[instrTag] || [];
              if (instrTechs.length === 0) return null;
              const instrLabel = getInstrLabel(cat, instrTag);
              return (
                <div key={instrTag}>
                  <div className="tech-grp-label">
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, display: "inline-block", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Cinzel',serif", fontSize: 9, color: accent, letterSpacing: ".12em", textTransform: "uppercase" }}>{instrLabel}</span>
                  </div>
                  <div className="pill-wrap">
                    {instrTechs.map(({ t, l }) => (
                      <Pill key={t} label={l} active={techs.includes(t)} accent="#9B6FD4"
                        onClick={() => setTechs(p => tog(p, t, 99))} />
                    ))}
                  </div>
                </div>
              );
            })}
          </Sec>
        )}

        <Sec>
          <SLabel>Production</SLabel>
          <div className="pill-wrap">
            {PRODS.map(p => (
              <Pill key={p} label={p} active={prod === p} accent="#4A9E6E"
                onClick={() => setProd(x => x === p ? "" : p)} />
            ))}
          </div>
        </Sec>

        <Sec>
          <SLabel>Tempo</SLabel>
          <div className="pill-wrap">
            {TEMPOS.map(t => (
              <Pill key={t} label={t} active={tempo === t} accent="#3A8FD4"
                onClick={() => setTempo(x => x === t ? "" : t)} />
            ))}
          </div>
        </Sec>

        <Sec>
          <SLabel badge={key || bpm || timeSig ? "actif" : "optionnel"}>🎼 Théorie musicale</SLabel>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, color: "#A89880", marginBottom: 4, letterSpacing: ".1em" }}>Tonalité</div>
            {(() => {
              const { recommended, otherKeys } = getSortedKeys(cat);
              return (
                <select value={key} onChange={e => setKey(e.target.value)}
                  style={{
                    background: "#141210", border: "1px solid #3A3028", borderRadius: 6,
                    color: "#F5EDE0", fontFamily: "'Crimson Pro',serif", fontSize: 13,
                    padding: "6px 8px", width: "100%", cursor: "pointer"
                  }}>
                  <option value="">-- Aucune --</option>
                  {recommended.length > 0 && (
                    <optgroup label="✨ Recommandées pour ce style">
                      {recommended.map(k => <option key={k} value={k}>{k}</option>)}
                    </optgroup>
                  )}
                  <optgroup label="📚 Autres tonalités">
                    {otherKeys.map(k => <option key={k} value={k}>{k}</option>)}
                  </optgroup>
                </select>
              );
            })()}
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, color: "#A89880", marginBottom: 4, letterSpacing: ".1em" }}>Tempo (BPM)</div>
            <input type="number" min="30" max="300" step="5" value={bpm} onChange={e => setBpm(e.target.value)}
              placeholder="ex: 120"
              style={{
                background: "#141210", border: "1px solid #3A3028", borderRadius: 6,
                color: "#F5EDE0", fontFamily: "'Crimson Pro',serif", fontSize: 13,
                padding: "6px 8px", width: "100%"
              }} />
          </div>
          <div>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, color: "#A89880", marginBottom: 4, letterSpacing: ".1em" }}>Signature rythmique</div>
            {(() => {
              const { recommended, otherTimeSigs } = getSortedTimeSigs(cat);
              return (
                <select value={timeSig} onChange={e => setTimeSig(e.target.value)}
                  style={{
                    background: "#141210", border: "1px solid #3A3028", borderRadius: 6,
                    color: "#F5EDE0", fontFamily: "'Crimson Pro',serif", fontSize: 13,
                    padding: "6px 8px", width: "100%", cursor: "pointer"
                  }}>
                  <option value="">-- Aucune --</option>
                  {recommended.length > 0 && (
                    <optgroup label="✨ Recommandées pour ce style">
                      {recommended.map(ts => <option key={ts} value={ts}>{ts}</option>)}
                    </optgroup>
                  )}
                  <optgroup label="📚 Autres signatures">
                    {otherTimeSigs.map(ts => <option key={ts} value={ts}>{ts}</option>)}
                  </optgroup>
                </select>
              );
            })()}
          </div>
        </Sec>

        <Sec>
          <SLabel badge={`${metaSections.length} section(s)`}>🎼 Structure des paroles (tags)</SLabel>
          <MetaTagEditor sections={metaSections} onSectionsChange={setMetaSections} accent={accent} />
          <div style={{ fontSize: 10, color: "#7A6A58", marginTop: 6, fontStyle: "italic" }}>
            💡 Recommandation : 2 à 3 tags max par section. Exemple : [Chorus] + [epic] + [choir] → [chorus: epic, choir]
          </div>
        </Sec>
      </>)}

      <Sec noBorder>
        <button onClick={generateLocal} disabled={loading || (customOn && !customTxt.trim())} className="btn-gen"
          style={{
            width: "100%", background: loading ? "#2A241C" : "#D4831A",
            border: "none", borderRadius: 9, padding: "12px 0",
            color: loading ? "#A09078" : "#0A0806",
            fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 13,
            letterSpacing: ".1em", cursor: loading ? "wait" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
            opacity: (customOn && !customTxt.trim()) ? .45 : 1,
          }}>
          {loading ? <><RotateCcw size={14} style={{ animation: "spin 1s linear infinite" }} /> Génération…</> : <><Wand2 size={14} /> FORGER LE PROMPT</>}
        </button>
      </Sec>
    </div>
  );

  const Right = () => (
    <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10, minHeight: "100%" }}>
      {!result && !loading && !err && (
        <div style={{
          flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          background: "#0C0B09", border: "1px dashed #2A241C", borderRadius: 10, padding: "40px 20px",
          minHeight: 200,
        }}>
          <div style={{ fontSize: 36, opacity: .15, marginBottom: 10 }}>ᚨ</div>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 12, color: "#6A5A48", letterSpacing: ".1em", textAlign: "center" }}>
            Le prompt apparaîtra ici
          </div>
          <div style={{ fontSize: 11, marginTop: 5, color: "#4A3A28", textAlign: "center" }}>
            Configure le style et forge
          </div>
        </div>
      )}

      {err && (
        <div style={{ background: "#2A1010", border: "1px solid #6A2A2A", borderRadius: 8, padding: 13, color: "#E09090", fontSize: 13 }}>
          ⚠ {err}
        </div>
      )}

      {loading && (
        <div style={{
          flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          background: "#0C0B09", border: "1px solid #2A241C", borderRadius: 10, padding: "40px 20px", minHeight: 200,
        }}>
          <div style={{ fontSize: 24, animation: "spin 2s linear infinite", display: "inline-block" }}>ᚠ</div>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: "#8A7A68", letterSpacing: ".1em", marginTop: 10 }}>
            Les runes se forgent…
          </div>
        </div>
      )}

      {result && (
        <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: "#0E0C0A", border: "1px solid #3A3428", borderRadius: 9, overflow: "hidden" }}>
            <div style={{ padding: "8px 12px", borderBottom: "1px solid #2A241C", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
              <span style={{ fontFamily: "'Cinzel',serif", fontSize: 9.5, color: "#C0B098", letterSpacing: ".15em", textTransform: "uppercase" }}>🎵 Champ Style</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <span style={{ fontSize: 11 }}>
                  <span style={{ color: charClr, fontWeight: 600 }}>{result.charCount}</span>
                  <span style={{ color: "#6A5A48" }}>/200</span>
                </span>
                <CopyBtn text={result.style} id="style" copied={copied} onCopy={doCopy} />
              </div>
            </div>
            <div style={{ height: 2, background: "#2A241C" }}>
              <div style={{ height: "100%", width: `${charPct}%`, background: charClr, transition: "all .5s" }} />
            </div>
            <div style={{ padding: "11px 12px", fontFamily: "'Crimson Pro',serif", fontSize: 14.5, lineHeight: 1.65, color: "#F5EDE0" }}>
              {result.style}
            </div>
          </div>

          <div style={{ background: "#0E0C0A", border: "1px solid #3A3428", borderRadius: 9, overflow: "hidden" }}>
            <div style={{ padding: "8px 12px", borderBottom: "1px solid #2A241C", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Cinzel',serif", fontSize: 9.5, color: "#C0B098", letterSpacing: ".15em", textTransform: "uppercase" }}>📋 Structure Paroles</span>
              <CopyBtn text={result.metatags} id="meta" copied={copied} onCopy={doCopy} />
            </div>
            <div style={{ padding: "11px 12px" }}>
              {result.metatags.split("\n").map((line, i) => (
                <div key={i} style={{
                  fontSize: 13, lineHeight: 1.9,
                  color: line.startsWith("[") ? "#A0C0D8" : "#C0B098",
                  fontStyle: "normal",
                  fontFamily: "'Crimson Pro',serif",
                }}>
                  {line || "\u00A0"}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#0C0F0A", border: "1px solid #2A2A1C", borderRadius: 9, padding: "9px 12px" }}>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9.5, color: "#8AA87A", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 8 }}>
              💡 Conseils
            </div>
            {result.tips?.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 6, marginBottom: 5, fontSize: 12.5, color: "#C8D8B8", fontFamily: "'Crimson Pro',serif", lineHeight: 1.5 }}>
                <ChevronRight size={11} style={{ color: "#8AB868", flexShrink: 0, marginTop: 3 }} />
                <span>{t}</span>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9.5, color: "#8A7A68", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 7 }}>
              🔄 Variantes
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {result.variants?.map((v, i) => (
                <div key={i} style={{ background: "#0E0C0A", border: "1px solid #3A3428", borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ padding: "6px 11px", borderBottom: "1px solid #2A241C", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: "#D4831A", fontWeight: 600 }}>{v.label}</span>
                    <CopyBtn text={v.style} id={`v${i}`} copied={copied} onCopy={doCopy} />
                  </div>
                  <div style={{ padding: "8px 11px" }}>
                    <div style={{ fontSize: 13, color: "#E8D8C0", fontFamily: "'Crimson Pro',serif", marginBottom: 3, lineHeight: 1.5 }}>{v.style}</div>
                    <div style={{ fontSize: 11.5, color: "#A09078", fontStyle: "italic", fontFamily: "'Crimson Pro',serif" }}>{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ height: "100dvh", display: "flex", flexDirection: "column", background: "#0A0908", color: "#F5EDE0", fontFamily: "'Crimson Pro',Georgia,serif", overflow: "hidden" }}>
      <div style={{
        flexShrink: 0, borderBottom: "1px solid #2A241C", padding: "11px 18px",
        background: "linear-gradient(180deg,#14100C 0%,#0A0908 100%)",
        display: "flex", alignItems: "center", gap: 11,
      }}>
        <div style={{ width: 34, height: 34, borderRadius: 7, background: "linear-gradient(135deg,#3A2610,#181208)", border: "1px solid #3A3028", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>ᚨ</div>
        <div>
          <div style={{ fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 15, color: "#D4831A", letterSpacing: ".07em" }}>SUNO FORGE</div>
          <div style={{ fontSize: 9.5, color: "#A09078", letterSpacing: ".18em", textTransform: "uppercase" }}>Générateur de Prompts · 4.5</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {vocals.length > 0 && <div style={{ background: "#1A2028", border: "1px solid #3A5A78", borderRadius: 20, padding: "2px 9px", fontSize: 10.5, color: "#A0C8E8", fontFamily: "'Cinzel',serif" }}>{vocals.length} voix</div>}
          {instrs.length > 0 && <div style={{ background: "#2A1E18", border: `1px solid ${accent}99`, borderRadius: 20, padding: "2px 9px", fontSize: 10.5, color: accent, fontFamily: "'Cinzel',serif" }}>{instrs.length} instr.</div>}
          {techs.length > 0  && <div style={{ background: "#1E1828", border: "1px solid #6A4EA0", borderRadius: 20, padding: "2px 9px", fontSize: 10.5, color: "#C8A8F0", fontFamily: "'Cinzel',serif" }}>{techs.length} tech.</div>}
          {moods.length > 0  && <div style={{ background: "#2A2018", border: "1px solid #C0902A", borderRadius: 20, padding: "2px 9px", fontSize: 10.5, color: "#E0B050", fontFamily: "'Cinzel',serif" }}>{moods.length} mood</div>}
          {(key || bpm || timeSig) && <div style={{ background: "#182828", border: "1px solid #5AA0A0", borderRadius: 20, padding: "2px 9px", fontSize: 10.5, color: "#90D0D0", fontFamily: "'Cinzel',serif" }}>🎵 théorie</div>}
        </div>
      </div>
      <div className="sf-main">
        <div className="sf-panel"><Left /></div>
        <div className="sf-panel sf-panel-r"><Right /></div>
      </div>
    </div>
  );
}
