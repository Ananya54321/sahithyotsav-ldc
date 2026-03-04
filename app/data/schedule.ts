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
        session: "FN",
        time: "9:00 AM – 9:30 AM",
        title: "Registration & Welcome Kit Distribution",
        venue: "Main Entrance Hall",
      },
      {
        session: "FN",
        time: "10:00 AM – 10:45 AM",
        title: "Inauguration Ceremony",
        venue: "College Auditorium",
      },
      {
        session: "FN",
        time: "11:00 AM – 12:30 PM",
        title: "Youth Parliament – Preliminary Round",
        venue: "Seminar Hall A",
      },
      {
        session: "FN",
        time: "11:00 AM – 12:30 PM",
        title: "Writers' Hunt – Round 1",
        venue: "Campus Grounds",
      },
      {
        session: "AN",
        time: "2:00 PM – 3:30 PM",
        title: "Kaavya Manch – Hindi Poetry",
        venue: "Open Air Theatre",
      },
      {
        session: "AN",
        time: "2:00 PM – 3:30 PM",
        title: "Quiz Competition – Preliminary Round",
        venue: "Seminar Hall B",
      },
      {
        session: "AN",
        time: "4:00 PM – 5:30 PM",
        title: "Youth Parliament – Semi Finals",
        venue: "Seminar Hall A",
      },
      {
        session: "AN",
        time: "4:00 PM – 5:00 PM",
        title: "Writers' Hunt – Round 2",
        venue: "Library & Archives",
      },
      {
        session: "AN",
        time: "5:30 PM – 6:30 PM",
        title: "Alumni Talk – Session 1",
        venue: "College Auditorium",
      },
    ],
  },
  {
    day: "Day 2 – 14th March 2026",
    events: [
      {
        session: "FN",
        time: "9:30 AM – 11:00 AM",
        title: "Harry Potter Declamation – Preliminary",
        venue: "Seminar Hall A",
      },
      {
        session: "FN",
        time: "9:30 AM – 11:00 AM",
        title: "Quiz Competition – Semi Finals",
        venue: "Seminar Hall B",
      },
      {
        session: "FN",
        time: "11:30 AM – 1:00 PM",
        title: "Kaavya Manch – English Poetry",
        venue: "Open Air Theatre",
      },
      {
        session: "FN",
        time: "11:30 AM – 1:00 PM",
        title: "Writers' Hunt – Final Round",
        venue: "Central Library",
      },
      {
        session: "AN",
        time: "2:00 PM – 3:30 PM",
        title: "Youth Parliament – Grand Finale",
        venue: "College Auditorium",
      },
      {
        session: "AN",
        time: "2:00 PM – 3:00 PM",
        title: "Harry Potter Declamation – Finals",
        venue: "Seminar Hall A",
      },
      {
        session: "AN",
        time: "3:30 PM – 4:30 PM",
        title: "Quiz Competition – Grand Finale",
        venue: "College Auditorium",
      },
      {
        session: "AN",
        time: "4:30 PM – 5:30 PM",
        title: "Alumni Talk – Session 2",
        venue: "College Auditorium",
      },
      {
        session: "AN",
        time: "5:30 PM – 6:30 PM",
        title: "Valedictory Ceremony & Prize Distribution",
        venue: "College Auditorium",
      },
      {
        session: "AN",
        time: "6:30 PM – 7:00 PM",
        title: "Cultural Performance & Closing",
        venue: "Open Air Theatre",
      },
    ],
  },
];

export const eventsList = [
  "Youth Parliament",
  "Writers' Hunt",
  "Kaavya Manch",
  "Quiz Competition",
  "Alumni Talk",
  "Harry Potter Declamation",
  "Workshop",
  "Online Workshop with Certificates",
];

export interface EventConfig {
  name: string;
  fee: number;
  gradient: string;
}

export const eventsConfig: EventConfig[] = [
  { name: "Youth Parliament", fee: 100, gradient: "linear-gradient(135deg, #4a009e 0%, #7c3aed 100%)" },
  { name: "Writers' Hunt", fee: 50, gradient: "linear-gradient(135deg, #1a0040 0%, #5a00c8 100%)" },
  { name: "Harry Potter Declamation", fee: 50, gradient: "linear-gradient(135deg, #2d006b 0%, #c084fc 100%)" },
  { name: "Online Workshop with Certificates", fee: 50, gradient: "linear-gradient(135deg, #3d1080 0%, #a78bfa 100%)" },
  { name: "Kaavya Manch", fee: 0, gradient: "linear-gradient(135deg, #2d006b 0%, #8b5cf6 100%)" },
  { name: "Quiz Competition", fee: 0, gradient: "linear-gradient(135deg, #3d1080 0%, #a78bfa 100%)" },
  { name: "Alumni Talk", fee: 0, gradient: "linear-gradient(135deg, #1a003d 0%, #6d28d9 100%)" },
  { name: "Workshop", fee: 0, gradient: "linear-gradient(135deg, #4a009e 0%, #7c3aed 100%)" },
];
