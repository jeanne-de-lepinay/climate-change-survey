// ═══════════════════════════════════════════════════════════════════════════
// i18n.js — Translation layer (EN / DE / ZH / FR)
//
// HOW IT WORKS
//   • Every user-visible string lives in the T dictionary below, keyed by an id.
//   • Static HTML carries data-i18n="key" (textContent) or data-i18n-html="key".
//   • app.js and cluster.js call t('key') or t('key', {vars}) at render time.
//   • setLang('de') re-applies static text and re-renders every chart.
//
// TO ADD A STRING: add the key to all four language blocks.
// TO ADD A LANGUAGE: copy a block, change the code, add a flag in index.html.
//
// data.js IS NOT TRANSLATED. Values coming from data.js (regions, genders,
// nationalities, cruise names, dates, languages) are mapped through the MAPS
// section at the bottom of this file. Anything not found there falls back to
// the raw English string from data.js, so nothing ever renders blank.
// ═══════════════════════════════════════════════════════════════════════════

window.LANGS = [
  { code: 'en', label: 'EN', name: 'English',  flag: '<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" class="flag-svg"><clipPath id="fl-gb-a"><rect width="60" height="40"/></clipPath><clipPath id="fl-gb-b"><path d="M30,20 h30 v20 z v20 h-30 z h-30 v-20 z v-20 h30 z"/></clipPath><g clip-path="url(#fl-gb-a)"><rect width="60" height="40" fill="#012169"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#FFF" stroke-width="8"/><path d="M0,0 L60,40 M60,0 L0,40" clip-path="url(#fl-gb-b)" stroke="#C8102E" stroke-width="5"/><path d="M30,0 V40 M0,20 H60" stroke="#FFF" stroke-width="13"/><path d="M30,0 V40 M0,20 H60" stroke="#C8102E" stroke-width="8"/></g></svg>' },
  { code: 'de', label: 'DE', name: 'Deutsch',  flag: '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" class="flag-svg"><rect width="30" height="20" fill="#FFCE00"/><rect width="30" height="13.33" fill="#DD0000"/><rect width="30" height="6.67" fill="#000000"/></svg>' },
  { code: 'zh', label: 'ZH', name: '中文',      flag: '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" class="flag-svg"><rect width="30" height="20" fill="#EE1C25"/><g fill="#FFDE00"><polygon points="5.00,2.00 5.67,4.07 7.85,4.07 6.09,5.35 6.76,7.43 5.00,6.15 3.24,7.43 3.91,5.35 2.15,4.07 4.33,4.07"/><polygon points="10.00,1.00 10.22,1.69 10.95,1.69 10.36,2.12 10.59,2.81 10.00,2.38 9.41,2.81 9.64,2.12 9.05,1.69 9.78,1.69" transform="rotate(239.0 10 2)"/><polygon points="12.00,3.00 12.22,3.69 12.95,3.69 12.36,4.12 12.59,4.81 12.00,4.38 11.41,4.81 11.64,4.12 11.05,3.69 11.78,3.69" transform="rotate(261.9 12 4)"/><polygon points="12.00,6.00 12.22,6.69 12.95,6.69 12.36,7.12 12.59,7.81 12.00,7.38 11.41,7.81 11.64,7.12 11.05,6.69 11.78,6.69" transform="rotate(-74.1 12 7)"/><polygon points="10.00,8.00 10.22,8.69 10.95,8.69 10.36,9.12 10.59,9.81 10.00,9.38 9.41,9.81 9.64,9.12 9.05,8.69 9.78,8.69" transform="rotate(-51.3 10 9)"/></g></svg>' },
  { code: 'fr', label: 'FR', name: 'Français', flag: '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" class="flag-svg"><rect width="30" height="20" fill="#FFFFFF"/><rect width="10" height="20" fill="#002395"/><rect x="20" width="10" height="20" fill="#ED2939"/></svg>' },
];

var T = {};

// ═══════════════════════════════════════════════════════════════════════════
// ENGLISH
// ═══════════════════════════════════════════════════════════════════════════
T.en = {
  // ── Page chrome ──────────────────────────────────────────────────────────
  'meta.title': 'How do you feel about climate change? · HX Expedition Survey',
  'hdr.eyebrow': 'Polar Expedition Survey',
  'nav.survey': 'Survey results',
  'nav.profiles': 'Respondent profiles',
  'hdr.h1': 'How do you feel about <em>climate change?</em>',
  'hdr.intro': 'This survey is conducted on HX expedition vessels to Antarctica &amp; Arctic regions. It is an ongoing study on our ships\' microcosm and will continue to evolve as more answers are added to the database. Results below represent the answers of guests who chose to participate — a self-selected group with an interest in science, nature, and polar environments.',
  'hdr.method': 'Methodology — Surveys were distributed as paper forms and via QR code (online version) and transcribed by a single analyst (<a href="https://jeanne-de-lepinay.github.io/en/" target="_blank" rel="noopener" class="author-link">Jeanne de Lépinay</a>). Where a respondent ticked two answers to a single-choice question, each was counted as 0.5. Unmarked scale items were excluded from that question\'s denominator. Participation bias, language barriers, question phrasing and single-analyst transcription may influence results.',
  'btn.demographics': 'Respondent demographics',
  'btn.cruises': 'Cruises included in this dataset',

  'meta.respondents': 'Respondents',
  'meta.questions': 'Questions',
  'meta.questions_val': 'Q1 – Q11',
  'meta.languages': 'Available languages',
  'meta.nationalities': 'Nationalities',
  'meta.meanage': 'Mean age',
  'meta.countries': '{n}+ countries',
  'meta.years': '{n} years',

  'glance.label': 'At a glance',
  'warn.small': '<strong>Small sample size (n={n})</strong> — Results for a single cruise should be interpreted with caution. Percentages may shift significantly as more respondents are added.',

  // ── Methodology accordion ────────────────────────────────────────────────
  'meth.summary': 'Statistical methodology &amp; caveats',
  'meth.sample_h': 'Sample',
  'meth.sample_p': 'Self-selected convenience sample of HX expedition guests who chose to complete the survey. Not representative of the general public. Participation bias likely skews toward higher environmental concern.',
  'meth.scale_h': 'Scale questions (Q4, Q6–Q10)',
  'meth.scale_p': 'Distributions reported as raw counts, mean (μ), median, standard deviation (σ), and mode. For Q8–Q10, a fitted normal curve is shown alongside observed bars for reference — these are not a modelling claim, only a visual aid for assessing skew.',
  'meth.cluster_h': 'Cluster analysis',
  'meth.cluster_p': 'k-means clustering (k=4, 100 random initialisations, scikit-learn defaults) applied to <span id="method-n"></span> respondents with complete responses across Q1–Q10 (Q11 excluded). Variables were standardised (z-score) before clustering. Four clusters selected by visual inspection of inertia elbow and silhouette scores. Cluster centres projected onto PCA space (2D) for visualisation.',
  'meth.frac_h': 'Fractional counts',
  'meth.frac_p': 'Where a respondent ticked two options for a single-choice question, each was assigned a weight of 0.5. This produces fractional totals (e.g. 248.0) which are displayed as-is rather than rounded to avoid introducing error.',

  // ── Section dividers ─────────────────────────────────────────────────────
  'div.q123': 'Views &amp; Reactions — Q1 · Q2 · Q3',
  'div.q45': 'Behaviour &amp; Attitudes Towards Travel — Q4 · Q5',
  'div.q67': 'Societal Views &amp; Personal Willingness — Q6 · Q7',
  'div.q8910': 'Worry Scales — Q8 · Q9 · Q10',
  'div.q11': 'Q11 · Open Comments — Thematic Categories',

  // ── Q1 ───────────────────────────────────────────────────────────────────
  'q1.tag': 'Q1 — Key finding',
  'q1.title': 'Which statement comes closest to your view about climate change?',
  'q1.mostcommon': 'Most common response',
  'q1.bigdesc': 'consider climate change a <strong style="color:var(--ink)">serious problem caused by humans</strong> — the single most selected response by a wide margin.',
  'q1.interp': 'Only {denyN} respondents ({denyPct}%) outright deny or minimise climate change ("overstated" or "not happening"). A further {uncertPct}% — {uncertN} respondents — acknowledge climate change as real but express uncertainty about its human causes or scale. The remaining {topPct}% are unambiguous: a serious, human-caused problem.',
  'q1.l0': 'Serious human-caused problem',
  'q1.l1': 'Real but causes/impacts uncertain',
  'q1.l2': 'Happening regardless of humans',
  'q1.l3': 'Overstated',
  'q1.l4': 'Not happening',

  // ── IPCC block ───────────────────────────────────────────────────────────
  'ipcc.eyebrow': 'Further reading',
  'ipcc.head': 'Want to explore the science behind these questions?',
  'ipcc.body': 'The <strong style="color:var(--ink);">IPCC</strong> — Intergovernmental Panel on Climate Change — is the United Nations body that synthesises peer-reviewed published climate science from thousands of independent researchers worldwide — assessing evidence, not advocating policy. Its conclusions account for the full span of Earth\'s climate history, including periods several millions of years ago when the planet was warmer, and for every known natural driver of variability: solar cycles, volcanic activity, orbital shifts. All have been scientifically measured and modelled and all data and methodologies are publicly available.',
  'ipcc.ar6': 'The <strong style="color:var(--ink);">Sixth Assessment Report (AR6)</strong>, published 2021–2023, is their most recent.',
  'ipcc.faq': 'Do you have questions about how scientists reached these conclusions? The IPCC publishes a dedicated FAQ alongside every report — a good place to start if you want to do your own research scientifically.',
  'ipcc.btn1': 'Visit the IPCC website',
  'ipcc.btn2': 'Read the AR6 FAQ',
  'ipcc.btn2sub': 'PDF · common questions',
  'ipcc.btn3': 'Read the AR6 Summary',
  'ipcc.btn3sub': 'PDF · for policymakers',

  // ── Q2 – Q7 ──────────────────────────────────────────────────────────────
  'q2.title': 'When you hear about climate change, what best describes your reaction?',
  'q3.title': 'Which statement best matches your outlook on climate change?',
  'q4.title': 'How often do you intentionally avoid climate-related information?',
  'q5.title': 'When you think about the climate impacts of travel and tourism, which best describes how you feel?',
  'q6.title': 'How likely do you think large-scale societal changes to address climate change are, given the current social and political realities?',
  'q7.title': 'If such large-scale changes were required, how willing would you personally be to make major changes to your way of life?',

  'q2.l0': 'Concerned but hopeful',
  'q2.l1': 'Concerned but overwhelmed',
  'q2.l2': 'Hopeless / nothing\ncan be done',
  'q2.l3': 'Skeptical / annoyed',
  'q2.l4': 'Positive / not too\nconcerned',
  'q2.l5': 'Neutral / Detached',

  'q3.l0': 'Tech solutions',
  'q3.l1': 'Action reduces harm',
  'q3.l2': 'Some damage\nunavoidable',
  'q3.l3': 'Already\ntoo late',
  'q3.l4': 'Humans cannot\naffect it',
  'q3.l5': 'Unsure',

  'q4.l0': '1 – Never',
  'q4.l4': '5 – Always',
  'q6.l0': '1 – Very unlikely',
  'q6.l4': '5 – Very likely',
  'q7.l0': '1 – Very unwilling',
  'q7.l4': '5 – Very willing',

  'q5.s0': 'Concerned\n& reflective',
  'q5.s1': 'Concerned but\nseparate',
  'q5.s2': 'Uncomfortable /\navoid',
  'q5.s3': 'Neutral /\ndetached',
  'q5.s4': 'Skeptical /\nirritated',
  'q5.s5': 'No particular\nfeeling',
  'q5.s6': 'Never thought\nabout it',
  'q5.f0': 'Concerned & reflective',
  'q5.f1': 'Concerned but separate from my choices',
  'q5.f2': 'Uncomfortable / I avoid the subject',
  'q5.f3': 'Neutral / detached',
  'q5.f4': 'Skeptical / irritated',
  'q5.f5': 'No particular feeling',
  'q5.f6': 'Never thought about it',

  // ── Card notes ───────────────────────────────────────────────────────────
  'note.single': 'Single choice · {n} respondents',
  'note.q4scale': 'Scale: 1 = Never → 5 = Always · {n} respondents',
  'note.q6scale': 'Scale: 1 = Very unlikely → 5 = Very likely · {n} respondents',
  'note.q7scale': 'Scale: 1 = Very unwilling → 5 = Very willing · {n} respondents',
  'note.worryscale': 'Scale: 1 = Not at all worried → 10 = Extremely worried · {n} respondents',

  // ── Q8 / Q9 / Q10 ────────────────────────────────────────────────────────
  'q8.title': 'How worried are <span style="font-style:italic;color:var(--teal)">you personally</span> about climate change?',
  'q9.title': 'How worried do you think the <span style="font-style:italic;color:var(--blue)">general public</span> is about climate change?',
  'q10.title': 'How worried do you think <span style="font-style:italic;color:var(--amber)">fellow guests onboard</span> are about climate change?',
  'strip.mean': 'Mean',
  'strip.median': 'Median',
  'strip.sd': 'Std Dev',
  'strip.mode': 'Mode',
  'strip.shape': 'Shape',
  'shape.q8': 'High-end',
  'shape.q9': 'Balanced',
  'shape.q10': 'High-leaning',
  'q8.note': '<strong>Responses cluster strongly at the high end.</strong> {pct}% scored 9 or 10, and the tail extends far to the left — very few respondents reported low concern. The fitted curve shows how far this distribution departs from a symmetric bell shape, reflecting the intense personal concern of those who chose to travel to polar regions.',
  'q9.note': '<strong>The most balanced distribution of the three.</strong> Responses spread relatively evenly around the middle — mean and median both around {mean} — with no strong pull toward either end. Respondents perceive the general public as considerably less concerned than themselves: a gap of {gap} points on average.',
  'q10.note': '<strong>Responses lean toward the higher end,</strong> peaking at {mode} with a longer tail toward lower scores. Fellow guests are rated as more climate-aware than the general public (+{gapGP} points on average), yet still {gapSG} points below respondents\' own worry level.',

  // ── Combined overlap chart ───────────────────────────────────────────────
  'comb.tag': 'Q8 · Q9 · Q10 — Combined View',
  'comb.title': 'The worry gap: self vs. fellow guests vs. general public',
  'comb.note': 'All three distributions plotted as smoothed frequency curves on the same axis (% of respondents) · hover for values',
  'overlap.ds8': 'Q8 – Personal worry (μ = {m})',
  'overlap.ds10': 'Q10 – Fellow guests (μ = {m})',
  'overlap.ds9': 'Q9 – General public (μ = {m})',
  'overlap.note': 'A clear <strong>worry gap</strong> emerges across the three groups. Personal concern (teal) clusters heavily at the high end (μ = {q8m}). Perceived public concern (blue) sits {gapSP} points lower (μ = {q9m}) and is the most symmetrical distribution. Perceived guest concern (amber) falls in between (μ = {q10m}) — respondents see their fellow travellers as more climate-aware than the average person (+{gapGP} points), but not as intensely concerned as themselves (−{gapSG} points). This three-tier structure remains consistent across all {n} respondents{scope}.',
  'overlap.scope_cruise': ' in this cruise',

  // ── Chart furniture ──────────────────────────────────────────────────────
  'chart.observed': 'Observed responses',
  'chart.normal': 'Fitted normal curve',
  'chart.obs_tt': ' Observed: {v} ({p}%)',
  'chart.norm_tt': ' Normal curve: {v}',
  'chart.resp_tt': ' {v} respondents ({p}%)',
  'chart.val_tt': ' {v} ({p}%)',
  'axis.n_resp': 'Number of respondents',
  'axis.worry': '← Not at all worried                                                          Extremely worried →',
  'axis.pct_resp': '% of respondents',
  'overlap.tt': ' {name}: {p}% of respondents',

  // ── Q11 ──────────────────────────────────────────────────────────────────
  'q11.title': 'What themes emerge from the open comments?',
  'q11.note': '{sub} substantive comments · {blank} respondents left blank · some comments span multiple categories · full dataset only',
  'q11.axis': 'Number of comments ({sub} total · some span multiple categories · full dataset only)',
  'q11.tt': ' {n} comments mention this theme',
  'q11.tt_one': ' {n} comment mentions this theme',
  'q11.c0': 'Political inaction & need for government/corporate leadership',
  'q11.c1': 'Need for education, science literacy & awareness',
  'q11.c2': 'Individual responsibility, personal action & lifestyle choices',
  'q11.c3': 'Skepticism or uncertainty — natural cycle, not (only) human-caused',
  'q11.c4': 'Climate change is real & urgent — we must act now',
  'q11.c5': 'Concern for future generations',
  'q11.c6': 'Personal conflict — travel, hypocrisy & the limits of individual impact',
  'q11.c7': 'Doubts about green tech & unintended consequences (EVs, batteries, AI)',

  // ── At a glance ──────────────────────────────────────────────────────────
  'glance.d0': 'believe climate change is a serious human-caused problem',
  'glance.d1': 'feel "concerned but hopeful" when hearing about climate change',
  'glance.d2': 'see some damage as unavoidable but still believe meaningful action matters (Q3)',
  'glance.d3': 'average personal worry score out of 10 — vs {q9m} perceived for the general public',
  'glance.d4': 'are willing or very willing to make major lifestyle changes (Q7 scores 4–5)',

  // ── Demographics dropdown ────────────────────────────────────────────────
  'demo.title': 'Respondent demographics · n = {n}',
  'demo.vs': 'vs. all guests (n={n})',
  'demo.gender': 'Gender',
  'demo.female': 'Female',
  'demo.male': 'Male',
  'demo.notstated': 'Not stated',
  'demo.agegroup': 'Age group ({year})',
  'demo.region': 'Region of origin',
  'demo.leg_survey': 'Survey respondents',
  'demo.leg_guests': 'All guests aboard',
  'demo.survey': 'Survey',
  'demo.guests': 'Guests',

  // ── Cruise filter popup ──────────────────────────────────────────────────
  'cruise.poptitle': 'Cruises in this dataset',
  'cruise.showall': 'Show all results',
  'cruise.ongoing': '(ongoing)',

  // ── Representativeness accordion ─────────────────────────────────────────
  'repr.summary': 'Representativeness',
  'repr.p': '{survN} of {vpN} guests completed the survey — a <strong>{rate}% participation rate</strong>. Survey respondents are on average <strong>{ageTxt}</strong> (μ = {survAge} vs. {vpAge} in the manifest). On gender, {gTxt} ({fPct}% female in survey vs. {vpFPct}% aboard).',
  'repr.age_same': 'identical to all guests',
  'repr.age_older': '{n} years older than all guests aboard',
  'repr.age_older_one': '1 year older than all guests aboard',
  'repr.age_younger': '{n} years younger than all guests aboard',
  'repr.age_younger_one': '1 year younger than all guests aboard',
  'repr.gender_match': 'closely matches the full manifest',
  'repr.gender_over': 'women are {n}pp over-represented vs. all guests',
  'repr.gender_under': 'women are {n}pp under-represented vs. all guests',
  'repr.bars': 'Survey <strong>{s}%</strong> · Guests <strong>{g}%</strong>',
  'repr.delta_note': 'Δ = survey % minus manifest %. Positive = over-represented in survey.',

  // ── Cluster teaser ───────────────────────────────────────────────────────
  'teaser.label': 'Going deeper',
  'teaser.title': 'Four respondent profiles emerge from the data',
  'teaser.info_title': 'How these profiles were built',
  'teaser.info_p1': 'A <strong>k-means clustering</strong> (k=4, 100 initialisations) was applied to all respondents with complete data across 8 variables: climate view, emotional reaction, outlook on action, societal change realism, willingness to act, personal worry, perceived public worry, and perceived guest worry.',
  'teaser.info_p2': 'Profiles are not pre-defined archetypes — they emerged from the data. Together they explain <strong><span data-pc="total"></span>% of total variance</strong> (PC1: <span data-pc="1"></span>%, PC2: <span data-pc="2"></span>%).',
  'teaser.info_box': '<strong style="color:var(--ink);">What does "% serious believers" mean?</strong><br>Q1 asked respondents to choose the statement that best matched their view. Respondents who selected <em>"Climate change is a serious human-caused problem"</em> are counted as "serious believers." A profile showing <strong>0%</strong> means none of its members chose that answer.',
  'teaser.intro': 'A cluster analysis is a statistical method that groups respondents based on the similarity of their answers across all survey questions — without any prior assumptions about what those groups should look like. The algorithm identifies four natural profiles by finding patterns that minimise the difference within each group and maximise it between groups. Profiles are not mutually exclusive types: they represent regions of a continuous landscape. The clearest finding: the largest group (n={n0}) are high-belief, high-worry {p0}s — the dividing line between them and the {p1}s (n={n1}) is not belief intensity, but whether they still see collective change as possible.',
  'teaser.btn': 'Explore respondent profiles',
  'teaser.worry': 'Personal worry',
  'teaser.willing': 'Willingness to act',

  // ── Cluster profiles ─────────────────────────────────────────────────────
  'prof.0.name': 'Committed Believer',
  'prof.0.tagline': 'Alarmed, hopeful, and ready to act',
  'prof.0.drive': 'Their conviction and hope coexist — they have accepted the science and found a way to remain motivated rather than paralysed. They worry intensely, stay informed, and feel a genuine sense of personal agency.',
  'prof.0.resonates': 'Takes their concern seriously without preaching. Concrete actions, measurable commitments, and honest acknowledgement of the travel tension.',
  'prof.1.name': 'Strained Believer',
  'prof.1.tagline': 'Fully convinced — but emotionally exhausted',
  'prof.1.drive': 'Their conviction is as strong as any other profile, but it has become a weight. The perceived gap between their own alarm and the world around them is self-reinforcing and draining.',
  'prof.1.resonates': 'Solidarity before strategy. Show them others share their concern. Bounded, achievable actions matter most — not grand-scale calls.',
  'prof.2.name': 'Uncertain Moderate',
  'prof.2.tagline': 'Engaged and willing — but not fully convinced',
  'prof.2.drive': 'Epistemically careful, not disengaged. Their uncertainty about causation is genuine and coexists with real personal concern.',
  'prof.2.resonates': 'Epistemic openness paired with a clear action rationale. Avoid claiming more certainty than they have reached.',
  'prof.3.name': 'Disengaged Skeptic',
  'prof.3.tagline': 'Unconvinced, unmoved, and not seeking engagement',
  'prof.3.drive': 'A settled alternative worldview — climate is natural and cyclical. They are aware they are in the minority onboard but remain unswayed.',
  'prof.3.resonates': 'Direct persuasion is unlikely to land. Nature and biodiversity are entry points that work on their own terms.',
  'prof.serious_high': '{p}% serious believers',
  'prof.serious_mid': '{p}% partial believers',
  'prof.serious_low': '{p}% consider climate change serious',
  'prof.serious_none': 'No respondents selected "serious human-caused problem"',
  'prof.desc': '{serious} · Worry {worry}/10 · Willingness {willing}/5 · n={n}',

  // ── Conclusions ──────────────────────────────────────────────────────────
  'concl.label': 'Key findings',
  'concl.title': 'What this survey tells us',
  'concl.note': 'Conclusions are drawn from the complete dataset across all cruises.',
  'concl.t1': 'Strong consensus — but not uniformity',
  'concl.t2': 'The defining split: hope vs. exhaustion',
  'concl.t3': 'The worry gap — a consistent three-tier structure',
  'concl.p1': 'With <strong>{n}</strong> respondents across <strong>{nc} {cruiseWord}</strong>, <strong>{pctSerious}%</strong> see climate change as a serious human-caused problem and personal worry averages <strong>{q8m}/10</strong>. The cluster analysis reveals the largest group (n={c0n}, {c0pct}%) are <em>{p0}</em> — highly alarmed, hopeful and willing to act. A smaller but intense group (n={c1n} <em>{p1}</em>) shares equally high worry but skews overwhelmed or hopeless. The line between them is not about belief — it is about whether they still see change as possible.',
  'concl.p2': 'Both the <em>{p0}</em> (n={c0n}) and <em>{p1}</em> (n={c1n}) profiles score above 8/10 on personal worry and include over 85% serious believers. What separates them is outlook: {p0}s remain hopeful and willing to act (Q7 mean: {c0q7}/5), while {p1}s skew overwhelmed, hopeless or skeptical (Q7 mean: {c1q7}/5). The <em>{p2}</em> group (n={c2n}) spans those uncertain about human causes alongside partial believers — still registering substantial personal worry ({c2q8}/10) and openness to action, a nuanced position that resists simple "denier" framing.',
  'concl.p3': 'Respondents place their own personal concern at <strong>{q8m}/10</strong> — <strong>{gapSP}</strong> points above where they rate the general public ({q9m}/10). Fellow guests are seen as more aware than the public (+{gapGP} points, {q10m}/10), but still {gapSG} points below respondents\' own alarm. This three-tier structure is consistent across all {nc} {cruiseWord} and all {n} respondents.',
  'concl.p3_theme': ' {theme} is the top theme in open comments ({count} mentions), with respondents highlighting the gap between personal alarm and collective response.',
  'word.cruise_one': 'cruise',
  'word.cruise_many': 'cruises',

  // ── Cluster overlay ──────────────────────────────────────────────────────
  'cl.back': 'Back to survey',
  'cl.profiles': 'Profiles',
  'cl.axes': 'Axes (PCA)',
  'cl.axis_note': '<strong style="color:#aaa">→ Horizontal (PC1, <span data-pc="1"></span>%)</strong><br>Driven mainly by <em>climate view (Q1)</em>, personal worry (Q8), outlook (Q3), and societal hope (Q6). Right = strong belief + high personal concern.<br><br><strong style="color:#aaa">↑ Vertical (PC2, <span data-pc="2"></span>%)</strong><br>Driven by <em>societal and guest worry (Q9/Q10)</em>. Up = higher outward-facing concern.<br><br>Together these two axes explain <strong style="color:#aaa"><span data-pc="total"></span>%</strong> of variance in the data.',
  'cl.highlight': 'Highlight',
  'cl.showall': 'Show all',
  'cl.f_cruise': 'Cruise',
  'cl.f_gender': 'Gender',
  'cl.f_female': 'Female respondents',
  'cl.f_male': 'Male respondents',
  'cl.f_age': 'Age',
  'cl.f_under50': 'Under 50',
  'cl.f_60plus': '60+',
  'cl.f_region': 'Region',
  'region.anz': 'Australia & NZ',
  'region.europe': 'Continental Europe',
  'region.na': 'North America',
  'region.uk': 'UK & Ireland',
  'region.china': 'China',
  'region.asia': 'Asia & Middle East',
  'cl.axis_x': '→ Worry + Belief',
  'cl.axis_y': '↑ Concern for others',
  'cl.tt_nat': 'Nationality',
  'cl.tt_age': 'Age',
  'cl.tt_gender': 'Gender',
  'cl.tt_q8': 'Q8 Personal worry',
  'cl.tt_q7': 'Q7 Willingness',
  'cl.respondents': '{n} respondents',
  'cl.drives': 'What drives them',

  // ── Footer ───────────────────────────────────────────────────────────────
  'footer.text': 'Survey: "How do you feel about climate change?" · {n} respondents across {nc} {cruiseWord} · Paper & online surveys in {langs} · HX Expeditions · Study conducted by <a href="https://jeanne-de-lepinay.github.io/en/" target="_blank" rel="noopener" class="author-link">Jeanne de Lépinay</a>',
};

