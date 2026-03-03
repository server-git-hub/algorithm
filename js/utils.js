const anzhiyu = {
	debounce: (func, wait = 0, immediate = false) => {
		let timeout;
		return (...args) => {
			const later = () => {
				timeout = null;
				if (!immediate) func(...args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func(...args);
		};
	},

	throttle: function (func, wait, options = {}) {
		let timeout, context, args;
		let previous = 0;

		const later = () => {
			previous = options.leading === false ? 0 : new Date().getTime();
			timeout = null;
			func.apply(context, args);
			if (!timeout) context = args = null;
		};

		const throttled = (...params) => {
			const now = new Date().getTime();
			if (!previous && options.leading === false) previous = now;
			const remaining = wait - (now - previous);
			context = this;
			args = params;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				func.apply(context, args);
				if (!timeout) context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
		};

		return throttled;
	},

	sidebarPaddingR: () => {
		const innerWidth = window.innerWidth;
		const clientWidth = document.body.clientWidth;
		const paddingRight = innerWidth - clientWidth;
		if (innerWidth !== clientWidth) {
			document.body.style.paddingRight = paddingRight + "px";
		}
	},

	snackbarShow: (text, showActionFunction = false, duration = 2000, actionText = false) => {
		const { position, bgLight, bgDark } = GLOBAL_CONFIG.Snackbar;
		const bg = document.documentElement.getAttribute("data-theme") === "light" ? bgLight : bgDark;
		const root = document.querySelector(":root");
		root.style.setProperty("--anzhiyu-snackbar-time", duration + "ms");

		Snackbar.show({
			text: text,
			backgroundColor: bg,
			onActionClick: showActionFunction,
			actionText: actionText,
			showAction: actionText,
			duration: duration,
			pos: position,
			customClass: "snackbar-css",
		});
	},

	loadComment: (dom, callback) => {
		if ("IntersectionObserver" in window) {
			const observerItem = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						callback();
						observerItem.disconnect();
					}
				},
				{ threshold: [0] }
			);
			observerItem.observe(dom);
		} else {
			callback();
		}
	},

	scrollToDest: (pos, time = 500) => {
		const currentPos = window.pageYOffset;
		if ("scrollBehavior" in document.documentElement.style) {
			window.scrollTo({
				top: pos,
				behavior: "smooth",
			});
			return;
		}

		let start = null;
		pos = +pos;
		window.requestAnimationFrame(function step(currentTime) {
			start = !start ? currentTime : start;
			const progress = currentTime - start;
			if (currentPos < pos) {
				window.scrollTo(0, ((pos - currentPos) * progress) / time + currentPos);
			} else {
				window.scrollTo(0, currentPos - ((currentPos - pos) * progress) / time);
			}
			if (progress < time) {
				window.requestAnimationFrame(step);
			} else {
				window.scrollTo(0, pos);
			}
		});
	},

	initJustifiedGallery: function (selector) {
		const runJustifiedGallery = (i) => {
			if (!anzhiyu.isHidden(i)) {
				fjGallery(i, {
					itemSelector: ".fj-gallery-item",
					rowHeight: i.getAttribute("data-rowHeight"),
					gutter: 4,
					onJustify: function () {
						this.$container.style.opacity = "1";
					},
				});
			}
		};

		if (Array.from(selector).length === 0) runJustifiedGallery(selector);
		else
			selector.forEach((i) => {
				runJustifiedGallery(i);
			});
	},

	animateIn: (ele, text) => {
		ele.style.display = "block";
		ele.style.animation = text;
	},

	animateOut: (ele, text) => {
		ele.addEventListener("animationend", function f() {
			ele.style.display = "";
			ele.style.animation = "";
			ele.removeEventListener("animationend", f);
		});
		ele.style.animation = text;
	},

	/**
	 * @param {*} selector
	 * @param {*} eleType the type of create element
	 * @param {*} options object key: value
	 */
	wrap: (selector, eleType, options) => {
		const creatEle = document.createElement(eleType);
		for (const [key, value] of Object.entries(options)) {
			creatEle.setAttribute(key, value);
		}
		selector.parentNode.insertBefore(creatEle, selector);
		creatEle.appendChild(selector);
	},

	isHidden: (ele) => ele.offsetHeight === 0 && ele.offsetWidth === 0,

	getEleTop: (ele) => {
		let actualTop = ele.offsetTop;
		let current = ele.offsetParent;

		while (current !== null) {
			actualTop += current.offsetTop;
			current = current.offsetParent;
		}

		return actualTop;
	},

	loadLightbox: (ele) => {
		const service = GLOBAL_CONFIG.lightbox;

		if (service === "mediumZoom") {
			const zoom = mediumZoom(ele);
			zoom.on("open", (e) => {
				const photoBg = document.documentElement.getAttribute("data-theme") === "dark" ? "#121212" : "#fff";
				zoom.update({
					background: photoBg,
				});
			});
		}

		if (service === "fancybox") {
			Array.from(ele).forEach((i) => {
				if (i.parentNode.tagName !== "A") {
					const dataSrc = i.dataset.lazySrc || i.src;
					const dataCaption = i.title || i.alt || "";
					anzhiyu.wrap(i, "a", {
						href: dataSrc,
						"data-fancybox": "gallery",
						"data-caption": dataCaption,
						"data-thumb": dataSrc,
					});
				}
			});

			if (!window.fancyboxRun) {
				Fancybox.bind("[data-fancybox]", {
					Hash: false,
					Thumbs: {
						autoStart: false,
					},
				});
				window.fancyboxRun = true;
			}
		}
	},

	setLoading: {
		add: (ele) => {
			const html = `
        <div class="loading-container">
          <div class="loading-item">
            <div></div><div></div><div></div><div></div><div></div>
          </div>
        </div>
      `;
			ele.insertAdjacentHTML("afterend", html);
		},
		remove: (ele) => {
			ele.nextElementSibling.remove();
		},
	},

	updateAnchor: (anchor) => {
		if (anchor !== window.location.hash) {
			if (!anchor) anchor = location.pathname;
			const title = GLOBAL_CONFIG_SITE.title;
			window.history.replaceState(
				{
					url: location.href,
					title,
				},
				title,
				anchor
			);
		}
	},

	getScrollPercent: (currentTop, ele) => {
		const docHeight = ele.clientHeight;
		const winHeight = document.documentElement.clientHeight;
		const headerHeight = ele.offsetTop;
		const contentMath = docHeight > winHeight ? docHeight - winHeight : document.documentElement.scrollHeight - winHeight;
		const scrollPercent = (currentTop - headerHeight) / contentMath;
		const scrollPercentRounded = Math.round(scrollPercent * 100);
		const percentage = scrollPercentRounded > 100 ? 100 : scrollPercentRounded <= 0 ? 0 : scrollPercentRounded;
		return percentage;
	},

	addGlobalFn: (key, fn, name = false, parent = window) => {
		const globalFn = parent.globalFn || {};
		const keyObj = globalFn[key] || {};

		if (name && keyObj[name]) return;

		name = name || Object.keys(keyObj).length;
		keyObj[name] = fn;
		globalFn[key] = keyObj;
		parent.globalFn = globalFn;
	},

	addEventListenerPjax: (ele, event, fn, option = false) => {
		ele.addEventListener(event, fn, option);
		anzhiyu.addGlobalFn("pjax", () => {
			ele.removeEventListener(event, fn, option);
		});
	},

	removeGlobalFnEvent: (key, parent = window) => {
		const { globalFn = {} } = parent;
		const keyObj = globalFn[key] || {};
		const keyArr = Object.keys(keyObj);
		if (!keyArr.length) return;
		keyArr.forEach((i) => {
			keyObj[i]();
		});
		delete parent.globalFn[key];
	},

	//更改主题色
	changeThemeMetaColor: function (color) {
		// console.info(`%c ${color}`, `font-size:36px;color:${color};`);
		if (themeColorMeta !== null) {
			themeColorMeta.setAttribute("content", color);
		}
	},

	//顶栏自适应主题色
	initThemeColor: function () {
		let themeColor = getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-bar-background").trim().replace('"', "").replace('"', "");
		const currentTop = window.scrollY || document.documentElement.scrollTop;
		if (currentTop > 26) {
			if (anzhiyu.is_Post()) {
				themeColor = getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-meta-theme-post-color").trim().replace('"', "").replace('"', "");
			}
			if (themeColorMeta.getAttribute("content") === themeColor) return;
			this.changeThemeMetaColor(themeColor);
		} else {
			if (themeColorMeta.getAttribute("content") === themeColor) return;
			this.changeThemeMetaColor(themeColor);
		}
	},
	//是否是文章页
	is_Post: function () {
		var url = window.location.href; //获取url
		if (url.indexOf("/posts/") >= 0) {
			//判断url地址中是否包含code字符串
			return true;
		} else {
			return false;
		}
	},
	//监测是否在页面开头
	addNavBackgroundInit: function () {
		var scrollTop = 0,
			bodyScrollTop = 0,
			documentScrollTop = 0;
		if ($bodyWrap) {
			bodyScrollTop = $bodyWrap.scrollTop;
		}
		if (document.documentElement) {
			documentScrollTop = document.documentElement.scrollTop;
		}
		scrollTop = bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;

		if (scrollTop != 0) {
			pageHeaderEl.classList.add("nav-fixed");
			pageHeaderEl.classList.add("nav-visible");
		}
	},
	// 下载图片
	downloadImage: function (imgsrc, name) {
		//下载图片地址和图片名
		rm.hideRightMenu();
		if (rm.downloadimging == false) {
			rm.downloadimging = true;
			anzhiyu.snackbarShow("正在下载中，请稍后", false, 10000);
			setTimeout(function () {
				let image = new Image();
				// 解决跨域 Canvas 污染问题
				image.setAttribute("crossOrigin", "anonymous");
				image.onload = function () {
					let canvas = document.createElement("canvas");
					canvas.width = image.width;
					canvas.height = image.height;
					let context = canvas.getContext("2d");
					context.drawImage(image, 0, 0, image.width, image.height);
					let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
					let a = document.createElement("a"); // 生成一个a元素
					let event = new MouseEvent("click"); // 创建一个单击事件
					a.download = name || "photo"; // 设置图片名称
					a.href = url; // 将生成的URL设置为a.href属性
					a.dispatchEvent(event); // 触发a的单击事件
				};
				image.src = imgsrc;
				anzhiyu.snackbarShow("图片已添加盲水印，请遵守版权协议");
				rm.downloadimging = false;
			}, "10000");
		} else {
			anzhiyu.snackbarShow("有正在进行中的下载，请稍后再试");
		}
	},
	//禁止图片右键单击
	stopImgRightDrag: function () {
		var img = document.getElementsByTagName("img");
		for (var i = 0; i < img.length; i++) {
			img[i].addEventListener("dragstart", function () {
				return false;
			});
		}
	},
	//滚动到指定id
	scrollTo: function (id) {
		var domTop = document.querySelector(id).offsetTop;
		window.scrollTo(0, domTop - 80);
	},
	//隐藏侧边栏
	hideAsideBtn: () => {
		// Hide aside
		const $htmlDom = document.documentElement.classList;
		$htmlDom.contains("hide-aside") ? saveToLocal.set("aside-status", "show", 2) : saveToLocal.set("aside-status", "hide", 2);
		$htmlDom.toggle("hide-aside");
		$htmlDom.contains("hide-aside")
			? document.querySelector("#consoleHideAside").classList.add("on")
			: document.querySelector("#consoleHideAside").classList.remove("on");
	},
	// 热评切换
	switchCommentBarrage: function () {
		let commentBarrage = document.querySelector(".comment-barrage");
		if (commentBarrage) {
			if (window.getComputedStyle(commentBarrage).display === "flex") {
				commentBarrage.style.display = "none";
				anzhiyu.snackbarShow("✨ 已关闭评论弹幕");
				document.querySelector(".menu-commentBarrage-text").textContent = "显示热评";
				document.querySelector("#consoleCommentBarrage").classList.remove("on");
				localStorage.setItem("commentBarrageSwitch", "false");
			} else {
				commentBarrage.style.display = "flex";
				document.querySelector(".menu-commentBarrage-text").textContent = "关闭热评";
				document.querySelector("#consoleCommentBarrage").classList.add("on");
				anzhiyu.snackbarShow("✨ 已开启评论弹幕");
				localStorage.removeItem("commentBarrageSwitch");
			}
		}
		rm && rm.hideRightMenu();
	},
	initPaginationObserver: () => {
		const commentElement = document.getElementById("post-comment");
		const paginationElement = document.getElementById("pagination");

		if (commentElement && paginationElement) {
			new IntersectionObserver((entries) => {
				const commentBarrage = document.querySelector(".comment-barrage");

				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						paginationElement.classList.add("show-window");
						if (commentBarrage) {
							commentBarrage.style.bottom = "-200px";
						}
					} else {
						paginationElement.classList.remove("show-window");
						if (commentBarrage) {
							commentBarrage.style.bottom = "0px";
						}
					}
				});
			}).observe(commentElement);
		}
	},
	// 初始化即刻
	initIndexEssay: function () {
		if (!document.getElementById("bbTimeList")) return;
		setTimeout(() => {
			let essay_bar_swiper = new Swiper(".essay_bar_swiper_container", {
				passiveListeners: true,
				direction: "vertical",
				loop: true,
				autoplay: {
					disableOnInteraction: true,
					delay: 3000,
				},
				mousewheel: true,
			});

			let essay_bar_comtainer = document.getElementById("bbtalk");
			if (essay_bar_comtainer !== null) {
				essay_bar_comtainer.onmouseenter = function () {
					essay_bar_swiper.autoplay.stop();
				};
				essay_bar_comtainer.onmouseleave = function () {
					essay_bar_swiper.autoplay.start();
				};
			}
		}, 100);
	},
	scrollByMouseWheel: function ($list, $target) {
		const scrollHandler = function (e) {
			$list.scrollLeft -= e.wheelDelta / 2;
			e.preventDefault();
		};
		$list.addEventListener("mousewheel", scrollHandler, { passive: false });
		if ($target) {
			$target.classList.add("selected");
			$list.scrollLeft = $target.offsetLeft - $list.offsetLeft - ($list.offsetWidth - $target.offsetWidth) / 2;
		}
	},
	// catalog激活
	catalogActive: function () {
		const $list = document.getElementById("catalog-list");
		if ($list) {
			const pathname = decodeURIComponent(window.location.pathname);
			const catalogListItems = $list.querySelectorAll(".catalog-list-item");

			let $catalog = null;
			catalogListItems.forEach((item) => {
				if (pathname.startsWith(item.id)) {
					$catalog = item;
					return;
				}
			});

			anzhiyu.scrollByMouseWheel($list, $catalog);
		}
	},
	// Page Tag 激活
	tagsPageActive: function () {
		const $list = document.getElementById("tag-page-tags");
		if ($list) {
			const $tagPageTags = document.getElementById(decodeURIComponent(window.location.pathname));
			anzhiyu.scrollByMouseWheel($list, $tagPageTags);
		}
	},
	// 修改时间显示"最近"
	diffDate: function (d, more = false, simple = false) {
		const dateNow = new Date();
		const datePost = new Date(d);
		const dateDiff = dateNow.getTime() - datePost.getTime();
		const minute = 1000 * 60;
		const hour = minute * 60;
		const day = hour * 24;
		const month = day * 30;

		let result;
		if (more) {
			const monthCount = dateDiff / month;
			const dayCount = dateDiff / day;
			const hourCount = dateDiff / hour;
			const minuteCount = dateDiff / minute;

			if (monthCount >= 1) {
				result = datePost.toLocaleDateString().replace(/\//g, "-");
			} else if (dayCount >= 1) {
				result = parseInt(dayCount) + " " + GLOBAL_CONFIG.date_suffix.day;
			} else if (hourCount >= 1) {
				result = parseInt(hourCount) + " " + GLOBAL_CONFIG.date_suffix.hour;
			} else if (minuteCount >= 1) {
				result = parseInt(minuteCount) + " " + GLOBAL_CONFIG.date_suffix.min;
			} else {
				result = GLOBAL_CONFIG.date_suffix.just;
			}
		} else if (simple) {
			const monthCount = dateDiff / month;
			const dayCount = dateDiff / day;
			const hourCount = dateDiff / hour;
			const minuteCount = dateDiff / minute;
			if (monthCount >= 1) {
				result = datePost.toLocaleDateString().replace(/\//g, "-");
			} else if (dayCount >= 1 && dayCount <= 3) {
				result = parseInt(dayCount) + " " + GLOBAL_CONFIG.date_suffix.day;
			} else if (dayCount > 3) {
				result = datePost.getMonth() + 1 + "/" + datePost.getDate();
			} else if (hourCount >= 1) {
				result = parseInt(hourCount) + " " + GLOBAL_CONFIG.date_suffix.hour;
			} else if (minuteCount >= 1) {
				result = parseInt(minuteCount) + " " + GLOBAL_CONFIG.date_suffix.min;
			} else {
				result = GLOBAL_CONFIG.date_suffix.just;
			}
		} else {
			result = parseInt(dateDiff / day);
		}
		return result;
	},

	// 修改即刻中的时间显示
	changeTimeInEssay: function () {
		document.querySelector("#bber") &&
			document.querySelectorAll("#bber time").forEach(function (e) {
				var t = e,
					datetime = t.getAttribute("datetime");
				(t.innerText = anzhiyu.diffDate(datetime, true)), (t.style.display = "inline");
			});
	},
	// 修改相册集中的时间
	changeTimeInAlbumDetail: function () {
		document.querySelector("#album_detail") &&
			document.querySelectorAll("#album_detail time").forEach(function (e) {
				var t = e,
					datetime = t.getAttribute("datetime");
				(t.innerText = anzhiyu.diffDate(datetime, true)), (t.style.display = "inline");
			});
	},
	// 刷新瀑布流
	reflashEssayWaterFall: function () {
		const waterfallEl = document.getElementById("waterfall");
		if (waterfallEl) {
			setTimeout(function () {
				waterfall(waterfallEl);
				waterfallEl.classList.add("show");
			}, 800);
		}
	},
	sayhi: function () {
		const $sayhiEl = document.getElementById("author-info__sayhi");

		const getTimeState = () => {
			const hour = new Date().getHours();
			let message = "";

			if (hour >= 0 && hour <= 5) {
				message = "睡个好觉，保证精力充沛";
			} else if (hour > 5 && hour <= 10) {
				message = "一日之计在于晨";
			} else if (hour > 10 && hour <= 14) {
				message = "吃饱了才有力气干活";
			} else if (hour > 14 && hour <= 18) {
				message = "集中精力，攻克难关";
			} else if (hour > 18 && hour <= 24) {
				message = "不要太劳累了，早睡更健康";
			}

			return message;
		};

		if ($sayhiEl) {
			$sayhiEl.innerHTML = getTimeState();
		}
	},

	// 友链注入预设评论
	addFriendLink() {
		var input = document.getElementsByClassName("el-textarea__inner")[0];
		if (!input) return;
		const evt = new Event("input", { cancelable: true, bubbles: true });
		const defaultPlaceholder =
			"昵称（请勿包含博客等字样）：\n网站地址（要求博客地址，请勿提交个人主页）：\n头像图片url（请提供尽可能清晰的图片）：\n描述：\n站点截图（可选）：\n";
		input.value = this.getConfigIfPresent(GLOBAL_CONFIG.linkPageTop, "addFriendPlaceholder", defaultPlaceholder);
		input.dispatchEvent(evt);
		input.focus();
		input.setSelectionRange(-1, -1);
	},
	// 获取配置，如果为空则返回默认值
	getConfigIfPresent: function (config, configKey, defaultValue) {
		if (!config) return defaultValue;
		if (!config.hasOwnProperty(configKey)) return defaultValue;
		if (!config[configKey]) return defaultValue;
		return config[configKey];
	},
	//切换音乐播放状态
	musicToggle: function (changePaly = true) {
		if (!anzhiyu_musicFirst) {
			anzhiyu.musicBindEvent();
			anzhiyu_musicFirst = true;
		}
		let msgPlay = '<i class="anzhiyufont anzhiyu-icon-play"></i><span>播放音乐</span>';
		let msgPause = '<i class="anzhiyufont anzhiyu-icon-pause"></i><span>暂停音乐</span>';
		if (anzhiyu_musicPlaying) {
			navMusicEl.classList.remove("playing");
			document.getElementById("menu-music-toggle").innerHTML = msgPlay;
			document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停";
			document.querySelector("#consoleMusic").classList.remove("on");
			anzhiyu_musicPlaying = false;
			navMusicEl.classList.remove("stretch");
		} else {
			navMusicEl.classList.add("playing");
			document.getElementById("menu-music-toggle").innerHTML = msgPause;
			document.querySelector("#consoleMusic").classList.add("on");
			anzhiyu_musicPlaying = true;
			navMusicEl.classList.add("stretch");
		}
		if (changePaly) document.querySelector("#nav-music meting-js").aplayer.toggle();
		rm && rm.hideRightMenu();
	},
	// 音乐伸缩
	musicTelescopic: function () {
		if (navMusicEl.classList.contains("stretch")) {
			navMusicEl.classList.remove("stretch");
		} else {
			navMusicEl.classList.add("stretch");
		}
	},

	//音乐上一曲
	musicSkipBack: function () {
		navMusicEl.querySelector("meting-js").aplayer.skipBack();
		rm && rm.hideRightMenu();
	},

	//音乐下一曲
	musicSkipForward: function () {
		navMusicEl.querySelector("meting-js").aplayer.skipForward();
		rm && rm.hideRightMenu();
	},

	//获取音乐中的名称
	musicGetName: function () {
		var x = document.querySelectorAll(".aplayer-title");
		var arr = [];
		for (var i = x.length - 1; i >= 0; i--) {
			arr[i] = x[i].innerText;
		}
		return arr[0];
	},

	//初始化console图标
	initConsoleState: function () {
		//初始化隐藏边栏
		const $htmlDomClassList = document.documentElement.classList;
		$htmlDomClassList.contains("hide-aside")
			? document.querySelector("#consoleHideAside").classList.add("on")
			: document.querySelector("#consoleHideAside").classList.remove("on");
	},

	// 显示打赏中控台
	rewardShowConsole: function () {
		// 判断是否为赞赏打开控制台
		consoleEl.classList.add("reward-show");
		anzhiyu.initConsoleState();
	},
	// 显示中控台
	showConsole: function () {
		consoleEl.classList.add("show");
		anzhiyu.initConsoleState();
	},

	//隐藏中控台
	hideConsole: function () {
		if (consoleEl.classList.contains("show")) {
			// 如果是一般控制台，就关闭一般控制台
			consoleEl.classList.remove("show");
		} else if (consoleEl.classList.contains("reward-show")) {
			// 如果是打赏控制台，就关闭打赏控制台
			consoleEl.classList.remove("reward-show");
		}
		// 获取center-console元素
		const centerConsole = document.getElementById("center-console");

		// 检查center-console是否被选中
		if (centerConsole.checked) {
			// 取消选中状态
			centerConsole.checked = false;
		}
	},
	// 取消加载动画
	hideLoading: function () {
		document.getElementById("loading-box").classList.add("loaded");
	},
	// 将音乐缓存播放
	cacheAndPlayMusic() {
		let data = localStorage.getItem("musicData");
		if (data) {
			data = JSON.parse(data);
			const currentTime = new Date().getTime();
			if (currentTime - data.timestamp < 24 * 60 * 60 * 1000) {
				// 如果缓存的数据没有过期，直接使用
				anzhiyu.playMusic(data.songs);
				return;
			}
		}

		// 否则重新从服务器获取数据
		fetch("/json/music.json")
			.then((response) => response.json())
			.then((songs) => {
				const cacheData = {
					timestamp: new Date().getTime(),
					songs: songs,
				};
				localStorage.setItem("musicData", JSON.stringify(cacheData));
				anzhiyu.playMusic(songs);
			});
	},
	// 播放音乐
	playMusic(songs) {
		const anMusicPage = document.getElementById("anMusic-page");
		const metingAplayer = anMusicPage.querySelector("meting-js").aplayer;
		const randomIndex = Math.floor(Math.random() * songs.length);
		const randomSong = songs[randomIndex];
		const allAudios = metingAplayer.list.audios;
		if (!selectRandomSong.includes(randomSong.name)) {
			// 如果随机到的歌曲已经未被随机到过，就添加进metingAplayer.list
			metingAplayer.list.add([randomSong]);
			// 播放最后一首(因为是添加到了最后)
			metingAplayer.list.switch(allAudios.length);
			// 添加到已被随机的歌曲列表
			selectRandomSong.push(randomSong.name);
		} else {
			// 随机到的歌曲已经在播放列表中了
			// 直接继续随机直到随机到没有随机过的歌曲，如果全部随机过了就切换到对应的歌曲播放即可
			let songFound = false;
			while (!songFound) {
				const newRandomIndex = Math.floor(Math.random() * songs.length);
				const newRandomSong = songs[newRandomIndex];
				if (!selectRandomSong.includes(newRandomSong.name)) {
					metingAplayer.list.add([newRandomSong]);
					metingAplayer.list.switch(allAudios.length);
					selectRandomSong.push(newRandomSong.name);
					songFound = true;
				}
				// 如果全部歌曲都已被随机过，跳出循环
				if (selectRandomSong.length === songs.length) {
					break;
				}
			}
			if (!songFound) {
				// 如果全部歌曲都已被随机过，切换到对应的歌曲播放
				const palyMusicIndex = allAudios.findIndex((song) => song.name === randomSong.name);
				if (palyMusicIndex != -1) metingAplayer.list.switch(palyMusicIndex);
			}
		}

		console.info("已随机歌曲：", selectRandomSong, "本次随机歌曲：", randomSong.name);
	},
	// 音乐节目切换背景
	changeMusicBg: function (isChangeBg = true) {
		const anMusicBg = document.getElementById("an_music_bg");

		if (isChangeBg) {
			// player listswitch 会进入此处
			const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
			anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
		} else {
			// 第一次进入，绑定事件，改背景
			let timer = setInterval(() => {
				const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
				// 确保player加载完成
				if (musiccover) {
					clearInterval(timer);
					// 绑定事件
					anzhiyu.addEventListenerMusic();
					// 确保第一次能够正确替换背景
					anzhiyu.changeMusicBg();

					// 暂停nav的音乐
					if (document.querySelector("#nav-music meting-js").aplayer && !document.querySelector("#nav-music meting-js").aplayer.audio.paused) {
						anzhiyu.musicToggle();
					}
				}
			}, 100);
		}
	},
	// 获取自定义播放列表
	getCustomPlayList: function () {
		if (!window.location.pathname.startsWith("/music/")) {
			return;
		}
		const urlParams = new URLSearchParams(window.location.search);
		const userId = "8152976493";
		const userServer = "netease";
		const anMusicPageMeting = document.getElementById("anMusic-page-meting");
		if (urlParams.get("id") && urlParams.get("server")) {
			const id = urlParams.get("id");
			const server = urlParams.get("server");
			anMusicPageMeting.innerHTML = `<meting-js id="${id}" server=${server} type="playlist" type="playlist" mutex="true" preload="auto" theme="var(--anzhiyu-main)" order="list" list-max-height="calc(100vh - 169px)!important"></meting-js>`;
		} else {
			anMusicPageMeting.innerHTML = `<meting-js id="${userId}" server="${userServer}" type="playlist" mutex="true" preload="auto" theme="var(--anzhiyu-main)" order="list" list-max-height="calc(100vh - 169px)!important"></meting-js>`;
		}
		anzhiyu.changeMusicBg(false);
	},
	//隐藏今日推荐
	hideTodayCard: function () {
		if (document.getElementById("todayCard")) {
			document.getElementById("todayCard").classList.add("hide");
			const topGroup = document.querySelector(".topGroup");
			const recentPostItems = topGroup.querySelectorAll(".recent-post-item");
			recentPostItems.forEach((item) => {
				item.style.display = "flex";
			});
		}
	},

	// 监听音乐背景改变
	addEventListenerMusic: function () {
		const anMusicPage = document.getElementById("anMusic-page");
		const aplayerIconMenu = anMusicPage.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu");
		const anMusicBtnGetSong = anMusicPage.querySelector("#anMusicBtnGetSong");
		const anMusicRefreshBtn = anMusicPage.querySelector("#anMusicRefreshBtn");
		const anMusicSwitchingBtn = anMusicPage.querySelector("#anMusicSwitching");
		const metingAplayer = anMusicPage.querySelector("meting-js").aplayer;
		//初始化音量
		metingAplayer.volume(0.8, true);
		metingAplayer.on("loadeddata", function () {
			anzhiyu.changeMusicBg();
		});

		aplayerIconMenu.addEventListener("click", function () {
			document.getElementById("menu-mask").style.display = "block";
			document.getElementById("menu-mask").style.animation = "0.5s ease 0s 1 normal none running to_show";
			anMusicPage.querySelector(".aplayer.aplayer-withlist .aplayer-list").style.opacity = "1";
		});

		function anMusicPageMenuAask() {
			if (window.location.pathname != "/music/") {
				document.getElementById("menu-mask").removeEventListener("click", anMusicPageMenuAask);
				return;
			}

			anMusicPage.querySelector(".aplayer-list").classList.remove("aplayer-list-hide");
		}

		document.getElementById("menu-mask").addEventListener("click", anMusicPageMenuAask);

		// 监听增加单曲按钮
		anMusicBtnGetSong.addEventListener("click", () => {
			if (changeMusicListFlag) {
				const anMusicPage = document.getElementById("anMusic-page");
				const metingAplayer = anMusicPage.querySelector("meting-js").aplayer;
				const allAudios = metingAplayer.list.audios;
				const randomIndex = Math.floor(Math.random() * allAudios.length);
				// 随机播放一首
				metingAplayer.list.switch(randomIndex);
			} else {
				anzhiyu.cacheAndPlayMusic();
			}
		});
		anMusicRefreshBtn.addEventListener("click", () => {
			localStorage.removeItem("musicData");
			anzhiyu.snackbarShow("已移除相关缓存歌曲");
		});
		anMusicSwitchingBtn.addEventListener("click", () => {
			anzhiyu.changeMusicList();
		});

		// 默认加载的歌单
		if (GLOBAL_CONFIG.music_page_default === "custom") {
			anzhiyu.changeMusicList();
		}

		// 监听键盘事件
		//空格控制音乐
		document.addEventListener("keydown", function (event) {
			//暂停开启音乐
			if (event.code === "Space") {
				event.preventDefault();
				metingAplayer.toggle();
			}
			//切换下一曲
			if (event.keyCode === 39) {
				event.preventDefault();
				metingAplayer.skipForward();
			}
			//切换上一曲
			if (event.keyCode === 37) {
				event.preventDefault();
				metingAplayer.skipBack();
			}
			//增加音量
			if (event.keyCode === 38) {
				if (musicVolume <= 1) {
					musicVolume += 0.1;
					metingAplayer.volume(musicVolume, true);
				}
			}
			//减小音量
			if (event.keyCode === 40) {
				if (musicVolume >= 0) {
					musicVolume += -0.1;
					metingAplayer.volume(musicVolume, true);
				}
			}
		});
	},
	// 切换歌单
	changeMusicList: async function () {
		const anMusicPage = document.getElementById("anMusic-page");
		const metingAplayer = anMusicPage.querySelector("meting-js").aplayer;
		const currentTime = new Date().getTime();
		const cacheData = JSON.parse(localStorage.getItem("musicData")) || { timestamp: 0 };
		let songs = [];

		if (changeMusicListFlag) {
			songs = defaultPlayMusicList;
		} else {
			// 保存当前默认播放列表，以使下次可以切换回来
			defaultPlayMusicList = metingAplayer.list.audios;
			// 如果缓存的数据没有过期，直接使用
			if (currentTime - cacheData.timestamp < 24 * 60 * 60 * 1000) {
				songs = cacheData.songs;
			} else {
				// 否则重新从服务器获取数据
				const response = await fetch("/json/music.json");
				songs = await response.json();
				cacheData.timestamp = currentTime;
				cacheData.songs = songs;
				localStorage.setItem("musicData", JSON.stringify(cacheData));
			}
		}

		// 清除当前播放列表并添加新的歌曲
		metingAplayer.list.clear();
		metingAplayer.list.add(songs);

		// 切换标志位
		changeMusicListFlag = !changeMusicListFlag;
	},
	// 控制台音乐列表监听
	addEventListenerConsoleMusicList: function () {
		const navMusic = document.getElementById("nav-music");
		if (!navMusic) return;
		navMusic.addEventListener("click", (e) => {
			const aplayerList = navMusic.querySelector(".aplayer-list");
			const listBtn = navMusic.querySelector(
				"div.aplayer-info > div.aplayer-controller > div.aplayer-time.aplayer-time-narrow > button.aplayer-icon.aplayer-icon-menu svg"
			);
			if (e.target != listBtn && aplayerList.classList.contains("aplayer-list-hide")) {
				aplayerList.classList.remove("aplayer-list-hide");
			}
		});
	},
	// 监听按键
	toPage: function () {
		var toPageText = document.getElementById("toPageText"),
			toPageButton = document.getElementById("toPageButton"),
			pageNumbers = document.querySelectorAll(".page-number"),
			lastPageNumber = Number(pageNumbers[pageNumbers.length - 1].innerHTML),
			pageNumber = Number(toPageText.value);

		if (!isNaN(pageNumber) && pageNumber >= 1 && Number.isInteger(pageNumber)) {
			var url = "/page/" + (pageNumber > lastPageNumber ? lastPageNumber : pageNumber) + "/";
			toPageButton.href = pageNumber === 1 ? "/" : url;
		} else {
			toPageButton.href = "javascript:void(0);";
		}
	},

	//删除多余的class
	removeBodyPaceClass: function () {
		document.body.className = "pace-done";
	},
	// 修改body的type类型以适配css
	setValueToBodyType: function () {
		const input = document.getElementById("page-type"); // 获取input元素
		const value = input.value; // 获取input的value值
		document.body.dataset.type = value; // 将value值赋值到body的type属性上
	},
	//匿名评论
	addRandomCommentInfo: function () {
		// 从形容词数组中随机取一个值
		const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];

		// 从蔬菜水果动物名字数组中随机取一个值
		const randomName = vegetablesAndFruits[Math.floor(Math.random() * vegetablesAndFruits.length)];

		// 将两个值组合成一个字符串
		const name = `${randomAdjective}${randomName}`;

		function dr_js_autofill_commentinfos() {
			var lauthor = [
					"#author",
					"input[name='comname']",
					"#inpName",
					"input[name='author']",
					"#ds-dialog-name",
					"#name",
					"input[name='nick']",
					"#comment_author",
				],
				lmail = ["#mail", "#email", "input[name='commail']", "#inpEmail", "input[name='email']", "#ds-dialog-email", "input[name='mail']", "#comment_email"],
				lurl = [
					"#url",
					"input[name='comurl']",
					"#inpHomePage",
					"#ds-dialog-url",
					"input[name='url']",
					"input[name='website']",
					"#website",
					"input[name='link']",
					"#comment_url",
				];
			for (var i = 0; i < lauthor.length; i++) {
				var author = document.querySelector(lauthor[i]);
				if (author != null) {
					author.value = name;
					author.dispatchEvent(new Event("input"));
					author.dispatchEvent(new Event("change"));
					break;
				}
			}
			for (var j = 0; j < lmail.length; j++) {
				var mail = document.querySelector(lmail[j]);
				if (mail != null) {
					mail.value = visitorMail;
					mail.dispatchEvent(new Event("input"));
					mail.dispatchEvent(new Event("change"));
					break;
				}
			}
			return !1;
		}

		dr_js_autofill_commentinfos();
		var input = document.getElementsByClassName("el-textarea__inner")[0];
		input.focus();
		input.setSelectionRange(-1, -1);
	},

	// 跳转开往
	totraveling: function () {
		anzhiyu.snackbarShow(
			"即将跳转到「开往」项目的成员博客，不保证跳转网站的安全性和可用性",
			(element) => {
				element.style.opacity = 0;
				travellingsTimer && clearTimeout(travellingsTimer);
			},
			5000,
			"取消"
		);
		travellingsTimer = setTimeout(function () {
			window.open("https://www.travellings.cn/go.html", "_blank");
		}, "5000");
	},

	// 工具函数替换字符串
	replaceAll: function (e, n, t) {
		return e.split(n).join(t);
	},

	// 音乐绑定事件
	musicBindEvent: function () {
		document.querySelector("#nav-music .aplayer-music").addEventListener("click", function () {
			anzhiyu.musicTelescopic();
		});
		document.querySelector("#nav-music .aplayer-button").addEventListener("click", function () {
			anzhiyu.musicToggle(false);
		});
	},

	// 判断是否是移动端
	hasMobile: function () {
		let isMobile = false;
		if (
			navigator.userAgent.match(
				/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
			) ||
			document.body.clientWidth < 800
		) {
			// 移动端
			isMobile = true;
		}
		return isMobile;
	},

	// 创建二维码
	qrcodeCreate: function () {
		if (document.getElementById("qrcode")) {
			document.getElementById("qrcode").innerHTML = "";
			var qrcode = new QRCode(document.getElementById("qrcode"), {
				text: window.location.href,
				width: 250,
				height: 250,
				colorDark: "#000",
				colorLight: "#ffffff",
				correctLevel: QRCode.CorrectLevel.L,
			});
		}
	},

	// 判断是否在el内
	isInViewPortOfOne: function (el) {
		if (!el) return;
		const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		const offsetTop = el.offsetTop;
		const scrollTop = document.documentElement.scrollTop;
		const top = offsetTop - scrollTop;
		return top <= viewPortHeight;
	},
	//添加赞赏蒙版
	addRewardMask: function () {
		if (!document.querySelector(".reward-main")) return;
		document.querySelector(".reward-main").style.display = "flex";
		document.querySelector(".reward-main").style.zIndex = "102";
		document.getElementById("quit-box").style.display = "flex";
	},
	// 移除赞赏蒙版
	removeRewardMask: function () {
		if (!document.querySelector(".reward-main")) return;
		document.querySelector(".reward-main").style.display = "none";
		document.getElementById("quit-box").style.display = "none";
	},

	keyboardToggle: function () {
		const isKeyboardOn = anzhiyu_keyboard;

		if (isKeyboardOn) {
			const consoleKeyboard = document.querySelector("#consoleKeyboard");
			consoleKeyboard.classList.remove("on");
			anzhiyu_keyboard = false;
		} else {
			const consoleKeyboard = document.querySelector("#consoleKeyboard");
			consoleKeyboard.classList.add("on");
			anzhiyu_keyboard = true;
		}

		localStorage.setItem("keyboardToggle", isKeyboardOn ? "false" : "true");
	},
	rightMenuToggle: function () {
		if (window.oncontextmenu) {
			window.oncontextmenu = null;
		} else if (!window.oncontextmenu && oncontextmenuFunction) {
			window.oncontextmenu = oncontextmenuFunction;
		}
	},
	switchConsole: () => {
		// switch console
		const consoleEl = document.getElementById("console");
		//初始化隐藏边栏
		const $htmlDom = document.documentElement.classList;
		$htmlDom.contains("hide-aside")
			? document.querySelector("#consoleHideAside").classList.add("on")
			: document.querySelector("#consoleHideAside").classList.remove("on");
		if (consoleEl.classList.contains("show")) {
			consoleEl.classList.remove("show");
		} else {
			consoleEl.classList.add("show");
		}
		const consoleKeyboard = document.querySelector("#consoleKeyboard");

		if (consoleKeyboard) {
			if (localStorage.getItem("keyboardToggle") === "true") {
				consoleKeyboard.classList.add("on");
				anzhiyu_keyboard = true;
			} else {
				consoleKeyboard.classList.remove("on");
				anzhiyu_keyboard = false;
			}
		}
	},
	// 定义 intersectionObserver 函数，并接收两个可选参数
	intersectionObserver: function (enterCallback, leaveCallback) {
		let observer;
		return () => {
			if (!observer) {
				observer = new IntersectionObserver((entries) => {
					entries.forEach((entry) => {
						if (entry.intersectionRatio > 0) {
							enterCallback?.();
						} else {
							leaveCallback?.();
						}
					});
				});
			} else {
				// 如果 observer 对象已经存在，则先取消对之前元素的观察
				observer.disconnect();
			}
			return observer;
		};
	},
	// CategoryBar滚动
	scrollCategoryBarToRight: function () {
		// 获取需要操作的元素
		const items = document.getElementById("catalog-list");
		const nextButton = document.getElementById("category-bar-next");

		// 检查元素是否存在
		if (items && nextButton) {
			const itemsWidth = items.clientWidth;

			// 判断是否已经滚动到最右侧
			if (items.scrollLeft + items.clientWidth + 1 >= items.scrollWidth) {
				// 滚动到初始位置并更新按钮内容
				items.scroll({
					left: 0,
					behavior: "smooth",
				});
				nextButton.innerHTML = '<i class="anzhiyufont anzhiyu-icon-angle-double-right"></i>';
			} else {
				// 滚动到下一个视图
				items.scrollBy({
					left: itemsWidth,
					behavior: "smooth",
				});
			}
		} else {
			console.error("Element(s) not found: 'catalog-list' and/or 'category-bar-next'.");
		}
	},
	// 分类条
	categoriesBarActive: function () {
		const urlinfo = decodeURIComponent(window.location.pathname);
		const $categoryBar = document.getElementById("category-bar");
		if (!$categoryBar) return;

		if (urlinfo === "/") {
			$categoryBar.querySelector("#首页").classList.add("select");
		} else {
			const pattern = /\/categories\/.*?\//;
			const patbool = pattern.test(urlinfo);
			if (!patbool) return;

			const nowCategorie = urlinfo.split("/")[2];
			$categoryBar.querySelector(`#${nowCategorie}`).classList.add("select");
		}
	},
	topCategoriesBarScroll: function () {
		const $categoryBarItems = document.getElementById("category-bar-items");
		if (!$categoryBarItems) return;

		$categoryBarItems.addEventListener("mousewheel", function (e) {
			const v = -e.wheelDelta / 2;
			this.scrollLeft += v;
			e.preventDefault();
		});
	},
	// 切换菜单显示热评
	switchRightClickMenuHotReview: function () {
		const postComment = document.getElementById("post-comment");
		const menuCommentBarrageDom = document.getElementById("menu-commentBarrage");
		if (postComment) {
			menuCommentBarrageDom.style.display = "flex";
		} else {
			menuCommentBarrageDom.style.display = "none";
		}
	},
	// 切换作者卡片状态文字
	changeSayHelloText: function () {
		const greetings = GLOBAL_CONFIG.authorStatus.skills;

		const authorInfoSayHiElement = document.getElementById("author-info__sayhi");

		// 如果只有一个问候语，设置为默认值
		if (greetings.length === 1) {
			authorInfoSayHiElement.textContent = greetings[0];
			return;
		}

		let lastSayHello = authorInfoSayHiElement.textContent;

		let randomGreeting = lastSayHello;
		while (randomGreeting === lastSayHello) {
			randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
		}
		authorInfoSayHiElement.textContent = randomGreeting;
	},
};

