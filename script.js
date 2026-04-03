const birthdayConfig = {
  recipientName: "Em",
  fromName: "Hiếu",
  birthdayDate: "2026-04-10",
  heroLead:
    "Hôm nay là ngày để mọi điều dễ thương nhất trên đời tìm đến bạn nhiều hơn một chút.",
  heroNote:
    "Mình làm chiếc landing page nhỏ này để mỗi lần mở ra, bạn sẽ thấy mình được yêu thương, được trân trọng và được chúc mừng thật tử tế.",
  storyIntro:
    "Không phải ngày nào cũng cần thật lớn lao. Chỉ cần hôm nay bạn cười nhiều hơn, thấy lòng nhẹ hơn, và biết rằng có người luôn muốn dành những điều tốt đẹp nhất cho bạn là đủ rồi.",
  finalTitle: "Chúc bạn có một tuổi mới thật rực rỡ",
  finalCopy:
    "Chúc cho những dự định của bạn đều dần thành hình, những điều đang cố gắng sẽ sớm được đền đáp, và trái tim bạn lúc nào cũng đủ bình yên để tận hưởng từng niềm vui nhỏ. Hôm nay và cả những ngày sau nữa, bạn xứng đáng với thật nhiều yêu thương.",
  wishes: [
    {
      title: "Sức khỏe thật tốt",
      text: "Để mỗi ngày thức dậy đều có đủ năng lượng làm điều bạn thích."
    },
    {
      title: "Nhiều điều may mắn",
      text: "Để những cố gắng âm thầm của bạn được gặp đúng thời điểm đẹp."
    },
    {
      title: "Niềm vui thật lâu",
      text: "Để bạn luôn có người cùng cười, cùng đi và cùng nhớ những ngày đặc biệt."
    }
  ],
  moments: [
    {
      title: "Một nụ cười rất sáng",
      text: "Kiểu nụ cười làm cả căn phòng dịu đi và khiến người đối diện tự nhiên muốn tốt hơn."
    },
    {
      title: "Một trái tim biết quan tâm",
      text: "Bạn để ý cả những điều nhỏ xíu, và chính điều đó làm bạn trở nên đặc biệt."
    },
    {
      title: "Một nguồn năng lượng ấm áp",
      text: "Ở cạnh bạn luôn có cảm giác nhẹ nhàng, an toàn và đáng để trân trọng."
    }
  ],
  gifts: [
    {
      icon: "01",
      title: "Lời chúc đầu tiên",
      hint: "Bên trong là một điều giản dị nhưng quan trọng.",
      secret:
        "Chúc bạn luôn là chính mình thật tự tin, thật đẹp và thật vui với hành trình phía trước."
    },
    {
      icon: "02",
      title: "Món quà tinh thần",
      hint: "Mở ra để nhận một lời nhắc nhỏ.",
      secret:
        "Nếu có ngày nào mệt, hãy nhớ bạn không cần hoàn hảo để xứng đáng được yêu thương."
    },
    {
      icon: "03",
      title: "Điều ước bí mật",
      hint: "Cái này dành cho những ước mơ lớn.",
      secret:
        "Mong những mục tiêu bạn đang ôm ấp sẽ gặp đúng cơ hội, đúng người và đúng thời điểm."
    },
    {
      icon: "04",
      title: "Một cái ôm online",
      hint: "Không chạm được, nhưng vẫn có thể cảm nhận.",
      secret:
        "Chiếc site này xin gửi tới bạn một cái ôm thật dài, thật ấm và rất nhiều thương mến."
    }
  ],
  letterTitle: "Sinh nhật vui vẻ nhé",
  letterBody: [
    "Hôm nay là ngày thật đẹp để nói với bạn rằng sự hiện diện của bạn luôn có ý nghĩa đặc biệt.",
    "Mình hy vọng tuổi mới sẽ mang đến cho bạn thật nhiều dịu dàng: công việc suôn sẻ hơn, giấc ngủ ngon hơn, những ngày bớt áp lực hơn và những khoảnh khắc khiến bạn mỉm cười nhiều hơn.",
    "Nếu có điều gì mình muốn gửi vào chiếc thư nhỏ này, thì đó là lời nhắc rằng bạn đã làm rất tốt rồi. Cứ bình tĩnh lớn lên, bình tĩnh hạnh phúc và đừng quên tận hưởng chính ngày của mình nhé."
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
  sparkles: document.getElementById("sparkles")
};

function populateContent() {
  document.title = `Happy Birthday, ${birthdayConfig.recipientName}`;

  elementMap.heroTitle.textContent = `Happy Birthday, ${birthdayConfig.recipientName}`;
  elementMap.heroLead.textContent = birthdayConfig.heroLead;
  elementMap.heroNote.textContent = birthdayConfig.heroNote;
  elementMap.storyIntro.textContent = birthdayConfig.storyIntro;
  elementMap.finalTitle.textContent = birthdayConfig.finalTitle;
  elementMap.finalCopy.textContent = birthdayConfig.finalCopy;
  elementMap.letterTitle.textContent = birthdayConfig.letterTitle;
  elementMap.letterSignature.textContent = `Thương mến, ${birthdayConfig.fromName}`;

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
      <button class="gift-toggle" type="button" data-index="${index}">Mo qua</button>
    `;
    elementMap.giftGrid.appendChild(item);
  });
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
      "Hôm nay là ngày của bạn. Chúc mừng sinh nhật thật vui!";
  } else {
    elementMap.countdownMessage.textContent =
      "Mỗi giây trôi qua đều đang đếm đến một ngày thật đặc biệt.";
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

  elementMap.giftGrid.addEventListener("click", (event) => {
    const toggle = event.target.closest(".gift-toggle");

    if (!toggle) {
      return;
    }

    const card = toggle.closest(".gift-card");
    const isOpen = card.classList.toggle("is-open");
    toggle.textContent = isOpen ? "Đóng lại" : "Mở quà";
  });
}

populateContent();
createSparkles();
bindEvents();
updateCountdown();
setInterval(updateCountdown, 1000);