// ═══════════════════════════════════════════════════════════════════════════
// GERMAN
// ═══════════════════════════════════════════════════════════════════════════
T.de = {
  'meta.title': 'Wie denken Sie über den Klimawandel? · HX Expeditions-Umfrage',
  'hdr.eyebrow': 'Polarexpeditions-Umfrage',
  'nav.survey': 'Umfrageergebnisse',
  'nav.profiles': 'Teilnehmerprofile',
  'hdr.h1': 'Wie denken Sie über den <em>Klimawandel?</em>',
  'hdr.intro': 'Diese Umfrage wird an Bord der HX-Expeditionsschiffe in der Antarktis &amp; der Arktis durchgeführt. Sie ist eine laufende Studie über den Mikrokosmos unserer Schiffe und wird sich weiterentwickeln, sobald weitere Antworten in die Datenbank aufgenommen werden. Die folgenden Ergebnisse geben die Antworten jener Gäste wieder, die freiwillig teilgenommen haben — eine selbstgewählte Gruppe mit Interesse an Wissenschaft, Natur und Polarregionen.',
  'hdr.method': 'Methodik — Die Fragebögen wurden in Papierform und per QR-Code (Online-Version) verteilt und von einer einzigen Person ausgewertet (<a href="https://jeanne-de-lepinay.github.io/en/" target="_blank" rel="noopener" class="author-link">Jeanne de Lépinay</a>). Wenn Teilnehmende bei einer Einfachauswahl zwei Antworten ankreuzten, wurde jede mit 0,5 gewertet. Nicht ausgefüllte Skalenfragen wurden aus dem Nenner der jeweiligen Frage ausgeschlossen. Teilnahmeverzerrung, Sprachbarrieren, Fragenformulierung und die Übertragung durch eine einzelne Person können die Ergebnisse beeinflussen.',
  'btn.demographics': 'Demografie der Teilnehmenden',
  'btn.cruises': 'In diesem Datensatz enthaltene Reisen',

  'meta.respondents': 'Teilnehmende',
  'meta.questions': 'Fragen',
  'meta.questions_val': 'F1 – F11',
  'meta.languages': 'Verfügbare Sprachen',
  'meta.nationalities': 'Nationalitäten',
  'meta.meanage': 'Durchschnittsalter',
  'meta.countries': '{n}+ Länder',
  'meta.years': '{n} Jahre',

  'glance.label': 'Auf einen Blick',
  'warn.small': '<strong>Kleine Stichprobe (n={n})</strong> — Ergebnisse einer einzelnen Reise sollten mit Vorsicht interpretiert werden. Die Prozentwerte können sich deutlich verschieben, wenn weitere Teilnehmende hinzukommen.',

  'meth.summary': 'Statistische Methodik &amp; Einschränkungen',
  'meth.sample_h': 'Stichprobe',
  'meth.sample_p': 'Selbstgewählte Gelegenheitsstichprobe von HX-Expeditionsgästen, die den Fragebogen freiwillig ausgefüllt haben. Sie ist nicht repräsentativ für die Allgemeinbevölkerung: Die Teilnahmeverzerrung dürfte zu einer überdurchschnittlich hohen Umweltbesorgnis führen.',
  'meth.scale_h': 'Skalenfragen (F4, F6–F10)',
  'meth.scale_p': 'Die Verteilungen werden als absolute Häufigkeiten, Mittelwert (μ), Median, Standardabweichung (σ) und Modus angegeben. Für F8–F10 wird zusätzlich zu den beobachteten Balken eine angepasste Normalverteilungskurve gezeigt — dies ist keine Modellaussage, sondern lediglich eine visuelle Hilfe zur Beurteilung der Schiefe.',
  'meth.cluster_h': 'Clusteranalyse',
  'meth.cluster_p': 'k-Means-Clustering (k=4, 100 zufällige Initialisierungen, scikit-learn-Standardwerte), angewandt auf <span id="method-n"></span> Teilnehmende mit vollständigen Antworten zu F1–F10 (F11 ausgeschlossen). Die Variablen wurden vor dem Clustering standardisiert (z-Wert). Vier Cluster wurden anhand des Ellenbogenkriteriums und der Silhouettenwerte ausgewählt. Die Clusterzentren wurden zur Visualisierung in den PCA-Raum (2D) projiziert.',
  'meth.frac_h': 'Anteilige Zählung',
  'meth.frac_p': 'Wenn Teilnehmende bei einer Einfachauswahl zwei Optionen ankreuzten, wurde jede mit 0,5 gewichtet. Dadurch entstehen gebrochene Summen (z. B. 248,0), die unverändert angezeigt werden, um keine Fehler durch Rundung einzuführen.',

  'div.q123': 'Ansichten &amp; Reaktionen — F1 · F2 · F3',
  'div.q45': 'Verhalten &amp; Einstellung zum Reisen — F4 · F5',
  'div.q67': 'Gesellschaftliche Sicht &amp; persönliche Bereitschaft — F6 · F7',
  'div.q8910': 'Besorgnis-Skalen — F8 · F9 · F10',
  'div.q11': 'F11 · Offene Kommentare — Themenkategorien',

  'q1.tag': 'F1 — Zentrales Ergebnis',
  'q1.title': 'Welche Aussage kommt Ihrer Ansicht zum Klimawandel am nächsten?',
  'q1.mostcommon': 'Häufigste Antwort',
  'q1.bigdesc': 'halten den Klimawandel für ein <strong style="color:var(--ink)">ernstes, vom Menschen verursachtes Problem</strong> — mit deutlichem Abstand die am häufigsten gewählte Antwort.',
  'q1.interp': 'Nur {denyN} Teilnehmende ({denyPct} %) leugnen oder verharmlosen den Klimawandel ausdrücklich („übertrieben“ oder „findet nicht statt“). Weitere {uncertPct} % — {uncertN} Teilnehmende — erkennen den Klimawandel als real an, äußern jedoch Unsicherheit über die menschlichen Ursachen oder das Ausmaß. Die übrigen {topPct} % sind eindeutig: ein ernstes, vom Menschen verursachtes Problem.',
  'q1.l0': 'Ernstes, menschgemachtes Problem',
  'q1.l1': 'Real, Ursachen/Folgen unsicher',
  'q1.l2': 'Findet unabhängig vom Menschen statt',
  'q1.l3': 'Übertrieben',
  'q1.l4': 'Findet nicht statt',

  'ipcc.eyebrow': 'Weiterführende Informationen',
  'ipcc.head': 'Möchten Sie die Wissenschaft hinter diesen Fragen erkunden?',
  'ipcc.body': 'Der <strong style="color:var(--ink);">IPCC</strong> – der Weltklimarat der Vereinten Nationen – fasst die begutachtete, veröffentlichte Klimaforschung von Tausenden unabhängigen Forschenden weltweit zusammen. Seine Aufgabe ist es, die Beweislage zu bewerten, nicht politische Maßnahmen zu empfehlen. Seine Schlussfolgerungen berücksichtigen die gesamte Klimageschichte der Erde, einschließlich mehrere Millionen Jahre zurückliegender Phasen, in denen der Planet wärmer war, sowie jeden bekannten natürlichen Einflussfaktor: Sonnenzyklen, Vulkanismus und Veränderungen der Erdumlaufbahn. All dies wurde wissenschaftlich gemessen und modelliert; sämtliche Daten und Methoden sind öffentlich zugänglich.',
  'ipcc.ar6': 'Der <strong style="color:var(--ink);">Sechste Sachstandsbericht (AR6)</strong>, veröffentlicht 2021–2023, ist der aktuellste Bericht.',
  'ipcc.faq': 'Haben Sie Fragen dazu, wie die Wissenschaft zu diesen Schlussfolgerungen gelangt ist? Der IPCC veröffentlicht zu jedem Bericht eine eigene FAQ — ein guter Ausgangspunkt, wenn Sie selbst wissenschaftlich recherchieren möchten.',
  'ipcc.btn1': 'Zur IPCC-Website',
  'ipcc.btn2': 'AR6-FAQ lesen',
  'ipcc.btn2sub': 'PDF · häufige Fragen',
  'ipcc.btn3': 'AR6-Zusammenfassung lesen',
  'ipcc.btn3sub': 'PDF · für Entscheidungsträger',

  'q2.title': 'Was beschreibt Ihre Reaktion am besten, wenn Sie vom Klimawandel hören?',
  'q3.title': 'Welche Aussage entspricht am ehesten Ihrer Einschätzung des Klimawandels?',
  'q4.title': 'Wie oft vermeiden Sie bewusst Informationen zum Klima?',
  'q5.title': 'Wenn Sie an die Klimafolgen von Reisen und Tourismus denken — was beschreibt Ihr Empfinden am besten?',
  'q6.title': 'Für wie wahrscheinlich halten Sie umfassende gesellschaftliche Veränderungen zum Klimaschutz angesichts der aktuellen sozialen und politischen Realität?',
  'q7.title': 'Wenn solche umfassenden Veränderungen nötig wären: Wie bereit wären Sie persönlich, Ihre Lebensweise grundlegend zu ändern?',

  'q2.l0': 'Besorgt, aber hoffnungsvoll',
  'q2.l1': 'Besorgt, aber überfordert',
  'q2.l2': 'Hoffnungslos / man kann\nnichts tun',
  'q2.l3': 'Skeptisch / genervt',
  'q2.l4': 'Positiv / nicht\nsehr besorgt',
  'q2.l5': 'Neutral / distanziert',

  'q3.l0': 'Technische Lösungen',
  'q3.l1': 'Handeln mindert Schäden',
  'q3.l2': 'Manche Schäden\nunvermeidbar',
  'q3.l3': 'Bereits\nzu spät',
  'q3.l4': 'Mensch hat keinen\nEinfluss',
  'q3.l5': 'Unsicher',

  'q4.l0': '1 – Nie',
  'q4.l4': '5 – Immer',
  'q6.l0': '1 – Sehr unwahrscheinlich',
  'q6.l4': '5 – Sehr wahrscheinlich',
  'q7.l0': '1 – Sehr unwillig',
  'q7.l4': '5 – Sehr bereit',

  'q5.s0': 'Besorgt &\nnachdenklich',
  'q5.s1': 'Besorgt, aber\nunabhängig',
  'q5.s2': 'Unbehaglich /\nvermeidend',
  'q5.s3': 'Neutral /\ndistanziert',
  'q5.s4': 'Skeptisch /\ngenervt',
  'q5.s5': 'Kein besonderes\nGefühl',
  'q5.s6': 'Nie darüber\nnachgedacht',
  'q5.f0': 'Besorgt & nachdenklich',
  'q5.f1': 'Besorgt, aber unabhängig von meinem Handeln',
  'q5.f2': 'Unbehaglich / ich meide das Thema',
  'q5.f3': 'Neutral / distanziert',
  'q5.f4': 'Skeptisch / genervt',
  'q5.f5': 'Kein besonderes Gefühl',
  'q5.f6': 'Nie darüber nachgedacht',

  'note.single': 'Einfachauswahl · {n} Teilnehmende',
  'note.q4scale': 'Skala: 1 = Nie → 5 = Immer · {n} Teilnehmende',
  'note.q6scale': 'Skala: 1 = Sehr unwahrscheinlich → 5 = Sehr wahrscheinlich · {n} Teilnehmende',
  'note.q7scale': 'Skala: 1 = Sehr unwillig → 5 = Sehr bereit · {n} Teilnehmende',
  'note.worryscale': 'Skala: 1 = Überhaupt nicht besorgt → 10 = Äußerst besorgt · {n} Teilnehmende',

  'q8.title': 'Wie besorgt sind <span style="font-style:italic;color:var(--teal)">Sie persönlich</span> über den Klimawandel?',
  'q9.title': 'Wie besorgt ist Ihrer Meinung nach die <span style="font-style:italic;color:var(--blue)">Allgemeinbevölkerung</span> über den Klimawandel?',
  'q10.title': 'Wie besorgt sind Ihrer Meinung nach <span style="font-style:italic;color:var(--amber)">Ihre Mitreisenden an Bord</span> über den Klimawandel?',
  'strip.mean': 'Mittelwert',
  'strip.median': 'Median',
  'strip.sd': 'Std.-Abw.',
  'strip.mode': 'Modus',
  'strip.shape': 'Form',
  'shape.q8': 'Am oberen Ende',
  'shape.q9': 'Ausgeglichen',
  'shape.q10': 'Eher oben',
  'q8.note': '<strong>Die Antworten konzentrieren sich stark am oberen Ende.</strong> {pct} % vergaben eine 9 oder 10, und der Ausläufer reicht weit nach links — nur sehr wenige Teilnehmende gaben eine geringe Besorgnis an. Die angepasste Kurve zeigt, wie weit diese Verteilung von einer symmetrischen Glockenform abweicht, was die ausgeprägte persönliche Besorgnis jener widerspiegelt, die sich für eine Reise in die Polarregionen entschieden haben.',
  'q9.note': '<strong>Die ausgeglichenste der drei Verteilungen.</strong> Die Antworten verteilen sich relativ gleichmäßig um die Mitte — Mittelwert und Median liegen beide bei etwa {mean} — ohne deutliche Tendenz zu einem der Enden. Die Teilnehmenden halten die Allgemeinbevölkerung für erheblich weniger besorgt als sich selbst: im Durchschnitt eine Differenz von {gap} Punkten.',
  'q10.note': '<strong>Die Antworten tendieren zum oberen Ende</strong> mit einem Gipfel bei {mode} und einem längeren Ausläufer zu niedrigeren Werten. Mitreisende werden als klimabewusster eingeschätzt als die Allgemeinbevölkerung (+{gapGP} Punkte im Durchschnitt), liegen aber weiterhin {gapSG} Punkte unter der eigenen Besorgnis der Teilnehmenden.',

  'comb.tag': 'F8 · F9 · F10 — Zusammenschau',
  'comb.title': 'Die Besorgnis-Lücke: man selbst vs. Mitreisende vs. Allgemeinbevölkerung',
  'comb.note': 'Alle drei Verteilungen als geglättete Häufigkeitskurven auf derselben Achse (% der Teilnehmenden) · Werte per Mauszeiger',
  'overlap.ds8': 'F8 – Eigene Besorgnis (μ = {m})',
  'overlap.ds10': 'F10 – Mitreisende (μ = {m})',
  'overlap.ds9': 'F9 – Allgemeinbevölkerung (μ = {m})',
  'overlap.note': 'Zwischen den drei Gruppen zeigt sich eine deutliche <strong>Besorgnis-Lücke</strong>. Die eigene Besorgnis (grün) ballt sich stark am oberen Ende (μ = {q8m}). Die wahrgenommene Besorgnis der Allgemeinheit (blau) liegt {gapSP} Punkte darunter (μ = {q9m}) und ist die symmetrischste Verteilung. Die wahrgenommene Besorgnis der Mitreisenden (bernstein) liegt dazwischen (μ = {q10m}) — die Teilnehmenden halten ihre Mitreisenden für klimabewusster als den Durchschnitt (+{gapGP} Punkte), aber für weniger besorgt als sich selbst (−{gapSG} Punkte). Diese dreistufige Struktur bleibt über alle {n} Teilnehmenden{scope} hinweg konstant.',
  'overlap.scope_cruise': ' dieser Reise',

  'chart.observed': 'Beobachtete Antworten',
  'chart.normal': 'Angepasste Normalverteilung',
  'chart.obs_tt': ' Beobachtet: {v} ({p} %)',
  'chart.norm_tt': ' Normalverteilung: {v}',
  'chart.resp_tt': ' {v} Teilnehmende ({p} %)',
  'chart.val_tt': ' {v} ({p} %)',
  'axis.n_resp': 'Anzahl der Teilnehmenden',
  'axis.worry': '← Überhaupt nicht besorgt                                                          Äußerst besorgt →',
  'axis.pct_resp': '% der Teilnehmenden',
  'overlap.tt': ' {name}: {p} % der Teilnehmenden',

  'q11.title': 'Welche Themen ergeben sich aus den offenen Kommentaren?',
  'q11.note': '{sub} inhaltliche Kommentare · {blank} Teilnehmende ohne Angabe · manche Kommentare betreffen mehrere Kategorien · nur Gesamtdatensatz',
  'q11.axis': 'Anzahl der Kommentare ({sub} insgesamt · manche betreffen mehrere Kategorien · nur Gesamtdatensatz)',
  'q11.tt': ' {n} Kommentare nennen dieses Thema',
  'q11.tt_one': ' {n} Kommentar nennt dieses Thema',
  'q11.c0': 'Politische Untätigkeit & Bedarf an Führung durch Staat und Wirtschaft',
  'q11.c1': 'Bedarf an Bildung, wissenschaftlicher Grundbildung & Aufklärung',
  'q11.c2': 'Eigenverantwortung, persönliches Handeln & Lebensstil',
  'q11.c3': 'Skepsis oder Unsicherheit — natürlicher Zyklus, nicht (nur) menschgemacht',
  'q11.c4': 'Der Klimawandel ist real & dringend — wir müssen jetzt handeln',
  'q11.c5': 'Sorge um künftige Generationen',
  'q11.c6': 'Persönlicher Konflikt: Reisen, Widerspruch & Grenzen individueller Wirkung',
  'q11.c7': 'Zweifel an grüner Technik & unbeabsichtigten Folgen (E-Autos, Batterien, KI)',

  'glance.d0': 'halten den Klimawandel für ein ernstes, vom Menschen verursachtes Problem',
  'glance.d1': 'fühlen sich „besorgt, aber hoffnungsvoll“, wenn sie vom Klimawandel hören',
  'glance.d2': 'halten manche Schäden für unvermeidbar, glauben aber weiterhin an die Wirkung entschlossenen Handelns (F3)',
  'glance.d3': 'durchschnittliche eigene Besorgnis von 10 — gegenüber {q9m} für die Allgemeinbevölkerung',
  'glance.d4': 'sind bereit oder sehr bereit, ihren Lebensstil grundlegend zu ändern (F7, Werte 4–5)',

  'demo.title': 'Demografie der Teilnehmenden · n = {n}',
  'demo.vs': 'im Vergleich zu allen Gästen (n={n})',
  'demo.gender': 'Geschlecht',
  'demo.female': 'Weiblich',
  'demo.male': 'Männlich',
  'demo.notstated': 'Keine Angabe',
  'demo.agegroup': 'Altersgruppe ({year})',
  'demo.region': 'Herkunftsregion',
  'demo.leg_survey': 'Umfrageteilnehmende',
  'demo.leg_guests': 'Alle Gäste an Bord',
  'demo.survey': 'Umfrage',
  'demo.guests': 'Gäste',

  'cruise.poptitle': 'Reisen in diesem Datensatz',
  'cruise.showall': 'Alle Ergebnisse anzeigen',
  'cruise.ongoing': '(laufend)',

  'repr.summary': 'Repräsentativität',
  'repr.p': '{survN} von {vpN} Gästen haben teilgenommen — eine <strong>Teilnahmequote von {rate} %</strong>. Die Teilnehmenden sind im Durchschnitt <strong>{ageTxt}</strong> (μ = {survAge} gegenüber {vpAge} in der Passagierliste). Beim Geschlecht {gTxt} ({fPct} % weiblich in der Umfrage gegenüber {vpFPct} % an Bord).',
  'repr.age_same': 'genauso alt wie alle Gäste',
  'repr.age_older': '{n} Jahre älter als alle Gäste an Bord',
  'repr.age_older_one': '1 Jahr älter als alle Gäste an Bord',
  'repr.age_younger': '{n} Jahre jünger als alle Gäste an Bord',
  'repr.age_younger_one': '1 Jahr jünger als alle Gäste an Bord',
  'repr.gender_match': 'entspricht die Umfrage weitgehend der Passagierliste',
  'repr.gender_over': 'sind Frauen um {n} Prozentpunkte überrepräsentiert',
  'repr.gender_under': 'sind Frauen um {n} Prozentpunkte unterrepräsentiert',
  'repr.bars': 'Umfrage <strong>{s} %</strong> · Gäste <strong>{g} %</strong>',
  'repr.delta_note': 'Δ = % Umfrage minus % Passagierliste. Positiv = in der Umfrage überrepräsentiert.',

  'teaser.label': 'Mehr erfahren',
  'teaser.title': 'Vier Teilnehmerprofile zeichnen sich in den Daten ab',
  'teaser.info_title': 'Wie diese Profile entstanden sind',
  'teaser.info_p1': 'Ein <strong>k-Means-Clustering</strong> (k=4, 100 Initialisierungen) wurde auf alle Teilnehmenden mit vollständigen Daten zu 8 Variablen angewandt: Sicht auf das Klima, emotionale Reaktion, Einschätzung des Handelns, Realismus gesellschaftlicher Veränderung, Handlungsbereitschaft, eigene Besorgnis, wahrgenommene Besorgnis der Allgemeinheit und wahrgenommene Besorgnis der Mitreisenden.',
  'teaser.info_p2': 'Die Profile sind keine vorgegebenen Archetypen — sie ergaben sich aus den Daten. Zusammen erklären sie <strong><span data-pc="total"></span>% der Gesamtvarianz</strong> (PC1: <span data-pc="1"></span>%, PC2: <span data-pc="2"></span>%).',
  'teaser.info_box': '<strong style="color:var(--ink);">Was bedeutet „% überzeugt“?</strong><br>F1 bat die Teilnehmenden, die Aussage zu wählen, die ihrer Sicht am nächsten kommt. Wer <em>„Der Klimawandel ist ein ernstes, vom Menschen verursachtes Problem“</em> wählte, gilt als „überzeugt“. Ein Profil mit <strong>0 %</strong> bedeutet, dass niemand aus dieser Gruppe diese Antwort gewählt hat.',
  'teaser.intro': 'Eine Clusteranalyse ist ein statistisches Verfahren, das Teilnehmende anhand der Ähnlichkeit ihrer Antworten über alle Fragen hinweg gruppiert, ohne vorherige Annahmen darüber, wie diese Gruppen aussehen sollten. Der Algorithmus findet vier natürliche Profile, indem er Muster sucht, die die Unterschiede innerhalb einer Gruppe minimieren und zwischen den Gruppen maximieren. Die Profile sind keine sich gegenseitig ausschließenden Typen, sondern Regionen einer kontinuierlichen Landschaft. Das deutlichste Ergebnis: Die größte Gruppe (n={n0}) entspricht dem Profil {p0} – stark überzeugt und stark besorgt. Was sie vom Profil {p1} (n={n1}) trennt, ist nicht die Stärke der Überzeugung, sondern die Frage, ob kollektive Veränderung noch für möglich gehalten wird.',
  'teaser.btn': 'Teilnehmerprofile erkunden',
  'teaser.worry': 'Eigene Besorgnis',
  'teaser.willing': 'Handlungsbereitschaft',

  'prof.0.name': 'Überzeugte Engagierte',
  'prof.0.tagline': 'Alarmiert, hoffnungsvoll und handlungsbereit',
  'prof.0.drive': 'Überzeugung und Hoffnung bestehen nebeneinander — sie haben die Wissenschaft akzeptiert und einen Weg gefunden, motiviert statt gelähmt zu bleiben. Sie sorgen sich stark, bleiben informiert und empfinden echte persönliche Handlungsmacht.',
  'prof.0.resonates': 'Ihre Sorge ernst nehmen, ohne zu belehren. Konkrete Maßnahmen, messbare Zusagen und ein ehrlicher Umgang mit dem Spannungsfeld Reisen.',
  'prof.1.name': 'Erschöpfte Überzeugte',
  'prof.1.tagline': 'Völlig überzeugt — aber emotional ausgelaugt',
  'prof.1.drive': 'Ihre Überzeugung ist so stark wie in jedem anderen Profil, doch sie ist zur Last geworden. Die empfundene Kluft zwischen der eigenen Alarmbereitschaft und der Umwelt verstärkt sich selbst und zehrt an den Kräften.',
  'prof.1.resonates': 'Solidarität vor Strategie. Zeigen, dass andere ihre Sorge teilen. Begrenzte, erreichbare Schritte zählen mehr als große Appelle.',
  'prof.2.name': 'Unsichere Gemäßigte',
  'prof.2.tagline': 'Interessiert und bereit — aber nicht ganz überzeugt',
  'prof.2.drive': 'Erkenntnistheoretisch vorsichtig, nicht desinteressiert. Ihre Unsicherheit über die Ursachen ist echt und geht mit tatsächlicher persönlicher Besorgnis einher.',
  'prof.2.resonates': 'Offenheit im Denken, verbunden mit einer klaren Begründung für Handeln. Keine größere Sicherheit behaupten, als sie erreicht haben.',
  'prof.3.name': 'Distanzierte Skeptiker',
  'prof.3.tagline': 'Nicht überzeugt, unbeeindruckt und ohne Interesse an der Debatte',
  'prof.3.drive': 'Ein gefestigtes alternatives Weltbild — das Klima sei natürlich und zyklisch. Ihnen ist bewusst, dass sie an Bord in der Minderheit sind, doch das ändert ihre Haltung nicht.',
  'prof.3.resonates': 'Direkte Überzeugungsarbeit wird kaum wirken. Natur und Artenvielfalt sind Zugänge, die auf ihren eigenen Begriffen funktionieren.',
  'prof.serious_high': '{p} % fest überzeugt',
  'prof.serious_mid': '{p} % teilweise überzeugt',
  'prof.serious_low': '{p} % halten den Klimawandel für ernst',
  'prof.serious_none': 'Niemand wählte „ernstes, vom Menschen verursachtes Problem“',
  'prof.desc': '{serious} · Besorgnis {worry}/10 · Bereitschaft {willing}/5 · n={n}',

  'concl.label': 'Zentrale Erkenntnisse',
  'concl.title': 'Was uns diese Umfrage zeigt',
  'concl.note': 'Die Schlussfolgerungen beruhen auf dem vollständigen Datensatz aller Reisen.',
  'concl.t1': 'Breiter Konsens — aber keine Einheitlichkeit',
  'concl.t2': 'Die entscheidende Trennlinie: Hoffnung vs. Erschöpfung',
  'concl.t3': 'Die Besorgnis-Lücke — eine konstante dreistufige Struktur',
  'concl.p1': 'Bei <strong>{n}</strong> Teilnehmenden auf <strong>{nc} {cruiseWord}</strong> sehen <strong>{pctSerious} %</strong> den Klimawandel als ernstes, vom Menschen verursachtes Problem; die eigene Besorgnis liegt im Mittel bei <strong>{q8m}/10</strong>. Die Clusteranalyse zeigt, dass die größte Gruppe (n={c0n}, {c0pct} %) dem Profil <em>{p0}</em> entspricht: stark alarmiert, hoffnungsvoll und handlungsbereit. Eine kleinere, aber ebenso intensive Gruppe (n={c1n}, Profil <em>{p1}</em>) teilt die hohe Besorgnis, neigt jedoch zu Überforderung oder Hoffnungslosigkeit. Die Grenze zwischen beiden verläuft nicht entlang der Überzeugung, sondern entlang der Frage, ob Veränderung noch für möglich gehalten wird.',
  'concl.p2': 'Sowohl das Profil <em>{p0}</em> (n={c0n}) als auch <em>{p1}</em> (n={c1n}) erreicht über 8/10 bei der eigenen Besorgnis, und in beiden sind über 85 % fest überzeugt. Was sie trennt, ist der Ausblick: Das Profil {p0} bleibt hoffnungsvoll und handlungsbereit (F7-Mittelwert: {c0q7}/5), während das Profil {p1} zu Überforderung, Hoffnungslosigkeit oder Skepsis neigt (F7-Mittelwert: {c1q7}/5). Das Profil <em>{p2}</em> (n={c2n}) umfasst sowohl Unsichere hinsichtlich der menschlichen Ursachen als auch teilweise Überzeugte: Die persönliche Besorgnis bleibt erheblich ({c2q8}/10), ebenso die Offenheit für Handeln – eine differenzierte Haltung, die sich der einfachen Einordnung als „Leugner“ entzieht.',
  'concl.p3': 'Die Teilnehmenden beziffern ihre eigene Besorgnis mit <strong>{q8m}/10</strong> und damit <strong>{gapSP}</strong> Punkte über ihrer Einschätzung der Allgemeinbevölkerung ({q9m}/10). Mitreisende gelten als bewusster als die Allgemeinheit (+{gapGP} Punkte, {q10m}/10), liegen aber weiterhin {gapSG} Punkte unter der eigenen Besorgnis. Diese dreistufige Struktur ist über alle {nc} {cruiseWord} und alle {n} Teilnehmenden hinweg konstant.',
  'concl.p3_theme': ' {theme} ist das häufigste Thema der offenen Kommentare ({count} Nennungen); die Teilnehmenden betonen dabei die Kluft zwischen persönlicher Alarmbereitschaft und kollektiver Reaktion.',
  'word.cruise_one': 'Reise',
  'word.cruise_many': 'Reisen',

  'cl.back': 'Zurück zur Umfrage',
  'cl.profiles': 'Profile',
  'cl.axes': 'Achsen (PCA)',
  'cl.axis_note': '<strong style="color:#aaa">→ Horizontal (PC1, <span data-pc="1"></span>%)</strong><br>Bestimmt vor allem durch <em>Sicht auf das Klima (F1)</em>, eigene Besorgnis (F8), Ausblick (F3) und gesellschaftliche Hoffnung (F6). Rechts = starke Überzeugung + hohe persönliche Besorgnis.<br><br><strong style="color:#aaa">↑ Vertikal (PC2, <span data-pc="2"></span>%)</strong><br>Bestimmt durch <em>Besorgnis von Gesellschaft und Mitreisenden (F9/F10)</em>. Oben = stärker nach außen gerichtete Besorgnis.<br><br>Zusammen erklären diese beiden Achsen <strong style="color:#aaa"><span data-pc="total"></span>%</strong> der Varianz in den Daten.',
  'cl.highlight': 'Hervorheben',
  'cl.showall': 'Alle anzeigen',
  'cl.f_cruise': 'Reise',
  'cl.f_gender': 'Geschlecht',
  'cl.f_female': 'Weibliche Teilnehmende',
  'cl.f_male': 'Männliche Teilnehmende',
  'cl.f_age': 'Alter',
  'cl.f_under50': 'Unter 50',
  'cl.f_60plus': '60+',
  'cl.f_region': 'Region',
  'region.anz': 'Australien & Neuseeland',
  'region.europe': 'Kontinentaleuropa',
  'region.na': 'Nordamerika',
  'region.uk': 'Großbritannien & Irland',
  'region.china': 'China',
  'region.asia': 'Asien & Naher Osten',
  'cl.axis_x': '→ Besorgnis + Überzeugung',
  'cl.axis_y': '↑ Sorge um andere',
  'cl.tt_nat': 'Nationalität',
  'cl.tt_age': 'Alter',
  'cl.tt_gender': 'Geschlecht',
  'cl.tt_q8': 'F8 Eigene Besorgnis',
  'cl.tt_q7': 'F7 Bereitschaft',
  'cl.respondents': '{n} Teilnehmende',
  'cl.drives': 'Was sie antreibt',

  'footer.text': 'Umfrage: „Wie denken Sie über den Klimawandel?“ · {n} Teilnehmende auf {nc} {cruiseWord} · Papier- und Online-Fragebögen auf {langs} · HX Expeditions · Studie durchgeführt von <a href="https://jeanne-de-lepinay.github.io/en/" target="_blank" rel="noopener" class="author-link">Jeanne de Lépinay</a>',
};

