document.addEventListener('DOMContentLoaded', () => {

  // ===== Scroll-triggered fade-in animations =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ===== Navbar scroll behavior =====
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ===== Mobile menu toggle =====
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ===== Smooth scroll for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    });
  });

  // ===== Waitlist form =====
  const form = document.getElementById('waitlistForm');
  const successMsg = document.getElementById('waitlistSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('waitlistEmail').value;
      if (email) {
        form.style.display = 'none';
        successMsg.style.display = 'block';
        successMsg.classList.add('fade-up', 'visible');
      }
    });
  }

  // ===== Typing animation in demo chat =====
  const animateChatMsgs = (msgs) => {
    msgs.forEach(msg => {
      msg.style.opacity = '0';
      msg.style.transform = 'translateY(10px)';
      msg.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    msgs.forEach((msg, i) => {
      setTimeout(() => {
        msg.style.opacity = '1';
        msg.style.transform = 'translateY(0)';
      }, 300 + i * 500);
    });
  };

  const demoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateChatMsgs(entry.target.querySelectorAll('.chat-msg'));
        demoObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const demoChat = document.querySelector('#demo-plato .demo-chat');
  if (demoChat) demoObserver.observe(demoChat);

  // ===== Demo circle click data =====
  const demoNodeData = {
    plato: {
      socrates:    { title: 'Socrates (470–399 BCE)', body: 'Athenian philosopher who wrote nothing. His ideas survive through Plato\'s dialogues. Executed for "impiety" and "corrupting youth" — charges he never stopped refuting.' },
      virtue:      { title: 'Virtue (Aretē) — Mastered', body: 'Covered in Ch.1. For Socrates, virtue cannot be inherited — it must be earned through self-examination. Virtue and knowledge are inseparable.' },
      knowledge:   { title: 'Knowledge (Episteme) — Mastered', body: 'Covered in Ch.2. The famous paradox: Socrates claims to "know nothing," yet this awareness itself constitutes true wisdom — the wisest men know their own ignorance.' },
      piety:       { title: 'Piety (Eusebeia) — Mastered', body: 'Covered in Ch.2. The central charge against Socrates. He argues his questioning is in fact the most pious act — it fulfills a divine mission from the Oracle at Delphi.' },
      soul:        { title: 'The Soul (Psyche) ← Reading now', body: 'Ch.3 focus: Socrates argues care of the soul is infinitely more important than the body\'s survival. Death is preferable to abandoning philosophy — the soul\'s purpose.' },
      justice:     { title: 'Justice (Dikaiosynē) — Upcoming', body: 'Ch.5: How does Socrates define justice when the state\'s "justice" condemns him for asking questions? Coming in the sentencing section.' },
      death:       { title: 'Death (Thanatos) — Upcoming', body: 'Ch.6: Socrates\' final argument — death is not to be feared. Either it is dreamless sleep (a blessing) or a journey to converse with great minds (a greater blessing).' },
      'ch3-virtue':{ title: 'Virtue in Ch.3', body: 'Socrates connects virtue to self-examination: without constant questioning, moral goodness becomes empty habit rather than genuine understanding.' },
      'ch3-duty':  { title: 'Moral Duty', body: 'Questioning is not optional. Socrates frames it as a divine mission — a moral obligation that cannot be abandoned, even to save his own life.' },
      'ch3-truth': { title: 'Truth', body: 'The pursuit of truth is the highest human activity. Nothing — including survival — should compromise the search for what is truly good.' },
      'ch3-good':  { title: 'The Good (To Agathon)', body: 'The ultimate aim of all questioning. Discovering what is truly good for the soul is what gives life meaning — this is the "examined" life Socrates defends.' },
      'tl-opening':  { title: '§1 — The Opening', body: 'Socrates addresses the jury, noting his accusers almost made him forget himself. He speaks plainly and simply, unlike the polished professional orators.' },
      'tl-defense':  { title: '§2 — The Defense', body: 'Socrates refutes both old and new charges. He cross-examines Meletus, exposing deep contradictions in the accusations of impiety and corrupting youth.' },
      'tl-examined': { title: '§3 — The Examined Life ← Here', body: 'The climax of the Apology. "The unexamined life is not worth living." Socrates refuses to stop philosophizing, even to save his life.' },
      'tl-jury':     { title: '§4 — The Jury Vote — Upcoming', body: 'The jury votes 280 to 220 to convict. Socrates then proposes his own "punishment" — free meals at the Prytaneum — a great civic honor, not a penalty.' },
      'tl-sentence': { title: '§5 — The Sentence — Upcoming', body: 'Death is sentenced. Socrates gives his final speech — he will not weep or beg. He parts in peace, arguing no evil can befall a good man, in life or death.' },
    },
    shoftim: {
      deborah:      { title: 'Deborah (Devorah)', body: 'The only female judge in Shoftim. Simultaneously a prophetess, judge, and military strategist. She holds court under the Palm of Deborah. Her name means "bee."' },
      barak:        { title: 'Barak ben Avinoam', body: 'Military commander from the tribe of Naphtali. He refuses to march without Deborah beside him — an act that costs him the glory of final victory, which goes to Yael instead.' },
      yael:         { title: 'Yael (Jael)', body: 'Wife of Hever the Kenite. Seemingly neutral, she invites Sisera in, gives him milk, covers him — then drives a tent peg through his temple while he sleeps, fulfilling Deborah\'s prophecy.' },
      sisera:       { title: 'Sisera', body: 'Commander of Jabin\'s 900 iron chariots. After his army is routed at Kishon, he flees on foot. His fatal mistake: trusting that "neutral" Kenite hospitality meant safety.' },
      canaan:       { title: 'Canaanite Oppression (20 years)', body: 'Israel was "sold" to Jabin, King of Hazor, for 20 years. This oppression is the direct consequence of abandoning God — and the cry for help that triggers Deborah\'s rise.' },
      'ev-deborah': { title: 'Deborah Summons Barak', body: 'Deborah delivers God\'s command: gather 10,000 men at Mount Tabor. She promises victory but warns Barak: "glory will go to a woman" because he required her presence.' },
      'ev-battle':  { title: 'Battle of Kishon', body: 'God sends rain; the Kishon River floods. Sisera\'s 900 iron chariots — his greatest military advantage — become useless in the mud. The Israelites rout the entire Canaanite army.' },
      'ev-flees':   { title: 'Sisera Flees on Foot', body: 'The commander of Canaan abandons his chariot and flees alone. He heads to Yael\'s tent expecting safety from the Kenite alliance with Jabin — a fatal miscalculation.' },
      'ev-victory': { title: 'Yael\'s Victory', body: 'Yael drives a tent peg through Sisera\'s temple as he sleeps. Deborah\'s prophecy in 4:9 is fulfilled: the glory of Israel\'s victory goes not to Barak, but to a woman.' },
      'tl-othniel': { title: 'Othniel (Ch.3) — Covered', body: 'The first judge of Israel after Joshua. He delivered Israel from Cushan-Rishathaim of Mesopotamia. A model judge: he judged Israel 40 years and the land had rest.' },
      'tl-ehud':    { title: 'Ehud (Ch.3) — Covered', body: 'Left-handed judge from Benjamin. He secretly assassinated Eglon, the obese king of Moab, ending 18 years of oppression. He then led Israel to kill 10,000 Moabite warriors at the Jordan.' },
      'tl-deborah': { title: 'Deborah & Barak (Ch.4–5) ← Here', body: 'You are here. Deborah, Israel\'s only female judge, leads Israel to victory over Canaan through Barak\'s battle strategy and Yael\'s unexpected act of courage.' },
      'tl-gideon':  { title: 'Gideon (Ch.6–8) — Upcoming', body: 'An unlikely hero — he calls himself the weakest in Manasseh. Yet he defeats the vast Midianite army with only 300 men, broken jars, and torches. He later falls into idolatry.' },
      'tl-samson':  { title: 'Samson (Ch.13–16) — Upcoming', body: 'Israel\'s strongest judge — and its most flawed. His battles with the Philistines, his love for Delilah, and his dramatic final act in the temple form one of the Bible\'s most powerful tragic cycles.' },
    }
  };

  // Chat content shown when a circle is clicked
  const demoNodeChat = {
    plato: {
      socrates:    [{ type:'tutor', tag:'🎓 About Socrates', text:'Everything we know of Socrates comes through Plato — he wrote nothing himself. The Apology may blend the historical Socrates with Plato\'s own philosophy. Reading it means reading both at once.' }],
      virtue:      [{ type:'tutor', tag:'💡 Mastered in Ch.1', text:'Virtue (aretē) cannot be inherited or given — it must be actively developed through self-examination. The key insight you proved in Ch.1: virtue and knowledge are inseparable. You can\'t do good without understanding what good <em>is</em>.' }, { type:'tutor', tag:'✅ Connect it', text:'Now that you\'re in Ch.3 — how does this definition of virtue explain why Socrates refuses to stop philosophizing even to save his life?' }],
      knowledge:   [{ type:'tutor', tag:'💡 Mastered in Ch.2', text:'The Socratic paradox: the wisest person knows they know nothing. This isn\'t false modesty — it\'s a precise claim that most people mistake opinion (doxa) for knowledge (episteme). Real knowledge requires justification, not just belief.' }],
      piety:       [{ type:'tutor', tag:'💡 Mastered in Ch.2', text:'Socrates was charged with impiety — yet he argues his questioning IS piety. He was fulfilling a divine mission from Apollo\'s oracle. The real impiety, he says, would be to stop asking questions and live a life of comfortable ignorance.' }],
      soul:        [{ type:'tutor', tag:'📖 Reading now', text:'This is the core of Ch.3: Socrates argues the soul\'s wellbeing matters infinitely more than the body\'s survival. He isn\'t being metaphorical. The daily practice of questioning literally nourishes the soul — its absence starves it.' }, { type:'tutor', tag:'✅ Comprehension check', text:'If Socrates truly believes this, what does it explain about his behavior at trial — his refusal to beg, weep, or propose exile as punishment?' }],
      justice:     [{ type:'tutor', tag:'⏭ Coming in Ch.5', text:'Watch for the central tension ahead: when the state\'s "justice" condemns a man for asking questions, what is his obligation? Socrates will argue he answers to a higher court than any human jury.' }],
      death:       [{ type:'tutor', tag:'⏭ Coming in Ch.6', text:'Socrates\' final argument is his most serene: death cannot be an evil. Either it\'s dreamless sleep — a blessing for any tired mind — or a journey to meet the greatest thinkers in history. Either way, he wins.' }],
      'ch3-virtue':  [{ type:'tutor', tag:'💡 In context', text:'In Ch.3, virtue isn\'t just doing the right thing — it\'s the <em>examined</em> right thing. Socrates argues that moral goodness without self-reflection is really just social conditioning. True virtue requires asking "why" at every step.' }],
      'ch3-duty':    [{ type:'tutor', tag:'⚡ Key argument', text:'This is the most radical claim in Ch.3: philosophical questioning is a <em>divine duty</em>, not a hobby. Abandoning it — even to save his life — would be the real moral failure. The examined life isn\'t optional for Socrates.' }, { type:'tutor', tag:'✅ Think', text:'If questioning is a moral duty, can someone be forced to stop? What does Socrates\' answer tell us about the limits of political authority?' }],
      'ch3-truth':   [{ type:'tutor', tag:'🔗 Foundation', text:'Truth isn\'t one value among many for Socrates — it\'s the foundation of all others. Without it, virtue, justice, and piety become empty words. This is why he can\'t stop questioning, even under penalty of death.' }],
      'ch3-good':    [{ type:'tutor', tag:'🎯 The aim', text:'The Good (to agathon) is what all of Socrates\' questioning points toward. He never defines it directly — he shows it through elimination, removing false goods (wealth, reputation, comfort) until only the genuine good remains: wisdom.' }],
      'tl-opening':  [{ type:'tutor', tag:'📖 §1 — The Opening', text:'Socrates opens by noting how his accusers almost made him forget himself — their rhetoric was so polished. His response is deliberately plain. This itself is a philosophical act: he refuses to manipulate the jury\'s emotions.' }],
      'tl-defense':  [{ type:'tutor', tag:'📖 §2 — The Defense', text:'Instead of defending himself, Socrates goes on offense. He turns the trial into a philosophical seminar, exposing the emptiness of Meletus\'s thinking. His defense is actually an accusation — of Athens\' intellectual shallowness.' }],
      'tl-examined': [{ type:'tutor', tag:'📖 §3 — You are here', text:'This is the emotional core of the Apology. The jury has just offered Socrates a deal: stop philosophizing and go free. His answer — the examined life — is the most famous line in Western philosophy. You\'re reading the hinge moment.' }],
      'tl-jury':     [{ type:'tutor', tag:'⏭ §4 — Upcoming', text:'The jury votes 280–220 to convict. Then Socrates is asked what punishment he deserves. His answer is so provocative — suggesting free meals at the Prytaneum — that it adds 80 votes to the death penalty. Watch for the logic behind it.' }],
      'tl-sentence': [{ type:'tutor', tag:'⏭ §5 — Upcoming', text:'After sentencing, Socrates gives his final speech in total calm. He prophesies that more questioners will come after him — Athens cannot kill an idea. It may be the most defiant, peaceful ending in all of philosophy.' }],
    },
    shoftim: {
      deborah:      [{ type:'tutor', tag:'🔗 Character spotlight', text:'Deborah holds a unique triple role — prophetess, judge, military commander — never combined in one person anywhere else in Shoftim. She doesn\'t fight; she directs. Her authority is moral and prophetic, not physical.' }, { type:'tutor', tag:'✅ Think about it', text:'Barak refuses to go to war without her. What does that tell us about where Israel\'s real authority lies at this moment — and what kind of leadership the text is valorizing?' }],
      barak:        [{ type:'tutor', tag:'🔗 Character insight', text:'Barak is capable but dependent. His condition — "I won\'t go unless you come" — isn\'t cowardice. It\'s recognition of where Israel\'s true strength comes from. But it costs him the glory, exactly as Deborah predicted in 4:9.' }, { type:'tutor', tag:'✅ Think', text:'Barak does everything right militarily yet receives no lasting credit. What does the story say about the relationship between action and honor when working under prophetic authority?' }],
      yael:         [{ type:'tutor', tag:'🔗 The unexpected hero', text:'Yael is an outsider — the Kenites were neutral, with a treaty with Canaan. Her act is unordered, unrewarded by any army, and completely unexpected. The narrative presents her as acting from pure moral conviction, not obligation.' }, { type:'tutor', tag:'✅ Think', text:'If Yael wasn\'t commanded and wasn\'t an Israelite, what motivates her? What does the text suggest about the source of moral courage?' }],
      sisera:       [{ type:'tutor', tag:'⚔ The enemy', text:'Sisera represents Canaan\'s peak military power — 900 iron chariots were the tanks of their era. His downfall is deeply ironic: his greatest weapon is neutralized by rain, and his life ends not to a warrior, but to a tent peg.' }, { type:'tutor', tag:'✅ Pattern', text:'Sisera trusts in two things: iron chariots and Kenite neutrality. Both betray him. What recurring pattern in Shoftim does this reflect?' }],
      canaan:       [{ type:'tutor', tag:'📖 The Shoftim cycle', text:'20 years of Canaanite oppression wasn\'t random — the text says Israel was "sold" to Jabin because they abandoned God. This is the Shoftim cycle in action: sin → punishment → cry out → rescue → peace → repeat.' }, { type:'tutor', tag:'✅ Comprehension check', text:'This is the 3rd iteration of the cycle in the book. What pattern is forming? What does the repetition suggest about how the text views human nature and history?' }],
      'ev-deborah': [{ type:'tutor', tag:'⚡ The prophecy', text:'Deborah doesn\'t just command — she prophesies the outcome in advance: victory is certain, but "glory will not go to you, Barak." This pre-knowledge transforms the battle from military history into theological narrative.' }],
      'ev-battle':  [{ type:'tutor', tag:'⚡ The battle', text:'Victory comes not through superior tactics but through weather. The Kishon River floods; Sisera\'s iron chariots — his greatest strength — become useless in the mud. This is a recurring Tanach motif: God uses nature as a weapon.' }, { type:'tutor', tag:'✅ Think', text:'If God won the battle through nature, what role does Barak\'s army actually play? Is human effort necessary when God fights for Israel?' }],
      'ev-flees':   [{ type:'tutor', tag:'🔗 The turning point', text:'Sisera fleeing on foot is a deliberate humiliation — the general of iron chariots, running alone. His flight to Yael\'s tent sets up the story\'s ironic finale. He expects the safety of a treaty; he finds the fulfillment of a prophecy.' }],
      'ev-victory': [{ type:'tutor', tag:'✅ The fulfillment', text:'Yael\'s act fulfills Deborah\'s prophecy perfectly: glory went to a woman. Shoftim 5 — the Song of Deborah — then retells the entire story as poetry. It\'s one of the oldest texts in the Tanach, written as if the battle is still happening.' }],
      'tl-othniel': [{ type:'tutor', tag:'📖 Ch.3 — Covered', text:'Othniel is the "model judge" — brief, decisive, no drama. He delivers, leads 40 years of peace, dies quietly. Scholars read him as the template against which all later judges are measured. None of them fully live up to it.' }],
      'tl-ehud':    [{ type:'tutor', tag:'📖 Ch.3 — Covered', text:'Ehud is Shoftim\'s first trickster judge. His left-handedness was rare enough that the Moabites didn\'t check his right side for a weapon. The text describes Eglon\'s assassination in graphic, almost darkly comic detail.' }, { type:'tutor', tag:'✅ Think', text:'Why does the text describe the assassination so vividly? What effect does this tone have — and what does it say about how the author views Israel\'s enemies?' }],
      'tl-deborah': [{ type:'tutor', tag:'📖 Ch.4–5 — You are here', text:'After two relatively straightforward judges, Deborah\'s story is the most complex: multiple leaders, a prophetic framework, an unexpected hero, and a companion poem (Ch.5). You\'re at the richest point in the early book.' }],
      'tl-gideon':  [{ type:'tutor', tag:'⏭ Ch.6–8 — Upcoming', text:'Gideon starts as an anxious farmer hiding from the Midianites and becomes a military genius who defeats 135,000 with 300 men. Then he slowly unravels through pride and idolatry. His story is a masterclass in how success corrupts.' }],
      'tl-samson':  [{ type:'tutor', tag:'⏭ Ch.13–16 — Upcoming', text:'Samson is Shoftim\'s most tragic figure. His strength is legendary but he\'s ruled by personal desire, not public duty. Unlike other judges, he never leads Israel — he fights alone, for revenge. His story ends in darkness and grace.' }, { type:'tutor', tag:'✅ Think ahead', text:'How does Samson contrast with Deborah? What does that contrast say about what the text considers a truly great judge?' }],
    }
  };

  const buildChatHTML = (messages) => messages.map(m =>
    m.type === 'user'
      ? `<div class="chat-msg user"><div class="chat-bubble">${m.text}</div><span class="chat-avatar">👤</span></div>`
      : `<div class="chat-msg tutor"><span class="chat-avatar">🤖</span><div class="chat-bubble">${m.tag ? `<span class="chat-insight-tag">${m.tag}</span>` : ''}${m.text}</div></div>`
  ).join('');

  document.querySelectorAll('.demo-clickable').forEach(el => {
    el.addEventListener('click', (e) => {
      const demo = el.dataset.demo;
      const key = el.dataset.key;
      if (!demo || !key || !demoNodeData[demo]?.[key]) return;
      const data = demoNodeData[demo][key];
      const wrap = document.getElementById(demo + 'DiagramWrap');
      const card = document.getElementById(demo + 'NodeCard');
      if (!wrap || !card) return;
      card.querySelector('.node-card-title').textContent = data.title;
      card.querySelector('.node-card-body').textContent = data.body;
      wrap.style.display = 'none';
      card.style.display = 'block';
      // Update chat panel
      const chatEl = document.querySelector(`#demo-${demo} .demo-chat`);
      if (chatEl) {
        if (!chatEl._originalHTML) chatEl._originalHTML = chatEl.innerHTML;
        if (demoNodeChat[demo]?.[key]) {
          chatEl.innerHTML = buildChatHTML(demoNodeChat[demo][key]);
          animateChatMsgs(chatEl.querySelectorAll('.chat-msg'));
        }
      }
      e.stopPropagation();
    });
  });

  document.querySelectorAll('.node-card-back').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const wrap = document.getElementById(btn.dataset.target);
      const card = btn.closest('.demo-node-card');
      if (wrap && card) { card.style.display = 'none'; wrap.style.display = 'flex'; }
      // Restore original chat
      const demo = btn.closest('.demo-split')?.id?.replace('demo-', '');
      if (demo) {
        const chatEl = document.querySelector(`#demo-${demo} .demo-chat`);
        if (chatEl?._originalHTML) chatEl.innerHTML = chatEl._originalHTML;
      }
      e.stopPropagation();
    });
  });

  // ===== Demo tab switching =====
  const demoBadge = document.getElementById('demoBadge');
  const badgeText = { plato: 'Ch. 3 / 12', shoftim: 'Ch. 4 / 21' };

  document.querySelectorAll('.demo-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const demo = tab.dataset.demo;
      document.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.demo-split').forEach(d => d.style.display = 'none');
      document.getElementById('demo-' + demo).style.display = 'flex';
      if (demoBadge) demoBadge.textContent = badgeText[demo];
      animateChatMsgs(document.querySelectorAll('#demo-' + demo + ' .chat-msg'));
    });
  });

  // ===== Demo passage navigation =====
  const demoPassages = {
    plato: [
      {
        text: '"I was attached to this city by the god, as upon a great horse, somewhat sluggish because of its great size, and needing to be aroused by a sort of gadfly. And I am that gadfly which the god has given to the state, and all day long and in all places am always fastening upon you, arousing and persuading and reproaching you. And as you will not easily find another like me, I would advise you to spare me."',
        source: '— Plato, Apology · Ch. 3, §1',
        chat: [
          { type: 'tutor', tag: '🔍 Metaphor alert', text: 'Socrates compares Athens to a large, sluggish horse — and himself to the gadfly sent by god to sting it awake. This is his defense of why he never stops questioning. Without the irritation, the horse just sleeps.' },
          { type: 'user', text: 'So he sees himself as annoying on purpose?' },
          { type: 'tutor', tag: '✅ Exactly', text: 'Deliberately annoying — and divinely commissioned. He\'s not claiming to be wise; he\'s claiming to be <em>useful</em>. The city needs someone who won\'t let it drift into comfortable ignorance. Ready to read on?' },
        ]
      },
      {
        text: '"Someone will say: And are you not ashamed, Socrates, of a course of life which is likely to bring you to an untimely end? To him I may fairly answer: There you are mistaken; a man who is good for anything ought not to calculate the chance of living or dying — he ought only to consider whether in doing anything he is doing right or wrong. The unexamined life is not worth living."',
        source: '— Plato, Apology · Ch. 3, §2',
        chat: [
          { type: 'tutor', tag: '🔗 Cross-chapter connection', text: 'This is the most quoted line in all of philosophy — but context matters. Socrates says this <em>at his own trial</em>, while facing death. He\'s not giving a lecture; he\'s refusing to stop philosophizing even to save his life.' },
          { type: 'user', text: 'So is he saying questioning is a moral duty?' },
          { type: 'tutor', tag: '✅ Comprehension check', text: 'Exactly — that\'s the core of Ch. 3. Now test yourself: <strong>If questioning is a moral duty, why can\'t the jury\'s verdict stop him?</strong>' },
        ]
      },
      {
        text: '"Men of Athens, I honor and love you; but I shall obey the god rather than you, and while I have life and strength I shall never cease from the practice and teaching of philosophy, exhorting anyone whom I meet after my manner: O my friend — why do you care so much about laying up the greatest amount of money and honor and reputation, while you take so little care of wisdom and truth?"',
        source: '— Plato, Apology · Ch. 3, §3',
        chat: [
          { type: 'tutor', tag: '⚡ The climax', text: 'This is the most defiant moment in the Apology. He\'s not being reckless — he\'s making a precise hierarchy: divine command outranks civic authority. Notice he still says "I honor and love you." It\'s not rebellion; it\'s a higher loyalty.' },
          { type: 'user', text: 'Can any authority override a moral duty?' },
          { type: 'tutor', tag: '🎓 Deep question', text: 'That\'s exactly what Socrates is testing. His answer: no. This passage is the seed of every civil disobedience argument in history — from Thoreau to Gandhi. One more passage to go.' },
        ]
      },
      {
        text: '"The difficulty, my friends, is not to avoid death, but to avoid unrighteousness — for that runs faster than death. I am old and move slowly, and the slower runner has overtaken me; my accusers are keen and quick, and the faster runner, wickedness, has overtaken them. And now I depart, condemned by you to death; they too go their ways, condemned by truth to wickedness and wrong."',
        source: '— Plato, Apology · Ch. 3, §4',
        chat: [
          { type: 'tutor', tag: '🎯 The closing argument', text: 'Socrates flips the framing completely. The jury thinks they\'ve won by sentencing him to death. He says: you\'ve given me the slower punishment. The faster one — moral corruption — you\'ve kept for yourselves.' },
          { type: 'user', text: 'Is he saying they\'re the real losers here?' },
          { type: 'tutor', tag: '✅ Ch. 3 complete!', text: 'Precisely. And he says it without bitterness. You\'ve now finished Ch. 3. You\'ve mastered: the gadfly metaphor, the examined life, the hierarchy of duty, and the final inversion. Ch. 4 is the jury vote — 280 to 220. Let\'s go.' },
        ]
      }
    ],
    shoftim: [
      {
        text: '"And the children of Israel again did evil in the sight of the LORD, when Ehud was dead. And the LORD sold them into the hand of Jabin king of Canaan, that reigned in Hazor; the captain of whose host was Sisera, which dwelt in Harosheth of the Gentiles. And the children of Israel cried unto the LORD: for he had nine hundred chariots of iron; and mightily he oppressed the children of Israel twenty years."',
        source: '— Shoftim 4:1–3 · Ch. 4, §1',
        chat: [
          { type: 'tutor', tag: '🔄 The cycle again', text: 'Notice the formula: sin → oppression → cry to God. You\'ve seen this twice already — with Othniel and Ehud. Shoftim is building a deliberate <strong>pattern</strong>. What do you think the text is saying about human nature?' },
          { type: 'user', text: 'That people forget lessons quickly?' },
          { type: 'tutor', tag: '✅ Exactly', text: 'Yes — and the text doesn\'t judge harshly. It just shows the cycle, relentlessly. This chapter introduces someone different though. Read on to meet her.' },
        ]
      },
      {
        text: '"And Deborah, a prophetess, the wife of Lapidoth, she judged Israel at that time. And she dwelt under the palm tree of Deborah between Ramah and Beth-el in mount Ephraim: and the children of Israel came up to her for judgment. And she sent and called Barak the son of Abinoam, and said unto him: Hath not the LORD God of Israel commanded? Go up to mount Tabor with ten thousand men."',
        source: '— Shoftim 4:4–6 · Ch. 4, §2',
        chat: [
          { type: 'tutor', tag: '👁 Pay attention to detail', text: 'Three roles in one verse: prophetess, wife, judge. She\'s the only judge in Shoftim introduced with all three. The text also gives her a <em>specific location</em> — the palm tree. Why do you think that detail matters?' },
          { type: 'user', text: 'It makes her authority feel real, grounded?' },
          { type: 'tutor', tag: '🎓 Exactly', text: 'Her court is public, fixed, accessible — she doesn\'t rule from a palace. The palm tree is almost like an open courthouse. This is deliberate: her authority is transparent and rooted in the community.' },
        ]
      },
      {
        text: '"And Deborah said unto Barak: Up; for this is the day in which the LORD hath delivered Sisera into thine hand — is not the LORD gone out before thee? So Barak went down from mount Tabor, and ten thousand men after him. And the LORD discomfited Sisera, and all his chariots, and all his host, with the edge of the sword before Barak; so that Sisera lighted down off his chariot, and fled away on his feet."',
        source: '— Shoftim 4:14–15 · Ch. 4, §3',
        chat: [
          { type: 'tutor', tag: '⚔️ The battle begins', text: 'Notice who gives the order. Barak has 10,000 men and is the general — but he waits for Deborah\'s word. The grammar is important: <em>she</em> declares the moment. <em>He</em> executes it. How does that split of roles feel to you?' },
          { type: 'user', text: 'Like she\'s the real commander and he\'s the instrument?' },
          { type: 'tutor', tag: '✅ Strong reading', text: 'Exactly the tension the text is setting up. The battle itself is almost described in passing — God sends rain, the river floods, Sisera\'s iron chariots become useless in the mud. The real drama is about to happen elsewhere.' },
        ]
      },
      {
        text: '"Then Yael went out to meet Sisera and said: Turn in, my lord, turn in to me; fear not. And when he had turned in unto her into the tent, she covered him with a mantle. And he said: Give me, I pray thee, a little water to drink; for I am thirsty. And she opened a bottle of milk, and gave him drink, and covered him. And he said: Stand in the door of the tent, and it shall be, when any man doth come and enquire of thee, say, Is there any man here? that thou shalt say, No. Then Jael took a tent peg and a hammer in her hand… and he died."',
        source: '— Shoftim 4:18–21 · Ch. 4, §4',
        chat: [
          { type: 'tutor', tag: '🔗 Prophecy fulfilled', text: 'This is the payoff of Deborah\'s warning in 4:9 — "glory will go to a woman." Yael\'s power comes from hospitality law: Sisera trusts her because Kenites had peace with Jabin. He walks into her tent thinking he\'s safe.' },
          { type: 'user', text: 'Why did Sisera trust her if she wasn\'t Israelite?' },
          { type: 'tutor', tag: '✅ Ch. 4 complete!', text: 'Exactly — neutrality was his fatal assumption. Yael chose a side. The chapter ends with the most unlikely hero: not the general, not the judge, but a woman in a tent. You\'ve finished Ch. 4. Ch. 5 is the Song of Deborah — one of the oldest poems in the Tanach.' },
        ]
      }
    ]
  };

  const demoPassageIdx = { plato: 0, shoftim: 0 };

  const appendChatMsg = (chatEl, html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    const msg = div.firstElementChild;
    msg.style.opacity = '0';
    msg.style.transform = 'translateY(8px)';
    msg.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    chatEl.appendChild(msg);
    chatEl.scrollTop = chatEl.scrollHeight;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      msg.style.opacity = '1';
      msg.style.transform = 'translateY(0)';
      chatEl.scrollTop = chatEl.scrollHeight;
    }));
  };

  const loadPassage = (demo, idx) => {
    const passages = demoPassages[demo];
    if (!passages) return;
    const p = passages[idx];
    const passageEl = document.getElementById(demo + 'Passage');
    const sourceEl = document.getElementById(demo + 'Source');
    const counterEl = document.getElementById(demo + 'Counter');
    const chatEl = document.getElementById(demo + 'Chat');
    if (passageEl) passageEl.textContent = p.text;
    if (sourceEl) sourceEl.textContent = p.source;
    if (counterEl) counterEl.textContent = `§ ${idx + 1} of ${passages.length}`;
    if (chatEl) {
      chatEl.innerHTML = buildChatHTML(p.chat);
      animateChatMsgs(chatEl.querySelectorAll('.chat-msg'));
      chatEl.scrollTop = 0;
    }
    // Update prev/next button states
    document.querySelectorAll(`.passage-prev[data-demo="${demo}"]`).forEach(b => b.disabled = idx === 0);
    document.querySelectorAll(`.passage-next[data-demo="${demo}"]`).forEach(b => b.disabled = idx === passages.length - 1);
  };

  document.querySelectorAll('.passage-next, .passage-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const demo = btn.dataset.demo;
      const dir = btn.classList.contains('passage-next') ? 1 : -1;
      const passages = demoPassages[demo];
      const newIdx = Math.max(0, Math.min(passages.length - 1, demoPassageIdx[demo] + dir));
      if (newIdx === demoPassageIdx[demo]) return;
      demoPassageIdx[demo] = newIdx;
      loadPassage(demo, newIdx);
    });
  });

  // Init disabled state on first load
  ['plato', 'shoftim'].forEach(demo => loadPassage(demo, 0));

  // ===== Counter animation for stats =====
  const animateValue = (element, start, end, duration, suffix = '') => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.floor(eased * (end - start) + start) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // ===== Parallax for floating books =====
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    document.querySelectorAll('.floating-book').forEach((book, i) => {
      const speed = 0.03 + i * 0.015;
      book.style.transform = `translateY(${scrollY * speed}px) rotate(${-15 + i * 12}deg)`;
    });
  }, { passive: true });

});
