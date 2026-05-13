// src/components/SkyQuiz.tsx
import { useState } from 'react';

interface Question {
  id:      string;
  text:    string;
  options: { label: string; value: string; icon: string }[];
}

interface Result {
  title:       string;
  description: string;
  recommend:   string;
  link:        string;
  reason:      string;
}

const questions: Question[] = [
  {
    id:   'budget',
    text: "What's your budget?",
    options: [
      { label: 'Under $150',       value: 'low',     icon: '💸' },
      { label: '$150 – $400',      value: 'mid',     icon: '💰' },
      { label: '$400 – $800',      value: 'high',    icon: '💎' },
      { label: '$800+',            value: 'premium', icon: '🏆' },
    ],
  },
  {
    id:   'goal',
    text: 'What do you most want to look at?',
    options: [
      { label: 'Planets & Moon',   value: 'planets', icon: '🪐' },
      { label: 'Deep sky objects', value: 'dso',     icon: '🌌' },
      { label: 'A bit of both',    value: 'both',    icon: '⭐' },
      { label: 'Astrophotography', value: 'photo',   icon: '📷' },
    ],
  },
  {
    id:   'location',
    text: 'Where will you mostly stargaze?',
    options: [
      { label: 'City / suburbs',   value: 'urban',   icon: '🏙️' },
      { label: 'Rural dark skies', value: 'rural',   icon: '🌾' },
      { label: 'Mix of both',      value: 'mixed',   icon: '🗺️' },
    ],
  },
  {
    id:   'experience',
    text: 'How much experience do you have?',
    options: [
      { label: 'Complete beginner', value: 'none',   icon: '🌱' },
      { label: 'Used one before',   value: 'some',   icon: '📚' },
      { label: 'Fairly experienced',value: 'good',   icon: '🎓' },
    ],
  },
  {
    id:   'portability',
    text: 'Will you travel with it?',
    options: [
      { label: "Yes, frequently",  value: 'yes',     icon: '🎒' },
      { label: "Occasionally",     value: 'sometimes',icon: '🚗' },
      { label: "No, stays home",   value: 'no',      icon: '🏠' },
    ],
  },
];

function getResult(answers: Record<string, string>): Result {
  const { budget, goal, location, experience, portability } = answers;

  if (budget === 'low' && goal === 'planets') return {
    title:      'Celestron AstroMaster 70AZ',
    description:'A solid entry-level refractor perfect for the Moon, planets, and learning the ropes.',
    recommend:  'Best for: Total beginners on a tight budget who want to see planets',
    link:       '/reviews/celestron-astromaster-70az',
    reason:     'At under $150, this is the sweet spot for beginners. Easy setup, no collimation needed, and you\'ll see Jupiter\'s bands and Saturn\'s rings clearly.',
  };

  if ((budget === 'mid' || budget === 'low') && goal === 'dso' && portability === 'no') return {
    title:      'Apertura AD8 Dobsonian',
    description:'An 8-inch Dobsonian with incredible light-gathering power for the price.',
    recommend:  'Best for: Beginners who want to explore deep sky objects from dark skies',
    link:       '/reviews/apertura-ad8-dobsonian',
    reason:     'The Dobsonian design gives you the most aperture per dollar of any telescope type. The AD8\'s 8-inch mirror will show you nebulae, galaxies, and star clusters in breathtaking detail.',
  };

  if (goal === 'photo' && (budget === 'high' || budget === 'premium')) return {
    title:      'Sky-Watcher EvoStar 80ED + Star Adventurer',
    description:'A dedicated astrophotography refractor paired with a portable tracking mount.',
    recommend:  'Best for: Beginners serious about astrophotography',
    link:       '/reviews/sky-watcher-evostar-80ed',
    reason:     'The ED glass delivers pinpoint stars, and the Star Adventurer mount tracks the sky accurately enough for exposures up to several minutes. A proper intro to AP.',
  };

  if (portability === 'yes' || location === 'urban') return {
    title:      'Celestron NexStar 5SE',
    description:'A compact, computerized Schmidt-Cassegrain that finds objects automatically.',
    recommend:  'Best for: Urban stargazers who travel with their scope',
    link:       '/reviews/celestron-nexstar-5se',
    reason:     'The GoTo computerized mount finds objects for you — perfect when you can\'t let your eyes dark-adapt in a bright city. The 5" aperture handles light pollution well.',
  };

  if (budget === 'mid' && goal === 'both' && experience === 'none') return {
    title:      'Sky-Watcher 8" FlexTube Dobsonian',
    description:'A collapsible 8-inch Dobsonian that stores flat and performs brilliantly.',
    recommend:  'Best for: Enthusiastic beginners who want serious capability',
    link:       '/reviews/sky-watcher-flextube-8-dobsonian',
    reason:     'The FlexTube design collapses for easy storage. 8 inches of aperture will show you planets AND deep sky objects well, and Dobsonians are the easiest mount type to learn on.',
  };

  // Default fallback
  return {
    title:      'Celestron NexStar 130SLT',
    description:'A computerized 130mm reflector that balances ease of use with real capability.',
    recommend:  'Best for: Beginners who want help finding objects',
    link:       '/reviews/celestron-nexstar-130slt',
    reason:     'The computerized GoTo mount removes the frustration of finding objects in the dark. The 130mm mirror gives excellent planetary and some deep sky views.',
  };
}

