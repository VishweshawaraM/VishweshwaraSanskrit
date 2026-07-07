#!/bin/bash

# BeginView.tsx
sed -i 's/await saveLead(data);/await saveLead(data);\n                      const { sendNotificationEmail } = await import("..\/lib\/emailjs");\n                      await sendNotificationEmail(data);/g' src/views/BeginView.tsx

# TeachingsView.tsx
sed -i 's/await saveLead({/const leadData = {/g' src/views/TeachingsView.tsx
sed -i 's/message: '\''Requested a free syllabus assessment call.'\''/message: '\''Requested a free syllabus assessment call.'\''\n                    };\n                    await saveLead(leadData);\n                    const { sendNotificationEmail } = await import("..\/lib\/emailjs");\n                    await sendNotificationEmail(leadData);/g' src/views/TeachingsView.tsx

