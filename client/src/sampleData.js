
const Album = require('.../src/mongo');

const a1 = new Album({
  name: 'Awaken my love',
  artist: 'Childish Gambino',
  mbid: '00001',
  image: [],
  tags: [],
  votes: [],
});


a1.save();
