#!/bin/bash

# Footer.tsx
sed -i 's/A Living Gurukula brought/A Living tradition brought/g' src/components/Footer.tsx
sed -i 's/with Gurukula purity/with traditional purity/g' src/components/Footer.tsx

# CommonCTA.tsx
sed -i 's/trained Gurukula scholar/trained scholar/g' src/components/CommonCTA.tsx

# FAQ.tsx
sed -i 's/traditional Gurukula pedagogy/traditional pedagogy/g' src/components/FAQ.tsx

# AdminView.tsx
sed -i 's/Vishweshwara Sanskrit Gurukula/Vishweshwara Sanskrit/g' src/views/AdminView.tsx
sed -i 's/joining the Gurukula/joining/g' src/views/AdminView.tsx

# AboutView.tsx
sed -i 's/traditional Gurukula format/traditional format/g' src/views/AboutView.tsx
sed -i 's/vow of a Gurukula resident/vow/g' src/views/AboutView.tsx
sed -i 's/Traditional Gurukulam/a traditional setting/g' src/views/AboutView.tsx
sed -i 's/instruction at Gurukula/instruction/g' src/views/AboutView.tsx
sed -i 's/Traditional Gurukula learning/Traditional learning/g' src/views/AboutView.tsx
sed -i 's/Digital Gurukula/Digital Sanctuary/g' src/views/AboutView.tsx
sed -i 's/rigorous Gurukula disciplines/rigorous disciplines/g' src/views/AboutView.tsx

# LandingView.tsx
sed -i 's/traditional Gurukula system/traditional system/g' src/views/LandingView.tsx
sed -i 's/A Gurukula-Trained Educator/A Traditionally Trained Educator/g' src/views/LandingView.tsx
sed -i 's/Gurukula-trained educator/traditionally trained educator/g' src/views/LandingView.tsx
sed -i 's/Traditional Gurukula learning/Traditional learning/g' src/views/LandingView.tsx
sed -i 's/Gurukula Heritage/Traditional Heritage/g' src/views/LandingView.tsx

# DakshinaView.tsx
sed -i 's/ancient Gurukula tradition/ancient tradition/g' src/views/DakshinaView.tsx
sed -i 's/Gurukula Livelihood/Livelihood/g' src/views/DakshinaView.tsx

# HomeView.tsx
sed -i 's/residential Gurukula training/residential training/g' src/views/HomeView.tsx
sed -i 's/Authentic Gurukula Tradition/Authentic Tradition/g' src/views/HomeView.tsx
sed -i 's/traditional Gurukula framework/traditional framework/g' src/views/HomeView.tsx
sed -i 's/gurukula livelihood/livelihood/g' src/views/HomeView.tsx

# TeachingsView.tsx
sed -i 's/GURUKULA METHOD/TRADITIONAL METHOD/g' src/views/TeachingsView.tsx
sed -i 's/THE GURUKULA APPROACH/THE TRADITIONAL APPROACH/g' src/views/TeachingsView.tsx

# seoData.ts
sed -i 's/Vishweshwara Sanskrit Gurukula/Vishweshwara Sanskrit/g' src/utils/seoData.ts
sed -i 's/Gurukula lineage/traditional lineage/g' src/utils/seoData.ts
sed -i 's/digital Gurukula/digital sanctuary/g' src/utils/seoData.ts

# data.ts
sed -i 's/Years Gurukula/Years Traditional/g' src/data.ts
sed -i 's/Gurukula Residency/Traditional Residency/g' src/data.ts
sed -i 's/younger Gurukula students/younger students/g' src/data.ts
sed -i 's/Digital Gurukula/Digital Sanctuary/g' src/data.ts
sed -i 's/residential Gurukula training/residential training/g' src/data.ts

