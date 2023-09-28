import { useState, useEffect } from 'react';
import { LocationSelector } from 'shared/components/LocationSelector';

export default function DeliveryStreet() {
  const [streets, setStreets] = useState([]);
  const [targetStreet, setTargetStreet] = useState('');
  const [selectedStreetData, setSelectedStreetData] = useState(null);

  return <LocationSelector />;
}
