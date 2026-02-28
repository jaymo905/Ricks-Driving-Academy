/* ============================================================
   questions.js — 140 Ontario G1 Questions
   80 rules + 40 signs + 20 scenarios
   ============================================================ */

/* ---- Sign SVG templates ---- */
const SVG = {
  stop: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="29,10 71,10 90,29 90,71 71,90 29,90 10,71 10,29" fill="#CC0000" stroke="#fff" stroke-width="2"/>
    <text x="50" y="57" text-anchor="middle" fill="white" font-size="18" font-weight="bold" font-family="Arial">STOP</text>
  </svg>`,

  yield: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,8 92,88 8,88" fill="white" stroke="#CC0000" stroke-width="5"/>
    <polygon points="50,22 80,78 20,78" fill="white" stroke="#CC0000" stroke-width="2"/>
    <text x="50" y="65" text-anchor="middle" fill="#CC0000" font-size="13" font-weight="bold" font-family="Arial">YIELD</text>
  </svg>`,

  speedLimit50: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="90" height="90" rx="8" fill="white" stroke="#333" stroke-width="3"/>
    <text x="50" y="35" text-anchor="middle" fill="#333" font-size="11" font-family="Arial">SPEED</text>
    <text x="50" y="48" text-anchor="middle" fill="#333" font-size="11" font-family="Arial">LIMIT</text>
    <text x="50" y="78" text-anchor="middle" fill="#CC0000" font-size="32" font-weight="bold" font-family="Arial">50</text>
  </svg>`,

  speedLimit80: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="90" height="90" rx="8" fill="white" stroke="#333" stroke-width="3"/>
    <text x="50" y="35" text-anchor="middle" fill="#333" font-size="11" font-family="Arial">SPEED</text>
    <text x="50" y="48" text-anchor="middle" fill="#333" font-size="11" font-family="Arial">LIMIT</text>
    <text x="50" y="78" text-anchor="middle" fill="#CC0000" font-size="32" font-weight="bold" font-family="Arial">80</text>
  </svg>`,

  schoolZone: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="90" height="90" rx="4" fill="#FFD700" stroke="#333" stroke-width="2" transform="rotate(45 50 50)" />
    <text x="50" y="45" text-anchor="middle" fill="#333" font-size="10" font-weight="bold" font-family="Arial">SCHOOL</text>
    <text x="50" y="58" text-anchor="middle" fill="#333" font-size="10" font-weight="bold" font-family="Arial">ZONE</text>
  </svg>`,

  warning: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="80" height="80" rx="4" fill="#FFD700" stroke="#333" stroke-width="2" transform="rotate(45 50 50)"/>
    <text x="50" y="55" text-anchor="middle" fill="#333" font-size="40" font-weight="bold" font-family="Arial">!</text>
  </svg>`,

  noEntry: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="44" fill="#CC0000" stroke="#fff" stroke-width="3"/>
    <rect x="18" y="42" width="64" height="16" rx="3" fill="white"/>
  </svg>`,

  doNotPass: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="90" height="90" rx="8" fill="white" stroke="#333" stroke-width="3"/>
    <text x="50" y="38" text-anchor="middle" fill="#333" font-size="10" font-weight="bold" font-family="Arial">DO NOT</text>
    <text x="50" y="54" text-anchor="middle" fill="#CC0000" font-size="12" font-weight="bold" font-family="Arial">PASS</text>
  </svg>`,

  railroad: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="44" fill="#FFD700" stroke="#333" stroke-width="3"/>
    <line x1="25" y1="25" x2="75" y2="75" stroke="#333" stroke-width="8" stroke-linecap="round"/>
    <line x1="75" y1="25" x2="25" y2="75" stroke="#333" stroke-width="8" stroke-linecap="round"/>
    <text x="50" y="55" text-anchor="middle" fill="#333" font-size="18" font-weight="bold" font-family="Arial">RR</text>
  </svg>`,

  pedestrianXing: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="80" height="80" rx="4" fill="#FFD700" stroke="#333" stroke-width="2" transform="rotate(45 50 50)"/>
    <circle cx="50" cy="34" r="6" fill="#333"/>
    <line x1="50" y1="40" x2="50" y2="62" stroke="#333" stroke-width="4"/>
    <line x1="38" y1="52" x2="62" y2="52" stroke="#333" stroke-width="4"/>
    <line x1="50" y1="62" x2="42" y2="76" stroke="#333" stroke-width="4"/>
    <line x1="50" y1="62" x2="58" y2="76" stroke="#333" stroke-width="4"/>
  </svg>`,

  oneWay: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="30" width="90" height="40" rx="5" fill="#333"/>
    <text x="50" y="57" text-anchor="middle" fill="white" font-size="16" font-weight="bold" font-family="Arial">ONE WAY</text>
    <polygon points="70,20 90,50 70,80" fill="#333"/>
  </svg>`,

  noParking: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="44" fill="white" stroke="#CC0000" stroke-width="5"/>
    <text x="50" y="62" text-anchor="middle" fill="#1a4fa0" font-size="42" font-weight="bold" font-family="Arial">P</text>
    <line x1="18" y1="18" x2="82" y2="82" stroke="#CC0000" stroke-width="7"/>
  </svg>`,

  merge: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="80" height="80" rx="4" fill="#FFD700" stroke="#333" stroke-width="2" transform="rotate(45 50 50)"/>
    <line x1="50" y1="28" x2="50" y2="72" stroke="#333" stroke-width="4"/>
    <line x1="28" y1="50" x2="50" y2="28" stroke="#333" stroke-width="4"/>
    <line x1="72" y1="50" x2="50" y2="28" stroke="#333" stroke-width="4"/>
  </svg>`,

  construction: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,8 92,88 8,88" fill="#FF6600" stroke="#333" stroke-width="2"/>
    <text x="50" y="72" text-anchor="middle" fill="white" font-size="38" font-weight="bold" font-family="Arial">!</text>
  </svg>`,

  keepRight: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="90" height="90" rx="8" fill="white" stroke="#333" stroke-width="3"/>
    <text x="50" y="40" text-anchor="middle" fill="#333" font-size="10" font-weight="bold" font-family="Arial">KEEP</text>
    <text x="50" y="54" text-anchor="middle" fill="#333" font-size="10" font-weight="bold" font-family="Arial">RIGHT</text>
    <polygon points="40,65 70,65 55,82" fill="#333"/>
  </svg>`,

  slippery: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="80" height="80" rx="4" fill="#FFD700" stroke="#333" stroke-width="2" transform="rotate(45 50 50)"/>
    <text x="50" y="58" text-anchor="middle" fill="#333" font-size="28" font-weight="bold" font-family="Arial">~</text>
  </svg>`
};

/* ============================================================
   QUESTIONS ARRAY (140 total)
   ============================================================ */

