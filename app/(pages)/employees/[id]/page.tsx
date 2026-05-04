import { createClient } from "@/lib/supabase/server";
import CreateEditEmployeeForm from "../create/page";
import { notFound } from "next/navigation";

const EmployeeEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("employees")
    .select("*, department: departments(name), position: positions(name)")
    .eq("id", id)
    .single();

  if (error || !data) return notFound();

  return <CreateEditEmployeeForm initialData={data} />;
};

export default EmployeeEditPage;
