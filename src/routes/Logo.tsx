import Link from "next/dist/client/link";

export const MainLogo = () => {
  return (
    <h1 className="font-perfume text-2xl leading-[0.4] mt-[-10px]">
      <Link href="/">
        <a>
          <span>Sunya </span>
          <span className="text-primary">Health</span>
        </a>
      </Link>
    </h1>
  );
};
