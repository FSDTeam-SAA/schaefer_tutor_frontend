// // @ts-expect-error

// "use client";

// // Package Imports
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import { CircleOff, Loader2, Pencil, Save } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";

// // UI Components
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { toast } from "sonner";

// interface Props {
//   userId: string;
// }

// const ProfileForm = ({ userId }: Props) => {
//   const [editable, setEditable] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const [imageLoader, setImageLoader] = useState(false);

//   const {
//     isLoading,
//     data: response,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["profile"],
//     queryFn: () =>
//       fetch(
//         `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/${userId}`
//       ).then((res) => res.json()),
//   });

//   const { mutate: updateMutation, isPending } = useMutation({
//     mutationKey: ["profile"],
//     mutationFn: (data: any) =>
//       fetch(
//         `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/update-profile`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }
//       ).then((res) => res.json()),
//     onSuccess: () => {
//       toast.success("Profile updated successfully!");
//     },
//     onError: (error: any) => {
//       toast.error(error.message || "Something went wrong");
//     },
//   });

//   const form = useForm<any>({
//     defaultValues: {
//       name: "",
//       image: "",
//       clerkId: userId,
//     },
//   });

//   useEffect(() => {
//     if (response) {
//       const { name = "", image = "", clerkId } = response.data[0] || {};
//       form.reset({
//         name,
//         image,
//         clerkId,
//       });
//     }
//   }, [response, form]);

//   const handleUploadClick = () => {
//     fileInputRef.current?.click();
//   };

//   // const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//   //     const file = event.target.files?.[0];
//   //     if (file) {
//   //         setImageLoader(true);
//   //         const res = await edgestore.publicFiles.upload({ file });
//   //         form.setValue("image", res?.url || "");
//   //         setImageLoader(false);
//   //     }
//   // };

//   const onSubmit = async (data: any) => {
//     updateMutation(data);
//   };

//   let content;

//   if (isLoading) {
//     content = <LoadingComponent />;
//   } else if (isError) {
//     content = <ErrorComponent message={(error as Error).message} />;
//   } else if (response) {
//     content = (
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="grid grid-cols-2 gap-6"
//         >
//           <FormField
//             control={form.control}
//             name="image"
//             render={({ field }) => (
//               <FormItem className="col-span-2 flex items-center gap-x-4">
//                 <div className="h-[100px] w-[100px] flex justify-center items-center relative">
//                   <motion.div
//                     initial={{ filter: "blur(0px)" }}
//                     animate={{
//                       filter: imageLoader ? "blur(1px)" : "blur(0px)",
//                       transition: { duration: 0.5 },
//                     }}
//                     className="h-full w-full rounded-full relative flex justify-center items-center"
//                   >
//                     <Image
//                       src={field.value || "/placeholder.jpg"}
//                       alt="profile"
//                       fill
//                       className="rounded-full object-cover bg-gray-100"
//                     />
//                   </motion.div>
//                   {imageLoader && (
//                     <Loader2 className="animate-spin h-5 w-5 absolute" />
//                   )}
//                 </div>
//                 {editable && (
//                   <>
//                     <input
//                       type="file"
//                       ref={fileInputRef}
//                       className="hidden"
//                       //   onChange={handleFileChange}
//                     />
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={handleUploadClick}
//                       disabled={imageLoader}
//                     >
//                       Upload
//                     </Button>
//                   </>
//                 )}
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem className="col-span-2 md:col-span-1">
//                 {editable && <FormLabel>Name</FormLabel>}
//                 <FormControl>
//                   <Input
//                     type="text"
//                     placeholder="Your Name"
//                     {...field}
//                     className="disabled:opacity-100"
//                     disabled={!editable}
//                   />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem className="col-span-2 md:col-span-1">
//                 {editable && <FormLabel>Email</FormLabel>}
//                 <FormControl>
//                   <Input
//                     type="text"
//                     placeholder="Primary Email"
//                     {...field}
//                     className="disabled:opacity-70"
//                     disabled={true}
//                   />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//         </form>
//       </Form>
//     );
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-tourHub-title2 text-[30px] font-bold font-inter">
//             Profile
//           </h2>
//           <p className="text-tourHub-green-dark text-base mb-1">
//             Manage your profile
//           </p>
//         </div>
//         <Button
//           className="text-sm bg-tourHub-green-light hover:bg-tourHub-green-hover text-white rounded-md px-3 py-2"
//           onClick={() => {
//             if (editable) {
//               form.handleSubmit(onSubmit)();
//             }
//             setEditable((prev) => !prev);
//           }}
//         >
//           {isPending ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin mr-2" />
//               Saving
//             </>
//           ) : editable ? (
//             <>
//               <Save className="mr-2 h-4 w-4" />
//               Save
//             </>
//           ) : (
//             <>
//               <Pencil className="mr-2 h-4 w-4" />
//               Edit
//             </>
//           )}
//         </Button>
//       </div>
//       <Separator className="mb-4" />
//       {content}
//     </div>
//   );
// };

// export default ProfileForm;

// const LoadingComponent = () => (
//   <div className="w-full h-[200px] flex justify-center items-center gap-x-2">
//     <Loader2 className="animate-spin h-5 w-5 text-tourHub-green-dark" />
//     <p className="text-[16px] text-tourHub-title2 font-normal">
//       Loading profile...
//     </p>
//   </div>
// );

// const ErrorComponent = ({ message }: { message: string }) => (
//   <div className="w-full h-[200px] flex flex-col justify-center items-center text-center px-4">
//     <CircleOff className="h-5 w-5 text-red-500 mb-2" />
//     <p className="text-[16px] text-tourHub-gray font-normal">
//       {message || "Something went wrong."}
//     </p>
//   </div>
// );
