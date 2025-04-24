import { getAllRecomendationByStudentId } from "@/data/user";
import { Account } from "@/types/account";
import { calculateDiscountBasedOnRules } from "./discount-rules";

export async function calculateDiscount(data: Account): Promise<number> {
  const studentId = data.studentId;

  // Fetch total recommendations for the student
  const totalRecomendation = await getAllRecomendationByStudentId(studentId);

  // Calculate total lessons completed by the student
  const totalLesson = data.lessons.length;

  // Delegate discount calculation to the rules module
  return calculateDiscountBasedOnRules(totalRecomendation, totalLesson);
}
