import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  return (
    <div>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="pricing"></TabsContent>
        <TabsContent value="password"></TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
