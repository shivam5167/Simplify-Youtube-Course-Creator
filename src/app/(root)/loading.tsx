import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-svh items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
};

export default Loading;
