import React, { useState, useContext, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../../contexts/auth';
import firestore from '@react-native-firebase/firestore';
import { Container, ButtonPost, PostsList } from './styles';
import Header from '../../components/Header';
import PostList from '../../components/PostList';

function Home() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [lastItem, setLastItem] = useState('');
  const [emptyList, setEmptyList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      function fetchPosts() {
        firestore()
          .collection('posts')
          .orderBy('created', 'desc')
          .limit(5)
          .get()
          .then((snapshot) => {
            if (isActive) {
              setPosts([]);
              const postList = [];

              snapshot.docs.map((u) => {
                postList.push({
                  ...u.data(),
                  id: u.id,
                });
              });

              setEmptyList(!!snapshot.empty);
              setPosts(postList);
              setLastItem(snapshot.docs[snapshot.docs.length - 1]);
              setLoading(false);
            }
          });
      }
      fetchPosts();

      return () => {
        isActive = false;
      };
    }, [])
  );

  async function handlePostsRefresh() {
    setLoadingRefresh(true);

    firestore()
      .collection('posts')
      .orderBy('created', 'desc')
      .limit(5)
      .get()
      .then((snapshot) => {
        setPosts([]);
        const postList = [];

        snapshot.docs.map((u) => {
          postList.push({
            ...u.data(),
            id: u.id,
          });
        });

        setEmptyList(false);
        setPosts(postList);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        setLoading(false);
      });

      setLoadingRefresh(false);

  }

  async function getListPosts(){
    if(emptyList){
      setLoading(false);
      return null;
    }

    if(loading) return;

    firestore().collection('posts')
    .orderBy('created', 'desc')
    .limit(5)
    .startAfter(lastItem)
    .get()
    .then( (snapshot) => {
      const postList = [];

      snapshot.docs.map( u => {
        postList.push({
          ...u.data(),
          id: u.id,
        })
      })

      setEmptyList(!!snapshot.empty)
      setLastItem(snapshot.docs[snapshot.docs.length - 1])
      setPosts(oldPosts => [...oldPosts, ...postList]);
      setLoading(false);

    })

  }

  return (
    <Container>
      <Header />

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={50} color="#01c38e" />
        </View>
      ) : (
        <PostsList
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({ item }) => <PostList data={item} userId={user?.uid} />}
          refreshing={loadingRefresh}
          onRefresh={handlePostsRefresh}
          onEndReached={ () => getListPosts() }
          onEndReachedThreshold={0.1}
        />
      )}

      <ButtonPost activeOpacity={0.8} onPress={() => navigation.navigate('NewPost')}>
        <Feather name="edit-2" color="#F0F4FF" size={25} />
      </ButtonPost>
    </Container>
  );
}

export default Home;