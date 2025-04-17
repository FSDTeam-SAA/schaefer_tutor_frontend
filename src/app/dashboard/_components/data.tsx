import {
  Book,
  GitPullRequestDraft,
  HomeIcon,
  User,
  Waypoints,
} from "lucide-react";
import { ReactNode } from "react";

// Function to generate a random ID
const generateRandomId = () => Math.floor(Math.random() * 100000);

export interface Tab {
  id: number;
  path: string;
  icon: ReactNode;
  linkText: string;
  roles: string[];
}

export const studentDashboardTabLists = [
  {
    id: generateRandomId(),
    path: "/dashboard/student",
    icon: <HomeIcon className="h-4 w-4" />,
    linkText: "Overview",
    roles: ["student"],
  },
  {
    id: generateRandomId(),
    path: "/dashboard/student/profile",
    icon: <User className="h-4 w-4" />,
    linkText: "Profile",
    roles: ["student"],
  },
  {
    id: generateRandomId(),
    path: "/dashboard/student/confirmations",
    icon: <Book className="h-4 w-4" />,
    linkText: "Confirmation",
    roles: ["student"],
  },
  {
    id: generateRandomId(),
    path: "/dashboard/student/refferal",
    icon: <Waypoints className="h-4 w-4" />,
    linkText: "Refferal",
    roles: ["student"],
  },
] as Tab[];
export const teacherDashboardTabLists = [
  {
    id: generateRandomId(),
    path: "/dashboard/teacher",
    icon: <HomeIcon className="h-4 w-4" />,
    linkText: "Overview",
    roles: ["teacher"],
  },
  {
    id: generateRandomId(),
    path: "/dashboard/teacher/profile",
    icon: <User className="h-4 w-4" />,
    linkText: "Profile",
    roles: ["teacher"],
  },
  {
    id: generateRandomId(),
    path: "/dashboard/teacher/hours",
    icon: <Book className="h-4 w-4" />,
    linkText: "Hours",
    roles: ["teacher"],
  },
  {
    id: generateRandomId(),
    path: "/dashboard/teacher/free-trial-requests",
    icon: <GitPullRequestDraft className="h-4 w-4" />,
    linkText: "Free Trial Requests",
    roles: ["teacher"],
  },
] as Tab[];
