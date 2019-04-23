/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
let trendingList;

function computeTrendingHelper(docs, trendingObject) {
  for (const doc in docs) {
    const thisDoc = docs[doc];
    if (thisDoc.albumObjectId in trendingObject) {
      trendingObject[thisDoc.albumObjectId] += 1;
    } else {
      trendingObject[thisDoc.albumObjectId] = 1;
    }
  }
}

function computeTrending(Vote, Comment) {
  const daysTrending = 7;
  const computeInterval = 3600000; // 1 hour
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - daysTrending);
  const trendingObject = {};

  Vote.find({ timestamp: { $gte: startDate } }, (err, votes) => {
    if (!err) {
      computeTrendingHelper(votes, trendingObject);
      Comment.find({ timestamp: { $gte: startDate } }, (error, comments) => {
        if (!error) {
          computeTrendingHelper(comments, trendingObject);
          trendingList = Object.entries(trendingObject)
            .sort((a, b) => b[1] - a[1]).map(pair => pair[0]);
          return trendingList;
        }
        return [];
      });
    }
    return [];
  });

  setTimeout(computeTrending, computeInterval, Vote, Comment);
}

function getTrendingList() {
  return trendingList;
}

module.exports = { computeTrending, getTrendingList };
