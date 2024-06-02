import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
  contract_name: z.string().min(2, {
    message: "Contract name required",
  }),
  contract_address: z.string().min(2, {
    message: "Contract address required",
  }),
  file_upload: z.instanceof(File, {
    message: "file  required",
  }),
});

export const UploadContractForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contract_name: "",
      contract_address: "",
      file_upload: new File([], ""),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="orange_gradient bg-clip">Upload Contract</span>
      </h1>
      <p className="desc  text-left max-w-md">Upload your contract here! </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        >
          <FormField
            control={form.control}
            name="contract_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract Name</FormLabel>
                <FormControl>
                  <Input placeholder="ContractABIRegistry" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contract_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract Address</FormLabel>
                <FormControl>
                  <Input placeholder="0xd74C08f8ffDF88C8..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file_upload"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Input
                    accept=".jpg, .jpeg, .png, pdf, xml, csv,"
                    type="file"
                    placeholder="Select file"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="blue_gradient">
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
};
