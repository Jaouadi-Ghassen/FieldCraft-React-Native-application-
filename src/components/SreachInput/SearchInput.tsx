import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchInput: React.FC<{
  searchTerm: string;
  onSearchChange: (term: string) => void;
}> = ({searchTerm, onSearchChange}) => {
  const onChangeText = (newText: string) => {
    onSearchChange(newText);
  };

  return (
    <View style={styles.inputContainer}>
      <Icon name="search" size={20} style={styles.icon} />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={searchTerm}
        placeholder="Search ..."
        onSubmitEditing={({nativeEvent}) => onSearchChange(nativeEvent.text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(141, 160, 210, 0.5)',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
    marginTop: '3%',
    marginBottom: 5,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default SearchInput;
