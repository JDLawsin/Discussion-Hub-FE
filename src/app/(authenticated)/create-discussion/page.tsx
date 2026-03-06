import CreateProtocolForm from "@/features/protocol/components/CreateProtocolForm";
import { ArrowBigLeft, BookOpen } from "lucide-react";
import Link from "next/link";

const CreateDiscussionPage = () => {
  return (
    <div className="page-container">
      <Link
        href="/browse"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-teal-500 transition-colors"
      >
        <ArrowBigLeft className="w-4 h-4" />
        {"Back to Browse"}
      </Link>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="h-1 bg-linear-to-r from-teal-400 to-teal-500" />

        <div className="p-6">
          <div className="flex items-start gap-3 mb-6 pb-5">
            <div>
              <h1 className="text-lg font-extrabold text-gray-900">
                {"Create a Protocol"}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {"Share your knowledge and best practices with the community"}
              </p>
            </div>
          </div>

          <CreateProtocolForm />
        </div>
      </div>
    </div>
  );
};

export default CreateDiscussionPage;
