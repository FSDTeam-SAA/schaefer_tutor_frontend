"use client";
import { Subject } from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import { AddSubjectDialog } from "./add-subject-dialog";

interface Props {
  data: Subject;
  isEdit?: boolean;
}

const SubjectPill = ({ data, isEdit }: Props) => {
  return (
    <div className="py-3 px-4 text-center  justify-center  inline-flex items-center rounded-[50px] border   text-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground ">
      {data.name}
      {isEdit && (
        <>
          <Trash className="text-red-500 size-4 ml-2 hover:text-red-600 transition duration-300 cursor-pointer" />
          <AddSubjectDialog
            initialData={data}
            trigger={
              <Edit className="text-blue-500 size-4 ml-2 hover:text-blue-600 transition duration-300 cursor-pointer" />
            }
          />
        </>
      )}
    </div>
  );
};

export default SubjectPill;
