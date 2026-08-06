window.FOOTSTOOL_BUSY_ACTIVITIES = [
  {
    id: '01',
    title: 'Workshop decision pathway',
    mechanic: 'Branching safety decisions',
    topic: 'Shared workshop conduct, hazards and asking for help',
    summary: 'Reach a safe stopping point by choosing what to do when conditions are not ready.',
    type: 'branch',
    sourceNote: 'Authorised Footstool deck safety material. Current local procedures and teacher direction remain controlling.',
    scenarios: [
      {
        prompt: 'You arrive at a machine and are not sure whether you have permission to use it for this task. What is your next action?',
        options: [
          'Use it quickly before anyone else needs it.',
          'Ask a classmate to approve the machine use.',
          'Stop, keep clear and ask the teacher for permission and the correct instruction.'
        ],
        answer: 2,
        correct: 'Appropriate response: uncertainty is a reason to stop and ask the teacher.',
        hints: [
          'Unsafe: speed does not replace permission. Revisit “Shared workshop conduct”.',
          'Unsafe: another student cannot provide teacher permission. Revisit “Readiness and asking for help”.'
        ]
      },
      {
        prompt: 'An off-cut is lying in a walkway beside the bench. What should happen before work continues?',
        options: [
          'Move it to the assigned scrap location so the walkway is clear.',
          'Step over it and leave it for the next group.',
          'Kick it under the bench.'
        ],
        answer: 0,
        correct: 'Appropriate response: clearing the walkway removes an avoidable trip hazard.',
        hints: [
          'Unsafe: leaving the hazard keeps the walkway obstructed. Revisit “Hazards, risks and controls”.',
          'Unsafe: hiding an off-cut does not control the hazard. Revisit “Hazards, risks and controls”.'
        ]
      },
      {
        prompt: 'A classmate is about to begin while you can see that the work area is not ready. What is the safest response?',
        options: [
          'Tell them to hurry so the problem is over sooner.',
          'Take over the task without teacher approval.',
          'Ask them to stop, keep clear and get the teacher.'
        ],
        answer: 2,
        correct: 'Appropriate response: stop the unsafe start and involve the teacher.',
        hints: [
          'Unsafe: rushing increases pressure and does not make the area ready. Revisit “Shared workshop conduct”.',
          'Unsafe: taking over can create another unapproved action. Revisit “Readiness and asking for help”.'
        ]
      }
    ]
  },
  {
    id: '02',
    title: 'Tool recognition and purpose bay',
    mechanic: 'Source-image identification and purpose matching',
    topic: 'Tool recognition, measuring and marking references',
    summary: 'Identify a verified workshop tool photograph and connect named hand tools to their broad purposes.',
    type: 'imageMatch',
    sourceNote: 'Verified tool vocabulary and approved source-library photograph. This activity does not teach machine operation.',
    image: '../assets/reference/combination-square.jpg',
    imageAlt: 'A combination square with its rule and adjustable head visible.',
    identify: {
      prompt: 'Which tool is shown?',
      options: ['Combination square', 'Tenon saw', 'Steel rule', 'Hand plane'],
      answer: 0
    },
    matches: [
      { tool: 'Combination square', answer: 'Check or mark straight and angled reference lines' },
      { tool: 'Steel rule', answer: 'Measure or mark a length from a clear reference' },
      { tool: 'Tenon saw', answer: 'Make a controlled hand cut in timber' }
    ],
    purposeOptions: [
      'Measure or mark a length from a clear reference',
      'Make a controlled hand cut in timber',
      'Check or mark straight and angled reference lines',
      'Apply a surface finish'
    ]
  },
  {
    id: '03',
    title: 'Timber language classifier',
    mechanic: 'Concept classification',
    topic: 'Hardwood and softwood; grain, knots, density and workability',
    summary: 'Sort source-grounded timber descriptions into the concept they actually describe.',
    type: 'sort',
    sourceNote: 'Authorised Footstool deck timber vocabulary and the source-bounded course theory.',
    categories: ['Hardwood source description', 'Softwood source description', 'Grain or knot description', 'Density or workability description'],
    items: [
      { text: 'Timber from broadleaf trees', answer: 'Hardwood source description' },
      { text: 'Timber from conifer trees that usually have needles and cones', answer: 'Softwood source description' },
      { text: 'The direction and pattern of wood fibres', answer: 'Grain or knot description' },
      { text: 'An irregular feature where a branch once grew', answer: 'Grain or knot description' },
      { text: 'How much wood is packed into a space', answer: 'Density or workability description' },
      { text: 'How readily timber can be sawn, drilled, shaped, sanded and finished neatly', answer: 'Density or workability description' }
    ]
  },
  {
    id: '04',
    title: 'Manufactured wood structure match',
    mechanic: 'Product-to-structure matching',
    topic: 'Engineered wood products and their internal structure',
    summary: 'Match each named manufactured wood product to the way its wood pieces are arranged.',
    type: 'match',
    sourceNote: 'Authorised Footstool deck manufactured-wood investigation and source-bounded course theory.',
    options: [
      'Thin veneers bonded in layers with changing grain directions',
      'Long wood strands arranged in planned directions and pressed into sheets',
      'Veneers bonded with most grain running in the same direction',
      'Layers of solid boards placed at right angles',
      'Wood fibres or particles combined with plastic'
    ],
    items: [
      { term: 'Plywood', answer: 'Thin veneers bonded in layers with changing grain directions' },
      { term: 'OSB', answer: 'Long wood strands arranged in planned directions and pressed into sheets' },
      { term: 'LVL', answer: 'Veneers bonded with most grain running in the same direction' },
      { term: 'CLT', answer: 'Layers of solid boards placed at right angles' },
      { term: 'Wood-plastic composite', answer: 'Wood fibres or particles combined with plastic' }
    ]
  },
  {
    id: '05',
    title: 'Original plan reading station',
    mechanic: 'Authoritative document reading',
    topic: 'Views, written dimensions and cross-checking the original plan',
    summary: 'Use the unchanged working drawing as evidence and separate written plan information from screen measurement.',
    type: 'planReader',
    sourceNote: 'The original two-page Wagga High School Foot Stool PDF is the sole dimensional and construction authority.',
    image: '../assets/plan-page-1.png',
    pdf: '../assets/resources/Footstool.pdf',
    statements: [
      { label: 'Plan', answer: 'View from above' },
      { label: 'Front elevation', answer: 'View from the front' },
      { label: 'Right-hand elevation', answer: 'View from the right side' }
    ]
  },
  {
    id: '06',
    title: 'Drawing view relationship matrix',
    mechanic: 'Evidence-table interpretation',
    topic: 'Third-angle projection, related views and isometric communication',
    summary: 'Choose the drawing view that best supports each communication need.',
    type: 'viewMatrix',
    sourceNote: 'Authorised drawing-literacy material. The original plan, not this activity, controls Footstool geometry.',
    options: ['Plan view', 'Front elevation', 'Right-hand elevation', 'Isometric drawing'],
    rows: [
      { need: 'See the object directly from above', answer: 'Plan view' },
      { need: 'See the object directly from its front', answer: 'Front elevation' },
      { need: 'See the object directly from its right side', answer: 'Right-hand elevation' },
      { need: 'Picture three sides at once', answer: 'Isometric drawing' }
    ]
  },
  {
    id: '07',
    title: 'Emblem concept decision matrix',
    mechanic: 'Weighted design comparison',
    topic: 'Three concepts, design criteria and reasoned refinement',
    summary: 'Compare three genuinely different emblem concepts using the criteria taught in the source deck.',
    type: 'decisionMatrix',
    sourceNote: 'Authorised Footstool deck emblem task. Laser use remains optional and teacher-controlled.',
    criteria: ['Personal meaning', 'Originality', 'Balance', 'Simplicity', 'Readability', 'Use of space']
  },
  {
    id: '08',
    title: 'Production evidence log',
    mechanic: 'Structured observation table',
    topic: 'Practical progress, quality evidence and next-step reflection',
    summary: 'Record what you actually observed, what you did and the teacher-directed next step without inventing a construction method.',
    type: 'evidenceLog',
    sourceNote: 'Teacher-developed evidence pathway. The plan, current procedures and teacher direction control practical work.',
    rows: 3
  },
  {
    id: '09',
    title: 'Function evidence coach',
    mechanic: 'Claim-strength sorting and evidence builder',
    topic: 'Function vocabulary, observation and realistic improvement',
    summary: 'Separate vague claims from evidence-based evaluation, then build your own criterion-evidence-improvement statement.',
    type: 'evidenceClaims',
    sourceNote: 'Authorised Footstool deck function vocabulary and source-bounded evaluation theory.',
    categories: ['Evidence-based', 'Vague or unsupported'],
    claims: [
      { text: 'It is good.', answer: 'Vague or unsupported' },
      { text: 'It remained steady during the approved check, so the observation supports stability.', answer: 'Evidence-based' },
      { text: 'It will last forever.', answer: 'Vague or unsupported' },
      { text: 'The observed result met the chosen function criterion, but one specific area could be improved.', answer: 'Evidence-based' }
    ]
  },
  {
    id: '10',
    title: 'Aesthetic vocabulary crossword',
    mechanic: 'Intersecting clue puzzle',
    topic: 'Aesthetic vocabulary and final evaluation',
    summary: 'Solve six intersecting design terms from their meanings, then use one in a saved evaluation sentence.',
    type: 'crossword',
    sourceNote: 'Authorised Footstool deck aesthetics vocabulary and source-bounded course theory.',
    entries: [
      { number: 1, answer: 'PROPORTION', clue: 'Size relationships between parts.', row: 0, col: 8, direction: 'down' },
      { number: 2, answer: 'BALANCE', clue: 'The way features appear evenly or deliberately arranged.', row: 5, col: 2, direction: 'down' },
      { number: 3, answer: 'AESTHETICS', clue: 'The visual qualities and appearance of a design.', row: 6, col: 2, direction: 'across' },
      { number: 4, answer: 'TEXTURE', clue: 'The surface quality seen or felt.', row: 6, col: 5, direction: 'down' },
      { number: 5, answer: 'CONTRAST', clue: 'A noticeable difference between visual elements.', row: 6, col: 10, direction: 'down' },
      { number: 6, answer: 'UNITY', clue: 'The sense that visual features belong together.', row: 10, col: 5, direction: 'across' }
    ]
  }
];
