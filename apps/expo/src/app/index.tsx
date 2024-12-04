import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
// import { FlashList } from "@shopify/flash-list";

import { api } from "~/utils/api";
import { Text, View } from "react-native";

export default function Index() {
  // const utils = api.useUtils();

  const postQuery = api.post.all.useQuery();

  // const deletePostMutation = api.post.delete.useMutation({
  //   onSettled: () => utils.post.all.invalidate(),
  // });

  // console.log(postQuery.data)

  return (
    <SafeAreaView className="bg-background">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full bg-background p-4">
        <Text className="pb-2 text-center text-5xl font-bold text-foreground">
          Create <Text className="text-primary">T3</Text> Turbo {postQuery.data}
        </Text>

        {/* <MobileAuth /> */}

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
