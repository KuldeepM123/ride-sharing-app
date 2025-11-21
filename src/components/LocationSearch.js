import React, {useState} from 'react';
import {View, TextInput, FlatList, TouchableOpacity, Text} from 'react-native';
import {getPlaceDetails, searchLocation} from '../services/searchLocation';

export default function LocationSearch({placeholder, onSelect}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async text => {
    setQuery(text);

    if (text.length < 3) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const predictions = await searchLocation(text);
      console.log('Predictions: ', predictions);

      setResults(Array.isArray(predictions) ? predictions : []);
    } catch (err) {
      console.log('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async item => {
    try {
      const details = await getPlaceDetails(item.place_id);
      console.log('Details: ', details);

      const loc = {
        name: item.description,
        address: item.structured_formatting?.secondary_text || '',
        latitude: details.lat,
        longitude: details.lng,
      };

      onSelect(loc);

      setQuery(item.description);
      setResults([]);
    } catch (err) {
      console.log('Select error:', err);
    }
  };

  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={query}
        onChangeText={handleSearch}
        style={{
          backgroundColor: '#F8F9FA',
          height: 48,
          borderRadius: 12,
          paddingHorizontal: 16,
          fontSize: 14,
          color: '#333',
          borderWidth: 1,
          borderColor: '#E0E0E0',
        }}
      />

      {loading && <Text style={{padding: 8, color: '#666'}}>Searching…</Text>}

      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={item => item.place_id}
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            marginTop: 8,
            maxHeight: 200,
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={{
                padding: 12,
                borderBottomWidth: 1,
                borderColor: '#eee',
              }}>
              <Text style={{fontSize: 14, color: '#333', fontWeight: '500'}}>
                {item.structured_formatting?.main_text || item.description}
              </Text>
              <Text style={{fontSize: 12, color: '#666', marginTop: 2}}>
                {item.structured_formatting?.secondary_text || ''}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
