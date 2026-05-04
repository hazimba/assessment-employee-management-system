import { createClient } from "@/lib/supabase/server";
import CreateEditDeptPosPage from "@/components/create-dept-pos";
import { notFound } from "next/navigation";

const DepartmentEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return notFound();

  return <CreateEditDeptPosPage entity="departments" initialData={data} />;
};

export default DepartmentEditPage;
