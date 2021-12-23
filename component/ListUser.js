import React from "react";
import { View, Text } from "react-native";
import { Icon, ListItem } from "react-native-elements";

export default function ListUser({
  listUsers,
  navigation,
  showDepartmentName,
}) {
  const renderListUsers = (listUsers) => {
    return listUsers?.map((item, i) => {
      if (item.department == "TRUNG TAM KHAI THAC MAU") {
        item.department = "TTKTM";
      }
      return (
        <ListItem
          key={i}
          bottomDivider
          onPress={() =>
            navigation.navigate("UserInfoDetail", {
              id: item?.id,
              withAnimation: true,
            })
          }
        >
          {item?.gender == "1" ? (
            <Icon size={36} name="male" type="fontisto" color="#5584AC" />
          ) : (
            <Icon size={36} name="female" type="fontisto" color="#F2789F" />
          )}

          <ListItem.Content>
            <ListItem.Title>
              {item?.name} {showDepartmentName ? `(${item.department})` : ""}
            </ListItem.Title>
            <ListItem.Subtitle>
              <Text style={{ fontWeight: "700" }}>ID: </Text>
              <Text>{item?.id}</Text>
              {item?.pwd != null ? (
                <>
                  <Text style={{ fontWeight: "700" }}>, PW: </Text>
                  <Text>{item?.pwd}</Text>
                </>
              ) : (
                <></>
              )}
            </ListItem.Subtitle>
            <ListItem.Subtitle>
              <Text style={{ fontWeight: "700" }}>Age: </Text>
              <Text>{item?.age}</Text>
            </ListItem.Subtitle>
            {item?.ip != null ? (
              <ListItem.Subtitle>
                <Text style={{ fontWeight: "700" }}>IP: </Text>
                <Text>{item?.ip}</Text>
              </ListItem.Subtitle>
            ) : (
              <></>
            )}

            {item?.email != null ? (
              <ListItem.Subtitle>
                <Text style={{ fontWeight: "700" }}>Email: </Text>
                <Text>{item?.email}</Text>
              </ListItem.Subtitle>
            ) : (
              <></>
            )}
          </ListItem.Content>
          {item?.pwd != null ? (
            <View>
              <Text style={{ fontSize: 10, fontWeight: "700" }}>ERP</Text>
            </View>
          ) : (
            <Text></Text>
          )}

          {item?.status > 0 ? (
            <Icon
              size={18}
              name="checkcircleo"
              type="ant-design"
              color="#116530"
            />
          ) : (
            <Icon
              size={18}
              name="closecircleo"
              type="ant-design"
              color="#d4380d"
            />
          )}

          <ListItem.Chevron />
        </ListItem>
      );
    });
  };
  return <View>{renderListUsers(listUsers)}</View>;
}
