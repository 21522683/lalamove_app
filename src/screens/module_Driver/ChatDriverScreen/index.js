import React, {
    useState,
    useLayoutEffect,
    useCallback
} from 'react';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import CUSTOM_COLOR from '../../../constants/colors';
import { useSelector } from 'react-redux';


export default function ChatDriverScreen({ route, navigation }) {
    const userAuth = useSelector(state => state?.users?.userAuth);

    // const c_uid = userAuth?.id;
    // const t_uid = route.params.uid;
    const c_uid = 'user1';
    const t_uid = 'driver2';
    const docId = t_uid+"-chatwith-"+c_uid;

    const [messages, setMessages] = useState([]);
    let isInit = true;
    // const navigation = useNavigation();

    const customtInputToolbar = props => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: "white",
                    borderTopColor: "#E8E8E8",
                    borderTopWidth: 1,
                }}
            />
        );
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.name
        })
        const subscriber = firestore()
            .collection('chats')
            .doc(docId)
            .onSnapshot(documentSnapshot => {
                console.log('User data is: ', documentSnapshot.data());
                if(!documentSnapshot.data()) isInit = false;
                const sn = documentSnapshot.data()?.messages ?? [];
                setMessages(
                    () => {
                        return sn.reverse().map((e) => {
                            return {
                                ...e,
                                createdAt: e.createdAt.toDate()
                            }
                        })
                    }
                );
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, []);


    const onSendMsg = useCallback(async (msgArray = [])  => {
        const msg = msgArray[0]
        const time = new Date();
        console.log(msg)
        const userMsg = {
            ...msg,
            sentBy: c_uid,
            sentTo: t_uid,
            createdAt: time
        }
            console.log(isInit)
        if (!isInit) {
            isInit=true;
            firestore()
                .collection('chats')
                .doc(docId)
                .set({
                    id: 'user1-chatwith-driver2',
                    messages: []
                })
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, userMsg))
        firestore()
            .collection('chats')
            .doc(docId)
            .update({
                messages: firestore.FieldValue.arrayUnion({ ...userMsg }),
            })
            .then(() => {
                console.log('User added!');
            });
    }, []);

    return (


        <GiftedChat
            style={{ flex: 1, backgroundColor: '#001973' }}
            showAvatarForEveryMessage={true}
            messages={messages}
            onSend={text => onSendMsg(text)}
            user={{
                _id: c_uid,
                avatar: userAuth?.avatar
            }}
            renderInputToolbar={props => customtInputToolbar(props)}
            renderBubble={props => {
                return (
                    <Bubble
                        {...props}

                        textStyle={{
                            right: {
                                color: 'white',
                                // fontFamily: "CerebriSans-Book"
                            },
                            left: {
                                color: '#24204F',
                                // fontFamily: "CerebriSans-Book"
                            },
                        }}
                        wrapperStyle={{
                            left: {
                                backgroundColor: '#E6F5F3',
                            },
                            right: {
                                backgroundColor: CUSTOM_COLOR.Primary,
                            },
                        }}
                    />
                );
            }}
        />

    );
}