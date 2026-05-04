"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Link2 } from "lucide-react";
import { Department, Position } from "@/types";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Employee name must be at least 5 characters.")
    .max(32, "Employee name must be at most 32 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  address: z.string().optional(),
  department_id: z.any(),
  position_id: z.any(),
  role: z.any().optional(),
  status: z.any().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

const CreateEditEmployeeForm = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartmentsAndPositions = async () => {
      const supabase = createClient();
      const { data: deptData, error: deptError } = await supabase
        .from("departments")
        .select("id, name");
      const { data: posData, error: posError } = await supabase
        .from("positions")
        .select("id, name");

      if (deptError) {
        console.error("Error fetching departments:", deptError);
      } else {
        setDepartments(deptData as Department[]);
      }

      if (posError) {
        console.error("Error fetching positions:", posError);
      } else {
        setPositions(posData as Position[]);
      }
    };

    fetchDepartmentsAndPositions();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      department_id: null,
      position_id: null,
      role: "",
      status: null,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });

    const dataToInsert = {
      ...data,
      department_id:
        departments.find((d) => d.name === data.department_id)?.id || null,
      position_id:
        positions.find((p) => p.name === data.position_id)?.id || null,
    };
    console.log("Data to insert into Supabase:", dataToInsert);

    try {
      const supabase = createClient();

      const { error } = await supabase.from("employees").insert([dataToInsert]);
      if (error) throw error;
    } catch (error) {
      setError(`${error ? error.details : "Failed to create employee."}`);
    } finally {
      form.reset();
      redirect("/employees");
    }
  }

  return (
    <>
      {" "}
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Create Employee</CardTitle>
          <CardDescription>
            Fill out the form below to create a new employee.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter employee name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-email"
                      placeholder="Enter employee email"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-phone">Phone</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-phone"
                      placeholder="Enter employee phone"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-address">
                      Address
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-address"
                      placeholder="Enter employee address"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="space-y-2">
                <Label>
                  <span className="flex items-center gap-1.5">
                    <Link2 className="h-3.5 w-3.5" />
                    Role
                  </span>
                </Label>
                <Select
                  value={form.watch("role") || "none"}
                  onValueChange={(v) => {
                    console.log("Selected role:", v);
                    form.setValue("role", v === "none" ? "" : v);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">none</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  <span className="flex items-center gap-1.5">
                    <Link2 className="h-3.5 w-3.5" />
                    Departments
                  </span>
                </Label>
                <Select
                  value={form.watch("department_id") || "none"}
                  onValueChange={(v) => {
                    console.log("Selected department ID:", v);
                    form.setValue("department_id", v === "none" ? "" : v);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select department..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">none</SelectItem>
                    {departments.map((t) => (
                      <SelectItem key={t.id} value={t.name}>
                        <span className="truncate">{t.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  <span className="flex items-center gap-1.5">Position</span>
                </Label>
                <Select
                  value={form.watch("position_id") || "none"}
                  onValueChange={(v) => {
                    console.log("Selected position ID:", v);
                    form.setValue("position_id", v === "none" ? "" : v);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select position..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">none</SelectItem>
                    {positions.map((t) => (
                      <SelectItem key={t.id} value={t.name}>
                        <span className="truncate">{t.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="form-rhf-demo">
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
      {error && <div className="mt-2 text-red-600">{error}</div>}
    </>
  );
};
export default CreateEditEmployeeForm;