// ═══════════════════════════════════════════════════════════════════════════
// FRENCH
// ═══════════════════════════════════════════════════════════════════════════
T.fr = {
  'meta.title': 'Que pensez-vous du changement climatique ? · Enquête HX Expeditions',
  'hdr.eyebrow': 'Enquête à bord des expéditions polaires',
  'nav.survey': 'Résultats de l\'enquête',
  'nav.profiles': 'Profils des participants',
  'hdr.h1': 'Que pensez-vous du <em>changement climatique ?</em>',
  'hdr.intro': 'Cette enquête est menée à bord des navires d’expédition HX en Antarctique &amp; en Arctique. Il s’agit d’une étude en cours sur le microcosme de nos navires, appelée à évoluer à mesure que de nouvelles réponses viennent enrichir la base de données. Les résultats ci-dessous reflètent les réponses des passagers qui ont choisi de participer : un groupe auto-sélectionné, intéressé par la science, la nature et les environnements polaires.',
  'hdr.method': 'Méthodologie — Les questionnaires ont été distribués sur papier et par QR code (version en ligne), puis saisis par une seule analyste (<a href="https://jeanne-de-lepinay.github.io/en/" target="_blank" rel="noopener" class="author-link">Jeanne de Lépinay</a>). Lorsqu\'un participant cochait deux réponses à une question à choix unique, chacune a été comptée pour 0,5. Les items d\'échelle laissés vides ont été exclus du dénominateur de la question concernée. Le biais de participation, les barrières linguistiques, la formulation des questions et la saisie par une seule personne peuvent influencer les résultats.',
  'btn.demographics': 'Profil démographique des participants',
  'btn.cruises': 'Croisières incluses dans ce jeu de données',

  'meta.respondents': 'Participants',
  'meta.questions': 'Questions',
  'meta.questions_val': 'Q1 – Q11',
  'meta.languages': 'Langues disponibles',
  'meta.nationalities': 'Nationalités',
  'meta.meanage': 'Âge moyen',
  'meta.countries': '{n}+ pays',
  'meta.years': '{n} ans',

  'glance.label': 'En bref',
  'warn.small': '<strong>Échantillon réduit (n={n})</strong> — Les résultats d\'une seule croisière doivent être interprétés avec prudence. Les pourcentages peuvent évoluer sensiblement à mesure que de nouveaux participants s\'ajoutent.',

  'meth.summary': 'Méthodologie statistique &amp; limites',
  'meth.sample_h': 'Échantillon',
  'meth.sample_p': 'Échantillon de convenance auto-sélectionné, composé de passagers HX ayant choisi de répondre. Il n’est pas représentatif de la population générale : le biais de participation tend vraisemblablement vers une préoccupation environnementale plus élevée que la moyenne.',
  'meth.scale_h': 'Questions à échelle (Q4, Q6–Q10)',
  'meth.scale_p': 'Distributions présentées en effectifs bruts, moyenne (μ), médiane, écart-type (σ) et mode. Pour Q8–Q10, une courbe normale ajustée est affichée à côté des barres observées à titre de référence — il ne s\'agit pas d\'une hypothèse de modélisation, mais d\'une aide visuelle pour apprécier l\'asymétrie.',
  'meth.cluster_h': 'Analyse en clusters',
  'meth.cluster_p': 'Classification k-means (k=4, 100 initialisations aléatoires, paramètres par défaut de scikit-learn) appliquée à <span id="method-n"></span> participants ayant répondu intégralement aux questions Q1–Q10 (Q11 exclue). Les variables ont été standardisées (score z) avant la classification. Quatre clusters ont été retenus après inspection visuelle du coude d\'inertie et des scores de silhouette. Les centres des clusters sont projetés dans l\'espace ACP (2D) pour la visualisation.',
  'meth.frac_h': 'Comptages fractionnaires',
  'meth.frac_p': 'Lorsqu\'un participant cochait deux options à une question à choix unique, chacune a reçu un poids de 0,5. Cela produit des totaux fractionnaires (par ex. 248,0), affichés tels quels plutôt qu\'arrondis afin de ne pas introduire d\'erreur.',

  'div.q123': 'Opinions &amp; réactions — Q1 · Q2 · Q3',
  'div.q45': 'Comportements &amp; attitudes face au voyage — Q4 · Q5',
  'div.q67': 'Regard sur la société &amp; disposition personnelle — Q6 · Q7',
  'div.q8910': 'Échelles d\'inquiétude — Q8 · Q9 · Q10',
  'div.q11': 'Q11 · Commentaires libres — catégories thématiques',

  'q1.tag': 'Q1 — Résultat clé',
  'q1.title': 'Quelle affirmation correspond le mieux à votre point de vue sur le changement climatique ?',
  'q1.mostcommon': 'Réponse la plus fréquente',
  'q1.bigdesc': 'considèrent le changement climatique comme un <strong style="color:var(--ink)">problème grave causé par l\'homme</strong> — de loin la réponse la plus choisie.',
  'q1.interp': 'Seuls {denyN} participants ({denyPct} %) nient ou minimisent ouvertement le changement climatique (« exagéré » ou « ne se produit pas »). {uncertPct} % de plus — soit {uncertN} participants — reconnaissent la réalité du changement climatique mais expriment une incertitude quant à ses causes humaines ou à son ampleur. Les {topPct} % restants sont sans ambiguïté : un problème grave, causé par l\'homme.',
  'q1.l0': 'Problème grave d\'origine humaine',
  'q1.l1': 'Réel, causes/effets incertains',
  'q1.l2': 'Se produit indépendamment de l’homme',
  'q1.l3': 'Exagéré',
  'q1.l4': 'Ne se produit pas',

  'ipcc.eyebrow': 'Pour aller plus loin',
  'ipcc.head': 'Envie d\'explorer la science derrière ces questions ?',
  'ipcc.body': 'Le <strong style="color:var(--ink);">GIEC</strong> (Groupe d’experts intergouvernemental sur l’évolution du climat) est l’organe des Nations unies chargé de synthétiser la littérature climatique évaluée par les pairs, issue de milliers de chercheurs indépendants dans le monde entier. Son rôle est d’évaluer les données probantes, non de préconiser des politiques. Ses conclusions tiennent compte de toute l’histoire climatique de la Terre, y compris des périodes remontant à plusieurs millions d’années où la planète était plus chaude, ainsi que de tous les facteurs naturels de variabilité connus : cycles solaires, activité volcanique, variations orbitales. Tous ont été mesurés et modélisés scientifiquement, et l’ensemble des données et des méthodes est accessible au public.',
  'ipcc.ar6': 'Le <strong style="color:var(--ink);">Sixième rapport d\'évaluation (AR6)</strong>, publié entre 2021 et 2023, est le plus récent.',
  'ipcc.faq': 'Vous vous demandez comment les scientifiques sont parvenus à ces conclusions ? Le GIEC publie une FAQ dédiée avec chaque rapport — un bon point de départ pour mener vos propres recherches de façon scientifique.',
  'ipcc.btn1': 'Visiter le site du GIEC',
  'ipcc.btn2': 'Lire la FAQ de l\'AR6',
  'ipcc.btn2sub': 'PDF · questions fréquentes',
  'ipcc.btn3': 'Lire le résumé de l\'AR6',
  'ipcc.btn3sub': 'PDF · pour les décideurs',

  'q2.title': 'Lorsque vous entendez parler du changement climatique, qu\'est-ce qui décrit le mieux votre réaction ?',
  'q3.title': 'Quelle affirmation correspond le mieux à votre vision du changement climatique ?',
  'q4.title': 'À quelle fréquence évitez-vous délibérément les informations liées au climat ?',
  'q5.title': 'Quand vous pensez à l\'impact climatique du voyage et du tourisme, qu\'est-ce qui décrit le mieux ce que vous ressentez ?',
  'q6.title': 'Selon vous, quelle est la probabilité de changements sociétaux d\'ampleur pour répondre au changement climatique, compte tenu des réalités sociales et politiques actuelles ?',
  'q7.title': 'Si de tels changements d\'ampleur étaient nécessaires, dans quelle mesure seriez-vous personnellement prêt à modifier profondément votre mode de vie ?',

  'q2.l0': 'Inquiet mais optimiste',
  'q2.l1': 'Inquiet mais dépassé',
  'q2.l2': 'Sans espoir / on ne\npeut rien faire',
  'q2.l3': 'Sceptique / agacé',
  'q2.l4': 'Positif / peu\ninquiet',
  'q2.l5': 'Neutre / détaché',

  'q3.l0': 'Solutions techniques',
  'q3.l1': 'Agir réduit les dégâts',
  'q3.l2': 'Certains dégâts\ninévitables',
  'q3.l3': 'Déjà\ntrop tard',
  'q3.l4': 'L’homme n’y peut\nrien',
  'q3.l5': 'Incertain',

  'q4.l0': '1 – Jamais',
  'q4.l4': '5 – Toujours',
  'q6.l0': '1 – Très improbable',
  'q6.l4': '5 – Très probable',
  'q7.l0': '1 – Très peu disposé',
  'q7.l4': '5 – Tout à fait disposé',

  'q5.s0': 'Inquiet &\nréfléchi',
  'q5.s1': 'Inquiet, mais sans\nlien avec mes choix',
  'q5.s2': 'Mal à l’aise /\nj’évite le sujet',
  'q5.s3': 'Neutre /\ndétaché',
  'q5.s4': 'Sceptique /\nagacé',
  'q5.s5': 'Aucun sentiment\nparticulier',
  'q5.s6': 'Je n’y ai\njamais pensé',
  'q5.f0': 'Inquiet & réfléchi',
  'q5.f1': 'Inquiet, mais sans lien avec mes choix',
  'q5.f2': 'Mal à l’aise / j’évite le sujet',
  'q5.f3': 'Neutre / détaché',
  'q5.f4': 'Sceptique / agacé',
  'q5.f5': 'Aucun sentiment particulier',
  'q5.f6': 'Je n’y ai jamais pensé',

  'note.single': 'Choix unique · {n} participants',
  'note.q4scale': 'Échelle : 1 = Jamais → 5 = Toujours · {n} participants',
  'note.q6scale': 'Échelle : 1 = Très improbable → 5 = Très probable · {n} participants',
  'note.q7scale': 'Échelle : 1 = Très peu disposé → 5 = Tout à fait disposé · {n} participants',
  'note.worryscale': 'Échelle : 1 = Pas du tout inquiet → 10 = Extrêmement inquiet · {n} participants',

  'q8.title': 'À quel point êtes-<span style="font-style:italic;color:var(--teal)">vous personnellement</span> inquiet du changement climatique ?',
  'q9.title': 'Selon vous, à quel point le <span style="font-style:italic;color:var(--blue)">grand public</span> est-il inquiet du changement climatique ?',
  'q10.title': 'Selon vous, à quel point les <span style="font-style:italic;color:var(--amber)">autres passagers à bord</span> sont-ils inquiets du changement climatique ?',
  'strip.mean': 'Moyenne',
  'strip.median': 'Médiane',
  'strip.sd': 'Écart-type',
  'strip.mode': 'Mode',
  'strip.shape': 'Forme',
  'shape.q8': 'Concentrée en haut',
  'shape.q9': 'Équilibrée',
  'shape.q10': 'Plutôt élevée',
  'q8.note': '<strong>Les réponses se concentrent fortement dans le haut de l\'échelle.</strong> {pct} % ont attribué 9 ou 10, et la queue de distribution s\'étend loin vers la gauche — très peu de participants déclarent une faible inquiétude. La courbe ajustée montre à quel point cette distribution s\'écarte d\'une cloche symétrique, reflet de l\'inquiétude marquée de ceux qui ont choisi de voyager vers les régions polaires.',
  'q9.note': '<strong>La distribution la plus équilibrée des trois.</strong> Les réponses se répartissent assez uniformément autour du centre — moyenne et médiane toutes deux proches de {mean} — sans attraction marquée vers l\'une ou l\'autre extrémité. Les participants perçoivent le grand public comme nettement moins inquiet qu\'eux-mêmes : un écart de {gap} points en moyenne.',
  'q10.note': '<strong>Les réponses penchent vers le haut de l’échelle,</strong> avec un pic à {mode} et une queue plus longue vers les scores bas. Les autres passagers sont jugés plus conscients du climat que le grand public (+{gapGP} points en moyenne), mais restent {gapSG} points en dessous de l’inquiétude déclarée par les participants eux-mêmes.',

  'comb.tag': 'Q8 · Q9 · Q10 — Vue combinée',
  'comb.title': 'L\'écart d\'inquiétude : soi-même, les autres passagers et le grand public',
  'comb.note': 'Les trois distributions tracées en courbes de fréquence lissées sur le même axe (% des participants) · survolez pour voir les valeurs',
  'overlap.ds8': 'Q8 – Inquiétude personnelle (μ = {m})',
  'overlap.ds10': 'Q10 – Autres passagers (μ = {m})',
  'overlap.ds9': 'Q9 – Grand public (μ = {m})',
  'overlap.note': 'Un net <strong>écart d\'inquiétude</strong> apparaît entre les trois groupes. L\'inquiétude personnelle (vert) se concentre fortement dans le haut de l\'échelle (μ = {q8m}). L\'inquiétude perçue du grand public (bleu) se situe {gapSP} points plus bas (μ = {q9m}) et constitue la distribution la plus symétrique. L\'inquiétude perçue des autres passagers (ambre) se place entre les deux (μ = {q10m}) — les participants jugent leurs compagnons de voyage plus conscients du climat que la moyenne des gens (+{gapGP} points), mais moins inquiets qu\'eux-mêmes (−{gapSG} points). Cette structure à trois niveaux reste constante sur l\'ensemble des {n} participants{scope}.',
  'overlap.scope_cruise': ' de cette croisière',

  'chart.observed': 'Réponses observées',
  'chart.normal': 'Courbe normale ajustée',
  'chart.obs_tt': ' Observé : {v} ({p} %)',
  'chart.norm_tt': ' Courbe normale : {v}',
  'chart.resp_tt': ' {v} participants ({p} %)',
  'chart.val_tt': ' {v} ({p} %)',
  'axis.n_resp': 'Nombre de participants',
  'axis.worry': '← Pas du tout inquiet                                                          Extrêmement inquiet →',
  'axis.pct_resp': '% des participants',
  'overlap.tt': ' {name} : {p} % des participants',

  'q11.title': 'Quels thèmes ressortent des commentaires libres ?',
  'q11.note': '{sub} commentaires substantiels · {blank} participants sans réponse · certains commentaires couvrent plusieurs catégories · jeu de données complet uniquement',
  'q11.axis': 'Nombre de commentaires ({sub} au total · certains couvrent plusieurs catégories · jeu de données complet uniquement)',
  'q11.tt': ' {n} commentaires évoquent ce thème',
  'q11.tt_one': ' {n} commentaire évoque ce thème',
  'q11.c0': 'Inaction politique & besoin d’un leadership public et privé',
  'q11.c1': 'Besoin d\'éducation, de culture scientifique & de sensibilisation',
  'q11.c2': 'Responsabilité individuelle, action personnelle & mode de vie',
  'q11.c3': 'Scepticisme ou incertitude — cycle naturel, pas (seulement) d\'origine humaine',
  'q11.c4': 'Le changement climatique est réel & urgent — il faut agir maintenant',
  'q11.c5': 'Préoccupation pour les générations futures',
  'q11.c6': 'Conflit personnel : voyage, contradiction & limites de l’action individuelle',
  'q11.c7': 'Doutes sur les technologies vertes & effets indésirables (VE, batteries, IA)',

  'glance.d0': 'estiment que le changement climatique est un problème grave causé par l\'homme',
  'glance.d1': 'se disent « inquiets mais optimistes » en entendant parler du changement climatique',
  'glance.d2': 'jugent certains dégâts inévitables mais croient encore à l’utilité d’une action déterminée (Q3)',
  'glance.d3': 'score moyen d\'inquiétude personnelle sur 10 — contre {q9m} attribué au grand public',
  'glance.d4': 'sont disposés ou tout à fait disposés à modifier profondément leur mode de vie (Q7, scores 4–5)',

  'demo.title': 'Profil démographique des participants · n = {n}',
  'demo.vs': 'par rapport à tous les passagers (n={n})',
  'demo.gender': 'Genre',
  'demo.female': 'Femmes',
  'demo.male': 'Hommes',
  'demo.notstated': 'Non précisé',
  'demo.agegroup': 'Tranche d\'âge ({year})',
  'demo.region': 'Région d\'origine',
  'demo.leg_survey': 'Participants à l\'enquête',
  'demo.leg_guests': 'Tous les passagers à bord',
  'demo.survey': 'Enquête',
  'demo.guests': 'Passagers',

  'cruise.poptitle': 'Croisières de ce jeu de données',
  'cruise.showall': 'Afficher tous les résultats',
  'cruise.ongoing': '(en cours)',

  'repr.summary': 'Représentativité',
  'repr.p': '{survN} passagers sur {vpN} ont répondu à l\'enquête — un <strong>taux de participation de {rate} %</strong>. Les participants sont en moyenne <strong>{ageTxt}</strong> (μ = {survAge} contre {vpAge} dans la liste des passagers). Côté genre, {gTxt} ({fPct} % de femmes dans l\'enquête contre {vpFPct} % à bord).',
  'repr.age_same': 'du même âge que l’ensemble des passagers',
  'repr.age_older': 'plus âgés de {n} ans que l’ensemble des passagers',
  'repr.age_older_one': 'plus âgés d’un an que l’ensemble des passagers',
  'repr.age_younger': 'plus jeunes de {n} ans que l’ensemble des passagers',
  'repr.age_younger_one': 'plus jeunes d’un an que l’ensemble des passagers',
  'repr.gender_match': 'l\'enquête correspond étroitement à la liste des passagers',
  'repr.gender_over': 'les femmes sont surreprésentées de {n} points',
  'repr.gender_under': 'les femmes sont sous-représentées de {n} points',
  'repr.bars': 'Enquête <strong>{s} %</strong> · Passagers <strong>{g} %</strong>',
  'repr.delta_note': 'Δ = % enquête moins % liste des passagers. Positif = surreprésenté dans l\'enquête.',

  'teaser.label': 'Approfondir',
  'teaser.title': 'Quatre profils de participants se dégagent des données',
  'teaser.info_title': 'Comment ces profils ont été construits',
  'teaser.info_p1': 'Une <strong>classification k-means</strong> (k=4, 100 initialisations) a été appliquée à tous les participants disposant de données complètes sur 8 variables : vision du climat, réaction émotionnelle, regard sur l\'action, réalisme du changement sociétal, disposition à agir, inquiétude personnelle, inquiétude perçue du public et inquiétude perçue des autres passagers.',
  'teaser.info_p2': 'Les profils ne sont pas des archétypes prédéfinis — ils émergent des données. Ensemble, ils expliquent <strong><span data-pc="total"></span>% de la variance totale</strong> (CP1 : <span data-pc="1"></span>%, CP2 : <span data-pc="2"></span>%).',
  'teaser.info_box': '<strong style="color:var(--ink);">Que signifie « convaincus » ?</strong><br>La Q1 demandait aux participants de choisir l’affirmation la plus proche de leur point de vue. Ceux qui ont retenu <em>« Le changement climatique est un problème grave causé par l’homme »</em> sont comptés comme convaincus. Un profil affichant <strong>0 %</strong> signifie qu’aucun de ses membres n’a choisi cette réponse.',
  'teaser.intro': 'Une analyse en clusters est une méthode statistique qui regroupe les participants selon la similarité de leurs réponses à l’ensemble des questions, sans hypothèse préalable sur l’allure de ces groupes. L’algorithme dégage quatre profils naturels en cherchant les configurations qui minimisent les différences au sein de chaque groupe et les maximisent entre les groupes. Ces profils ne sont pas des catégories étanches : ils représentent des zones d’un paysage continu. Le constat le plus net : le groupe le plus important (n={n0}) relève du profil {p0}, très convaincu et très inquiet. Ce qui le sépare du profil {p1} (n={n1}) n’est pas l’intensité de la conviction, mais le fait de croire encore qu’un changement collectif est possible.',
  'teaser.btn': 'Explorer les profils des participants',
  'teaser.worry': 'Inquiétude personnelle',
  'teaser.willing': 'Disposition à agir',

  'prof.0.name': 'Convaincu engagé',
  'prof.0.tagline': 'Alarmé, optimiste et prêt à agir',
  'prof.0.drive': 'Chez eux, conviction et espoir coexistent — ils ont accepté les données scientifiques et trouvé le moyen de rester mobilisés plutôt que paralysés. Ils s\'inquiètent intensément, restent informés et ressentent une véritable capacité d\'action personnelle.',
  'prof.0.resonates': 'Prendre leur inquiétude au sérieux sans faire la leçon. Actions concrètes, engagements mesurables et reconnaissance honnête de la tension liée au voyage.',
  'prof.1.name': 'Convaincu épuisé',
  'prof.1.tagline': 'Pleinement convaincu — mais émotionnellement épuisé',
  'prof.1.drive': 'Leur conviction est aussi forte que dans tout autre profil, mais elle est devenue un poids. L\'écart ressenti entre leur propre alarme et le monde qui les entoure s\'auto-entretient et les épuise.',
  'prof.1.resonates': 'La solidarité avant la stratégie. Leur montrer que d\'autres partagent leur inquiétude. Des actions délimitées et atteignables comptent plus que les grands appels.',
  'prof.2.name': 'Modéré incertain',
  'prof.2.tagline': 'Intéressé et disposé — mais pas entièrement convaincu',
  'prof.2.drive': 'Prudents sur le plan de la connaissance, mais pas désengagés. Leur incertitude sur les causes est sincère et coexiste avec une inquiétude personnelle bien réelle.',
  'prof.2.resonates': 'Une ouverture d\'esprit associée à une justification claire de l\'action. Éviter d\'affirmer plus de certitude qu\'ils n\'en ont acquise.',
  'prof.3.name': 'Sceptique distant',
  'prof.3.tagline': 'Non convaincu, indifférent et peu enclin au débat',
  'prof.3.drive': 'Une vision du monde alternative bien installée — le climat serait naturel et cyclique. Ils savent être minoritaires à bord, mais cela ne les fait pas changer d\'avis.',
  'prof.3.resonates': 'La persuasion directe a peu de chances d\'aboutir. La nature et la biodiversité sont des portes d\'entrée qui fonctionnent selon leurs propres termes.',
  'prof.serious_high': '{p} % de convaincus',
  'prof.serious_mid': '{p} % partiellement convaincus',
  'prof.serious_low': '{p} % jugent le changement climatique grave',
  'prof.serious_none': 'Aucun participant n\'a choisi « problème grave causé par l\'homme »',
  'prof.desc': '{serious} · Inquiétude {worry}/10 · Disposition {willing}/5 · n={n}',

  'concl.label': 'Résultats clés',
  'concl.title': 'Ce que nous apprend cette enquête',
  'concl.note': 'Les conclusions portent sur le jeu de données complet, toutes croisières confondues.',
  'concl.t1': 'Un large consensus — mais pas d\'uniformité',
  'concl.t2': 'La ligne de partage : espoir ou épuisement',
  'concl.t3': 'L\'écart d\'inquiétude — une structure à trois niveaux constante',
  'concl.p1': 'Sur <strong>{n}</strong> participants répartis sur <strong>{nc} {cruiseWord}</strong>, <strong>{pctSerious} %</strong> voient le changement climatique comme un problème grave causé par l’homme, et l’inquiétude personnelle s’établit en moyenne à <strong>{q8m}/10</strong>. L’analyse en clusters montre que le groupe le plus important (n={c0n}, {c0pct} %) relève du profil <em>{p0}</em> : très alarmé, optimiste et prêt à agir. Un groupe plus restreint mais tout aussi intense (n={c1n}, profil <em>{p1}</em>) partage une inquiétude aussi forte, mais penche vers le découragement ou le sentiment d’impuissance. Ce qui les sépare n’est pas la conviction, mais le fait de croire encore le changement possible.',
  'concl.p2': 'Les profils <em>{p0}</em> (n={c0n}) et <em>{p1}</em> (n={c1n}) dépassent tous deux 8/10 d’inquiétude personnelle et comptent plus de 85 % de convaincus. Ce qui les distingue, c’est la perspective : le profil {p0} reste optimiste et prêt à agir (moyenne Q7 : {c0q7}/5), tandis que le profil {p1} penche vers le découragement, l’impuissance ou le scepticisme (moyenne Q7 : {c1q7}/5). Le profil <em>{p2}</em> (n={c2n}) rassemble à la fois des personnes incertaines quant aux causes humaines et des convaincus partiels : l’inquiétude personnelle y reste notable ({c2q8}/10) et l’ouverture à l’action réelle, une position nuancée qui résiste à l’étiquette de « climatosceptique ».',
  'concl.p3': 'Les participants situent leur propre inquiétude à <strong>{q8m}/10</strong>, soit <strong>{gapSP}</strong> points au-dessus de ce qu’ils attribuent au grand public ({q9m}/10). Les autres passagers sont perçus comme plus conscients que le grand public (+{gapGP} points, {q10m}/10), mais restent {gapSG} points en dessous de l’inquiétude des participants eux-mêmes. Cette structure à trois niveaux se retrouve sur les {nc} {cruiseWord} et l’ensemble des {n} participants.',
  'concl.p3_theme': ' {theme} est le thème dominant des commentaires libres ({count} mentions), les participants soulignant l\'écart entre leur alarme personnelle et la réponse collective.',
  'word.cruise_one': 'croisière',
  'word.cruise_many': 'croisières',

  'cl.back': 'Retour à l\'enquête',
  'cl.profiles': 'Profils',
  'cl.axes': 'Axes (ACP)',
  'cl.axis_note': '<strong style="color:#aaa">→ Horizontal (CP1, <span data-pc="1"></span>%)</strong><br>Déterminé principalement par la <em>vision du climat (Q1)</em>, l\'inquiétude personnelle (Q8), la perspective (Q3) et l\'espoir sociétal (Q6). À droite = forte conviction + forte inquiétude personnelle.<br><br><strong style="color:#aaa">↑ Vertical (CP2, <span data-pc="2"></span>%)</strong><br>Déterminé par l\'<em>inquiétude perçue de la société et des passagers (Q9/Q10)</em>. Vers le haut = inquiétude davantage tournée vers les autres.<br><br>Ensemble, ces deux axes expliquent <strong style="color:#aaa"><span data-pc="total"></span>%</strong> de la variance des données.',
  'cl.highlight': 'Mettre en évidence',
  'cl.showall': 'Tout afficher',
  'cl.f_cruise': 'Croisière',
  'cl.f_gender': 'Genre',
  'cl.f_female': 'Femmes',
  'cl.f_male': 'Hommes',
  'cl.f_age': 'Âge',
  'cl.f_under50': 'Moins de 50 ans',
  'cl.f_60plus': '60 ans et plus',
  'cl.f_region': 'Région',
  'region.anz': 'Australie & Nouvelle-Zélande',
  'region.europe': 'Europe continentale',
  'region.na': 'Amérique du Nord',
  'region.uk': 'Royaume-Uni & Irlande',
  'region.china': 'Chine',
  'region.asia': 'Asie & Moyen-Orient',
  'cl.axis_x': '→ Inquiétude + conviction',
  'cl.axis_y': '↑ Inquiétude pour les autres',
  'cl.tt_nat': 'Nationalité',
  'cl.tt_age': 'Âge',
  'cl.tt_gender': 'Genre',
  'cl.tt_q8': 'Q8 Inquiétude personnelle',
  'cl.tt_q7': 'Q7 Disposition',
  'cl.respondents': '{n} participants',
  'cl.drives': 'Ce qui les motive',

  'footer.text': 'Enquête : « Que pensez-vous du changement climatique ? » · {n} participants sur {nc} {cruiseWord} · Questionnaires papier et en ligne en {langs} · HX Expeditions · Étude réalisée par <a href="https://jeanne-de-lepinay.github.io/en/" target="_blank" rel="noopener" class="author-link">Jeanne de Lépinay</a>',
};

