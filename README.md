# React + Vite

create React + vite project
Remove unneccessary code and add hello world

//Install tailwind in web project 
1.npm install tailwindcss @tailwindcss/vite
2.open vite.config.ts plugin 
     tailwindcss(), inside import tailwindcss from '@tailwindcss/vite'
     plugins along with react add tailwind
     import tailwindcss from '@tailwindcss/vite'
3. insde  src/index.scss    - @import "tailwindcss";
4.src/main.tsx. -import './index.css'
5.inside function app.jsx 
/**
use tailwind 
className="min-h-screen bg-gray-900 flex items-center justify-center"
eg:claassNaame : 
 */
Install tailwind version 4 to get l
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

--
Install daisyUI & its relateed components
Add navBar componnet to app.jsx
Create a navBar.jsx to seperate Component file
Install react Router Dom
create BrowserRouter > Routes >    Route =/Body >RouteChildren
Create an Outllet in your Body Component
create a footer

create a login Page

CORS error
 we are in X domain passing api call to y Domain we will get CORS Error
 eg:I'm trying to make api call in localhost:5173 to localhost:9000
 only happens in browser for securiy reasons 

Create a login Page 
install AXIOS
install CORS -in backend ==>Add middleware in app.js with configurations
{ origin, credentials}
whenever we are making api call pass with axios =>{withCredentials:true}

REDUX
Install Redux toolkit using npm install command 
 install react redux toolkit react-redux + @reduxjs/toolkit =>
 configureStore =>provider (app.js) =>createSlice =>add reducer to store
creating appStore(utils-appStore)
creating userSlice ()

configure the store 
add redux devTools in chrome 
Login and see your data is coming properly from store 
navbar updates the user logged in details
navbar upddate s soon as the user logs in
Refactor our code to add consstants file  + create a componnet 

you should not be accesssed to other pages without login (authentication added )
when you login token you will get from backend and stores in cokkies in browser 
if token is not present we will redirect to login page
build Logout feature

get the feed (axios api) and add the feed in store 
build the user card on the feed
Edit profile Feature
save the profile . Edit data and save the profile
show Toast Messge on save of profile
New Page to see all my connections in connections Page (connection Request i have sent)
New page to see all my request (request received)





Componnet Level Design for DevTinder

Body 
  -NavBar
  Route = / =>Feed Page
  Route =/login =>login Page
  Route =/connections  =>ConnectionsPage
  Route =/profile =>profile Pge
