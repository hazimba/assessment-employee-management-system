import { createClient } from "@/lib/supabase/server";
import CreateEditDeptPosPage from "@/components/create-dept-pos";
import { notFound } from "next/navigation";

const PositionEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("positions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return notFound();

  return <CreateEditDeptPosPage entity="positions" initialData={data} />;
};

export default PositionEditPage;
