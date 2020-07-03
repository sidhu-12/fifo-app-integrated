REQUIRED TO RUN APP :

1) Microsoft VS CODE		
2) Android Studio		-	Only for emulator purpose
3) Install node.js and npm	-	For the backend
4) Install expo using npm	- 	To run react-native app	
5) XAMPP			-	For Mysql db 

Copying project	:

1)Download the transporter project folder from github.
2)Open the folder in vs code
3)Press CTRL + ~ (tilde) to open the terminal
4)Enter		-	npm install


Running Application	:
3)Launch emulator using Android Studio
4)In Vs Code terminal enter -	npm start
5)This will open an expo tab in browser .
6)TO view app		-	 press 'a' in vs code terminal
		  		this will open the app in emulator

7)To view in mobile 	-	 download expo app from playstore
				 scan the QR code in the expo browser tab 


FOLDER STRUCTURE :

App.js			-	contains the navigation of all the screens.
package.json		-	contains the dependency modules needed for the app

BACKEND FOLDER 		:

1) routes.js		-	Contains all sql queries for the app
2) config.js		-	Set the host , username , password ,database ,port
				of your xampp db .	


COMPONENTS FOLDER :

1) Home.js		-	For the home screen , this will use Carousel.js , CarouselItem.js and Data.js 
				to create the slideshow .

2) login.js		-	Login screen

3) dashboard.js		-	Dashboard . Top-Left icon is for the side menu .

4) consign_notif.js	-	Consignee Request Screen.

5) confirmed_req.js	-	Confirmed Request Screen

6) driver_details.js	-	Driver Form details Screen.

7) arrived.js		-	To update arrival date and time .

8) shipper_req.js	-	To update shipper arrival date and time.