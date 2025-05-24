import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Colors } from '../theme/colors';

interface AddCardBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  addNewCard: (cardName: string) => void;
  addCardLoading: boolean;
}

const AddCardBottomSheet: React.FC<AddCardBottomSheetProps> = ({
  bottomSheetRef,
  addNewCard,
  addCardLoading,
}) => {
  const [cardName, setCardName] = useState('');

  const handleAddCard = () => {
    if (cardName.trim()) {
      addNewCard(cardName);
    }
  };

  const onCloseBottomSheet = () => {
    setCardName('');
  };

  const renderBackDrop = useCallback(
    (_props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {..._props}
        style={_props.style}
        pressBehavior={addCardLoading ? 'none' : 'close'}
      />
    ),
    [addCardLoading]
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      enablePanDownToClose={!addCardLoading}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      backdropComponent={renderBackDrop}
      index={-1}
      onClose={onCloseBottomSheet}
    >
      <BottomSheetView>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Add New Card</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Card Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Personal Card"
              placeholderTextColor="#999"
              value={cardName}
              onChangeText={setCardName}
              maxLength={25}
            />
          </View>

          <TouchableOpacity
            style={[styles.addButton, !cardName && styles.disabledButton]}
            onPress={handleAddCard}
            disabled={!cardName || addCardLoading}
          >
            {addCardLoading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text style={styles.addButtonText}>Add Card</Text>
            )}
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: '#fff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  handleIndicator: {
    backgroundColor: '#ccc',
    width: 40,
    height: 4,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f8f9fa',
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: Colors.accentGreenLight,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddCardBottomSheet;
