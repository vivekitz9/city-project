import * as React from 'react';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from './../../constant';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ImageBackground,
    Modal,
    Dimensions
} from 'react-native';

const CommentModal = ({ showModal, setShowModal }) => {

    // const [showModal, setShowModal]=React.useState(showModal)


    return (
        <View style={{ flex: 1 }}>
            <Modal
                animationIn="slideInLeft"
                animationOut="slideOutRight"
                animationInTiming={500}
                animationOutTiming={750}
                isVisible={!showModal}
                useNativeDriver={true}
                onBackButtonPress={() => {
                    setShowModal(!showModal);
                }}>
                <View style={{ height: hp('90'), justifyContent: 'center', alignItems: 'center' }}>
                    <View
                        style={{
                            backgroundColor: 'blue',
                            justifyContent: 'center',
                            alignItems: 'center',

                            width: wp('90'),
                            height: hp('80')

                        }}>
                        <TouchableOpacity onPress={() => setShowModal(false)}>
                            <Text>Hi</Text>
                            {/* <Feather name="menu" size={40} color="red" /> */}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {

    },
    buttonText: {

    },
});

export default CommentModal;