// ═══════════════════════════════════════════════════════════════════════════
// CHINESE (SIMPLIFIED)
// ═══════════════════════════════════════════════════════════════════════════
T.zh = {
  'meta.title': '您如何看待气候变化？· HX 探险队问卷调查',
  'hdr.eyebrow': '极地探险问卷调查',
  'nav.survey': '调查结果',
  'nav.profiles': '受访者画像',
  'hdr.h1': '您如何看待<em>气候变化？</em>',
  'hdr.intro': '本调查在前往南极与北极地区的 HX 探险船上进行。这是一项关于船上微观社会的持续研究，随着更多回答录入数据库，研究结果将不断更新。以下结果代表自愿参与的客人的回答：这是一个对科学、自然与极地环境感兴趣的自选群体。',
  'hdr.method': '研究方法 — 问卷以纸质表格和二维码（在线版）两种方式发放，并由一位分析员（<a href="https://jeanne-de-lepinay.github.io/en/" target="_blank" rel="noopener" class="author-link">Jeanne de Lépinay</a>）独立录入。若受访者在单选题中勾选了两个答案，每个答案计为 0.5。未作答的量表题目不计入该题的分母。参与偏差、语言障碍、问题表述方式以及由单人录入等因素均可能影响结果。',
  'btn.demographics': '受访者人口结构',
  'btn.cruises': '本数据集包含的航次',

  'meta.respondents': '受访者',
  'meta.questions': '问题',
  'meta.questions_val': '第1–11题',
  'meta.languages': '可用语言',
  'meta.nationalities': '国籍',
  'meta.meanage': '平均年龄',
  'meta.countries': '{n}+ 个国家',
  'meta.years': '{n} 岁',

  'glance.label': '概览',
  'warn.small': '<strong>样本量较小（n={n}）</strong> — 单一航次的结果应谨慎解读。随着受访者增加，百分比可能出现明显变化。',

  'meth.summary': '统计方法与局限',
  'meth.sample_h': '样本',
  'meth.sample_p': '本研究采用自选便利样本，由自愿填写问卷的 HX 探险船客人组成，不能代表社会公众。参与偏差可能使样本整体对环境的关注程度高于平均水平。',
  'meth.scale_h': '量表题（第4、6–10题）',
  'meth.scale_p': '分布以原始计数、均值（μ）、中位数、标准差（σ）和众数呈现。第8–10题在实测柱状图旁另加一条拟合正态曲线作为参照——这并非建模结论，仅用于直观判断分布的偏斜程度。',
  'meth.cluster_h': '聚类分析',
  'meth.cluster_p': '对第1–10题作答完整的 <span id="method-n"></span> 位受访者（不含第11题）采用 k-means 聚类（k=4，100 次随机初始化，scikit-learn 默认参数）。聚类前对各变量进行了标准化（z 分数）。通过观察惯性拐点和轮廓系数确定为四个聚类。聚类中心投影到二维主成分空间以便可视化。',
  'meth.frac_h': '小数计数',
  'meth.frac_p': '若受访者在单选题中勾选了两个选项，每项计权 0.5。这会产生小数总计（例如 248.0），为避免引入误差，数值按原样显示而不作四舍五入。',

  'div.q123': '观点与反应 — 第1 · 2 · 3题',
  'div.q45': '旅行相关行为与态度 — 第4 · 5题',
  'div.q67': '社会层面的看法与个人意愿 — 第6 · 7题',
  'div.q8910': '担忧程度量表 — 第8 · 9 · 10题',
  'div.q11': '第11题 · 开放式评论 — 主题分类',

  'q1.tag': '第1题 — 核心发现',
  'q1.title': '以下哪种说法最接近您对气候变化的看法？',
  'q1.mostcommon': '最常见的回答',
  'q1.bigdesc': '认为气候变化是<strong style="color:var(--ink)">由人类造成的严重问题</strong>——以显著优势成为选择最多的答案。',
  'q1.interp': '仅有 {denyN} 位受访者（{denyPct}%）明确否认或淡化气候变化（认为“被夸大”或“并未发生”）。另有 {uncertPct}%，即 {uncertN} 位受访者，承认气候变化真实存在，但对其人为成因或影响程度存有疑问。其余 {topPct}% 的态度毫不含糊：这是一个由人类造成的严重问题。',
  'q1.l0': '人为造成的严重问题',
  'q1.l1': '真实存在但成因/影响不明',
  'q1.l2': '与人类活动无关而发生',
  'q1.l3': '被夸大了',
  'q1.l4': '并未发生',

  'ipcc.eyebrow': '延伸阅读',
  'ipcc.head': '想了解这些问题背后的科学依据吗？',
  'ipcc.body': '<strong style="color:var(--ink);">IPCC</strong>（政府间气候变化专门委员会）是联合国下属机构，负责汇总全球数千位独立研究者经同行评审发表的气候科学成果——其职能是评估证据，而非倡导政策。其结论涵盖了地球气候史的完整跨度，包括数百万年前地球更温暖的时期，也涵盖了所有已知的自然变率驱动因素：太阳活动周期、火山活动、轨道变化。所有这些都经过科学测量与建模，全部数据和方法均向公众开放。',
  'ipcc.ar6': '<strong style="color:var(--ink);">第六次评估报告（AR6）</strong>发布于 2021–2023 年，是目前最新的报告。',
  'ipcc.faq': '想知道科学家是如何得出这些结论的吗？IPCC 会为每份报告配套发布专门的常见问题解答——如果您希望以科学的方式自行查证，这是一个很好的起点。',
  'ipcc.btn1': '访问 IPCC 网站',
  'ipcc.btn2': '阅读 AR6 常见问题',
  'ipcc.btn2sub': 'PDF · 常见问题',
  'ipcc.btn3': '阅读 AR6 摘要',
  'ipcc.btn3sub': 'PDF · 供决策者参考',

  'q2.title': '当您听到有关气候变化的消息时，哪种描述最符合您的反应？',
  'q3.title': '以下哪种说法最符合您对气候变化前景的看法？',
  'q4.title': '您有多经常刻意回避与气候相关的信息？',
  'q5.title': '当您想到旅行与旅游业对气候的影响时，哪种描述最符合您的感受？',
  'q6.title': '考虑到当前的社会与政治现实，您认为为应对气候变化而进行大规模社会变革的可能性有多大？',
  'q7.title': '如果确实需要这样的大规模变革，您个人有多愿意对自己的生活方式做出重大改变？',

  'q2.l0': '担忧但仍抱希望',
  'q2.l1': '担忧且不堪重负',
  'q2.l2': '绝望／认为\n无能为力',
  'q2.l3': '怀疑／反感',
  'q2.l4': '乐观／不太\n担忧',
  'q2.l5': '中立／无感',

  'q3.l0': '技术可解决',
  'q3.l1': '行动可减轻危害',
  'q3.l2': '部分损害\n不可避免',
  'q3.l3': '已经\n太迟了',
  'q3.l4': '人类无法\n改变',
  'q3.l5': '不确定',

  'q4.l0': '1 – 从不',
  'q4.l4': '5 – 总是',
  'q6.l0': '1 – 非常不可能',
  'q6.l4': '5 – 非常可能',
  'q7.l0': '1 – 非常不愿意',
  'q7.l4': '5 – 非常愿意',

  'q5.s0': '担忧并\n反思',
  'q5.s1': '担忧，但与\n个人选择无关',
  'q5.s2': '感到不安／\n回避该话题',
  'q5.s3': '中立／\n无感',
  'q5.s4': '怀疑／\n反感',
  'q5.s5': '没有特别\n的感觉',
  'q5.s6': '从未想过\n这个问题',
  'q5.f0': '担忧并反思',
  'q5.f1': '担忧，但与个人选择无关',
  'q5.f2': '感到不安／回避该话题',
  'q5.f3': '中立／无感',
  'q5.f4': '怀疑／反感',
  'q5.f5': '没有特别的感觉',
  'q5.f6': '从未想过这个问题',

  'note.single': '单选 · {n} 位受访者',
  'note.q4scale': '量表：1 = 从不 → 5 = 总是 · {n} 位受访者',
  'note.q6scale': '量表：1 = 非常不可能 → 5 = 非常可能 · {n} 位受访者',
  'note.q7scale': '量表：1 = 非常不愿意 → 5 = 非常愿意 · {n} 位受访者',
  'note.worryscale': '量表：1 = 完全不担忧 → 10 = 极度担忧 · {n} 位受访者',

  'q8.title': '<span style="font-style:italic;color:var(--teal)">您个人</span>对气候变化有多担忧？',
  'q9.title': '您认为<span style="font-style:italic;color:var(--blue)">社会公众</span>对气候变化有多担忧？',
  'q10.title': '您认为<span style="font-style:italic;color:var(--amber)">船上的其他客人</span>对气候变化有多担忧？',
  'strip.mean': '均值',
  'strip.median': '中位数',
  'strip.sd': '标准差',
  'strip.mode': '众数',
  'strip.shape': '分布形态',
  'shape.q8': '偏高端',
  'shape.q9': '较均衡',
  'shape.q10': '略偏高',
  'q8.note': '<strong>回答明显集中在高分一端。</strong>{pct}% 的受访者打了 9 分或 10 分，分布的尾部远远向左延伸——极少有人表示担忧程度较低。拟合曲线显示了该分布与对称钟形之间的偏离程度，反映出选择前往极地旅行者强烈的个人关切。',
  'q9.note': '<strong>三者中最均衡的分布。</strong>回答相对均匀地分布在中间区域——均值与中位数均在 {mean} 左右——没有明显偏向任何一端。受访者认为社会公众的担忧程度远低于自己：平均相差 {gap} 分。',
  'q10.note': '<strong>回答偏向高分一端，</strong>峰值出现在 {mode} 分，向低分方向的尾部较长。船上其他客人被认为比社会公众更具气候意识（平均高出 {gapGP} 分），但仍比受访者本人的担忧程度低 {gapSG} 分。',

  'comb.tag': '第8 · 9 · 10题 — 综合视图',
  'comb.title': '担忧落差：自己、同船客人与社会公众',
  'comb.note': '三条分布均以平滑频率曲线绘制于同一坐标轴（占受访者百分比）· 悬停可查看数值',
  'overlap.ds8': '第8题 – 个人担忧（μ = {m}）',
  'overlap.ds10': '第10题 – 同船客人（μ = {m}）',
  'overlap.ds9': '第9题 – 社会公众（μ = {m}）',
  'overlap.note': '三个群体之间呈现明显的<strong>担忧落差</strong>。个人担忧（绿色）高度集中在高分端（μ = {q8m}）。受访者所认为的公众担忧（蓝色）低了 {gapSP} 分（μ = {q9m}），也是最为对称的分布。受访者所认为的同船客人担忧（琥珀色）介于两者之间（μ = {q10m}）——他们认为同行旅客比普通人更具气候意识（高出 {gapGP} 分），但仍不及自己（低 {gapSG} 分）。这一三层结构在全部 {n} 位受访者{scope}中保持一致。',
  'overlap.scope_cruise': '（本航次）',

  'chart.observed': '实测回答',
  'chart.normal': '拟合正态曲线',
  'chart.obs_tt': ' 实测：{v}（{p}%）',
  'chart.norm_tt': ' 正态曲线：{v}',
  'chart.resp_tt': ' {v} 位受访者（{p}%）',
  'chart.val_tt': ' {v}（{p}%）',
  'axis.n_resp': '受访者人数',
  'axis.worry': '← 完全不担忧                                                          极度担忧 →',
  'axis.pct_resp': '占受访者百分比',
  'overlap.tt': ' {name}：{p}% 的受访者',

  'q11.title': '开放式评论中呈现出哪些主题？',
  'q11.note': '{sub} 条实质性评论 · {blank} 位受访者未填写 · 部分评论涉及多个类别 · 仅统计完整数据集',
  'q11.axis': '评论数量（共 {sub} 条 · 部分涉及多个类别 · 仅统计完整数据集）',
  'q11.tt': ' {n} 条评论提及此主题',
  'q11.tt_one': ' {n} 条评论提及此主题',
  'q11.c0': '政治上的不作为，以及政府／企业发挥引领作用的必要性',
  'q11.c1': '教育、科学素养与公众认知的需求',
  'q11.c2': '个人责任、个人行动与生活方式选择',
  'q11.c3': '怀疑或不确定——属自然周期，并非（仅）由人类造成',
  'q11.c4': '气候变化真实且紧迫——必须立即行动',
  'q11.c5': '对子孙后代的担忧',
  'q11.c6': '个人内心的矛盾——旅行、言行不一与个人影响力的局限',
  'q11.c7': '对绿色技术及其意外后果的疑虑（电动车、电池、人工智能）',

  'glance.d0': '认为气候变化是由人类造成的严重问题',
  'glance.d1': '在听到气候变化的消息时感到“担忧但仍抱希望”',
  'glance.d2': '认为部分损害已不可避免，但仍相信切实行动有意义（第3题）',
  'glance.d3': '个人担忧程度平均分（满分10）——而他们认为社会公众为 {q9m}',
  'glance.d4': '愿意或非常愿意对生活方式做出重大改变（第7题得分 4–5）',

  'demo.title': '受访者人口结构 · n = {n}',
  'demo.vs': '对比全体客人（n={n}）',
  'demo.gender': '性别',
  'demo.female': '女性',
  'demo.male': '男性',
  'demo.notstated': '未填写',
  'demo.agegroup': '年龄组（{year}）',
  'demo.region': '来源地区',
  'demo.leg_survey': '问卷受访者',
  'demo.leg_guests': '船上全体客人',
  'demo.survey': '问卷',
  'demo.guests': '全体客人',

  'cruise.poptitle': '本数据集中的航次',
  'cruise.showall': '显示全部结果',
  'cruise.ongoing': '（进行中）',

  'repr.summary': '代表性',
  'repr.p': '{vpN} 位客人中有 {survN} 位完成了问卷——<strong>参与率为 {rate}%</strong>。受访者的平均年龄<strong>{ageTxt}</strong>（μ = {survAge}，乘客名单为 {vpAge}）。性别方面，{gTxt}（问卷中女性占 {fPct}%，船上为 {vpFPct}%）。',
  'repr.age_same': '与全体客人完全一致',
  'repr.age_older': '比船上全体客人大 {n} 岁',
  'repr.age_older_one': '比船上全体客人大 1 岁',
  'repr.age_younger': '比船上全体客人小 {n} 岁',
  'repr.age_younger_one': '比船上全体客人小 1 岁',
  'repr.gender_match': '与完整乘客名单高度吻合',
  'repr.gender_over': '女性比全体客人高出 {n} 个百分点',
  'repr.gender_under': '女性比全体客人低 {n} 个百分点',
  'repr.bars': '问卷 <strong>{s}%</strong> · 全体客人 <strong>{g}%</strong>',
  'repr.delta_note': 'Δ = 问卷百分比减去乘客名单百分比。正值表示在问卷中占比偏高。',

  'teaser.label': '深入了解',
  'teaser.title': '数据中浮现出四种受访者画像',
  'teaser.info_title': '这些画像是如何得出的',
  'teaser.info_p1': '对所有在 8 个变量上数据完整的受访者进行了 <strong>k-means 聚类</strong>（k=4，100 次初始化）。这 8 个变量为：对气候的看法、情绪反应、对行动前景的判断、对社会变革的现实评估、行动意愿、个人担忧、对公众担忧的感知，以及对同船客人担忧的感知。',
  'teaser.info_p2': '这些画像并非预先设定的类型——它们从数据中自然浮现。四者合计解释了<strong>总方差的 <span data-pc="total"></span>%</strong>（主成分1：<span data-pc="1"></span>%，主成分2：<span data-pc="2"></span>%）。',
  'teaser.info_box': '<strong style="color:var(--ink);">“坚定认同者”是什么意思？</strong><br>第1题请受访者选择最符合自己看法的说法。选择<em>“气候变化是由人类造成的严重问题”</em>的受访者被计为“坚定认同者”。某一画像显示 <strong>0%</strong>，表示该组中无人选择该答案。',
  'teaser.intro': '聚类分析是一种统计方法，它根据受访者在全部问题上回答的相似程度将其分组——事先不对这些组别应有的样貌作任何假设。算法通过寻找组内差异最小、组间差异最大的模式，识别出四种自然形成的画像。这些画像并非互相排斥的类型：它们代表的是一片连续图景中的不同区域。最清晰的发现是：最大的一组（n={n0}）由高度认同、高度担忧的{p0}构成——他们与{p1}（n={n1}）之间的分界线并不在于认同的强度，而在于是否仍相信集体性的改变仍有可能。',
  'teaser.btn': '探索受访者画像',
  'teaser.worry': '个人担忧',
  'teaser.willing': '行动意愿',

  'prof.0.name': '坚定行动者',
  'prof.0.tagline': '警觉、抱有希望且愿意行动',
  'prof.0.drive': '他们的信念与希望并存——既接受了科学结论，又找到了保持行动力而非陷入无力感的方式。他们深切担忧、持续关注，并真切地感到自己能够有所作为。',
  'prof.0.resonates': '认真对待他们的担忧，但不说教。具体的行动、可衡量的承诺，以及对旅行本身矛盾之处的坦诚面对。',
  'prof.1.name': '疲惫认同者',
  'prof.1.tagline': '完全认同——却已心力交瘁',
  'prof.1.drive': '他们的信念与任何其他画像同样坚定，但这份信念已成为负担。他们感到自己的警觉与周遭世界之间存在落差，这种感受会自我强化，令人消耗。',
  'prof.1.resonates': '先给予共鸣，再谈策略。让他们看到有人与自己同样担忧。有边界、可实现的行动比宏大的号召更重要。',
  'prof.2.name': '审慎中间派',
  'prof.2.tagline': '关注并愿意行动——但尚未完全认同',
  'prof.2.drive': '他们在认知上审慎，而非事不关己。他们对成因的不确定是真诚的，同时又切实怀有个人层面的担忧。',
  'prof.2.resonates': '在保持开放态度的同时，给出清晰的行动理由。不要宣称超出他们已接受程度的确定性。',
  'prof.3.name': '疏离怀疑者',
  'prof.3.tagline': '不认同、不为所动，也无意参与讨论',
  'prof.3.drive': '他们持有一套稳定的另类世界观——认为气候变化属于自然的周期现象。他们清楚自己在船上属于少数，但依然不为所动。',
  'prof.3.resonates': '直接说服很难奏效。自然与生物多样性是能够以他们自身逻辑切入的话题。',
  'prof.serious_high': '{p}% 为坚定认同者',
  'prof.serious_mid': '{p}% 为部分认同者',
  'prof.serious_low': '{p}% 认为气候变化情况严重',
  'prof.serious_none': '无人选择“由人类造成的严重问题”',
  'prof.desc': '{serious} · 担忧 {worry}/10 · 意愿 {willing}/5 · n={n}',

  'concl.label': '主要发现',
  'concl.title': '这项调查告诉我们什么',
  'concl.note': '结论基于全部航次的完整数据集。',
  'concl.t1': '高度共识——但并非整齐划一',
  'concl.t2': '关键分歧：希望还是疲惫',
  'concl.t3': '担忧落差——稳定的三层结构',
  'concl.p1': '在 {nc} 个{cruiseWord}的 <strong>{n}</strong> 位受访者中，<strong>{pctSerious}%</strong> 认为气候变化是由人类造成的严重问题，个人担忧程度平均为 <strong>{q8m}/10</strong>。聚类分析显示，最大的一组（n={c0n}，{c0pct}%）是<em>{p0}</em>——高度警觉、抱有希望且愿意行动。另有一个规模较小但同样强烈的群体（n={c1n}，<em>{p1}</em>），担忧程度同样很高，但更倾向于不堪重负或感到无望。两者的分界不在于是否认同，而在于是否仍认为改变有可能发生。',
  'concl.p2': '<em>{p0}</em>（n={c0n}）与<em>{p1}</em>（n={c1n}）两种画像的个人担忧均超过 8/10，坚定认同者比例均超过 85%。区别在于对前景的判断：{p0}依然抱有希望并愿意行动（第7题均值：{c0q7}/5），而{p1}则更倾向于不堪重负、无望或怀疑（第7题均值：{c1q7}/5）。<em>{p2}</em>群体（n={c2n}）既包含对人为成因存疑者，也包含部分认同者：他们仍表现出相当程度的个人担忧（{c2q8}/10）和对行动的开放态度，这种细腻的立场难以简单归为“否认者”。',
  'concl.p3': '受访者将自身的担忧程度定为 <strong>{q8m}/10</strong>——比他们对社会公众的评分（{q9m}/10）高出 <strong>{gapSP}</strong> 分。同船客人被认为比公众更有意识（高 {gapGP} 分，{q10m}/10），但仍比受访者本人的警觉程度低 {gapSG} 分。这一三层结构在全部 {nc} 个{cruiseWord}、全部 {n} 位受访者中保持一致。',
  'concl.p3_theme': '在开放式评论中，{theme}是最主要的主题（{count} 次提及），受访者由此凸显出个人警觉与集体回应之间的落差。',
  'word.cruise_one': '航次',
  'word.cruise_many': '航次',

  'cl.back': '返回调查结果',
  'cl.profiles': '画像',
  'cl.axes': '坐标轴（主成分分析）',
  'cl.axis_note': '<strong style="color:#aaa">→ 横轴（主成分1，<span data-pc="1"></span>%）</strong><br>主要由<em>对气候的看法（第1题）</em>、个人担忧（第8题）、前景判断（第3题）和对社会变革的希望（第6题）决定。越靠右 = 认同越强、个人担忧越高。<br><br><strong style="color:#aaa">↑ 纵轴（主成分2，<span data-pc="2"></span>%）</strong><br>由<em>对社会与同船客人担忧的感知（第9／10题）</em>决定。越靠上 = 对他人的关注越强。<br><br>两轴合计解释了数据中 <strong style="color:#aaa"><span data-pc="total"></span>%</strong> 的方差。',
  'cl.highlight': '突出显示',
  'cl.showall': '显示全部',
  'cl.f_cruise': '航次',
  'cl.f_gender': '性别',
  'cl.f_female': '女性受访者',
  'cl.f_male': '男性受访者',
  'cl.f_age': '年龄',
  'cl.f_under50': '50 岁以下',
  'cl.f_60plus': '60 岁及以上',
  'cl.f_region': '地区',
  'region.anz': '澳大利亚和新西兰',
  'region.europe': '欧洲大陆',
  'region.na': '北美',
  'region.uk': '英国和爱尔兰',
  'region.china': '中国',
  'region.asia': '亚洲和中东',
  'cl.axis_x': '→ 担忧 + 认同',
  'cl.axis_y': '↑ 对他人的关注',
  'cl.tt_nat': '国籍',
  'cl.tt_age': '年龄',
  'cl.tt_gender': '性别',
  'cl.tt_q8': '第8题 个人担忧',
  'cl.tt_q7': '第7题 行动意愿',
  'cl.respondents': '{n} 位受访者',
  'cl.drives': '他们的驱动力',

  'footer.text': '调查：“您如何看待气候变化？” · {nc} 个{cruiseWord}共 {n} 位受访者 · 纸质及在线问卷语言：{langs} · HX Expeditions · 研究由 <a href="https://jeanne-de-lepinay.github.io/en/" target="_blank" rel="noopener" class="author-link">Jeanne de Lépinay</a> 主持',
};

