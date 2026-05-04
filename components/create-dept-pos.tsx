"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface EntityProps {
  entity: string;
  initialData?: { id: number; name: string };
}

const CreateEditDeptPosPage = ({ entity, initialData }: EntityProps) => {
  const router = useRouter();
  const isEditing = !!initialData;
  const formSchema = z.object({
    name: z
      .string()
      .min(1, `${entity} name must be at least 1 characters.`)
      .max(32, `${entity} name must be at most 32 characters.`),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const supabase = createClient();

      if (isEditing) {
        const { error } = await supabase
          .from(entity)
          .update({ name: data.name, updated_at: new Date().toISOString() })
          .eq("id", initialData!.id);

        if (error) {
          toast.error(`Failed to update ${entity}. Please try again.`);
          console.error("Supabase error:", error);
        } else {
          toast.success(`${entity} updated successfully!`);
          router.push(`/${entity}`);
        }
      } else {
        const { error } = await supabase.from(entity).insert({
          name: data.name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        if (error) {
          toast.error(`Failed to create ${entity}. Please try again.`);
          console.error("Supabase error:", error);
        } else {
          toast.success(`${entity} created successfully!`);
          form.reset();
          router.push(`/${entity}`);
        }
      }
    } catch (error) {
      toast.error(
        `Failed to ${
          isEditing ? "update" : "create"
        } ${entity}. Please try again.`
      );
      console.error("Unexpected error:", error);
    }
  }

  return (
    <div className="md:p-6 p-0">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>
            {isEditing ? "Edit" : "Create"} {entity}
          </CardTitle>
          <CardDescription>
            Use the form below to {isEditing ? "edit this" : "create a new"}{" "}
            {entity}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="pt-6">
                    <FieldLabel htmlFor="form-rhf-demo-name">
                      {entity[0].toUpperCase() + entity.slice(1)} Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-name"
                      aria-invalid={fieldState.invalid}
                      placeholder={`Enter ${entity} name`}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Link href={`/${entity}`} className="mr-auto">
              Back
            </Link>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="form-rhf-demo"
              className="cursor-pointer"
            >
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateEditDeptPosPage;
