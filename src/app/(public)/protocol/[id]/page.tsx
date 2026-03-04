import { getProtocolById } from "@/features/protocol/services/protocol";
import ViewProtocolContainer from "@/features/protocol/components/ViewProtocolContainer";

interface Props {
  params: Promise<{ id: string }>;
}

const ViewProtocolPage = async ({ params }: Props) => {
  const { id } = await params;
  const protocol = await getProtocolById(id);

  return (
    <div className="page-container">
      <ViewProtocolContainer data={protocol} />
    </div>
  );
};

export default ViewProtocolPage;
