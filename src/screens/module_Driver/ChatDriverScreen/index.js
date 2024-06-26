import React, {useState, useLayoutEffect, useCallback} from 'react';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import CUSTOM_COLOR from '../../../constants/colors';
import {useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image, TouchableOpacity, View} from 'react-native';
import {IMAGES} from '../../../assets/images';
import storage from '@react-native-firebase/storage';

export default function ChatDriverScreen({route, navigation}) {
  const userAuth = useSelector(state => state?.users?.userAuth);
  const [imageUrl, setImageUrl] = useState('');

  // const c_uid = userAuth?.id;
  const t_uid = route.params.uid;
  const c_uid = userAuth?.id;
  // const t_uid = '66489a827fc87cf7ec5220b2';
  const docId = t_uid + '-chatwith-' + c_uid;

  const [messages, setMessages] = useState([]);
  let isInit = true;
  // const navigation = useNavigation();

  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: 'white',
          borderTopColor: '#E8E8E8',
          borderTopWidth: 1,
        }}
      />
    );
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    });
    const subscriber = firestore()
      .collection('chats')
      .doc(docId)
      .onSnapshot(documentSnapshot => {
        console.log('User data is: ', documentSnapshot.data());
        if (!documentSnapshot.data()) isInit = false;
        const sn = documentSnapshot.data()?.messages ?? [];
        setMessages(() => {
          return sn.reverse().map(e => {
            return {
              ...e,
              createdAt: e.createdAt.toDate(),
            };
          });
        });
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

    const onSendMsg = useCallback(async (msgArray = []) => {
        const msg = msgArray[0]
        const time = new Date();
        console.log(msg)
        const url = await uploadImg(imageUrl, "", msg);
        const userMsg = {
            ...msg,
            sentBy: c_uid,
            sentTo: t_uid,
            createdAt: time,
            image: url,
        }
        console.log(isInit)
        const doc = await firestore().collection('chats').doc(docId).get();
        const doesDocExist = doc.exists;
        if (!doesDocExist) {
            isInit = true;
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
    }, [imageUrl]);
    const handlePickImage = async () => {
        let options = {
            storageOptions: {
                path: 'image'
            }
        }
        try {
            launchImageLibrary(options, response => {
                if (!!response.assets) {
                    setImageUrl(response ? response?.assets[0]?.uri : '');
                }
                else { return; }
            })
        } catch (error) {
            console.log(error)
        }
    };
    async function uploadImg(file, type, name) {
        try {
            if(!file) return "";
            const uid = Date.now();
            const reference = storage().ref(`/images/img_${name}_${uid}`);

      await reference.putFile(file);
      const url = await reference.getDownloadURL();
      // console.log(url)
      return url;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <GiftedChat
      style={{flex: 1, backgroundColor: '#001973'}}
      showAvatarForEveryMessage={true}
      messages={messages}
      onSend={text => onSendMsg(text)}
      actions={[
        {
          icon: <Ionicons name="image" size={24} color="#333" />,
          onPress: handlePickImage,
        },
      ]}
      user={{
        _id: c_uid,
        avatar: userAuth?.avatar,
      }}
      renderMessageImage={props => (
        <Image
          source={{uri: props.currentMessage.image}}
          style={{width: 200, height: 200}}
        />
      )}
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
      alwaysShowSend
      renderSend={props => {
        return (
          <View
            style={{flexDirection: 'row', alignItems: 'center', height: 60}}>
            {imageUrl !== '' ? (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                  marginRight: 10,
                }}>
                <Image
                  source={{uri: imageUrl}}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    position: 'absolute',
                  }}
                />

                <TouchableOpacity
                  onPress={() => {
                    setImageUrl('');
                  }}>
                  <Image
                    source={IMAGES.close}
                    style={{width: 16, height: 16, tintColor: 'black'}}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={() => {
                handlePickImage();
              }}>
              <Image
                source={IMAGES.image_gallery}
                style={{width: 24, height: 24}}
              />
            </TouchableOpacity>
            <Send {...props} containerStyle={{justifyContent: 'center'}}>
              <Image
                source={IMAGES.send}
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 10,
                  tintColor: 'orange',
                }}
              />
            </Send>
          </View>
        );
      }}
    />
  );
}
