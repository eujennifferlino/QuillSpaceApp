import React, { useState, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Container, Title, Input, Button, ButtonText, SignUpButton, SignUpText } from './styles';
import { AuthContext } from '../../contexts/auth';
import * as Animatable from 'react-native-animatable';

const TitleAnimated = Animatable.createAnimatableComponent(Title)

function Login(){
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, signIn, loadingAuth } = useContext(AuthContext);

  function toggleLogin(){
    setLogin(!login)
    setName('')
    setEmail('')
    setPassword('')
  }

  async function handleSignIn(){
    if(email === '' || password === ''){
      alert("Todos os campos precisam ser preenchidos!")
      return;
    }
    await signIn(email, password)
  }

  async function handleSignUp(){
    if(name === '' || email === '' || password === ''){
      alert("Todos os campos precisam ser preenchidos!")
      return;
    }
    await signUp(email, password, name)
  }

  if(login){
    return(
      <Container>
        <TitleAnimated animation="flipInY">
          Quill<Text style={{ color: '#01c38e' }}>Space</Text>
        </TitleAnimated>
  
        <Input 
          placeholder="E-mail"
          placeholderTextColor="#B8B8B8"
          autoCorrect={false}
          autoCapitalize="none"
          value={email}
          onChangeText={ (text) => setEmail(text) }
        />
        <Input 
          placeholder="Senha"
          placeholderTextColor="#B8B8B8"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
          value={password}
          onChangeText={ (text) => setPassword(text) }
        />
  
        <Button onPress={handleSignIn}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF"/> 
          ) : (
            <ButtonText>Entrar</ButtonText>
          )}
        </Button>
  
        <SignUpButton onPress={toggleLogin}>
          <SignUpText>Não tem conta? Cadastre-se</SignUpText>
        </SignUpButton>
      </Container>
    )
  }

  return(
    <Container>
      <TitleAnimated animation="pulse">
        Quill<Text style={{ color: '#01c38e' }}>Space</Text>
      </TitleAnimated>
  
      <Input 
        placeholder="Nome completo"
        placeholderTextColor="#B8B8B8"
        autoCorrect={false}
        autoCapitalize="none"
        value={name}
        onChangeText={ (text) => setName(text) }
      />
      <Input 
        placeholder="E-mail"
        placeholderTextColor="#B8B8B8"
        autoCorrect={false}
        autoCapitalize="none"
        value={email}
        onChangeText={ (text) => setEmail(text) }
      />
      <Input 
        placeholder="Senha"
        placeholderTextColor="#B8B8B8"
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={true}
        value={password}
        onChangeText={ (text) => setPassword(text) }
      />
  
      <Button onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF"/> 
          ) : (
            <ButtonText>Cadastrar</ButtonText>
          )}
      </Button>
  
      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Já tem conta? Faça login</SignUpText>
      </SignUpButton>
    </Container>
  )
}

export default Login;