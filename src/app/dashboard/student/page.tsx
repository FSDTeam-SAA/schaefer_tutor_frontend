import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import StudentDashboardStats from "./_components/student-dashboard-stats";

const SchuelerDashboard = async () => {
  const cu = await auth();

  if (!cu?.user.id) redirect("/login");

  const now = new Date();

  // Start of today (00:00:00)
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Start of tomorrow (00:00:00 of the next day)
  const startOfTomorrow = new Date(startOfDay);
  startOfTomorrow.setDate(startOfDay.getDate() + 1);

  const todayLesson = await prisma.lesson.count({
    where: {
      studentId: cu.user.id,
      date: {
        gte: startOfDay,
        lt: startOfTomorrow,
      },
    },
  });
  const totalCompletedLesson = await prisma.lesson.count({
    where: {
      studentId: cu.user.id,
      status: "carried_out",
    },
  });
  const totalPlannedLesson = await prisma.lesson.count({
    where: {
      studentId: cu.user.id,
      status: "planned",
    },
  });

  const pricing = await prisma.user.findFirst({
    where: {
      id: cu.user.id,
    },
    include: {
      pricing: true,
    },
  });

  return (
    <div>
      <StudentDashboardStats
        todaysLessons={todayLesson}
        completedLessons={totalCompletedLesson}
        plannedSessions={totalPlannedLesson}
        pricing={pricing?.pricing || undefined}
      />
    </div>
  );
};

export default SchuelerDashboard;
