import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddTeacherDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button effect="gooeyRight">Add new teacher</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new teacher</DialogTitle>
          <DialogDescription>
            Enter the details of the new teacher. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="email" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subjects" className="text-right">
              Subjects
            </Label>
            <Input id="subjects" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save teacher</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
