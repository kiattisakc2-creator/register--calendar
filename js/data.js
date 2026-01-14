// js/data.js

// ประกาศตัวแปร Global
var eventsData = [];

// Config ภาษาสำหรับข้อมูล
const monthNamesData = {
    th: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน"],
    en: ["January", "February", "March", "April", "May", "June"]
};

// ฟังก์ชันสร้างข้อมูล (เรียกใช้ได้ทุกหน้า)
function generateEvents() {
    eventsData = []; // ล้างค่าเก่า
    
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
            
            // Logic สุ่มจำนวนงาน
            let eventCount = 0;
            const date = new Date(2026, month, day);
            if (date.getDay() === 0) eventCount = Math.floor(Math.random() * 5) + 5; // วันอาทิตย์เยอะหน่อย
            else if (date.getDay() === 6) eventCount = Math.floor(Math.random() * 3) + 1;
            else eventCount = Math.random() > 0.8 ? 1 : 0;

            for (let i = 1; i <= eventCount; i++) {
                const provObj = provinces[Math.floor(Math.random() * provinces.length)];
                const type = types[Math.floor(Math.random() * types.length)];
                const isOpen = Math.random() > 0.2; 
                
                // สร้าง ID ที่ไม่ซ้ำกัน เพื่อใช้ลิงก์หากัน
                const id = `evt-${month}-${day}-${i}`; 

                eventsData.push({
                    id: id,
                    title_th: `${provObj.th} ${type} ชาเลนจ์ ${month+1}.${i}`,
                    title_en: `${provObj.en} ${type} Challenge ${month+1}.${i}`,
                    date: dateStr,
                    location_th: provObj.th,
                    location_en: provObj.en,
                    type: type,
                    distance: type === "Trail" ? "50K, 25K" : "10K, 5K",
                    image: `https://source.unsplash.com/random/800x600/?running,${type},${i}`,
                    status: isOpen ? 'open' : 'closed',
                    submitter: 'System',
                    email: 'contact@action.in.th'
                });
            }
        }
    }
    console.log("Data Generated:", eventsData.length, "events");
}

// สร้างข้อมูลทันที
generateEvents();