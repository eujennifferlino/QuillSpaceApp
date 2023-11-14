import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #1a1e29;
`;

export const ButtonPost = styled.TouchableOpacity`
  position: absolute;
  bottom: 5%;
  right: 6%;
  width: 60px;
  height: 60px;
  background-color: #2D3447;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

export const PostsList = styled.FlatList`
  flex:1;
  background-color: #f1f1f1;
`;