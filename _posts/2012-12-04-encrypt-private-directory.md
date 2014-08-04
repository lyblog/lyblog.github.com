---
layout: post
category: zh
title: "重要文件和目录加密"
---

## 背景 ##

现在对电脑和网络的依赖越来越大，安全意识也增强了。我的经历:

<ol>
<li>Windows->Linux.</li>
<li>用同一个密码网站登陆绝大多数网站->密码前半部分用网站名后半部分固定->使用随机密码，将密码保存在邮箱内.</li>
<li>在浏览器上保存密码->浏览器保存密码master password</li>
<li>开启 gmail 两步认证</li>
<li>在电脑上明文存储私钥，日记等加密所有私密文件</li>
</ol>

前4步之前完成了

## 当前问题 ##

在加密私密文件前，由于浏览器使用了master password，不怕保存的密码被人看到，如果要在本地查看保存的密码，需要输入master password。有天看到一篇文章[Firefox – How to retrieve and decrypt stored passwords](http://www.coresec.org/2011/03/06/firefox-how-to-retrieve-and-decrypt-stored-password/),可以通过拷贝本地一份保存密码的数据库文件signons.sqlite到其他机器上，再在那台机器里查看保存的密码，因此总还是不那么安全。

另外我的.ssh/, .gnupg/, .fetchmailrc也是明文储存的，前两个目录包含我的私钥，.fetchmailrc文件包含我gmail的一个application-specific密码。都需要加密。

## 解决方法 ##

**安装 ecryptfs-utils.**

	sudo apt-get install ecryptfs-utils 

**设置私有目录**

	$ ecryptfs-setup-private 
	Enter your login passphrase [longyb]: 
	Enter your mount passphrase [leave blank to generate one]: 
	Enter your mount passphrase (again): 

    ************************************************************************
	YOU SHOULD RECORD YOUR MOUNT PASSPHRASE AND STORE IT IN A SAFE LOCATION.
	ecryptfs-unwrap-passphrase ~/.ecryptfs/wrapped-passphrase
	THIS WILL BE REQUIRED IF YOU NEED TO RECOVER YOUR DATA AT A LATER TIME.
	************************************************************************
	.....

**重新登陆，转移文件**

   重新登陆，主目录下多出了~/Private文件夹，运行ecryptfs-mount-private命令挂在加密的目录，将需要加密的文件转移到~/Private内，搞定。
   
   以后每次登陆都需要运行ecryptfs-mount-private命令来挂载加密目录。
   
## 有多安全？ ##

  加密目录主要是防止攻击者直接接触我的物理电脑（比如电脑被偷），尽管他不知道我的系统登陆密码，他可以通过Live USB或CD挂载我的硬盘，查看私密数据。现在数据是以加密的方式储存，攻击者没有密码无法打开文件。

  加密的数据全部放在~/.Private目录下，我可以将其打包，备份到网盘上，既safe又secure。如果硬盘坏了，我可以从万盘上下载，在另一台ubuntu机器上运行ecryptfs-recover-private命令来恢复数据。

  我要做的就是使用一个长长的密码，让攻击者暴力解密数据几乎不可能 :-)
