const getRatingDesc = (rating: number): string => {
  switch (rating) {
    case 1:
      return 'You are failing to meet your targets, do better!';
    case 2:
      return 'Adequate';
    case 3:
      return 'Careful you might pull something';
    default:
      return 'You might have exercised this week, congratulations I guess?';
  }
};
export default getRatingDesc;
