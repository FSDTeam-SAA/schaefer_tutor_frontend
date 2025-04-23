import { prisma } from "@/lib/prisma";
import { Account } from "@/types/account";
import { Lesson, User } from "@prisma/client";
import PaymentManagementTable from "./_components/Payment-management-table";

// Transform raw MongoDB response into TypeScript-compatible format
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformToAccounts(rawData: any[]): Account[] {
  return rawData.map((item) => {
    const studentId = item.studentId.$oid; // Extract student ID
    const lessons = item.lessons.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (lesson: any): Lesson => ({
        id: lesson._id.$oid,
        teacherId: lesson.teacherId.$oid,
        studentId: lesson.studentId.$oid,
        subjectId: lesson.subjectId.$oid,
        date: new Date(lesson.date.$date),
        time: lesson.time,
        status: lesson.status,
        createdAt: new Date(lesson.createdAt.$date),
        updatedAt: new Date(lesson.updatedAt.$date),
      })
    );

    const student: User = {
      id: item.student._id.$oid,
      name: item.student.name ?? null,
      email: item.student.email ?? null,
      password: item.student.password ?? "", // Optional
      emailVerified: item.student.emailVerified
        ? new Date(item.student.emailVerified.$date)
        : null, // Optional
      image: item.student.image ?? null, // Optional
      phone: item.student.phone ?? null, // Optional
      grantId: item.student.grantId ?? null, // Optional
      grantEmail: item.student.grantEmail ?? null, // Optional
      isGreeting: item.student.isGreeting,
      role: item.student.role,
      createdAt: new Date(item.student.createdAt.$date),
      updatedAt: new Date(item.student.updatedAt.$date),
      pricingId: item.student.pricingId?.$oid ?? null, // Optional
      stripeCustomerId: item.student.stripeCustomerId ?? null, // Optional
      stripePaymentMethodId: item.student.stripePaymentMethodId ?? null, // Optional
      calendarLink: item.student.calendarLink ?? null, // Default or transformed value
      subjects: item.student.subjects ?? [], // Default to an empty array
    };

    return {
      studentId,
      lessons,
      student,
    };
  });
}

const Page = async () => {
  // Get the current date
  // const now = new Date();

  // Calculate the start and end of the last month
  // const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  // const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupedLessons: { cursor?: { firstBatch?: any[] } } =
    await prisma.$runCommandRaw({
      aggregate: "Lesson", // Name of the collection
      pipeline: [
        {
          $match: {
            status: "carried_out", // Filter only completed lessons
            // date: {
            //   $gte: lastMonthStart,
            //   $lte: lastMonthEnd,
            // },
          },
        },
        {
          $group: {
            _id: "$studentId", // Group by studentId
            lessons: { $push: "$$ROOT" }, // Include all lesson details in an array
          },
        },
        {
          $lookup: {
            from: "User", // The collection to join with
            localField: "_id", // Field from the grouped results (studentId)
            foreignField: "_id", // Field in the User collection (id)
            as: "studentDetails", // Output field for the joined data
          },
        },
        {
          $unwind: "$studentDetails", // Unwind the array created by $lookup
        },
        {
          $project: {
            studentId: "$_id", // Rename _id to studentId
            student: "$studentDetails", // Include the populated student details
            lessons: 1, // Include the lessons array
            _id: 0, // Exclude the default _id field
          },
        },
      ],
      explain: false, // Set to true if you want to see the query plan
    });

  // Example usage
  const rawData = groupedLessons.cursor?.firstBatch ?? []; // Your raw MongoDB response
  const accounts: Account[] = transformToAccounts(rawData);

  return (
    <div>
      <PaymentManagementTable data={accounts} />
    </div>
  );
};

export default Page;