// ═══════════════════════════════════════════════════════════════════════════
// MAPS — values that come from data.js
//
// data.js is NEVER translated. Its English strings are used as lookup keys
// here. If a value is missing from a map, the raw English string from data.js
// is shown instead, so new cruises/nationalities never break the page.
// ═══════════════════════════════════════════════════════════════════════════
var MAP = {

  // demographics[].regions[][0] and vessel_population[].regions[][0]
  region: {
    'Continental Europe': { de: 'Kontinentaleuropa', zh: '欧洲大陆',   fr: 'Europe continentale' },
    'UK & Ireland':       { de: 'GB & Irland',       zh: '英国和爱尔兰', fr: 'R.-U. & Irlande' },
    'North America':      { de: 'Nordamerika',       zh: '北美',       fr: 'Amérique du Nord' },
    'Australia & NZ':     { de: 'Australien & NZ',   zh: '澳大利亚和新西兰', fr: 'Australie & N.-Z.' },
    'China':              { de: 'China',             zh: '中国',       fr: 'Chine' },
    'Other':              { de: 'Andere',            zh: '其他',       fr: 'Autres' },
  },

  // clustering.points[].gender
  gender: {
    'Female':       { de: 'Weiblich',    zh: '女性',   fr: 'Femme' },
    'Male':         { de: 'Männlich',    zh: '男性',   fr: 'Homme' },
    'Non-binary':   { de: 'Nicht-binär', zh: '非二元', fr: 'Non-binaire' },
    'Undisclosed':  { de: 'Keine Angabe', zh: '未透露', fr: 'Non communiqué' },
    '(not marked)': { de: '(nicht angekreuzt)', zh: '（未填写）', fr: '(non renseigné)' },
  },

  // meta.cruises[].languages and meta.languages (split on ' · ')
  language: {
    'English': { de: 'Englisch', zh: '英语', fr: 'anglais' },
    'German':  { de: 'Deutsch',  zh: '德语', fr: 'allemand' },
    'French':  { de: 'Französisch', zh: '法语', fr: 'français' },
    'Chinese': { de: 'Chinesisch',  zh: '中文', fr: 'chinois' },
    'Spanish': { de: 'Spanisch',    zh: '西班牙语', fr: 'espagnol' },
  },

  // meta.cruises[].label — intentionally EMPTY.
  // Cruise and itinerary names are left in English in every language, since
  // they are HX product names. To translate one anyway, add a line here:
  //   'Sublime Svalbard': { de: '…', zh: '…', fr: '…' },
  // The ship name after the em-dash is never translated.
  itinerary: {},


  // clustering.points[].nationality
  nationality: {
    'Argentina':      { de: 'Argentinien',   zh: '阿根廷',   fr: 'Argentine' },
    'Australia':      { de: 'Australien',    zh: '澳大利亚', fr: 'Australie' },
    'Australian':     { de: 'Australien',    zh: '澳大利亚', fr: 'Australie' },
    'Austria':        { de: 'Österreich',    zh: '奥地利',   fr: 'Autriche' },
    'Belgium':        { de: 'Belgien',       zh: '比利时',   fr: 'Belgique' },
    'Canada':         { de: 'Kanada',        zh: '加拿大',   fr: 'Canada' },
    'China':          { de: 'China',         zh: '中国',     fr: 'Chine' },
    'Colombia':       { de: 'Kolumbien',     zh: '哥伦比亚', fr: 'Colombie' },
    'Denmark':        { de: 'Dänemark',      zh: '丹麦',     fr: 'Danemark' },
    'Egypt':          { de: 'Ägypten',       zh: '埃及',     fr: 'Égypte' },
    'Finland':        { de: 'Finnland',      zh: '芬兰',     fr: 'Finlande' },
    'France':         { de: 'Frankreich',    zh: '法国',     fr: 'France' },
    'Germany':        { de: 'Deutschland',   zh: '德国',     fr: 'Allemagne' },
    'India':          { de: 'Indien',        zh: '印度',     fr: 'Inde' },
    'Indonesia':      { de: 'Indonesien',    zh: '印度尼西亚', fr: 'Indonésie' },
    'Ireland':        { de: 'Irland',        zh: '爱尔兰',   fr: 'Irlande' },
    'Israel':         { de: 'Israel',        zh: '以色列',   fr: 'Israël' },
    'Italy':          { de: 'Italien',       zh: '意大利',   fr: 'Italie' },
    'Japan':          { de: 'Japan',         zh: '日本',     fr: 'Japon' },
    'Jordan':         { de: 'Jordanien',     zh: '约旦',     fr: 'Jordanie' },
    'Luxembourg':     { de: 'Luxemburg',     zh: '卢森堡',   fr: 'Luxembourg' },
    'Mexico':         { de: 'Mexiko',        zh: '墨西哥',   fr: 'Mexique' },
    'Netherlands':    { de: 'Niederlande',   zh: '荷兰',     fr: 'Pays-Bas' },
    'The Netherlands':{ de: 'Niederlande',   zh: '荷兰',     fr: 'Pays-Bas' },
    'New Zealand':    { de: 'Neuseeland',    zh: '新西兰',   fr: 'Nouvelle-Zélande' },
    'Norway':         { de: 'Norwegen',      zh: '挪威',     fr: 'Norvège' },
    'Poland':         { de: 'Polen',         zh: '波兰',     fr: 'Pologne' },
    'Portugal':       { de: 'Portugal',      zh: '葡萄牙',   fr: 'Portugal' },
    'Saudi Arabia':   { de: 'Saudi-Arabien', zh: '沙特阿拉伯', fr: 'Arabie saoudite' },
    'Singapore':      { de: 'Singapur',      zh: '新加坡',   fr: 'Singapour' },
    'South Korea':    { de: 'Südkorea',      zh: '韩国',     fr: 'Corée du Sud' },
    'Spain':          { de: 'Spanien',       zh: '西班牙',   fr: 'Espagne' },
    'Sweden':         { de: 'Schweden',      zh: '瑞典',     fr: 'Suède' },
    'Switzerland':    { de: 'Schweiz',       zh: '瑞士',     fr: 'Suisse' },
    'Taiwan':         { de: 'Taiwan',        zh: '台湾',     fr: 'Taïwan' },
    'Thailand':       { de: 'Thailand',      zh: '泰国',     fr: 'Thaïlande' },
    'Turkey':         { de: 'Türkei',        zh: '土耳其',   fr: 'Turquie' },
    'UAE':            { de: 'VAE',           zh: '阿联酋',   fr: 'Émirats arabes unis' },
    'UK':             { de: 'Vereinigtes Königreich', zh: '英国', fr: 'Royaume-Uni' },
    'United Kingdom': { de: 'Vereinigtes Königreich', zh: '英国', fr: 'Royaume-Uni' },
    'United States':  { de: 'Vereinigte Staaten', zh: '美国', fr: 'États-Unis' },
    'USA':            { de: 'Vereinigte Staaten', zh: '美国', fr: 'États-Unis' },
    'US':             { de: 'Vereinigte Staaten', zh: '美国', fr: 'États-Unis' },
    '(blank - no nationality written)': { de: '(keine Angabe)', zh: '（未填写）', fr: '(non renseignée)' },
    '': { de: '(keine Angabe)', zh: '（未填写）', fr: '(non renseignée)' },
  },

  // Month abbreviations used in meta.cruises[].dates
  month: {
    Jan: { n: 1,  de: 'Jan.',  fr: 'janv.', en: 'Jan' },
    Feb: { n: 2,  de: 'Feb.',  fr: 'févr.', en: 'Feb' },
    Mar: { n: 3,  de: 'März',  fr: 'mars',  en: 'Mar' },
    Apr: { n: 4,  de: 'Apr.',  fr: 'avr.',  en: 'Apr' },
    May: { n: 5,  de: 'Mai',   fr: 'mai',   en: 'May' },
    Jun: { n: 6,  de: 'Juni',  fr: 'juin',  en: 'Jun' },
    Jul: { n: 7,  de: 'Juli',  fr: 'juil.', en: 'Jul' },
    Aug: { n: 8,  de: 'Aug.',  fr: 'août',  en: 'Aug' },
    Sep: { n: 9,  de: 'Sep.',  fr: 'sept.', en: 'Sep' },
    Oct: { n: 10, de: 'Okt.',  fr: 'oct.',  en: 'Oct' },
    Nov: { n: 11, de: 'Nov.',  fr: 'nov.',  en: 'Nov' },
    Dec: { n: 12, de: 'Dez.',  fr: 'déc.',  en: 'Dec' },
  },
};

