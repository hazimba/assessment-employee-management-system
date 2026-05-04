import TableRender from "@/components/table-render";
import TitlePage from "@/components/title-page";
import { createClient } from "@/lib/supabase/client";

const PositionPage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("positions").select("*");

  if (error) {
    console.error("Error fetching positions:", error);
    return <div>Error fetching positions</div>;
  }

  console.log("Positions data:", data);

  return (
    <div className="md:p-6 p-0">
      <TitlePage
        title="Positions"
        description="This is the Positions page. You can manage your company's positions here."
        linkHref="/positions/create"
      />
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Position List</h2>
        <TableRender data={data} entity="positions" />
      </div>
    </div>
  );
};
export default PositionPage;
