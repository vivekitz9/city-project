import React, { useState } from 'react';
import { Text } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';

const ReadScreen = ({ item }) => {
    const [read, setRead] = useState(false)

    const handlePress = () => {
        setRead(!read)
    }

    return (
        <>
            {read ? (
                <Text
                    style={{
                        fontFamily: FONT.Regular,
                        fontSize: FONTS_SIZE.xsmall,
                        fontWeight: '400',
                        lineHeight: 20.5,
                        paddingTop: 10,
                    }}>
                    {item?.description}
                </Text>
            ) : (
                <Text
                    numberOfLines={5}
                    style={{
                        fontFamily: FONT.Regular,
                        fontSize: FONTS_SIZE.xsmall,
                        fontWeight: '400',
                        lineHeight: 20.5,
                        paddingTop: 10,
                    }}>
                    {item?.description}
                </Text>
            )}

            <Text
                onPress={() => handlePress()}
                style={{
                    color: COLORS.Primary_2,
                    textAlign: 'right',
                    fontFamily: FONT.Regular,
                    fontSize: FONTS_SIZE.xsmall2,
                }}>
                {read ? 'Read less...' : 'Read more...'}
            </Text>
        </>
    );
};
export default ReadScreen;
