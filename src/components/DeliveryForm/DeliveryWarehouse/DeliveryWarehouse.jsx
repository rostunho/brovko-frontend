import { useState, useEffect } from 'react';
import { findWarehouse } from 'shared/services/api';
import { LocationSelector } from 'shared/components/LocationSelector';

export default function DeliveryWarehouse({ handleData, cityName, cityRef }) {
  const [warehouses, setWarehouses] = useState(['A', 'B', 'C']);
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

    const value = targetWarehouse.toLowerCase();

    const response = await findWarehouse(value, cityName, cityRef);

    console.log(response);
    if (!response) {
      return;
    }

    setWarehouses(response);
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
      deliveryPoint
    />
  );
}
