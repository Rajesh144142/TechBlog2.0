# EC2 Deployment Guide

## Method 1: Docker Compose (Recommended) 🐳

Deploying the AiBlog application to **AWS EC2** with Docker Compose. This is the preferred method as it manages the database, backend, and frontend as a single unit.

---

## Method 2: Manual Deployment with PM2 (Alternative) 🚀

Use this method if you want to save even more memory by not using Docker, or if you prefer managing processes individually.

### Prerequisites (PM2)
- Node.js 20+
- Python 3.11+
- MongoDB installed on EC2 (Manually)

### PM2 Steps

#### 1. Install PM2 Globally
```bash
sudo npm install -g pm2
```

#### 2. Backend Setup (FastAPI)
```bash
cd ~/TechBlog2.0/server
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Start backend with PM2
pm2 start "venv/bin/uvicorn app:app --host 0.0.0.0 --port 8000" --name aiblog-backend
```

#### 3. Frontend Setup (React/Vite)
```bash
cd ~/TechBlog2.0/client
npm install
npm run build
# Serve the static files using PM2
pm2 serve dist 3000 --name aiblog-frontend --spa
```

#### 4. Manage Processes
```bash
# View all processes
pm2 status

# Monitor CPU/RAM in real-time (Visualization)
pm2 monit

# View logs
pm2 logs

# Ensure apps restart on server reboot
pm2 save
pm2 startup
```

---

## Prerequisites (Common)
- AWS EC2 instance (Amazon Linux 2023 / 2)
- SSH access to your EC2 instance
- Security Group with ports 22 (SSH), 3000 (App), 8000 (API) open

## Docker Steps

### Step 1: Connect to EC2

```bash
ssh -i "C:\path\to\your\demo-keypair.pem" ec2-user@<your-ec2-ip>
```

**Common Issue:** "Identity file not accessible"  
**Solution:** Provide the full path to your `.pem` key file.

---

### Step 2: Check Docker Installation

```bash
docker --version
```

Docker should already be installed. If not, install with:
```bash
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
```

---

### Step 3: Install Docker Compose

```bash
docker-compose --version
```

**Issue:** Docker Compose not found.  
**Solution:** Install it manually:

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

**Note:** Use `docker-compose` (with hyphen), not `docker compose`.

---

### Step 4: Install Docker Buildx

**Issue:** `compose build requires buildx 0.17 or later`  
**Solution:** Install buildx manually:

```bash
mkdir -p ~/.docker/cli-plugins
curl -SL https://github.com/docker/buildx/releases/download/v0.17.1/buildx-v0.17.1.linux-amd64 -o ~/.docker/cli-plugins/docker-buildx
chmod +x ~/.docker/cli-plugins/docker-buildx
```

Then copy for root (since we use `sudo`):

```bash
sudo mkdir -p /root/.docker/cli-plugins
sudo cp ~/.docker/cli-plugins/docker-buildx /root/.docker/cli-plugins/docker-buildx
```

---

### Step 5: Clone the Repository

```bash
git clone https://github.com/Rajesh144142/TechBlog2.0.git
cd TechBlog2.0
```

---

### Step 6: Create Environment File

```bash
nano server/.env
```

Add:
```
MONGODB_URL=mongodb://mongodb:27017/aiblog
JWT_SECRET=your-secret-key-here
```

Save with `Ctrl+O`, Enter, then `Ctrl+X`.

---

### Step 7: Build and Run Containers

```bash
sudo docker-compose up --build -d
```

**Issue:** `Bind for 0.0.0.0:80 failed: port is already allocated`  
**Solution:** Port 80 was in use. Changed to port 3000 in `docker-compose.yml`:

```yaml
ports:
  - "3000:80"
```

Then restart:
```bash
sudo docker-compose up -d
```

---

### Step 8: Seed the Database (Optional)

**Issue:** Running `python seed_blogs.py` directly on EC2 fails with `python: command not found`  
**Why:** Python is installed inside the Docker container, not on the EC2 host.  
**Solution:** Run the seed script inside the server container:

```bash
sudo docker exec -it aiblog-server python seed_blogs.py
```

---

### Step 9: Access Your Application

Open in browser:
```
http://<your-ec2-ip>:3000
```

**Important:** Make sure port 3000 is open in your EC2 Security Group:
- AWS Console → EC2 → Security Groups
- Add inbound rule: Custom TCP, Port 3000, Source 0.0.0.0/0

---

### Step 10: Optimize Memory (Fix Build Crashes) 🚀

**The Problem:**  
AWS EC2 `t2.micro` instances have only **1GB of RAM**. Modern frontend build processes (like Vite + TypeScript) are memory-intensive. When building the application, the server may run out of memory, causing the build to fail or the entire server to freeze (Out of Memory/OOM).

**The Solution:**  
We add **Swap Space**. Swap space uses a portion of the hard drive to act as "emergency RAM." This allows the build to complete successfully without needing a more expensive instance.

**Run these commands to add 2GB of Swap Space:**

```bash
# 1. Create a 2GB swap file on the hard drive
sudo fallocate -l 2G /swapfile

# 2. Set the correct permissions (only root can read/write)
sudo chmod 600 /swapfile

# 3. Format the file as a swap area
sudo mkswap /swapfile

# 4. Enable the swap file immediately
sudo swapon /swapfile

# 5. Make it permanent (it will survive a server reboot)
echo '/swapfile swap swap defaults 0 0' | sudo tee -a /etc/fstab
```

*Result: Your server now has 1GB RAM + 2GB Swap = 3GB total available memory.*

---

### Step 11: Monitoring & Verification (HTOP & FREE) 📊

After setting up Swap space, you need a way to verify it is working and monitor your server's health during builds.

#### 1. Quick Check (`free -h`)
**Why we use it:** To get an instant snapshot of your memory.
**When to use it:** Right after setting up swap or if you suspect the server is sluggish.
```bash
free -h
```
*Look for the "Swap" row. It should show 2.0Gi.*

#### 2. Real-Time Visualization (`htop`)
**Why we use it:** It provides a live, color-coded dashboard of your CPU, RAM, and Swap usage.
**Why it is required:** During a `docker build`, you need to see if the server is reaching its limits. It helps you "see" the overflow into Swap space in real-time.

**Install it:**
```bash
sudo yum install htop -y
```

**Run it:**
```bash
htop
```

**What to watch for:**
- **Mem bar:** Will fill up first (up to 949MB).
- **Swp bar:** Will start filling up only when Mem is full. This is your "Safety Net" in action!
- **CPU:** Shows which process (like `node` or `mongodb`) is using the most power.

---

## Useful Commands

```bash
# View running containers
sudo docker ps

# View logs
sudo docker-compose logs -f

# Restart containers
sudo docker-compose restart

# Stop containers
sudo docker-compose down

# Pull latest code and rebuild
git pull
sudo docker-compose up --build -d
```
