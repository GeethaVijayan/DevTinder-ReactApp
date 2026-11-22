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
New Feature -accept,reject connection Request

Send/ignore user card from feed
signup new user 
E2E Testing





Componnet Level Design for DevTinder

Body 
  -NavBar
  Route = / =>Feed Page
  Route =/login =>login Page
  Route =/connections  =>ConnectionsPage
  Route =/profile =>profile Pge

  ---------
  Deployment 
  Create account in aws(free plan)
  login into site
  create server machine ubuntu and launch ec2 instance 
  it will give secret-key pair .pem file
  Download secret .pem file 
 Open an SSH client (authorize pem file )
Locate or download your private key file
Ensure your key is not publicly viewable
connect through this command 
 open cmd and go to ffolder where .pem file is downloaded 
  ssh -i "DevTinder Secret.pem" ubuntu@ec2-32-236-195-147.ap-southeast-2.compute.amazonaws.com
  now you have machine in server and we need to make that machhine compatibale before downloading project so make sure machine has all project dependencies 
  and then Download and install local same version of node(v24.22.2)
  (now this new maachine in server don't have code)
  1. we need to get this code from github
    git clone https://github.com/GeethaVijayan/DevTinder-ReactApp.git (frontend) in server machine
    git clone https://github.com/GeethaVijayan/DevTinder.git  (backend) in server machine

    -We first Deploy our Frontend Project(DevTinder ReactApp)
      in local we will run application using npm run dev  
        but for production first we need to create build of the project 
            we are using vite - It is bundler (bundle of whole project and build it like webpack)
             bundles project , build it and gives dist Folder (makes production ready code and gives it in dist folder )
          we need to build in remote machine (aws instance)
           - it says vite not found . beacuse its a new machine whchi still require from our end to install depenedices
            Npm install( frst clone , npm install and then npm run build )