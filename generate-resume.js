import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const doc = new PDFDocument({
    margin: 40,
    size: 'A4'
});

const outputPath = path.join(__dirname, 'public', 'resume.pdf');
doc.pipe(fs.createWriteStream(outputPath));

// Header
doc.fontSize(20).font('Helvetica-Bold').text('MUHAMMAD ZAID YOUSUF', { align: 'center' });
doc.fontSize(10).font('Helvetica').text('Karachi, Pakistan | 03118232204 | zaidzai637@gmail.com', { align: 'center' });
doc.moveDown(0.5);

// Professional Summary
doc.fontSize(12).font('Helvetica-Bold').text('PROFESSIONAL SUMMARY');
doc.fontSize(10).font('Helvetica').text('Motivated Web Developer and 5th-semester student. Skilled in full-stack development with a focus on C#, ASP.NET Core MVC, and SQL Server. Currently gaining hands-on experience as a Teaching Intern at Aptech.', { align: 'left' });
doc.moveDown(0.5);

// Technical Skills
doc.fontSize(12).font('Helvetica-Bold').text('TECHNICAL SKILLS');
const skills = [
    'Backend Development: C#, ASP.NET Core MVC, SQL Server 2019',
    'Frontend Development: Angular, HTML, CSS, JavaScript, Bootstrap, React (In Progress)',
    'Key Skills: DOM Manipulation, Responsive Design, Version Control (Git)',
    'IT Support: Software Installation, System Maintenance & Troubleshooting'
];
skills.forEach(skill => {
    doc.fontSize(10).font('Helvetica').text('• ' + skill);
});
doc.moveDown(0.5);

// Professional Experience
doc.fontSize(12).font('Helvetica-Bold').text('PROFESSIONAL EXPERIENCE');
doc.fontSize(10).font('Helvetica-Bold').text('Teaching Intern | Aptech Computer Education (Nov 2025 – Present | 3 Months)');
const expPoints = [
    'Conducting training sessions on Web Fundamentals, C#, and SQL Server.',
    'Instructing students in MS Office Suite (Word, Excel, PowerPoint).',
    'Teaching design tools including CorelDRAW and Adobe Photoshop.',
    'Focusing on practical learning and software troubleshooting.'
];
expPoints.forEach(point => {
    doc.fontSize(10).font('Helvetica').text('• ' + point);
});
doc.moveDown(0.5);

// Education
doc.fontSize(12).font('Helvetica-Bold').text('EDUCATION');
const education = [
    'Web Development Diploma (In Progress) – Aptech Computer Education',
    'HSC (Intermediate) – Aisha Bhawany College (2024)',
    'SSC (Matriculation) – Karachi Board (2021)'
];
education.forEach(edu => {
    doc.fontSize(10).font('Helvetica').text('• ' + edu);
});
doc.moveDown(0.5);

// Computer Skills
doc.fontSize(12).font('Helvetica-Bold').text('COMPUTER SKILLS');
const computerSkills = [
    'Operating Systems: Windows 7 & 11 (Professional Use)',
    'Office Suite: Expert in MS Word, Excel, PowerPoint, and Outlook',
    'Media Tools: Photo & Video Editing Tools'
];
computerSkills.forEach(cs => {
    doc.fontSize(10).font('Helvetica').text('• ' + cs);
});

doc.end();

console.log(`Resume PDF generated at: ${outputPath}`);
