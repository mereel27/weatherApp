export const getWindDirect = (deg) => {
  switch (true) {
    case deg > 350 || deg <= 10:
      return 'North';
    case deg > 10 && deg < 80:
      return 'Northeast';
    case deg >= 80 && deg <= 100:
      return 'East';
    case deg > 100 && deg < 170:
      return 'Southeast';
    case deg >= 170 && deg <= 190:
      return 'South';
    case deg > 190 && deg < 260:
      return 'Southwest';
    case deg >= 260 && deg <= 280:
      return 'West';
    case deg > 280 && deg < 350:
      return 'Northwest';
    default:
      return 'N/A';
  }
};
