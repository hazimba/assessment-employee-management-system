import { X } from "lucide-react";

interface NoDataFoundProps {
  entity: string;
}

const NoDataFound = ({ entity }: NoDataFoundProps) => {
  return (
    <div className="p-4 border rounded-md bg-muted mt-4">
      <div className="text-center text-muted-foreground animate-pulse">
        <X size={24} className="mx-auto mb-2" />
        <div className="text-xs md:text-base">
          No {entity} found. Kindly create One
        </div>
      </div>
    </div>
  );
};
export default NoDataFound;
