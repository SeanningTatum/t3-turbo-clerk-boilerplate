import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <SignIn
      signUpUrl="/register"
      appearance={{
        elements: {
          rootBox: "w-full max-w-full",
          cardBox: "w-full max-w-full",
          formButtonPrimary: "bg-primary hover:bg-primary/80 !shadow-none",
        },
      }}
    />
  );
}
