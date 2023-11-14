import React, { useContext, useState, useEffect } from 'react';
import { Modal, Platform} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import { Container, Name, Email, Button, ButtonText, UploadButton, UploadText, Avatar, ModalContainer, BackButton, Input } from './styles';
import Feather from 'react-native-vector-icons/Feather';

function Profile(){
  const { signOut, user, setUser, storageUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.nome);
  const [url, setUrl] = useState(null);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    let isActive = true;

    async function loadAvatar(){
      try{
        if(isActive){
          let response = await storage().ref('users').child(user?.uid).getDownloadURL();
        setUrl(response);
        }
      }catch(err){
        console.log("NÃO ENCONTRAMOS NENHUMA FOTO!")
      }
    }

    loadAvatar();

    return () => isActive = false;
  }, [])

  async function handleSignOut(){
    await signOut();
  }

  async function updateProfile(){
    if(name === ''){
      return;
    }

    await firestore().collection('users')
    .doc(user?.uid)
    .update({
      nome: name
    })  

    const postDocs = await firestore().collection('posts')
    .where('userId', '==', user?.uid).get();

    postDocs.forEach(async doc => {
      await firestore().collection('posts').doc(doc.id)
      .update({
        autor: name
      })
    })

    let data = {
      uid: user.uid,
      nome: name,
      email: user.email
    }

    setUser(data);
    storageUser(data);
    setOpen(false);

  }

  const uploadFile = () => {
    const options = {
      noData: true,
      mediaType: 'photo'
    };

    launchImageLibrary(options, response => {
      if(response.didCancel){
        console.log("Cancelou!");
      }else if(response.error){
        console.log("Ops! Parece que houve um erro...")
      }else{
        uploadFileFirebase(response)
        .then(() => {
          uploadAvatarPosts();
        })

        setUrl(response.assets[0].uri)

      }
    })

  }

  const getFileLocalPath = (response) => {
    return response.assets[0].uri;
  }

  const uploadFileFirebase = async (response) => {
    const fileSource = getFileLocalPath(response);
    const storageRef = storage().ref('users').child(user?.uid);
    
    return await storageRef.putFile(fileSource)

  }

  const uploadAvatarPosts = async () => {
    const storageRef = storage().ref('users').child(user?.uid);
    const url = await storageRef.getDownloadURL()
    .then(async (image) => {
      const postDocs = await firestore().collection('posts')
      .where('userId', '==', user.uid).get();

      postDocs.forEach(async doc => {
        await firestore().collection('posts').doc(doc.id).update({
          avatarUrl: image
        })

      })

    })
    .catch((error) => {

    })


  }
  
  return(
    <Container>
      <Header/>

      { url ? (
        <UploadButton onPress={ () => uploadFile()} >
          <UploadText>+</UploadText>
          <Avatar
            source={{ uri: url }}
          />
        </UploadButton>
      ) : (
        <UploadButton onPress={ () => uploadFile() }>
          <UploadText>+</UploadText>
        </UploadButton>
      ) }

      <Name>{user?.nome}</Name>
      <Email>{user?.email}</Email>

      <Button bg="#FF5500" onPress={ () => setOpen(true) }>
        <ButtonText color="#F0F4FF">Atualizar perfil</ButtonText>
      </Button>

      <Button bg="#F0F4FF" onPress={ handleSignOut }>
        <ButtonText color="#1a1e29">Sair</ButtonText>
      </Button>
      
      <Modal visible={open} animationType="slide" transparent={true}>
        <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
          <BackButton onPress={ () => setOpen(false) }>
            <Feather name="arrow-left" size={25} color="#2D3447"/>
            <ButtonText color="#2D3447">Voltar</ButtonText>
          </BackButton>

          <Input
            placeholder={user?.nome}
            placeholderTextColor="#B8B8B8"
            value={name}
            onChangeText={ (text) => setName(text) }
          />

          <Button bg="#FF5500" onPress={ updateProfile }>
            <ButtonText color="#F0F4FF">Salvar</ButtonText>
          </Button>

        </ModalContainer>
      </Modal>
    </Container>
  )
}

export default Profile;