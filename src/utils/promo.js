const supabase = require('../config/supabase');

const Promo = async () => {
  const { count: numberOfPromo } = await supabase
    .from('promo')
    .select('*', { count: 'exact' });

  const modelsToBeReturned = 4;

  // we need to return exactly 4 promoted models
  // if there are less than 4 models in the database
  // higherRange will be exactly 4, else it will be the number of models in the database
  // lowerRange will be 0, if higherRange is more than 4, else it will be higherRange - 4
  let higherRange = Math.floor(Math.random() * numberOfPromo);
  higherRange = higherRange >= modelsToBeReturned ? higherRange : numberOfPromo;
  const lowerRange = higherRange > modelsToBeReturned ? higherRange - modelsToBeReturned : 0;

  const { data: creatorsPromo } = await supabase
    .from('promo')
    .select('creators (id, username, photosCount, videosCount, postsCount, avatar, subscribePrice, name)')
    .range(lowerRange, higherRange);

  const creatorsPromoFinal = [];

  for (let i = 0; i < creatorsPromo.length; i += 1) {
    creatorsPromoFinal.push(creatorsPromo[i].creators);
  }

  return creatorsPromoFinal;
};

module.exports = Promo;