const QUESTIONS = [

  /* ================================================================
     RULES — Following Distance (R001–R006)
     ================================================================ */
  {
    id: 'R001', category: 'rules', topic: 'following-distance', difficulty: 1,
    question: 'What is the minimum following distance recommended behind the vehicle ahead?',
    options: ['1 second', '2 seconds', '3 seconds', '5 seconds'],
    answer: 2, signSvg: null, rickTopic: 'following-distance',
    rickHint: 'Think about reaction time plus braking distance at highway speeds.'
  },
  {
    id: 'R002', category: 'rules', topic: 'following-distance', difficulty: 2,
    question: 'In poor weather conditions, how should you adjust your following distance?',
    options: ['Keep it the same', 'Reduce it to 2 seconds', 'Double it to at least 6 seconds', 'Increase to 4 seconds'],
    answer: 2, signSvg: null, rickTopic: 'following-distance',
    rickHint: 'Wet or icy roads increase stopping distance. The gap needs to increase too.'
  },
  {
    id: 'R003', category: 'rules', topic: 'following-distance', difficulty: 2,
    question: 'How do you measure a 3-second following distance?',
    options: [
      'Count car lengths between you and the vehicle ahead',
      'When the vehicle passes a fixed point, count 3 seconds before you reach it',
      'Stay 10 metres behind at all times',
      'Keep pace with surrounding traffic'
    ],
    answer: 1, signSvg: null, rickTopic: 'following-distance',
    rickHint: 'Pick a fixed landmark — a sign, a crack in the road. Start counting when the car ahead passes it.'
  },
  {
    id: 'R004', category: 'rules', topic: 'following-distance', difficulty: 3,
    question: 'At 100 km/h, approximately how many metres does your car travel per second?',
    options: ['10 metres', '17 metres', '27 metres', '40 metres'],
    answer: 2, signSvg: null, rickTopic: 'following-distance',
    rickHint: '100 km/h divided by 3.6 equals metres per second. Do the math.'
  },
  {
    id: 'R005', category: 'rules', topic: 'following-distance', difficulty: 2,
    question: 'When should you increase your following distance beyond 3 seconds?',
    options: [
      'Only in heavy rain',
      'When following motorcycles, large trucks, or in bad weather',
      'Only when driving at highway speeds',
      'Never — 3 seconds is always sufficient'
    ],
    answer: 1, signSvg: null, rickTopic: 'following-distance',
    rickHint: 'Large trucks have blind spots. Motorcycles stop faster. Bad weather extends stopping distance. All three need more space.'
  },
  {
    id: 'R006', category: 'rules', topic: 'following-distance', difficulty: 1,
    question: 'Why is tailgating dangerous?',
    options: [
      'It annoys other drivers',
      'It reduces your reaction time and stopping distance',
      'It is only dangerous at night',
      'It wastes fuel'
    ],
    answer: 1, signSvg: null, rickTopic: 'following-distance',
    rickHint: 'If the car in front stops suddenly, you have almost no time or space to react.'
  },

  /* ================================================================
     RULES — Seatbelts (R007–R012)
     ================================================================ */
  {
    id: 'R007', category: 'rules', topic: 'seatbelts', difficulty: 1,
    question: 'Who is responsible for ensuring passengers under 16 are wearing seatbelts?',
    options: ['The passenger themselves', 'The driver', 'The parent or guardian', 'No one — it is optional'],
    answer: 1, signSvg: null, rickTopic: 'seatbelts',
    rickHint: 'The person behind the wheel is responsible for everyone under 16 in the vehicle.'
  },
  {
    id: 'R008', category: 'rules', topic: 'seatbelts', difficulty: 1,
    question: 'When must you wear a seatbelt in Ontario?',
    options: ['Only on highways', 'At all times when the vehicle is moving', 'Only when going over 60 km/h', 'Only in the front seat'],
    answer: 1, signSvg: null, rickTopic: 'seatbelts',
    rickHint: 'All times. Front seat. Back seat. Highways. Parking lots. All times.'
  },
  {
    id: 'R009', category: 'rules', topic: 'seatbelts', difficulty: 2,
    question: 'What is the fine range for not wearing a seatbelt in Ontario?',
    options: ['$50–$100', '$200–$500', '$1,000–$2,000', 'No fine, only demerit points'],
    answer: 1, signSvg: null, rickTopic: 'seatbelts',
    rickHint: 'It is a significant fine — in the hundreds of dollars — plus demerit points.'
  },
  {
    id: 'R010', category: 'rules', topic: 'seatbelts', difficulty: 2,
    question: 'How should a lap-shoulder seatbelt be worn?',
    options: [
      'Shoulder belt behind you, lap belt across your hips',
      'Shoulder belt across your chest, lap belt low across your hips',
      'Both belts across your stomach',
      'Lap belt only is acceptable'
    ],
    answer: 1, signSvg: null, rickTopic: 'seatbelts',
    rickHint: 'The shoulder belt goes across your chest and collarbone. The lap belt goes low across your hips — not your stomach.'
  },
  {
    id: 'R011', category: 'rules', topic: 'seatbelts', difficulty: 3,
    question: 'A child under what age must be in a rear-facing car seat in Ontario?',
    options: ['1 year', '2 years', 'Until they reach the maximum weight for the seat', 'Until they can walk'],
    answer: 2, signSvg: null, rickTopic: 'seatbelts',
    rickHint: 'It is about the weight limit of the rear-facing seat, not a specific age. Keep them rear-facing as long as possible.'
  },
  {
    id: 'R012', category: 'rules', topic: 'seatbelts', difficulty: 2,
    question: 'If a passenger over 16 refuses to wear a seatbelt, who gets the ticket?',
    options: ['The driver', 'The passenger', 'Both driver and passenger', 'Neither — it is a warning only'],
    answer: 1, signSvg: null, rickTopic: 'seatbelts',
    rickHint: 'Passengers 16 and older are responsible for their own seatbelt. The driver is only responsible for those under 16.'
  },

  /* ================================================================
     RULES — Speed Limits (R013–R018)
     ================================================================ */
  {
    id: 'R013', category: 'rules', topic: 'speed-limits', difficulty: 1,
    question: 'What is the default speed limit in urban areas in Ontario when no sign is posted?',
    options: ['40 km/h', '50 km/h', '60 km/h', '70 km/h'],
    answer: 1, signSvg: null, rickTopic: 'speed-limits',
    rickHint: 'Urban means city streets. No sign posted means the default applies: 50.'
  },
  {
    id: 'R014', category: 'rules', topic: 'speed-limits', difficulty: 1,
    question: 'What is the typical speed limit on provincial highways in Ontario?',
    options: ['80 km/h', '90 km/h', '100 km/h', '110 km/h'],
    answer: 2, signSvg: null, rickTopic: 'speed-limits',
    rickHint: 'Most 400-series highways in Ontario post 100 km/h unless otherwise signed.'
  },
  {
    id: 'R015', category: 'rules', topic: 'speed-limits', difficulty: 2,
    question: 'What speed limit applies in a school zone when the lights are flashing?',
    options: ['30 km/h', '40 km/h', '50 km/h', '60 km/h'],
    answer: 1, signSvg: null, rickTopic: 'school-zones',
    rickHint: '40 km/h — but only when the school zone lights are flashing. When not flashing, the regular limit applies.'
  },
  {
    id: 'R016', category: 'rules', topic: 'speed-limits', difficulty: 2,
    question: 'What is the default speed limit on rural roads (outside urban areas) when no sign is posted?',
    options: ['60 km/h', '70 km/h', '80 km/h', '90 km/h'],
    answer: 2, signSvg: null, rickTopic: 'speed-limits',
    rickHint: 'Rural — outside city limits, no posted sign — defaults to 80 km/h.'
  },
  {
    id: 'R017', category: 'rules', topic: 'speed-limits', difficulty: 2,
    question: 'What happens to fines for speeding in a construction zone?',
    options: ['They stay the same', 'They are reduced', 'They are doubled', 'They are tripled'],
    answer: 2, signSvg: null, rickTopic: 'construction-zones',
    rickHint: 'Construction zones double the fines. Workers are present. The law makes this very clear.'
  },
  {
    id: 'R018', category: 'rules', topic: 'speed-limits', difficulty: 3,
    question: 'Is it legal to drive at the speed limit if road conditions make it unsafe?',
    options: [
      'Yes — the speed limit is the legal maximum',
      'No — you must drive at a safe speed for conditions, even if below the limit',
      'Only if other vehicles are also going that speed',
      'Yes, but only on highways'
    ],
    answer: 1, signSvg: null, rickTopic: 'speed-limits',
    rickHint: 'Speed limits are maximums, not targets. Conditions can require going slower.'
  },

  /* ================================================================
     RULES — Right of Way (R019–R026)
     ================================================================ */
  {
    id: 'R019', category: 'rules', topic: 'right-of-way', difficulty: 1,
    question: 'At a four-way stop, who goes first?',
    options: [
      'The driver going straight',
      'The first vehicle to arrive and stop',
      'The vehicle on the right',
      'The largest vehicle'
    ],
    answer: 1, signSvg: null, rickTopic: 'right-of-way',
    rickHint: 'First to arrive, first to go. If simultaneous arrival, yield to the right.'
  },
  {
    id: 'R020', category: 'rules', topic: 'right-of-way', difficulty: 2,
    question: 'Two vehicles arrive at a four-way stop at exactly the same time. Who has the right of way?',
    options: [
      'The driver going straight',
      'The driver turning left',
      'The driver on the right',
      'The driver on the left'
    ],
    answer: 2, signSvg: null, rickTopic: 'right-of-way',
    rickHint: 'When in doubt at a simultaneous stop: yield to the right.'
  },
  {
    id: 'R021', category: 'rules', topic: 'right-of-way', difficulty: 2,
    question: 'When turning left at an intersection, you must yield to:',
    options: [
      'Nobody — you have the right of way',
      'Oncoming traffic and pedestrians',
      'Only pedestrians',
      'Only vehicles turning right'
    ],
    answer: 1, signSvg: null, rickTopic: 'right-of-way',
    rickHint: 'Left turns are the most dangerous turn. You cross oncoming traffic. They have the right of way.'
  },
  {
    id: 'R022', category: 'rules', topic: 'right-of-way', difficulty: 2,
    question: 'At an uncontrolled intersection (no signs or signals), who has the right of way?',
    options: [
      'The vehicle on the right',
      'The vehicle on the left',
      'The vehicle going straight',
      'The vehicle that arrived first'
    ],
    answer: 0, signSvg: null, rickTopic: 'right-of-way',
    rickHint: 'No signs, no signals — yield to the vehicle on your RIGHT.'
  },
  {
    id: 'R023', category: 'rules', topic: 'right-of-way', difficulty: 1,
    question: 'When must you yield to pedestrians?',
    options: [
      'Only at marked crosswalks',
      'At all crosswalks — marked and unmarked — and when they are in the intersection',
      'Only when they are crossing on a green light',
      'Never — vehicles have the right of way'
    ],
    answer: 1, signSvg: null, rickTopic: 'right-of-way',
    rickHint: 'Pedestrians at any crosswalk, marked or not. When they step off the curb, you stop.'
  },
  {
    id: 'R024', category: 'rules', topic: 'right-of-way', difficulty: 2,
    question: 'You are pulling out of a private driveway onto a road. Who has the right of way?',
    options: [
      'You do, if no cars are coming',
      'Vehicles and pedestrians already on the road',
      'You, because you were there first',
      'The vehicle coming from the left'
    ],
    answer: 1, signSvg: null, rickTopic: 'right-of-way',
    rickHint: 'Entering traffic from a driveway — you yield to everything already on the road.'
  },
  {
    id: 'R025', category: 'rules', topic: 'right-of-way', difficulty: 3,
    question: 'A pedestrian is crossing at a crosswalk. You are turning right on a green light. What do you do?',
    options: [
      'Proceed — you have the green',
      'Yield to the pedestrian',
      'Honk to warn the pedestrian',
      'Proceed quickly before the pedestrian reaches your path'
    ],
    answer: 1, signSvg: null, rickTopic: 'right-of-way',
    rickHint: 'Green light means go for vehicles. Pedestrians crossing legally still have the right of way over turning vehicles.'
  },
  {
    id: 'R026', category: 'rules', topic: 'right-of-way', difficulty: 2,
    question: 'A funeral procession is passing through. What should you do?',
    options: [
      'Proceed normally',
      'Yield to the entire procession until it passes',
      'Pull over only if they have an escort',
      'Honk to let them know you are there'
    ],
    answer: 1, signSvg: null, rickTopic: 'right-of-way',
    rickHint: 'Funeral processions stay together. In Ontario, you yield to the entire procession once it has started moving.'
  },

  /* ================================================================
     RULES — School Buses (R027–R031)
     ================================================================ */
  {
    id: 'R027', category: 'rules', topic: 'school-buses', difficulty: 1,
    question: 'A school bus has its red lights flashing. What must you do?',
    options: [
      'Slow to 40 km/h and proceed',
      'Stop and wait until the lights stop flashing',
      'Proceed if no children are visible',
      'Only stop if you are behind the bus'
    ],
    answer: 1, signSvg: null, rickTopic: 'school-buses',
    rickHint: 'Red lights flashing on a school bus means STOP — completely — and wait.'
  },
  {
    id: 'R028', category: 'rules', topic: 'school-buses', difficulty: 2,
    question: 'You are driving in the opposite direction of a stopped school bus with flashing red lights. There is no median. What do you do?',
    options: [
      'Proceed — you are on the opposite side',
      'Slow to 20 km/h and proceed',
      'Stop — both directions must stop without a median',
      'Stop only if children are crossing the road'
    ],
    answer: 2, signSvg: null, rickTopic: 'school-buses',
    rickHint: 'No median = both directions stop. A median separating the road is the only exception.'
  },
  {
    id: 'R029', category: 'rules', topic: 'school-buses', difficulty: 2,
    question: 'A raised median separates a school bus (red lights flashing) from your lane of traffic. What do you do?',
    options: [
      'Stop anyway — always stop for school buses',
      'Proceed — the median exempts you from stopping',
      'Slow to 20 km/h',
      'Stop and wait 5 seconds then proceed'
    ],
    answer: 1, signSvg: null, rickTopic: 'school-buses',
    rickHint: 'A physical raised median means traffic on your side does not need to stop — only the side with the bus stops.'
  },
  {
    id: 'R030', category: 'rules', topic: 'school-buses', difficulty: 1,
    question: 'When can you proceed past a stopped school bus?',
    options: [
      'When the bus driver waves you on',
      'When you can see no children',
      'When the red lights stop flashing and the stop arm retracts',
      'After 30 seconds of waiting'
    ],
    answer: 2, signSvg: null, rickTopic: 'school-buses',
    rickHint: 'The red lights stopping AND the stop arm retracting are both required signals to proceed.'
  },
  {
    id: 'R031', category: 'rules', topic: 'school-buses', difficulty: 3,
    question: 'What is the fine for illegally passing a stopped school bus?',
    options: ['$200', '$400–$2,000', '$100–$500', '$5,000'],
    answer: 1, signSvg: null, rickTopic: 'school-buses',
    rickHint: 'It is one of the highest fines in Ontario traffic law — in the range of $400 to $2,000 for a first offence.'
  },

  /* ================================================================
     RULES — Railroad Crossings (R032–R035)
     ================================================================ */
  {
    id: 'R032', category: 'rules', topic: 'railroad-crossings', difficulty: 1,
    question: 'What must you do when red lights at a railroad crossing begin to flash?',
    options: [
      'Slow down and proceed carefully',
      'Stop and wait until the lights stop flashing and the track is clear',
      'Speed up to clear the crossing before the train',
      'Proceed if you can see the train is far away'
    ],
    answer: 1, signSvg: null, rickTopic: 'railroad-crossings',
    rickHint: 'Flashing red at a rail crossing: stop, and wait until lights stop AND the crossing is completely clear.'
  },
  {
    id: 'R033', category: 'rules', topic: 'railroad-crossings', difficulty: 2,
    question: 'After the lights stop flashing at a railroad crossing, what should you do before proceeding?',
    options: [
      'Proceed immediately',
      'Wait 5 seconds then go',
      'Make sure the track is completely clear — a second train may be coming',
      'Look both directions and proceed slowly'
    ],
    answer: 2, signSvg: null, rickTopic: 'railroad-crossings',
    rickHint: 'Multiple trains can use the same crossing. Even after lights stop, confirm the track is completely clear.'
  },
  {
    id: 'R034', category: 'rules', topic: 'railroad-crossings', difficulty: 2,
    question: 'Where must you stop at a railroad crossing with flashing lights but no gate?',
    options: [
      'On the tracks to look both ways',
      'At least 5 metres from the nearest rail',
      'At least 15 metres from the nearest rail',
      'At the edge of the road'
    ],
    answer: 1, signSvg: null, rickTopic: 'railroad-crossings',
    rickHint: 'Stop at least 5 metres back from the nearest rail to give the train enough clearance.'
  },
  {
    id: 'R035', category: 'rules', topic: 'railroad-crossings', difficulty: 3,
    question: 'Your vehicle stalls on railroad tracks. What do you do?',
    options: [
      'Stay in the car and try to restart it',
      'Get out immediately and move away from the tracks at an angle toward the oncoming train',
      'Get out and stand beside the car',
      'Stay and use your hazard lights'
    ],
    answer: 1, signSvg: null, rickTopic: 'railroad-crossings',
    rickHint: 'Get out fast. Move away at an angle TOWARD the oncoming train — debris is thrown forward, not back.'
  },

  /* ================================================================
     RULES — Emergency Vehicles (R036–R039)
     ================================================================ */
  {
    id: 'R036', category: 'rules', topic: 'emergency-vehicles', difficulty: 1,
    question: 'An ambulance with flashing lights and sirens is approaching from behind. What do you do?',
    options: [
      'Speed up to get out of the way faster',
      'Pull to the right and stop until it passes',
      'Stop in your lane',
      'Continue at the same speed and let it pass'
    ],
    answer: 1, signSvg: null, rickTopic: 'emergency-vehicles',
    rickHint: 'Pull RIGHT, stop. Wait until the emergency vehicle passes completely.'
  },
  {
    id: 'R037', category: 'rules', topic: 'emergency-vehicles', difficulty: 2,
    question: 'You are at an intersection on a green light when an emergency vehicle approaches with lights and siren. What do you do?',
    options: [
      'Proceed through — you have the right of way',
      'Stop in the intersection until it passes',
      'Clear the intersection, then pull right and stop',
      'Turn left to get out of the way'
    ],
    answer: 2, signSvg: null, rickTopic: 'emergency-vehicles',
    rickHint: 'Clear the intersection first (stopping in one is dangerous), then pull right and stop.'
  },
  {
    id: 'R038', category: 'rules', topic: 'emergency-vehicles', difficulty: 2,
    question: 'What is the "Slow Down, Move Over" law in Ontario?',
    options: [
      'Slow to 40 km/h when passing cyclists',
      'Move over one lane and slow down when passing stopped emergency vehicles on the roadside',
      'Slow to 20 km/h in school zones',
      'Move right for all emergency vehicles, even if on a different road'
    ],
    answer: 1, signSvg: null, rickTopic: 'emergency-vehicles',
    rickHint: 'When passing a stopped police car, ambulance, or tow truck on the roadside — move over a lane and slow down.'
  },
  {
    id: 'R039', category: 'rules', topic: 'emergency-vehicles', difficulty: 2,
    question: 'How close can you follow an emergency vehicle when it is responding to a call?',
    options: ['25 metres', '50 metres', '100 metres', '150 metres'],
    answer: 2, signSvg: null, rickTopic: 'emergency-vehicles',
    rickHint: 'Stay at least 150 metres behind an emergency vehicle responding to a call. Answer is 150.'
  },

  /* ================================================================
     RULES — Cell Phones / Distracted Driving (R040–R044)
     ================================================================ */
  {
    id: 'R040', category: 'rules', topic: 'cell-phones', difficulty: 1,
    question: 'Can you use a hand-held cell phone while driving in Ontario?',
    options: [
      'Yes, briefly',
      'Yes, if stopped at a red light',
      'No — hand-held use is prohibited while driving',
      'Yes, if using speakerphone'
    ],
    answer: 2, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Hand-held is prohibited. Completely. Even at a red light you are still "driving" in Ontario law.'
  },
  {
    id: 'R041', category: 'rules', topic: 'cell-phones', difficulty: 2,
    question: 'What is permitted when using a phone while driving?',
    options: [
      'Texting at red lights',
      'Hands-free calling via Bluetooth',
      'Holding the phone to read GPS directions',
      'Using the phone with one hand'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Hands-free only. The phone cannot be in your hand for any purpose.'
  },
  {
    id: 'R042', category: 'rules', topic: 'cell-phones', difficulty: 2,
    question: 'What is the fine for a first offence of distracted driving in Ontario?',
    options: ['$150', '$300', '$500', '$1,000+'],
    answer: 3, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Distracted driving fines in Ontario are severe — over $1,000 for a first offence, plus 3 demerit points.'
  },
  {
    id: 'R043', category: 'rules', topic: 'cell-phones', difficulty: 2,
    question: 'If you need to use your phone while driving, you should:',
    options: [
      'Use it quickly and put it down',
      'Pull over safely, come to a complete stop, then use it',
      'Use it only at red lights',
      'Text at stops but not while moving'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Pull over completely off the road. Come to a full stop. Only then is it legal.'
  },
  {
    id: 'R044', category: 'rules', topic: 'cell-phones', difficulty: 3,
    question: 'Does Ontario\'s distracted driving law apply to GPS devices mounted on the dashboard?',
    options: [
      'Yes — any screen is prohibited',
      'No — mounted GPS devices are permitted if you do not handle them while driving',
      'Only if the GPS is a phone',
      'Only on highways'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Mounted GPS is allowed — you cannot touch or adjust it while moving, but it can be on the dash.'
  },

  /* ================================================================
     RULES — Blood Alcohol / Impaired Driving (R045–R050)
     ================================================================ */
  {
    id: 'R045', category: 'rules', topic: 'alcohol', difficulty: 1,
    question: 'What is the legal blood alcohol limit for fully licensed drivers in Ontario?',
    options: ['0.05', '0.08', '0.10', '0.00'],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: '0.08 is the criminal limit. Between 0.05 and 0.079 is the "warn range" with licence suspensions.'
  },
  {
    id: 'R046', category: 'rules', topic: 'alcohol', difficulty: 1,
    question: 'What is the blood alcohol limit for G1 and G2 drivers?',
    options: ['0.08', '0.05', '0.02', '0.00'],
    answer: 3, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'New drivers under the graduated licensing system must have ZERO alcohol in their system.'
  },
  {
    id: 'R047', category: 'rules', topic: 'alcohol', difficulty: 2,
    question: 'What happens if a fully licensed driver has a blood alcohol level between 0.05 and 0.079?',
    options: [
      'Nothing — this is below the legal limit',
      'A warning and 3-day licence suspension',
      'Immediate criminal charge',
      'A fine only'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: '0.05 to 0.079 is the "warn range." Immediate roadside licence suspension — 3 days for first occurrence.'
  },
  {
    id: 'R048', category: 'rules', topic: 'alcohol', difficulty: 2,
    question: 'What does it mean to be "impaired by drugs" while driving?',
    options: [
      'Only applies to illegal drugs',
      'Applies to any substance — including prescription drugs — that impairs your ability to drive',
      'Only if you fail a roadside test',
      'Only marijuana, not prescription drugs'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Impairment laws apply to any substance — alcohol, cannabis, prescription drugs, over-the-counter medications.'
  },
  {
    id: 'R049', category: 'rules', topic: 'alcohol', difficulty: 2,
    question: 'Can you refuse a breathalyzer test from a police officer in Ontario?',
    options: [
      'Yes, if you have not been drinking',
      'No — refusal is a criminal offence with the same penalties as impaired driving',
      'Yes, if you ask for a lawyer first',
      'Only if you are within your rights to silence'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Refusing a breathalyzer is a criminal offence — same penalties as driving over 0.08.'
  },
  {
    id: 'R050', category: 'rules', topic: 'alcohol', difficulty: 3,
    question: 'A driver is impaired but below 0.08. Can they be charged?',
    options: [
      'No — only 0.08 and above is illegal',
      'Yes — impairment by any substance at any level can result in charges',
      'Only if they cause an accident',
      'Only if the officer has video evidence'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Impaired driving charges can apply at any BAC if an officer determines your ability is impaired.'
  },

  /* ================================================================
     RULES — G1 Restrictions (R051–R056)
     ================================================================ */
  {
    id: 'R051', category: 'rules', topic: 'g1-restrictions', difficulty: 1,
    question: 'As a G1 driver, when can you drive on a 400-series highway?',
    options: [
      'Only during daylight hours',
      'Never — G1 drivers are prohibited from 400-series highways',
      'When accompanied by a fully licensed driver',
      'Any time, with a supervisor in the car'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'G1 restriction: no 400-series highways and no expressways at all — period.'
  },
  {
    id: 'R052', category: 'rules', topic: 'g1-restrictions', difficulty: 1,
    question: 'What licence must your supervising driver hold for you to drive as a G1?',
    options: [
      'G1 or higher',
      'G2 or higher',
      'A fully licensed G class (not G1 or G2)',
      'Any valid licence'
    ],
    answer: 2, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'A G1 driver must be supervised by someone with a full G licence — not G1 or G2.'
  },
  {
    id: 'R053', category: 'rules', topic: 'g1-restrictions', difficulty: 1,
    question: 'As a G1 driver, what is your blood alcohol limit?',
    options: ['0.08', '0.05', '0.00', '0.02'],
    answer: 2, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Zero. G1 drivers must have zero alcohol in their system at all times while driving.'
  },
  {
    id: 'R054', category: 'rules', topic: 'g1-restrictions', difficulty: 2,
    question: 'What hours can G1 drivers NOT drive?',
    options: [
      'After 10 PM and before 5 AM',
      'After 11 PM and before 5 AM',
      'After midnight and before 6 AM',
      'After 9 PM and before 6 AM'
    ],
    answer: 0, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'G1 drivers cannot drive between midnight and 5 AM. Actually it is after midnight — check: it is after midnight and before 5 AM.'
  },
  {
    id: 'R055', category: 'rules', topic: 'g1-restrictions', difficulty: 2,
    question: 'Where must the supervising driver sit when you are driving with a G1 licence?',
    options: [
      'Anywhere in the vehicle',
      'In the back seat',
      'In the front passenger seat',
      'They can be in a following vehicle'
    ],
    answer: 2, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Front passenger seat — they need to be able to take control if necessary.'
  },
  {
    id: 'R056', category: 'rules', topic: 'g1-restrictions', difficulty: 2,
    question: 'How long must you hold a G1 licence before taking the G2 road test?',
    options: ['6 months', '12 months (or 8 months with an approved driver education course)', '18 months', '24 months'],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Minimum 12 months, reduced to 8 months if you complete an approved driving school course.'
  },

  /* ================================================================
     RULES — Signals / Turns / Parking (R057–R066)
     ================================================================ */
  {
    id: 'R057', category: 'rules', topic: 'signals', difficulty: 1,
    question: 'How far before a turn must you signal in Ontario?',
    options: ['10 metres', '20 metres', '30 metres', '50 metres'],
    answer: 2, signSvg: null, rickTopic: 'signs-general',
    rickHint: '30 metres — roughly 3 car lengths at city speeds. Signal before you brake.'
  },
  {
    id: 'R058', category: 'rules', topic: 'signals', difficulty: 1,
    question: 'When changing lanes on a highway, what must you do first?',
    options: [
      'Accelerate, then signal',
      'Check mirrors, signal, check blind spot, then move',
      'Signal, then accelerate to match traffic',
      'Move quickly then signal'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Mirrors → Signal → Blind spot check → Move. In that order, every time.'
  },
  {
    id: 'R059', category: 'rules', topic: 'parking', difficulty: 1,
    question: 'How close to a fire hydrant can you park?',
    options: ['1 metre', '2 metres', '3 metres', '5 metres'],
    answer: 2, signSvg: null, rickTopic: 'signs-general',
    rickHint: '3 metres from a fire hydrant — enough clearance for a fire hose connection.'
  },
  {
    id: 'R060', category: 'rules', topic: 'parking', difficulty: 2,
    question: 'You want to make a U-turn on a city street. When is this permitted?',
    options: [
      'Always, if no cars are coming',
      'Only when a sign permits it and visibility is at least 150 metres in both directions',
      'Never in the city',
      'Any time, as long as you signal'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'U-turns require clear visibility (150 m in both directions) and no prohibiting sign or traffic condition.'
  },
  {
    id: 'R061', category: 'rules', topic: 'parking', difficulty: 2,
    question: 'How far from an intersection can you park?',
    options: ['3 metres', '5 metres', '9 metres', '15 metres'],
    answer: 2, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'In Ontario you must park at least 9 metres from an intersection — roughly 3 car lengths.'
  },
  {
    id: 'R062', category: 'rules', topic: 'parking', difficulty: 2,
    question: 'When parking on a hill facing downhill, which way should you turn your wheels?',
    options: [
      'Straight ahead',
      'Toward the curb',
      'Away from the curb',
      'It does not matter'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Facing downhill — turn wheels TOWARD the curb so if the car rolls, it rolls into the curb, not traffic.'
  },
  {
    id: 'R063', category: 'rules', topic: 'parking', difficulty: 2,
    question: 'When parking on a hill facing uphill with a curb, which way do you turn your wheels?',
    options: [
      'Toward the curb',
      'Straight ahead',
      'Away from the curb',
      'It does not matter'
    ],
    answer: 2, signSvg: null, rickTopic: 'parking',
    rickHint: 'Facing uphill — turn wheels AWAY from the curb so if brakes fail, the car rolls back into the curb.'
  },
  {
    id: 'R064', category: 'rules', topic: 'signals', difficulty: 2,
    question: 'What does a flashing green traffic light mean at an intersection?',
    options: [
      'Proceed with caution',
      'You have a protected left turn',
      'The light is about to turn yellow',
      'Only buses may proceed'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Flashing green in Ontario means a protected left turn — oncoming traffic is stopped.'
  },
  {
    id: 'R065', category: 'rules', topic: 'signals', difficulty: 1,
    question: 'What does a yellow traffic light mean?',
    options: [
      'Speed up to clear the intersection',
      'The light is about to turn red — stop if it is safe to do so',
      'Proceed with caution',
      'Yield to oncoming traffic'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Yellow means prepare to stop — not speed up. Stop if you can do so safely.'
  },
  {
    id: 'R066', category: 'rules', topic: 'signals', difficulty: 2,
    question: 'Can you turn right on a red light in Ontario?',
    options: [
      'Yes, always',
      'Yes, after coming to a complete stop and yielding to all traffic and pedestrians',
      'No — red means stop',
      'Only between midnight and 6 AM'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Right on red is permitted in Ontario after a full stop, unless a sign says otherwise.'
  },

  /* ================================================================
     RULES — Roundabouts (R067–R069)
     ================================================================ */
  {
    id: 'R067', category: 'rules', topic: 'roundabouts', difficulty: 1,
    question: 'When entering a roundabout, you must yield to:',
    options: [
      'Vehicles entering from your right',
      'Traffic already inside the roundabout',
      'Vehicles entering from your left',
      'Pedestrians only'
    ],
    answer: 1, signSvg: null, rickTopic: 'roundabouts',
    rickHint: 'Roundabouts: yield to traffic already INSIDE the circle. Enter when there is a gap.'
  },
  {
    id: 'R068', category: 'rules', topic: 'roundabouts', difficulty: 2,
    question: 'In a roundabout, which direction do you travel?',
    options: ['Clockwise', 'Counterclockwise', 'Either direction', 'Whichever is faster'],
    answer: 1, signSvg: null, rickTopic: 'roundabouts',
    rickHint: 'Counterclockwise — same direction as all traffic in the roundabout.'
  },
  {
    id: 'R069', category: 'rules', topic: 'roundabouts', difficulty: 2,
    question: 'When exiting a roundabout, what should you do?',
    options: [
      'Signal right before your exit and yield to pedestrians',
      'Exit without signalling',
      'Signal left as you exit',
      'Honk to warn pedestrians'
    ],
    answer: 0, signSvg: null, rickTopic: 'roundabouts',
    rickHint: 'Signal RIGHT as you approach your exit to let other drivers know you are leaving the circle.'
  },

  /* ================================================================
     RULES — Cyclists / Pedestrians / Misc (R070–R080)
     ================================================================ */
  {
    id: 'R070', category: 'rules', topic: 'cyclists', difficulty: 2,
    question: 'How much space must you give a cyclist when passing?',
    options: ['0.5 metres', '1 metre', '1.5 metres', '2 metres'],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Ontario law requires at least 1 metre of clearance when passing a cyclist.'
  },
  {
    id: 'R071', category: 'rules', topic: 'cyclists', difficulty: 1,
    question: 'Where on the road are cyclists permitted to ride?',
    options: [
      'Only on the sidewalk',
      'Only in bike lanes',
      'On the right side of the road, with the flow of traffic',
      'On the left side against traffic for safety'
    ],
    answer: 2, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Cyclists ride on the road, on the right side, in the same direction as traffic.'
  },
  {
    id: 'R072', category: 'rules', topic: 'pedestrians', difficulty: 2,
    question: 'What is a pedestrian crossover (PXO)?',
    options: [
      'A crosswalk with traffic lights',
      'A marked crossing with overhead lights where pedestrians always have the right of way',
      'An unmarked crossing at an intersection',
      'A crossing only for school children'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'A PXO has overhead rectangular yellow lights. When a pedestrian activates them — you stop, completely.'
  },
  {
    id: 'R073', category: 'rules', topic: 'parking', difficulty: 2,
    question: 'You may NOT stop or park within how many metres of a pedestrian crossover?',
    options: ['5 metres', '10 metres', '15 metres', '30 metres'],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Within 30 metres of a pedestrian crossover — no stopping, no parking. You need clear sight lines.'
  },
  {
    id: 'R074', category: 'rules', topic: 'visibility', difficulty: 1,
    question: 'When must you turn on your headlights in Ontario?',
    options: [
      'Only after dark',
      'From half an hour before sunset to half an hour after sunrise, and whenever visibility is poor',
      'Only in rain',
      'Only in total darkness'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Headlights go on before it is actually dark: half hour before sunset. Also in any low-visibility condition.'
  },
  {
    id: 'R075', category: 'rules', topic: 'visibility', difficulty: 2,
    question: 'When may you use high beam headlights?',
    options: [
      'Any time at night',
      'Only when there are no oncoming vehicles or vehicles ahead within 150 metres',
      'In fog for better visibility',
      'On highways only'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'High beams are for dark roads with no oncoming or leading traffic within 150 metres. Switch to low beams otherwise.'
  },
  {
    id: 'R076', category: 'rules', topic: 'visibility', difficulty: 2,
    question: 'In fog, you should use:',
    options: [
      'High beams for maximum visibility',
      'Low beams or fog lights',
      'Hazard lights while moving',
      'No lights — they create glare'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'In fog: low beams. High beams reflect off the fog and reduce visibility. Fog lights are ideal if you have them.'
  },
  {
    id: 'R077', category: 'rules', topic: 'winter', difficulty: 1,
    question: 'In Ontario, when is it legal to use winter tires?',
    options: [
      'Only December through March',
      'Any time — there is no restriction on when you can use them',
      'Only when snow is on the ground',
      'They are not required in Ontario'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'No law restricts when you use winter tires. Put them on when temperatures drop consistently below 7°C.'
  },
  {
    id: 'R078', category: 'rules', topic: 'winter', difficulty: 2,
    question: 'Before moving your car in winter, you must clear:',
    options: [
      'Only the windshield',
      'The windshield and front windows',
      'All snow and ice from the entire vehicle, including the roof',
      'Only the windows and mirrors'
    ],
    answer: 2, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Roof snow flying off your vehicle can hit other cars and blind drivers. Clear the whole car.'
  },
  {
    id: 'R079', category: 'rules', topic: 'highway', difficulty: 2,
    question: 'When merging onto a highway, you should:',
    options: [
      'Stop at the end of the on-ramp and wait for a gap',
      'Use the on-ramp to accelerate to highway speed and merge smoothly',
      'Enter slowly and let highway traffic adjust',
      'Use your hazard lights while merging'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'The on-ramp is your acceleration lane. Match highway speed, signal, find a gap, merge.'
  },
  {
    id: 'R080', category: 'rules', topic: 'highway', difficulty: 2,
    question: 'When is it legal to pass on the right on a multi-lane highway?',
    options: [
      'Never',
      'When traffic is moving slowly in both lanes and the right lane is moving faster',
      'Only to pass slower vehicles',
      'Any time, if safe'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'On multi-lane highways, passing on the right is permitted when lanes are moving at different speeds. Not on two-lane roads.'
  },

  /* ================================================================
     SIGNS (S001–S040)
     ================================================================ */
  {
    id: 'S001', category: 'signs', topic: 'signs-general', difficulty: 1,
    question: 'What does this sign mean?',
    options: ['Yield', 'Stop completely', 'Slow down', 'One way'],
    answer: 1, signSvg: SVG.stop, rickTopic: 'signs-general',
    rickHint: 'Red octagon. Eight sides. One meaning. Stop.'
  },
  {
    id: 'S002', category: 'signs', topic: 'signs-general', difficulty: 1,
    question: 'What does this sign require you to do?',
    options: ['Stop completely', 'Slow and proceed if clear', 'Give the right of way to cross traffic', 'Do not enter'],
    answer: 2, signSvg: SVG.yield, rickTopic: 'signs-general',
    rickHint: 'Triangle pointing down — the shape of yielding. Give way to cross traffic.'
  },
  {
    id: 'S003', category: 'signs', topic: 'signs-general', difficulty: 1,
    question: 'What is the maximum speed indicated on this sign?',
    options: ['40 km/h', '50 km/h', '60 km/h', '70 km/h'],
    answer: 1, signSvg: SVG.speedLimit50, rickTopic: 'speed-limits',
    rickHint: 'The number on the sign is the maximum. Not the target. The maximum.'
  },
  {
    id: 'S004', category: 'signs', topic: 'signs-general', difficulty: 1,
    question: 'What does this sign indicate?',
    options: ['City speed limit', 'Highway speed limit', 'Rural road speed limit', 'Minimum speed'],
    answer: 1, signSvg: SVG.speedLimit80, rickTopic: 'speed-limits',
    rickHint: '80 km/h is the typical speed limit on rural two-lane highways in Ontario.'
  },
  {
    id: 'S005', category: 'signs', topic: 'school-zones', difficulty: 1,
    question: 'What does this sign indicate?',
    options: ['Construction zone', 'School zone — slow down when lights flash', 'Pedestrian crossing', 'Hospital zone'],
    answer: 1, signSvg: SVG.schoolZone, rickTopic: 'school-zones',
    rickHint: 'Yellow diamond with children — school zone. 40 km/h when the lights flash.'
  },
  {
    id: 'S006', category: 'signs', topic: 'signs-general', difficulty: 1,
    question: 'What does a yellow diamond-shaped sign with an exclamation mark indicate?',
    options: ['Stop ahead', 'General hazard warning', 'Speed limit', 'Construction zone'],
    answer: 1, signSvg: SVG.warning, rickTopic: 'signs-general',
    rickHint: 'Yellow diamond means warning. The specific hazard depends on the symbol inside.'
  },
  {
    id: 'S007', category: 'signs', topic: 'signs-general', difficulty: 1,
    question: 'What does this sign mean?',
    options: ['Slow down', 'Wrong way', 'Do not enter', 'Stop ahead'],
    answer: 2, signSvg: SVG.noEntry, rickTopic: 'signs-general',
    rickHint: 'Red circle with a white horizontal bar — Do Not Enter. You are going the wrong way.'
  },
  {
    id: 'S008', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'What does this sign mean?',
    options: ['Passing is permitted here', 'No passing zone', 'Pass with caution', 'End of passing zone'],
    answer: 1, signSvg: SVG.doNotPass, rickTopic: 'signs-general',
    rickHint: 'Do Not Pass means you cannot overtake vehicles ahead in this zone.'
  },
  {
    id: 'S009', category: 'signs', topic: 'railroad-crossings', difficulty: 1,
    question: 'What does this sign warn you about ahead?',
    options: ['Traffic signal', 'Pedestrian crossing', 'Railroad crossing', 'School zone'],
    answer: 2, signSvg: SVG.railroad, rickTopic: 'railroad-crossings',
    rickHint: 'The X pattern on a yellow circle is the advance warning for a railroad crossing.'
  },
  {
    id: 'S010', category: 'signs', topic: 'signs-general', difficulty: 1,
    question: 'What does this sign indicate?',
    options: ['School crossing ahead', 'Pedestrian crossing ahead', 'Construction workers present', 'Children playing area'],
    answer: 1, signSvg: SVG.pedestrianXing, rickTopic: 'signs-general',
    rickHint: 'Pedestrian figure on a yellow diamond — pedestrian crossing ahead. Watch for people crossing.'
  },
  {
    id: 'S011', category: 'signs', topic: 'signs-general', difficulty: 1,
    question: 'What does this sign mean?',
    options: ['Two-way traffic', 'One way — traffic flows only in the direction of the arrow', 'Turn only', 'Merge ahead'],
    answer: 1, signSvg: SVG.oneWay, rickTopic: 'signs-general',
    rickHint: 'ONE WAY: all traffic travels in the same direction. Do not enter from the opposite end.'
  },
  {
    id: 'S012', category: 'signs', topic: 'signs-general', difficulty: 1,
    question: 'What does this sign mean?',
    options: ['Parking allowed for 30 minutes', 'Parking lot ahead', 'No parking', 'Park on the right side'],
    answer: 2, signSvg: SVG.noParking, rickTopic: 'signs-general',
    rickHint: 'Blue P with a red circle and slash through it — No Parking.'
  },
  {
    id: 'S013', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'What does this sign warn you about?',
    options: ['Intersection ahead', 'Merge or lane-end ahead', 'Narrow bridge', 'Winding road'],
    answer: 1, signSvg: SVG.merge, rickTopic: 'signs-general',
    rickHint: 'Lines converging on a yellow diamond sign — lanes are merging ahead. Be prepared to yield.'
  },
  {
    id: 'S014', category: 'signs', topic: 'construction-zones', difficulty: 1,
    question: 'An orange triangle sign means:',
    options: ['Yield to construction vehicles', 'Construction zone ahead — slow down', 'End of construction', 'Construction vehicles turning'],
    answer: 1, signSvg: SVG.construction, rickTopic: 'construction-zones',
    rickHint: 'Orange triangle = construction zone warning. Fines doubled. Workers present.'
  },
  {
    id: 'S015', category: 'signs', topic: 'signs-general', difficulty: 1,
    question: 'What does this regulatory sign require?',
    options: ['Keep left', 'Keep right of the divider', 'One way', 'Passing allowed'],
    answer: 1, signSvg: SVG.keepRight, rickTopic: 'signs-general',
    rickHint: 'KEEP RIGHT means stay to the right of a median, traffic island, or obstruction.'
  },
  {
    id: 'S016', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'What does a yellow diamond sign with a wavy line indicate?',
    options: ['Winding road', 'Slippery when wet', 'Rough road surface', 'Water on roadway'],
    answer: 1, signSvg: SVG.slippery, rickTopic: 'signs-general',
    rickHint: 'The wavy squiggle on yellow — slippery road surface. Reduce speed, especially in wet conditions.'
  },
  {
    id: 'S017', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'What shape and colour are REGULATORY signs in Ontario?',
    options: ['Yellow diamonds', 'White rectangles or squares', 'Green rectangles', 'Orange triangles'],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Regulatory signs (speed limits, no passing, one way) are white with black or red text on rectangles.'
  },
  {
    id: 'S018', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'What colour are WARNING signs in Ontario?',
    options: ['Red', 'Orange', 'Yellow', 'White'],
    answer: 2, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Yellow — the universal warning colour. Hazard ahead, slow down, pay attention.'
  },
  {
    id: 'S019', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'Blue signs on the highway typically indicate:',
    options: ['Construction zones', 'Speed limits', 'Services (gas, food, lodging)', 'Road distances'],
    answer: 2, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Blue highway signs indicate services available at the next exit — fuel, food, hospital, etc.'
  },
  {
    id: 'S020', category: 'signs', topic: 'signs-general', difficulty: 1,
    question: 'Green signs on a highway show:',
    options: ['Environmental areas', 'Directional information and distances', 'Speed limits', 'Safe passing zones'],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Green highway signs give directions and distances to destinations. Navigation signs.'
  },
  {
    id: 'S021', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'What does a white rectangular sign with black text saying "KEEP RIGHT EXCEPT TO PASS" mean?',
    options: [
      'Pass only on the right',
      'Stay in the right lane unless overtaking slower vehicles',
      'Right lanes only — no trucks',
      'Yield to vehicles on your right'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'On multi-lane roads: stay right, pass left. After passing, return to the right lane.'
  },
  {
    id: 'S022', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'A sign shows a truck on a downward slope. What does this warn?',
    options: [
      'Trucks only — no passenger vehicles',
      'Steep downhill grade ahead — truck brakes may overheat',
      'Truck crossing ahead',
      'Slow trucks must use right lane'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Steep downhill + truck symbol = runaway truck ramp may be present. Trucks use lower gears. Give them space.'
  },
  {
    id: 'S023', category: 'signs', topic: 'signs-general', difficulty: 3,
    question: 'What does a pennant-shaped yellow sign mean?',
    options: ['Yield ahead', 'No passing zone', 'School zone', 'Slow vehicle turnout ahead'],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'The pennant (horizontal triangle, points right) on the left side of the road means NO PASSING zone.'
  },
  {
    id: 'S024', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'What does an orange sign mean on Ontario roads?',
    options: ['Warning of permanent hazard', 'Construction or maintenance zone', 'Detour', 'School zone'],
    answer: 1, signSvg: null, rickTopic: 'construction-zones',
    rickHint: 'Orange = construction, maintenance, or road work. Temporary changes to traffic flow.'
  },
  {
    id: 'S025', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'What does a sign showing a white arrow curving to the right indicate?',
    options: ['Lane merges right', 'Curve ahead — right', 'Keep right', 'Right turn only'],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'A curved arrow on a yellow diamond = curve ahead in the direction of the arrow. Reduce speed.'
  },
  {
    id: 'S026', category: 'signs', topic: 'signs-general', difficulty: 1,
    question: 'What does a "WRONG WAY" sign indicate?',
    options: [
      'Road under construction',
      'You are travelling against the flow of traffic — turn around',
      'Road closed ahead',
      'No U-turns'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'WRONG WAY means you have entered a one-way road going the wrong direction. Stop and turn around safely.'
  },
  {
    id: 'S027', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'A sign shows a "T" intersection symbol. What does this warn?',
    options: [
      'Three-way stop ahead',
      'The road you are on ends — prepare to turn left or right',
      'Traffic signal ahead',
      'Merge with traffic from the right'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'T intersection: the road you are on dead-ends. Yield or stop and turn left or right.'
  },
  {
    id: 'S028', category: 'signs', topic: 'signs-general', difficulty: 3,
    question: 'What does a sign showing a horizontal white bar on a red circle mean?',
    options: ['No left turn', 'Do not enter', 'No parking', 'Road closed'],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Red circle with a white horizontal bar = DO NOT ENTER. You are facing the wrong direction in a one-way road.'
  },
  {
    id: 'S029', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'What does a sign showing a truck falling off a cliff edge mean?',
    options: [
      'No trucks allowed',
      'Steep drop-off beside the road — stay away from edge',
      'Trucks must stop ahead',
      'Road narrows for trucks'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Vehicle dropping off edge of road = embankment warning. Keep away from road edge — especially in large vehicles.'
  },
  {
    id: 'S030', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'What does a red octagonal sign with no text mean?',
    options: ['Yield', 'Stop', 'No entry', 'Danger ahead'],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'An octagon is always a stop sign — even without the word STOP. The shape alone means stop.'
  },
  {
    id: 'S031', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'When you see a "SLOW — SCHOOL BUS AHEAD" sign, what must you do?',
    options: [
      'Speed up to pass before the bus stops',
      'Reduce speed and be prepared to stop',
      'Maintain current speed',
      'Only slow down if children are visible'
    ],
    answer: 1, signSvg: null, rickTopic: 'school-buses',
    rickHint: 'School bus ahead sign = reduce speed, prepare for the bus to stop and lights to flash.'
  },
  {
    id: 'S032', category: 'signs', topic: 'signs-general', difficulty: 1,
    question: 'What does a sign showing a bicycle mean in a lane?',
    options: [
      'Bicycles must stop here',
      'Bicycle lane — motor vehicles must not use this lane',
      'Watch for cyclists crossing',
      'Bicycles allowed on this road only'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'A bicycle symbol in a lane marks a designated bicycle lane. Motor vehicles cannot drive in it.'
  },
  {
    id: 'S033', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'What does a yellow sign showing two arrows pointing in opposite directions indicate?',
    options: ['One way traffic', 'Two-way traffic resumes or begins', 'Passing zone', 'Divided highway ends'],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Two opposing arrows = two-way traffic. You may be leaving a one-way section or a divided highway.'
  },
  {
    id: 'S034', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'What does a sign with a downward arrow between two upward arrows indicate?',
    options: [
      'Lane reduction ahead',
      'Centre lane is reversible or a two-way left turn lane',
      'Merge into centre lane',
      'Do not change lanes'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'The centre lane with a two-way arrow pattern = shared two-way left turn lane or reversible centre lane.'
  },
  {
    id: 'S035', category: 'signs', topic: 'signs-general', difficulty: 3,
    question: 'What must you do when you see a "ROAD CLOSED" sign?',
    options: [
      'Proceed slowly',
      'Do not enter — find an alternate route',
      'Only applies to trucks',
      'Proceed if no workers are visible'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Road Closed means the road is not open to traffic. Do not enter. Use an alternate route.'
  },
  {
    id: 'S036', category: 'signs', topic: 'signs-general', difficulty: 1,
    question: 'What does a sign with the letter H on a blue background indicate?',
    options: ['Highway entrance', 'Hazardous materials route', 'Hospital nearby', 'Helicopter landing zone'],
    answer: 2, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Blue H = Hospital nearby. Service sign — may also show directional arrow.'
  },
  {
    id: 'S037', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'What does a yellow sign with a winding arrow mean?',
    options: ['One-way road ahead', 'Winding road ahead — multiple curves', 'Slippery road', 'Detour route'],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Winding arrow = multiple curves ahead. Reduce speed and stay in your lane.'
  },
  {
    id: 'S038', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'A sign shows a car with wavy lines beneath it. What does this mean?',
    options: [
      'Car wash ahead',
      'Slippery road surface when wet',
      'Flooded road',
      'Bumpy road surface'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Car with wavy lines (like skidding) = slippery when wet. Reduce speed, especially in rain.'
  },
  {
    id: 'S039', category: 'signs', topic: 'signs-general', difficulty: 2,
    question: 'What does a "MAXIMUM 70" sign mean on a curve?',
    options: [
      'The road speed limit is 70 km/h',
      'Safe advisory speed for the curve is 70 km/h',
      'Minimum speed in the curve',
      'Speed limit for trucks only'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Advisory speed signs on curves are recommendations for safe cornering speed — not legal limits, but ignore them at your peril.'
  },
  {
    id: 'S040', category: 'signs', topic: 'signs-general', difficulty: 3,
    question: 'What does a FLASHING RED traffic light mean?',
    options: [
      'Traffic light out of service — proceed when clear',
      'Treat it as a stop sign — stop, yield, proceed when safe',
      'Slow down but do not stop',
      'Do not enter the intersection'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Flashing red = treat it exactly like a stop sign. Full stop, yield, then proceed.'
  },

  /* ================================================================
     SCENARIOS (SC001–SC020)
     ================================================================ */
  {
    id: 'SC001', category: 'scenario', topic: 'right-of-way', difficulty: 2,
    question: 'You are approaching a green light when a pedestrian steps off the curb to cross in front of you. What do you do?',
    options: [
      'Honk and proceed — you have the green',
      'Stop and let the pedestrian cross',
      'Slow down and edge forward',
      'Flash your lights as a warning'
    ],
    answer: 1, signSvg: null, rickTopic: 'right-of-way',
    rickHint: 'Green light or not — pedestrians in the crosswalk have the right of way. Stop.'
  },
  {
    id: 'SC002', category: 'scenario', topic: 'following-distance', difficulty: 2,
    question: 'You are driving on a highway at 100 km/h. The car ahead of you brakes suddenly. You were following at 2 seconds. What likely happens?',
    options: [
      'You stop in time easily',
      'You may not have enough stopping distance — 3 seconds is the minimum',
      'You stop in time, barely',
      '2 seconds is exactly the correct distance'
    ],
    answer: 1, signSvg: null, rickTopic: 'following-distance',
    rickHint: 'At 100 km/h, 2 seconds is not enough. You need at least 3 seconds to account for reaction time and braking.'
  },
  {
    id: 'SC003', category: 'scenario', topic: 'school-buses', difficulty: 2,
    question: 'You are on a two-lane road with no median. A school bus ahead of you stops and activates its red lights. What do you do?',
    options: [
      'Pass carefully and slowly',
      'Stop and wait for the lights to stop flashing',
      'Slow to 20 km/h and proceed',
      'Pass only if no children are visible'
    ],
    answer: 1, signSvg: null, rickTopic: 'school-buses',
    rickHint: 'No median, red lights flashing = stop. Both directions stop. No exceptions.'
  },
  {
    id: 'SC004', category: 'scenario', topic: 'emergency-vehicles', difficulty: 2,
    question: 'You are in the left lane of a two-lane highway. An emergency vehicle comes up behind you with lights and sirens. What do you do?',
    options: [
      'Stay in the left lane — the emergency vehicle will pass on the right',
      'Brake hard immediately',
      'Signal and safely move to the right lane, then pull to the shoulder and stop',
      'Speed up to get out of the way'
    ],
    answer: 2, signSvg: null, rickTopic: 'emergency-vehicles',
    rickHint: 'Move right and stop. Do it safely — signal, check mirrors, then move over.'
  },
  {
    id: 'SC005', category: 'scenario', topic: 'right-of-way', difficulty: 3,
    question: 'You arrive at a four-way stop at the same time as a driver on your left. Who goes first?',
    options: [
      'You go first — they are on your left',
      'They go first — you yield to the right and they are your right from their perspective',
      'The driver going straight goes first',
      'You both go at the same time'
    ],
    answer: 0, signSvg: null, rickTopic: 'right-of-way',
    rickHint: 'Yield to the right — at a simultaneous stop, the driver on YOUR right goes first. If they are on your LEFT, YOU go first.'
  },
  {
    id: 'SC006', category: 'scenario', topic: 'g1-restrictions', difficulty: 2,
    question: 'It is 1 AM and you are a G1 driver. Your supervisor is in the passenger seat. Can you drive?',
    options: [
      'Yes — the supervisor is present',
      'No — G1 drivers cannot drive between midnight and 5 AM',
      'Yes, but only on local roads',
      'Yes, but the supervisor must have their hands on the wheel'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'G1 restriction: no driving between midnight and 5 AM — even with a supervisor.'
  },
  {
    id: 'SC007', category: 'scenario', topic: 'speed-limits', difficulty: 2,
    question: 'You are driving 80 km/h on a highway in heavy rain and reduced visibility. The posted limit is 100 km/h. Are you breaking the law?',
    options: [
      'Yes — the posted limit is 100 km/h and you must maintain it',
      'No — you are required to drive at a safe speed for conditions',
      'Yes — you must match the flow of traffic',
      'No, but you should be going faster'
    ],
    answer: 1, signSvg: null, rickTopic: 'speed-limits',
    rickHint: 'Speed limits are maximums. Conditions can require going slower. Driving 80 in poor visibility is appropriate and legal.'
  },
  {
    id: 'SC008', category: 'scenario', topic: 'parking', difficulty: 2,
    question: 'You park on a steep hill facing uphill. There is no curb. Which way should you turn your wheels?',
    options: [
      'Away from the road edge',
      'Toward the road edge',
      'Straight ahead',
      'It does not matter without a curb'
    ],
    answer: 1, signSvg: null, rickTopic: 'parking',
    rickHint: 'No curb on an uphill slope: turn wheels TOWARD the edge of the road. If the car rolls, it rolls off the road (hopefully into a ditch), not into traffic.'
  },
  {
    id: 'SC009', category: 'scenario', topic: 'railroad-crossings', difficulty: 3,
    question: 'You are at a railroad crossing. The lights stop flashing but you notice a second train coming from the other direction. What do you do?',
    options: [
      'Proceed — the lights have stopped',
      'Wait until the track is completely clear of all trains before crossing',
      'Proceed slowly and watch for the train',
      'Honk and proceed quickly'
    ],
    answer: 1, signSvg: null, rickTopic: 'railroad-crossings',
    rickHint: 'Lights stopping is not the only signal — confirm the track is completely clear. Second trains are a real hazard.'
  },
  {
    id: 'SC010', category: 'scenario', topic: 'right-of-way', difficulty: 3,
    question: 'You are turning left at a green light. There is oncoming traffic but a gap opens up. A pedestrian is crossing on your intended path. What do you do?',
    options: [
      'Turn quickly through the gap before the pedestrian reaches you',
      'Wait until both the oncoming gap is safe AND the pedestrian has fully crossed',
      'Honk to hurry the pedestrian',
      'Turn and the pedestrian will stop for you'
    ],
    answer: 1, signSvg: null, rickTopic: 'right-of-way',
    rickHint: 'Two hazards: oncoming traffic AND a pedestrian. Both must be clear before you complete the left turn.'
  },
  {
    id: 'SC011', category: 'scenario', topic: 'following-distance', difficulty: 3,
    question: 'You are following a large truck on the highway. Why should you increase your following distance beyond 3 seconds?',
    options: [
      'Trucks brake faster than cars',
      'Large trucks have large blind spots and block your view of hazards ahead',
      'Trucks are always going faster than posted limits',
      'You need more space because trucks are wider'
    ],
    answer: 1, signSvg: null, rickTopic: 'following-distance',
    rickHint: 'Behind a truck you cannot see the road ahead. If the truck brakes for something, you have no warning. More distance = more time.'
  },
  {
    id: 'SC012', category: 'scenario', topic: 'emergency-vehicles', difficulty: 2,
    question: 'You see a stopped police cruiser on the highway shoulder with lights flashing. There are two lanes in your direction. What does Ontario law require?',
    options: [
      'No action required — just maintain your speed',
      'Move over into the far lane if safe, or slow down significantly',
      'Honk as you pass to alert the officer',
      'Only move over if officers are outside the vehicle'
    ],
    answer: 1, signSvg: null, rickTopic: 'emergency-vehicles',
    rickHint: 'Slow Down, Move Over law: for any stopped emergency vehicle or tow truck on the shoulder, move over a lane or slow to 60 km/h if you cannot.'
  },
  {
    id: 'SC013', category: 'scenario', topic: 'seatbelts', difficulty: 2,
    question: 'You are driving with a 14-year-old passenger who refuses to wear a seatbelt. What should you do?',
    options: [
      'Continue driving — it is their choice',
      'Stop the vehicle and insist they wear the seatbelt before continuing',
      'Call their parents while driving',
      'Drive more slowly to compensate'
    ],
    answer: 1, signSvg: null, rickTopic: 'seatbelts',
    rickHint: 'You are legally responsible for passengers under 16. Stop the vehicle. No seatbelt, no moving.'
  },
  {
    id: 'SC014', category: 'scenario', topic: 'winter', difficulty: 2,
    question: 'You start your car in winter and notice snow on the roof. You are in a hurry. Can you just drive off?',
    options: [
      'Yes — the snow will blow off on the highway',
      'No — snow from your roof can fly onto other vehicles and is dangerous',
      'Only if it is a light dusting',
      'Yes, if you are only going a short distance'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Snow from your roof can form ice sheets that fly off and shatter other vehicles\' windshields. Clear the whole car.'
  },
  {
    id: 'SC015', category: 'scenario', topic: 'alcohol', difficulty: 3,
    question: 'You had two beers and feel fine. Your BAC is later measured at 0.06. What is the consequence for a fully licensed driver?',
    options: [
      'No consequence — 0.06 is below the 0.08 limit',
      'Immediate 3-day licence suspension under the warn range',
      'A criminal impaired driving charge',
      'A $500 fine only'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: '0.05–0.079 is the warn range. No criminal charge, but immediate licence suspension. First time: 3 days.'
  },
  {
    id: 'SC016', category: 'scenario', topic: 'right-of-way', difficulty: 2,
    question: 'You are exiting a parking lot and the road has a solid white line at the exit. What must you do?',
    options: [
      'Proceed if no cars are visible',
      'Yield to all pedestrians and vehicles on the road before pulling out',
      'Honk to alert road users',
      'Flash your lights and pull out carefully'
    ],
    answer: 1, signSvg: null, rickTopic: 'right-of-way',
    rickHint: 'Exiting a parking lot = you are entering traffic. Traffic on the road has the right of way. Yield to everything.'
  },
  {
    id: 'SC017', category: 'scenario', topic: 'highway', difficulty: 2,
    question: 'You are travelling at 100 km/h in the right lane of a highway. A vehicle is merging from an on-ramp ahead. What is the best action?',
    options: [
      'Maintain speed — they must yield to you',
      'Move to the left lane if safe, or adjust speed to create a gap for the merging vehicle',
      'Brake hard to let them in',
      'Sound your horn to warn them off'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Merging vehicles must yield, but cooperative driving means creating gaps when you can. Move over or adjust speed.'
  },
  {
    id: 'SC018', category: 'scenario', topic: 'cyclists', difficulty: 2,
    question: 'A cyclist is riding in the right lane of a two-lane road. You want to pass. There is oncoming traffic. What do you do?',
    options: [
      'Pass the cyclist as closely as possible within the lane',
      'Wait until oncoming traffic clears, then move into the left lane to pass with at least 1 metre clearance',
      'Use your horn to signal the cyclist to pull over',
      'Pass in the same lane — 1 metre is not required in Ontario'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: 'Ontario requires at least 1 metre of clearance when passing a cyclist. Wait for oncoming to clear, then use the other lane.'
  },
  {
    id: 'SC019', category: 'scenario', topic: 'signals', difficulty: 2,
    question: 'You want to turn right from a road onto a side street. When should you signal?',
    options: [
      'As you begin to turn',
      'At least 30 metres before the turn',
      'When you can see the side street',
      'Only if other vehicles are present'
    ],
    answer: 1, signSvg: null, rickTopic: 'signs-general',
    rickHint: '30 metres before — signal before you brake so drivers behind know your intention early.'
  },
  {
    id: 'SC020', category: 'scenario', topic: 'construction-zones', difficulty: 2,
    question: 'You enter a construction zone posted at 60 km/h. No workers are visible. Do the reduced speed limit and doubled fines still apply?',
    options: [
      'No — fines only apply when workers are present',
      'Yes — the posted limits and double fines apply any time signs are present',
      'Only during working hours',
      'Only the reduced speed applies — not the double fines'
    ],
    answer: 1, signSvg: null, rickTopic: 'construction-zones',
    rickHint: 'Construction zone rules apply whenever the signs are posted — 24 hours a day, workers present or not.'
  }

];

/* ================================================================
   Helper functions
   ================================================================ */

function getRandomQuestions(count, category) {
  let pool = category ? QUESTIONS.filter(q => q.category === category) : QUESTIONS.slice();
  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

function getBossQuestions() {
  const rules = getRandomQuestions(20, 'rules');
  const signs = getRandomQuestions(10, 'signs');
  const scenarios = getRandomQuestions(10, 'scenario');
  const combined = [...rules, ...signs, ...scenarios];
  // Shuffle the combined set
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }
  return combined;
}
