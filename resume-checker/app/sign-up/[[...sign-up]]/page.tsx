import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-1/4 mt-2 items-center justify-center bg-gray-100">
      <SignUp />
    </div>
  );
}