const anzhiyuPopupManager = {
	queue: [],
	processing: false,
	Jump: false,

	enqueuePopup(title, tip, url, duration = 3000) {
		this.queue.push({ title, tip, url, duration });
		if (!this.processing) {
			this.processQueue();
		}
	},

	processQueue() {
		if (this.queue.length > 0 && !this.processing) {
			this.processing = true;
			const { title, tip, url, duration } = this.queue.shift();
			this.popupShow(title, tip, url, duration);
		}
	},

	popupShow(title, tip, url, duration) {
		const popupWindow = document.getElementById("popup-window");
		if (!popupWindow) return;
		const windowTitle = popupWindow.querySelector(".popup-window-title");
		const windowContent = popupWindow.querySelector(".popup-window-content");
		const cookiesTip = windowContent.querySelector(".popup-tip");
		if (popupWindow.classList.contains("show-popup-window")) {
			popupWindow.classList.add("popup-hide");
		}

		// 等待上一个弹窗完全消失
		setTimeout(() => {
			// 移除之前的点击事件处理程序
			popupWindow.removeEventListener("click", this.clickEventHandler);
			if (url) {
				if (window.pjax) {
					this.clickEventHandler = (event) => {
						event.preventDefault();
						pjax.loadUrl(url);
						popupWindow.classList.remove("show-popup-window");
						popupWindow.classList.remove("popup-hide");
						this.Jump = true;

						// 处理队列中的下一个弹出窗口
						this.processing = false;
						this.processQueue();
					};

					popupWindow.addEventListener("click", this.clickEventHandler);
				} else {
					this.clickEventHandler = () => {
						window.location.href = url;
					};
					popupWindow.addEventListener("click", this.clickEventHandler);
				}
				if (popupWindow.classList.contains("no-url")) {
					popupWindow.classList.remove("no-url");
				}
			} else {
				if (!popupWindow.classList.contains("no-url")) {
					popupWindow.classList.add("no-url");
				}

				this.clickEventHandler = () => {
					popupWindow.classList.add("popup-hide");
					setTimeout(() => {
						popupWindow.classList.remove("popup-hide");
						popupWindow.classList.remove("show-popup-window");
					}, 1000);
				};
				popupWindow.addEventListener("click", this.clickEventHandler);
			}

			if (popupWindow.classList.contains("popup-hide")) {
				popupWindow.classList.remove("popup-hide");
			}
			popupWindow.classList.add("show-popup-window");
			windowTitle.textContent = title;
			cookiesTip.textContent = tip;
		}, 800);

		setTimeout(() => {
			if (url && !this.Jump) {
				this.Jump = false;
			}
			if (!popupWindow.classList.contains("popup-hide") && popupWindow.className != "") {
				popupWindow.classList.add("popup-hide");
			}

			// 处理队列中的下一个弹出窗口
			this.processing = false;
			this.processQueue();
		}, duration);
	},
};

