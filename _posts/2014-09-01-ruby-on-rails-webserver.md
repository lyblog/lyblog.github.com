---
layout: post
category: en
title: "Rails and Web Servers"
---

When we are developing a ruby on rails(RoR) app, we just need to start a pure ruby web server such as WEBrick. In production environment, we need a truly production-quality web server, for example, Apache. So, what is the relationship between a RoR app and a web server?

The basic logic is this. Apache is a http server. It handles http request from users. For a static website, we just need to install Apache, then to write html(css, javasript...) files. No database server or other is needed. If we want to serve dynamic content, a app is required. In this case, Apache receives requests from the Web and delivers requests to the backend app. After the app handles the request, it produces the result(html files) to the web server which in turn will be delivered to the user.

In term of rails, we need Phusion Passenger, which is ingegrated into Apache as a module. To load this module, add the following lines to the Apache configure file:

    LoadModule passenger_module .../passenger-4.0.50/buildout/apache2/mod_passenger.so
    <IfModule mod_passenger.c>
        PassengerRoot .../.rvm/gems/ruby-2.1.2/gems/passenger-4.0.50
        PassengerDefaultRuby .../.rvm/gems/ruby-2.1.2/wrappers/ruby
    </IfModule>
	
To add a virtual host for your website, add the following lines to you Apache configure file:

    <VirtualHost *:80>
         ServerName depot.yourhost.com
         DocumentRoot /home/ruby/depot/public/
         <Directory /home/ruby/depot/public>
              Options FollowSymLinks
              AllowOverride None
              Options -MultiViews
              Order allow,deny
              Allow from all
              Require all granted
         </Directory>
         RailsBaseURI /
    </VirtualHost>

