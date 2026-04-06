const birthdayConfig = {
  recipientName: "Em",
  fromName: "Hiếu",
  birthdayDate: "2026-06-27",
  heroKicker: "27/06 | một góc nhỏ dành riêng cho em",
  heroLead:
    "Ngày 27/06 nên được bắt đầu bằng một điều gì đó dịu dàng, nên mình làm chiếc web này để mọi lời chúc có chỗ ở lại thật lâu.",
  heroNote:
    "Không cần quá ồn ào, chỉ cần khi mở trang này ra em biết là có người đã nhớ ngày của em, đã ngồi chuẩn bị từng đoạn chữ, từng bất ngờ nhỏ và đợi đúng hôm đó để chúc mừng.",
  heroChips: ["đếm ngược tới 27/06", "mở thư tay", "xoay bó hoa ánh sáng"],
  dateNote: "Mọi điều dễ thương sẽ hẹn nhau đến đúng ngày này.",
  storyIntro:
    "Sinh nhật không nhất thiết phải thật lớn. Chỉ cần ngày 27/06 đến, em thấy mình được thương nhiều hơn một chút, được nghỉ ngơi nhiều hơn một chút và được mỉm cười nhiều hơn thường ngày là đã đủ đẹp rồi.",
  finalTitle: "Chúc cho ngày 27/06 và cả tuổi mới của em đều thật rực rỡ",
  finalCopy:
    "Mong em sẽ có một tuổi mới nhẹ lòng hơn, nhiều may mắn hơn và gặp đúng những điều xứng đáng. Việc đang cố gắng sẽ dần có kết quả, những ngày mệt sẽ sớm qua, còn niềm vui thì ở lại lâu hơn. Và nếu có lúc nào cần một lời nhắc, hãy nhớ rằng em luôn xứng đáng với yêu thương tử tế.",
  wishes: [
    {
      title: "Một ngày thật vui",
      text: "Để từ sáng đến tối, mọi thứ đều đi theo cách khiến em thấy mình được nâng niu."
    },
    {
      title: "Một tuổi mới thật nhẹ",
      text: "Để bớt đi những điều làm em mệt, giữ lại nhiều hơn những điều khiến em yên tâm."
    },
    {
      title: "Một trái tim luôn ấm",
      text: "Để mỗi lần nhìn lại, em thấy quanh mình vẫn còn rất nhiều dịu dàng."
    }
  ],
  moments: [
    {
      title: "Nụ cười làm sáng cả ngày",
      text: "Kiểu nụ cười khiến căn phòng tự nhiên mềm xuống và mọi thứ xung quanh cũng trở nên dễ chịu hơn."
    },
    {
      title: "Sự dịu dàng rất hiếm",
      text: "Em có cách quan tâm người khác theo kiểu rất nhỏ thôi, nhưng đủ để người ta nhớ rất lâu."
    },
    {
      title: "Nguồn năng lượng khiến người ta muốn ở gần",
      text: "Vì ở cạnh em luôn có cảm giác ấm, an toàn và không cần phải gồng lên quá nhiều."
    }
  ],
  gifts: [
    {
      icon: "01",
      title: "Điều đầu tiên",
      hint: "Một lời chúc ngắn nhưng quan trọng.",
      secret: "Chúc em luôn thấy mình đủ đẹp, đủ giỏi và đủ xứng đáng với những điều tốt nhất."
    },
    {
      icon: "02",
      title: "Điều thứ hai",
      hint: "Mở ra khi em cần thêm một chút dịu dàng.",
      secret:
        "Nếu có ngày nào mệt quá, cứ nghỉ một chút cũng được. Em không cần hoàn hảo mới đáng được yêu thương."
    },
    {
      icon: "03",
      title: "Điều thứ ba",
      hint: "Dành cho những kế hoạch em đang giữ trong lòng.",
      secret:
        "Mong những dự định của em sẽ gặp đúng cơ hội, đúng người và đúng thời điểm để nở rộ thật đẹp."
    },
    {
      icon: "04",
      title: "Điều cuối cùng",
      hint: "Một cái ôm online được gói lại ở đây.",
      secret: "Trang web này xin gửi tới em một cái ôm rất dài, rất ấm và rất nhiều thương."
    }
  ],
  letterTitle: "Thư gửi riêng ngày 27/06",
  letterBody: [
    "Ngày 27/06 là một ngày đẹp để nhắc em rằng em quan trọng, theo một cách rất thật và rất yên.",
    "Mình mong sinh nhật năm nay sẽ mang đến cho em nhiều niềm vui vừa đủ, nhiều món quà đúng ý và nhiều khoảnh khắc khiến em thấy mọi cố gắng của mình đều xứng đáng.",
    "Nếu chiếc web nhỏ này làm em mỉm cười một chút thôi, thì có lẽ nó đã hoàn thành đúng nhiệm vụ của nó rồi. Chúc em sinh nhật vui vẻ và có một tuổi mới thật nhiều ánh sáng."
  ]
};

