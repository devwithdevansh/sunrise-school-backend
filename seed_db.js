const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './.env' });

const Notice = require('./models/Notice');
const Result = require('./models/Result');
const Inquiry = require('./models/Inquiry');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected for Seeding...'))
  .catch(err => console.log(err));

const MOCK_NOTICES = [
  {
    title: "Urgent: School Closure due to Heavy Rainfall",
    date: "May 04, 2026",
    category: "General",
    isPinned: true,
    content: "Please be informed that the school will remain closed tomorrow due to the red alert issued by the meteorological department for Rajkot. All scheduled unit tests will be postponed, and the new dates will be announced shortly. Stay safe.",
    attachment: null,
  },
  {
    title: "Term 2 Final Examination Timetable",
    date: "May 02, 2026",
    category: "Exams",
    isPinned: true,
    content: "The official timetable for the Term 2 Final Examinations for classes 1 through 12 has been released. Examinations will commence from the 20th of May. Please download the attached PDF for detailed dates, subjects, and timings.",
    attachment: { name: "Term2_Timetable.pdf", size: "1.2 MB" },
  },
  {
    title: "Annual Sports Meet 2026 Registration",
    date: "Apr 28, 2026",
    category: "Events",
    isPinned: false,
    content: "Registration for the upcoming Annual Sports Meet is now open. Students interested in athletics (100m, 200m, 400m), team sports (Basketball, Volleyball), and relay races must submit their names to their respective House Captains by the end of this week. Trials will begin next Monday.",
    attachment: null,
  }
];

const MOCK_RESULTS = [
  // 10 EM
  { title: 'Class 10 EM — Board Results', academicYear: '2024-25', classLevel: '10 EM', imageSrc: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop' },
  { title: 'School Toppers — Group Photo', academicYear: '2024-25', classLevel: '10 EM', imageSrc: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop' },
  { title: 'Annual Results Ceremony', academicYear: '2024-25', classLevel: '10 EM', imageSrc: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1000&auto=format&fit=crop' },
  // 10 GM
  { title: 'ધોરણ ૧૦ ગુજરાતી માધ્યમ — બોર્ડ પરિણામ', academicYear: '2024-25', classLevel: '10 GM', imageSrc: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1000&auto=format&fit=crop' },
  { title: 'તેજસ્વી તારલાઓ — સમૂહ તસવીર', academicYear: '2024-25', classLevel: '10 GM', imageSrc: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000&auto=format&fit=crop' },
  // 12 Commerce
  { title: 'Class 12 Commerce — Board Results', academicYear: '2024-25', classLevel: '12 Commerce', imageSrc: 'https://images.unsplash.com/photo-1513258496099-481a8041cb15?q=80&w=1000&auto=format&fit=crop' },
  { title: 'Commerce Toppers — Group Photo', academicYear: '2024-25', classLevel: '12 Commerce', imageSrc: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop' }
];

const MOCK_INQUIRIES = [
  { studentName: 'Aarav Mehta', parentName: 'Sanjay Mehta', phone: '+91 98250 12345', email: 'aarav@example.com', class: 'Class 6-10', status: 'New', message: 'Interested in science stream for class 8.' },
  { studentName: 'Isha Patel', parentName: 'Deepak Patel', phone: '+91 94260 67890', email: 'isha@example.com', class: 'KG', status: 'Replied', message: 'Wanted to know about transport facilities.' }
];

const seedDB = async () => {
  try {
    // Clear Existing
    await Notice.deleteMany({});
    await Result.deleteMany({});
    await Inquiry.deleteMany({});
    console.log('Existing Data Cleared...');

    // Insert New Data
    await Notice.insertMany(MOCK_NOTICES);
    await Result.insertMany(MOCK_RESULTS);
    await Inquiry.insertMany(MOCK_INQUIRIES);
    console.log('Dummy Data Seeded Successfully!');

    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

seedDB();
