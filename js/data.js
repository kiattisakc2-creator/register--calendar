// js/data.js

// 1. ตัวแปรเก็บข้อมูล (Global)
var eventsData = [];

// 2. ข้อมูลภาษา (Static Text)
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
        label_date: "วันที่", label_loc: "สถานที่", label_dist: "ระยะทาง", label_contact: "ติดต่อผู้จัด", label_status: "สถานะ"
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
        label_date: "Date", label_loc: "Location", label_dist: "Distance", label_contact: "Organizer Contact", label_status: "Status"
    }
};

// 3. สร้างข้อมูลจำลอง (Mock Data)
function generateEvents() {
    eventsData = [];
    const provinces = [
        {th: "เชียงใหม่", en: "Chiang Mai"}, {th: "ชลบุรี", en: "Chonburi"}, {th: "ภูเก็ต", en: "Phuket"},
        {th: "ราชบุรี", en: "Ratchaburi"}, {th: "กาญจนบุรี", en: "Kanchanaburi"}, {th: "กรุงเทพ", en: "Bangkok"}
    ];
    const types = ["Trail", "Road", "Fun Run", "Triathlon"];
    
    for (let month = 1; month <= 3; month++) {
        const daysInMonth = new Date(2026, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `2026-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const date = new Date(2026, month, day);
            let eventCount = 0;
            
            if (date.getDay() === 0) eventCount = Math.floor(Math.random() * 5) + 3;
            else if (date.getDay() === 6) eventCount = Math.floor(Math.random() * 3) + 1;
            else eventCount = Math.random() > 0.8 ? 1 : 0;

            for (let i = 1; i <= eventCount; i++) {
                const prov = provinces[Math.floor(Math.random() * provinces.length)];
                const type = types[Math.floor(Math.random() * types.length)];
                const isOpen = Math.random() > 0.2;
                
                eventsData.push({
                    id: `evt-${month}-${day}-${i}`,
                    title_th: `${prov.th} ${type} ชาเลนจ์ 2026`,
                    title_en: `${prov.en} ${type} Challenge 2026`,
                    date: dateStr,
                    location_th: prov.th,
                    location_en: prov.en,
                    type: type,
                    distance: type === "Trail" ? "50K, 25K" : "10K, 5K",
                    image: `https://source.unsplash.com/random/800x600/?running,${type},${i}`,
                    status: isOpen ? 'open' : 'closed',
                    link: '#',
                    submitter: 'Official Organizer', 
                    email: 'contact@running.com', 
                    phone: '02-xxx-xxxx'
                });
            }
        }
    }
}
generateEvents();