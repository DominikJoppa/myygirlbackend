const e = require('express');
const express = require('express');
const supabase = require('../../config/supabase');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { data: promo } = await supabase.from('promo').select('*');

        const dataJSON = {
            status: 'success',
            data: promo
        };
        return res.status(200).json(dataJSON);
    } catch (error) {
        const errorJSON = {
            status: 'error',
            message: error.message
          };
        res.status(500).json(errorJSON);
    }
});


router.post('/addModel', async (req, res) => {
    try {
        const { creator_id, start_date, end_date } = req.body;
        console.log(req.body);
        const { data: creatorID } = await supabase
            .from('creators')
            .select('creators_id')
            .eq(creator_id, 'creators_id');

        console.log(creatorID);

        if (creatorID !== null) {
            const {data : promo} = await supabase
                .from('promo')
                .select('id')
                .eq(creatorID, 'creators_id');
            
            if (promo !== null) {
                const errorJSON = {
                    status: 'error',
                    message: 'Promo already exists'
                };
                return res.status(500).json(errorJSON);
            }
            else {
                const { data: promo } = await supabase.from('promo').insert({ creators_id: creator_id, start_date, end_date });
                const dataJSON = {
                    status: 'success',
                    data: promo
                };
                return res.status(200).json(dataJSON);
            }
        }
        else {
            const errorJSON = {
                status: 'error',
                message: 'Creator does not exist'
            };
            return res.status(500).json(errorJSON);
        }

    } catch (error) {
        const errorJSON = {
            status: 'error',
            message: error.message
        };
        res.status(500).json(errorJSON);
    }
});

   
module.exports = router;
