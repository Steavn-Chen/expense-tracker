### Expense Tracker 老爹的私房錢

使用 Node.js Express 打造老爹每天支出細項，這個項目主要可以使用類別選項來看各類支出總金額。

![restaurant-image](https://github.com/Steavn-Chen/AC_Expense-Teacker/blob/main/public/image/%E8%A8%BB%E5%86%8A%E9%A0%81.PNG)
![restaurant-image](https://github.com/Steavn-Chen/AC_Expense-Teacker/blob/main/public/image/%E9%A0%81%E9%A6%96.PNG)

# 測試帳號

name: user1, email: user1@example.com, password: 12345678 
name: user2, email: user2@example.com, password: 12345678
name: user3, email: user3@example.com, password: 12345678

## 功能表單

## <1.0 版>

- 可以新增一筆新的支出，也可以對原有的支出做修改，刪除。
## <2.0 版>

- 使用者得先註冊帳號才能使用，其此也可以用 Google，Facebook 第三方帳號註冊。
- 可以閱覽每項類別的支出總計。

## 啓動方式

- 將專案 clone 到本地端

https://github.com/Steavn-Chen/AC_Expense-Teacker

- 進入到專案資料夾
```
- 安裝 npm
```
  npm install
```
- 啓動專案
```
  npm run dev
```
- 若終端機出顥示出以下字串，表示成功。
```
  Expense-Tracker web on http://localhost:3000
```
  出現 mongodb is connected! ，代表 mongodb 資料庫連接成功

- 在終端機輸入 npm run seed
```
  看到 insert recordSeeder done! 種子資料建立成功
```
  ## 開發環境

- Node.js -v10.15.0
- Express -4.17.1
- Express-Handlebars-5.3.4
- mongoose 5.12.15

## 使用的套件

- express-handlebars
- method-override
- nodemon
- bcryptjs
- connect-flash
- dotenv
- moment
- passport
- passport-local
- passport-facebook
- passport-google-oauth20
- express-session
