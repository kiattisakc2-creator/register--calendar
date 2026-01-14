// js/components.js

function loadComponents() {
    // 1. สร้าง Navbar
    const navbarHTML = `
    <nav class="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div class="container-wide px-4 sm:px-6 lg:px-8 max-w-[95%] mx-auto">
            <div class="flex justify-between h-16 items-center">
                <a href="index.html" class="flex items-center gap-3 cursor-pointer decoration-0">
                    <div class="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">A</div>
                    <span class="font-bold text-xl text-slate-800">Action.in.th</span>
                </a>
                
                <div class="flex items-center space-x-4">
                    <div class="hidden md:flex items-center space-x-3">
                        <a href="index.html" class="text-slate-500 hover:text-brand-600 px-3 py-2 text-sm font-medium">หน้าแรก</a>
                        <a href="index.html" class="text-brand-600 bg-brand-50 px-3 py-2 text-sm font-medium rounded-lg">ปฏิทินกิจกรรม</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    `;

    // 2. สร้าง Footer
    const footerHTML = `
    <footer class="bg-white border-t border-slate-200 py-6 mt-auto text-center text-slate-400 text-sm">
        &copy; 2026 Action.in.th - Designed for Runners
    </footer>
    `;

    // 3. ฉีดโค้ดเข้าไปใน HTML (ถ้ามี Element มารอรับ)
    if(document.getElementById('navbar-app')) document.getElementById('navbar-app').innerHTML = navbarHTML;
    if(document.getElementById('footer-app')) document.getElementById('footer-app').innerHTML = footerHTML;
}

// เรียกทำงานเมื่อโหลดหน้าเสร็จ
document.addEventListener('DOMContentLoaded', loadComponents);