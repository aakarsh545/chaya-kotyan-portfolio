// content.ts: FINAL COPY for "The Chaya Issue".
//
// RULES FOR WHOEVER BUILDS THIS
// 1. Render ONLY the strings in this file. Never write, keep or invent other copy.
//    If a slot has no entry here, hide the slot.
// 2. Photo captions are keyed by FILE NUMBER (photo-01 ... photo-12), not by
//    position in the gallery. Every photo gets its caption.
// 3. The tone is a mock-professional magazine, deadpan, a bit stern, then warm.
//    No hearts, no love language, no cutesy words.

export const content = {
  meta: {
    title: "The Chaya Issue · Vol. 1",
    description: "A portfolio. Allegedly.",
  },

  loader: {
    line: "worth the wait",
  },

  // ───────────── COVER ─────────────
  cover: {
    topLeft: "SPECIAL EDITION",
    topCenter: "GOLDEN HOUR 2026",
    topRight: "VOL. 01",
    masthead: "THE CHAYA ISSUE",
    name: "CHAYA",
    coverLine1: { label: "COVER STORY", title: "Eight disciplines. One cover." },
    coverLine2: { label: "EXCLUSIVE", title: "Radiant. Allegedly." },
    strap: {
      label: "NOT FOR RESALE · PRINT RUN: ONE",
      italic: "Inside: portraits, paintbrushes, and one very serious throwball arm.",
    },
    scrollCue: "Turn the page",
  },

  // ───────────── PORTRAITS ─────────────
  portraits: {
    label: "THE PHOTO ESSAY",
    title: "PORTRAITS",
    subtitle: "Twelve frames. Not one retake.",
    bookCover: {
      topLeft: "PORTRAITS",
      topRight: "VOL. 01",
      title: "THE CHAYA ISSUE",
      bottomLeft: "GOLDEN HOUR 2026",
      bottomRight: "SPECIAL EDITION",
    },
    lookCloser: "Look closer",
    lightboxClose: "Close",

    // photo-01 cream kurta + rose dupatta | photo-02 motion-blurred
    // photo-03 aqua, hand at hair         | photo-04 aqua, hero
    // photo-05..11 blue saree, garden     | photo-12 vintage filter
    captions: {
      "01": { title: "Eyes Down, Still Winning", sub: "A technique." },
      "02": { title: "In Motion", sub: "Too fast for the shutter." },
      "03": { title: "Hair Check", sub: "Result: magnetic." },
      "04": { title: "The Official Portrait", sub: "Approved. Luminous." },
      "05": { title: "Garden Season", sub: "The flowers were only the background." },
      "06": { title: "Self-Framed", sub: "Unnecessary, but appreciated." },
      "07": { title: "Looking Up", sub: "Unreal light. Unbothered." },
      "08": { title: "The Drape", sub: "Six yards. Zero struggle." },
      "09": { title: "Posture Check", sub: "Also passed. Effortless." },
      "10": { title: "Pleat Inspection", sub: "Strict standards." },
      "11": { title: "On Schedule", sub: "Golden hour arrived for her." },
      "12": { title: "Final Frame", sub: "Filtered. Barely needed it." },
    },
  },

  // ───────────── EIGHT DISCIPLINES ─────────────
  disciplines: {
    label: "THE RANGE",
    title: "EIGHT DISCIPLINES",
    subtitle: "Each claim independently verified. Appeal process: none.",

    items: [
      {
        n: "I",
        id: "canvas",
        kicker: "Paint",
        title: "Canvas",
        line: "Colors chosen deliberately. Opinions on yours available on request.",
      },
      {
        n: "II",
        id: "calligraphy",
        kicker: "Ink",
        title: "Calligraphy",
        line: "Handwriting better than yours. This is not up for discussion.",
      },
      {
        n: "III",
        id: "spellbee",
        kicker: "Words",
        title: "Spell Bee",
        line: "Spells it right the first time, then mentions it twice.",
      },
      {
        n: "IV",
        id: "rangoli",
        kicker: "Pattern",
        title: "Rangoli",
        line: "Perfect symmetry, one dot at a time. Patience: surprisingly high.",
      },
      {
        n: "V",
        id: "dance",
        kicker: "Rhythm",
        title: "Dance",
        line: "Moves like the music asked permission first.",
        photoLabel: "In motion",
      },
      {
        n: "VI",
        id: "singing",
        kicker: "Voice",
        title: "Singing",
        line: "A little bit of singing. Turns out a little is plenty.",
        playerLabel: "Press play",
      },
      {
        n: "VII & VIII",
        id: "throwball-athletics",
        kicker: "Strength",
        title: "Throwball + Athletics",
        line: "Strength, speed, and a throw that makes the net nervous.",
        kineticWords: ["THROW", "CATCH", "SPRINT", "REPEAT"],
        motto: "Hits hard. Lands soft.",
      },
    ],
  },

  // ───────────── CLOSING ─────────────
  closing: {
    label: "THE LAST PAGE",
    title: "THE CALLING CARD",

    front: {
      topLeft: "EST. 2026",
      topRight: "VOL. I",
      name: "CHAYA KOTYAN",
      tagline: "Finally finished it. Can you please send me notes now?",
      footer: "Eight disciplines · Zero apologies",
      flip: "Tap to flip",
    },

    back: {
      signature: "Curated by Akarsh",
      note: "Zero refunds.",
      ratePrompt: "Rate this portfolio",
      // shown after she taps a star count
      starReactions: {
        1: "Bold of you.",
        2: "Noted. Resented.",
        3: "Fair. Barely.",
        4: "Almost correct.",
        5: "Correct.",
      },
      sendButton: "Send my review",
      // wa.me link. Replace with Akarsh's number, country code first, digits only.
      whatsappNumber: "91XXXXXXXXXX",
      // {stars} is replaced with the number she picked
      whatsappMessage: "Review of The Chaya Issue: {stars}/5. Comments: ",
    },

    backToTop: "Back to the top",
    footerLine1: "THE CHAYA ISSUE · VOL. I · NOT FOR RESALE",
    footerLine2: "Not for sharing either.",
  },
} as const;
