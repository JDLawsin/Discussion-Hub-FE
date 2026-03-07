import { getProtocolById } from "@/features/protocol/services/protocol";
import CreateThreadForm from "@/features/thread/components/CreateThreadForm";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ protocolId: string }>;
}

const CreateThreadPage = async ({ params }: Props) => {
  const { protocolId } = await params;
  const protocol = await getProtocolById(protocolId);

  return (
    <div className="page-container">
      <Link
        href={`/protocols/${protocolId}`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-teal-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {"Back to Protocol"}
      </Link>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="h-1 bg-linear-to-r from-teal-400 to-teal-500" />

        <div className="p-6">
          <div className="flex items-start gap-3 pb-5">
            <div>
              <h1 className="text-lg font-extrabold text-gray-900">
                {"Post a Thread"}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {"Start a discussion, ask a question, or share your experience"}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {"Posting a thread under "}
                <Link
                  href={`/protocol/${protocolId}`}
                  className="font-semibold text-teal-500 hover:underline"
                >
                  {protocol.title}
                </Link>
              </p>
            </div>
          </div>

          <CreateThreadForm protocolId={protocolId} />
        </div>
      </div>
    </div>
  );
};

export default CreateThreadPage;
