import TitlePage from "@/components/title-page";

const EmployeesPage = () => {
  return (
    <div className="md:p-6 p-0">
      <TitlePage
        title="Employees"
        description="This is the Employees page. You can manage your company's employees here."
        linkHref="/employees/create"
      />
    </div>
  );
};
export default EmployeesPage;
