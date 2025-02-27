"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";

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
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const [success, setSuccess] = useState<string | null>(null);

 const form = useForm<z.infer<typeof transferSchema>>({
  resolver: zodResolver(transferSchema),
  defaultValues: {
   from: "",
   to: "e3z1BZpnBeU3QqGaJdQeiQNxRqx9jaIe7wnQR",
   amount: 0,
  },
 });

 const onSubmit = async (data: z.infer<typeof transferSchema>) => {
  setLoading(true);
  setError(null);
  setSuccess(null);

  try {
   const { data: res } = await axios.post("/api/transfer", data);

   console.log(res);

   setSuccess("Transfer successful!");
   form.reset();
  } catch (err: any) {
   setError(err.message);
  } finally {
   setLoading(false);
  }
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
          <SelectItem value="7melnrKknyHQbBvdg7b3iV5dZ8d6vpirMGVPV">
           Account 1
          </SelectItem>
          <SelectItem value="e3z1BZpnBeU3QqGaJdQeiQNxRqx9jaIe7wnQR">
           Account 2
          </SelectItem>
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

     <Button type="submit" disabled={loading}>
      {loading ? "Processing..." : "Initiate Transfer"}
     </Button>
     {error && <p className="text-red-500">{error}</p>}
     {success && <p className="text-green-500">{success}</p>}
    </form>
   </Form>
  </div>
 );
}

export default Page;
