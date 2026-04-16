const birthdayConfig = {
  recipientName: "Em",
  fromName: "Hiếu",
  birthdayDate: "2026-04-29",
  heroLead:
    "Hôm nay là một ngày thật đẹp, và anh chỉ mong mọi điều tốt lành sẽ nhẹ nhàng ghé đến bên em.",
  heroNote:
    "Anh làm góc nhỏ này để khi mở ra, em sẽ biết rằng sinh nhật của em luôn là một điều rất đáng để được trân trọng.",
  storyIntro:
    "Sinh nhật không nhất thiết phải thật ồn ào mới trở nên đặc biệt. Chỉ cần hôm nay em thấy nhẹ lòng hơn một chút, cười nhiều hơn một chút, và biết rằng luôn có người mong em bình an, như thế đã là một ngày rất đẹp rồi.",
  finalTitle: "Mong tuổi mới sẽ nhẹ nhàng và tươi sáng hơn với em",
  finalCopy:
    "Mong những điều em đang mong sẽ dần thành hình theo cách đẹp nhất. Mong những ngày áp lực sẽ bớt đi, những niềm vui sẽ ở lại lâu hơn, và em luôn giữ được sự bình yên để tận hưởng cả những điều rất nhỏ. Không chỉ hôm nay, mà cả những ngày bình thường sau này nữa, anh vẫn mong em gặp thật nhiều điều tử tế.",
  wishes: [
    {
      title: "Một sức khỏe thật tốt",
      text: "Để mỗi ngày bắt đầu đều đủ nhẹ nhàng và đủ năng lượng cho những điều em quan tâm."
    },
    {
      title: "Nhiều may mắn vừa đủ",
      text: "Để những cố gắng lặng lẽ của em luôn gặp được đúng thời điểm xứng đáng."
    },
    {
      title: "Niềm vui ở lại lâu hơn",
      text: "Để bên cạnh em luôn có những người khiến cuộc sống trở nên dễ chịu và đáng nhớ."
    }
  ],
  moments: [
    {
      title: "Nụ cười rất riêng",
      text: "Là kiểu nụ cười khiến mọi thứ xung quanh dường như cũng trở nên dịu hơn."
    },
    {
      title: "Một trái tim biết để tâm",
      text: "Em luôn nhớ cả những điều rất nhỏ, và chính sự tinh tế ấy làm em trở nên đặc biệt."
    },
    {
      title: "Một sự ấm áp rất riêng",
      text: "Ở cạnh em luôn có cảm giác nhẹ lòng, bình yên, và rất dễ thấy thoải mái."
    }
  ],
  gifts: [
    {
      icon: "01",
      title: "Một điều nhỏ dành cho em",
      hint: "Một chiếc hộp nhỏ đang cất một chút dễ thương.",
      actionLabel: "Mở món quà này",
      url: "#",
      secret:
        "Bên trong là một điều anh chuẩn bị riêng cho em trong ngày đặc biệt này."
    },
    {
      icon: "02",
      title: "Một bất ngờ tiếp theo",
      hint: "Có một điều nhỏ nhưng đáng để mỉm cười đang nằm trong chiếc hộp này.",
      actionLabel: "Đi đến món quà",
      url: "#",
      secret:
        "Nếu muốn, món quà này có thể là một bài hát, một album ảnh, một video hay bất kỳ điều gì khiến em thấy vui."
    },
    {
      icon: "03",
      title: "Một lời mời nho nhỏ",
      hint: "Mở ra để nhận một lời hẹn đáng mong chờ.",
      actionLabel: "Mở lời mời",
      url: "#",
      secret:
        "Một chiếc link nhỏ thôi, nhưng có thể dẫn đến một buổi hẹn, một playlist, hay một điều gì đó đáng để nhớ."
    },
    {
      icon: "04",
      title: "Điều để lại sau cùng",
      hint: "Chiếc hộp cuối cùng thường là chiếc hộp khiến người ta muốn mở chậm lại một chút.",
      actionLabel: "Mở điều cuối cùng",
      url: "#",
      secret:
        "Anh có thể để ở đây bất kỳ món quà online nào, miễn là đó là điều đủ đặc biệt để em nhớ đến thật lâu."
    }
  ],
  letterTitle: "Chúc mừng sinh nhật em",
  letterBody: [
    "Hôm nay là một ngày thật đẹp để anh nói với em rằng sự hiện diện của em luôn là một điều rất đặc biệt.",
    "Anh mong tuổi mới sẽ đến với em bằng nhiều thuận lợi hơn một chút, nhiều bình yên hơn một chút, và thêm thật nhiều khoảnh khắc khiến em thấy lòng mình nhẹ đi.",
    "Nếu có một điều anh muốn gửi vào lá thư nhỏ này, thì đó là lời chúc để em luôn giữ được sự dịu dàng của riêng mình, và cũng nhận về thật nhiều điều xứng đáng với em."
  ]
};

