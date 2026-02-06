// Tombol "Baca Selengkapnya"
document.querySelectorAll(".read-more").forEach(button => {
  button.addEventListener("click", () => {
    alert("Fitur 'Baca Selengkapnya' akan segera hadir!");
  });
});

// Dark mode toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Cek tema sebelumnya
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});


// Efek Fade-In
const fadeEls = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeEls.forEach(el => observer.observe(el));
let activeVideo = null; // simpan video yang sedang aktif

document.querySelectorAll(".item").forEach(item => {
  const img = item.querySelector("img");

  // pasang event klik awal untuk setiap gambar
  bindImageClick(img);
});

function bindImageClick(img) {
  img.addEventListener("click", () => {
    const videoUrl = img.getAttribute("data-video");

    // kalau ada video lain aktif, kembalikan ke gambar
    if (activeVideo && activeVideo !== img) {
      revertToImage(activeVideo);
    }

    // buat elemen video baru
    const video = document.createElement("video");
    video.src = videoUrl;
    video.controls = true;
    video.autoplay = true;
    video.dataset.thumb = img.src;
    video.dataset.video = videoUrl;

    // klik video → balik ke gambar
    video.addEventListener("click", () => {
      revertToImage(video);
    });

    // ganti gambar dengan video
    img.parentNode.replaceChild(video, img);
    activeVideo = video;
  });
}

// fungsi untuk mengembalikan video ke gambar
function revertToImage(video) {
  const backImg = document.createElement("img");
  backImg.src = video.dataset.thumb;
  backImg.setAttribute("data-video", video.dataset.video);
  backImg.alt = "Gambar";

  // pasang ulang event klik ke gambar
  bindImageClick(backImg);

  video.parentNode.replaceChild(backImg, video);
  activeVideo = null;
}