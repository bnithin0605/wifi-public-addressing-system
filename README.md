# 🎙️ WiFi-Based Public Addressing System (ESP32 + Node.js)

A decentralized, WiFi-based Public Addressing (PA) system designed and deployed to replace traditional amplifier-based broadcasting infrastructure.

This system was successfully installed and actively used in university hostels at **KL University (South India)**, a prestigious private university, enabling real-time announcements across 200+ speaker nodes.

---

## 🚀 Project Overview

Traditional public addressing systems rely on centralized amplifiers and extensive analog wiring, leading to:

- High power consumption
- Complex installation
- Limited scalability
- Single point of failure

This project introduces a **software-defined, distributed PA system** built using ESP32 microcontrollers and a Node.js backend for real-time wireless broadcasting.

The system supports:

- Live microphone broadcasting
- Real-time audio streaming
- Device monitoring
- Scalable distributed speaker nodes
- Centralized administrative control

---

## 🏗️ System Architecture

![WiFi Public Addressing System Architecture](docs/architecture.png)

---

## 🔄 How the System Works

### 1️⃣ Admin Web Dashboard
- Secure login authentication
- Live microphone input
- Broadcast control panel
- Real-time monitoring of speaker nodes
- Displays node status (Online / Offline)

The admin initiates an announcement via the browser interface.

---

### 2️⃣ Node.js Server Layer
- WebSocket server for real-time communication
- Audio streaming engine
- Authentication module
- Device status management
- Runs on a centralized local server

When audio is captured from the admin panel:
- It is streamed in real time via WebSockets
- Audio packets are distributed over WiFi
- Latency is minimal for synchronized playback

---

### 3️⃣ WiFi Network Layer
- Standard TCP/IP over WiFi
- Router distributes streaming packets
- Supports 200+ connected ESP32 devices

This eliminates analog wiring and allows flexible deployment.

---

### 4️⃣ ESP32 Speaker Nodes (200+ Devices)

Each node consists of:

- ESP32 microcontroller
- Amplifier module
- Speaker output
- WiFi connectivity

Each device:
- Receives WebSocket audio stream
- Plays audio in real time
- Sends heartbeat signals to server

This enables:

- Distributed audio playback
- Centralized control
- Fault detection

---

## 📡 Real-Time Broadcasting

The system supports:

- Live announcements using microphone input
- Immediate playback across all connected speakers
- Minimal delay due to WebSocket-based streaming
- Simultaneous synchronized output

This has been actively used in hostel environments for:

- Daily announcements
- Emergency alerts
- Administrative communication

---

## 📊 Device Monitoring & Management

Through the Admin Dashboard:

- All 200+ speaker nodes can be monitored
- Real-time Online/Offline status
- Fault detection
- Network visibility
- Centralized management

This ensures high reliability and rapid troubleshooting.

The system maintained **99.9% uptime** during deployment.

---

## ⚡ Power & Infrastructure Efficiency

Compared to traditional PA systems:

- ~250% reduction in power consumption
- No centralized heavy amplifier setup
- Reduced wiring complexity
- Modular and scalable architecture

---

## 🛠️ Technology Stack

### Embedded Layer
- ESP32
- WiFi communication
- Amplifier modules

### Backend
- Node.js
- WebSockets
- TCP/IP Networking

### Frontend
- HTML
- CSS
- JavaScript

---

## 🎯 Key Achievements

- Successfully deployed in KL University hostels
- 200+ WiFi speaker nodes
- Real-time synchronized audio playback
- Centralized admin monitoring
- Distributed architecture
- Production-level deployment
- 99.9% uptime over extended use

---

## 🏫 Real-World Deployment

Installed and actively used at:

**KL University (South India)**  
Hostel infrastructure for centralized communication

This system transitioned from prototype to real-world deployment, serving a large student population.

---

## 👨‍💻 Author

**Nithin Chakravarthi**  
Research Intern – IERDC  
Embedded Systems & Distributed Backend Development
