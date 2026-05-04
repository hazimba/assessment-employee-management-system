import Link from "next/link";

interface TitlePageProps {
  title: string;
  description: string;
  linkHref: string;
}

const TitlePage = ({ title, description, linkHref }: TitlePageProps) => {
  return (
    <>
      <div className="flex md:items-center items-start justify-between md:mb-4">
        <h1 className="text-2xl font-semibold mb-4">{title}</h1>
        <Link href={linkHref} className="cursor-pointer">
          Add {title}
        </Link>
      </div>
      <p>{description}</p>
    </>
  );
};
export default TitlePage;
