document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const leftColumn = document.querySelector(".left-column");
    const video = document.querySelector(".hover-video");
    const textItems = document.querySelectorAll("a[data-bgcolor]");
    const mainTitle = document.querySelector(".main-title");

    let isMenuOpen = false;

    // 1. 반응형 레이아웃 적용
    function updateLayout() {
        if (window.innerWidth <= 950) {
            if (leftColumn) {
                leftColumn.style.transform = "translateX(-100%)";
                leftColumn.style.display = "block";
            }
            if (mainTitle) {
                mainTitle.style.display = "none";
            }
            if (video) {
                video.style.width = "100vw";
                video.style.height = "100vh";
            }
            isMenuOpen = false;
        } else {
            if (leftColumn) {
                leftColumn.style.transform = "translateX(0)";
                leftColumn.style.display = "block";
            }
            if (mainTitle) {
                mainTitle.style.display = "block";
            }
            if (video) {
                video.style.width = "auto";
                video.style.height = "auto";
            }
            isMenuOpen = false;
        }
    }

    updateLayout();
    window.addEventListener("resize", updateLayout);

    // 2. 메뉴 토글
    if (menuIcon && leftColumn) {
        menuIcon.addEventListener("click", () => {
            if (isMenuOpen) {
                leftColumn.style.transform = "translateX(-100%)";
                if (mainTitle) mainTitle.style.display = "none";
                isMenuOpen = false;
            } else {
                leftColumn.style.transform = "translateX(0)";
                if (mainTitle) mainTitle.style.display = "block";
                isMenuOpen = true;
            }
        });
    }

    // 3. index 페이지인지 체크
    const isIndex = window.location.pathname.includes("index.html") ||
        window.location.pathname === "/" ||
        window.location.pathname === "/index";

    // 4. 메뉴 hover 색상
    textItems.forEach(item => {
        item.addEventListener("mouseover", function () {
            if (isIndex) {
                document.body.style.backgroundColor = this.getAttribute("data-bgcolor");
            } else {
                this.style.backgroundColor = "white";
                this.style.color = "black";
            }
        });

        item.addEventListener("mouseleave", function () {
            if (isIndex) {
                document.body.style.backgroundColor = "";
            } else {
                this.style.backgroundColor = "";
                this.style.color = "";
            }
        });
    });

    // 5. 이미지 + 비디오 공통 툴팁
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    document.body.appendChild(tooltip);

    // 이미지 툴팁
    const hoverImages = document.querySelectorAll(".hover-image[data-tooltip]");
    hoverImages.forEach((img) => {
        img.addEventListener("mouseover", function () {
            tooltip.textContent = img.getAttribute("data-tooltip");
            tooltip.style.opacity = "1";
            tooltip.style.visibility = "visible";
        });

        img.addEventListener("mousemove", function (event) {
            tooltip.style.left = event.pageX + 10 + "px";
            tooltip.style.top = event.pageY + 10 + "px";
        });

        img.addEventListener("mouseout", function () {
            tooltip.style.opacity = "0";
            tooltip.style.visibility = "hidden";
        });
    });

    // 비디오 툴팁
    if (video && video.hasAttribute("data-tooltip")) {
        video.addEventListener("mouseover", function () {
            tooltip.textContent = video.getAttribute("data-tooltip");
            tooltip.style.opacity = "1";
            tooltip.style.visibility = "visible";
        });

        video.addEventListener("mousemove", function (event) {
            tooltip.style.left = event.pageX + 10 + "px";
            tooltip.style.top = event.pageY + 10 + "px";
        });

        video.addEventListener("mouseout", function () {
            tooltip.style.opacity = "0";
            tooltip.style.visibility = "hidden";
        });
    }

    
});
