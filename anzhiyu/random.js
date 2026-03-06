var posts=["2025/09/03/AI/java接入大模型/","2025/09/20/AI/鱼皮的AI/","2025/09/20/AI/鱼皮的AI流程/","2025/06/24/Git/git/","2026/01/15/Git/鱼皮的git/","2025/06/24/JAVASE/File/","2025/06/24/JAVASE/String的常用方法/","2025/06/24/JAVASE/interface/","2025/06/24/JAVASE/io流/","2025/06/24/JAVASE/反射/","2025/06/24/JAVASE/多线程/","2025/06/24/JAVASE/容器/","2025/06/24/JAVASE/日期API/","2025/06/24/JAVASE/正则表达式/","2025/06/24/JAVASE/泛型/","2026/01/15/JAVASE/鱼皮的设计模式/","2025/06/24/JAVASE/网络编程/","2025/06/21/JDBC/JDBC/","2026/01/15/JUC_JVM/JUC/","2025/06/24/JavaWeb/Ajax中JavaScript部分/","2026/01/15/JUC_JVM/JVM/","2025/06/24/JavaWeb/Ajax中Java部分/","2025/06/24/JavaWeb/Servlet/","2025/06/24/JavaWeb/javaweb/","2025/06/24/JavaWeb/jsp/","2025/06/24/JavaWeb/xml配置文件/","2025/06/24/Linux/Linux/","2025/06/24/Linux/压缩与解压/","2025/06/24/Linux/文本编辑器中的关键字/","2025/06/24/Lombok/Lombok/","2025/06/25/Maven/Maven常用命令/","2025/06/25/Maven/Maven常用插件/","2025/06/25/Maven/Maven私服/","2025/06/25/Maven/pom文件配置/","2025/06/25/Maven/setting配置文件/","2025/06/25/Mybatis/Mybatis/","2025/06/25/Mybatis/Mybatis中sql标签/","2025/06/25/Mybatis/Mybatis日志处理/","2025/06/25/Mybatis/Mybatis注解/","2025/06/25/Mybatis/Mybatis缓存/","2025/06/25/Mybatis/分页插件PageHelper/","2025/06/25/Mybatis/Mybatis配置文件/","2025/08/17/Mybatis-plus/Mybatis-plus/","2025/06/25/Spring/AspectJ框架/","2025/06/25/Nginx/nginx/","2025/06/25/Spring/Spring/","2025/06/25/Spring/SpringAOP/","2025/06/25/Spring/SpringIOC/","2025/06/27/Spring/Spring注解/","2025/06/25/Spring/context标签/","2025/06/25/Spring/junit注解/","2025/06/25/Spring/事务接口/","2025/06/25/Spring/断言/","2025/06/25/Spring/配置文件/","2025/06/25/SpringBoot/Thymleaf/","2025/06/25/SpringBoot/application配置文件/","2025/06/25/SpringBoot/健康监测/","2025/06/25/SpringBoot/关于数据校验(Vilidate)/","2025/06/25/SpringBoot/关于SpringBoot/","2025/08/08/SpringBoot/日志框架/","2025/06/24/UI设计/html/","2025/07/16/UI设计/css/","2025/07/18/UI设计/js/","2025/06/25/SpringMVC/MVC重要组件/","2025/06/25/SpringMVC/MVC命名空间/","2025/06/25/SpringMVC/Restful/","2025/06/25/SpringMVC/SSM框架整合配置/","2025/06/25/SpringMVC/SpringMVC/","2025/06/25/SpringMVC/SpringMVC注解/","2025/07/31/SpringMVC/web配置文件/","2025/06/11/algorithm/Dijkstra/","2025/06/11/algorithm/KMP/","2025/06/11/algorithm/Kruskal/","2025/06/11/algorithm/Manacher/","2025/06/11/algorithm/floyd/","2025/06/10/algorithm/hash/","2025/06/11/algorithm/lca/","2025/06/11/algorithm/spfa/","2025/06/11/algorithm/st/","2025/06/03/algorithm/xds/","2025/10/12/docker/docker/","2025/08/15/redis/maven依赖/","2025/08/14/redis/redis/","2026/03/06/偶遇的各种问题/telegram登录问题-短信验证/","2025/08/15/redis/redis配置文件解析/","2025/09/10/关于前端/ECMA6Script/","2025/09/14/关于前端/TypeScript/","2025/09/11/关于前端/node-js/","2025/09/10/关于前端/vue/","2026/01/19/其他内容/其他/","2026/01/05/关于MQ/RabbitMQ/","2026/02/08/其他内容/问题集/","2025/08/19/其他内容/汇总/","2025/08/17/其他软件/Knife4j/","2025/08/16/其他软件/minio/","2025/06/25/分布式存储/关于分布式存储/","2025/09/29/微服务/SpringCloud/","2025/06/24/数据库/Mysql/","2025/06/24/数据库/Oracle/","2025/06/24/数据库/Oracle的导入和导出/","2025/06/24/数据库/Sql/","2026/01/05/英语/二十六字母发音/","2026/01/05/英语/十八条发音规则/","2026/01/05/英语/四十八个音标/","2026/01/05/英语/字母发音规则/","2026/01/05/英语/清辅音浊化现象/","2026/01/05/英语/词根词缀/","2025/10/13/项目/oj判题系统/","2026/01/05/英语/辅音分类/","2026/01/05/英语/音节/","2025/09/20/面试题/频繁重要面试题/","2026/01/23/项目/商品甄选/","2026/01/16/面试题/概念/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"tokenblog","link":"https://tokenblog.cn","avatar":"/images/core.jpg","descr":"让自己简单点","siteshot":"/images/core.jpg"},{"name":"Mortal红尘","desc":"积跬步以至千里，致敬每个爱学习的你。","avatar":"https://mortal-blogs.vercel.app/img/EB-core.png","link":"https://mortal-blogs.vercel.app/"},{"name":"陆小启","desc":"往者不谏，来者可追。","avatar":"https://bu.dusays.com/2025/03/14/67d3fbedaa1c6.webp# 头像","link":"https://blog.luxq.space"}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };