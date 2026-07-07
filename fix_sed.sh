#!/bin/bash

# Remove Apache License from all tsx files
find src/ -name "*.tsx" -o -name "*.ts" | xargs sed -i '/^\/\*\* @license SPDX-License-Identifier: Apache-2.0 \*\//d'

# Update image paths
sed -i 's|\./acharya-photo\.jpeg|/acharya-photo.jpeg|g' src/views/HomeView.tsx src/views/AboutView.tsx src/components/MetaTagsManager.tsx
sed -i 's|\./90BC0280-743E-496C-AD5A-10DB96ED68C9\.png|/hero-1.png|g' src/views/HomeView.tsx
sed -i 's|\./BE39A249-BCEF-417F-B31A-70D71B6A709D\.jpeg|/hero-2.jpeg|g' src/views/HomeView.tsx
sed -i 's|\./C2A70D39-41A8-4BC8-B4C6-E11D27F21CA5\.png|/hero-3.png|g' src/views/HomeView.tsx
sed -i 's|\./qr-code\.jpeg|/qr-code.jpeg|g' src/views/HomeView.tsx src/views/DakshinaView.tsx
sed -i 's|\./primary-logo\.png|/primary-logo.png|g' src/components/Logo.tsx src/views/HomeView.tsx src/views/AboutView.tsx src/components/Footer.tsx
sed -i 's|\./horizontal-logo\.PNG|/horizontal-logo.PNG|g' src/components/Logo.tsx src/views/HomeView.tsx src/views/AboutView.tsx src/components/Footer.tsx
sed -i 's|\./symbol-only\.PNG|/symbol-only.PNG|g' src/components/Logo.tsx src/views/HomeView.tsx src/views/AboutView.tsx src/components/Footer.tsx
sed -i 's|\./og-image\.jpg|/acharya-photo.jpeg|g' src/components/MetaTagsManager.tsx

# Remove Institution
sed -i '/Veda Vijnana Gurukulam/d' src/views/HomeView.tsx

# App.tsx HashRouter to BrowserRouter
sed -i 's/HashRouter/BrowserRouter/g' src/App.tsx

# Data.ts changes
sed -i "s/Expected 2026/2026/g" src/data.ts
sed -i "s/value: '500'/value: '500+'/g" src/data.ts
sed -i "s/label: 'Sessions Delivered'/label: 'Classes Completed'/g" src/data.ts

# MetaTagsManager.tsx
sed -i 's/og-image.jpg/acharya-photo.jpeg/g' src/components/MetaTagsManager.tsx

