const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const E_entries = {
  EAVESDROP: {
    part: 'v.i.',
    definition: 'Secretly to overhear a catalogue of the ' +
                'crimes and vices of another or yourself.',
    quote: [
      'A lady with one of her ears applied',
      'To an open keyhole heard, inside,',
      'Two female gossips in converse free &mdash;',
      'The subject engaging them was she.',
      '"I think," said one, "and my husband thinks',
      'That she\'s a prying, inquisitive minx!"',
      'As soon as no more of it she could hear',
      'The lady, indignant, removed her ear.',
      '"I will not stay," she said, with a pout,',
      '"To hear my character lied about!"',
    ],
    author: 'Gopete Sherany',
  },
  EDIBLE: {
    part:'adj.',
    definition: 'Good to eat, and wholesome to digest, as ' +
                'a worm to a toad, a toad to a snake, a snake to a pig, ' +
                'a pig to a man, and a man to a worm.',
  },
  EDUCATION: {
    part: 'n.',
    definition: 'That which discloses to the wise and ' +
                'disguises from the foolish their lack of ' +
                'understanding.',
  },
  ELOQUENCE: {
    part: 'n.',
    definition: 'The art of orally persuading fools that ' +
                'white is the color that it appears to be.  It includes ' +
                'the gift of making any color appear white.',
  },
  ELYSIUM: {
    part: 'n.',
    definition: 'An imaginary delightful country which ' +
                'the ancients foolishly believed to be inhabited by the ' +
                'spirits of the good.  This ridiculous and mischievous ' +
                'fable was swept off the face of the earth by the early ' +
                'Christians &mdash; may their souls be happy in Heaven!',
  },
  EMANCIPATION: {
    part: 'n.',
    definition: 'A bondman\'s change from the tyranny of ' +
                'another to the despotism of himself.',
    quote: [
      'He was a slave:  at word he went and came;',
      'His iron collar cut him to the bone.',
      'Then Liberty erased his owner\'s name,',
      'Tightened the rivets and inscribed his own.',
    ],
    author: 'G.J.',
  },
  EMOTION: {
    part: 'n.',
    definition: 'A prostrating disease caused by a ' +
                'determination of the heart to the head.  It is ' +
                'sometimes accompanied by a copious discharge of ' +
                'hydrated chloride of sodium from the eyes.',
  },
  ENVELOPE: {
    part: 'n.',
    definition: 'The coffin of a document; the scabbard ' +
                'of a bill; the husk of a remittance; the bed-gown of a ' +
                'love-letter.',
  },
  ENVY: {
    part: 'n.',
    definition: 'Emulation adapted to the meanest capacity.',
  },
  EPITAPH: {
    part: 'n.',
    definition: 'An inscription on a tomb, showing that ' +
                'virtues acquired by death have a retroactive effect. ' +
                'Following is a touching example:',
    quote: [
      'Here lie the bones of Parson Platt,',
      'Wise, pious, humble and all that,',
      'Who showed us life as all should live it;',
      'Let that be said &mdash; and God forgive it!',
    ],
  },
  EVANGELIST: {
    part: 'n.',
    definition: 'A bearer of good tidings, particularly ' +
                '(in a religious sense) such as assure us of our own ' +
                'salvation and the damnation of our neighbors.',
  },
};

const F_entries = {
  FAITH: {
    part: 'n.',
    definition: 'Belief without evidence in what is told by one who '+
                'speaks without knowledge, of things without parallel.',
  },
  FAMOUS: {
    part: 'adj.',
    definition: 'Conspicuously miserable.',
    quote: [
      'Done to a turn on the iron, behold',
      'Him who to be famous aspired.',
      'Content?  Well, his grill has a plating of gold,',
      'And his twistings are greatly admired.',
    ],
    author: 'Hassan Brubuddy',
  },
  FELON: {
    part: 'n.',
    definition: 'A person of greater enterprise than discretion, who in ' +
                'embracing an opportunity has formed an unfortunate ' +
                'attachment.',
  },
  FIDDLE: {
    part: 'n.',
    definition: 'An instrument to tickle human ears by friction of a ' +
                'horse\'s tail on the entrails of a cat.',
    quote: [
      'To Rome said Nero:  "If to smoke you turn',
      'I shall not cease to fiddle while you burn."',
      'To Nero Rome replied:  "Pray do your worst,',
      '\'Tis my excuse that you were fiddling first."',
    ],
    author: 'Orm Pludge',
  },
  FIDELITY: {
    part: 'n.',
    definition: 'A virtue peculiar to those who are about to be betrayed.',
  },
  FLOP: {
    part: 'v.',
    definition: 'Suddenly to change one\'s opinions and go over to ' +
                'another party.  The most notable flop on record was ' +
                'that of Saul of Tarsus, who has been severely ' +
                'criticised as a turn-coat by some of our partisan journals.',
  },
  FORCE: {
    part: 'n.',
    definition: '',
    quote: [
      '"Force is but might," the teacher said &mdash;',
      '"That definition\'s just."',
      'The boy said naught but thought instead,',
      'Remembering his pounded head:',
      '"Force is not might but must!"',
    ]
  },
  FORGETFULNESS: {
    part: 'n.',
    definition: 'A gift of God bestowed upon doctors in compensation for ' +
                'their destitution of conscience.',
  },
  FRIENDLESS: {
    part: 'adj.',
    definition: 'Having no favors to bestow.  Destitute of fortune. ' +
                'Addicted to utterance of truth and common sense.',
  },
  FRIENDSHIP: {
    part: 'n.',
    definition: 'A ship big enough to carry two in fair weather, but ' +
                'only one in foul.',
    quote: [
      'The sea was calm and the sky was blue;',
      'Merrily, merrily sailed we two.',
      '(High barometer maketh glad.)',
      'On the tipsy ship, with a dreadful shout,',
      'The tempest descended and we fell out.',
      '(O the walking is nasty bad!)',
    ],
    author: 'Armit Huff Bettle',
  },
  FUTURE: {
    part: 'n.',
    definition: 'That period of time in which our affairs prosper, ' +
                'our friends are true and our happiness is assured.',
  },
};

