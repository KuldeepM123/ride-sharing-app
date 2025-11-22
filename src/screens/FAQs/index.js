import HeaderBack from '@utils/HeaderBack';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
  ScrollView,
} from 'react-native';
// import SmallHeader from '';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const faqData = [
  {
    question: 'How do I reset my password?',
    answer:
      'You can reset your password by going to the Profile section, selecting “Change Password,” and following the on-screen instructions.',
  },
  {
    question: 'How can I contact customer support?',
    answer:
      'You can reach our support team via the Support screen or by calling the helpline number listed there.',
  },
  {
    question: 'Where can I view my booking history?',
    answer:
      'All your bookings can be viewed in the Bookings section of the app under your profile.',
  },
  {
    question: 'Can I update my vehicle information?',
    answer:
      'Yes, go to the “My Vehicle” section in your profile and tap “Edit Vehicle” to update your vehicle details.',
  },
];

const FAQScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <View style={styles.container}>
      <HeaderBack title="FAQs" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {faqData.map((item, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => toggleExpand(index)}>
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.icon}>
                {expandedIndex === index ? '-' : '+'}
              </Text>
            </TouchableOpacity>
            {expandedIndex === index && (
              <View style={styles.answerContainer}>
                <Text style={styles.answer}>{item.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f8f9fb'},
  scrollContainer: {padding: 15, paddingTop: 10},
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    flex: 1,
  },
  icon: {
    fontSize: 20,
    color: '#9e1b32',
    marginLeft: 10,
  },
  answerContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 15,
  },
  answer: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default FAQScreen;
