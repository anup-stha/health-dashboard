import withAuth from "@/hoc/withAuth";

const H = () => {
  return <div>Hello World</div>;
};

export default withAuth(H);
