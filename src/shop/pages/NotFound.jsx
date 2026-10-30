import EmptyState from "../components/common/EmptyState";
import { LuMilk } from "react-icons/lu";
import usePageTitle from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <div className="container-x py-20">
      <EmptyState icon={LuMilk} title="Oops — this page spilled!" text="The page you’re looking for doesn’t exist or has moved." actionLabel="Back to home" actionTo="/" />
    </div>
  );
}
