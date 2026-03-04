import Browse from "@/features/browse/components/Browse";

export const dynamic = "force-dynamic";

const BrowsePage = () => {
  return (
    <div className="page-container">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {"Discover Discussion Hub"}
        </h1>
        <span className="text-gray-600">
          {
            "Explore community-driven discussions, share your thoughts, and connect with like-minded individuals."
          }
        </span>
      </div>
      <Browse />
    </div>
  );
};

export default BrowsePage;
