import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
// import { FlashList } from "@shopify/flash-list";

import { api } from "~/utils/api";
import { Button, Text, View } from "react-native";
import { SignedIn, SignedOut, useAuth, useOAuth, useUser } from "@clerk/clerk-expo";
import { useCallback, useEffect } from "react";
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function Index() {
  // const utils = api.useUtils();
  const { user } = useUser()
  const { signOut } = useAuth();
  const postQuery = api.post.all.useQuery();

  const protectedPostQuery = api.post.protected.useQuery(undefined, {
    enabled: !!user,
  })

  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPressGoogleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/', { scheme: 'myapp' }),
      })

      console.log(createdSessionId)

      if (createdSessionId) {
        setActive?.({ session: createdSessionId })
          .catch(console.error)
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])



  return (
    <SafeAreaView className="bg-background">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full bg-background p-4">
        <Text className="pb-2 text-center text-5xl font-bold text-foreground">
          Create <Text className="text-primary">T3</Text> Turbo {postQuery.data}
        </Text>
        <SignedIn>
          <Text className="text-primary">You are signed in as {user?.emailAddresses[0]?.emailAddress}</Text>
          <Text className="text-primary">{protectedPostQuery.data ?? ""}</Text>
          <Button title="Sign Out" onPress={() => signOut()} />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <Text className="text-white">Sign In Email</Text>
          </Link>
          <Link href="/sign-up">
            <Text className="text-white">Sign Up Email</Text>
          </Link>

          <Button title="Sign in with Google" onPress={onPressGoogleSignIn} />
        </SignedOut>

        {/* <View className="py-2">
          <Text className="font-semibold italic text-primary">
            Press on a post
          </Text>
        </View>

        <FlashList
          data={postQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(p) => (
            <PostCard
              post={p.item}
              onDelete={() => deletePostMutation.mutate(p.item.id)}
            />
          )}
        /> */}

      </View>
    </SafeAreaView>
  );
}
