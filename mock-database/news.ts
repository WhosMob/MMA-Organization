export interface MockNews {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  isPopular: boolean;
}

export const news: MockNews[] = [
  {
    id: "nws-001",
    title: "Lewis vs Washington Superfight Delivers at MMA 40",
    slug: "lewis-washington-superfight-delivers",
    excerpt:
      "Heavyweight champion Derek Lewis stopped light heavyweight king Jamal Washington in the second round of their long-awaited superfight in London.",
    content:
      "The O2 Arena exploded as heavyweight champion Derek Lewis landed a looping right hand that closed the show in the second round of his superfight with light heavyweight champion Jamal Washington at MMA 40: Collision Course.\n\nWashington, who moved up a division for the blockbuster, started fast and won the opening exchanges with explosive kicks. But Lewis walked through everything and turned the fight in an instant, dropping Washington with a short left hook before finishing with follow-up shots on the ground.\n\nAfter the win, Lewis called for unification fights across the heavyweight division and left the door open to a rematch at a heavier weight.\n\n\"I told you all, the belt stays in the heavyweight division,\" Lewis said inside the cage. \"Respect to Jamal for taking the fight. That man is a warrior.\"",
    imageUrl:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1920&q=80",
    publishedAt: "2026-08-23T09:00:00.000Z",
    isPopular: true,
  },
  {
    id: "nws-002",
    title: "Two Title Fights Finalized for MMA — Night of Champions",
    slug: "two-title-fights-night-of-champions",
    excerpt:
      "The November 14 card in Las Vegas now features a middleweight title defense from Israel Adesanya and a bantamweight title clash as the main and co-main events.",
    content:
      "The promotion has finalized the championship double-header for MMA — Night of Champions, headlining the November 14 card at T-Mobile Arena in Las Vegas.\n\nMiddleweight champion Israel Adesanya will defend his title against the division's number one contender in the main event, while bantamweight champion Aljamain Sterling defends against the division's top-ranked challenger in the co-main event.\n\nTickets for the event at the T-Mobile Arena are expected to sell out quickly, with the promotion confirming more main card bouts will be announced in the coming weeks.\n\nNight of Champions marks the organization's final event of 2026 and is being billed as the biggest card of the year.",
    imageUrl:
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=1920&q=80",
    publishedAt: "2026-09-01T14:00:00.000Z",
    isPopular: true,
  },
  {
    id: "nws-003",
    title: "Marcus Rivera Books Non-Title Showcase at Night of Champions",
    slug: "marcus-rivera-night-of-champions",
    excerpt:
      "Lightweight champion Marcus Rivera will return for a non-title showcase at MMA — Night of Champions and is already targeting a unification clash in early 2027.",
    content:
      "Lightweight champion Marcus Rivera will return to the cage at MMA — Night of Champions, taking on a top-five-ranked contender in a non-title showcase bout.\n\nRivera's last title defense was a dominant finish at MMA 39: Homecoming, and the champion has been clear about wanting activity while the lightweight division's contenders sort themselves out.\n\n\"I do not need the belt on the line to go out there and put on a show,\" Rivera said. \"I want to be the busiest champion on the roster. After this, unification is next.\"\n\nThe matchup rounds out a stacked main card that already features two championship fights.",
    imageUrl:
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1920&q=80",
    publishedAt: "2026-09-02T11:30:00.000Z",
    isPopular: false,
  },
  {
    id: "nws-004",
    title: "Jamal Washington Weighs Options After Superfight Loss",
    slug: "jamal-washington-weighs-options",
    excerpt:
      "After his second-round defeat to Derek Lewis, light heavyweight champion Jamal Washington says a rematch at heavyweight is firmly on the table.",
    content:
      "Light heavyweight champion Jamal Washington has refused to rule out a rematch with heavyweight champion Derek Lewis, one week removed from his second-round stoppage loss at MMA 40: Collision Course.\n\nWashington was competitive in the opening round before being caught by a looping right hand in the second. The champion took the loss with grace and immediately turned his attention to the road back.\n\n\"I moved up and I took my shot. No excuses,\" Washington said. \"If the organization wants the rematch, I will be there. But first I defend my own belt.\"\n\nWashington is expected to make the first defense of his light heavyweight title in early 2027.",
    imageUrl:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1920&q=80",
    publishedAt: "2026-08-28T16:00:00.000Z",
    isPopular: false,
  },
  {
    id: "nws-005",
    title: "The Flyweight Trilogy Question: Moreno Weighs In",
    slug: "flyweight-trilogy-question-moreno",
    excerpt:
      "Flyweight champion Brandon Moreno opens up on the division's biggest debate and what it would take to close the book on his rivalry.",
    content:
      "Flyweight champion Brandon Moreno has addressed the biggest question in the division: is there a third chapter waiting on the other side of his rivalry?\n\nThe champion has split opinions since reclaiming the belt at MMA 38: Ground Zero, and a returning former titleholder has already called for the trilogy.\n\n\"I never say no to a fight that makes sense,\" Moreno said. \"If the people want it and the timing is right, I will sign the contract. That is what champions do.\"\n\nA trilogy fight would be the front-runner to headline the first pay-per-view card of 2027.",
    imageUrl:
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1920&q=80",
    publishedAt: "2026-08-19T10:00:00.000Z",
    isPopular: true,
  },
  {
    id: "nws-006",
    title: "The New Breed: Five Prospects Ready to Break Through",
    slug: "new-breed-five-prospects",
    excerpt:
      "From undefeated finishers to regional champions, we break down five prospects who could headline cards within the next two years.",
    content:
      "Every title reign starts with an unknown name making a statement. The organization's 2026 slate has produced a wave of undefeated prospects ready to make the leap.\n\nWe profile five fighters — three finishers and two grinders — who have outgrown the developmental phase and are one signature win away from the rankings.\n\nEach candidate is expected to be matched with ranked opposition on upcoming cards, with the winner of those bouts earning a direct path into the divisional top fifteen.\n\nThe prospect pool is the deepest the organization has seen, and the coming twelve months will separate the contenders from the contenders.",
    imageUrl:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80",
    publishedAt: "2026-07-30T13:00:00.000Z",
    isPopular: false,
  },
  {
    id: "nws-007",
    title: "Volkanovski on Legacy, Father Time, and the Featherweight Throne",
    slug: "volkanovski-legacy-featherweight",
    excerpt:
      "Featherweight champion Alexander Volkanovski sits down for a wide-ranging interview on records, longevity, and knowing when it is time to walk away.",
    content:
      "Featherweight champion Alexander Volkanovski has nothing left to prove. The record book is full of his name. Yet, in a wide-ranging interview, the champion insists the drive has never been higher.\n\n\"Legacy is not built by looking back,\" Volkanovski said. \"It is built by defending what you built. Every time I hear my name called, I want to be the man walking out of the cage with his hand raised.\"\n\nOn the subject of retirement, the champion was measured, pointing to body and mind rather than the calendar as the deciding factor.\n\n\"I will know when it is time. It will not be the fans telling me, and it will not be a number on a scale. It will be me.\"",
    imageUrl:
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1920&q=80",
    publishedAt: "2026-06-15T08:00:00.000Z",
    isPopular: true,
  },
  {
    id: "nws-008",
    title: "MMA — Warpath Confirmed for Madison Square Garden",
    slug: "mma-warpath-msg-confirmed",
    excerpt:
      "The promotion makes it official: the February 2027 mega-card returns to New York City with title implications across three divisions.",
    content:
      "The promotion has confirmed that MMA — Warpath will take place on February 20, 2027 at Madison Square Garden in New York City.\n\nThe event marks the organization's return to the venue and serves as the flagship card of the early 2027 schedule, with title implications across three divisions already in play.\n\nFull card announcements are expected throughout the winter, with the promotion teasing at least one championship fight and a number one contender matchup on the night.\n\n\"Madison Square Garden is where legends are made,\" said the organization's matchmaker. \"Warpath will be a statement for the entire sport.\"",
    imageUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1920&q=80",
    publishedAt: "2026-08-08T12:00:00.000Z",
    isPopular: false,
  },
];