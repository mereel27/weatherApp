const Foreca = {
  domain: `https://${process.env.REACT_APP_API_URL}`,
  headers: {
    headers: {
      'x-rapidapi-host': process.env.REACT_APP_API_URL,
      'x-rapidapi-key': process.env.REACT_APP_API_KEY,
    },
  },
  async getLocation(city, lang) {
    const response = await fetch(
      `${this.domain}/location/search/${city}?lang=${lang || 'en'}`,
      this.headers
    );
    const jsonReponse = await response.json();
    if (jsonReponse.locations.length > 0) {
      return jsonReponse.locations;
    } else {
      return { name: 'Kyiv', country: 'Ukraine', id: '100703448' };
    }
  },

  async getData(url) {
    try {
      const data = await fetch(url, this.headers);
      const dataJson = await data.json();
      return dataJson;
    } catch (e) {
      console.log(`Error message: ${e.message}`);
    }
  },

  async getAllData(coord, windUnits, tempUnits, lang) {
    const urls = [
      `${this.domain}/location/${coord}?lang=${lang}`,
      `${this.domain}/current/${coord}?lang=${lang}&tempunit=${tempUnits}&windunit=${windUnits}`,
      `${this.domain}/forecast/hourly/${coord}?tempunit=${tempUnits}&windunit=${windUnits}`,
      `${this.domain}/forecast/daily/${coord}?dataset=full&periods=8&lang=${lang}&tempunit=${tempUnits}&windunit=${windUnits}`,
    ];
    const data = await Promise.all(urls.map((url) => this.getData(url)));
    return data;
  },
};

export default Foreca;
