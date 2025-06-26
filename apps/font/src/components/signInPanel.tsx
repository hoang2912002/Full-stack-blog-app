import Link from "next/link";

const SignInPanel = () => {
  return (
    <>
        <Link href={"/auth/signin"}>Sign In</Link>
        <Link href={"/auth/signin"}>Sign Up</Link>
    </>
  );
};

export default SignInPanel;