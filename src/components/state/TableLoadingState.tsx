import Skeleton from "react-loading-skeleton";

export const OrgTableLoadingState = () => {
  return (
    <>
      <tr>
        <td className="flex space-x-2 items-center">
          <div className="w-24 inline-block">
            <Skeleton duration={2} circle={true} height={62} />
          </div>
          <div className="w-full">
            <Skeleton count={2} duration={2} />
          </div>
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
      </tr>
      <tr>
        <td className="flex space-x-2 items-center">
          <div className="w-24 inline-block">
            <Skeleton duration={2} circle={true} height={62} />
          </div>
          <div className="w-full">
            <Skeleton count={2} duration={2} />
          </div>
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
      </tr>
      <tr>
        <td className="flex space-x-2 items-center">
          <div className="w-24 inline-block">
            <Skeleton duration={2} circle={true} height={62} />
          </div>
          <div className="w-full">
            <Skeleton count={2} duration={2} />
          </div>
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
      </tr>
      <tr>
        <td className="flex space-x-2 items-center">
          <div className="w-24 inline-block">
            <Skeleton duration={2} circle={true} height={62} />
          </div>
          <div className="w-full">
            <Skeleton count={2} duration={2} />
          </div>
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
        <td>
          <Skeleton count={1} duration={2} />
        </td>
      </tr>
    </>
  );
};
