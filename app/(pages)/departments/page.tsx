import TitlePage from "@/components/title-page";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const DepartmentsPage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("departments").select("*");

  if (error) {
    console.error("Error fetching departments:", error);
    return <div>Error fetching departments</div>;
  }

  console.log("Departments data:", data);

  return (
    <div className="md:p-6 p-0">
      <TitlePage
        title="Departments"
        description="This is the Departments page. You can manage your company's departments here."
        linkHref="/departments/create"
      />
    </div>
  );
};
export default DepartmentsPage;
