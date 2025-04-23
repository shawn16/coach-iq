export interface Athlete {
  id: string;
  name: string;
  email: string;
  team: string;
  status: "Active" | "Injured" | "Inactive";
  lastActivity: string;
}

export const AthletesData: Athlete[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    team: "Track Team A",
    status: "Active",
    lastActivity: "Today, 2:30 PM",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.w@email.com",
    team: "Track Team B",
    status: "Active",
    lastActivity: "Yesterday, 11:20 AM",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "m.chen@email.com",
    team: "Track Team A",
    status: "Injured",
    lastActivity: "Jun 14, 2023",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "e.davis@email.com",
    team: "Track Team C",
    status: "Active",
    lastActivity: "Today, 9:15 AM",
  },
  {
    id: "5",
    name: "James Wilson",
    email: "j.wilson@email.com",
    team: "Track Team B",
    status: "Inactive",
    lastActivity: "Jun 10, 2023",
  },
  {
    id: "6",
    name: "Olivia Martinez",
    email: "o.martinez@email.com",
    team: "Track Team A",
    status: "Active",
    lastActivity: "Today, 1:45 PM",
  },
  {
    id: "7",
    name: "David Thompson",
    email: "d.thompson@email.com",
    team: "Track Team C",
    status: "Injured",
    lastActivity: "Jun 12, 2023",
  },
  {
    id: "8",
    name: "Sophia Lee",
    email: "s.lee@email.com",
    team: "Track Team B",
    status: "Active",
    lastActivity: "Yesterday, 3:30 PM",
  },
  {
    id: "9",
    name: "Daniel Brown",
    email: "d.brown@email.com",
    team: "Track Team A",
    status: "Active",
    lastActivity: "Today, 10:20 AM",
  },
  {
    id: "10",
    name: "Emma Garcia",
    email: "e.garcia@email.com",
    team: "Track Team C",
    status: "Inactive",
    lastActivity: "Jun 8, 2023",
  },
];
