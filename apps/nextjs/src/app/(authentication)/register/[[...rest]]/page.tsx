import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <SignUp
      signInUrl="/login"
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
