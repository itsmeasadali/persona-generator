export type Occupation = 'technology' | 'healthcare' | 'education' | 'finance' | 'creative' | 'retail' | 'manufacturing' | 'consulting'

export const occupations = [
  'technology',
  'healthcare',
  'education',
  'finance',
  'creative',
  'retail',
  'manufacturing',
  'consulting'
] as const

// First, define the nested types separately
type AvatarMap = {
  readonly [key in Occupation]: readonly string[]
}

type TraitsMap = {
  readonly [key in Occupation]: readonly string[]
}

type ChallengesMap = {
  readonly [key in Occupation]: readonly string[]
}

export type PersonaDataType = {
  readonly maleNames: readonly string[]
  readonly femaleNames: readonly string[]
  readonly avatars: AvatarMap
  readonly traits: TraitsMap
  readonly challenges: ChallengesMap
}

export const personaData = {
  maleNames: [
    'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
    'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Donald', 'Mark', 'Paul', 'Steven', 'Andrew', 'Kenneth'
  ],
  femaleNames: [
    'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
    'Lisa', 'Nancy', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle'  
  ],
  avatars: {
    technology: ['/avatars/tech-male.png', '/avatars/tech-female.png'],
    healthcare: ['/avatars/health-male.png', '/avatars/health-female.png'],
    education: ['/avatars/edu-male.png', '/avatars/edu-female.png'],
    finance: ['/avatars/finance-male.png', '/avatars/finance-female.png'],
    creative: ['/avatars/creative-male.png', '/avatars/creative-female.png'],
    retail: ['/avatars/retail-male.png', '/avatars/retail-female.png'],
    manufacturing: ['/avatars/mfg-male.png', '/avatars/mfg-female.png'],
    consulting: ['/avatars/consulting-male.png', '/avatars/consulting-female.png']
  },
  traits: {
    technology: [
      'Tech-savvy', 'Analytical', 'Problem-solver', 'Innovation-driven', 'Detail-oriented',
      'Quick learner', 'Adaptable', 'Logical thinker', 'Team player', 'Self-motivated'
    ],
    healthcare: [
      'Compassionate', 'Patient', 'Detail-oriented', 'Calm under pressure', 'Good communicator',
      'Empathetic', 'Reliable', 'Professional', 'Team player', 'Quick decision maker'
    ],
    education: [
      'Patient', 'Supportive', 'Good communicator', 'Organized', 'Creative',
      'Adaptable', 'Enthusiastic', 'Empathetic', 'Motivating', 'Resourceful'
    ],
    finance: [
      'Analytical', 'Detail-oriented', 'Risk-aware', 'Strategic thinker', 'Goal-oriented',
      'Organized', 'Ethical', 'Professional', 'Decision maker', 'Number-savvy'
    ],
    creative: [
      'Innovative', 'Imaginative', 'Artistic', 'Open-minded', 'Expressive',
      'Original thinker', 'Passionate', 'Adaptable', 'Collaborative', 'Intuitive'
    ],
    retail: [
      'Customer-focused', 'Friendly', 'Patient', 'Quick learner', 'Team player',
      'Adaptable', 'Organized', 'Problem-solver', 'Multi-tasker', 'Sales-oriented'
    ],
    manufacturing: [
      'Safety-conscious', 'Detail-oriented', 'Process-driven', 'Team player', 'Reliable',
      'Quality-focused', 'Efficient', 'Problem-solver', 'Organized', 'Technical'
    ],
    consulting: [
      'Strategic thinker', 'Problem-solver', 'Good communicator', 'Analytical', 'Client-focused',
      'Adaptable', 'Professional', 'Leadership skills', 'Results-driven', 'Team player'
    ]
  },
  challenges: {
    technology: [
      'Keeping up with rapid tech changes',
      'Work-life balance',
      'Remote collaboration',
      'Technical debt management',
      'Security concerns'
    ],
    healthcare: [
      'Long working hours',
      'Emotional stress',
      'Work-life balance',
      'Keeping up with medical advances',
      'Administrative burden'
    ],
    education: [
      'Limited resources',
      'Student engagement',
      'Administrative workload',
      'Technology integration',
      'Diverse learning needs'
    ],
    finance: [
      'Market volatility',
      'Regulatory compliance',
      'Risk management',
      'Technology adoption',
      'Client expectations'
    ],
    creative: [
      'Client communication',
      'Project deadlines',
      'Creative blocks',
      'Work-life balance',
      'Market competition'
    ],
    retail: [
      'Customer satisfaction',
      'Inventory management',
      'Staff turnover',
      'Competition',
      'Work-life balance'
    ],
    manufacturing: [
      'Quality control',
      'Equipment maintenance',
      'Safety compliance',
      'Supply chain issues',
      'Workforce management'
    ],
    consulting: [
      'Client expectations',
      'Travel demands',
      'Work-life balance',
      'Project deadlines',
      'Market competition'
    ]
  }
} satisfies PersonaDataType