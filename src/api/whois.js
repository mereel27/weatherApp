const getLocationByIp = async () => {
  const getLocationData = await fetch(`https://ipwhois.app/json/`);
  const locationDataJson = await getLocationData.json();
  return `${locationDataJson.longitude},${locationDataJson.latitude}`;
};

export default getLocationByIp;
