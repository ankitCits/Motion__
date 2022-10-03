import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { IMAGES } from "../../../../theme";

const RewardRoute = props => {
    return (
        <>
            <View style={styles.container}>
                <View style={{
                    alignSelf: "center",
                }}>
                    <Image
                        source={IMAGES.rewards}
                        defaultSource={IMAGES.headPhone}
                        style={styles.midContainer}
                    />
                </View>
                <View style={styles.subText}>
                <Text>No rewards</Text>
                </View>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: "center"
    },
    subText:{
        alignItems:"center"
    },
    midContainer:{
        width: 50, height: 65 
    },
});

export default RewardRoute;