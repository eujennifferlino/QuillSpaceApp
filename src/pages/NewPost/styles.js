import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #2D3447;
`;

export const Input = styled.TextInput`
  background-color: transparent;
  margin: 10px;
  color: #F0F4FF;
  font-size: 20px;
`;

export const Button = styled.TouchableOpacity`
  margin-right: 7px;
  padding: 5px 12px;
  background-color: #FF5500;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #F0F4FF;
  font-weight: bold;
  font-size: 18px;
`;