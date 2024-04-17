//純api 無視覺
import express from 'express';
import multer from 'multer';
import moment from 'moment'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import {v4 as uuidv4} from 'uuid'
import {Low} from 'lowdb'
import {JSONFile} from 'lowdb/node'
import dotenv from 'dotenv'
import productsRouter from './productsRouter.mjs';
import usersRouter from './usersRouter.mjs'

dotenv.config(); 
const secretKey = process.env.SECRET_KEY;

let whitelist = ["http://localhost:5500", "http://localhost:3000"];
let corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("不允許傳遞資料 CORS"));
    }
  }
}
const upload=multer();

const defaultData= {products:[],user:[]}
const db= new Low(new JSONFile("db.json"),defaultData);
await db.read();


const app = express();
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);


// 中間件函數用來檢查 JWT
function checkToken(req, res, next){
    // 從請求頭中獲取 'authorization' 欄位，通常承載著 JWT
    let token = req.get("authorization");
    
    // 檢查 token 是否存在且格式為 'Bearer tokenstring'
    if(token && token.indexOf("Bearer ") === 0){
        // 從 'Bearer ' 後面截取真正的 token 字串
        token = token.slice(7);

        // 使用 jwt 模塊驗證 token 的有效性
        //第一個參數是要被解析的 token
        //第二個參數是金鑰
        //第三個是執行函數，會傳入失敗與結果
        jwt.verify(token, secretKey, (error, decoded) => {
            // 驗證失敗時返回錯誤訊息
            if(error){
                return res.status(401).json({
                    status: "error",
                    message: "登入驗證失敗，請重新登入"
                });
            }
            // 驗證成功，將解碼後的資料賦值給請求對象，以便後續使用
            req.decoded = decoded;
            // 調用 next() 繼續處理請求
            next();
        });
    }else{
        // 如果沒有提供 token 或格式不正確，返回錯誤
        return res.status(400).json({
            status: "error",
            message: "沒有驗證資料，請重新登入"
        });
    }
}


app.listen(3000,()=>{
    console.log('server is running at http://localhost:3000')
})