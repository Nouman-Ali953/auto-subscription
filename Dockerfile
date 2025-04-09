# # Start from a lightweight Node image
# FROM node:16-slim

# # 1) Skip downloading Chromium via Puppeteer since we'll install it ourselves
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# # 2) Install any needed system dependencies
# #    (We'll install 'chromium' and a few libraries that Chrome/Chromium typically needs)
# RUN apt-get update && apt-get install -y \
#   chromium \
#   # The libraries below are commonly needed by Chromium for fonts, sound, etc.
#   libnss3 \
#   libatk-bridge2.0-0 \
#   libatk1.0-0 \
#   libdrm-dev \
#   libx11-xcb1 \
#   libxcomposite1 \
#   libxdamage1 \
#   libxfixes3 \
#   libxrandr2 \
#   libgbm-dev \
#   libasound2 \
#   libpangocairo-1.0-0 \
#   libpango-1.0-0 \
#   libcairo2 \
#   fonts-liberation \
#   gconf-service \
#   libappindicator1 \
#   libxcb-dri3-0 \
#   && rm -rf /var/lib/apt/lists/*

# # 3) Create app directory
# WORKDIR /app

# # 4) Copy package files and install dependencies
# COPY package*.json ./
# RUN npm install

# # 5) Copy the rest of the app files
# COPY . .

# # 6) (Optional) If you want to run the server on port 3000
# EXPOSE 3000

# # 7) Tell Puppeteer where to find Chromium
# #    This path can vary depending on the distro. For Debian-slim, it's typically /usr/bin/chromium
# ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# # 8) Start the Node server
# CMD ["node", "index.js"]


FROM node:16-slim

# Skip downloading Chromium via Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install packages: chromium, Xvfb, and a lightweight VNC server
RUN apt-get update && apt-get install -y \
    chromium \
    libnss3 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libdrm-dev \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm-dev \
    libasound2 \
    libpangocairo-1.0-0 \
    libpango-1.0-0 \
    libcairo2 \
    fonts-liberation \
    gconf-service \
    libappindicator1 \
    libxcb-dri3-0 \
    xvfb \
    x11vnc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# We'll still define PUPPETEER_EXECUTABLE_PATH
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

EXPOSE 3000
# Expose a VNC port as well (like 5900)
EXPOSE 5900

# 1) Start Xvfb on display :99
# 2) Launch x11vnc on the same display so we can connect to it
# 3) Finally start our Node server
CMD Xvfb :99 -screen 0 1280x720x24 & \
    x11vnc -display :99 -nopw -listen 0.0.0.0 -xkb -forever & \
    node index.js
