// All the data for the study page lives in this file.
//
// A question looks like this:
//   { id: 'q1', ch: 1, q: 'The question?', options: ['A', 'B', 'C'], answer: [0], why: 'Short explanation' }
//
//   id      - a unique name for the question (never change it later)
//   ch      - the chapter number (1 to 14)
//   options - the answer choices
//   answer  - a list of the correct option numbers, counting from 0.
//             [0] means the first option is right. [0, 2] means the first and third are right.
//   why     - optional explanation shown after answering
//
// bank.json holds the real exam questions (made by tools/extract-bank-console.js).
// While bank.json is empty, the starter questions below are used instead.

import bank from './bank.json';

export const chapters = [
  { number: 1, name: 'Intro to PC hardware' },
  { number: 2, name: 'PC assembly' },
  { number: 3, name: 'Advanced hardware' },
  { number: 4, name: 'Maintenance and troubleshooting' },
  { number: 5, name: 'Networking concepts' },
  { number: 6, name: 'Applied networking' },
  { number: 7, name: 'Laptops and mobile devices' },
  { number: 8, name: 'Printers' },
  { number: 9, name: 'Virtualization and cloud' },
  { number: 10, name: 'Windows installation' },
  { number: 11, name: 'Windows configuration' },
  { number: 12, name: 'Mobile, Linux and macOS' },
  { number: 13, name: 'Security' },
  { number: 14, name: 'The IT professional' }
];

const starterQuestions = [
  { id: 'q1', ch: 1, q: 'Which type of memory loses its contents when the power is switched off?', options: ['RAM', 'SSD', 'ROM', 'Flash storage'], answer: [0], why: 'RAM is volatile. SSDs, ROM and flash all keep data without power.' },
  { id: 'q2', ch: 2, q: 'What is applied between a CPU and its heat sink to improve heat transfer?', options: ['Thermal paste', 'Antistatic spray', 'Double-sided tape', 'Isopropyl alcohol'], answer: [0], why: 'Thermal paste fills tiny gaps so heat moves into the heat sink.' },
  { id: 'q3', ch: 3, q: 'Which RAID level spreads data and parity across at least three drives?', options: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 10'], answer: [2], why: 'RAID 5 survives one drive failure. RAID 1 mirrors two drives, and RAID 0 has no redundancy.' },
  { id: 'q4', ch: 4, q: 'Which tool checks that a network cable is wired correctly end to end?', options: ['Cable tester', 'Antistatic mat', 'POST card', 'Compressed air'], answer: [0], why: 'A cable tester checks each wire for continuity and correct pin order.' },
  { id: 'q5', ch: 5, q: 'Which device forwards frames using MAC addresses?', options: ['Switch', 'Hub', 'Firewall', 'Modem'], answer: [0], why: 'A switch learns MAC addresses and sends frames out only the right port.' },
  { id: 'q6', ch: 5, q: 'Which two are default ports for web traffic? (Choose two.)', options: ['80', '22', '443', '25'], answer: [0, 2], why: 'HTTP is 80 and HTTPS is 443. SSH is 22 and SMTP is 25.' },
  { id: 'q7', ch: 6, q: 'A PC shows an address starting 169.254. What most likely happened?', options: ['No DHCP server answered', 'DNS is misconfigured', 'NAT is switched off', 'The gateway is correct'], answer: [0], why: 'With no DHCP reply, Windows gives itself an APIPA address in 169.254.0.0/16.' },
  { id: 'q8', ch: 7, q: 'Which memory module type do most laptops use?', options: ['SODIMM', 'Full-size DIMM', 'RIMM', 'SIMM'], answer: [0], why: 'SODIMM is the small form factor for laptops.' },
  { id: 'q9', ch: 8, q: 'In laser printing, which step uses heat and pressure to bond toner to the paper?', options: ['Fusing', 'Charging', 'Exposing', 'Developing'], answer: [0], why: 'The fuser melts the toner into the paper.' },
  { id: 'q10', ch: 9, q: 'Which hypervisor type runs directly on the hardware with no host OS?', options: ['Type 1 (bare metal)', 'Type 2 (hosted)', 'An emulator', 'A container engine'], answer: [0], why: 'Type 1 sits on the hardware. Type 2 runs as an app inside an existing OS.' },
  { id: 'q11', ch: 10, q: 'Which Windows file system supports permissions, encryption and files over 4 GB?', options: ['NTFS', 'FAT32', 'exFAT', 'CDFS'], answer: [0], why: 'NTFS adds permissions and encryption. FAT32 has a 4 GB file limit.' },
  { id: 'q12', ch: 11, q: 'Which Windows tool shows running processes with live CPU, memory and disk use?', options: ['Task Manager', 'Device Manager', 'Disk Cleanup', 'Event Viewer'], answer: [0], why: 'Task Manager shows live usage. Event Viewer shows logs.' },
  { id: 'q13', ch: 12, q: 'Which Linux command changes the permissions on a file?', options: ['chmod', 'chown', 'ls', 'grep'], answer: [0], why: 'chmod changes permissions. chown changes the owner.' },
  { id: 'q14', ch: 13, q: 'Someone follows an employee through a secured door without using a badge. What is this?', options: ['Tailgating', 'Phishing', 'Shoulder surfing', 'Spoofing'], answer: [0], why: 'Tailgating is slipping in behind an authorised person.' },
  { id: 'q15', ch: 13, q: 'Which is an example of multi-factor authentication?', options: ['Password plus a code from a phone app', 'Two different passwords', 'Password plus a security question', 'A longer password'], answer: [0], why: 'MFA mixes factor types: something you know, have or are.' },
  { id: 'q16', ch: 14, q: 'A customer is angry about a long repair. What is the best first response?', options: ['Let them explain without interrupting, then acknowledge the problem', 'Explain why the delay was not your fault', 'Transfer them to a colleague', 'Ask them to calm down'], answer: [0], why: 'Listen first and acknowledge the problem.' }
];

// Use the real exam questions if bank.json has any, otherwise the starter ones.
// The filter hides any imported question where no correct answer was detected.
const allQuestions = bank.length > 0 ? bank : starterQuestions;
export const questions = allQuestions.filter((q) => q.answer.length > 0);

// Memory tricks shown on the Memory tab
export const mnemonics = [
  { title: 'Laser printing steps', hook: 'Please Cut Every Dull Toenail For Comfort', detail: 'Processing, Charging, Exposing, Developing, Transferring, Fusing, Cleaning.' },
  { title: 'OSI layers (bottom to top)', hook: 'Please Do Not Throw Sausage Pizza Away', detail: 'Physical, Data link, Network, Transport, Session, Presentation, Application.' },
  { title: 'Troubleshooting process', hook: 'Is That The Plan? Verify, Document.', detail: 'Identify, Theory of cause, Test theory, Plan and implement, Verify, Document.' },
  { title: 'Common ports', hook: 'Secure before plain: SSH 22, Telnet 23', detail: 'FTP 20/21, SSH 22, Telnet 23, SMTP 25, DNS 53, HTTP 80, POP3 110, IMAP 143, HTTPS 443, RDP 3389.' },
  { title: 'RAID levels', hook: 'Zero is a hero for speed, One is the one that mirrors', detail: 'RAID 0 striping (2 drives). RAID 1 mirroring (2). RAID 5 striping with parity (3). RAID 6 double parity (3+). RAID 10 mirror plus stripe (4).' },
  { title: 'ACPI power states', hook: 'S0 on, S5 off, higher number = deeper sleep', detail: 'S0 on. S1 CPU and RAM powered, unused devices off. S2 CPU off, RAM refreshed. S3 suspend: CPU off, RAM on slow refresh. S4 hibernate: RAM saved to disk. S5 off.' }
];
