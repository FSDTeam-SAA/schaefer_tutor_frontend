import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { AddSubjectDialog } from "./add-subject-dialog";
import SubjectPill from "./subject-pill";

const SubjectContainer = async () => {
  const subjects = await prisma.subject.findMany();
  return (
    <div>
      <div className="flex justify-end">
        <AddSubjectDialog trigger={<Button>Add new Subject</Button>} />
      </div>

      <div className="flex items-center gap-3 mt-10">
        {subjects.map((item) => (
          <SubjectPill data={item} key={item.id} isEdit={true} />
        ))}
      </div>
    </div>
  );
};

export default SubjectContainer;
