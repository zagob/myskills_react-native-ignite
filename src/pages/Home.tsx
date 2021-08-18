import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Platform,
    FlatList,
    Alert,
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
    id: string;
    name: string;
    date?: Date;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [gretting, setGretting] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();
    
    if(currentHour < 12) {
        setGretting('Good morning');
    }
    else if (currentHour >= 12 && currentHour < 18) {
        setGretting('Good afternoon');
    } else {
        setGretting('Good night');
    }
  }, []);

  function handleAddNewSkills() {
      if (newSkill === '') {
          return Alert.alert('Preencha o campo!')
      }

      const data = {
          id: String(new Date().getTime()),
          name: newSkill
      }
      setMySkills(oldState => [...oldState, data]);
      setNewSkill('');
  }

  function handleRemoveSkill(id: string) {
    setMySkills(filtered => filtered.filter(item => 
        item.id !== id
    ))
  }

  return (
    <View style={styles.cotainer}>
      <Text style={styles.title}>Welcome, Matheus</Text>

      <Text style={styles.greetings}>{gretting}</Text>

      <TextInput 
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddNewSkills} title="Add" />  

      <Text style={[styles.title, {marginVertical: 30}]}>
          My Skills
      </Text>

        <FlatList 
            data={mySkills}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <SkillCard skill={item.name} onPress={() => handleRemoveSkill(item.id)} />
            )}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    cotainer: {
        flex: 1, 
        backgroundColor: '#121015',
        paddingHorizontal: 30,
        paddingVertical: 70,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#1f1e25',
        color: '#fff',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop: 30,
        borderRadius: 7,
    },
    greetings: {
        color: '#fff',
    }
})