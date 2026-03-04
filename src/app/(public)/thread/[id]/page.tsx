import { BookOpen, ChevronRight } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

const MOCK_PROTOCOL = {
  id: "1",
  title: "Building a Scalable REST API with Laravel",
  content: `This protocol outlines best practices for building scalable REST APIs using Laravel. It covers authentication strategies, resource structuring, versioning, and performance optimization techniques that have been battle-tested in production environments.

The approach emphasizes clean architecture, proper use of Laravel built-in features, and maintaining developer experience while scaling to thousands of concurrent users.

Key areas covered include: API versioning strategies, rate limiting, caching layers, proper HTTP status codes, validation patterns, and documentation standards using OpenAPI/Swagger.`,
  tags: ["laravel", "api", "rest", "php", "backend"],
  author_name: "John Doe",
  review_count: 24,
  average_rating: 4.3,
  created_at: "2024-01-15T10:30:00Z",
};

const ViewThreadPage = async ({ params }: Props) => {
  const protocol = MOCK_PROTOCOL;

  const { id } = await params;

  return (
    <div className="page-container">
      <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-500" />
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Protocol</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600 font-medium truncate">
            {protocol.title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewThreadPage;
