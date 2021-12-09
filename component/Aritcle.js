import React from "react";
import { Linking } from "react-native";
import { ScrollView } from "react-native";
import { View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
export default function Aritcle({ article }) {
  const getScrImage = (string) => {
    let data = string.match(/<img [^>]*src="[^"]*"[^>]*>/gm);
    let result = data[0].split('"');
    return result[1];
  };
  const renderArticle = () => {
    return article?.map((item, index) => {
      let img = getScrImage(item.content);
      // console.log(img);
      return (
        <ListItem key={index} bottomDivider>
          <Avatar source={{ uri: img }} rounded />
          <ListItem.Content>
            <ListItem.Title
              onPress={() => {
                Linking.openURL(item.link);
              }}
            >
              {item.title}
            </ListItem.Title>
            <ListItem.Subtitle>{item.contentSnippet}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    });
  };
  return <ScrollView>{renderArticle()}</ScrollView>;
}
