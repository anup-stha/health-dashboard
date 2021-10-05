import "../src/styles/globals.scss";
import * as nextImage from "next/image";
import * as nextLink from "next/link";

//Way to use next/image in Storybook
Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: (props) => {
    return <img {...props} />;
  },
});

// Way to use next/link in Storybook
Object.defineProperty(nextLink, "default", {
  configurable: true,
  value: (props) => {
    return <span className="cursor-pointer">{props.children}</span>;
  },
});
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
