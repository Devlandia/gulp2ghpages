# Gulp2GHPages
Base structure to create simple HTML pages and deploy them to GH-Pages

# Instructions

* Get the files
* Instsall NodeJS / NPM via NVM
* Install packages dependencies
* Customize source files and serve them
* Deploy to GH-Pages

## Get the files
You can either fork and rename the repository or just [download the master branch](https://github.com/pedromartos/simple-html-page/archive/master.zip) and put it on your own repository

## Install NodeJS / NPM via NVM
_(If you already have Node installed go to the next step)_

The best way to install Node is to use [creationix/nvm](https://github.com/creationix/nvm)

### Installing NVM
To install NVM you could use the [install script][2] using cURL:

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

or Wget:

    wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

### Installing NodeJS and NPM

With NVM installed you can install Node with:

    nvm install 4.4

After the process complete set the default Node version:

    nvm alias default 4.4
    
### Installing Gulp globally

    npm install gulp -g

## Install packages dependencies
Just go to your repository folder and run:

    npm install

I had installed all dependencies successfully on a `ubuntu/precise-x64` without any problem, but if you face an error during `npm install` try running it again. It seemed to have solved to me when I tried to run on a `debian/wheezy-7`

## Customize source files and serve them
After installing all dependencies you can now customize your project. The files you have to edit are on `src` folder.

The `index` is written in **[Jade](http://jade-lang.com/)**, though you can just rename the file to `index.html` it will work just fine.
The same goes for **JS** and **CSS** files they are written in **CoffeeScript** and **SASS** but you can change it to **Javascript** and **CSS**

The files are served with [BrowserSync](http://www.browsersync.io/) so if you want to change the server port, on `gulpfile.js` after line 36, inside BrowserSync configuration, add this line:

    port: 8080

And to compile all files and to serve them just run:

    gulp

## Deploy to GH-Pages

To deploy your project to GH-pages just run `gulp deploy`


