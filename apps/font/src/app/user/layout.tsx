import { PropsWithChildren } from "react";

type Props = PropsWithChildren;
const PostLayout = (props: Props) => {
  return (
    <div className="mt-24 flex flex-col justify-center items-center ">
        {props.children}
    </div>
  );
};

export default PostLayout;