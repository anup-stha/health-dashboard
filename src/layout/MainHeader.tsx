import { ImageAvatar } from "@/components/Avatar";

export const MainHeader: React.FC = () => {
  return (
    <header className="px-12 h-32 bg-white shadow-E200 flex items-center justify-between">
      <div>{/* Put Logo Her */}</div>

      <ImageAvatar />
    </header>
  );
};
