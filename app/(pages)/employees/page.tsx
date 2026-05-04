import TitlePage from "@/components/title-page";

const EmployeesPage = () => {
  return (
    <div className="md:p-6 p-0">
      <TitlePage
        title="Employees"
        description="This is the Employees page. You can manage your company's employees here."
        linkHref="/employees/create"
      />
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Employee List</h2>
        {/* Render employee list here */}
      </div>
    </div>
  );
};
export default EmployeesPage;
