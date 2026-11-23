// Alle gegevens die op meerdere pagina's terugkomen staan hier.
// Pas je cijfers, prijzen of links aan? Dan hoeft dat alleen hier.
export default {
  url: "https://www.wietekevandiggele.nl",
  name: "Wieteke van Diggele",
  persona: "Wiet",
  email: "vuur@wietekevandiggele.nl",
  kvk: "76209482",
  btw: "NL003067228B57",
  since: 2019,

  // Cijfers voor merken. Werk ze bij en zet de peildatum erbij.
  stats: {
    followers: "17.349",
    views30d: "2,4 mln",
    storyViews: "4.000+",
    jarenOndernemer: "7",
    asOf: "november 2026",
  },

  prices: {
    aanslingercall: "€150",
    va: "€75",
    matchmaking: "€399",
  },

  links: {
    aanslingercall: "https://wietekevandiggele.kennis.shop/pay/aanslingercall",
    aanslingercallXXL: "https://wietekevandiggele.kennis.shop/pay/aanslingercall-xxl",
    vaKennismaking: "https://calendly.com/wietekevandiggele/wiet-als-va-kennismaking",
    matchmakingForm: "https://forms.gle/reES8eCsu8rb3NNd6",
    dipTest: "https://forms.gle/FLyaXEQy8gXZob886",
    newsletter: "https://wietekevandiggele.activehosted.com/f/10",
  },

  socials: {
    instagram: "https://www.instagram.com/wietekevandiggele/",
    instagramHandle: "@wietekevandiggele",
    linkedin: "https://www.linkedin.com/in/wietekevandiggele/",
    facebook: "https://www.facebook.com/wietekevdiggele",
    tiktok: "", // TODO: TikTok-link invullen, dan verschijnt hij vanzelf in de footer
  },

  // Live Instagram-feed: vul hier de URL van je JSON-feed in (bijv. van Behold.so).
  // Leeg = de site toont een nette 'Volg mij'-blok in plaats van de feed.
  instagramFeedUrl: "",

  // Contactformulier: vul hier een Web3Forms access key in om het formulier aan te zetten.
  // Leeg = de contactpagina toont alleen mail, agenda en DM.
  web3formsKey: "",
};
