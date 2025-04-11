import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataExport from "./_components/data-export/data-export";
import HoursOverview from "./_components/hours-overview/_components/hours-overview";
import SubjectContainer from "./_components/subjects/subject-container";
import TeacherManagement from "./_components/teacher-management/teacher-management";
import TeacherOverview from "./_components/teacher/teacher-overview";
export default function Dashboard() {
  return (
    <div>
      <main className="max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 mx-auto">
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
            <TeacherManagement />
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
            <HoursOverview />
          </TabsContent>
          <TabsContent value="subjects">
            <SubjectContainer />
          </TabsContent>
          <TabsContent value="export">
            <DataExport />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