const G_entries = [
  {
    term: 'GALLOWS',
    part: 'n.',
    definition: 'A stage for the performance of miracle plays, in which ' +
                  'the leading actor is translated to heaven. In this ' +
                  'country the gallows is chiefly remarkable for the number ' +
                  'of persons who escape it.',
    quote: [
      'Whether on the gallows high',
      'Or where blood flows the reddest',
      'The noblest place for man to die —',
      'Is where he died the deadest.'
    ],
    author: 'Old play'
  }, {
    term: 'GENEALOGY',
    part: 'n.',
    definition: 'An account of one\'s descent from an ancestor who ' +
                'did not particularly care to trace his own.'
  }, {
    term: 'GENEROUS',
    part: 'adj.',
    definition: 'Originally this word meant noble by birth and was ' +
                'rightly applied to a great multitude of persons. It ' +
                'now means noble by nature and is taking a bit of a rest.'
  }, {
    term: 'GENTEEL',
    part: 'adj.',
    definition: 'Refined, after the fashion of a gent.',
    quote: [
      'Observe with care, my son, the distinction I reveal:',
      'A gentleman is gentle and a gent genteel.',
      'Heed not the definitions your \'Unabridged\' presents,',
      'For dictionary makers are generally gents.'
    ],
    author: 'G.J.'
  }, {
    term: 'GLUTTON',
    part: 'n.',
    definition: 'A person who escapes the evils of moderation by ' +
                'committing dyspepsia.'
  }, {
    term: 'GOOD',
    part: 'adj.',
    definition: 'Sensible, madam, to the worth of this present writer. ' +
                'Alive, sir, to the advantages of letting him alone.'
  }, {
    term: 'GOUT',
    part: 'n.',
    definition: 'A physician\'s name for the rheumatism of a rich patient.'
  }, {
    term: 'GRACES',
    part: 'n.',
    definition: 'Three beautiful goddesses, Aglaia, Thalia and ' +
                'Euphrosyne, who attended upon Venus, serving ' +
                'without salary. They were at no expense for board and ' +
                'clothing, for they ate nothing to speak of and dressed ' +
                'according to the weather, wearing whatever breeze ' +
                'happened to be blowing.'
  }
];

const formatAuthor = entry =>
  entry.author ?
    `<div class="quote-author">${entry.author}</div>` :
    '';

const formatQuote = entry =>
  entry.quote ?
    `
    <div class="quote">
      ${entry.quote.reduce((result, q) => `
        ${result}
        <div class="quote-line">${q}</div>
      `, '')}
      ${formatAuthor(entry)}
    </div>
    ` : '';

const formatEntry = (term, entry) => `
  <div class="entry">
    <h3 class="term">${term}</h3>
    <div class="part">${entry.part}</div>
    <div class="definition">
      ${entry.definition}
      ${formatQuote(entry)}
    </div>
  </div>
`;

app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/e', (req, res) => {
  const term = req.query.term.toUpperCase();
  const entry = E_entries[term];
  var content;

  if (entry) {
    content = formatEntry(term, entry);
  } else {
    content = '<div>Sorry, your term was not found.</div>';
  }

  res.send(content);
});

app.post('/f', (req, res) => {
  const term = req.body.term.toUpperCase();
  const content = Object.keys(F_entries)
    .filter(k => k.includes(term))
    .reduce((result, k) => `
      ${result}
      ${formatEntry(k, F_entries[k])}
    `, '');

  res.send(content);
});

app.get('/g', (req, res) => {
  res.json(G_entries);
});

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
