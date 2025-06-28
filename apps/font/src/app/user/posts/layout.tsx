import { PropsWithChildren } from "react";

type Props = PropsWithChildren;
const PostLayout = (props: Props) => {
  return (
    <div className="mt-24">
        {props.children}
    </div>
  );
};

export default PostLayout;