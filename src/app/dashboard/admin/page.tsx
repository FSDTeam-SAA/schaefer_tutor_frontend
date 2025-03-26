import DashboardNav from "@/components/local/dashboard-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubjectContainer from "./_components/subjects/subject-container";
import TeacherOverview from "./_components/teacher-overview";
export default function Dashboard() {
  return (
    <div>
      <DashboardNav />
      <main className="max-w-6xl px-4 sm:px-6 lg:px-8 pt-6 mx-auto">
        <Tabs defaultValue="teacher">
          <TabsList className="mb-4">
            <TabsTrigger value="teacher">Teacher</TabsTrigger>
            <TabsTrigger value="pupils">Pupils</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="hours">Hours</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="export">export</TabsTrigger>
          </TabsList>
          <TabsContent value="teacher">
            <TeacherOverview />
          </TabsContent>
          <TabsContent value="pupils">
            <div className="rounded-lg border p-8 text-center">
              Pupils content would go here
            </div>
          </TabsContent>
          <TabsContent value="assignments">
            <div className="rounded-lg border p-8 text-center">
              Assignments content would go here
            </div>
          </TabsContent>
          <TabsContent value="hours">
            <div className="rounded-lg border p-8 text-center">
              Hours content would go here
            </div>
          </TabsContent>
          <TabsContent value="subjects">
            <SubjectContainer />
          </TabsContent>
          <TabsContent value="export">
            <div className="rounded-lg border p-8 text-center">
              Export content would go here
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
