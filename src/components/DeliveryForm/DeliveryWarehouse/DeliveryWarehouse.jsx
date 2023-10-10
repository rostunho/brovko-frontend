import { useState, useEffect } from 'react';
import { findWarehouse } from 'shared/services/api';
import { LocationSelector } from 'shared/components/LocationSelector';

export default function DeliveryWarehouse({ handleData, cityName, cityRef }) {
  const [warehouses, setWarehouses] = useState([]);
  const [targetWarehouse, setTargetWarehouse] = useState('');
  const [selectedWarehouseData, setSelectedWarehouseData] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchWarehousesFromAPI, [handleData, selectedWarehouseData]);

  // testing ... delete later
  useEffect(() => {
    fetchWarehousesFromAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetWarehouse]);

  useEffect(() => {
    handleData && handleData(selectedWarehouseData);
  }, [handleData, selectedWarehouseData]);

  async function fetchWarehousesFromAPI() {
    // if (targetWarehouse.length < 1) {
    //   return;
    // }

    const value = targetWarehouse ? targetWarehouse.toLowerCase() : '';

    const response = await findWarehouse(value, cityName, cityRef);

    console.log(response);
    if (!response) {
      return;
    }

    const result = response.filter(
      point =>
        point.TypeOfWarehouse !== 'f9316480-5f2d-425d-bc2c-ac7cd29decf0' &&
        point.TypeOfWarehouse !== '95dc212d-479c-4ffb-a8ab-8c1b9073d0bc'
    ); // Відсікаємо поштомати Нової Пошти і Приватбанку

    setWarehouses(result);
  }

  const extractTargetWarehouse = data => {
    setTargetWarehouse(data);
  };

  const extractWarehouseData = data => {
    setSelectedWarehouseData(data);
  };

  return (
    <LocationSelector
      label="Відділення Нової Пошти"
      data={warehouses}
      placeholder="Вкажіть номер, або адресу"
      extractSearchValue={extractTargetWarehouse}
      extractData={extractWarehouseData}
    />
  );
}
