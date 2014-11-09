---
layout: default
category: zh
title: "在jekyll中使用LaTeX"
---

终于搞定$\LaTeX$，要做的事情极其简单，但是走了不少弯路，看到几篇文章（见末尾参考资料）讲的都不全。我的博客使用[Jekyll-Bootstrap](http://jekyllbootstrap.com/),在此基础上我改了首页，google analysis和评论。其余都是用默认的[配置](https://github.com/plusjade/jekyll-bootstrap/blob/master/_config.yml). 

### 修改配置 ###
为了增加$\LaTeX$支持，我修改了两个文件：`/_config`和`/_includes/themes/twitter/default.html`.

一、 在`/_config`添加如下语句：

    markdown: kramdown
    kramdown:
      auto_ids: true,
      footnote_nr: 1
      entity_output: as_char
      toc_levels: 1..6
      use_coderay: false

二、 在`/_includes/themes/twitter/default.html`的<head></head>之间添加如下javascript代码(mathjax):

    <!-- mathjax config similar to math.stackexchange -->
    <script type="text/x-mathjax-config"> 
      MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [ ['$','$'], ["\\(","\\)"] ],
          processEscapes: true
        }
      });
    </script>
    <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
          tex2jax: {
            skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
          }
        });
    </script>
    <script type="text/x-mathjax-config">
        MathJax.Hub.Queue(function() {
            var all = MathJax.Hub.getAllJax(), i;
            for(i=0; i < all.length; i += 1) {
                all[i].SourceElement().parentNode.className += ' has-jax';
            }
        });
    </script>
    <script type="text/javascript"
       src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    
### 插入公式及效果 ###
以后只要在markdown文件中使用`$$...$$`就可以插入行间公式，使用`$...$`就可以插入行间公式了

来个复杂一点的公式(来自The LaTeX Companion)

    $$
    \begin{equation}
    \begin{split}
    |I_2|
      &=\left| \int_{0}^T \psi(t)
          \left\{ u(a,t)-\int_{\gamma(t)}^a \frac{d\theta}{k(\theta,t)}
              \int_{a}^\theta c(\xi)u_t(\xi,t)\,d\xi \right\} dt
        \right| \\
      &\le C_6 \left| \left|
                f\int_\Omega
                  \left| \widetilde{S}^{-1,0}_{a,-} W_2(\Omega,\Gamma_l)
                   \right|
                \right|
                \left|
                    |u|\overset{\circ}\to W_2^{\widetilde{A}}
                    (\Omega;\Gamma_r,T)
             \right| \right|.
    \end{split}
    \end{equation}
    $$

显示如下：

$$
\begin{equation}
\begin{split}
|I_2|
&=\left| \int_{0}^T \psi(t)
\left\{ u(a,t)-\int_{\gamma(t)}^a \frac{d\theta}{k(\theta,t)}
\int_{a}^\theta c(\xi)u_t(\xi,t)\,d\xi \right\} dt
\right| \\
&\le C_6 \left| \left|
f\int_\Omega
\left| \widetilde{S}^{-1,0}_{a,-} W_2(\Omega,\Gamma_l)
\right|
\right|
\left|
|u|\overset{\circ}\to W_2^{\widetilde{A}}
(\Omega;\Gamma_r,T)
\right| \right|.
\end{split}
\end{equation}
$$

行间公式`$(xˆm)ˆn=xˆ{mn}$`显示效果：$(x^m)^n=x^{mn}$. 很漂亮吧。

### 一点解释 ###

修改`/_config`的目的是将markdown引擎改为kramdown，jekyll默认使用maruku作为markdown引擎，参见`https://github.com/mojombo/jekyll/wiki/Configuration`. 如果要在本地查看博客，首先要安装kramdown，使用命令`sudo gem install kramdown`即可安装(ubuntu系统)。在本地运行`jekyll --server`。如果不修改配置文件也可以使用kramdown，运行命令`jekyll --kramdown --server`，可见，`_config`的作用就是提供给命令`jekyll`各种选项，不用自己手动输入了。上传到github上后，github的jekyll程序会处理你的markdown文件生成整个网站。

修改`/_includes/themes/twitter/default.html`，也就是修改了jekyll用来生成博客的模板，最终每一篇文章中都含有mathjax的这几个脚本，我们用浏览器访问网站时可以运行这些脚本生成公式。（对，公式是由浏览器生成的，并不是图片）

参考：

- [在Octopress中使用LaTeX](http://yanping.me/cn/blog/2012/03/10/octopress-with-latex/)
- [Latex with MathJax in Jekyll](http://brucebot.com/2012/07/latex-with-mathjax-in-jekyll/)
- [LaTeX Math Magic](http://cwoebker.com/posts/latex-math-magic)

它们的缺点是都没有说要修改配置文件`/_config`, 第二篇甚至错了，浪费了我不少时间。第三篇使用的是另外一个markdown引擎rdiscount，我没试过。
