---
layout: post
category: en
title: "Install Nvidia Driver on Debian Wheezy"
---

Recently I switched from Ubuntu 12.10 to Debian 7.0 Wheezy for my laptop. I've used Ubuntu for more than 2 years. It's good. Perhaps I'm just a little tired of it and want to try something new. When Debian 7.0 was released, I tried it, found it's ... so beautiful (with Gnome 3). Compared with Wheezy, Ubuntu Dash is terrible now. I deleted Ubuntu and installed Debian.

The transition is smooth, except for some problems:

* Dual monitors work improperly. I have a big monitor. After a fresh install, I can't set the right resolution. Even worse, debian will crash if I try to set a higher resolution. 
* Xorg takes high memory usage when Iceweasel's memory is high, see [1].

I got a solution from ref [1] --- install the non-free Nvidia driver. It's simple.

First, add "contrib" and "non-free" components to `/etc/apt/sources.list`. The initial `/etc/apt/sources.list` was like this:

    deb http://debian.ustc.edu.cn/debian/ wheezy main
	deb-src http://debian.ustc.edu.cn/debian/ wheezy main
	deb http://debian.ustc.edu.cn/debian/ wheezy-updates main
	deb-src http://debian.ustc.edu.cn/debian/ wheezy-updates main

What was expected (because nvidia driver is not free):

    deb http://debian.ustc.edu.cn/debian/ wheezy main non-free contrib
	deb-src http://debian.ustc.edu.cn/debian/ wheezy main non-free contrib
	deb http://debian.ustc.edu.cn/debian/ wheezy-updates main non-free contrib
	deb-src http://debian.ustc.edu.cn/debian/ wheezy-updates main non-free contrib

My Nvidia graphics processing unit(GPU) series/codename of an installed video card can be identified using the lspci command:

    $ lspci -nn | grep VGA
	01:00.0 VGA compatible controller [0300]: NVIDIA Corporation G98M [GeForce G105M] 
	[10de:0a69] (rev a2)

GeForce G105M is among the supported devices of Version 304.88, see [2].

Second, update the list of available packages. Install the appropriate linux-headers and kernel module packages:

    $ sudo aptitude update
    $ sudo aptitude -r install linux-headers-$(uname -r|sed 's,[^-]*-[^-]*-,,') \
	nvidia-kernel-dkms

This will also install the recommended [nvidia-glx](http://packages.debian.org/wheezy/nvidia-glx) package.

Third, create an Xorg server configuration file `/etc/X11/xorg.conf.d/20-nvidia.conf`:

    Section "Device"
        Identifier     "My GPU"
        Driver         "nvidia"
    EndSection

Note: this file and the xorg.conf.d directory do not exist. At first I forgot to create this file, only to find that I can't start X any more. :-(

Last, restart the system. 

Now I can see the Nvidia Logo on boot up screen. I successsful got two monitors work perfectly. The Xorg memory usage also drops to a normal degree.


References:

[1] [Xorg high memory usage](http://lists.debian.org/debian-user/2013/05/msg01399.html)

[2] [Appendix A. Supported NVIDIA GPU Products](http://us.download.nvidia.com/XFree86/Linux-x86/304.88/README/supportedchip)

[3] [NvidiaGraphicsDrivers](http://wiki.debian.org/NvidiaGraphicsDrivers) -- Debian wiki
