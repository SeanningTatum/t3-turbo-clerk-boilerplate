"use client";

import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs";

import { api } from "~/trpc/react";

export function ExampleClient() {
  const { user, isSignedIn } = useUser();

  const userIdFromServer = api.post.protected.useQuery(undefined, {
    enabled: isSignedIn,
  });

  return (
    <div>
      {isSignedIn ? (
        <div className="flex flex-col gap-5">
          <h1>You are signed as {user.emailAddresses[0]?.emailAddress}</h1>
          <h5>{userIdFromServer.data}</h5>
          <SignOutButton />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h1>You are not authenticated!</h1>

          <Link href="/register">Go to signup</Link>

          <Link href="/login">Go to login</Link>
        </div>
      )}
    </div>
  );
}
