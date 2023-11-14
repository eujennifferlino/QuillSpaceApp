import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #1a1e29;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: #F0F4FF;
  font-size: 50px;
  font-weight: bold;
  font-style: italic;
`;

export const Input = styled.TextInput`
  width: 80%;
  background-color: #F0F4FF;
  margin-top: 12px;
  padding: 12px;
  border-radius: 9px;
  font-size: 18px;
`;

export const Button = styled.TouchableOpacity`
  width: 80%;
  background-color: #FF5500;
  border-radius: 9px;
  margin-top: 12px;
  padding: 12px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #F0F4FF;
  font-size: 18px;
  font-weight: bold;
`;

export const SignUpButton = styled.TouchableOpacity`
  width: 100%;
  margin-top: 12px;
  justify-content: center;
  align-items: center;
`;

export const SignUpText = styled.Text`
  color: #DDD;
  font-size: 15px;
`;