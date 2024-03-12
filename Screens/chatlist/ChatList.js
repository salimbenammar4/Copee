import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ChatList = () => {
    const navigation = useNavigation()
    const ChatId = "F1PQy26JBJUSTJW9KJz4CbCGOUe2"

    const openchat = () => {
        navigation.navigate('Chat', { ChatId })
    }

    return (
        <View>
            <TouchableOpacity onPress={openchat}> 
                <Text>
                    chatList
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChatList

const styles = StyleSheet.create({})
