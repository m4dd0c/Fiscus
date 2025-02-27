"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { transferSchema } from "@/lib/Schema/schema";

function Page() {
 const form = useForm<z.infer<typeof transferSchema>>({
  resolver: zodResolver(transferSchema),
  defaultValues: {
   from: "",
   to: "",
   amount: 0,
  },
 });

 const onSubmit = (data: z.infer<typeof transferSchema>) => {
  console.log("helloworld");
 };

 return (
  <div className="w-3/4 mx-auto">
   <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
     <FormField
      control={form.control}
      name="from"
      render={({ field }) => (
       <FormItem>
        <FormLabel>From</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
         <FormControl>
          <SelectTrigger>
           <SelectValue placeholder="Select an account to transfer funds from." />
          </SelectTrigger>
         </FormControl>
         <SelectContent>
          <SelectItem value="m@a1.com">Account 1</SelectItem>
          <SelectItem value="m@a2.com">Account 2</SelectItem>
         </SelectContent>
        </Select>
        <FormMessage />
       </FormItem>
      )}
     />
     <FormField
      control={form.control}
      name="to"
      render={({ field }) => (
       <FormItem>
        <FormLabel>To Account ID</FormLabel>
        <FormControl>
         <Input
          placeholder="Enter an account ID to receive funds in."
          {...field}
         />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />
     <FormField
      control={form.control}
      name="amount"
      render={({ field }) => (
       <FormItem>
        <FormLabel>Amount (USD)</FormLabel>
        <FormControl>
         <Input
          placeholder="Amount in USD"
          type="number"
          {...field}
          onChange={(e) => field.onChange(Number(e.target.value) || 0)}
         />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />
     <Button type="submit">Initiate Transfer</Button>
    </form>
   </Form>
  </div>
 );
}
export default Page;