const elementMap = {
  heroTitle: document.getElementById("heroTitle"),
  heroLead: document.getElementById("heroLead"),
  heroNote: document.getElementById("heroNote"),
  storyIntro: document.getElementById("storyIntro"),
  wishList: document.getElementById("wishList"),
  momentsGrid: document.getElementById("momentsGrid"),
  giftGrid: document.getElementById("giftGrid"),
  finalTitle: document.getElementById("finalTitle"),
  finalCopy: document.getElementById("finalCopy"),
  letterTitle: document.getElementById("letterTitle"),
  letterBody: document.getElementById("letterBody"),
  letterSignature: document.getElementById("letterSignature"),
  countdownMessage: document.getElementById("countdownMessage"),
  daysValue: document.getElementById("daysValue"),
  hoursValue: document.getElementById("hoursValue"),
  minutesValue: document.getElementById("minutesValue"),
  secondsValue: document.getElementById("secondsValue"),
  letterModal: document.getElementById("letterModal"),
  openLetterBtn: document.getElementById("openLetterBtn"),
  closeLetterBtn: document.getElementById("closeLetterBtn"),
  sparkles: document.getElementById("sparkles"),
  surpriseOverlay: document.getElementById("surpriseOverlay"),
  flowerBurst: document.getElementById("flowerBurst"),
  surpriseTitle: document.getElementById("surpriseTitle"),
  surpriseMessage: document.getElementById("surpriseMessage"),
  closeSurpriseBtn: document.getElementById("closeSurpriseBtn")
};

function populateContent() {
  document.title = `Chúc mừng sinh nhật, ${birthdayConfig.recipientName}`;

  elementMap.heroTitle.textContent = `Chúc mừng sinh nhật, ${birthdayConfig.recipientName}`;
  elementMap.heroLead.textContent = birthdayConfig.heroLead;
  elementMap.heroNote.textContent = birthdayConfig.heroNote;
  elementMap.storyIntro.textContent = birthdayConfig.storyIntro;
  elementMap.finalTitle.textContent = birthdayConfig.finalTitle;
  elementMap.finalCopy.textContent = birthdayConfig.finalCopy;
  elementMap.letterTitle.textContent = birthdayConfig.letterTitle;
  elementMap.letterSignature.textContent = "Thương em, anh";

  birthdayConfig.letterBody.forEach((paragraph) => {
    const textNode = document.createElement("p");
    textNode.textContent = paragraph;
    elementMap.letterBody.appendChild(textNode);
  });

  birthdayConfig.wishes.forEach((wish) => {
    const item = document.createElement("article");
    item.className = "wish-item";
    item.innerHTML = `<strong>${wish.title}</strong><span>${wish.text}</span>`;
    elementMap.wishList.appendChild(item);
  });

  birthdayConfig.moments.forEach((moment) => {
    const item = document.createElement("article");
    item.className = "moment-card";
    item.innerHTML = `<h3>${moment.title}</h3><p>${moment.text}</p>`;
    elementMap.momentsGrid.appendChild(item);
  });

  birthdayConfig.gifts.forEach((gift, index) => {
    const item = document.createElement("article");
    item.className = "gift-card";
    item.innerHTML = `
      <div class="gift-ribbon"></div>
      <div class="gift-copy">
        <span class="gift-badge">Quà ${gift.icon}</span>
        <div class="gift-box-visual" aria-hidden="true">
          <span class="gift-lid"></span>
          <span class="gift-box-body"></span>
        </div>
        <div>
          <h3>${gift.title}</h3>
          <p class="gift-hint">${gift.hint}</p>
          <p class="gift-secret">${gift.secret}</p>
        </div>
      </div>
      <button class="gift-toggle" type="button" data-index="${index}">Mở món quà</button>
    `;
    elementMap.giftGrid.appendChild(item);
  });
}

function createFlowerBurst() {
  const flowers = ["🌸", "🌷", "🌹", "🌺", "💐", "🌼", "🪻"];

  elementMap.flowerBurst.replaceChildren();

  for (let index = 0; index < 18; index += 1) {
    const flower = document.createElement("span");
    flower.className = "burst-flower";
    flower.textContent = flowers[index % flowers.length];
    flower.style.left = `${8 + Math.random() * 84}%`;
    flower.style.top = `${10 + Math.random() * 60}%`;
    flower.style.animationDelay = `${Math.random() * 180}ms`;
    flower.style.setProperty("--drift-x", `${-80 + Math.random() * 160}px`);
    flower.style.setProperty("--drift-y", `${-40 - Math.random() * 140}px`);
    flower.style.setProperty("--spin", `${-25 + Math.random() * 50}deg`);
    elementMap.flowerBurst.appendChild(flower);
  }
}

