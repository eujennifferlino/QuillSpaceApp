import React from 'react';
import { Text } from 'react-native';
import { Container, Title } from './styles';

function Header(){
  return(
    <Container>
      <Title>
        Quill
        <Text style={{ fontStyle: 'italic', color: '#01c38e' }}>Space</Text>
      </Title>
    </Container>
  )
}

export default Header;