// Canonical Q1 / Q2 answer texts as written in data.js (used for the cluster
// tooltip, where the raw value may combine two answers).
var ANSWER_MATCH = {
  q1: [
    ['Climate change is a serious human-caused problem', 'q1.l0'],
    ['Climate change is real, but its causes or impacts are uncertain', 'q1.l1'],
    ['Climate change is happening regardless of human action', 'q1.l2'],
    ['Climate change is overstated', 'q1.l3'],
    ['Climate change is not happening', 'q1.l4'],
  ],
  q2: [
    ['Concerned but hopeful', 'q2.l0'],
    ['Concerned but overwhelmed', 'q2.l1'],
    ['Hopeless / nothing can be done', 'q2.l2'],
    ['Skeptical / annoyed', 'q2.l3'],
    ['Positive / Hopeful / not too concerned', 'q2.l4'],
    ['Neutral or emotionally detached', 'q2.l5'],
    ['Neutral / Detached', 'q2.l5'],
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// RUNTIME
// ═══════════════════════════════════════════════════════════════════════════
var LANG = 'en';

function getLang() { return LANG; }

// French and German put a non-breaking space before the percent sign.
// Use this instead of `value + '%'` anywhere a percentage is written out.
function pctStr(v) {
  var sep = (LANG === 'fr' || LANG === 'de') ? '\u00a0%' : '%';
  return nl(v) + sep;
}

// German and French write decimals with a comma. Applied to any value that is
// a plain decimal number; integers and text are returned untouched.
function nl(v) {
  if (v === undefined || v === null) return v;
  if (LANG !== 'de' && LANG !== 'fr') return v;
  return String(v).replace(/^(-?\d+)\.(\d+)$/, '$1,$2');
}

// Substitute {placeholders}. Numeric values are localised on the way in.
function fmt(str, vars) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, function (m, k) {
    return (vars[k] !== undefined && vars[k] !== null) ? nl(vars[k]) : m;
  });
}

