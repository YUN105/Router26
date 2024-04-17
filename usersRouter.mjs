import express from "express";

const router=express.Router();

router.get('/',(req,res)=>{
    res.send("首頁")
})

router.get('/users',(req,res)=>{
    res.send("獲取所有使用者")
})

router.get("/users/search", (req, res) => {
    res.send("使用ID作為搜尋條件來搜尋使用者");
  });

router.get("/users/status",  (req,res) => {
    res.send("檢查使用者狀態")
});

router.get('/users/:id',(req,res)=>{
    res.send(`獲取特定ID的使用者${req.params.id}`)
})

router.post("/users/", (req, res) => {
  res.send("新增一個使用者");
});

router.put("/users/:id/", (req, res) => {
  res.send(`更新特定${req.params.id}使用者`);
});

router.delete("/users/:id/", (req, res) => {
  res.send(`刪除特定${req.params.id}的使用者`);
});


router.post("/login", (req, res) => {
  res.send("使用者登入");
});

router.post("/logout", (req, res) => {
  res.send("使用者登出");
});

export default router;