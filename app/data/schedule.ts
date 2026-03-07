export interface ScheduleEvent {
  session: "FN" | "AN" | "Online" | "Full Day";
  time: string;
  title: string;
  venue: string;
}

export interface ScheduleDay {
  day: string;
  events: ScheduleEvent[];
}

export const schedule: ScheduleDay[] = [
  {
    day: "Day 1 – 13th March 2026",
    events: [
      {
        session: "Full Day",
        time: "All Day",
        title: "Youth Parliament",
        venue: "Seminar Hall",
      },
      {
        session: "Full Day",
        time: "All Day",
        title: "Book Fair Stall",
        venue: "On-campus stall",
      },
      {
        session: "FN",
        time: "11:00 AM – 12:00 PM (Offline)",
        title: "Workshop – Engaging Public Speaking",
        venue: "Speaker: Amritha, Seminar Hall",
      },
      {
        session: "AN",
        time: "Afternoon",
        title: "Writers' Hunt: The Literary Quest Competition",
        venue: "Classroom",
      },
      {
        session: "Online",
        time: "6:30 PM (Online)",
        title: "Workshop – Emotional Intelligence in the Time of Artificial Intelligence",
        venue: "Speaker: Dr. Ashwini (Osmania University), Online",
      },
      {
        session: "Online",
        time: "8:00 PM (Online)",
        title: "Alumni Talk",
        venue: "Speakers: Siddarth, Kruthika, Ishit, Online",
      },
    ],
  },
  {
    day: "Day 2 – 14th March 2026",
    events: [
      {
        session: "Full Day",
        time: "All Day",
        title: "Book Fair Stall",
        venue: "On-campus stall",
      },
      {
        session: "FN",
        time: "11:00 AM",
        title: "Kaavya Manch – Open Mic Poetry",
        venue: "CVR Square",
      },
      {
        session: "FN",
        time: "Forenoon",
        title: "Declamation on Harry Potter Series Competition",
        venue: "Classroom",
      },
    ],
  },
];

export const eventsList = [
  "Youth Parliament",
  "Book Fair Stall",
  "Workshop – Engaging Public Speaking",
  "Writers' Hunt: The Literary Quest Competition",
  "Workshop – Emotional Intelligence in the Time of Artificial Intelligence",
  "Alumni Talk",
  "Kaavya Manch – Open Mic Poetry",
  "Declamation on Harry Potter Series Competition"
];

export interface EventConfig {
  name: string;
  fee: number;
  gradient: string;
}

export const eventsConfig: EventConfig[] = [
  { name: "Youth Parliament", fee: 100, gradient: "linear-gradient(135deg, #4a009e 0%, #7c3aed 100%)" },
  { name: "Book Fair Stall", fee: 0, gradient: "linear-gradient(135deg, #0f172a 0%, #334155 100%)" },
  { name: "Workshop – Engaging Public Speaking", fee: 0, gradient: "linear-gradient(135deg, #4a009e 0%, #7c3aed 100%)" },
  { name: "Writers' Hunt: The Literary Quest Competition", fee: 50, gradient: "linear-gradient(135deg, #1a0040 0%, #5a00c8 100%)" },
  { name: "Workshop – Emotional Intelligence in the Time of Artificial Intelligence", fee: 50, gradient: "linear-gradient(135deg, #3d1080 0%, #a78bfa 100%)" },
  { name: "Alumni Talk", fee: 0, gradient: "linear-gradient(135deg, #1a003d 0%, #6d28d9 100%)" },
  { name: "Kaavya Manch – Open Mic Poetry", fee: 0, gradient: "linear-gradient(135deg, #2d006b 0%, #8b5cf6 100%)" },
  { name: "Declamation on Harry Potter Series Competition", fee: 50, gradient: "linear-gradient(135deg, #2d006b 0%, #c084fc 100%)" }
];
