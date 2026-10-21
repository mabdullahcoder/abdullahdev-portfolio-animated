/**
 * Testimonial cards around the "What people say about me" title.
 * `position` places a card (percent of the viewport) in the floating desktop layout; tablets and
 * phones lay the same cards out in a grid or swipe row, in array order.
 * Cards appear in array order. `depth` (0..1) scales the pointer parallax — nearer cards drift more.
 * `source` is "testimonial" for direct recommendations or "review" for reviews from freelance clients.
 * Replace `url` with a link to the original recommendation or review.
 */
export const PRESS = [
  {
    id: "sarah-mitchell",
    author: "Sarah Mitchell",
    role: "Engineering Manager, Brightlane",
    source: "testimonial",
    body: "Abdullah joined us as an intern and was shipping production features within the first month. Curious, quick to learn and great at asking the right questions.",
    url: "#",
    depth: 1,
    position: { x: 26, y: 14 },
  },
  {
    id: "james-carter",
    author: "James Carter",
    role: "Senior Developer, Brightlane",
    source: "testimonial",
    body: "Writes clean, well-tested code and takes review feedback seriously. Abdullah grew more in one year than many developers do in three.",
    url: "#",
    depth: 0.55,
    position: { x: 55.5, y: 16 },
  },
  {
    id: "elena-rossi",
    author: "Elena Rossi",
    role: "Founder, Kitebase",
    source: "review",
    body: "Abdullah built our landing page and booking dashboard in Next.js, on time and on budget. Clear communication from start to finish.",
    url: "#",
    depth: 0.75,
    position: { x: 4.5, y: 35 },
  },
  {
    id: "michael-chen",
    author: "Michael Chen",
    role: "Founder, Promptly",
    source: "review",
    body: "Delivered our AI chat app with streaming replies and Stripe billing. Reliable, responsive and easy to work with — we'd happily hire Abdullah again.",
    url: "#",
    depth: 0.45,
    position: { x: 77, y: 37 },
  },
  {
    id: "aisha-khan",
    author: "Aisha Khan",
    role: "Hackathon Teammate",
    source: "testimonial",
    lead: "The teammate you want at 3 a.m. in a hackathon.",
    body: "Abdullah wired up the whole backend in a weekend and still found time to polish the UI.",
    url: "#",
    depth: 0.9,
    position: { x: 13.5, y: 64 },
  },
  {
    id: "david-novak",
    author: "David Novak",
    role: "Capstone Mentor",
    source: "testimonial",
    body: "The capstone stood out for its clean architecture, solid tests and clear docs. Abdullah turns feedback into improvements remarkably fast.",
    url: "#",
    depth: 0.6,
    position: { x: 40.75, y: 66 },
  },
  {
    id: "priya-sharma",
    author: "Priya Sharma",
    role: "Owner, Tidewell Studio",
    source: "review",
    body: "Professional from day one. Daily updates, pixel-perfect UI and a codebase that was easy for us to maintain after handover.",
    url: "#",
    depth: 0.8,
    position: { x: 68, y: 62 },
  },
];
