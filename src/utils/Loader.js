
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Modal, ActivityIndicator, Image } from "react-native";
import { horizScale } from "./Layout";

const Loader = (props) => {
    const { loading, ...attributes } = props;

    return (
        <Modal
            transparent={true}
            animationType={"none"}
            visible={loading}
            onRequestClose={() => {
                console.log("close modal");
            }}
        >
            <View >
                <View style={styles.viewstyle}>
                    <ActivityIndicator size={60}
                    style={styles.indicator} />
                </View>
            </View>
        </Modal>
    );
};

export default Loader;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "#00000040",
    },
    viewstyle: {
        height: horizScale(400),
        width: horizScale(400),
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: 100,
    },
    indicator: {
        height: 80, // Custom height for alignment
        width: 80,  // Custom width for alignment
        transform: [{ scale: 1.5 }], // To scale the size further
    },
});