export default function SkyQuiz() {
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone]       = useState(false);

  const question = questions[step];
  const result   = done ? getResult(answers) : null;
  const progress = (step / questions.length) * 100;

  function choose(value: string) {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    if (step + 1 >= questions.length) {
      setDone(true);
    } else {
      setStep(s => s + 1);
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setDone(false);
  }

  if (done && result) return (
    <div style={{ animation: 'fadeUp 0.5s ease-out' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span style={{ fontSize: '3rem' }}>🎉</span>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.75rem',
                     color: '#eef4ff', margin: '0.5rem 0' }}>
          Your perfect match:
        </h2>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #0a1530, #0f1f45)',
                    border: '1px solid rgba(74,158,255,0.3)', borderRadius: '16px',
                    padding: '1.75rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem',
                     color: '#f5c842', margin: '0 0 0.5rem' }}>
          {result.title}
        </h3>
        <p style={{ color: '#c8d8e8', marginBottom: '1rem', lineHeight: 1.6 }}>
          {result.description}
        </p>
        <p style={{ background: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.25)',
                    borderRadius: '8px', padding: '0.75rem 1rem',
                    color: '#2dd4bf', fontSize: '0.875rem', marginBottom: '1rem' }}>
          {result.recommend}
        </p>
        <p style={{ color: '#c8d8e8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          <strong style={{ color: '#eef4ff' }}>Why we picked it:</strong> {result.reason}
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a href={result.link}
             style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      background: '#f5c842', color: '#0a0a0a', fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '10px',
                      textDecoration: 'none', fontSize: '0.9rem' }}>
            Read Full Review →
          </a>
          <button onClick={reset}
                  style={{ background: 'transparent', border: '1px solid rgba(200,216,232,0.2)',
                           color: '#c8d8e8', fontFamily: '"DM Sans", sans-serif',
                           padding: '0.75rem 1.5rem', borderRadius: '10px',
                           cursor: 'pointer', fontSize: '0.9rem' }}>
            Start Over
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Progress bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem',
                         color: 'rgba(200,216,232,0.5)' }}>
            Question {step + 1} of {questions.length}
          </span>
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem',
                         color: '#f5c842' }}>
            {Math.round(progress)}% complete
          </span>
        </div>
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
          <div style={{ height: '100%', background: '#f5c842', borderRadius: '2px',
                        width: `${progress}%`, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* Question */}
      <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.75rem',
                   color: '#eef4ff', marginBottom: '1.5rem', lineHeight: 1.3 }}>
        {question.text}
      </h2>

      {/* Options */}
      <div style={{ display: 'grid', gap: '0.75rem',
                    gridTemplateColumns: question.options.length === 3 ? '1fr 1fr 1fr' : '1fr 1fr' }}>
        {question.options.map(opt => (
          <button
            key={opt.value}
            onClick={() => choose(opt.value)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
                     gap: '0.5rem', padding: '1.25rem', borderRadius: '12px',
                     background: '#060d1f', border: '1px solid rgba(200,216,232,0.15)',
                     color: '#c8d8e8', fontFamily: '"DM Sans", sans-serif',
                     cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500,
                     transition: 'all 0.15s ease', textAlign: 'center',
                   }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(74,158,255,0.4)';
              (e.currentTarget as HTMLButtonElement).style.background  = 'rgba(74,158,255,0.08)';
              (e.currentTarget as HTMLButtonElement).style.color       = '#eef4ff';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(200,216,232,0.15)';
              (e.currentTarget as HTMLButtonElement).style.background  = '#060d1f';
              (e.currentTarget as HTMLButtonElement).style.color       = '#c8d8e8';
            }}
          >
            <span style={{ fontSize: '1.75rem' }}>{opt.icon}</span>
            {opt.label}
          </button>
        ))}
      </div>

      {step > 0 && (
        <button onClick={() => setStep(s => s - 1)}
                style={{ marginTop: '1.5rem', background: 'none', border: 'none',
                         color: 'rgba(200,216,232,0.4)', cursor: 'pointer',
                         fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem' }}>
          ← Back
        </button>
      )}
    </div>
  );
}
