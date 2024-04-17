import express from 'express';
const router=express.Router()

router.get('/', (req, res) => {
    res.send('顯示所有產品');
  });

router.get('/:id', (req, res) => {
    res.send(`獲取特定ID的產品：${req.params.id}`);
    });


router.post('/', (req, res) => {
    res.send('新增一個產品');
    });

router.put('/:id', (req, res) => {
    res.send(`更新特定ID的產品：${req.params.id}`);
    });

router.delete('/:id', (req, res) => {
    res.send(`刪除特定ID的產品：${req.params.id}`);
    });

router.get('/search/:id', (req, res) => {
        res.send(`刪除特定ID的產品：${req.params.id}`);
        });


  export default router;