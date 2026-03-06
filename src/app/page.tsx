import LoginForm from "@/features/auth/components/LoginForm";
import Link from "next/link";

const HomePage = () => (
  <div className="min-h-[calc(100vh-3.5rem)] pt-14 items-center justify-center relative overflow-hidden bg-gray-50">
    <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-200 rounded-full blur-3xl opacity-40 pointer-events-none" />

    <div
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{
        backgroundImage:
          "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />

    <div className="relative z-10 flex flex-col items-center gap-6 w-full px-4">
      <div className="text-center max-w-xs">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-500 mb-1">
          {"Join the conversation"}
        </p>
        <p className="text-gray-400 text-sm">
          {"Thousands of communities, endless discussions."}
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l4.93-1.37A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm-1 13H7v-2h4v2Zm4-4H7V9h8v2Z" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {"Sanctum"}
            </h1>
          </div>
          <p className="text-sm text-gray-500">
            {"The front page of your community"}
          </p>
        </div>
        <LoginForm />

        <p className="text-xs text-gray-500">
          {"New to Sanctum?"}{" "}
          <Link
            href="/register"
            className="text-teal-500 font-semibold hover:underline"
          >
            {"Create an account"}
          </Link>
        </p>
      </div>

      <p className="text-xs text-gray-400 text-center">
        {"By continuing, you agree to our"}{" "}
        <span className="text-teal-500 hover:underline cursor-pointer">
          {"Terms"}
        </span>{" "}
        {"and"}{" "}
        <span className="text-teal-500 hover:underline cursor-pointer">
          {"Privacy Policy"}
        </span>
        {"."}
      </p>
    </div>
  </div>
);

export default HomePage;