// Main lookup. Falls back to English, then to the key itself.
function t(key, vars) {
  var dict = T[LANG] || T.en;
  var s = dict[key];
  if (s === undefined) s = T.en[key];
  if (s === undefined) { console.warn('[i18n] missing key:', key); return key; }
  return fmt(s, vars);
}

// Look up a data.js value in a MAP; fall back to the raw English value.
function tMap(mapName, value) {
  if (value === undefined || value === null) return value;
  if (LANG === 'en') return value;
  var row = MAP[mapName] && MAP[mapName][value];
  return (row && row[LANG]) ? row[LANG] : value;
}

function tRegion(v) { return tMap('region', v); }
function tGender(v) { return tMap('gender', v); }

function tNationality(v) {
  if (LANG === 'en') return v;
  if (MAP.nationality[v]) return MAP.nationality[v][LANG] || v;
  // Handle dual nationalities like "Germany / Australia"
  if (v && v.indexOf('/') > -1) {
    return v.split('/').map(function (p) { return tNationality(p.trim()); }).join(' / ');
  }
  return v;
}

// "English · Chinese · German" → localised, same separator
function tLanguages(str) {
  if (!str) return str;
  if (LANG === 'en') return str;
  return str.split(' · ').map(function (l) { return tMap('language', l.trim()); }).join(' · ');
}

