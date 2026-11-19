// All copy originates here.
// Forbidden words check: NO monograph, NO folio, NO nocturne, NO archival, NO atelier.

export interface ContentData {
  masthead: {
    title: string;
    edition: string;
    volume: string;
    date: string;
  };
  cover: {
    firstName: string;
    fullName: string;
    tagline: string;
    coverLines: string[];
    issueNotice: string;
  };
  portraits: {
    sectionTitle: string;
    subtitle: string;
    items: {
      id: string;
      title: string;
      caption: string;
      accent: string;
    }[];
  };
  disciplines: {
    sectionTitle: string;
    subtitle: string;
    canvas: {
      title: string;
      kicker: string;
      caption: string;
    };
    calligraphy: {
      title: string;
      kicker: string;
      caption: string;
    };
    spellBee: {
      title: string;
      kicker: string;
      caption: string;
      letters: string[];
    };
    rangoli: {
      title: string;
      kicker: string;
      caption: string;
    };
    dance: {
      title: string;
      kicker: string;
      caption: string;
    };
    singing: {
      title: string;
      kicker: string;
      caption: string;
    };
    throwball: {
      title: string;
      kicker: string;
      caption: string;
    };
    athletics: {
      title: string;
      kicker: string;
      caption: string;
    };
  };
  closing: {
    cardFront: {
      name: string;
      title: string;
      tagline: string;
    };
    cardBack: {
      curatorNote: string;
      curatorName: string;
      ratingPrompt: string;
      whatsappNumber: string;
      whatsappMessage: string;
    };
    backToTop: string;
  };
}

export const content: ContentData = {
  masthead: {
    title: "THE CHAYA ISSUE · VOL. 1",
    edition: "PRIVATE GIFT EDITION",
    volume: "VOL. 01",
    date: "GOLDEN HOUR 2026",
  },
  cover: {
    firstName: "CHAYA",
    fullName: "CHAYA KOTYAN",
    tagline: "A portrait of grace, discipline, and quiet brilliance.",
    coverLines: [
      "GOLDEN HOUR EDIT: THE UNSTOPPABLE STRENGTH OF GRACE",
      "FROM BHARATANATYAM TO SPELL BEE: AN UNFILTERED PORTRAIT",
      "COURT TACTICS & CLASSICAL DISCIPLINE: PLAYING TO WIN",
    ],
    issueNotice: "EXCLUSIVE COMPILATION · NON-COMMERCIAL · PRIVATE GIFT",
  },
  portraits: {
    sectionTitle: "PORTRAITS",
    subtitle: "A decade of presence, captured frame by frame",
    items: [
      { id: "03", title: "Study in Sunlight", caption: "Natural warmth and poise", accent: "gold" },
      { id: "01", title: "The Opening Stance", caption: "Quiet focus before the storm", accent: "saree" },
      { id: "11", title: "Evening Silhouette", caption: "Draped in festive elegance", accent: "hibiscus" },
      { id: "07", title: "Gaze of the Champion", caption: "Calculated clarity", accent: "aqua" },
      { id: "05", title: "Laughter in Bloom", caption: "Candid joy amidst the greens", accent: "leaf" },
      { id: "10", title: "Regal Demeanor", caption: "Dignified in traditional silk", accent: "gold" },
      { id: "09", title: "Contemplation", caption: "Between thoughts and aspirations", accent: "saree" },
      { id: "08", title: "Kinetic Momentum", caption: "Always in forward drive", accent: "hibiscus" },
      { id: "06", title: "Serenity", caption: "Soft light through courtyard leaves", accent: "aqua" },
      { id: "12", title: "The Signature", caption: "Unmistakable and resolute", accent: "leaf" },
    ],
  },
  disciplines: {
    sectionTitle: "EIGHT DISCIPLINES",
    subtitle: "Mastery is not a singular trait; it is a way of life.",
    canvas: {
      title: "CANVAS",
      kicker: "PIGMENT & INTENTION",
      caption: "Layered strokes in deep midnight indigo, gold leaf, and rich hibiscus.",
    },
    calligraphy: {
      title: "CALLIGRAPHY",
      kicker: "THE WRITTEN LINE",
      caption: "A steady wrist that turns ordinary ink into fluid devotion.",
    },
    spellBee: {
      title: "SPELL BEE",
      kicker: "LEXICAL PRECISION",
      caption: "Every syllable spoken with razor-sharp certainty under stadium lights.",
      letters: ["C", "H", "A", "Y", "A"],
    },
    rangoli: {
      title: "RANGOLI",
      kicker: "SACRED GEOMETRY",
      caption: "Radial symmetry blossoming from a single grain of rice flour at sunrise.",
    },
    dance: {
      title: "DANCE",
      kicker: "BHARATANATYAM INTERLUDE",
      caption: "Rhythm rooted in centuries of mudra, expression, and swift footwork.",
    },
    singing: {
      title: "SINGING",
      kicker: "VOCAL SILK",
      caption: "Melodic contours that float like iridescent silk ribbons on dusk air.",
    },
    throwball: {
      title: "THROWBALL",
      kicker: "COURT TACTICS",
      caption: "Split-second spikes, unyielding defensive dives, and captain's instincts.",
    },
    athletics: {
      title: "ATHLETICS",
      kicker: "PACE & ENDURANCE",
      caption: "Speed built on dawn training laps and relentless dedication.",
    },
  },
  closing: {
    cardFront: {
      name: "CHAYA KOTYAN",
      title: "PATRON OF EIGHT DISCIPLINES",
      tagline: "An irreplaceable force. Formidable on the court, radiant in life.",
    },
    cardBack: {
      curatorNote: "Designed with heartfelt admiration and high aesthetic standards.",
      curatorName: "Curated by Akarsh",
      ratingPrompt: "Rate this portfolio",
      whatsappNumber: "+919876543210",
      whatsappMessage: "Hey Akarsh! Loved Chaya's portfolio edition. My rating is: ",
    },
    backToTop: "Return to Cover",
  },
};

/**
 * Accessor helper that guarantees no missing text crashes and returns [TAG] if a string is missing.
 */
export function getCopy(path: string, fallbackTag?: string): string {
  const parts = path.split(".");
  let current: any = content;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      return `[${fallbackTag || path.toUpperCase()}]`;
    }
  }
  if (typeof current === "string") {
    return current;
  }
  return `[${fallbackTag || path.toUpperCase()}]`;
}
