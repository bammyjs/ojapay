import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoading = ({ cards }) => {
  return Array.from({ length: cards }, (_, index) => (
    <div
      key={index}
      className="rounded items-baseline p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300"
    >
      <Skeleton className="w-44 h-5 mb-2" />
      <Skeleton className="w-48 h-5 mb-2" />
      <Skeleton className="w-48 h-3 mb-2" />

      <Skeleton className="w-20 h-3 mb-2" />
    </div>
  ));
};

export default SkeletonLoading;
