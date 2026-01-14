// js/data.js

// 1. เก็บข้อมูลงานวิ่ง (Global Variable)
var eventsData = [];
const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน"];

// 2. ฟังก์ชันสร้างข้อมูลจำลอง (เหมือนเดิมเป๊ะ)
function generateEvents() {
    eventsData = []; // ล้างข้อมูลเก่าก่อนสร้างใหม่
    
    const provinces = [
        {th: "เชียงใหม่", en: "Chiang Mai"}, 
        {th: "ชลบุรี", en: "Chonburi"}, 
        {th: "ภูเก็ต", en: "Phuket"}, 
        {th: "ราชบุรี", en: "Ratchaburi"}, 
        {th: "กาญจนบุรี", en: "Kanchanaburi"}, 
        {th: "กรุงเทพ", en: "Bangkok"}, 
        {th: "ขอนแก่น", en: "Khon Kaen"}
    ];
    const types = ["Trail", "Road", "Fun Run", "Triathlon"];
    
    // สร้างข้อมูลเดือน 1-3 ปี 2026
    for (let month = 1; month <= 3; month++) {
        const daysInMonth = new Date(2026, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `2026-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            let eventCount = 0;
            const date = new Date(2026, month, day);
            
            if (date.getDay() === 0) eventCount = Math.floor(Math.random() * 8) + 8;
            else if (date.getDay() === 6) eventCount = Math.floor(Math.random() * 3) + 1;
            else eventCount = Math.random() > 0.8 ? 1 : 0;

            for (let i = 1; i <= eventCount; i++) {
                const provObj = provinces[Math.floor(Math.random() * provinces.length)];
                const type = types[Math.floor(Math.random() * types.length)];
                const isOpen = Math.random() > 0.2; 
                
                // กำหนดภาษา (ใช้ th เป็นหลักในไฟล์นี้)
                const provName = provObj.th;
                
                eventsData.push({
                    id: `evt-2026-${month}-${day}-${i}`, // ID สำคัญมาก ต้องไม่ซ้ำ
                    title: `${provName} ${type} Challenge ${month+1}.${i}`,
                    date: dateStr,
                    location: provName,
                    type: type,
                    distance: type === "Trail" ? "50K" : "10K",
                    image: `https://source.unsplash.com/random/800x600/?running,${type},${i}`,
                    status: isOpen ? 'open' : 'closed',
                    label: isOpen ? 'เปิดรับสมัคร' : 'ปิดรับสมัคร',
                    link: '#',
                    submitter: 'System',
                    email: '-',
                    phone: '-'
                });
            }
        }
    }
    console.log("Data Generated:", eventsData.length, "events");
}

// สั่งให้สร้างข้อมูลทันทีที่ไฟล์นี้ถูกโหลด
generateEvents();