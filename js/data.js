// js/data.js

// 🔴 1. เอาลิงก์ที่คุณก๊อปจาก Codespace มาวางตรงนี้ (อย่าลืมเติม /events ต่อท้าย)
// ตัวอย่าง: const API_URL = 'https://supreme-space-waddle...app/events';
const API_URL = 'https://obscure-space-goggles-x5gw496j74x9hvrxj-3000.app.github.dev/events'; 

var eventsData = [];

// ข้อมูลภาษา (คงเดิม)
const translations = {
    th: {
        nav_home: "หน้าแรก", nav_calendar: "ปฏิทินกิจกรรม", nav_login: "เข้าสู่ระบบ", btn_submit: "ฝากกิจกรรม",
        header_title: "ตารางกิจกรรม", header_subtitle: "รวมงานวิ่งทั่วไทย", view_list: "รายการ", view_calendar: "ปฏิทิน",
        search_ph: "ค้นหาชื่อรายการ...", filter_month_all: "ทุกเดือน", filter_prov_all: "ทุกจังหวัด", filter_type_all: "ทุกประเภท",
        month_feb: "กุมภาพันธ์", month_mar: "มีนาคม", month_apr: "เมษายน", btn_search: "ค้นหา",
        cal_scroll_hint: "เลื่อนซ้าย-ขวา เพื่อดูตาราง", modal_subtitle: "กิจกรรมทั้งหมดในวันนี้", btn_close: "ปิด",
        btn_apply: "สมัคร / รายละเอียด", btn_detail: "ดูรายละเอียด", status_open: "เปิดรับสมัคร", status_closed: "เต็มแล้ว",
        status_pending: "รอตรวจสอบ", alert_saved: "บันทึกข้อมูลเรียบร้อยแล้ว!", no_event: "ไม่พบกิจกรรม",
        calendar_headers: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
        months_full: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน"],
        label_date: "วันที่", label_loc: "สถานที่", label_dist: "ระยะทาง", label_contact: "ติดต่อผู้จัด", label_status: "สถานะ",
        form_title: "ฝากกิจกรรมใหม่", form_sec_info: "ข้อมูลกิจกรรม", form_name: "ชื่อกิจกรรม", form_date: "วันที่",
        form_province: "จังหวัด", form_type: "ประเภท", form_dist: "ระยะทาง", form_link: "ลิงก์รับสมัคร",
        form_sec_contact: "ข้อมูลผู้ติดต่อ", form_contact_name: "ชื่อผู้ติดต่อ", form_email: "อีเมล", form_tel: "เบอร์โทร",
        btn_cancel: "ยกเลิก", btn_save: "บันทึก"
    },
    en: {
        nav_home: "Home", nav_calendar: "Calendar", nav_login: "Login", btn_submit: "Submit Event",
        header_title: "Event Calendar", header_subtitle: "Running events in Thailand", view_list: "List", view_calendar: "Calendar",
        search_ph: "Search events...", filter_month_all: "All Months", filter_prov_all: "All Provinces", filter_type_all: "All Types",
        month_feb: "February", month_mar: "March", month_apr: "April", btn_search: "Search",
        cal_scroll_hint: "Swipe to view", modal_subtitle: "All events on this day", btn_close: "Close",
        btn_apply: "Register / Info", btn_detail: "Details", status_open: "Open", status_closed: "Closed",
        status_pending: "Pending", alert_saved: "Event saved successfully!", no_event: "No events found",
        calendar_headers: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months_full: ["January", "February", "March", "April", "May", "June"],
        label_date: "Date", label_loc: "Location", label_dist: "Distance", label_contact: "Organizer Contact", label_status: "Status",
        form_title: "Submit New Event", form_sec_info: "Event Information", form_name: "Event Name", form_date: "Date",
        form_province: "Province", form_type: "Type", form_dist: "Distance", form_link: "Registration Link",
        form_sec_contact: "Contact Person", form_contact_name: "Name", form_email: "Email", form_tel: "Phone",
        btn_cancel: "Cancel", btn_save: "Save"
    }
};

// 🔵 ฟังก์ชันดึงข้อมูลจาก Server (GET)
async function fetchEvents() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Cannot connect to server');
        
        const data = await response.json();
        
        // แปลงข้อมูลจาก MongoDB (_id) ให้เป็น id ที่เว็บเราเข้าใจ
        eventsData = data.map(evt => ({
            ...evt,
            id: evt._id, // MongoDB ใช้ _id
            // แปลงค่า Null เป็นข้อความกัน Error
            location_th: evt.location_th || 'N/A',
            location_en: evt.location_en || 'N/A',
            type: evt.type || 'Road',
            image: evt.image || "https://source.unsplash.com/random/800x600/?running",
            status: evt.status || 'open'
        }));

        console.log("Loaded events:", eventsData.length);
        
        // สั่งให้หน้าเว็บวาดใหม่ (ถ้าฟังก์ชันมีอยู่)
        if (typeof renderFeatured === 'function') renderFeatured();
        if (typeof applyFilters === 'function') applyFilters();

    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// เรียกดึงข้อมูลทันทีเมื่อเปิดเว็บ
fetchEvents();

// 🟢 ฟังก์ชันส่งข้อมูลไป Server (POST)
// (ฟังก์ชันนี้จะถูกเรียกจาก calendar.html หรือ index.html)
async function handleFormSubmit() {
    const title = document.getElementById('new-title').value;
    
    // สร้างก้อนข้อมูลเตรียมส่ง
    const newEvent = {
        title_th: title,
        title_en: title, // ใช้ชื่อเดียวกันไปก่อน
        date: document.getElementById('new-date').value,
        location_th: document.getElementById('new-province').value,
        location_en: document.getElementById('new-province').value,
        type: document.getElementById('new-type').value,
        distance: document.getElementById('new-distance').value,
        link: document.getElementById('new-link').value,
        submitter: document.getElementById('new-submitter').value,
        email: document.getElementById('new-email').value,
        phone: document.getElementById('new-phone').value,
        image: "https://source.unsplash.com/random/800x600/?running",
        status: 'pending' // สถานะเริ่มต้น
    };

    try {
        // ยิงข้อมูลไปที่ Server
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent),
        });

        if (response.ok) {
            alert(translations[currentLang]['alert_saved']);
            if(typeof closeSubmitModal === 'function') closeSubmitModal();
            fetchEvents(); // ดึงข้อมูลใหม่มาแสดงทันที
        } else {
            alert('Error saving event');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Cannot connect to server. Check API URL.');
    }
}