// "Highlights of Antarctica — MS Fridtjof Nansen" → itinerary translated,
// ship name preserved.
function tCruiseLabel(label) {
  if (!label || LANG === 'en') return label;
  var parts = label.split('—');
  var itin = parts[0].trim();
  var rest = parts.slice(1).join('—').trim();
  var translated = tMap('itinerary', itin);
  return rest ? translated + ' — ' + rest : translated;
}

// "18 Feb – 28 Feb 2026" → localised. Falls back to the raw string if the
// format is not recognised.
function tDates(str) {
  if (!str || LANG === 'en') return str;
  var m = str.match(/^(\d{1,2})\s+([A-Za-z]{3})\s*[–-]\s*(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/);
  if (!m) return str;
  var d1 = m[1], mo1 = MAP.month[m[2]], d2 = m[3], mo2 = MAP.month[m[4]], yr = m[5];
  if (!mo1 || !mo2) return str;
  if (LANG === 'zh') return yr + '年' + mo1.n + '月' + d1 + '日 – ' + mo2.n + '月' + d2 + '日';
  if (LANG === 'de') return d1 + '. ' + mo1.de + ' – ' + d2 + '. ' + mo2.de + ' ' + yr;
  if (LANG === 'fr') return d1 + ' ' + mo1.fr + ' – ' + d2 + ' ' + mo2.fr + ' ' + yr;
  return str;
}

// Raw Q1/Q2 value from clustering.points → short translated label(s).
function tAnswer(which, raw) {
  if (!raw) return '';
  var hits = [];
  ANSWER_MATCH[which].forEach(function (pair) {
    if (raw.indexOf(pair[0]) > -1 && hits.indexOf(pair[1]) < 0) hits.push(pair[1]);
  });
  if (!hits.length) return raw;
  return hits.map(function (k) { return t(k).replace(/\n/g, ' '); }).join(' / ');
}

// ── Static HTML ────────────────────────────────────────────────────────────
function applyStatic() {
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
    el.innerHTML = t(el.getAttribute('data-i18n-html'));
  });
  document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
    el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
  });
  document.title = t('meta.title');
  fillPcVar();
}

// Fill every <span data-pc="1|2|total"> from SD.clustering.pc_var so the
// explained-variance figures update automatically when the model is rerun.
function fillPcVar() {
  var pv = (window.SD && window.SD.clustering && window.SD.clustering.pc_var) || null;
  if (!pv) return;
  var vals = {
    '1': (pv[0] * 100).toFixed(1),
    '2': (pv[1] * 100).toFixed(1),
    'total': ((pv[0] + pv[1]) * 100).toFixed(1),
  };
  document.querySelectorAll('[data-pc]').forEach(function (el) {
    var v = vals[el.getAttribute('data-pc')];
    if (v !== undefined) el.textContent = v;
  });
}

// ── Chinese webfont (loaded on demand only) ────────────────────────────────
var _cjkLoaded = false;
function loadCjkFont() {
  if (_cjkLoaded) return;
  _cjkLoaded = true;
  var l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap';
  document.head.appendChild(l);
}

// ── Language switch ────────────────────────────────────────────────────────
function setLang(code, opts) {
  if (!T[code]) code = 'en';
  LANG = code;
  window.LANG = code;
  document.documentElement.lang = (code === 'zh' ? 'zh-Hans' : code);
  document.body.setAttribute('data-lang', code);
  if (code === 'zh') loadCjkFont();

  applyStatic();

  // Reflect the choice in the flag switcher
  document.querySelectorAll('.lang-btn').forEach(function (b) {
    b.classList.toggle('active', b.getAttribute('data-lang') === code);
    b.setAttribute('aria-current', b.getAttribute('data-lang') === code ? 'true' : 'false');
  });

  // Re-render everything that JavaScript writes
  if (window.rebuildProfiles) window.rebuildProfiles();
  if (window.renderAll) window.renderAll();
  if (window.updateDemoDropdown) window.updateDemoDropdown();
  if (window.rebuildCluster) window.rebuildCluster();

  if (!opts || !opts.silent) {
    // Keep the URL shareable and remember the choice for next visit
    try {
      var u = new URL(window.location.href);
      if (code === 'en') u.searchParams.delete('lang'); else u.searchParams.set('lang', code);
      history.replaceState(null, '', u.toString());
    } catch (e) { /* file:// or old browser — ignore */ }
    try { localStorage.setItem('survey-lang', code); } catch (e) { /* private mode — ignore */ }
  }
}

// Initial language: ?lang= → saved choice → browser language → English
function initialLang() {
  try {
    var q = new URL(window.location.href).searchParams.get('lang');
    if (q && T[q]) return q;
  } catch (e) {}
  try {
    var saved = localStorage.getItem('survey-lang');
    if (saved && T[saved]) return saved;
  } catch (e) {}
  var nav = (navigator.language || 'en').toLowerCase();
  if (nav.indexOf('de') === 0) return 'de';
  if (nav.indexOf('fr') === 0) return 'fr';
  if (nav.indexOf('zh') === 0) return 'zh';
  return 'en';
}

// ── Flag switcher ──────────────────────────────────────────────────────────
function buildLangSwitcher() {
  var wrap = document.getElementById('langSwitcher');
  if (!wrap) return;
  wrap.innerHTML = window.LANGS.map(function (l) {
    return '<button class="lang-btn" data-lang="' + l.code + '" type="button" lang="' + l.code + '" '
      + 'title="' + l.name + '" aria-label="' + l.name + '">'
      + '<span class="lang-flag" aria-hidden="true">' + l.flag + '</span>'
      + '<span class="lang-code">' + l.label + '</span></button>';
  }).join('');
  wrap.querySelectorAll('.lang-btn').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
}

// Expose
window.t = t;
window.nl = nl;
window.pctStr = pctStr;
window.fmt = fmt;
window.getLang = getLang;
window.setLang = setLang;
window.tRegion = tRegion;
window.tGender = tGender;
window.tNationality = tNationality;
window.tLanguages = tLanguages;
window.tCruiseLabel = tCruiseLabel;
window.tDates = tDates;
window.tAnswer = tAnswer;
window.applyStatic = applyStatic;
window.fillPcVar = fillPcVar;
window.buildLangSwitcher = buildLangSwitcher;
window.initialLang = initialLang;
window.I18N_T = T;

// Set the language variable early so app.js renders in the right language on
// its very first pass. The DOM work happens once the page is parsed.
LANG = initialLang();
window.LANG = LANG;
