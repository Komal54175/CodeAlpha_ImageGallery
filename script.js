const images = [
  { file: "nature1.jpg", title: "Mountain View", category: "Nature" },
  { file: "nature2.jpg", title: "Quiet Forest", category: "Nature" },
  { file: "nature3.jpg", title: "Calm River", category: "Nature" },
  { file: "nature4.jpg", title: "Green Valley", category: "Nature" },
  { file: "city1.jpg", title: "City Tower", category: "City" },
  { file: "city2.jpg", title: "Busy Street", category: "City" },
  { file: "city3.jpg", title: "Old Bridge", category: "City" },
  { file: "city4.jpg", title: "Night Skyline", category: "City" },
  { file: "art1.jpg", title: "Colorful Paint", category: "Art" },
  { file: "art2.jpg", title: "Pencil Sketch", category: "Art" },
  { file: "art3.jpg", title: "Abstract Canvas", category: "Art" },
  { file: "art4.jpg", title: "Stone Statue", category: "Art" }
];

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const caption = document.getElementById("lightbox-caption");
const filterButtons = document.querySelectorAll(".filter-btn");

let visible = [];
let currentIndex = 0;

function getSrc(img) {
  return img.file + ".jpg";
}

function renderGallery(filter) {
  visible = images.filter(
    (img) => filter === "all" || img.category === filter
  );
  gallery.innerHTML = "";

  visible.forEach((img, index) => {
    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML =
      '<img src="' + getSrc(img) + '" alt="' + img.title + '" loading="lazy">' +
      '<div class="overlay"><strong>' + img.title + "</strong><span>" + img.category + "</span></div>";
    item.addEventListener("click", () => openLightbox(index));
    gallery.appendChild(item);
  });
}

function showImage() {
  const img = visible[currentIndex];
  lightboxImg.src = getSrc(img);
  lightboxImg.alt = img.title;
  caption.textContent = img.title + " (" + (currentIndex + 1) + "/" + visible.length + ")";
}

function openLightbox(index) {
  currentIndex = index;
  showImage();
  lightbox.classList.add("open");
}

function closeLightbox() {
  lightbox.classList.remove("open");
}

function nextImage() {
  currentIndex = (currentIndex + 1) % visible.length;
  showImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + visible.length) % visible.length;
  showImage();
}

document.getElementById("close").addEventListener("click", closeLightbox);
document.getElementById("next").addEventListener("click", nextImage);
document.getElementById("prev").addEventListener("click", prevImage);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderGallery(btn.dataset.filter);
  });
});

renderGallery("all");