const bb937 = {
	setWelcome: () => {
		const IP_CONFIG = {
			API_KEY: "EPXBZ-VL3L7-4G6XB-PJOKD-6QSMH-3ZFW2",
			BLOG_LOCATION: {
				lng: 116.891273, // 经度
				lat: 36.668904, // 纬度
			},
			CACHE_DURATION: 1000 * 60 * 60, // 可配置缓存时间(默认1小时)
			HOME_PAGE_ONLY: true, // 是否只在首页显示 开启后其它页面将不会显示这个容器
		};

		const insertAnnouncementComponent = () => {
			// 获取所有公告卡片
			const announcementCards = document.querySelectorAll(".card-widget.card-announcement");
			if (!announcementCards.length) return;

			if (IP_CONFIG.HOME_PAGE_ONLY && !isHomePage()) {
				announcementCards.forEach((card) => card.remove());
				return;
			}
			if (!document.querySelector("#welcome-info")) return;
			fetchIpInfo();
		};

		const getWelcomeInfoElement = () => document.querySelector("#welcome-info");

		const fetchIpData = async () => {
			// console.log("fetchIpData")
			return new Promise((resolve, reject) => {
				const callbackName = "QQmap_" + Date.now();
				const script = document.createElement("script");
				const url = `https://apis.map.qq.com/ws/location/v1/ip?key=${IP_CONFIG.API_KEY}&output=jsonp&callback=${callbackName}`;
				script.src = url;

				window[callbackName] = (response) => {
					document.body.removeChild(script);
					delete window[callbackName];

					if (response.status === 0) {
						const { location, ad_info, ip } = response.result;
						const data = {
							lng: location.lng,
							lat: location.lat,
							country: ad_info.nation,
							prov: ad_info.province,
							city: ad_info.city,
						};
						resolve({ data, ip });
					} else {
						reject(new Error("Failed to fetch location data"));
					}
				};

				script.onerror = () => {
					document.body.removeChild(script);
					delete window[callbackName];
					reject(new Error("Script load error"));
				};

				document.body.appendChild(script);
			});
		};

		const showWelcome = ({ data, ip }) => {
			if (!data) return showErrorMessage();

			const { lng, lat, country, prov, city } = data;
			const welcomeInfo = getWelcomeInfoElement();
			if (!welcomeInfo) return;

			const dist = calculateDistance(lng, lat);
			const ipDisplay = formatIpDisplay(ip);
			const pos = formatLocation(country, prov, city);

			welcomeInfo.style.display = "block";
			welcomeInfo.style.height = "auto";
			welcomeInfo.innerHTML = generateWelcomeMessage(pos, dist, ipDisplay, country, prov, city);
		};

		const calculateDistance = (lng, lat) => {
			const R = 6371; // 地球半径(km)
			const rad = Math.PI / 180;
			const dLat = (lat - IP_CONFIG.BLOG_LOCATION.lat) * rad;
			const dLon = (lng - IP_CONFIG.BLOG_LOCATION.lng) * rad;
			const a =
				Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(IP_CONFIG.BLOG_LOCATION.lat * rad) * Math.cos(lat * rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

			return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
		};
		const formatIpDisplay = (ip) => (ip.includes(":") ? "<br>好复杂，咱看不懂~(ipv6)" : ip);
		const formatLocation = (country, prov, city) => {
			return country ? (country === "中国" ? `${prov} ${city}` : country) : "神秘地区";
		};

		const generateWelcomeMessage = (pos, dist, ipDisplay, country, prov, city) => `
    欢迎来自 <b>${pos}</b> 的朋友<br>
    你当前距博主约 <b>${dist}</b> 公里！<br>
    你的IP地址：<b class="ip-address">${ipDisplay}</b><br>
    ${getTimeGreeting()}<br>
    Tip：<b>${getGreeting(country, prov, city)}🍂</b>
`;

		const addStyles = () => {
			const style = document.createElement("style");
			style.textContent = `
        #welcome-info {
            user-select: none;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 212px;
            padding: 10px;
            margin-top: 5px;
            border-radius: 12px;
            background-color: var(--anzhiyu-background);
            outline: 1px solid var(--anzhiyu-card-border);
        }
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top: 3px solid var(--anzhiyu-main);
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .ip-address {
            filter: blur(5px);
            transition: filter 0.3s ease;
        }
        .ip-address:hover {
            filter: blur(0);
        }
        .error-message {
            color: #ff6565;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .error-message p,
        .permission-dialog p {
            margin: 0;
        }
        .error-icon {
            font-size: 3rem;
        }
        #retry-button {
            margin: 0 5px;
            color: var(--anzhiyu-main);
            transition: transform 0.3s ease;
        }
        #retry-button:hover {
            transform: rotate(180deg);
        }
        .permission-dialog {
            text-align: center;
        }
        .permission-dialog button {
            margin: 10px 5px;
            padding: 5px 10px;
            border: none;
            border-radius: 5px;
            background-color: var(--anzhiyu-main);
            color: white;
            transition: opacity 0.3s ease;
        }
        .permission-dialog button:hover {
            opacity: 0.8;
        }
    `;
			document.head.appendChild(style);
		};

		// 位置权限相关函数
		const checkLocationPermission = () => localStorage.getItem("locationPermission") === "granted";
		const saveLocationPermission = (permission) => {
			localStorage.setItem("locationPermission", permission);
		};
		const showLocationPermissionDialog = () => {
			const welcomeInfoElement = document.getElementById("welcome-info");
			welcomeInfoElement.innerHTML = `
        <div class="permission-dialog">
            <div class="error-icon">❓</div>
            <p>是否允许访问您的位置信息？</p>
            <button data-action="allow">允许</button>
            <button data-action="deny">拒绝</button>
        </div>
    `;

			welcomeInfoElement.addEventListener("click", (e) => {
				if (e.target.tagName === "BUTTON") {
					const action = e.target.dataset.action;
					const permission = action === "allow" ? "granted" : "denied";
					handleLocationPermission(permission);
				}
			});
		};
		const handleLocationPermission = (permission) => {
			saveLocationPermission(permission);
			if (permission === "granted") {
				showLoadingSpinner();
				fetchIpInfo();
			} else {
				showErrorMessage("您已拒绝访问位置信息");
			}
		};

		const showLoadingSpinner = () => {
			const welcomeInfoElement = document.querySelector("#welcome-info");
			if (!welcomeInfoElement) return;
			welcomeInfoElement.innerHTML = '<div class="loading-spinner"></div>';
		};

		const IP_CACHE_KEY = "ip_info_cache";
		const getIpInfoFromCache = () => {
			const cached = localStorage.getItem(IP_CACHE_KEY);
			if (!cached) return null;

			const { data, timestamp } = JSON.parse(cached);
			if (Date.now() - timestamp > IP_CONFIG.CACHE_DURATION) {
				localStorage.removeItem(IP_CACHE_KEY);
				return null;
			}
			return data;
		};
		const setIpInfoCache = (data) => {
			localStorage.setItem(
				IP_CACHE_KEY,
				JSON.stringify({
					data,
					timestamp: Date.now(),
				})
			);
		};

		const fetchIpInfo = async () => {
			// 检查位置权限
			if (!checkLocationPermission()) {
				showLocationPermissionDialog();
				return;
			}
			showLoadingSpinner();

			const cachedData = getIpInfoFromCache();
			if (cachedData) {
				showWelcome(cachedData);
				return;
			}
			// console.log("准备")
			try {
				const data = await fetchIpData();
				setIpInfoCache(data);
				showWelcome(data);
			} catch (error) {
				console.error("获取IP信息失败:", error);
				showErrorMessage();
			}
		};

		const greetings = {
			中国: {
				北京市: "这里有故宫的古老，也有中关村的未来",
				天津市: "来碗煎饼果子，再听一段快板",
				河北省: "冀中平原奔千里，燕赵多慷慨悲歌",
				山西省: "煤都不只有黑，还有云冈石窟的光",
				内蒙古自治区: "骑上骏马，向草原深处出发",
				辽宁省: "铁岭不止有赵本山，还有热情如火的烤串",
				吉林省: "冬天的雾凇美得像童话",
				黑龙江省: "冰雪大世界，不只是冰雕那么简单",
				上海市: "魔都节奏快，腔调也很足",
				江苏省: {
					南京市: "六朝古都，钟山风雨起苍黄",
					苏州市: "小桥流水人家，昆曲声声入梦",
					其他: "苏大强说了算？其实大家都挺强",
				},
				浙江省: {
					杭州市: "西湖美景三月天，不如你我泛舟间",
					其他: "山寺月中寻桂子，郡亭枕上看潮头",
				},
				河南省: {
					郑州市: "天地之中，华夏之源",
					信阳市: "绿茶氤氲香千里，山水之间悟清闲",
					南阳市: "卧龙岗上，睿智千秋照古今",
					驻马店市: "嵖岈山下风景奇，花海翻涌梦如诗",
					开封市: "七朝古都，清明上河图依旧热闹",
					洛阳市: "牡丹花开盛世颜，千年古都韵味长",
					其他: "来一碗胡辣汤，一口入魂！",
				},
				安徽省: "徽派建筑白墙黑瓦，藏着风雅故事",
				福建省: "山海之间，藏着一座座小清新的古镇",
				江西省: "庐山瀑布挂前川，诗意一直在延续",
				山东省: "大明湖畔的夏雨荷，还记得吗？",
				湖北省: {
					黄冈市: "人杰地灵，英雄辈出",
					其他: "嗦完热干面，再爬黄鹤楼！",
				},
				湖南省: "口味虾配茶颜悦色，湘味就是爽",
				广东省: {
					广州市: "老广说话都带粤，点心一笼吃整夜",
					深圳市: "打工人的精神特区",
					阳江市: "海风轻拂阳光城，海鲜和人都热情",
					其他: "粤语听不懂，但美食我能行！",
				},
				广西壮族自治区: "山青水秀桂花香，民族风情扑面来",
				海南省: "阳光沙滩与比基尼，不负椰风海韵情",
				四川省: "火锅一端，全城沸腾",
				贵州省: "层层梯田外，藏着苗寨的歌声",
				云南省: "一半烟火一半云，四季如春是彩云之南",
				西藏自治区: "转山转水转佛塔，不为修来生，只为途中与你相见",
				陕西省: "大唐不夜城灯如昼，兵马俑依旧威风凛凛",
				甘肃省: "丝路驼铃声声远，敦煌壁画岁岁新",
				青海省: "茶卡盐湖天一色，牛羊低吟入梦来",
				宁夏回族自治区: "塞上江南，黄河水倒映星空",
				新疆维吾尔自治区: "葡萄熟了，库尔勒香梨甜进心窝",
				台湾省: "宝岛不远，一海相望心却近",
				香港特别行政区: "霓虹下的城市节奏，有港味也有人情",
				澳门特别行政区: "转角遇见咖喱鱼蛋和欧式教堂",
				其他: "你的城市有故事吗？我想听听",
			},
			美国: "Peace, love, and freedom for all!", // 仍用英语，简洁明快
			日本: "一緒に桜を見ましょう、春の風を感じて", // 更自然地表达赏樱邀约
			俄罗斯: "Давай выпьем за дружбу и мир!", // “为友谊与和平干杯！”
			法国: "Profitons de la vie, comme une baguette bien chaude.", // “享受生活，就像享受一根热乎的法棍”
			德国: "Genieße den Moment, er kommt nie zurück.", // “享受此刻，它不会再来”
			澳大利亚: "G'day mate! Let's hit the waves at Bondi!", // 澳式打招呼 + 冲浪情景
			加拿大: "Bienvenue au Canada, où l’érable danse avec le vent.", // “欢迎来到加拿大，这里枫叶随风起舞”
			其他: "你好呀！带我用你的语言看看这个世界~", // 如果找不到对应国家，就保留中文调侃口吻
		};

		const getGreeting = (country, province, city) => {
			const countryGreeting = greetings[country] || greetings["其他"];
			if (typeof countryGreeting === "string") {
				return countryGreeting;
			}
			const provinceGreeting = countryGreeting[province] || countryGreeting["其他"];
			if (typeof provinceGreeting === "string") {
				return provinceGreeting;
			}
			return provinceGreeting[city] || provinceGreeting["其他"] || countryGreeting["其他"];
		};
		const getTimeGreeting = () => {
			const hour = new Date().getHours();
			if (hour < 11) return "早上好🌤️ ，一日之计在于晨";
			if (hour < 13) return "中午好☀️ ，记得午休喔~";
			if (hour < 17) return "下午好🕞 ，饮茶先啦！";
			if (hour < 19) return "即将下班🚶‍♂️，记得按时吃饭~";
			return "晚上好🌙 ，夜生活嗨起来！";
		};

		const showErrorMessage = (message = "抱歉，无法获取信息") => {
			const welcomeInfoElement = document.getElementById("welcome-info");
			welcomeInfoElement.innerHTML = `
        <div class="error-message">
            <div class="error-icon">😕</div>
            <p>${message}</p>
            <p>请<i id="retry-button" class="fa-solid fa-arrows-rotate"></i>重试或检查网络连接</p>
        </div>
    `;

			document.getElementById("retry-button").addEventListener("click", fetchIpInfo);
		};

		const isHomePage = () => {
			return window.location.pathname === "/" || window.location.pathname === "/index.html";
		};

		// 初始化
		addStyles();
		insertAnnouncementComponent();
		document.addEventListener("pjax:complete", insertAnnouncementComponent);
	},
};