function showSurpriseCard(gift) {
  createFlowerBurst();
  elementMap.surpriseTitle.textContent = gift.title;
  elementMap.surpriseMessage.textContent = gift.secret;
  renderGiftAction(gift);
  elementMap.surpriseOverlay.classList.add("is-visible");
  elementMap.surpriseOverlay.setAttribute("aria-hidden", "false");
}

function renderGiftAction(gift) {
  const existingAction = document.getElementById("surpriseAction");

  if (existingAction) {
    existingAction.remove();
  }

  if (!gift.url || gift.url === "#") {
    return;
  }

  const action = document.createElement("a");
  action.id = "surpriseAction";
  action.className = "surprise-action";
  action.href = gift.url;
  action.target = "_blank";
  action.rel = "noopener noreferrer";
  action.textContent = gift.actionLabel || "Mở món quà";
  elementMap.surpriseMessage.insertAdjacentElement("afterend", action);
}

function hideSurpriseCard() {
  elementMap.surpriseOverlay.classList.remove("is-visible");
  elementMap.surpriseOverlay.setAttribute("aria-hidden", "true");
}

function getNextBirthday(dateString) {
  const parsed = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  const now = new Date();
  const upcoming = new Date(
    now.getFullYear(),
    parsed.getMonth(),
    parsed.getDate(),
    0,
    0,
    0
  );

  if (upcoming.getTime() < now.getTime()) {
    upcoming.setFullYear(upcoming.getFullYear() + 1);
  }

  return upcoming;
}

function updateCountdown() {
  const upcomingBirthday = getNextBirthday(birthdayConfig.birthdayDate);
  const parsed = new Date(`${birthdayConfig.birthdayDate}T00:00:00`);
  const now = new Date();

  if (!upcomingBirthday) {
    elementMap.countdownMessage.textContent =
      "Chỉ cần cập nhật birthdayDate trong script.js là đồng đếm ngược sẽ chạy.";
    return;
  }

  const isBirthdayToday =
    now.getMonth() === parsed.getMonth() && now.getDate() === parsed.getDate();
  const diff = isBirthdayToday ? 0 : upcomingBirthday.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  elementMap.daysValue.textContent = String(days).padStart(2, "0");
  elementMap.hoursValue.textContent = String(hours).padStart(2, "0");
  elementMap.minutesValue.textContent = String(minutes).padStart(2, "0");
  elementMap.secondsValue.textContent = String(seconds).padStart(2, "0");

  if (totalSeconds === 0) {
    elementMap.countdownMessage.textContent =
      "Hôm nay là ngày của em, mong mọi khoảnh khắc đều thật đẹp và đáng nhớ.";
  } else {
    elementMap.countdownMessage.textContent =
      "Mỗi giây trôi qua đều đang đưa anh gần hơn đến ngày đặc biệt của em.";
  }
}

function createSparkles() {
  const sparkleCount = 16;

  for (let index = 0; index < sparkleCount; index += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.animationDuration = `${10 + Math.random() * 10}s`;
    sparkle.style.animationDelay = `${Math.random() * 6}s`;
    sparkle.style.opacity = (0.3 + Math.random() * 0.6).toFixed(2);
    elementMap.sparkles.appendChild(sparkle);
  }
}

function bindEvents() {
  elementMap.openLetterBtn.addEventListener("click", () => {
    elementMap.letterModal.classList.add("is-visible");
    elementMap.letterModal.setAttribute("aria-hidden", "false");
  });

  elementMap.closeLetterBtn.addEventListener("click", () => {
    elementMap.letterModal.classList.remove("is-visible");
    elementMap.letterModal.setAttribute("aria-hidden", "true");
  });

  elementMap.letterModal.addEventListener("click", (event) => {
    if (event.target === elementMap.letterModal) {
      elementMap.letterModal.classList.remove("is-visible");
      elementMap.letterModal.setAttribute("aria-hidden", "true");
    }
  });

  elementMap.closeSurpriseBtn.addEventListener("click", hideSurpriseCard);

  elementMap.surpriseOverlay.addEventListener("click", (event) => {
    if (event.target === elementMap.surpriseOverlay) {
      hideSurpriseCard();
    }
  });

  elementMap.giftGrid.addEventListener("click", (event) => {
    const toggle = event.target.closest(".gift-toggle");

    if (!toggle) {
      return;
    }

    const card = toggle.closest(".gift-card");
    const giftIndex = Number(toggle.dataset.index);
    const isOpen = card.classList.toggle("is-open");
    toggle.textContent = isOpen ? "Khép lại" : "Mở món quà";

    if (isOpen) {
      showSurpriseCard(birthdayConfig.gifts[giftIndex]);
    }
  });
}

populateContent();
createSparkles();
bindEvents();
updateCountdown();
setInterval(updateCountdown, 1000);