const elementMap = {
  heroTitle: document.getElementById("heroTitle"),
  heroKicker: document.getElementById("heroKicker"),
  heroLead: document.getElementById("heroLead"),
  heroNote: document.getElementById("heroNote"),
  heroChips: document.getElementById("heroChips"),
  heroDateValue: document.getElementById("heroDateValue"),
  heroDateNote: document.getElementById("heroDateNote"),
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

function parseBirthdayDate(dateString) {
  const parsed = new Date(`${dateString}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatBirthdayDate(dateString) {
  const parsed = parseBirthdayDate(dateString);

  if (!parsed) {
    return "";
  }

  return `${String(parsed.getDate()).padStart(2, "0")}/${String(parsed.getMonth() + 1).padStart(2, "0")}`;
}

function populateContent() {
  const birthdayLabel = formatBirthdayDate(birthdayConfig.birthdayDate);
  const metaDescription = document.querySelector('meta[name="description"]');

  document.title = `${birthdayLabel} | Chúc mừng sinh nhật, ${birthdayConfig.recipientName}`;

  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      `Microsite chúc mừng sinh nhật dành cho ${birthdayConfig.recipientName} vào ngày ${birthdayLabel}.`
    );
  }

  elementMap.heroTitle.textContent = `Chúc mừng sinh nhật, ${birthdayConfig.recipientName}`;
  elementMap.heroKicker.textContent = birthdayConfig.heroKicker;
  elementMap.heroLead.textContent = birthdayConfig.heroLead;
  elementMap.heroNote.textContent = birthdayConfig.heroNote;
  elementMap.heroDateValue.textContent = birthdayLabel;
  elementMap.heroDateNote.textContent = birthdayConfig.dateNote;
  elementMap.storyIntro.textContent = birthdayConfig.storyIntro;
  elementMap.finalTitle.textContent = birthdayConfig.finalTitle;
  elementMap.finalCopy.textContent = birthdayConfig.finalCopy;
  elementMap.letterTitle.textContent = birthdayConfig.letterTitle;
  elementMap.letterSignature.textContent = `Thương mến, ${birthdayConfig.fromName}`;

  elementMap.heroChips.replaceChildren();
  elementMap.wishList.replaceChildren();
  elementMap.momentsGrid.replaceChildren();
  elementMap.giftGrid.replaceChildren();
  elementMap.letterBody.replaceChildren();

  birthdayConfig.heroChips.forEach((chip) => {
    const item = document.createElement("span");
    item.className = "hero-chip";
    item.textContent = chip;
    elementMap.heroChips.appendChild(item);
  });

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
      <div class="gift-copy">
        <span class="gift-badge">${gift.icon}</span>
        <div>
          <h3>${gift.title}</h3>
          <p class="gift-hint">${gift.hint}</p>
          <p class="gift-secret">${gift.secret}</p>
        </div>
      </div>
      <button class="gift-toggle" type="button" data-index="${index}">Mở quà</button>
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
  elementMap.surpriseOverlay.classList.add("is-visible");
  elementMap.surpriseOverlay.setAttribute("aria-hidden", "false");
}

function hideSurpriseCard() {
  elementMap.surpriseOverlay.classList.remove("is-visible");
  elementMap.surpriseOverlay.setAttribute("aria-hidden", "true");
}

function getNextBirthday(dateString) {
  const parsed = parseBirthdayDate(dateString);

  if (!parsed) {
    return null;
  }

  const now = new Date();
  const upcoming = new Date(now.getFullYear(), parsed.getMonth(), parsed.getDate(), 0, 0, 0);

  if (upcoming.getTime() < now.getTime()) {
    upcoming.setFullYear(upcoming.getFullYear() + 1);
  }

  return upcoming;
}

function updateCountdown() {
  const upcomingBirthday = getNextBirthday(birthdayConfig.birthdayDate);
  const parsed = parseBirthdayDate(birthdayConfig.birthdayDate);
  const birthdayLabel = formatBirthdayDate(birthdayConfig.birthdayDate);
  const now = new Date();

  if (!upcomingBirthday || !parsed) {
    elementMap.countdownMessage.textContent =
      "Chỉ cần cập nhật birthdayDate trong script.js là đồng hồ sẽ chạy đúng.";
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
      `Hôm nay là ${birthdayLabel}, ngày của em rồi. Chúc mừng sinh nhật thật vui nhé.`;
    return;
  }

  if (days === 0) {
    elementMap.countdownMessage.textContent =
      `Chỉ còn một chút nữa là tới ${birthdayLabel}. Mọi lời chúc đều đã sẵn sàng.`;
    return;
  }

  elementMap.countdownMessage.textContent =
    `Đồng hồ đang đếm tới ${birthdayLabel}, nơi mọi điều dễ thương sẽ ghé qua đúng hẹn.`;
}

function createSparkles() {
  const sparkleCount = 16;

  elementMap.sparkles.replaceChildren();

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
    toggle.textContent = isOpen ? "Gấp lại" : "Mở quà";

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
