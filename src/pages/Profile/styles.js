import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #1a1e29;
`;

export const Name = styled.Text`
  margin-top: 20px;
  margin-right: 20px;
  margin-left: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #F0F4FF;
`;

export const Email = styled.Text`
  color: #F0F4FF;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 10px;
  font-size: 16px;
  font-style: italic;
`;

export const Button = styled.TouchableOpacity`
  margin-top: 16px;
  background-color: ${props => props.bg};
  width: 80%;
  height: 50px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.color};
`;

export const UploadButton = styled.TouchableOpacity`
  margin-top: 20%;
  background-color: #F0F4FF;
  width: 165px;
  height: 165px;
  border-radius: 90px;
  justify-content: center;
  align-items: center;
  z-index: 8;
`;

export const UploadText = styled.Text`
  font-size: 55px;
  position: absolute;
  color: #01c38e;
  opacity: 0.4;
  z-index: 99;
`;

export const Avatar = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
`;

export const ModalContainer = styled.KeyboardAvoidingView`
  width: 100%;
  height: 60%;
  background-color: #F0F4FF;
  position: absolute;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  left: 23px;
  width: 90%;
  height: 50px;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.TextInput`
  background-color: #DDD;
  width: 80%;
  border-radius: 6px;
  padding: 10px;
  font-size: 16px;
  color: #1a1e29;
  text-align: center;
`;