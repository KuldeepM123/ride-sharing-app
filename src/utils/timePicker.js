import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function SchedulePicker() {
  const [timeMode, setTimeMode] = useState('Schedule'); // Example; can be dynamic
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleConfirm = date => {
    setScheduledDate(date);
    setShowDatePicker(false);
  };

  const handleCancel = () => {
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      {timeMode === 'Schedule' && (
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}>
          <Text style={styles.datePickerText}>
            {scheduledDate.toLocaleString([], {
              hour: '2-digit',
              minute: '2-digit',
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </Text>
        </TouchableOpacity>
      )}

      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="datetime" // use "time" if you only want time
        date={scheduledDate}
        is24Hour={true}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  datePickerText: {
    color: '#fff',
    fontSize: 16,
  },
});
