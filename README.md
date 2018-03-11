# LabView-Webpage
This is the webpage for the LabView project by KirkStars, written at CampusHack2018.

This webpage is written in HTML, CSS and JavaScript. It communicates with the Java server found [here](https://github.com/BreD1810/LabView-Server).

## Homepage
[This](http://labview.me/) (if it is still live, and you're connecting using a University of Southampton VPN) is the homepage. It servers some general information about the project, and provides a link to the "LabView" page.

![Homepage](https://i.imgur.com/SRVGzn4.png)

## LabView
[This](http://labview.me/labview) is the main page of the website. It shows the details about the machines that are live in the lab selected. Currently, it displays a green cell if the client is connected, and a red cell if the client is not connected. The text is also alternated between '1' and '0'.

![labview page](https://i.imgur.com/FFrsdpd.png)

![labview page when clients are connected](https://i.imgur.com/LiNfUIH.png)

In the future it will *hopefully* look like [this](http://labview.me/tableexample):

![labview future example](https://i.imgur.com/Z3EFQb3.png)

The idea is to represent the lab pcs as a sequence of objects on the screen, that then have colour changes representing their state. The objects would be layed out in a way to represent the lab layout. We hope to implement a way for the admin to easily add lab layouts to the system. This will ideally be done with something such as XML.

## Admin
[This](http://labview.me/admin) is the admin page. It allows for the admin to add PCs to a lab. It also allows for the creation of a new lab on the system.

![admin page](https://i.imgur.com/7I7lKVK.png)

### The Future:
In the future, we plan on adding the following features:
1. Proper display with lab layout.
2. Filters for the machines in the lab
	* OS
	* Specs
3. Possibly reserving pcs in the lab.
	* Unsure how to implement as will need to be running when the user is offline.
