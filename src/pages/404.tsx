import Error from "next/error";

// eslint-disable-next-line require-jsdoc
export default function Page() {
  return <Error statusCode={404} />;
}
