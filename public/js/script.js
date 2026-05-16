// public/js/dashboard.js

document.addEventListener("DOMContentLoaded", () => {
  // 1. Ambil Elemen & Data
  const dashboardData = document.getElementById("dashboard-data");
  const linkForm = document.getElementById("linkForm");
  const btnToggle = document.getElementById("btnToggle");
  const circle = document.getElementById("toggleCircle");
  const statusText = document.getElementById("statusText");

  // Inisialisasi state
  let currentStatus = Number(dashboardData.dataset.status);
  const userName = dashboardData.dataset.userName;

  // 2. Tampilkan Welcome Message
  setTimeout(() => {
    showToast(`Selamat datang di AKyuarB, ${userName}!`);
  }, 500);

  // 3. Event Listener untuk Update Link
  if (linkForm) {
    linkForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = document.getElementById("btnSubmit");
      const text = document.getElementById("btnText");
      const spinner = document.getElementById("spinner");
      const linkValue = document.getElementById("inputLink").value;

      btn.disabled = true;
      text.classList.add("hidden");
      spinner.classList.remove("hidden");

      try {
        const response = await fetch("/dashboard/link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ link: linkValue }),
        });

        if (response.ok) {
          showToast("Link tujuan berhasil diperbarui!");
        } else {
          showToast("Gagal memperbarui link", "error");
        }
      } catch (err) {
        showToast("Terjadi kesalahan koneksi", "error");
      } finally {
        btn.disabled = false;
        text.classList.remove("hidden");
        spinner.classList.add("hidden");
      }
    });
  }

  // 4. Event Listener untuk Toggle Status
  if (btnToggle) {
    btnToggle.addEventListener("click", async () => {
      const newStatus = currentStatus === 1 ? 0 : 1;

      // Optimistic UI Update
      btnToggle.classList.toggle("bg-blue-600");
      btnToggle.classList.toggle("bg-slate-300");
      circle.classList.toggle("translate-x-6");
      circle.classList.toggle("translate-x-1");

      try {
        const response = await fetch("/dashboard/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
          currentStatus = newStatus;
          statusText.innerText = currentStatus === 1 ? "Aktif" : "Nonaktif";
          showToast(
            currentStatus === 1
              ? "QR Code diaktifkan"
              : "QR Code dinonaktifkan",
          );
        } else {
          throw new Error();
        }
      } catch (err) {
        // Rollback UI jika gagal
        btnToggle.classList.toggle("bg-blue-600");
        btnToggle.classList.toggle("bg-slate-300");
        circle.classList.toggle("translate-x-6");
        circle.classList.toggle("translate-x-1");
        showToast("Gagal mengubah status", "error");
      }
    });
  }
});

// Fungsi showToast tetap di luar atau di dalam DOMContentLoaded juga bisa
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  const bgColor = type === "success" ? "bg-emerald-500" : "bg-red-500";

  toast.className = `${bgColor} text-white px-6 py-3 rounded-2xl shadow-xl transform transition-all duration-300 translate-y-10 opacity-0 flex items-center justify-between gap-4 min-w-[280px]`;
  toast.innerHTML = `
        <span class="font-medium">${message}</span>
        <button onclick="this.parentElement.remove()" class="text-white/80 hover:text-white text-xl font-bold">&times;</button>
    `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.remove("translate-y-10", "opacity-0"), 10);
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
