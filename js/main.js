MathJax.Hub.Config({
    extensions: ["tex2jax.js","AMSmath.js", "AMSsymbols.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {                                                        
        inlineMath: [ ['$','$'], ["\\(","\\)"] ],
        displayMath: [ ['$$','$$'], ["\\[","\\]"] ],                          
        processEscapes: true                                              
    },         
    "HTML-CSS": { availableFonts: ["TeX"] } 
});              
MathJax.Hub.Config({
    TeX: { equationNumbers: { autoNumber: "AMS" } }
});

