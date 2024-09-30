import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Dialog, Portal, Text} from 'react-native-paper';

type Props = {
  onClose: () => void;
  title: string;
  messages: string[];
  icon: string;
};

const MessageModal: React.FC<Props> = ({onClose, title, messages, icon}) => {
  return (
    <Portal>
      <Dialog visible={true} onDismiss={onClose} style={styles.dialog}>
        <Dialog.Icon icon={icon} />
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Content>
          {messages.map((message, index) => (
            <Text key={index} style={styles.message} variant="bodyMedium">
              {message}
            </Text>
          ))}
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
  },
});

export default MessageModal;
