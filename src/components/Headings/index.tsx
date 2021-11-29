type SectionHeadingProps = {
  children: React.ReactNode;
};

const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => {
  return <h2 className="text-3xl font-semibold text-gray-900">{children}</h2>;
};

export default SectionHeading;
