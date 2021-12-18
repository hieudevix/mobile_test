import React from "react";
import { ScrollView, Text } from "react-native";
import { ListItem, Icon } from "react-native-elements";
export default function Department({ navigation, department }) {
  const renderListDepartment = () => {
    return department?.map((item, i) => {
      return (
        <ListItem
          key={i}
          bottomDivider
          onPress={() =>
            navigation.navigate("UserInfo", { key: item.key, name: item.name })
          }
        >
          <Icon name="iconfontdesktop" type="ant-design" />
          <ListItem.Content>
            <ListItem.Title>
              <Text>{item.name}</Text>
            </ListItem.Title>
            <ListItem.Subtitle>{item.id}</ListItem.Subtitle>
          </ListItem.Content>
          <Text>({item.male})</Text>
          <Icon
            size={17}
            name="male-symbol"
            type="foundation"
            color="#5584AC"
          />
          <Text>({item.female})</Text>
          <Icon
            size={17}
            name="female-symbol"
            type="foundation"
            color="#F2789F"
          />
          {/* <Text>({item.count})</Text>
          <Icon size={15} name="users" type="feather" /> */}
        </ListItem>
      );
    });
  };
  return (
    <ScrollView style={{ height: "100%" }}>{renderListDepartment()}</ScrollView>
  );
}
